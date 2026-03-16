import fs from 'fs';
const file = 'C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99-admin/src/pages/dashboard/barberos/index.astro';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
    '<h2 class="font-display text-xl text-white" id="modal-title">Invitar / Editar Barbero</h2>',
    '<h2 class="font-display text-xl text-white" id="modal-title">Vincular / Editar Barbero</h2>'
);

content = content.replace(
    '<p class="text-xs text-cement mt-1" id="modal-subtitle">Asigna un perfil o envía una invitación para este barbero.</p>',
    '<p class="text-xs text-cement mt-1" id="modal-subtitle">Busca un cliente por correo y conéctalo al panel.</p>'
);

content = content.replace(
    '<label class="block text-xs uppercase tracking-widest text-cement font-bold mb-2">Correo Electrónico a Invitar / Perfil a Buscar</label>',
    '<label class="block text-xs uppercase tracking-widest text-cement font-bold mb-2">Correo Electrónico a Vincular</label>'
);

fs.writeFileSync(file, content);
console.log("HTML Patched!");
