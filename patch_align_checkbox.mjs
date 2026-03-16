import fs from 'fs';

let content = fs.readFileSync('C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99/src/pages/unirse.astro', 'utf8');

// 1. Fix the error-check visual jumping by inheriting same width
content = content.replace('.checkmark.error-check:after {\n        border: 0.15em solid #cc0000 !important;\n    }', '.checkmark.error-check:after {\n        border-color: #cc0000 !important;\n    }');

// 2. Adjust vertical alignment for both checkboxes
// removing ' mt-0.5' to make them flush with items-start
content = content.replace(/class="custom-checkbox-container mt\.0\.5"/g, 'class="custom-checkbox-container"');

fs.writeFileSync('C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99/src/pages/unirse.astro', content);
console.log("Patched checkboxes");
