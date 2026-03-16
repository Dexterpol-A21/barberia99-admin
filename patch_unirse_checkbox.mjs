import fs from 'fs';

const file = 'C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99/src/pages/unirse.astro';
let content = fs.readFileSync(file, 'utf8');

// The JS logic to replace:
content = content.replace('checkmark.style.outline = "2px solid #cc0000";', "checkmark.classList.add('border-[#cc0000]', 'border', 'rounded-sm');\n                    checkmark.style.outline = 'none';");
content = content.replace('checkmark.style.outline = "none";', "checkmark.classList.remove('border-[#cc0000]', 'border', 'rounded-sm');");


fs.writeFileSync(file, content);
console.log("Checkbox logic Patched!");
