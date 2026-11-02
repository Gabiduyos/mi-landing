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
function storage(name,fallback){try{var raw=localStorage.getItem('jp26:'+name);if(raw===null)return fallback;var value=JSON.parse(raw);return value===null||value===undefined?fallback:value;}catch(e){return fallback;}}
function getPlan(){return storage('plan',{});}
function lookupStop(id,plan){
  if(planById[id])return planById[id];
  if(id.indexOf('c:')===0){var p=ideaById[id.slice(2)];return p?{id:id,kind:(window.PLACE_CATS[p.cat]||{}).kind||'sight',cat:p.cat,name:p.name,ja:p.ja,q:p.q,ll:p.ll,approx:p.approx,note:p.note,t:'',opt:false}:null;}
  return plan.custom&&plan.custom[id]||null;
}
function arrivalMode(){return storage('atlas-arrival-mode',true);}
function effectiveStops(d){
  var p=getPlan(),ids=p.order&&p.order[d.n],base=Array.isArray(ids)?ids.map(function(id){return lookupStop(id,p);}).filter(Boolean):d.stops.slice();
  var edited=base.map(function(s){var changes={};if(p.times&&p.times[s.id]!=null)changes.t=p.times[s.id];if(p.notes&&p.notes[s.id])changes.mine=p.notes[s.id];return Object.assign({},s,changes);});
  if(d.n!==1||!arrivalMode())return edited;
  // Solo modifica la presentación del primer día. El plan original y las paradas añadidas permanecen guardados.
  var keep={kix:true,'d1-home':true,dotonbori:true,tombori:true};
  var core=edited.filter(function(s){return !!keep[s.id]||(!d.stops.some(function(x){return x.id===s.id}));});
  var around={id:'atlas-arrival-walk',kind:'sight',t:'Antes de las 16:00 · si llegáis pronto',dur:35,name:'Paseo libre por Nipponbashi, junto al Airbnb',q:'Nipponbashi Station Osaka',ll:[34.6678,135.5070],arrivalExtra:true,note:'Con poco equipaje podéis explorar las calles cercanas y echar un primer vistazo a Kuromon sin hacer la visita completa que tenéis el día 2. Es un paseo flexible: si el aeropuerto se retrasa, se omite sin problema.'};
  return core.reduce(function(out,stop){
    if(stop.id==='d1-home'){
      out.push(around);
      out.push(Object.assign({},stop,{t:'16:00',note:'Check-in desde las 16:00. Hasta entonces podéis pasear cerca con vuestro equipaje ligero; no se presupone acceso anticipado al apartamento.'}));
      out.push({id:'atlas-arrival-refresh',kind:'task',t:'16:00–16:40 · orientativo',dur:30,name:'Dejar maletas y refrescarse',note:'No es una siesta obligatoria: procurad manteneros activos hasta la noche para adaptaros al horario local.'});
      out.push({id:'atlas-fitness-namba-day1',kind:'shop',t:'17:00 · opcional',dur:25,name:'Fitness Shop Namba · accesorios gym',q:'Fitness Shop Namba Cross Hotel Osaka 2-5-15 Shinsaibashisuji',ll:[34.6698,135.5011],approx:true,optionalDay1:true,note:'Tienda de entrenamiento en Cross Hotel Osaka, 2F. Para correas, cinturones y otros accesorios (stock variable); no es tienda de anime. Los domingos cierra a las 19:00, por eso va antes de la cena.'});
      out.push({id:'atlas-guf-dotonbori-day1',kind:'shop',t:'17:40 · opcional',dur:25,name:'Guf Dōtonbori · ropa de anime',q:'Guf Dotonbori 1-7-5 Dotonbori Osaka',ll:[34.6680,135.5028],approx:true,optionalDay1:true,note:'Camisetas y ropa de anime, no necesariamente tejido técnico de gimnasio. Abre hasta tarde según el comercio; muy cerca del canal, se visita si os apetece.'});
    }else if(stop.id==='dotonbori'){
      out.push(Object.assign({},stop,{t:'18:15',dur:95,note:'Paseo, luz de neones y cena a vuestro ritmo por Dōtonbori y Hōzenji. Si tenéis el barco a las 20:00, terminad la cena con margen para llegar al muelle.'}));
    }else if(stop.id==='tombori'){
      out.push(Object.assign({},stop,{t:'20:00 aprox. · si hay plazas',dur:20,arrivalExtra:true,note:'Crucero opcional de unos 20 minutos por Dōtonbori. Se pueden comprar entradas para el mismo día si hay plazas: adultos 2.000 ¥ (precio publicado). Salidas anunciadas hasta las 21:00, revisad el horario y disponibilidad.',ticketUrl:'https://cloud-pass.jp/get/tombori-rivercruise'}));
    }else out.push(stop);
    return out;
  },[]);
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
function mapStops(d){return effectiveStops(d).filter(function(s){return hasCoords(pointFor(s))&&!s.far&&s.kind!=='move'&&s.kind!=='task'&&s.kind!=='home'&&!isSkipped(d,s.id)&&(showOptions||!s.opt);});}
function directions(dest,orig,mode){var u='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(dest.q||dest.name);if(orig)u+='&origin='+encodeURIComponent(orig.q||orig.name);return u+'&travelmode='+(mode==='car'?'driving':'transit');}
function dayRouteLinks(d){
  if(d.n===1&&arrivalMode()){
    var airport=originFor(d),house=lodge('osaka');
    function leg(from,to,mode){return 'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(from)+'&destination='+encodeURIComponent(to)+'&travelmode='+mode;}
    return [
      {name:'1. KIX → zona del Airbnb',url:leg(airport.q,house.q,'transit')},
      {name:'2. Antes del check-in: paseo cerca del Airbnb',url:leg(house.q,'Kuromon Ichiba Market Osaka','walking')},
      {name:'3. Airbnb → Fitness Shop Namba',url:leg(house.q,'Fitness Shop Namba Cross Hotel Osaka','walking')},
      {name:'4. Fitness Shop → Guf Dōtonbori',url:leg('Fitness Shop Namba Cross Hotel Osaka','Guf Dotonbori 1-7-5','walking')},
      {name:'5. Guf → Tombori River Cruise (20:00)',url:leg('Guf Dotonbori 1-7-5','Tombori River Cruise Tazaemonbashi Osaka','walking')}
    ];
  }
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
 if(d.n===1&&arrivalMode()){
   var house=lodge('osaka'),stops=mapStops(d),coords=[house.ll];
   homeLayer.addLayer(L.marker(house.ll,{icon:L.divIcon({className:'',html:'<div class="atlas-homepin">🏠</div>',iconSize:[38,38],iconAnchor:[19,19]})}).bindPopup('Alojamiento de Osaka · check-in a partir de las 16:00'));
   var nearby=stops.find(function(x){return x.id==='atlas-arrival-walk'});
   if(nearby){coords.push(pointFor(nearby).ll);homeLayer.addLayer(L.polyline([house.ll,pointFor(nearby).ll],{color:'#9fd4c4',weight:3,dashArray:'3 8',interactive:false}));}
   var night=['atlas-fitness-namba-day1','atlas-guf-dotonbori-day1','dotonbori','tombori'].map(function(id){return stops.find(function(x){return x.id===id})}).filter(Boolean).map(function(x){return pointFor(x).ll});
   if(night.length){coords.push.apply(coords,night);homeLayer.addLayer(L.polyline([house.ll].concat(night),{color:'#ffb968',weight:3,dashArray:'3 8',interactive:false}));}
   atlas.map.fitBounds(coords,{paddingTopLeft:[35,155],paddingBottomRight:[35,190],maxZoom:15,animate:true});
   return;
 }
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
 syncMapPlaces(d);routeLayer(d);if(d.n===1&&arrivalMode())poiLayer.clearLayers();else showPoisOnMap(d);
 $('atlas-daybar-title').textContent='Día '+d.n+' · '+d.title;
 $('atlas-daybar-start').textContent='Desde: '+originFor(d).name;
 $('atlas-daybar').hidden=false;
 atlas.setTab('mapa');$('screen').classList.add('hidden');
 // El mapa del día comienza despejado; las fichas solo aparecen cuando tocas un pin.
 if(atlas.closeCard)atlas.closeCard();
}
function clearDay(){appDay=null;dayPanel=null;if(atlas.closeCard)atlas.closeCard();window.jpAtlasRouteFilter=null;homeLayer.clearLayers();poiLayer.clearLayers();$('atlas-daybar').hidden=true;atlas.renderMarkers();atlas.map.setView([35.0,137.6],6);atlas.setTab('mapa');}

  // ── Descubrimientos de camino (distancias geométricas orientativas) ──
  var poiLayer=L.layerGroup().addTo(atlas.map),poiSuggestions=[],onRoadFilters='all';
  function routeOmissions(){return storage('atlas-omit',{});}
  function isSkipped(d,id){var entries=routeOmissions();return !!(entries[d.n]&&entries[d.n].indexOf(id)>=0);}
  function toggleSkipped(d,id){
    var o=routeOmissions(),a=o[d.n]||[],i=a.indexOf(id);
    if(i>=0)a.splice(i,1);else a.push(id);
    o[d.n]=a;localStorage.setItem('jp26:atlas-omit',JSON.stringify(o));
  }
  function normText(x){return String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
  function segmentDistance(point,a,b){
    var k=Math.cos((a[0]+b[0])*Math.PI/360),dx=(b[1]-a[1])*111.19*k,dy=(b[0]-a[0])*111.19;
    var px=(point[1]-a[1])*111.19*k,py=(point[0]-a[0])*111.19;
    var len=dx*dx+dy*dy,t=len?Math.max(0,Math.min(1,(px*dx+py*dy)/len)):0;
    return {km:Math.hypot(px-t*dx,py-t*dy),t:t,segmentKm:Math.sqrt(len)};
  }
  function dayCorridor(d){
    var stops=mapStops(d),origin=originFor(d),legs=[],last=origin;
    stops.forEach(function(s){var next=pointFor(s);if(hasCoords(last)&&hasCoords(next)){
      legs.push({a:last,b:next,before:s.id});
    }last=next;});
    return legs;
  }
  function scorePoi(p){
    var score=({foto:3,relojes:3,ropa:3,figuras:3,retro:3,mercado:2,jdm:2,cultura:0,vistas:0})[p.cat]||0;
    var name=normText(p.name);
    if(/book.?off|hard.?off|off house|2nd street|surugaya|mandarake|fujiya|camera|second|hobby/.test(name))score+=3;
    if(onRoadFilters!=='all'&&p.cat===onRoadFilters)score+=12;
    return score;
  }
  function discover(d){
    var legs=dayCorridor(d),ids=new Set(effectiveStops(d).map(function(s){return s.id;})),existing=new Set(effectiveStops(d).map(function(s){return normText(s.q||s.name);}));
    var results=[];
    PLACES.forEach(function(p){
      if(!hasCoords(p)||ids.has('c:'+p.id)||existing.has(normText(p.q||p.name)))return;
      if(onRoadFilters!=='all'&&p.cat!==onRoadFilters)return;
      var near=null;
      legs.forEach(function(leg){
        var x=segmentDistance(p.ll,leg.a.ll,leg.b.ll);
        var limit=d.mode==='car'?1.7:.65;
        if(x.segmentKm>(d.mode==='car'?25:8)||x.km>limit)return;
        if(!near||x.km<near.km)near={km:x.km,before:leg.before,a:leg.a.name,b:leg.b.name,t:x.t};
      });
      if(!near)return;
      results.push({p:p,near:near,score:scorePoi(p)-near.km*3});
    });
    results.sort(function(a,b){return b.score-a.score||a.near.km-b.near.km;});
    return results.slice(0,8);
  }
  function savePoi(d,p,before){
    var plan=getPlan();if(!plan.order||typeof plan.order!=='object')plan.order={};
    var ids=Array.isArray(plan.order[d.n])?plan.order[d.n].slice():d.stops.map(function(s){return s.id;});
    var id='c:'+p.id;if(ids.indexOf(id)>=0)return false;
    var i=ids.indexOf(before);if(i<0)i=ids.length;
    ids.splice(i,0,id);
    plan.order[d.n]=ids;
    try{localStorage.setItem('jp26:plan',JSON.stringify(plan));return true}
    catch(e){alert('No se pudo guardar el cambio en este dispositivo.');return false}
  }
  function removeAdded(d,id){
    var p=getPlan(),ids=p.order&&p.order[d.n];
    if(!Array.isArray(ids)||id.indexOf('c:')!==0)return false;
    var i=ids.indexOf(id);if(i<0)return false;ids.splice(i,1);
    localStorage.setItem('jp26:plan',JSON.stringify(p));return true;
  }
  function showPoisOnMap(d){
    poiSuggestions=discover(d);poiLayer.clearLayers();
    var used=[];
    poiSuggestions.slice(0,6).forEach(function(item){
      var pt=item.p,ll=pt.ll;
      if(used.some(function(x){return segmentDistance(ll,x,x).km<.1}))return;
      used.push(ll);
      var ico=L.divIcon({className:'',html:'<div class="atlas-discovery-pin" title="Punto de interés cerca del trayecto">✦</div>',iconSize:[38,38],iconAnchor:[19,19]});
      var marker=L.marker(ll,{icon:ico,zIndexOffset:800});marker.addTo(poiLayer);
      marker.on('click',function(){
        atlas.select({id:'idea:'+pt.id,name:pt.name,q:pt.q||pt.name,note:pt.note,ll:pt.ll,raw:pt,cat:pt.cat||'cultura',area:'all',source:'idea'});
        var btn=document.getElementById('atlas-quickadd');
        if(!btn){btn=button('＋ Añadir POI al día','atlas-quickadd',function(){
          var chosen=btn._place;if(chosen&&savePoi(d,chosen.p,chosen.near.before)){showDayMap(d.n);dayDetail(d.n)}});
          document.getElementById('card').appendChild(btn);}
        btn._place=item;btn.hidden=false;
        btn.textContent='＋ Añadir '+pt.name+' a este día';
      });
    });
  }
  function renderDiscoveries(d,root){
    var wrap=document.createElement('section');wrap.id='atlas-nearby';wrap.className='atlas-nearby';
    var title=document.createElement('div');title.className='atlas-nearby__head';
    title.innerHTML='<span class="atlas-nearby__sparkle">✦</span><div><strong>Descubrimientos en el camino</strong><small>Paradas extra que podrían pillarte de paso</small></div>';
    wrap.appendChild(title);
    var filters=document.createElement('div');filters.className='atlas-poifilters';
    [['all','Todos'],['figuras','🎮 Coleccionismo'],['foto','📷 Cámaras'],['ropa','👕 Ropa'],['relojes','⌚ Relojes'],['mercado','🛍️ Mercados']].forEach(function(c){
      var b=button(c[1],'atlas-poifilter'+(onRoadFilters===c[0]?' active':''),function(){onRoadFilters=c[0];dayDetail(d.n);});
      filters.appendChild(b);
    });
    wrap.appendChild(filters);
    var found=discover(d),base=effectiveStops(d);
    if(!found.length){
      var empty=document.createElement('p');empty.className='atlas-discovery-empty';
      empty.textContent='No hay puntos guardados dentro del corredor aproximado de esta ruta. Puedes cambiar de categoría o buscar en el mapa general.';
      wrap.appendChild(empty);
    }else{
      found.slice(0,5).forEach(function(item){
        var p=item.p,n=item.near,box=document.createElement('div');box.className='atlas-poicard';
        var label=document.createElement('div');label.className='atlas-poicard__label';
        label.innerHTML='<span class="atlas-poicard__icon">'+esc(({foto:'📷',ropa:'👕',relojes:'⌚',figuras:'🎮',retro:'🎮',mercado:'🛍️',jdm:'🏎️'})[p.cat]||'📍')+'</span><span class="atlas-poicard__info"><strong>'+esc(p.name)+'</strong><small>✦ aprox. '+Math.round(n.km*1000)+' m de la línea entre paradas</small><small>Entre '+esc(n.a)+' y '+esc(n.b)+'</small></span>';
        box.appendChild(label);
        if(p.note){var note=document.createElement('p');note.textContent=p.note;box.appendChild(note);}
        var actions=document.createElement('div');actions.className='atlas-poicard__buttons';
        actions.appendChild(button('＋ Añadir entre paradas','atlas-poicard__add',function(){
          if(savePoi(d,p,n.before)){dayDetail(d.n);var message=document.createElement('p');message.className='atlas-added';message.textContent='✓ '+p.name+' añadido al día '+d.n+'. Se han respetado todos los horarios originales.';document.querySelector('.atlas-dayhead').after(message)}
          else{alert('Este lugar ya está incluido o no se pudo guardar.')}
        }));
        actions.appendChild(button('Ver en mapa','atlas-poicard__map',function(){
          showDayMap(d.n);atlas.map.setView(p.ll,14);var point=atlas.all.find(function(x){return x.id==='idea:'+p.id});
          if(point)atlas.select(point);
        }));
        box.appendChild(actions);wrap.appendChild(box);
      });
    }
    var foot=document.createElement('p');foot.className='atlas-nearby__foot';
    foot.textContent='Distancias en línea recta al trazado aproximado, no desvíos ni tiempos reales. Revisa la ruta en Google Maps antes de decidir.';
    wrap.appendChild(foot);root.appendChild(wrap);
  }
  function isFixed(s){
    return s.kind==='home'||s.kind==='move'||s.kind==='task'||s.lodge||/\b(?:reserva|vuelo|tren nozomi|shinkansen|disneysea|billete|check.in)\b/i.test(s.name||'');
  }
  function moveStop(d,id,dir){
    var p=getPlan();if(!p.order||typeof p.order!=='object')p.order={};
    var arr=Array.isArray(p.order[d.n])?p.order[d.n].slice():d.stops.map(function(x){return x.id});
    var index=arr.indexOf(id),next=index+dir;
    if(index<0||next<0||next>=arr.length)return false;
    var src=lookupStop(arr[index],p),dest=lookupStop(arr[next],p);
    if(!src||!dest||isFixed(src)||isFixed(dest))return false;
    var tmp=arr[index];arr[index]=arr[next];arr[next]=tmp;
    p.order[d.n]=arr;localStorage.setItem('jp26:plan',JSON.stringify(p));return true;
  }

function renderDays(){
 var root=$('screenbody');root.innerHTML='';
 var intro=document.createElement('p');intro.className='tiny';intro.textContent='Tus rutas originales, con salida desde el alojamiento, horarios y visitas por completar. Selecciona una jornada.';root.appendChild(intro);
 var list=document.createElement('div');list.className='atlas-daylist';
 DAYS.forEach(function(d){
  var items=effectiveStops(d),key=doneSet(),eligible=items.filter(function(s){return s.kind!=='move'&&s.kind!=='home'&&s.kind!=='task'&&!s.opt&&!s.optionalDay1}),num=eligible.filter(function(s){return key.has(s.id)}).length;
  var row=document.createElement('button');row.className='atlas-dayrow';row.innerHTML='<span class="atlas-dayrow__n">'+d.n+'</span><span class="atlas-dayrow__main"><strong>'+esc(d.title)+'</strong><small>'+dateLabel(d)+' · '+num+'/'+eligible.length+' visitas completadas</small></span><span class="atlas-dayrow__arr">›</span>';
  row.onclick=function(){dayDetail(d.n)};list.appendChild(row);
 });root.appendChild(list);
 var extra=document.createElement('p');extra.className='atlas-route-note';extra.textContent='Las visitas marcadas se guardan en este móvil, igual que en la aplicación original.';root.appendChild(extra);
}
function renderTimeline(d,root){
 var list=document.createElement('div');list.className='atlas-timeline';var count=0;
 effectiveStops(d).forEach(function(s){
  if(s.opt&&!showOptions)return;count++;var stepNumber=count;
  var completed=doneSet().has(s.id);
  var item=document.createElement('div');item.className='atlas-step'+(completed?' is-completed':'')+(isSkipped(d,s.id)?' is-skipped':'');
  var rail=document.createElement('div');rail.className='atlas-rail';rail.innerHTML='<span class="atlas-dot">'+(completed?'✓':count)+'</span>';item.appendChild(rail);
  var box=document.createElement('div');box.className='atlas-step__box';
  var top=document.createElement('div');top.className='atlas-step__row';
  var body=document.createElement('div');body.className='atlas-step__main';
  body.innerHTML='<strong>'+esc(s.name||'Parada')+'</strong><span>'+esc(s.t||'Horario libre')+(s.dur?' · '+s.dur+' min':'')+'</span>';
  top.appendChild(body);
  if(s.kind!=='move'&&s.kind!=='task'&&s.kind!=='home'){var check=document.createElement('input');check.type='checkbox';check.className='atlas-step__check';check.checked=completed;check.setAttribute('aria-label','Marcar como visitado: '+s.name);check.onchange=function(){setDone(s.id,check.checked);item.classList.toggle('is-completed',check.checked);rail.querySelector('.atlas-dot').textContent=check.checked?'✓':stepNumber};top.appendChild(check);}
  box.appendChild(top);
  if(s.kind!=='move'&&s.kind!=='home'&&s.kind!=='task'&&!isFixed(s)){
    var editRow=document.createElement('div');editRow.className='atlas-step__edit';
    editRow.appendChild(button('↑','atlas-step__move',function(){if(moveStop(d,s.id,-1))dayDetail(d.n);else alert('No puedo mover esta parada por encima de una reserva o traslado fijo.')})); 
    editRow.appendChild(button('↓','atlas-step__move',function(){if(moveStop(d,s.id,1))dayDetail(d.n);else alert('No puedo mover esta parada a través de una reserva o traslado fijo.')})); 
    editRow.appendChild(button(isSkipped(d,s.id)?'↩ Recuperar':'⏭ Saltar hoy','atlas-step__skip',function(){toggleSkipped(d,s.id);dayDetail(d.n)}));
    if(s.id.indexOf('c:')===0){editRow.appendChild(button('✕ Quitar extra','atlas-step__remove',function(){if(confirm('Quitar esta parada añadida del día '+d.n+'?')){removeAdded(d,s.id);dayDetail(d.n)}}));}
    box.appendChild(editRow);
  }
  if(s.opt||s.optionalDay1){var optional=document.createElement('p');optional.className='atlas-step__opt';optional.textContent=s.optionalDay1?'Tienda opcional · sin compromiso':'Parada opcional';box.appendChild(optional);}
  if(s.mine||s.note){var note=document.createElement('p');note.className='atlas-step__note';note.textContent=s.mine||s.note;box.appendChild(note);}
  if(s.ticketUrl){var ticket=document.createElement('a');ticket.href=s.ticketUrl;ticket.target='_blank';ticket.rel='noopener';ticket.className='atlas-ticket-link';ticket.textContent='🎫 Consultar entradas y plazas';box.appendChild(ticket);}
  var pt=pointFor(s);if(hasCoords(pt)){
   var buttons=document.createElement('div');buttons.className='atlas-step__buttons';
   buttons.appendChild(button('Ver en mapa','',function(){showDayMap(d.n);atlas.map.setView(pt.ll,14);var p=atlas.all.find(function(p){return p.id==='plan:'+s.id||p.id==='idea:'+s.id.replace(/^c:/,'')});if(p)atlas.select(p);}));
   var a=document.createElement('a');a.textContent='Cómo llegar ↗';a.href=directions(pt,originFor(d),d.mode);a.target='_blank';a.rel='noopener';buttons.appendChild(a);box.appendChild(buttons);
  }
  item.appendChild(box);list.appendChild(item);
 });root.appendChild(list);
}
function dayDetail(n){
 var d=DAYS[n-1];if(!d)return;dayPanel=n;if(atlas.state.tab!=='dias')atlas.setTab('dias');$('screentitle').textContent='Día '+n+' · '+dateLabel(d);
 var root=$('screenbody');root.innerHTML='';
 var head=document.createElement('div');head.className='atlas-dayhead';
 head.appendChild(button('← Volver a los 15 días','atlas-dayhead__back',function(){dayPanel=null;renderDays();$('screentitle').textContent='Mi viaje · 15 días';}));
 var daypick=document.createElement('select');daypick.className='atlas-day-picker';daypick.setAttribute('aria-label','Seleccionar jornada');DAYS.forEach(function(dd){var op=document.createElement('option');op.value=dd.n;op.textContent='Día '+dd.n+' · '+dateLabel(dd);if(dd.n===n)op.selected=true;daypick.appendChild(op)});daypick.onchange=function(){dayDetail(+this.value)};head.appendChild(daypick);
 var h=document.createElement('h3');h.textContent=(d.n===1&&arrivalMode())?'Llegada a Osaka · tiendas y barco':d.title;head.appendChild(h);
 var sub=document.createElement('p');sub.textContent=(d.n===1&&arrivalMode())?'Si llegáis con margen, paseo alrededor del Airbnb antes de las 16:00. Después, dejar maletas y visitar opcionalmente tiendas de gimnasio y anime, cenar y disfrutar del crucero sobre las 20:00 si quedan plazas. Evitad siestas largas.':(d.sub||'Organiza tu jornada en Japón');head.appendChild(sub);root.appendChild(head);
 if(d.n===1){
  var arrivalBox=document.createElement('div');arrivalBox.className='atlas-dayoptions';
  arrivalBox.innerHTML='<label><input id="atlas-arrivalmode" type="checkbox"'+(arrivalMode()?' checked':'')+'> <strong>Primer día activo y flexible (recomendado)</strong></label><p class="tiny">Paseo cerca del Airbnb antes de las 16:00, dos tiendas opcionales después y crucero sobre las 20:00. Vuelve al plan original desactivando esta opción.</p>';
  root.appendChild(arrivalBox);
  arrivalBox.querySelector('input').onchange=function(){localStorage.setItem('jp26:atlas-arrival-mode',JSON.stringify(this.checked));dayDetail(1)};
 }
 var origin=originFor(d);var lodging=document.createElement('div');lodging.className='atlas-lodging';
 if(d.n===1&&arrivalMode()){
  lodging.innerHTML='<span class="atlas-lodging__icon">✈️</span><div><strong>Vuelo → Namba → zona del Airbnb</strong><p>Primero llegar a Osaka. Si os sobra tiempo antes de las 16:00, paseo corto con el equipaje ligero. El apartamento no se puede dar por disponible antes del check-in.</p></div>';
 }else{
  lodging.innerHTML='<span class="atlas-lodging__icon">'+(origin.key==='airport'?'✈️':'🏠')+'</span><div><strong>Salida: '+esc(origin.name)+'</strong><p>'+esc(origin.addr)+'</p></div>';
 }
 root.appendChild(lodging);
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
 var links=dayRouteLinks(d);if(links.length){var box=document.createElement('div');box.className='atlas-routebox';var p=document.createElement('small');p.textContent=(d.n===1&&arrivalMode())?'Ruta en tres partes: traslado desde el aeropuerto, paseo cercano al Airbnb y salida nocturna. Sin recorrer Osaka de punta a punta.':'Navegación por tramos desde el alojamiento. Google Maps calcula el trayecto; no se inventan tiempos.';box.appendChild(p);
 links.forEach(function(l){var a=document.createElement('a');a.href=l.url;a.textContent='📍 '+l.name;a.target='_blank';a.rel='noopener';box.appendChild(a)});root.appendChild(box);}
 var completed=effectiveStops(d).filter(function(s){return doneSet().has(s.id)}).length;var title=document.createElement('p');title.className='atlas-daycount';title.textContent='✓ '+completed+' visitas marcadas · Seguimiento compartido con tu app original en este dispositivo';root.appendChild(title);
 if(!(d.n===1&&arrivalMode()))renderDiscoveries(d,root);renderTimeline(d,root);$('screen').classList.remove('hidden');
}
window.jpDayRender=function(){if(dayPanel)dayDetail(dayPanel);else renderDays()};
var extClick=$('routebtn').onclick;
$('routebtn').onclick=function(){if(appDay){dayDetail(appDay.n);return;}if(extClick)extClick.call(this)};
createBar();
window.jpAtlasDay={showDayMap:showDayMap,dayDetail:dayDetail,clear:clearDay};
})();