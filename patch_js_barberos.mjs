import fs from 'fs';

const file = 'C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99-admin/src/pages/dashboard/barberos/index.astro';
let content = fs.readFileSync(file, 'utf8');

const anchor = 'btnOpen?.addEventListener(\'click\', openModal);';
const index = content.indexOf(anchor);

if (index === -1) {
  console.log("Could not find anchor");
  process.exit();
}

const newScript = `
        const inputId = document.getElementById('input-barber-id') as HTMLInputElement;
        const inputEmail = document.getElementById('input-email') as HTMLInputElement;
        const inputAlias = document.getElementById('input-alias') as HTMLInputElement;
        const inputCommission = document.getElementById('input-commission') as HTMLInputElement;
        const inputQuota = document.getElementById('input-quota') as HTMLInputElement;
        const inputActive = document.getElementById('input-active') as HTMLInputElement;
        const form = document.getElementById('invite-barber-form') as HTMLFormElement;
        const btnSubmit = form?.querySelector('button[type="submit"]');

        const divActive = document.getElementById('div-active');
        const noticeEmail = document.getElementById('edit-notice-email');
        const modalTitle = document.getElementById('modal-title');
        const modalSubtitle = document.getElementById('modal-subtitle');

        btnOpen?.addEventListener('click', () => {
            if(form) form.reset();
            if(inputId) inputId.value = '';
            if(inputCommission) inputCommission.value = '50';
            if(inputQuota) inputQuota.value = '10';
            if(modalTitle) modalTitle.innerText = 'Invitar Nuevo Barbero';
            if(modalSubtitle) modalSubtitle.innerText = 'Se enviará un enlace o se creará el registro básico.';
            if(divActive) divActive.classList.add('hidden');
            if(noticeEmail) noticeEmail.classList.add('hidden');
            if(btnSubmit) btnSubmit.innerHTML = 'Enviar Invitación';
            if(inputEmail) {
                inputEmail.required = true;
                inputEmail.disabled = false;
                inputEmail.classList.remove('opacity-50', 'cursor-not-allowed');
            }
            openModal();
        });

        document.querySelectorAll('.btn-edit-barbero').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
                const dataRaw = target.dataset.barber || '{}';
                const data = JSON.parse(dataRaw);
                
                if(form) form.reset();
                
                if(inputId) inputId.value = data.id || '';
                
                if(inputEmail) {
                    if (data.profiles?.email) {
                        inputEmail.value = data.profiles.email;
                    } else if (data.profiles?.first_name) {
                        inputEmail.value = 'Enlazado (' + data.profiles.first_name + ')';
                    }
                    inputEmail.required = false;
                    inputEmail.disabled = true;
                    inputEmail.classList.add('opacity-50', 'cursor-not-allowed');
                }
                
                if(inputAlias) inputAlias.value = data.nickname || '';
                if(inputCommission) inputCommission.value = data.commission_rate || '50';
                if(inputQuota) inputQuota.value = data.base_quota_cuts || '10';
                if(inputActive) inputActive.checked = data.is_active !== false;

                if(modalTitle) modalTitle.innerText = 'Editar Barbero';
                if(modalSubtitle) modalSubtitle.innerText = 'Modifica comisiones, metas o estado del barbero.';
                if(divActive) divActive.classList.remove('hidden');
                if(noticeEmail) noticeEmail.classList.remove('hidden');
                if(btnSubmit) btnSubmit.innerHTML = 'Guardar Cambios';

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
            btnSubmit.innerHTML = 'Procesando...';
            btnSubmit.setAttribute('disabled', 'true');

            try {
                const id = inputId?.value;
                const email = inputEmail?.value;
                const nickname = inputAlias?.value || email.split('@')[0];
                const commission_rate = parseFloat(inputCommission?.value || "50");
                const base_quota_cuts = parseInt(inputQuota?.value || "10");
                const is_active = inputActive ? inputActive.checked : true;

                if (id) {
                    // Update
                    const { error } = await supabase.from('barbers').update({
                        nickname, commission_rate, base_quota_cuts, is_active
                    }).eq('id', id);
                    
                    if (error) throw error;
                    showNotif('¡Barbero actualizado correctamente!');
                } else {
                    // Insert Invite - Auth Magic Link
                    const { error } = await supabase.auth.signInWithOtp({
                        email: email,
                        options: {
                            data: {
                                role: 'barber',
                                nickname: nickname,
                                commission_rate,
                                base_quota_cuts
                            },
                            emailRedirectTo: \`\${window.location.origin}/onboarding\`
                        }
                    });

                    if (error) throw error;
                    showNotif(\`¡Invitación enviada a \${nickname}!\`);
                }

                setTimeout(() => {
                    closeModal();
                    window.location.reload();
                }, 1500);

            } catch (err: any) {
                console.error("Error procesando barbero:", err);
                showNotif(err.message || 'Error al procesar.', true);
            } finally {
                btnSubmit.innerHTML = originalText;
                btnSubmit.removeAttribute('disabled');
            }
        });
`;

const endIndex = content.indexOf('</script>');
content = content.substring(0, index) + newScript + '    ' + content.substring(endIndex);
fs.writeFileSync(file, content);
console.log('Script bound correctly!');
