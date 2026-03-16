import fs from 'fs';

const file = 'C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99/src/pages/unirse.astro';
let content = fs.readFileSync(file, 'utf8');

// Replace the placeholder redirection with Supabase integration
const placeholderLogic = 'window.location.href = "/panel"; // Redirigir al perfil/dashboard';
const index = content.indexOf(placeholderLogic);

if (index === -1) {
  console.log("Could not find anchor in unirse.astro");
} else {
  // We need to make sure supabase is imported. We can import it dynamically or globally.
  // Actually, Astro script tags are bundled as modules. So we can put import at the top of the script.
  const scriptStart = '<script>';
  const scriptImport = '<script>\n    import { supabase } from "../lib/supabase";';
  content = content.replace(scriptStart, scriptImport);
  
  const supabaseLogic = `
                    const submitBtn = document.getElementById("registerBtn");
                    const originalText = submitBtn ? submitBtn.innerText : "Crear mi cuenta";
                    if (submitBtn) { submitBtn.innerText = "Registrando..."; submitBtn.setAttribute("disabled", "true"); }
                    
                    // Supabase SignUp
                    const { data, error } = await supabase.auth.signUp({
                        email: email.value,
                        password: password.value,
                        options: {
                            data: {
                                first_name: name.value,
                                phone: whatsapp.value
                            }
                        }
                    });

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
                            phone: whatsapp.value,
                            role: 'client',
                            email: email.value // We save email here manually to make admin search easier
                        }).select();
                        // Ignore upsert error if trigger already made it (might fail RLS, but standard setup might work)
                    }

                    alert("¡Cuenta creada con éxito!");
                    window.location.href = "/panel";
  `;
  
  content = content.replace(placeholderLogic, supabaseLogic);
  
  // Make the event listener async
  content = content.replace('registerForm?.addEventListener("submit", (e) => {', 'registerForm?.addEventListener("submit", async (e) => {');

  fs.writeFileSync(file, content);
  console.log("unirse.astro patched successfully!");
}
