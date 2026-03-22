import{s as m}from"./supabase.C8JFIDnn.js";const V=document.getElementById("btn-open-modal"),O=document.getElementById("btn-close-modal"),R=document.getElementById("btn-cancel-modal"),p=document.getElementById("modal-invite"),u=document.getElementById("modal-content"),c=document.getElementById("modal-notification");function j(){!p||!u||(p.classList.remove("opacity-0","pointer-events-none"),u.classList.remove("scale-95"),u.classList.add("scale-100"))}function g(){!p||!u||(p.classList.add("opacity-0","pointer-events-none"),u.classList.remove("scale-100"),u.classList.add("scale-95"),C())}function T(r,i=!1){c&&(c.innerHTML=r,c.classList.remove("hidden"),i?c.className="mb-4 p-3 rounded-sm text-sm font-medium flex items-center gap-2 bg-red-500/20 text-red-500 border border-red-500/50":c.className="mb-4 p-3 rounded-sm text-sm font-medium flex items-center gap-2 bg-green-500/20 text-green-400 border border-green-500/50")}function C(){c&&c.classList.add("hidden")}const h=document.getElementById("input-barber-id"),s=document.getElementById("input-email"),B=document.getElementById("input-alias"),A=document.getElementById("input-specialty"),y=document.getElementById("input-commission"),x=document.getElementById("input-quota"),k=document.getElementById("input-active"),H=document.getElementById("input-start-time"),D=document.getElementById("input-end-time"),f=document.getElementById("invite-barber-form"),n=f?.querySelector('button[type="submit"]'),I=document.getElementById("div-active"),S=document.getElementById("edit-notice-email"),_=document.getElementById("modal-title"),q=document.getElementById("modal-subtitle"),L=document.getElementById("barbers-tbody");async function M(){try{const{data:r,error:i}=await m.from("barbers").select(`
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
                    `).order("created_at",{ascending:!1});if(i)throw i;if(!r||r.length===0){L&&(L.innerHTML='<tr><td colspan="6" class="p-6 text-center text-cement text-sm font-mono">[ Lista de Barberos aparecerá aquí al agregarlos ]</td></tr>');return}L&&(L.innerHTML=r.map(t=>{const e=t.schedule||{startTime:"10:00",endTime:"20:00",workDays:["1","2","3","4","5","6"]},o={1:"Lu",2:"Ma",3:"Mi",4:"Ju",5:"Vi",6:"Sa",0:"Do"};let a=(e.workDays||[]).map(l=>o[l.toString()]).join(", ");return a||(a="Sin asignar"),`
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
                        `}).join(""))}catch(r){console.error("Error cargando barberos:",r)}}M();V?.addEventListener("click",()=>{f&&f.reset(),h&&(h.value=""),y&&(y.value="50"),x&&(x.value="10"),_&&(_.innerText="Vincular Barbero"),q&&(q.innerText="Buscaremos un cliente registrado y le daremos el rol de barbero."),I&&I.classList.add("hidden"),S&&S.classList.add("hidden"),n&&(n.innerHTML="Vincular y Guardar"),s&&(s.required=!0,s.disabled=!1,s.classList.remove("opacity-50","cursor-not-allowed"),s.value=""),j()});document.addEventListener("click",async r=>{const i=r.target.closest(".btn-delete-barbero");if(i){const t=i.getAttribute("data-id"),e=i.getAttribute("data-profile-id"),o=i.getAttribute("data-name");if(confirm(`¿Estás seguro de que deseas eliminar definitivamente al barbero "${o}"?
Esto le quitará el acceso al sistema y dejará de ser barbero.`))try{if(e){const{data:b,error:v}=await m.from("profiles").update({role:"client"}).eq("id",e).select();(v||!b||b.length===0)&&console.warn("No se pudo quitar el rol (¿Bloqueado por RLS?). Omitiendo...",v)}const{data:a,error:l}=await m.from("barbers").delete().eq("id",t).select();if(l)throw l;if(!a||a.length===0)throw new Error("Acceso denegado por permisos de RLS al intentar eliminar en barbers.");M()}catch(a){console.error("Error eliminando barbero:",a),alert("Hubo un error al intentar eliminar el barbero.")}}});document.addEventListener("click",r=>{const i=r.target.closest(".btn-edit-barbero");if(!i)return;const t=i.dataset.barber||"{}",e=JSON.parse(t);if(f&&f.reset(),h&&(h.value=e.id||""),s&&(e.profiles?.email?s.value=e.profiles.email:e.profiles?.first_name&&(s.value="Enlazado ("+e.profiles.first_name+")"),s.required=!1,s.disabled=!0,s.classList.add("opacity-50","cursor-not-allowed")),B&&(B.value=e.nickname||""),A&&(A.value=e.specialty||""),y&&(y.value=e.commission_rate||"50"),x&&(x.value=e.base_quota_cuts||"10"),k&&(k.checked=e.is_active!==!1),e.schedule){H&&(H.value=e.schedule.startTime||"10:00"),D&&(D.value=e.schedule.endTime||"20:00");const o=e.schedule.workDays||[];document.querySelectorAll(".day-checkbox").forEach(a=>{a.checked=o.includes(a.value)||o.includes(parseInt(a.value))})}_&&(_.innerText="Editar Barbero y Horario"),q&&(q.innerText="Modifica comisiones, su horario base de trabajo o su estado activo."),I&&I.classList.remove("hidden"),S&&S.classList.remove("hidden"),n&&(n.innerHTML="Guardar Cambios"),j()});O?.addEventListener("click",g);R?.addEventListener("click",g);p?.addEventListener("click",r=>{r.target===p&&g()});f?.addEventListener("submit",async r=>{if(r.preventDefault(),C(),!n)return;const i=n.innerHTML;n.innerHTML="Procesando...",n.setAttribute("disabled","true");try{const t=h?.value,e=s?.value,o=B?.value||(e?e.split("@")[0]:""),a=A?.value||"Barbero",l=parseFloat(y?.value||"50"),b=parseInt(x?.value||"10"),v=k?k.checked:!0,N=[];document.querySelectorAll(".day-checkbox:checked").forEach(d=>{N.push(parseInt(d.value))});const E={startTime:H?.value||"10:00",endTime:D?.value||"20:00",workDays:N};if(E.startTime>=E.endTime){T("La hora de salida debe ser después de la hora de entrada.",!0),n.innerHTML=i,n.removeAttribute("disabled");return}if(t){const{data:d,error:w}=await m.from("barbers").update({nickname:o,specialty:a,commission_rate:l,base_quota_cuts:b,is_active:v,schedule:E}).eq("id",t).select();if(w)throw w;if(!d||d.length===0)throw new Error("No se pudo actualizar (Permiso RLS de UPDATE denegado en la base de datos).");T("¡Barbero actualizado correctamente!"),setTimeout(()=>{g(),M()},1500)}else{const{data:d,error:w}=await m.from("profiles").select("id, first_name").eq("email",e).single();if(w||!d)throw new Error("No se encontró ningún usuario cliente con ese correo. El barbero debe registrarse primero en la app.");const{error:W}=await m.from("profiles").update({role:"barber"}).eq("id",d.id);if(W)throw new Error("Error al actualizar el rol del usuario.");const z=B?.value||d.first_name||o,{error:$}=await m.from("barbers").insert([{profile_id:d.id,nickname:z,specialty:a,commission_rate:l,base_quota_cuts:b,is_active:v,schedule:E}]);if($)throw $.code==="23505"?new Error("Este usuario ya está registrado como barbero."):new Error("Error al crear el perfil de barbero: "+$.message);T("¡Barbero vinculado exitosamente!")}setTimeout(()=>{g(),M()},1500)}catch(t){console.error("Error procesando barbero:",t),T(t.message||"Error al procesar.",!0)}finally{n.innerHTML=i,n.removeAttribute("disabled")}});
