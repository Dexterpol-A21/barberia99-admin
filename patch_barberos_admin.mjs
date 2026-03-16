import fs from 'fs';

const file = 'C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99-admin/src/pages/dashboard/barberos/index.astro';
let content = fs.readFileSync(file, 'utf8');

// We are going to replace the `form?.addEventListener('submit', async (e) => { ... })` with the new logic
const startAnchor = "form?.addEventListener('submit', async (e) => {";
const endAnchor = "    </script>";

const startIndex = content.indexOf(startAnchor);
const endIndex = content.indexOf(endAnchor);

if (startIndex === -1 || endIndex === -1) {
    console.log("Could not find anchor in barberos index.astro");
    process.exit();
}

const newLogic = `form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideNotif();
            
            if(!btnSubmit) return;
            const originalText = btnSubmit.innerHTML;
            btnSubmit.innerHTML = 'Procesando...';
            btnSubmit.setAttribute('disabled', 'true');

            try {
                const id = inputId?.value;
                const email = inputEmail?.value;
                const nickname = inputAlias?.value || (email ? email.split('@')[0] : '');
                const commission_rate = parseFloat(inputCommission?.value || "50");
                const base_quota_cuts = parseInt(inputQuota?.value || "10");
                const is_active = inputActive ? inputActive.checked : true;

                if (id) {
                    // Update: El barbero ya existe
                    const { error } = await supabase.from('barbers').update({
                        nickname, commission_rate, base_quota_cuts, is_active
                    }).eq('id', id);
                    
                    if (error) throw error;
                    showNotif('¡Barbero actualizado correctamente!');
                } else {
                    // Insert: Vincular Barbero existente
                    // 1. Buscar el perfil en la tabla profiles por email
                    const { data: profileData, error: profileErr } = await supabase
                        .from('profiles')
                        .select('id, first_name')
                        .eq('email', email)
                        .single();

                    if (profileErr || !profileData) {
                        throw new Error("No se encontró ningún usuario cliente con ese correo. El barbero debe registrarse primero en la app.");
                    }

                    // 2. Cambiar su rol a 'barber'
                    const { error: roleErr } = await supabase
                        .from('profiles')
                        .update({ role: 'barber' })
                        .eq('id', profileData.id);

                    if (roleErr) {
                        throw new Error("Error al actualizar el rol del usuario.");
                    }

                    // 3. Crear el registro en 'barbers' vinculado a profile_id
                    const realNickname = inputAlias?.value || profileData.first_name || nickname;

                    const { error: insertErr } = await supabase.from('barbers').insert([{
                        profile_id: profileData.id,
                        nickname: realNickname,
                        commission_rate,
                        base_quota_cuts,
                        is_active
                    }]);

                    if (insertErr) {
                        // Podríamos tener una validación de clave única para no duplicarlo, atrapamos el error
                        if (insertErr.code === '23505') throw new Error("Este usuario ya está registrado como barbero.");
                        throw new Error("Error al crear el perfil de barbero: " + insertErr.message);
                    }

                    showNotif('¡Barbero vinculado exitosamente!');
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

content = content.substring(0, startIndex) + newLogic + content.substring(endIndex);
fs.writeFileSync(file, content);
console.log("barberos logic patched successfully");
