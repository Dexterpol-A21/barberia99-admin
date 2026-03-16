const fs = require('fs');
const path = 'C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99-admin/src/pages/dashboard/menu/index.astro';

const code = `---
import DashboardLayout from "../../../layouts/DashboardLayout.astro";
import { Scissors, Sparkles, Plus, Edit2, Trash2, Star, Tag, ArrowUp, ArrowDown } from "lucide-react";
import ButtonCTA from "../../../components/ui/ButtonCTA.astro";
import { supabase } from "../../../lib/supabase";

let servicesData = [];
let errorMsj = "";

// 1. Obtener la data (Ahora ordenamos primero por tu orden manual display_order y luego por ID normal)
const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: true });

if (error) {
    errorMsj = "Error al cargar los servicios";
    console.error(error);
} else {
    servicesData = data || [];
}

const categoriasConfig = [
    { id: "cortes", nombre: "Cortes de Cabello", icono: Scissors, color: "text-amber" },
    { id: "barba", nombre: "Barba y Bigote", icono: Scissors, color: "text-cement" },
    { id: "facial", nombre: "Cuidado Facial", icono: Sparkles, color: "text-cement" },
    { id: "combos", nombre: "Combos Especiales", icono: Star, color: "text-amber" }
];

const categorias = categoriasConfig.map(cat => ({
    ...cat,
    servicios: servicesData.filter(s => s.category === cat.id)
}));

function formatPrice(service) {
    let originalPrice = Number(service.price);
    if (!service.discount_type || !service.discount_value || Number(service.discount_value) <= 0) {
        return { isDiscounted: false, finalPrice: originalPrice, originalPrice };
    }
    
    let finalPrice = originalPrice;
    let discountVal = Number(service.discount_value);

    if (service.discount_type === 'percentage') {
        finalPrice = originalPrice - (originalPrice * (discountVal / 100));
    } else if (service.discount_type === 'fixed') {
        finalPrice = discountVal; // AHORA: El descuento fijo se convierte directamente en el nuevo precio oficial
    }

    return { 
        isDiscounted: true, 
        finalPrice: Math.max(0, finalPrice), 
        originalPrice,
        discountType: service.discount_type,
        discountValue: discountVal
    };
}
---

<DashboardLayout title="Menú de Servicios | Barbería 99">
    <div class="w-full mx-auto space-y-8 pb-12">

        <!-- Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 class="text-3xl font-heading font-bold text-bone flex items-center gap-3">
                    Gestión del Menú
                </h1>
                <p class="text-cement/80 text-sm mt-1">
                    Actualiza precios, ordena tus servicios y elige los <span class="text-amber">3 destacados</span> por categoría para tu app.
                </p>
                {errorMsj && <p class="text-red-500 text-sm mt-2">{errorMsj}</p>}
            </div>
            <div class="flex gap-2 w-full sm:w-auto">
                <ButtonCTA type="button" id="btn-new-service" class="w-full sm:w-auto py-2.5 shadow-[0_0_15px_rgba(166,124,82,0.15)] flex items-center justify-center gap-2 cursor-pointer">
                    <Plus size={18} />
                    <span>Nuevo Servicio</span>
                </ButtonCTA>
            </div>
        </div>

        <div class="bg-amber/10 border border-amber/20 rounded-md p-4 flex items-start gap-3">
            <Star class="text-amber shrink-0 mt-0.5" size={18} />
            <div class="text-sm text-bone">
                <p><span class="font-bold text-amber">Importante sobre tu diseño:</span> Los servicios marcados con la estrella (★) son los que aparecerán en la ventana principal de la app de tu cliente. Mantén <strong>exactamente 3 estrellas por categoría</strong> para evitar descuadrar el diseño.</p>
            </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">

            {categorias.map(cat => {
                const Icon = cat.icono;
                const destacadosCount = cat.servicios.filter(s => s.is_featured).length;

                return (
                    <div class="bg-[#100d0a] border border-white/5 rounded-lg overflow-hidden flex flex-col cat-container" data-ids={JSON.stringify(cat.servicios.map(s => s.id))}>
                        
                        <div class="p-4 border-b border-white/5 flex items-center justify-between bg-[#15120f]">
                            <div class="flex items-center gap-3">
                                <div class={\`w-10 h-10 rounded bg-[#0a0806] border border-white/5 flex items-center justify-center \${cat.color}\`}>
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <h2 class="font-heading font-bold text-lg text-bone">{cat.nombre}</h2>
                                    <p class="text-xs text-cement"> Destacados: {destacadosCount}/3 </p>
                                </div>
                            </div>
                            <button class="text-cement hover:text-amber transition-colors p-2 cursor-pointer btn-add-cat" data-category={cat.id} title="Añadir a esta categoría">
                                <Plus size={18} />
                            </button>
                        </div>

                        <!-- Lista de Servicios -->
                        <div class="p-0 flex-1 relative">
                            {cat.servicios.length > 0 ? (
                                <table class="w-full text-sm">
                                    <tbody class="divide-y divide-white/5">
                                        {cat.servicios.map((servicio, index) => {
                                            const pricing = formatPrice(servicio);
                                            const isFirst = index === 0;
                                            const isLast = index === cat.servicios.length - 1;

                                            return (
                                                <tr class="hover:bg-white/5 transition-colors group">
                                                    <td class="p-3 pl-4">
                                                        <div class="flex items-center gap-2">
                                                            <button 
                                                                class={\`p-1 rounded-full transition-colors cursor-pointer btn-toggle-featured \${servicio.is_featured ? 'text-amber hover:text-cement' : 'text-cement/30 hover:text-amber/50'}\`} 
                                                                data-id={servicio.id} 
                                                                data-featured={servicio.is_featured ? 'true' : 'false'}
                                                                title={servicio.is_featured ? "Quitar destacado" : "Hacer destacado"}
                                                            >
                                                                <Star size={16} fill={servicio.is_featured ? "currentColor" : "none"} />
                                                            </button>
                                                            <div class="flex flex-col">
                                                                <span class={\`font-medium \${servicio.is_active ? 'text-bone' : 'text-cement/50 line-through'}\`}>
                                                                    {servicio.name}
                                                                </span>
                                                                {pricing.isDiscounted && (
                                                                    <span class="text-[10px] text-green-400 flex items-center gap-1 mt-0.5">
                                                                        <Tag size={10} />
                                                                        <span>
                                                                            {pricing.discountType === 'percentage' ? \`Descuento del \${pricing.discountValue}%\` : \`Precio especial\`}
                                                                        </span>
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="p-3 text-right hidden sm:table-cell">
                                                        <div class="text-cement">{servicio.duration_minutes} min</div>
                                                    </td>
                                                    <td class="p-3 text-right">
                                                        {pricing.isDiscounted ? (
                                                            <div class="flex flex-col items-end">
                                                                <span class="text-green-400 font-body font-bold">\${pricing.finalPrice}</span>
                                                                <span class="text-cement/50 text-[10px] line-through">\${pricing.originalPrice}</span>
                                                            </div>
                                                        ) : (
                                                            <div class="text-amber font-body font-bold">\${pricing.finalPrice}</div>
                                                        )}
                                                    </td>
                                                    <td class="p-3 pr-4 text-right">
                                                        <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            
                                                            <button class="p-1.5 text-cement hover:text-white disabled:opacity-20 disabled:hover:text-cement transition-colors cursor-pointer btn-move" data-id={servicio.id} data-dir="up" disabled={isFirst} title="Mover arriba">
                                                                <ArrowUp size={16} />
                                                            </button>
                                                            <button class="p-1.5 text-cement hover:text-white disabled:opacity-20 disabled:hover:text-cement transition-colors cursor-pointer btn-move" data-id={servicio.id} data-dir="down" disabled={isLast} title="Mover abajo">
                                                                <ArrowDown size={16} />
                                                            </button>

                                                            <div class="w-px h-4 bg-white/10 mx-1"></div>

                                                            <button class="p-1.5 text-cement hover:text-bone disabled:opacity-50 cursor-pointer btn-edit" data-service={JSON.stringify(servicio)} title="Editar">
                                                                <Edit2 size={16} />
                                                            </button>
                                                            <button class="p-1.5 text-cement hover:text-[#cc0000] disabled:opacity-50 cursor-pointer btn-delete" data-id={servicio.id} title="Eliminar">
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <div class="p-8 text-center text-cement/50 text-sm">
                                    No hay servicios.<br>Haz clic en el '+' para añadir uno.
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}

        </div>

    </div>

    <!-- MODAL DE EDICIÓN / CREACIÓN -->
    <dialog id="modal-form-service" class="bg-transparent m-auto p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm shadow-2xl rounded-xl open:flex flex-col fixed inset-0 z-50">
        <div class="bg-[#0a0806] border border-white/10 w-[90vw] max-w-md mx-auto p-6 flex flex-col gap-4">
            
            <div class="flex items-center justify-between mb-2">
                <h2 id="modal-title" class="text-xl font-heading font-bold text-bone">Nuevo Servicio</h2>
            </div>
            
            <div id="modal-success-msg" class="hidden bg-green-500/10 text-green-400 p-3 rounded border border-green-500/20 text-sm text-center font-bold">
                ¡Cambio guardado exitosamente! Actualizando...
            </div>

            <form id="form-service" class="flex flex-col gap-4">
                <input type="hidden" id="input-id" />
                
                <div>
                    <label class="block text-xs text-cement mb-1">Categoría</label>
                    <select id="input-category" class="w-full bg-[#15120f] border border-white/10 rounded-sm px-3 py-2 text-bone focus:border-amber outline-none" required>
                        <option value="cortes">Cortes de Cabello</option>
                        <option value="barba">Barba y Bigote</option>
                        <option value="facial">Cuidado Facial</option>
                        <option value="combos">Combos Especiales</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs text-cement mb-1">Nombre del Servicio</label>
                    <input type="text" id="input-name" class="w-full bg-[#15120f] border border-white/10 rounded-sm px-3 py-2 text-bone focus:border-amber outline-none" placeholder="Ej. Corte Clásico" required />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs text-cement mb-1">Precio Base ($)</label>
                        <input type="number" id="input-price" step="0.01" class="w-full bg-[#15120f] border border-white/10 rounded-sm px-3 py-2 text-bone focus:border-amber outline-none" required />
                    </div>
                    <div>
                        <label class="block text-xs text-cement mb-1">Duración (min)</label>
                        <input type="number" id="input-duration" class="w-full bg-[#15120f] border border-white/10 rounded-sm px-3 py-2 text-bone focus:border-amber outline-none" required />
                    </div>
                </div>

                <div class="bg-white/5 p-3 rounded border border-white/5 mt-2">
                    <label class="block text-xs text-amber font-bold mb-2">Configurar Descuento (Opcional)</label>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <select id="input-discount-type" class="w-full bg-[#0a0806] border border-white/10 rounded-sm px-3 py-2 text-sm text-bone focus:border-amber outline-none">
                                <option value="">Sin descuento</option>
                                <option value="percentage">Porcentaje (%)</option>
                                <option value="fixed">Nuevo Precio Fijo ($)</option>
                            </select>
                        </div>
                        <div>
                            <input type="number" id="input-discount-value" step="0.01" class="w-full bg-[#0a0806] border border-white/10 rounded-sm px-3 py-2 text-sm text-bone focus:border-amber outline-none disabled:opacity-50" placeholder="Valor..." disabled />
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-2 mt-2">
                    <input type="checkbox" id="input-active" checked class="accent-amber w-4 h-4 cursor-pointer" />
                    <label class="text-sm text-cement cursor-pointer" for="input-active">Servicio Activo</label>
                </div>

                <div class="flex justify-end gap-3 mt-6">
                    <button type="button" id="btn-close-modal" class="px-4 py-2 text-sm text-cement hover:text-white transition-colors cursor-pointer">Cancelar</button>
                    <ButtonCTA isSubmit={true} class="px-6 py-2 cursor-pointer">Guardar Cambios</ButtonCTA>
                </div>
            </form>
        </div>
    </dialog>

</DashboardLayout>

<script>
    import { supabase } from "../../../lib/supabase";

    const modal = document.getElementById('modal-form-service') as HTMLDialogElement;
    const form = document.getElementById('form-service') as HTMLFormElement;
    const btnCloseModal = document.getElementById('btn-close-modal');
    
    // Inputs
    const modalTitle = document.getElementById('modal-title');
    const msgSuccess = document.getElementById('modal-success-msg');
    const inputId = document.getElementById('input-id') as HTMLInputElement;
    const inputCat = document.getElementById('input-category') as HTMLSelectElement;
    const inputName = document.getElementById('input-name') as HTMLInputElement;
    const inputPrice = document.getElementById('input-price') as HTMLInputElement;
    const inputDuration = document.getElementById('input-duration') as HTMLInputElement;
    const inputDiscType = document.getElementById('input-discount-type') as HTMLSelectElement;
    const inputDiscVal = document.getElementById('input-discount-value') as HTMLInputElement;
    const inputActive = document.getElementById('input-active') as HTMLInputElement;

    inputDiscType?.addEventListener('change', (e) => {
        const val = (e.target as HTMLSelectElement).value;
        if(val === '') {
            inputDiscVal.value = '';
            inputDiscVal.disabled = true;
        } else {
            inputDiscVal.disabled = false;
            if(!inputDiscVal.value) inputDiscVal.value = "0"; 
        }
    });

    function openModal(service = null, defaultCategory = "cortes") {
        form.reset();
        form.style.opacity = '1';
        form.style.pointerEvents = 'auto';
        msgSuccess.classList.add('hidden');
        inputDiscVal.disabled = true;

        if (service) {
            modalTitle.textContent = "Editar Servicio";
            inputId.value = service.id;
            inputCat.value = service.category;
            inputName.value = service.name;
            inputPrice.value = service.price;
            inputDuration.value = service.duration_minutes;
            inputActive.checked = service.is_active !== false;

            if (service.discount_type) {
                inputDiscType.value = service.discount_type;
                inputDiscVal.value = service.discount_value;
                inputDiscVal.disabled = false;
            }
        } else {
            modalTitle.textContent = "Nuevo Servicio";
            inputId.value = "";
            inputCat.value = defaultCategory;
            inputActive.checked = true;
        }

        modal.showModal();
    }

    btnCloseModal?.addEventListener('click', () => modal.close());

    document.getElementById('btn-new-service')?.addEventListener('click', () => openModal());
    
    document.querySelectorAll('.btn-add-cat').forEach(btn => {
        btn.addEventListener('click', (e) => {
            openModal(null, (e.currentTarget as HTMLElement).getAttribute('data-category'));
        });
    });

    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const dataRaw = (e.currentTarget as HTMLElement).getAttribute('data-service');
            if(dataRaw) openModal(JSON.parse(dataRaw));
        });
    });

    /** REORDENAMIENTO MANUAL (Cargar / Subir) **/
    document.querySelectorAll('.btn-move').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const node = e.currentTarget as HTMLElement;
            const dir = node.getAttribute('data-dir');
            const id = node.getAttribute('data-id');
            const container = node.closest('.cat-container');
            if(!container) return;

            let ids = JSON.parse(container.getAttribute('data-ids'));
            const idx = ids.indexOf(id);

            // Operar Intercambio Visual
            if (dir === 'up' && idx > 0) {
                [ids[idx - 1], ids[idx]] = [ids[idx], ids[idx - 1]];
            } else if (dir === 'down' && idx < ids.length - 1) {
                [ids[idx + 1], ids[idx]] = [ids[idx], ids[idx + 1]];
            } else {
                return; // Fuera de rango
            }

            node.style.opacity = '0.5';
            node.style.pointerEvents = 'none';

            // Actualizar Supabase con el nuevo Batch en base al index del array
            const promises = ids.map((item_id, array_index) => {
                return supabase.from('services').update({ display_order: array_index }).eq('id', item_id);
            });
            
            await Promise.all(promises);
            window.location.reload();
        });
    });

    /** GUARDAR (CREAR / EDITAR) **/
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = inputId.value;
        const discountType = inputDiscType.value === "" ? null : inputDiscType.value;
        const discountValue = discountType ? parseFloat(inputDiscVal.value || "0") : 0;

        const payload = {
            category: inputCat.value,
            name: inputName.value,
            price: parseFloat(inputPrice.value),
            duration_minutes: parseInt(inputDuration.value),
            is_active: inputActive.checked,
            discount_type: discountType,
            discount_value: discountValue
        };

        let resultError = null;

        if (id) {
            const { error } = await supabase.from('services').update(payload).eq('id', id);
            resultError = error;
        } else {
            const { error } = await supabase.from('services').insert([{ ...payload, is_featured: false, display_order: 999 }]);
            resultError = error;
        }

        if (resultError) {
            alert("Error al guardar: " + resultError.message);
        } else {
            // Mostrar Feedback de Éxito y recargar
            msgSuccess.classList.remove('hidden');
            form.style.opacity = '0.5';
            form.style.pointerEvents = 'none';
            setTimeout(() => {
                 window.location.reload(); 
            }, 1200);
        }
    });

    /** ELIMINAR **/
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            if(!confirm("¿Eliminar este servicio? Esto no se puede deshacer.")) return;
            const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
            const { error } = await supabase.from('services').delete().eq('id', id);
            if(error) alert("Error al eliminar");
            else window.location.reload();
        });
    });

    /** TOGGLE DE DESTACADO **/
    document.querySelectorAll('.btn-toggle-featured').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const node = e.currentTarget as HTMLElement;
            const id = node.getAttribute('data-id');
            const currentFeatured = node.getAttribute('data-featured') === 'true';
            
            const { error } = await supabase.from('services').update({ is_featured: !currentFeatured }).eq('id', id);
            
            if(error) alert("Error");
            else window.location.reload();
        });
    });

</script>
`
fs.writeFileSync(path, code);
