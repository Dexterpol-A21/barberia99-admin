import fs from 'fs';
const file = 'C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99/src/pages/login.astro';
let content = fs.readFileSync(file, 'utf8');

const placeholderLogic = 'window.location.href = "/panel"; // Redirigir al perfil/dashboard';
const index = content.indexOf(placeholderLogic);

if (index === -1) {
  console.log("Could not find anchor in login.astro");
} else {
  const scriptStart = '<script>';
  const scriptImport = '<script>\n    import { supabase } from "../lib/supabase";';
  content = content.replace(scriptStart, scriptImport);
  
  const supabaseLogic = `
                    const submitBtn = document.getElementById("loginBtn");
                    const originalText = submitBtn ? submitBtn.innerText : "Iniciar sesión";
                    if (submitBtn) { submitBtn.innerText = "Iniciando..."; submitBtn.setAttribute("disabled", "true"); }
                    
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email: email.value,
                        password: password.value
                    });

                    if (error) {
                        alert("Error al iniciar sesión: " + error.message);
                        if (submitBtn) { submitBtn.innerText = originalText; submitBtn.removeAttribute("disabled"); }
                        return;
                    }

                    window.location.href = "/panel";
  `;
  
  content = content.replace(placeholderLogic, supabaseLogic);
  content = content.replace('loginForm?.addEventListener("submit", (e) => {', 'loginForm?.addEventListener("submit", async (e) => {');

  fs.writeFileSync(file, content);
  console.log("login.astro patched successfully!");
}
