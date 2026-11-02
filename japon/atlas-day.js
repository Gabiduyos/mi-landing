(function () {
'use strict';
var atlas=window.JP_ATLAS;
if(!atlas||!window.TRIP){return;}
var T=window.TRIP,DAYS=T.days,PLACES=window.PLACES||[],planById={},ideaById={};
DAYS.forEach(function(d){d.stops.forEach(function(s){planById[s.id]=s;});});
PLACES.forEach(function(p){ideaById[p.id]=p;});
var appDay=null,dayPanel=null,homeLayer=L.layerGroup().addTo(atlas.map),showOptions=false;
function $(id){return document.getElementById(id);}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function storage(name,fallback){try{return JSON.parse(localStorage.getItem('jp26:'+name)||'null')||fallback;}catch(e){return fallback;}}
function getPlan(){return storage('plan',{});}
function lookupStop(id,plan){
  if(planById[id])return planById[id];
  if(id.indexOf('c:')===0){var p=ideaById[id.slice(2)];return p?{id:id,kind:(window.PLACE_CATS[p.cat]||{}).kind||'sight',cat:p.cat,name:p.name,ja:p.ja,q:p.q,ll:p.ll,approx:p.approx,note:p.note,t:'',opt:false}:null;}
  return plan.custom&&plan.custom[id]||null;
}
function effectiveStops(d){
  var p=getPlan(), ids=p.order&&p.order[d.n],base=Array.isArray(ids)?ids.map(function(id){return lookupStop(id,p);}).filter(Boolean):d.stops.slice();
  return base.map(function(s){var changes={};if(p.times&&p.times[s.id]!=null)changes.t=p.times[s.id];if(p.notes&&p.notes[s.id])changes.mine=p.notes[s.id];return Object.assign({},s,changes);});
}
function doneSet(){return new Set(storage('done',[]));}
function setDone(id,yes){var arr=doneSet();if(yes)arr.add(id);else arr.delete(id);localStorage.setItem('jp26:done',JSON.stringify(Array.from(arr)));}
function lodge(key){var l=T.lodging[key],ed=storage('lodging',{}),change=ed[key]||{};var name=l.name.replace(/\s*\(Airbnb[^)]*\)/g,'');return {name:name,addr:change.addr||l.addr,q:change.addr||l.q,ll:l.ll,key:key};}
function originFor(d){
 var key=(d.n>=2&&d.n<=4)?'osaka':(d.n===5?'osaka':(d.n===6||d.n===7?'kyoto':'tokyo'));
 if(d.n===12&&storage('atlas-fuji-12',false))key='fuji';
 if(d.n===1)return {name:'Aeropuerto de Kansai (KIX)',addr:'Llegada a Osaka, no desde el Airbnb',q:'Kansai International Airport',ll:[34.4352,135.244],key:'airport'};
 return lodge(key);
}
function hasCoords(s){return Array.isArray(s.ll)&&s.ll.length===2&&Number.isFinite(+s.ll[0])&&Number.isFinite(+s.ll[1]);}
function pointFor(s){if(s.lodge){return lodge(s.lodge)}return {name:s.name,q:s.q||s.name,ll:s.ll};}
function mapStops(d){return effectiveStops(d).filter(function(s){return hasCoords(pointFor(s))&&!s.far&&s.kind!=='move'&&s.kind!=='task'&&s.kind!=='home'&&(showOptions||!s.opt);});}
function directions(dest,orig,mode){var u='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(dest.q||dest.name);if(orig)u+='&origin='+encodeURIComponent(orig.q||orig.name);return u+'&travelmode='+(mode==='car'?'driving':'transit');}
function dayRouteLinks(d){
  var route=mapStops(d),from=originFor(d),mode=d.mode,sections=[];
  if(!route.length)return [];
  for(var i=0;i<route.length;i+=3){
    var ss=route.slice(i,i+3),end=pointFor(ss[ss.length-1]),start=i===0?from:pointFor(route[i-1]);
    var mid=ss.slice(0,-1).map(function(s){return pointFor(s).q;});
    var url='https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(start.q)+'&destination='+encodeURIComponent(end.q);
    if(mid.length&&mode==='car')url+='&waypoints='+encodeURIComponent(mid.join('|'));
    url+='&travelmode='+(mode==='car'?'driving':'transit');
    sections.push({name:'Tramo '+(sections.length+1)+' · '+start.name+' → '+end.name,url:url});
  }
  return sections;
}
function dateLabel(d){return ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'][new Date(d.date+'T12:00:00').getDay()]+' '+d.date.substring(8)+' nov';}
function button(text,clazz,click){var b=document.createElement('button');b.type='button';b.className=clazz;b.textContent=text;b.addEventListener('click',click);return b;}
function createBar(){
 var el=document.createElement('div');el.id='atlas-daybar';el.className='atlas-daybar';el.hidden=true;
 el.innerHTML='<div class="atlas-daybar__copy"><strong id="atlas-daybar-title"></strong><small id="atlas-daybar-start"></small></div><button id="atlas-steps">Ver pasos</button><button class="atlas-daybar__clear" id="atlas-reset">✕</button>';
 document.body.appendChild(el);$('atlas-steps').onclick=function(){if(appDay)dayDetail(appDay.n);};$('atlas-reset').onclick=clearDay;
}
function routeLayer(d){
 homeLayer.clearLayers();
 var orig=originFor(d),stops=mapStops(d),points=[];
 if(orig&&hasCoords(orig)){
  var marker=L.marker(orig.ll,{icon:L.divIcon({className:'',html:'<div class="atlas-homepin">'+(orig.key==='airport'?'✈️':'🏠')+'</div>',iconSize:[38,38],iconAnchor:[19,19]})});
  marker.bindPopup('<strong>Origen de la jornada</strong><p>'+esc(orig.name)+'</p>');homeLayer.addLayer(marker);
  if(stops.length)points.push(orig.ll);
 }
 stops.forEach(function(s){points.push(pointFor(s).ll)});
 // Dotted connector = overview of visit order, NOT verified road or public-transit itinerary.
 if(points.length>=2){homeLayer.addLayer(L.polyline(points,{color:'#ffd08a',weight:3,opacity:.9,dashArray:'3 9',lineCap:'round',interactive:false}));}
 if(points.length>=2)atlas.map.fitBounds(points,{paddingTopLeft:[40,160],paddingBottomRight:[40,235],maxZoom:13,animate:true});
 else if(points.length)atlas.map.setView(points[0],12);
}
function syncMapPlaces(d){
 // Reuse the catalog and the original local edits; do not change any booked activity.
 var stops=effectiveStops(d),ids=new Set();
 stops.forEach(function(s){
  var existingId=planById[s.id]?'plan:'+s.id:(s.id.indexOf('c:')===0?'idea:'+s.id.slice(2):'plan:'+s.id);
  if(!s.opt||showOptions)ids.add(existingId);
  if(!atlas.all.some(function(p){return p.id===existingId})&&hasCoords(s)){
   atlas.all.push({id:existingId,name:s.name,q:s.q||s.name,note:s.note||'',ll:s.ll,day:d.n,time:s.t||'',raw:s,source:'plan',cat:s.cat||'cultura',area:'all'});
  }
 });
 window.jpAtlasRouteFilter=ids;
 atlas.state.city='all';$('city').value='all';atlas.state.cat='all';atlas.state.q='';$('search').value='';
 atlas.renderChips();atlas.renderMarkers();
}
function showDayMap(n){
 var d=DAYS[n-1];if(!d)return;appDay=d;dayPanel=n;
 syncMapPlaces(d);routeLayer(d);
 $('atlas-daybar-title').textContent='Día '+d.n+' · '+d.title;
 $('atlas-daybar-start').textContent='Desde: '+originFor(d).name;
 $('atlas-daybar').hidden=false;
 atlas.setTab('mapa');$('screen').classList.add('hidden');
 // Keep the existing card, but move its selected stop to this day's route.
 var first=mapStops(d)[0];
 if(first){var p=atlas.all.find(function(x){return x.id==='plan:'+first.id||x.id==='idea:'+first.id.replace(/^c:/,'')});if(p)atlas.select(p);}
}
function clearDay(){appDay=null;dayPanel=null;window.jpAtlasRouteFilter=null;homeLayer.clearLayers();$('atlas-daybar').hidden=true;atlas.renderMarkers();atlas.map.setView([35.0,137.6],6);atlas.setTab('mapa');}
function renderDays(){
 var root=$('screenbody');root.innerHTML='';
 var intro=document.createElement('p');intro.className='tiny';intro.textContent='Tus rutas originales, con salida desde el alojamiento, horarios y visitas por completar. Selecciona una jornada.';root.appendChild(intro);
 var list=document.createElement('div');list.className='atlas-daylist';
 DAYS.forEach(function(d){
  var items=effectiveStops(d),key=doneSet(),eligible=items.filter(function(s){return s.kind!=='move'&&s.kind!=='home'&&s.kind!=='task'&&!s.opt}),num=eligible.filter(function(s){return key.has(s.id)}).length;
  var row=document.createElement('button');row.className='atlas-dayrow';row.innerHTML='<span class="atlas-dayrow__n">'+d.n+'</span><span class="atlas-dayrow__main"><strong>'+esc(d.title)+'</strong><small>'+dateLabel(d)+' · '+num+'/'+eligible.length+' visitas completadas</small></span><span class="atlas-dayrow__arr">›</span>';
  row.onclick=function(){dayDetail(d.n)};list.appendChild(row);
 });root.appendChild(list);
 var extra=document.createElement('p');extra.className='atlas-route-note';extra.textContent='Las visitas marcadas se guardan en este móvil, igual que en la aplicación original.';root.appendChild(extra);
}
function renderTimeline(d,root){
 var list=document.createElement('div');list.className='atlas-timeline';var count=0;
 effectiveStops(d).forEach(function(s){
  if(s.opt&&!showOptions)return;count++;
  var completed=doneSet().has(s.id);
  var item=document.createElement('div');item.className='atlas-step'+(completed?' is-completed':'');
  var rail=document.createElement('div');rail.className='atlas-rail';rail.innerHTML='<span class="atlas-dot">'+(completed?'✓':count)+'</span>';item.appendChild(rail);
  var box=document.createElement('div');box.className='atlas-step__box';
  var top=document.createElement('div');top.className='atlas-step__row';
  var body=document.createElement('div');body.className='atlas-step__main';
  body.innerHTML='<strong>'+esc(s.name||'Parada')+'</strong><span>'+esc(s.t||'Horario libre')+(s.dur?' · '+s.dur+' min':'')+'</span>';
  top.appendChild(body);
  if(s.kind!=='move'&&s.kind!=='task'&&s.kind!=='home'){var check=document.createElement('input');check.type='checkbox';check.className='atlas-step__check';check.checked=completed;check.setAttribute('aria-label','Marcar como visitado: '+s.name);check.onchange=function(){setDone(s.id,check.checked);item.classList.toggle('is-completed',check.checked);rail.querySelector('.atlas-dot').textContent=check.checked?'✓':count};top.appendChild(check);}
  box.appendChild(top);
  if(s.opt){var optional=document.createElement('p');optional.className='atlas-step__opt';optional.textContent='Parada opcional';box.appendChild(optional);}
  if(s.mine||s.note){var note=document.createElement('p');note.className='atlas-step__note';note.textContent=s.mine||s.note;box.appendChild(note);}
  var pt=pointFor(s);if(hasCoords(pt)){
   var buttons=document.createElement('div');buttons.className='atlas-step__buttons';
   buttons.appendChild(button('Ver en mapa','',function(){showDayMap(d.n);atlas.map.setView(pt.ll,14);var p=atlas.all.find(function(p){return p.id==='plan:'+s.id||p.id==='idea:'+s.id.replace(/^c:/,'')});if(p)atlas.select(p);}));
   var a=document.createElement('a');a.textContent='Cómo llegar ↗';a.href=directions(pt,originFor(d),d.mode);a.target='_blank';a.rel='noopener';buttons.appendChild(a);box.appendChild(buttons);
  }
  item.appendChild(box);list.appendChild(item);
 });root.appendChild(list);
}
function dayDetail(n){
 var d=DAYS[n-1];if(!d)return;dayPanel=n;atlas.setTab('dias');$('screentitle').textContent='Día '+n+' · '+dateLabel(d);
 var root=$('screenbody');root.innerHTML='';
 var head=document.createElement('div');head.className='atlas-dayhead';
 head.appendChild(button('← Volver a los 15 días','atlas-dayhead__back',function(){dayPanel=null;renderDays();$('screentitle').textContent='Mi viaje · 15 días';}));
 var h=document.createElement('h3');h.textContent=d.title;head.appendChild(h);
 var sub=document.createElement('p');sub.textContent=d.sub||'Organiza tu jornada en Japón';head.appendChild(sub);root.appendChild(head);
 var origin=originFor(d);var lodging=document.createElement('div');lodging.className='atlas-lodging';lodging.innerHTML='<span class="atlas-lodging__icon">'+(origin.key==='airport'?'✈️':'🏠')+'</span><div><strong>Salida: '+esc(origin.name)+'</strong><p>'+esc(origin.addr)+'</p></div>';root.appendChild(lodging);
 if(d.n===12){
  var opts=document.createElement('div');opts.className='atlas-dayoptions';opts.innerHTML='<label><input id="atlas-fuji" type="checkbox"'+(storage('atlas-fuji-12',false)?' checked':'')+'> Salgo desde Kawaguchiko (solo si finalmente duermo allí)</label>';
  root.appendChild(opts);opts.querySelector('input').onchange=function(){localStorage.setItem('jp26:atlas-fuji-12',JSON.stringify(this.checked));dayDetail(12)};
 }
 var opt=document.createElement('div');opt.className='atlas-dayoptions';opt.innerHTML='<label><input id="atlas-opts" type="checkbox"'+(showOptions?' checked':'')+'> Mostrar también las paradas opcionales</label>';root.appendChild(opt);
 opt.querySelector('input').onchange=function(){showOptions=this.checked;dayDetail(n)};
 var act=document.createElement('div');act.className='atlas-actions';
 act.appendChild(button('🗺 Ver ruta en mapa','atlas-primary',function(){showDayMap(n)}));
 var original=document.createElement('a');original.className='atlas-secondary';original.textContent='Plan original ↗';original.href='./#dia-'+n;act.appendChild(original);
 root.appendChild(act);
 var links=dayRouteLinks(d);if(links.length){var box=document.createElement('div');box.className='atlas-routebox';var p=document.createElement('small');p.textContent='Navegación real por tramos desde el alojamiento. Google Maps calcula el trayecto; no se inventan tiempos.';box.appendChild(p);
 links.forEach(function(l){var a=document.createElement('a');a.href=l.url;a.textContent='📍 '+l.name;a.target='_blank';a.rel='noopener';box.appendChild(a)});root.appendChild(box);}
 var completed=effectiveStops(d).filter(function(s){return doneSet().has(s.id)}).length;var title=document.createElement('p');title.className='atlas-daycount';title.textContent='✓ '+completed+' visitas marcadas · Seguimiento compartido con tu app original en este dispositivo';root.appendChild(title);
 renderTimeline(d,root);$('screen').classList.remove('hidden');
}
window.jpDayRender=function(){if(dayPanel)dayDetail(dayPanel);else renderDays()};
var extClick=$('routebtn').onclick;
$('routebtn').onclick=function(){if(appDay){dayDetail(appDay.n);return;}if(extClick)extClick.call(this)};
createBar();
window.jpAtlasDay={showDayMap:showDayMap,dayDetail:dayDetail,clear:clearDay};
})();