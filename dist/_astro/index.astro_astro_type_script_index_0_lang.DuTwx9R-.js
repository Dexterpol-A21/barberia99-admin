import{s as m}from"./supabase.C8JFIDnn.js";const z=document.getElementById("btn-open-modal"),O=document.getElementById("btn-close-modal"),J=document.getElementById("btn-cancel-modal"),p=document.getElementById("modal-invite"),u=document.getElementById("modal-content"),c=document.getElementById("modal-notification");function j(){!p||!u||(p.classList.remove("opacity-0","pointer-events-none"),u.classList.remove("scale-95"),u.classList.add("scale-100"))}function I(){!p||!u||(p.classList.add("opacity-0","pointer-events-none"),u.classList.remove("scale-100"),u.classList.add("scale-95"),C())}function y(r,i=!1){c&&(c.innerHTML=r,c.classList.remove("hidden"),i?c.className="mb-4 p-3 rounded-sm text-sm font-medium flex items-center gap-2 bg-red-500/20 text-red-500 border border-red-500/50":c.className="mb-4 p-3 rounded-sm text-sm font-medium flex items-center gap-2 bg-green-500/20 text-green-400 border border-green-500/50")}function C(){c&&c.classList.add("hidden")}const b=document.getElementById("input-barber-id"),s=document.getElementById("input-email"),E=document.getElementById("input-alias"),S=document.getElementById("input-specialty"),v=document.getElementById("input-commission"),g=document.getElementById("input-quota"),w=document.getElementById("input-active"),q=document.getElementById("input-start-time"),M=document.getElementById("input-end-time"),f=document.getElementById("invite-barber-form"),n=f?.querySelector('button[type="submit"]'),T=document.getElementById("div-active"),B=document.getElementById("edit-notice-email"),k=document.getElementById("modal-title"),L=document.getElementById("modal-subtitle"),x=document.getElementById("barbers-tbody");async function $(){try{const{data:r,error:i}=await m.from("barbers").select(`
                        id,
                        nickname,
                        specialty,
                        commission_rate,
                        base_quota_cuts,
                        is_active,
                        schedule,
                        profile_id,
                        profiles (
                            first_name,
                            phone
                        )
                    `).order("created_at",{ascending:!1});if(i)throw i;if(!r||r.length===0){x&&(x.innerHTML='<tr><td colspan="6" class="p-6 text-center text-cement text-sm font-mono">[ Lista de Barberos aparecerá aquí al agregarlos ]</td></tr>');return}x&&(x.innerHTML=r.map(t=>{const e=t.schedule||{startTime:"10:00",endTime:"20:00",workDays:["1","2","3","4","5","6"]},o={1:"Lu",2:"Ma",3:"Mi",4:"Ju",5:"Vi",6:"Sa",0:"Do"};let a=(e.workDays||[]).map(l=>o[l.toString()]).join(", ");return a||(a="Sin asignar"),`
                        <tr class="hover:bg-white/[0.02] transition-colors group">
                            <td class="p-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center text-amber font-bold font-display uppercase">
                                        ${t.nickname?t.nickname.substring(0,1):"B"}
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-white">${t.nickname}</p>
                                        <p class="text-[10px] text-amber">${t.specialty||"Barbero"}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="p-4 text-sm text-cement">
                                ${t.profiles?`${t.profiles.first_name||"Sin nombre"}`.trim():"Sin enlazar"}
                                ${t.profiles?.phone?`<div class="text-[10px] text-cement/70">${t.profiles.phone}</div>`:""}
                            </td>
                            <td class="p-4">
                                <div class="text-[10px] text-cement/70 font-medium mb-1">${a}</div>
                                <div class="flex items-center gap-1.5 text-white text-xs">
                                    ${e.startTime.startsWith("0")||e.startTime.startsWith("10")||e.startTime.startsWith("11")?e.startTime+" am":(parseInt(e.startTime.split(":")[0])>12?(parseInt(e.startTime.split(":")[0])-12).toString().padStart(2,"0"):parseInt(e.startTime.split(":")[0]).toString().padStart(2,"0"))+":"+e.startTime.split(":")[1]+" pm"} - ${e.endTime.startsWith("0")||e.endTime.startsWith("10")||e.endTime.startsWith("11")?e.endTime+" am":(parseInt(e.endTime.split(":")[0])>12?(parseInt(e.endTime.split(":")[0])-12).toString().padStart(2,"0"):parseInt(e.endTime.split(":")[0]).toString().padStart(2,"0"))+":"+e.endTime.split(":")[1]+" pm"}
                                </div>
                            </td>
                            <td class="p-4">
                                <span class="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-white/10 text-white uppercase tracking-widest">
                                    ${t.commission_rate}%
                                </span>
                                <div class="text-[10px] text-cement/70 mt-1">Cuota: ${t.base_quota_cuts} cortes</div>
                            </td>
                            <td class="p-4">
                                ${t.is_active?`
                                    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs font-medium text-green-400">
                                        <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Activo
                                    </span>
                                `:`
                                    <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs font-medium text-red-400">
                                        <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Inactivo
                                    </span>
                                `}
                            </td>
                            <td class="p-4 text-right flex justify-end gap-2">
                                <button class="btn-edit-barbero text-cement hover:text-amber transition-colors cursor-pointer p-2" title="Editar Horario y Barbero" data-barber='${JSON.stringify(t).replace(/'/g,"&#39;")}'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                                </button>
                                <button class="btn-delete-barbero text-cement hover:text-red-400 transition-colors cursor-pointer p-2" title="Eliminar/Desactivar" data-id="${t.id}" data-profile-id="${t.profile_id}" data-name="${t.nickname}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                </button>
                            </td>
                        </tr>
                        `}).join(""))}catch(r){console.error("Error cargando barberos:",r)}}$();z?.addEventListener("click",()=>{f&&f.reset(),b&&(b.value=""),v&&(v.value="50"),g&&(g.value="10"),k&&(k.innerText="Vincular Barbero"),L&&(L.innerText="Buscaremos un cliente registrado y le daremos el rol de barbero."),T&&T.classList.add("hidden"),B&&B.classList.add("hidden"),n&&(n.innerHTML="Vincular y Guardar"),s&&(s.required=!0,s.disabled=!1,s.classList.remove("opacity-50","cursor-not-allowed"),s.value=""),j()});document.addEventListener("click",async r=>{const i=r.target.closest(".btn-delete-barbero");if(i){const t=i.getAttribute("data-id"),e=i.getAttribute("data-profile-id"),o=i.getAttribute("data-name");if(confirm(`¿Estás seguro de que deseas eliminar definitivamente al barbero "${o}"?
Esto le quitará el acceso al sistema y dejará de ser barbero.`))try{if(e){const{error:l}=await m.from("profiles").update({role:"client"}).eq("id",e);l&&console.warn("No se pudo quitar el rol. Omitiendo...",l)}const{error:a}=await m.from("barbers").delete().eq("id",t);if(a)throw a;alert("Barbero eliminado correctamente."),$()}catch(a){console.error("Error eliminando barbero:",a),alert("Hubo un error al intentar eliminar el barbero.")}}});document.addEventListener("click",r=>{const i=r.target.closest(".btn-edit-barbero");if(!i)return;const t=i.dataset.barber||"{}",e=JSON.parse(t);if(f&&f.reset(),b&&(b.value=e.id||""),s&&(e.profiles?.email?s.value=e.profiles.email:e.profiles?.first_name&&(s.value="Enlazado ("+e.profiles.first_name+")"),s.required=!1,s.disabled=!0,s.classList.add("opacity-50","cursor-not-allowed")),E&&(E.value=e.nickname||""),S&&(S.value=e.specialty||""),v&&(v.value=e.commission_rate||"50"),g&&(g.value=e.base_quota_cuts||"10"),w&&(w.checked=e.is_active!==!1),e.schedule){q&&(q.value=e.schedule.startTime||"10:00"),M&&(M.value=e.schedule.endTime||"20:00");const o=e.schedule.workDays||[];document.querySelectorAll(".day-checkbox").forEach(a=>{a.checked=o.includes(a.value)||o.includes(parseInt(a.value))})}k&&(k.innerText="Editar Barbero y Horario"),L&&(L.innerText="Modifica comisiones, su horario base de trabajo o su estado activo."),T&&T.classList.remove("hidden"),B&&B.classList.remove("hidden"),n&&(n.innerHTML="Guardar Cambios"),j()});O?.addEventListener("click",I);J?.addEventListener("click",I);p?.addEventListener("click",r=>{r.target===p&&I()});f?.addEventListener("submit",async r=>{if(r.preventDefault(),C(),!n)return;const i=n.innerHTML;n.innerHTML="Procesando...",n.setAttribute("disabled","true");try{const t=b?.value,e=s?.value,o=E?.value||(e?e.split("@")[0]:""),a=S?.value||"Barbero",l=parseFloat(v?.value||"50"),H=parseInt(g?.value||"10"),A=w?w.checked:!0,N=[];document.querySelectorAll(".day-checkbox:checked").forEach(d=>{N.push(parseInt(d.value))});const h={startTime:q?.value||"10:00",endTime:M?.value||"20:00",workDays:N};if(h.startTime>=h.endTime){y("La hora de salida debe ser después de la hora de entrada.",!0),n.innerHTML=i,n.removeAttribute("disabled");return}if(t){const{error:d}=await m.from("barbers").update({nickname:o,specialty:a,commission_rate:l,base_quota_cuts:H,is_active:A,schedule:h}).eq("id",t);if(d)throw d;y("¡Barbero actualizado correctamente!")}else{const{data:d,error:D}=await m.from("profiles").select("id, first_name").eq("email",e).single();if(D||!d)throw new Error("No se encontró ningún usuario cliente con ese correo. El barbero debe registrarse primero en la app.");const{error:W}=await m.from("profiles").update({role:"barber"}).eq("id",d.id);if(W)throw new Error("Error al actualizar el rol del usuario.");const V=E?.value||d.first_name||o,{error:_}=await m.from("barbers").insert([{profile_id:d.id,nickname:V,specialty:a,commission_rate:l,base_quota_cuts:H,is_active:A,schedule:h}]);if(_)throw _.code==="23505"?new Error("Este usuario ya está registrado como barbero."):new Error("Error al crear el perfil de barbero: "+_.message);y("¡Barbero vinculado exitosamente!")}setTimeout(()=>{I(),$()},1500)}catch(t){console.error("Error procesando barbero:",t),y(t.message||"Error al procesar.",!0)}finally{n.innerHTML=i,n.removeAttribute("disabled")}});
