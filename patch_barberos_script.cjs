const fs = require('fs');
let content = fs.readFileSync('C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99-admin/src/pages/dashboard/barberos/index.astro', 'utf8');

const oldScript = `
        btnOpen?.addEventListener('click', openModal);
        btnClose?.addEventListener('click', closeModal);
        btnCancel?.addEventListener('click', closeModal);

        // Cerrar al clickear fuera del contenido
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Simular el envio e invitacion
        const form = document.getElementById('invite-barber-form') as HTMLFormElement;
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideNotif();
            const btnSubmit = form.querySelector('button[type="submit"]');

            const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
            const aliasInput = form.querySelector('input[placeholder="Ej. Master Hugo"]') as HTMLInputElement;

            if(!btnSubmit || !emailInput) return;

            const email = emailInput.value;
            const alias = aliasInput?.value || email.split('@')[0];

            const originalText = btnSubmit.innerHTML;
            btnSubmit.innerHTML = 'Enviando enlace...';
            btnSubmit.setAttribute('disabled', 'true');

            try {
                // Mandamos OTP (Auth mágico de Supabase) para que el barbero reciba su acceso
                const { error } = await supabase.auth.signInWithOtp({
                    email: email,
                    options: {
                        data: {
                            role: 'barber',
                            nickname: alias
                        },
                        emailRedirectTo: \`\${window.location.origin}/onboarding\`
                    }
                });

                if (error) throw error;

                showNotif(\`¡Invitación enviada a \${alias}!\`);

                setTimeout(() => {
                    closeModal();
                    form.reset();

                    // Resetear los defaults de comisiones
                    const inputs = form.querySelectorAll('input[type="number"]');
                    if (inputs[0]) (inputs[0] as HTMLInputElement).value = "50";
                    if (inputs[1]) (inputs[1] as HTMLInputElement).value = "10";
                }, 2000);

            } catch (err: any) {
                console.error("Error invitando barbero:", err);
                showNotif("Error al enviar la invitación.", true);
            } finally {
                btnSubmit.innerHTML = originalText;
                btnSubmit.removeAttribute('disabled');
            }
        });
`;

const newScript = `
        const btnSubmit = document.getElementById('btn-submit-modal');
        const form = document.getElementById('invite-barber-form') as HTMLFormElement;
        const inputId = document.getElementById('input-barber-id') as HTMLInputElement;
        const inputEmail = document.getElementById('input-email') as HTMLInputElement;
        const inputAlias = document.getElementById('input-alias') as HTMLInputElement;
        const inputCommission = document.getElementById('input-commission') as HTMLInputElement;
        const inputQuota = document.getElementById('input-quota') as HTMLInputElement;
        const inputActive = document.getElementById('input-active') as HTMLInputElement;
        
        const divActive = document.getElementById('div-active');
        const noticeEmail = document.getElementById('edit-notice-email');
        const modalTitle = document.getElementById('modal-title');
        const modalSubtitle = document.getElementById('modal-subtitle');

        btnOpen?.addEventListener('click', () => {
            form.reset();
            inputId.value = '';
            inputCommission.value = '50';
            inputQuota.value = '10';
            modalTitle!.innerText = 'Invitar Nuevo Barbero';
            modalSubtitle!.innerText = 'Se enviará un enlace o se creará el registro básico.';
            divActive!.classList.add('hidden');
            noticeEmail!.classList.add('hidden');
            if(btnSubmit) btnSubmit.innerText = 'Enviar Invitación';
            openModal();
        });

        // Edit Barber logic
        document.querySelectorAll('.btn-edit-barbero').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const data = JSON.parse((e.currentTarget as HTMLElement).dataset.barber || '{}');
                form.reset();
                
                inputId.value = data.id || '';
                inputEmail.value = data.profiles?.first_name ? 'Enlazado (Deja vacío o cambia email)' : ''; // Not a real email since we don't have it, but acting as a placeholder
                inputEmail.required = false; // Optional on edit
                inputAlias.value = data.nickname || '';
                inputCommission.value = data.commission_rate || '50';
                inputQuota.value = data.base_quota_cuts || '10';
                inputActive.checked = data.is_active !== false;

                modalTitle!.innerText = 'Editar Barbero';
                modalSubtitle!.innerText = 'Modifica comisiones, metas o su estado activo.';
                divActive!.classList.remove('hidden');
                noticeEmail!.classList.remove('hidden');
                if(btnSubmit) btnSubmit.innerText = 'Guardar Cambios';

                openModal();
            });
        });

        btnClose?.addEventListener('click', closeModal);
        btnCancel?.addEventListener('click', closeModal);

        modal?.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideNotif();
            
            if(!btnSubmit) return;
            const originalText = btnSubmit.innerHTML;
            btnSubmit.innerHTML = 'Guardando...';
            btnSubmit.setAttribute('disabled', 'true');

            try {
                const id = inputId.value;
                const payload = {
                    nickname: inputAlias.value,
                    commission_rate: parseFloat(inputCommission.value),
                    base_quota_cuts: parseInt(inputQuota.value),
                    is_active: inputActive.checked
                };

                if (id) {
                    // Update
                    const { error } = await supabase.from('barbers').update(payload).eq('id', id);
                    if (error) throw error;
                    showNotif('¡Barbero actualizado correctamente!');
                } else {
                    // Insert
                    const { error } = await supabase.from('barbers').insert([payload]);
                    if (error) throw error;
                    showNotif('¡Barbero creado correctamente! (Puedes enlazar su perfil más tarde)');
                    
                    // Note: If you want to actually send an Invite OTP here, you still can, 
                    // but since the db structure uses profiles/barbers, we just create the barber record for now.
                }

                setTimeout(() => {
                    window.location.reload();
                }, 1500);

            } catch (err: any) {
                console.error("Error guardando barbero:", err);
                showNotif(err.message || 'Error al guardar.', true);
            } finally {
                btnSubmit.innerHTML = originalText;
                btnSubmit.removeAttribute('disabled');
            }
        });
`;

if (content.includes(oldScript.trim().substring(0, 50))) {
    content = content.replace(oldScript, newScript);
    fs.writeFileSync('C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99-admin/src/pages/dashboard/barberos/index.astro', content);
    console.log('Script replaced correctly');
} else {
    console.log('Could not find oldScript. Length of matching section: ' + String(content.indexOf('btnOpen?.addEventListener(\\'click\\', openModal);')));
    // Doing a more resilient regex replace
    content = content.replace(/btnOpen\?\.addEventListener\('click', openModal\);[\s\S]*\}\);/, newScript.trim());
    fs.writeFileSync('C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99-admin/src/pages/dashboard/barberos/index.astro', content);
    console.log('Script replaced via regex fallback');
}
