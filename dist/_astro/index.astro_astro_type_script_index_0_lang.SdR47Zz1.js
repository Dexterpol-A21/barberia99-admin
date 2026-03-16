import{s as $}from"./supabase.C8JFIDnn.js";document.addEventListener("DOMContentLoaded",async()=>{try{const n=new Date,i=`${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,"0")}-${String(n.getDate()).padStart(2,"0")}`,g=document.getElementById("dateLabel");if(g){const t=n.toLocaleDateString("es-ES",{weekday:"long"}),e=n.toLocaleDateString("es-ES",{month:"long"});g.innerText=`Hoy: ${n.getDate()} de ${e}`}const o=new Date(n);o.setDate(n.getDate()-6);const w=`${o.getFullYear()}-${String(o.getMonth()+1).padStart(2,"0")}-${String(o.getDate()).padStart(2,"0")}`,{data:S,error:b}=await $.from("appointments").select("id, appointment_date, status, price, barber_id, barbers(nickname)").gte("appointment_date",w).in("status",["completed","completada"]);if(b)throw b;const{data:v,error:u}=await $.from("barbers").select("id, nickname");if(u)throw u;const r=[0,0,0,0,0,0,0],f=[];for(let t=0;t<7;t++){let e=new Date(o);e.setDate(o.getDate()+t),f.push(["Dom","Lun","Mar","Mie","Jue","Vie","Sab"][e.getDay()])}let d=0;const s={};v.forEach(t=>{s[t.id]={nickname:t.nickname,count:0,revenue:0}}),S.forEach(t=>{const e=Number(t.price)||0,a=t.appointment_date.split("-"),m=new Date(a[0],a[1]-1,a[2]),p=Math.abs(m-o),c=Math.floor(p/(1e3*60*60*24));c>=0&&c<7&&(r[c]+=e),t.appointment_date===i&&(d+=e,t.barber_id&&s[t.barber_id]&&(s[t.barber_id].count+=1,s[t.barber_id].revenue+=e))});const h=d*.5,D=d-h;document.getElementById("metricGross").innerText=`$${d.toLocaleString()}`,document.getElementById("metricCommissions").innerText=`$${h.toLocaleString()}`,document.getElementById("metricNet").innerText=`$${D.toLocaleString()}`;const y=document.getElementById("cajaTableBody");let l="";Object.values(s).sort((t,e)=>e.revenue-t.revenue).forEach(t=>{const e=t.revenue*.5;l+=`
                        <tr class="border-b border-white/5 group hover:bg-white/5 transition-colors">
                            <td class="py-4 text-white font-medium flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-[#A67C52] text-[10px] flex items-center justify-center uppercase shrink-0">
                                    ${t.nickname.charAt(0)}
                                </div>
                                <span class="capitalize">${t.nickname}</span>
                            </td>
                            <td class="py-4 text-center text-white">${t.count} <span class="text-xs text-cement">cortes</span></td>
                            <td class="py-4 text-center text-amber">$${t.revenue.toLocaleString()}</td>
                            <td class="py-4 text-right text-green-400 font-mono font-medium">$${e.toLocaleString()}</td>
                        </tr>
                    `}),l===""&&(l='<tr><td colspan="4" class="py-8 text-center text-cement text-sm">No hay actividad hoy.</td></tr>'),y&&(y.innerHTML=l);const x=document.getElementById("simpleChartCajaMock");if(x){let t=Math.max(...r);t===0&&(t=1);let e="";for(let a=0;a<7;a++){const m=r[a]/t*100,p=m<2?2:m,c=a===6;e+=`
                        <li class="w-full flex justify-center group relative h-full items-end pb-8" title="$${r[a].toLocaleString()}">
                            <div class="w-1/3 rounded-t-sm transition-all duration-300 ${c?"bg-amber":"bg-white/10 group-hover:bg-amber/50"}" style="height: ${p}%"></div>
                            <span class="absolute bottom-0 text-[10px] text-cement uppercase font-mono">${f[a]}</span>
                            <div class="absolute bottom-[calc(${p}%+2rem)] opacity-0 group-hover:opacity-100 transition-opacity bg-carbon border border-white/10 text-white text-[10px] px-2 py-1 rounded w-max z-10 pointer-events-none mb-1">
                                $${r[a].toLocaleString()}
                            </div>
                        </li>
                    `}x.innerHTML=e}}catch(n){console.error("Data error:",n);const i=document.getElementById("cajaTableBody");i&&(i.innerHTML='<tr><td colspan="4" class="py-6 text-center text-red-400 text-sm">Error conectando a la base de datos de ingresos.</td></tr>')}});
