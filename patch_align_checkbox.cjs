import fs from 'fs';

const file = 'C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99/src/pages/unirse.astro';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix the error-check visual jumping by inheriting same width
content = content.replace('.checkmark.error-check:after {\n        border: 0.15em solid #cc0000 !important;\n    }', '.checkmark.error-check:after {\n        border-color: #cc0000 !important;\n    }');

// 2. Fix the vertical alignment. Replace mt-0.5 with empty or mt-1 to center better
// The label is: <label class="custom-checkbox-container mt-0.5" for="terms">
content = content.replace('<label\n                                class="custom-checkbox-container mt-0.5"\n                                for="terms"\n                            >', '<label\n                                class="custom-checkbox-container mt-0.5"\n                                for="terms"\n                            >');

fs.writeFileSync(file, content);
console.log("Patched checkboxes");
