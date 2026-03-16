const fs = require('fs');
let content = fs.readFileSync('C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99-admin/src/pages/dashboard/barberos/index.astro', 'utf8');

content = content.replace(
    /<div id="modal-invite"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/,
    `<div id="modal-invite" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity duration-300">
            <div class="bg-[#0a0806] border border-white/10 rounded-sm w-full max-w-md p-6 transform scale-95 transition-transform duration-300 relative" id="modal-content">
                <button id="btn-close-modal" class="absolute top-4 right-4 text-cement hover:text-white transition-colors cursor-pointer">
                    <X size={20} />
                </button>

                <div class="mb-6">
                    <h2 class="font-display text-xl text-white" id="modal-title">Invitar / Editar Barbero</h2>
                    <p class="text-xs text-cement mt-1" id="modal-subtitle">Asigna un perfil o envía una invitación para este barbero.</p>
                </div>

                <div id="modal-notification" class="hidden mb-4 p-3 rounded-sm text-sm font-medium flex items-center gap-2"></div>
                
                <form id="invite-barber-form" class="space-y-4">
                    <input type="hidden" id="input-barber-id" />

                    <div>
                        <label class="block text-xs uppercase tracking-widest text-cement font-bold mb-2">Correo Electrónico a Invitar / Perfil a Buscar</label>
                        <div class="relative flex items-center">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-cement" size={16} />
                            <input type="email" id="input-email" required placeholder="correo@ejemplo.com" class="w-full bg-carbon/60 border border-white/10 rounded-sm pl-9 pr-4 h-11 text-sm text-white placeholder-cement focus:border-amber focus:outline-none transition-colors" />
                        </div>
                        <p class="text-[10px] text-amber mt-1 hidden" id="edit-notice-email">Si dejas este correo así, se intentará actualizar el perfil asociado si existe.</p>
                    </div>

                    <div>
                        <label class="block text-xs uppercase tracking-widest text-cement font-bold mb-2">Alias / Apodo</label>
                        <div class="relative flex items-center">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-cement" size={16} />
                            <input type="text" id="input-alias" required placeholder="Ej. Master Hugo" class="w-full bg-carbon/60 border border-white/10 rounded-sm pl-9 pr-4 h-11 text-sm text-white placeholder-cement focus:border-amber focus:outline-none transition-colors" />
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-xs uppercase tracking-widest text-cement font-bold mb-2">Comisión (%)</label>
                            <div class="relative flex items-center">
                                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-cement" size={16} />
                                <input type="number" id="input-commission" required min="0" max="100" value="50" class="w-full bg-carbon/60 border border-white/10 rounded-sm pl-9 pr-4 h-11 text-sm text-white placeholder-cement focus:border-amber focus:outline-none transition-colors" />
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs uppercase tracking-widest text-cement font-bold mb-2" title="Garantía de cortes base">Cuota Silla</label>
                            <div class="relative flex items-center">
                                <Scissors className="absolute left-3 top-1/2 -translate-y-1/2 text-cement" size={16} />
                                <input type="number" id="input-quota" required min="0" value="10" class="w-full bg-carbon/60 border border-white/10 rounded-sm pl-9 pr-4 h-11 text-sm text-white placeholder-cement focus:border-amber focus:outline-none transition-colors" />
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 mt-4 hidden" id="div-active">
                        <input type="checkbox" id="input-active" checked class="accent-amber w-4 h-4 cursor-pointer" />
                        <label class="text-sm text-cement cursor-pointer" for="input-active">Barbero Activo</label>
                    </div>

                    <div class="pt-4 flex justify-end gap-3 border-t border-white/5 mt-6">
                        <button type="button" id="btn-cancel-modal" class="px-4 py-2 text-sm text-cement font-medium hover:text-white transition-colors cursor-pointer">
                            Cancelar
                        </button>
                        <ButtonCTA isSubmit={true} id="btn-submit-modal" class="!h-10 !px-6 !text-sm !w-auto !min-w-0 !font-semibold">
                            Guardar Barbero
                        </ButtonCTA>
                    </div>
                </form>
            </div>
        </div>
    </div>`
);

fs.writeFileSync('C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99-admin/src/pages/dashboard/barberos/index.astro', content);
