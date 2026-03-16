const fs = require('fs');
const path = 'C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99-admin/src/pages/dashboard/menu/index.astro';
let code = fs.readFileSync(path, 'utf8');

// 1. Agregar el input de description en el HTML
const newHTML = `
                <div>
                    <label class="block text-xs text-cement mb-1">Nombre del Servicio <span class="text-white/30 text-[9px]">(Max 40)</span></label>
                    <input type="text" id="input-name" maxlength="40" class="w-full bg-[#15120f] border border-white/10 rounded-sm px-3 py-2 text-bone focus:border-amber outline-none" placeholder="Ej. Corte Clásico" required />
                </div>

                <div>
                    <label class="block text-xs text-cement mb-1">Descripción corta <span class="text-white/30 text-[9px]">(Max 130)</span></label>
                    <textarea id="input-description" maxlength="130" rows="2" class="w-full bg-[#15120f] border border-white/10 rounded-sm px-3 py-2 text-bone focus:border-amber outline-none text-sm resize-none" placeholder="Breve descripción del servicio..."></textarea>
                </div>`;

code = code.replace(/<div>\s*<label class="block text-xs text-cement mb-1">Nombre del Servicio.*?<\/div>/s, newHTML);

// 2. Agregar la constante en JS
code = code.replace(/const inputName = document.*?;/s, "const inputName = document.getElementById('input-name') as HTMLInputElement;\n    const inputDesc = document.getElementById('input-description') as HTMLTextAreaElement;");

// 3. Agregar la lectura al abrir el modal openModal()
code = code.replace(/inputName\.value = service\.name;/s, "inputName.value = service.name;\n            inputDesc.value = service.description || '';");
code = code.replace(/inputName\.value = "";/s, "inputName.value = \"\";\n            inputDesc.value = \"\";");

// 4. Agregar al payload de guardado
code = code.replace(/name: inputName\.value,/s, "name: inputName.value,\n            description: inputDesc.value,");

fs.writeFileSync(path, code);
