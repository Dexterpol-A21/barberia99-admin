import{s as M}from"./supabase.C8JFIDnn.js";let y=[],n=new Date,i="day";function h(){const a=document.getElementById("dateText");if(!a)return;if(i==="day"){const r={weekday:"long",year:"numeric",month:"long",day:"numeric"};let t=n.toLocaleDateString("es-ES",r);t=t.charAt(0).toUpperCase()+t.slice(1),a.innerText=t}else if(i==="week"){const r=new Date(n.getFullYear(),n.getMonth(),n.getDate()-n.getDay()+1),t=new Date(r.getFullYear(),r.getMonth(),r.getDate()+6),d=r.toLocaleDateString("es-ES",{day:"numeric",month:"short"}),c=t.toLocaleDateString("es-ES",{day:"numeric",month:"short",year:"numeric"});a.innerText=`${d} al ${c}`}else if(i==="month"){let r=n.toLocaleDateString("es-ES",{month:"long",year:"numeric"});r=r.charAt(0).toUpperCase()+r.slice(1),a.innerText=r}const e=document.getElementById("nativeDateInput");if(e){const r=n.getFullYear(),t=String(n.getMonth()+1).padStart(2,"0"),d=String(n.getDate()).padStart(2,"0");e.value=`${r}-${t}-${d}`}["day","week","month"].forEach(r=>{const t=document.getElementById(`view${r.charAt(0).toUpperCase()+r.slice(1)}Btn`);t&&(r===i?t.className="px-3 py-1 bg-white/10 text-white rounded-[1px] text-xs font-medium focus:outline-none transition-colors cursor-pointer":t.className="px-3 py-1 text-cement hover:text-white rounded-[1px] text-xs transition-colors cursor-pointer")})}async function B(){try{const{data:a,error:e}=await M.from("appointments").select(`
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
                `).order("appointment_date",{ascending:!0}).order("appointment_time",{ascending:!0});if(e)throw console.error("Error fetching appointments:",e.message),e;y=a||[],L(y),f()}catch(a){console.error("Error definitivo listando agenda:",a);const e=document.getElementById("appointmentsContainer");e&&(e.innerHTML='<div class="p-6 text-center text-red-400 text-sm">Error conectando con la agenda. Revisa la consola o la estructura de la base de datos.</div>')}}function L(a){const e=new Date,s=new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime(),r=new Date(e.getFullYear(),e.getMonth(),e.getDate()+1).getTime(),t=new Date(e.getFullYear(),e.getMonth(),1).getTime();let d=0,c=0,u=0;a.forEach(p=>{const[x,k,v]=p.appointment_date.split("-").map(Number),C=new Date(x,k-1,v).getTime();if(C>=s&&C<r&&d++,C>=t){const D=(p.status||"").toLowerCase();(D==="completed"||D==="completada")&&c++,(D==="cancelled"||D==="cancelada")&&u++}});const o=document.getElementById("metricToday"),g=document.getElementById("metricCompleted"),w=document.getElementById("metricCanceled"),b=document.getElementById("barCompleted"),l=document.getElementById("barCanceled");o&&(o.innerText=d),g&&(g.innerText=c),w&&(w.innerText=u);const m=c+u||1;b&&(b.style.width=`${c/m*100}%`),l&&(l.style.width=`${u/m*100}%`)}function f(){const a=document.getElementById("appointmentsContainer");if(!a)return;let e,s;if(i==="day")e=new Date(n.getFullYear(),n.getMonth(),n.getDate()).getTime(),s=new Date(n.getFullYear(),n.getMonth(),n.getDate()+1).getTime();else if(i==="week"){const t=new Date(n.getFullYear(),n.getMonth(),n.getDate()-n.getDay()+1);e=t.getTime(),s=new Date(t.getFullYear(),t.getMonth(),t.getDate()+7).getTime()}else i==="month"&&(e=new Date(n.getFullYear(),n.getMonth(),1).getTime(),s=new Date(n.getFullYear(),n.getMonth()+1,1).getTime());const r=y.filter(t=>{const[d,c,u]=t.appointment_date.split("-").map(Number),o=new Date(d,c-1,u).getTime();return o>=e&&o<s});if(r.length===0){let t=i==="day"?"este día":i==="week"?"esta semana":"este mes";a.innerHTML=`
                <div class="flex flex-col items-center justify-center p-6 h-[40vh] border border-white/5 border-dashed rounded-sm m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" class="text-cement mb-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                    <p class="text-cement text-sm">No hay citas programadas para ${t}.</p>
                </div>`;return}a.innerHTML=r.map(t=>{const[d,c,u]=t.appointment_date.split("-").map(Number),o=new Date(d,c-1,u),g=t.appointment_time?t.appointment_time.substring(0,5):"00:00",w=o.toLocaleDateString("es-ES",{day:"numeric",month:"short"}),b=i!=="day"?`<div class="text-lg font-display text-white w-full text-center group-hover:text-amber transition-colors">${g}</div><div class="text-xs text-cement text-center">${w}</div>`:`<div class="text-lg font-display text-white w-full text-center group-hover:text-amber transition-colors">${g}</div>`;let l="bg-white/10 text-white/70",m=t.status||"Pendiente";const p=m.toLowerCase();p==="completed"||p==="completada"?(l="bg-green-500/10 text-green-400 border-green-500/20 border",m="Completada"):p==="cancelled"||p==="cancelada"?(l="bg-red-500/10 text-red-400 border-red-500/20 border",m="Cancelada"):p==="confirmed"||p==="confirmada"?(l="bg-blue-500/10 text-blue-400 border-blue-500/20 border",m="Confirmada"):(l="bg-amber/10 text-amber border-amber/20 border",m="Pendiente");const x=t.profiles?.first_name?`${t.profiles.first_name}`:`ID: ${String(t.client_id).substring(0,8)}...`,k=t.profiles?.phone||"Sin número",v=t.barbers?.nickname||`ID: ${String(t.barber_id||"N/A").substring(0,8)}...`;t.total_duration_minutes&&`${t.total_duration_minutes}`;const $=t.price?`$${t.price}`:"N/A";return`
                <div class="bg-carbon/40 hover:bg-carbon/60 border border-white/5 rounded-sm p-4 transition-all duration-300 group cursor-pointer" onclick="window.viewAppointmentDetails('${t.id}')">
                    <div class="flex flex-col md:grid md:grid-cols-[80px_1.5fr_1.5fr_1fr_80px] gap-4 items-center relative">

                        <!-- Hora y Fecha-->
                        <div class="flex flex-col items-center justify-center w-full">
                            ${b}
                        </div>

                        <!-- Cliente ID / Nombre (requiere mapeo relacional posterior) -->
                        <div class="text-center md:text-left min-w-0 w-full truncate">
                            <div class="text-sm font-medium text-white truncate capitalize">${x}</div>
                            <div class="text-[10px] text-cement truncate">${k}</div>
                        </div>

                        <!-- Servicio (requiere mapeo) -->
                        <div class="text-center md:text-left text-xs text-cement w-full truncate bg-white/5 rounded-sm px-2 py-1 flex items-center justify-between">
                            <span>Svc: ${t.notes?"Múltiples/Personalizado":"Servicio"}</span>
                            <span class="text-amber font-bold">${$}</span>
                        </div>

                        <!-- Barbero (requiere mapeo) -->
                        <div class="text-center md:text-left text-sm text-cement w-full flex items-center justify-center md:justify-start gap-2">
                             <div class="w-6 h-6 rounded-full bg-[#A67C52] text-white flex flex-col items-center justify-center text-[10px] uppercase font-bold shrink-0">${v.charAt(0)}</div>
                             <span class="truncate capitalize">${v}</span>
                        </div>

                        <!-- Estado -->
                        <div class="text-center w-full flex justify-center">
                            <span class="px-2 py-1 rounded-sm text-[10px] uppercase tracking-wider font-bold ${l}">
                                ${m}
                            </span>
                        </div>

                        <!-- Indicador Hover -->
                        <div class="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-cement/50 hidden md:block">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </div>
                    </div>
                </div>
            `}).join("")}document.addEventListener("DOMContentLoaded",()=>{h(),B(),document.getElementById("viewDayBtn")?.addEventListener("click",()=>{i="day",h(),f()}),document.getElementById("viewWeekBtn")?.addEventListener("click",()=>{i="week",h(),f()}),document.getElementById("viewMonthBtn")?.addEventListener("click",()=>{i="month",h(),f()}),document.getElementById("prevBtn")?.addEventListener("click",()=>{i==="day"?n.setDate(n.getDate()-1):i==="week"?n.setDate(n.getDate()-7):i==="month"&&n.setMonth(n.getMonth()-1),h(),f()}),document.getElementById("nextBtn")?.addEventListener("click",()=>{i==="day"?n.setDate(n.getDate()+1):i==="week"?n.setDate(n.getDate()+7):i==="month"&&n.setMonth(n.getMonth()+1),h(),f()}),document.getElementById("todayBtn")?.addEventListener("click",()=>{n=new Date,h(),f()});const a=document.getElementById("nativeDateInput");document.getElementById("currentDateDisplay")?.addEventListener("click",()=>{a&&typeof a.showPicker=="function"&&a.showPicker()}),a?.addEventListener("change",e=>{e.target.value&&(n=new Date(e.target.value+"T12:00:00"),h(),f())})});window.viewAppointmentDetails=a=>{const e=y.find(x=>x.id===a);if(!e)return;let s={services:[],clientEmail:""},r="";if(e.notes)try{s=JSON.parse(e.notes),s.services&&Array.isArray(s.services)?r=s.services.map(x=>`• ${x.name} ($${x.price})`).join("<br>"):r=e.notes}catch{r=e.notes}const t=e.profiles?.email||s.clientEmail||"Sin correo",d=e.profiles?.first_name?`${e.profiles.first_name}`:`ID: ${String(e.client_id).substring(0,8)}`,c=e.profiles?.phone||s.clientPhone||"Sin número",u=e.barbers?.nickname||"Sin asignar",o=(e.status||"pending").toLowerCase();let g="";o==="completed"||o==="completada"?g='<span class="px-2 py-1 rounded-sm text-xs uppercase tracking-wider font-bold bg-green-500/10 text-green-400 border-green-500/20 border">Completada</span>':o==="cancelled"||o==="cancelada"?g='<span class="px-2 py-1 rounded-sm text-xs uppercase tracking-wider font-bold bg-red-500/10 text-red-400 border-red-500/20 border">Cancelada</span>':o==="confirmed"||o==="confirmada"?g='<span class="px-2 py-1 rounded-sm text-xs uppercase tracking-wider font-bold bg-blue-500/10 text-blue-400 border-blue-500/20 border">Confirmada</span>':g='<span class="px-2 py-1 rounded-sm text-xs uppercase tracking-wider font-bold bg-amber/10 text-amber border-amber/20 border">Pendiente</span>';const w=document.getElementById("modalBody");w.innerHTML=`
            <div class="flex items-center justify-between mb-2">
                ${g}
                <span class="text-white/60 text-sm font-medium"><span class="text-amber">$</span>${e.price||"0"}</span>
            </div>
            
            <div class="space-y-3">
                <div class="flex items-center gap-3 bg-white/5 p-3 rounded-sm border border-white/5">
                    <div class="w-10 h-10 rounded-full bg-carbon text-white flex items-center justify-center font-bold border border-white/10 shrink-0">
                        ${d.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p class="text-white text-sm font-medium capitalize">${d}</p>
                        <p class="text-cement text-[11px] flex items-center gap-1 mt-0.5" title="Teléfono">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" class="text-amber shrink-0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> 
                            ${c}
                        </p>
                        <p class="text-cement text-[11px] flex items-center gap-1 mt-0.5" title="Correo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" class="text-amber shrink-0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            <span class="truncate">${t}</span>
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
                            <span class="w-5 h-5 rounded-full bg-[#A67C52] text-[9px] flex items-center justify-center shrink-0">${u.charAt(0)}</span>
                            ${u}
                        </p>
                    </div>
                </div>

                ${r?`
                <div class="bg-white/5 p-3 rounded-sm border border-white/5">
                    <p class="text-[10px] text-cement uppercase tracking-wider mb-1">Servicios solicitados</p>
                    <p class="text-sm text-white/80">${r}</p>
                </div>
                `:""}
            </div>
        `;const b=document.getElementById("modalFooter"),l=o==="pending"||o==="pendiente"||o==="confirmada"||o==="confirmed";b.innerHTML=`
            <button type="button" class="px-4 py-2 ${l?"":"w-full"} rounded-sm border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm cursor-pointer" onclick="window.closeAdminModal()">
                ${l?"Cerrar":"Cerrar Detalles"}
            </button>
            ${l?`
            <button type="button" id="btnCancelApp-${e.id}" class="px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-sm font-medium cursor-pointer flex-1" onclick="window.confirmCancelModal('${e.id}')">
                Cancelar Cita
            </button>
            `:""}
        `;const m=document.getElementById("appointmentModal"),p=document.getElementById("appointmentModalContent");m.classList.remove("hidden"),m.classList.add("flex"),setTimeout(()=>{p.classList.remove("scale-95","opacity-0"),p.classList.add("scale-100","opacity-100")},10)};window.closeAdminModal=()=>{const a=document.getElementById("appointmentModal"),e=document.getElementById("appointmentModalContent");e.classList.remove("scale-100","opacity-100"),e.classList.add("scale-95","opacity-0"),setTimeout(()=>{a.classList.add("hidden"),a.classList.remove("flex")},300)};window.confirmCancelModal=a=>{const e=document.getElementById(`btnCancelApp-${a}`);if(e){if(e.dataset.confirming==="true"){window.cancelAppointment(a,e);return}e.dataset.confirming="true",e.innerText="¿Seguro? Confirmar Cancelación",e.classList.remove("bg-red-500/10","text-red-400","border-red-500/30"),e.classList.add("bg-red-500","text-white","border-red-500"),setTimeout(()=>{e&&e.dataset.confirming==="true"&&(e.dataset.confirming="false",e.innerText="Cancelar Cita",e.classList.remove("bg-red-500","text-white","border-red-500"),e.classList.add("bg-red-500/10","text-red-400","border-red-500/30"))},4e3)}};window.cancelAppointment=async(a,e=null)=>{const s=e?e.innerHTML:"";e&&(e.innerHTML='<svg class="animate-spin h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>',e.disabled=!0);try{const{error:r}=await M.from("appointments").update({status:"cancelled"}).eq("id",a);if(r)throw r;y=y.map(t=>t.id===a?{...t,status:"cancelled"}:t),f(),window.closeAdminModal()}catch(r){console.error(r),alert("Hubo un error al cancelar la cita."),e&&(e.innerHTML=s,e.disabled=!1)}};
