const fs = require('fs');
let content = fs.readFileSync('C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99-admin/src/pages/dashboard/barberos/index.astro', 'utf8');

content = content.replace(
    /                                    <td class="p-4 text-right">\s*<button class="text-cement hover:text-red-400 transition-colors cursor-pointer p-2" title="Eliminar\/Desactivar">\s*<Trash2 size=\{16\} \/>\s*<\/button>\s*<\/td>/,
    `                                    <td class="p-4 text-right flex justify-end gap-2">
                                        <button class="btn-edit-barbero text-cement hover:text-amber transition-colors cursor-pointer p-2" title="Editar Barbero" data-barber={JSON.stringify(barbero)}>
                                            <Edit2 size={16} />
                                        </button>
                                        <button class="text-cement hover:text-red-400 transition-colors cursor-pointer p-2" title="Eliminar/Desactivar">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>`
);

fs.writeFileSync('C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99-admin/src/pages/dashboard/barberos/index.astro', content);
