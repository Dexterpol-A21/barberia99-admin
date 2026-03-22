import{s as k}from"./supabase.C8JFIDnn.js";let v=[],r=new Date,c="day";function b(){const a=document.getElementById("dateText");if(!a)return;if(c==="day"){const t={weekday:"long",year:"numeric",month:"long",day:"numeric"};let n=r.toLocaleDateString("es-ES",t);n=n.charAt(0).toUpperCase()+n.slice(1),a.innerText=n}else if(c==="week"){const t=new Date(r.getFullYear(),r.getMonth(),r.getDate()-r.getDay()+1),n=new Date(t.getFullYear(),t.getMonth(),t.getDate()+6),i=t.toLocaleDateString("es-ES",{day:"numeric",month:"short"}),l=n.toLocaleDateString("es-ES",{day:"numeric",month:"short",year:"numeric"});a.innerText=`${i} al ${l}`}else if(c==="month"){let t=r.toLocaleDateString("es-ES",{month:"long",year:"numeric"});t=t.charAt(0).toUpperCase()+t.slice(1),a.innerText=t}const e=document.getElementById("nativeDateInput");if(e){const t=r.getFullYear(),n=String(r.getMonth()+1).padStart(2,"0"),i=String(r.getDate()).padStart(2,"0");e.value=`${t}-${n}-${i}`}["day","week","month"].forEach(t=>{const n=document.getElementById(`view${t.charAt(0).toUpperCase()+t.slice(1)}Btn`);n&&(t===c?n.className="px-3 py-1 bg-white/10 text-white rounded-[1px] text-xs font-medium focus:outline-none transition-colors cursor-pointer":n.className="px-3 py-1 text-cement hover:text-white rounded-[1px] text-xs transition-colors cursor-pointer")})}async function S(){try{const{data:a,error:e}=await k.from("appointments").select(`
                    id,
                    appointment_date,
                    appointment_time,
                    status,
                    client_id,
                    barber_id,
                    notes,
                    price,
                    total_duration_minutes,
                    profiles (
                        first_name,
                        email,
                        phone
                    ),
                    barbers (
                        nickname
                    )
                `).order("appointment_date",{ascending:!0}).order("appointment_time",{ascending:!0});if(e)throw console.error("Error fetching appointments:",e.message),e;v=a||[],T(v),x()}catch(a){console.error("Error definitivo listando agenda:",a);const e=document.getElementById("appointmentsContainer");e&&(e.innerHTML='<div class="p-6 text-center text-[#cc0000] bg-[#cc0000]/10 border border-[#cc0000]/20 rounded-sm font-medium">No se pudieron cargar las citas.<br/><span class="font-normal text-sm mt-2 block">Es probable que un bloqueador de anuncios (AdBlock, Avast, Brave) esté impidiendo la conexión a la base de datos. Por favor, <b>desactívalo para este sitio</b> y recarga la página.</span></div>')}}function T(a){const e=new Date,s=new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime(),t=new Date(e.getFullYear(),e.getMonth(),e.getDate()+1).getTime(),n=new Date(e.getFullYear(),e.getMonth(),1).getTime();let i=0,l=0,d=0;a.forEach(m=>{const[f,L,$]=m.appointment_date.split("-").map(Number),D=new Date(f,L-1,$,12,0,0).getTime();if(D>=s&&D<t&&i++,D>=n){const y=(m.status||"").toLowerCase();(y==="completed"||y==="completada")&&l++,(y==="cancelled"||y==="cancelada")&&d++}});const o=document.getElementById("metricToday"),p=document.getElementById("metricCompleted"),w=document.getElementById("metricCanceled"),C=document.getElementById("barCompleted"),u=document.getElementById("barCanceled");o&&(o.innerText=i),p&&(p.innerText=l),w&&(w.innerText=d);const g=l+d||1;C&&(C.style.width=`${l/g*100}%`),u&&(u.style.width=`${d/g*100}%`)}function x(){const a=document.getElementById("appointmentsContainer");if(!a)return;let e,s;if(c==="day")e=new Date(r.getFullYear(),r.getMonth(),r.getDate()).getTime(),s=new Date(r.getFullYear(),r.getMonth(),r.getDate()+1).getTime();else if(c==="week"){const n=new Date(r.getFullYear(),r.getMonth(),r.getDate()-r.getDay()+1);e=n.getTime(),s=new Date(n.getFullYear(),n.getMonth(),n.getDate()+7).getTime()}else c==="month"&&(e=new Date(r.getFullYear(),r.getMonth(),1).getTime(),s=new Date(r.getFullYear(),r.getMonth()+1,1).getTime());const t=v.filter(n=>{const[i,l,d]=n.appointment_date.split("-").map(Number),o=new Date(i,l-1,d,12,0,0).getTime();return o>=e&&o<s});if(t.length===0){let n=c==="day"?"este día":c==="week"?"esta semana":"este mes";a.innerHTML=`
                <div class="flex flex-col items-center justify-center p-6 h-[40vh] border border-white/5 border-dashed rounded-sm m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" class="text-cement mb-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    <p class="text-cement text-sm">No hay citas programadas para ${n}.</p>
                </div>`;return}a.innerHTML=t.map(n=>{const[i,l,d]=n.appointment_date.split("-").map(Number),o=new Date(i,l-1,d),p=n.appointment_time?n.appointment_time.substring(0,5):"00:00",w=o.toLocaleDateString("es-ES",{day:"numeric",month:"short"}),C=c!=="day"?`<div class="text-lg font-display text-white w-full text-center group-hover:text-amber transition-colors">${p}</div><div class="text-xs text-cement text-center">${w}</div>`:`<div class="text-lg font-display text-white w-full text-center group-hover:text-amber transition-colors">${p}</div>`;let u="bg-white/10 text-white/70",g=n.status||"Confirmada";const m=g.toLowerCase();m==="completed"||m==="completada"?(u="bg-green-500/10 text-green-400 border-green-500/20 border",g="Completada"):m==="cancelled"||m==="cancelada"?(u="bg-red-500/10 text-red-400 border-red-500/20 border",g="Cancelada"):m==="confirmed"||m==="confirmada"||m==="pending"||m==="pendiente"?(u="bg-amber/10 text-amber border-amber/20 border",g="Confirmada"):m==="no_show"?(u="bg-purple-500/10 text-purple-400 border-purple-500/20 border",g="No Show"):(u="bg-amber/10 text-amber border-amber/20 border",g="Confirmada");let f="Servicio",L=null,$=null;if(n.notes)try{if(n.notes.trim().startsWith("{")){const h=JSON.parse(n.notes);h.services&&Array.isArray(h.services)&&(f=h.services.map(A=>A.name).join(", ")),h.clientName&&(L=h.clientName),h.clientPhone&&($=h.clientPhone)}else f=n.notes}catch{f=n.notes}const B=n.profiles?.first_name?`${n.profiles.first_name}`:L||`ID: ${String(n.client_id).substring(0,8)}...`,D=n.profiles?.phone||$||"Sin número",y=n.barbers?.nickname||`ID: ${String(n.barber_id||"N/A").substring(0,8)}...`;n.total_duration_minutes&&`${n.total_duration_minutes}`;const M=n.price?`$${n.price}`:"N/A";return`
                <div class="bg-carbon/40 hover:bg-carbon/60 border border-white/5 rounded-sm p-4 transition-all duration-300 group cursor-pointer" onclick="window.viewAppointmentDetails('${n.id}')">
                    <div class="flex flex-col md:grid md:grid-cols-[80px_1.5fr_1.5fr_1fr_100px_40px] gap-4 items-center">

                        <!-- Hora y Fecha-->
                        <div class="flex flex-col items-center justify-center w-full">
                            ${C}
                        </div>

                        <!-- Cliente ID / Nombre (requiere mapeo relacional posterior) -->
                        <div class="text-center md:text-left min-w-0 w-full truncate">
                            <div class="text-sm font-medium text-white truncate capitalize">${B}</div>
                            <div class="text-[10px] text-cement truncate">${D}</div>
                        </div>

                        <!-- Servicio (requiere mapeo) -->
                        <div class="text-center md:text-left text-xs text-cement w-full truncate bg-white/5 rounded-sm px-2 py-1 flex items-center justify-between">
                            <span class="truncate pr-2" title="${f}">${f}</span>
                            <span class="text-amber font-bold">${M}</span>
                        </div>

                        <!-- Barbero (requiere mapeo) -->
                        <div class="text-center md:text-left text-sm text-cement w-full flex items-center justify-center md:justify-start gap-2">
                             <div class="w-6 h-6 rounded-full bg-[#A67C52] text-white flex flex-col items-center justify-center text-[10px] uppercase font-bold shrink-0">${y.charAt(0)}</div>
                             <span class="truncate capitalize">${y}</span>
                        </div>

                        <!-- Estado -->
                        <div class="text-center w-full flex justify-center">
                            <span class="px-2 py-1 rounded-sm text-[10px] uppercase tracking-wider font-bold ${u}">
                                ${g}
                            </span>
                        </div>

                        <!-- Indicador Hover -->
                        <div class="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity text-cement/50 hidden md:flex">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </div>
                    </div>
                </div>
            `}).join("")}document.addEventListener("DOMContentLoaded",()=>{b(),S(),document.getElementById("viewDayBtn")?.addEventListener("click",()=>{c="day",b(),x()}),document.getElementById("viewWeekBtn")?.addEventListener("click",()=>{c="week",b(),x()}),document.getElementById("viewMonthBtn")?.addEventListener("click",()=>{c="month",b(),x()}),document.getElementById("prevBtn")?.addEventListener("click",()=>{c==="day"?r.setDate(r.getDate()-1):c==="week"?r.setDate(r.getDate()-7):c==="month"&&r.setMonth(r.getMonth()-1),b(),x()}),document.getElementById("nextBtn")?.addEventListener("click",()=>{c==="day"?r.setDate(r.getDate()+1):c==="week"?r.setDate(r.getDate()+7):c==="month"&&r.setMonth(r.getMonth()+1),b(),x()}),document.getElementById("todayBtn")?.addEventListener("click",()=>{r=new Date,b(),x()});const a=document.getElementById("nativeDateInput");document.getElementById("currentDateDisplay")?.addEventListener("click",()=>{a&&typeof a.showPicker=="function"&&a.showPicker()}),a?.addEventListener("change",e=>{e.target.value&&(r=new Date(e.target.value+"T12:00:00"),b(),x())})});window.viewAppointmentDetails=a=>{const e=v.find(f=>f.id===a);if(!e)return;let s={services:[],clientEmail:""},t="";if(e.notes)try{s=JSON.parse(e.notes),s.services&&Array.isArray(s.services)?t=s.services.map(f=>`• ${f.name} ($${f.price})`).join("<br>"):t=e.notes}catch{t=e.notes}const n=e.profiles?.email||s.clientEmail||"Sin correo",i=e.profiles?.first_name?`${e.profiles.first_name}`:s.clientName||`ID: ${String(e.client_id).substring(0,8)}`,l=e.profiles?.phone||s.clientPhone||"Sin número",d=e.barbers?.nickname||"Sin asignar",o=(e.status||"pending").toLowerCase();let p="";o==="completed"||o==="completada"?p='<span class="px-2 py-1 rounded-sm text-xs uppercase tracking-wider font-bold bg-green-500/10 text-green-400 border-green-500/20 border">Completada</span>':o==="cancelled"||o==="cancelada"?p='<span class="px-2 py-1 rounded-sm text-xs uppercase tracking-wider font-bold bg-red-500/10 text-red-400 border-red-500/20 border">Cancelada</span>':o==="confirmed"||o==="confirmada"||o==="pending"||o==="pendiente"?p='<span class="px-2 py-1 rounded-sm text-xs uppercase tracking-wider font-bold bg-amber/10 text-amber border-amber/20 border">Confirmada</span>':o==="no_show"?p='<span class="px-2 py-1 rounded-sm text-xs uppercase tracking-wider font-bold bg-purple-500/10 text-purple-400 border-purple-500/20 border">No Show</span>':p='<span class="px-2 py-1 rounded-sm text-xs uppercase tracking-wider font-bold bg-amber/10 text-amber border-amber/20 border">Confirmada</span>';const w=document.getElementById("modalBody");w.innerHTML=`
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-3">
                    ${p}
                    <span class="text-cement text-[10px] font-mono select-all" title="Copiar ID de la cita">#${e.id.split("-")[0]}</span>
                </div>
                <span class="text-white/60 text-sm font-medium"><span class="text-amber">$</span>${e.price||"0"}</span>
            </div>
            
            <div class="space-y-3">
                <div class="flex items-center gap-3 bg-white/5 p-3 rounded-sm border border-white/5">
                    <div class="w-10 h-10 rounded-full bg-carbon text-white flex items-center justify-center font-bold border border-white/10 shrink-0">
                        ${i.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p class="text-white text-sm font-medium capitalize">${i}</p>
                        <p class="text-cement text-[11px] flex items-center gap-1 mt-0.5" title="Teléfono">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" class="text-amber shrink-0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> 
                            ${l}
                        </p>
                        <p class="text-cement text-[11px] flex items-center gap-1 mt-0.5" title="Correo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" class="text-amber shrink-0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            <span class="truncate">${n}</span>
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div class="bg-white/5 p-3 rounded-sm border border-white/5">
                        <p class="text-[10px] text-cement uppercase tracking-wider mb-1">Fecha y Hora</p>
                        <p class="text-sm text-white font-medium">${e.appointment_date}</p>
                        <p class="text-xs text-white/70">${e.appointment_time?e.appointment_time.substring(0,5):"00:00"} hrs (Aprox ${e.total_duration_minutes||"0"} min)</p>
                    </div>
                    <div class="bg-white/5 p-3 rounded-sm border border-white/5">
                        <p class="text-[10px] text-cement uppercase tracking-wider mb-1">Barbero</p>
                        <p class="text-sm text-white font-medium capitalize flex items-center gap-2">
                            <span class="w-5 h-5 rounded-full bg-[#A67C52] text-[9px] flex items-center justify-center shrink-0">${d.charAt(0)}</span>
                            ${d}
                        </p>
                    </div>
                </div>

                ${t?`
                <div class="bg-white/5 p-3 rounded-sm border border-white/5">
                    <p class="text-[10px] text-cement uppercase tracking-wider mb-1">Servicios solicitados</p>
                    <p class="text-sm text-white/80">${t}</p>
                </div>
                `:""}
            </div>
        `;const C=document.getElementById("modalFooter"),u=o==="pending"||o==="pendiente"||o==="confirmada"||o==="confirmed";C.innerHTML=`
            <button type="button" class="px-4 py-2 ${u?"":"w-full"} rounded-sm border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm cursor-pointer" onclick="window.closeAdminModal()">
                ${u?"Cerrar":"Cerrar Detalles"}
            </button>
            ${u?`
            <button type="button" id="btnCancelApp-${e.id}" class="px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-sm font-medium cursor-pointer" onclick="window.confirmCancelModal('${e.id}')">
                Cancelar Cita
            </button>
            <button type="button" id="btnCompleteApp-${e.id}" class="px-4 py-2 rounded-sm border border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all text-sm font-medium cursor-pointer flex-1" onclick="window.confirmCompleteModal('${e.id}', '${e.client_id||""}', ${e.price})">
                Marcar Completada
            </button>
            `:""}
        `;const g=document.getElementById("appointmentModal"),m=document.getElementById("appointmentModalContent");g.classList.remove("hidden"),g.classList.add("flex"),setTimeout(()=>{m.classList.remove("scale-95","opacity-0"),m.classList.add("scale-100","opacity-100")},10)};window.closeAdminModal=()=>{const a=document.getElementById("appointmentModal"),e=document.getElementById("appointmentModalContent");e.classList.remove("scale-100","opacity-100"),e.classList.add("scale-95","opacity-0"),setTimeout(()=>{a.classList.add("hidden"),a.classList.remove("flex")},300)};window.confirmCancelModal=a=>{const e=document.getElementById(`btnCancelApp-${a}`);if(e){if(e.dataset.confirming==="true"){window.cancelAppointment(a,e);return}e.dataset.confirming="true",e.innerText="¿Seguro? Confirmar Cancelación",e.classList.remove("bg-red-500/10","text-red-400","border-red-500/30"),e.classList.add("bg-red-500","text-white","border-red-500"),setTimeout(()=>{e&&e.dataset.confirming==="true"&&(e.dataset.confirming="false",e.innerText="Cancelar Cita",e.classList.remove("bg-red-500","text-white","border-red-500"),e.classList.add("bg-red-500/10","text-red-400","border-red-500/30"))},4e3)}};window.cancelAppointment=async(a,e=null)=>{const s=e?e.innerHTML:"";e&&(e.innerHTML='<svg class="animate-spin h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>',e.disabled=!0);try{const{data:t,error:n}=await k.from("appointments").update({status:"cancelled"}).eq("id",a).select();if(n)throw n;if(!t||t.length===0)throw new Error("SUPABASE_RLS_BLOCK: Permisos insuficientes en la Base de Datos para modificar esta cita. (RLS Activado)");v=v.map(i=>i.id===a?{...i,status:"cancelled"}:i),x(),window.closeAdminModal()}catch(t){console.error(t),alert("Hubo un error al cancelar la cita."),e&&(e.innerHTML=s,e.disabled=!1)}};window.confirmCompleteModal=(a,e,s)=>{const t=document.getElementById(`btnCompleteApp-${a}`);if(t){if(t.dataset.confirming==="true"){window.completeAppointmentAndAssignPoints(a,e,s,t);return}t.dataset.confirming="true",t.innerText="¿Confirmar Completada?",t.classList.remove("bg-green-500/10","text-green-400","border-green-500/30"),t.classList.add("bg-green-500","text-white","border-green-500"),setTimeout(()=>{t&&t.dataset.confirming==="true"&&(t.dataset.confirming="false",t.innerText="Marcar Completada",t.classList.remove("bg-green-500","text-white","border-green-500"),t.classList.add("bg-green-500/10","text-green-400","border-green-500/30"))},4e3)}};window.completeAppointmentAndAssignPoints=async(a,e,s,t=null)=>{const n=t?t.innerHTML:"";t&&(t.innerHTML='<svg class="animate-spin h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>',t.disabled=!0);try{const{data:i,error:l}=await k.from("appointments").update({status:"completed"}).eq("id",a).select();if(l)throw l;if(!i||i.length===0)throw new Error("SUPABASE_RLS_BLOCK: Permisos insuficientes en la Base de Datos para modificar esta cita. (RLS Activado)");if(e&&e!=="null"&&e!=="undefined"){const{data:d,error:o}=await k.from("profiles").select("points, visits").eq("id",e).single();if(!o&&d){const p=(d.points||0)+Math.floor(s||0),w=(d.visits||0)+1;await k.from("profiles").update({points:p,visits:w}).eq("id",e)}}v=v.map(d=>d.id===a?{...d,status:"completed"}:d),x(),window.closeAdminModal()}catch(i){console.error("Error definitivo al completar:",i),i.message&&i.message.includes("RLS")?alert("Acceso Denegado: La BD bloqueó el cambio por políticas RLS. Inicia sesión o ajusta permisos en Supabase."):alert("Hubo un error al marcar como completada: "+i.message),t&&(t.innerHTML=n,t.disabled=!1)}};
