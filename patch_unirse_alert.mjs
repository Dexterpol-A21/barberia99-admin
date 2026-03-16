import fs from 'fs';

const file = 'C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99/src/pages/unirse.astro';
let content = fs.readFileSync(file, 'utf8');

// The original logic string:
const targetString = `
                    if (error) {
                        alert("Error al registrar: " + error.message);
                        if (submitBtn) { submitBtn.innerText = originalText; submitBtn.removeAttribute("disabled"); }
                        return;
                    }

                    // Intentar guardar el perfil si auth fue exitoso (en caso de no tener trigger de DB)
                    if (data.user) {
                        const { error: profileError } = await supabase.from('profiles').upsert({
                            id: data.user.id,
                            first_name: name.value,
                            phone: '+52 ' + whatsapp.value,
                            role: 'client',
                            email: email.value // We save email here manually to make admin search easier
                        }).select();
                        // Ignore upsert error if trigger already made it (might fail RLS, but standard setup might work)
                    }

                    alert("¡Cuenta creada con éxito!");
                    window.location.href = "/panel";
`;

const replaceString = `
                    const notice = document.getElementById("authNotice");
                    
                    if (error) {
                        if(notice) {
                            notice.classList.remove("hidden", "bg-green-500/10", "border-green-500/50", "text-green-400", "border-l-green-500");
                            notice.classList.add("bg-red-500/10", "border-red-500/50", "text-red-400", "border-l-red-500");
                            notice.innerText = "Error: " + (error.message === "User already registered" ? "El correo ya está registrado" : error.message);
                        }
                        if (submitBtn) { submitBtn.innerText = originalText; submitBtn.removeAttribute("disabled"); }
                        return;
                    }

                    // Intentar guardar el perfil si auth fue exitoso (en caso de no tener trigger de DB)
                    if (data.user) {
                        const { error: profileError } = await supabase.from('profiles').upsert({
                            id: data.user.id,
                            first_name: name.value,
                            phone: '+52 ' + whatsapp.value,
                            role: 'client',
                            email: email.value // We save email here manually to make admin search easier
                        }).select();
                        // Ignore upsert error if trigger already made it (might fail RLS, but standard setup might work)
                    }

                    if(notice) {
                        notice.classList.remove("hidden", "bg-red-500/10", "border-red-500/50", "text-red-400", "border-l-red-500");
                        notice.classList.add("bg-green-500/10", "border-green-500/50", "text-green-400", "border-l-green-500");
                        notice.innerText = "¡Cuenta creada con éxito! Redirigiendo...";
                    }
                    
                    setTimeout(() => {
                        window.location.href = "/panel";
                    }, 1500);
`;

const a = content.indexOf('if (error) {');
if(a>-1) console.log("Anchor found in unirse");

content = content.replace(targetString.trim(), replaceString.trim());
fs.writeFileSync(file, content);
console.log("Unirse Patched!");
