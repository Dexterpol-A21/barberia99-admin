import fs from 'fs';

const file = 'C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99/src/pages/login.astro';
let content = fs.readFileSync(file, 'utf8');

const htmlNotice = '                    <div id="authNotice" class="hidden mb-6 p-4 border border-l-4 text-sm font-medium"></div>\n                    <form id="login-form" novalidate class="space-y-4">';
content = content.replace('<form id="login-form" novalidate class="space-y-4">', htmlNotice);

const targetString = `
                    if (error) {
                        alert("Error al iniciar sesión: " + error.message);
                        if (submitBtn) { submitBtn.innerText = originalText; submitBtn.removeAttribute("disabled"); }
                        return;
                    }

                    window.location.href = "/panel";
`;

const replaceString = `
                    const notice = document.getElementById("authNotice");
                    
                    if (error) {
                        if(notice) {
                            notice.classList.remove("hidden", "bg-green-500/10", "border-green-500/50", "text-green-400", "border-l-green-500");
                            notice.classList.add("bg-red-500/10", "border-red-500/50", "text-red-400", "border-l-red-500");
                            notice.innerText = (error.message.includes("Invalid login") ? "Correo o contraseña incorrectos." : "Error: " + error.message);
                        }
                        if (submitBtn) { submitBtn.innerText = originalText; submitBtn.removeAttribute("disabled"); }
                        return;
                    }

                    if(notice) {
                        notice.classList.remove("hidden", "bg-red-500/10", "border-red-500/50", "text-red-400", "border-l-red-500");
                        notice.classList.add("bg-green-500/10", "border-green-500/50", "text-green-400", "border-l-green-500");
                        notice.innerText = "¡Inicio de sesión exitoso! Redirigiendo...";
                    }
                    
                    setTimeout(() => {
                        window.location.href = "/panel";
                    }, 1000);
`;

const a = content.indexOf('if (error) {');
if(a>-1) console.log("Anchor found in login");

content = content.replace(targetString.trim(), replaceString.trim());
fs.writeFileSync(file, content);
console.log("Login Patched!");
