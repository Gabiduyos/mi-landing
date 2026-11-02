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
      out.push(Object.assign({},stop,{t:'18:15–19:25 · orientativo',dur:70,note:'Paseo junto al canal, fotos de Glico y cena a vuestro ritmo. Si conseguís entradas para el barco a las 20:00, id al muelle con margen.'}));
      out.push({id:'atlas-hozenji-day1',kind:'sight',t:'19:25 · opcional',dur:10,name:'Hōzenji y callejón de los farolillos',q:'Hozenji Temple Namba Osaka',ll:[34.6672,135.5019],approx:true,optionalDay1:true,note:'A pocos pasos de Dōtonbori. Pequeño templo con estatua cubierta de musgo y callejón tradicional: bonito para tus fotos de noche. Recinto abierto las 24 horas, gratuito.'});
    }else if(stop.id==='tombori'){
      out.push(Object.assign({},stop,{t:'20:00 · según disponibilidad',dur:20,arrivalExtra:true,note:'Crucero de 20 minutos por Dōtonbori: prioridad alta si estáis con ganas. Entrada publicada: 2.000 ¥ por adulto. Elegid la sesión de las 20:00 si hay plazas; se puede comprar para el mismo día.',ticketUrl:'https://cloud-pass.jp/get/tombori-rivercruise'}));
      out.push({id:'atlas-ebisu-day1',kind:'sight',t:'20:35 · opcional',dur:15,name:'Noria Ebisu Tower · vistas nocturnas',q:'Ebisu Tower Don Quijote Dotonbori 7-13 Soemoncho Osaka',ll:[34.6693,135.5030],approx:true,optionalDay1:true,note:'Noria ovalada de Don Quijote, al lado del embarcadero; vuelta de unos 15 minutos. Ticket oficial publicado: 1.000 ¥ por persona. Domingos 11:00–22:30, última admisión 22:00; sujeta a cambios y cierres. Si vais cansados, saltadla.',ticketUrl:'https://www.donki.work/kanransha/index_en.php'});
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
function readableClock(s){var m=String(s||'').match(/^([01]?\d|2[0-3]):([0-5]\d)(?!\d)/);return m?m[1].padStart(2,'0')+':'+m[2]:null;}
function journeyStop(s){if(s.lodge)return lodge(s.lodge);return {name:s.name||'Parada',q:s.q||s.name||'',ll:s.ll||null,far:!!s.far};}
function travelSequence(d){
  var prev=originFor(d),list=effectiveStops(d),result=[],omissions=routeOmissions();
  list.forEach(function(s){
    if(s.opt&&!showOptions)return;
    var skipped=!!(omissions[d.n]&&omissions[d.n].indexOf(s.id)>=0);
    var now=journeyStop(s),canGo=hasCoords(now);
    var same=canGo&&hasCoords(prev)&&Math.abs(now.ll[0]-prev.ll[0])<.00015&&Math.abs(now.ll[1]-prev.ll[1])<.00015;
    var leg=canGo&&!same&&!skipped?{from:prev,to:now,how:s.how||'',mode:d.mode}:null;
    result.push({stop:s,leg:leg,skipped:skipped,clock:readableClock(s.t)});
    if(canGo&&!skipped)prev=now;
  });
  return result;
}
function distanceKm(a,b){
 if(!a||!b||!hasCoords(a)||!hasCoords(b))return null;
 var lat1=a.ll[0]*Math.PI/180,lat2=b.ll[0]*Math.PI/180;
 var dlat=lat2-lat1,dlon=(b.ll[1]-a.ll[1])*Math.PI/180;
 var r=2*Math.atan2(Math.sqrt(Math.sin(dlat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dlon/2)**2),Math.sqrt(1-(Math.sin(dlat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dlon/2)**2)));
 return Math.round(6371*r*10)/10;
}
function legSuggestion(d,s,from,to){
 var km=distanceKm(from,to),hint=String(s.how||''),h=hint.toLowerCase(),title=String((s.name||'')+' '+(from.name||'')),mode=d.mode==='car'?'driving':'transit',label=d.mode==='car'?'Coche':'Metro / tren',detail='';
 if(mode==='driving'){detail='Día con coche: consulta la carretera, aparcamiento y peajes.';}
 else if(km!==null&&km>=150){mode='transit';label='Shinkansen / tren';detail='Trayecto de larga distancia: revisar estación, billete y horario.';}
 else if(km!==null&&km>=35){mode='transit';label='Tren interurbano';detail='Cambias de zona: verifica el servicio y los transbordos.';}
 else if(/taxi/i.test(h)&&(km===null||km>=1.1)){mode='driving';label='Taxi';detail='El plan original recomienda taxi en este tramo. Compara precio con transporte público.';}
 else if(km!==null&&(km<=1.15||(km<=1.7&&/a pie|andando|caminando/.test(h)))){mode='walking';label='A pie';detail='Se encuentra relativamente cerca: evita perder tiempo entrando al metro.';}
 else if(/bus|autob[uú]s/.test(h)){mode='transit';label='Bus / tren';detail='El plan prevé bus; comprueba paradas y frecuencia en Maps.';}
 else if(/metro|subway/.test(h)){mode='transit';label='Metro / tren';detail='Consulta línea, acceso y salida de estación.';}
 else if(/tren|jr|keihan|hanky[uū]|nankai|kintetsu/.test(h)){mode='transit';label='Tren';detail='Consulta línea, andén y posibles transbordos.';}
 else if(km!==null&&km<2.4){mode='walking';label='A pie';detail='Puede ser más sencillo caminar; compara el recorrido peatonal real.';}
 else{detail='Prioriza transporte público; comprueba qué tren, metro o bus llega mejor.';}
 if(d.n===1&&(/kansai|kix/i.test(title))&&mode==='transit'){label='Tren Nankai + a pie';detail='Desde KIX hacia Namba en Nankai y después andando; revisa el servicio disponible.';}
 return {mode:mode,label:label,detail:detail,km:km,hint:hint};
}
function legLink(from,to,mode){
 var googleMode=mode==='car'?'driving':mode==='taxi'?'driving':mode;
 if(['transit','walking','driving'].indexOf(googleMode)<0)googleMode='transit';
 function location(x){return (x.addr&&x.addr.trim())||x.q||x.name||((hasCoords(x))?x.ll.join(','):'');}
 var u='https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(location(from))+'&destination='+encodeURIComponent(location(to));
 return u+'&travelmode='+googleMode;
}
function transportAlternatives(d,advice){
 if(d.mode==='car')return [{mode:'driving',name:'🚗 Coche',best:true}];
 if(advice.km!==null&&advice.km>=35)return [{mode:'transit',name:'🚄 Tren',best:true}];
 var choices=[
  {mode:'walking',name:'🚶 A pie',best:advice.mode==='walking'},
  {mode:'transit',name:'🚇 Metro / tren',best:advice.mode==='transit'},
  {mode:'driving',name:'🚕 Taxi',best:advice.mode==='driving'}
 ];
 if(advice.km!==null&&advice.km>4.5)choices=choices.filter(function(x){return x.mode!=='walking';});
 return choices;
}

function itineraryStartLabel(d){
  var list=effectiveStops(d),start=list.find(function(s){return s.kind==='home'&&readableClock(s.t);});
  return d.n===1?'Llegada del vuelo: 12:10 (KIX)':start?'Salida prevista: '+readableClock(start.t):'Salida flexible · consultar el primer horario';
}
function dayRouteLinks(d){
  return travelSequence(d).filter(function(x){return !!x.leg;}).map(function(x){
    var suggestion=legSuggestion(d,x.stop,x.leg.from,x.leg.to);return {name:x.leg.from.name+' → '+x.leg.to.name,url:legLink(x.leg.from,x.leg.to,suggestion.mode),note:suggestion.label};
  });
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
   var night=['atlas-fitness-namba-day1','atlas-guf-dotonbori-day1','dotonbori','atlas-hozenji-day1','tombori','atlas-ebisu-day1'].map(function(id){return stops.find(function(x){return x.id===id})}).filter(Boolean).map(function(x){return pointFor(x).ll});
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
    var score=({anillos:7,templos:6,amuletos:4,gym:3,foto:3,relojes:3,ropa:3,figuras:3,retro:3,mercado:2,jdm:2,cultura:0,vistas:0})[p.cat]||0;
    var name=normText(p.name);
    if(/book.?off|hard.?off|off house|2nd street|surugaya|mandarake|fujiya|camera|second|hobby/.test(name))score+=3;
    if(onRoadFilters!=='all'&&p.cat===onRoadFilters)score+=12;
    if(p.fit&&p.fit.indexOf&&p.fit.indexOf(p._dayNumber)>=0)score+=3;
    return score;
  }
  function discover(d){
    var legs=dayCorridor(d),ids=new Set(effectiveStops(d).map(function(s){return s.id;})),existing=new Set(effectiveStops(d).map(function(s){return normText(s.q||s.name);}));
    var results=[];
    PLACES.forEach(function(p){
      if(!hasCoords(p)||ids.has('c:'+p.id)||existing.has(normText(p.q||p.name)))return;
      if(effectiveStops(d).some(function(s){return hasCoords(s)&&segmentDistance(p.ll,s.ll,s.ll).km<.16;}))return;
      if(onRoadFilters!=='all'&&p.cat!==onRoadFilters)return;
      var near=null;
      legs.forEach(function(leg){
        var x=segmentDistance(p.ll,leg.a.ll,leg.b.ll);
        var limit=d.mode==='car'?1.7:.65;
        if(x.segmentKm>(d.mode==='car'?25:8)||x.km>limit)return;
        if(!near||x.km<near.km)near={km:x.km,before:leg.before,a:leg.a.name,b:leg.b.name,t:x.t};
      });
      if(!near)return;
      results.push({p:p,near:near,score:scorePoi(Object.assign({_dayNumber:d.n},p))-near.km*3});
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
    [['all','Todos'],['anillos','💍 Anillos con monedas'],['templos','⛩ Templos'],['gym','💪 Gym y anime'],['figuras','🎮 Coleccionismo'],['foto','📷 Cámaras'],['ropa','👕 Ropa'],['relojes','⌚ Relojes'],['mercado','🛍️ Mercados']].forEach(function(c){
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
        label.innerHTML='<span class="atlas-poicard__icon">'+esc(({anillos:'💍',templos:'⛩️',gym:'💪',foto:'📷',ropa:'👕',relojes:'⌚',figuras:'🎮',retro:'🎮',mercado:'🛍️',jdm:'🏎️'})[p.cat]||'📍')+'</span><span class="atlas-poicard__info"><strong>'+esc(p.name)+'</strong><small>✦ aprox. '+Math.round(n.km*1000)+' m de la línea entre paradas</small><small>Entre '+esc(n.a)+' y '+esc(n.b)+'</small></span>';
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
        if(p.url&&/^https:\/\//.test(p.url)){var info=document.createElement('a');info.href=p.url;info.target='_blank';info.rel='noopener';info.className='atlas-poicard__official';info.textContent=p.cat==='anillos'?'Ver taller y posibles reservas ↗':'Ver información oficial ↗';box.appendChild(info);}box.appendChild(actions);wrap.appendChild(box);
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
 travelSequence(d).forEach(function(entry){
  var s=entry.stop;count++;var stepNumber=count,completed=doneSet().has(s.id);
  var item=document.createElement('div');item.className='atlas-step'+(completed?' is-completed':'')+(entry.skipped?' is-skipped':'');
  var rail=document.createElement('div');rail.className='atlas-rail';rail.innerHTML='<span class="atlas-dot">'+(completed?'✓':count)+'</span>';item.appendChild(rail);
  var box=document.createElement('div');box.className='atlas-step__box';
  var top=document.createElement('div');top.className='atlas-step__row';
  var body=document.createElement('div');body.className='atlas-step__main';
  var when=s.t||'Sin horario fijo';
  body.innerHTML='<strong>'+esc(s.name||'Parada')+'</strong><span>'+esc(when)+(s.dur?' · '+s.dur+' min de visita':'')+'</span>';
  top.appendChild(body);
  if(s.kind!=='move'&&s.kind!=='task'&&s.kind!=='home'){
    var check=document.createElement('input');check.type='checkbox';check.className='atlas-step__check';check.checked=completed;check.setAttribute('aria-label','Marcar como visitado: '+s.name);check.onchange=function(){setDone(s.id,check.checked);item.classList.toggle('is-completed',check.checked);rail.querySelector('.atlas-dot').textContent=check.checked?'✓':stepNumber};top.appendChild(check);
  }
  box.appendChild(top);
  if(entry.leg){
    var travel=document.createElement('div');travel.className='atlas-leg';
    var label=document.createElement('div');label.className='atlas-leg__title';
    var loc=entry.leg.from.name||'punto anterior';
    label.textContent=(d.mode==='car'?'🚗':'🚉')+' Desde '+loc;
    travel.appendChild(label);
    if(entry.leg.how){var how=document.createElement('div');how.className='atlas-leg__hint';how.textContent=entry.leg.how+' · indicación del plan';travel.appendChild(how);}
    var g=document.createElement('a');g.href=legLink(entry.leg.from,entry.leg.to,d.mode);g.textContent='🧭 Cómo llegar desde aquí ↗';g.target='_blank';g.rel='noopener';g.className='atlas-leg__link';travel.appendChild(g);
    box.appendChild(travel);
  }
  if(s.kind!=='move'&&s.kind!=='home'&&s.kind!=='task'&&!isFixed(s)&&!(d.n===1&&arrivalMode())){
    var editRow=document.createElement('div');editRow.className='atlas-step__edit';
    editRow.appendChild(button('↑','atlas-step__move',function(){if(moveStop(d,s.id,-1))dayDetail(d.n);else alert('Esta parada no puede moverse a través de una reserva o traslado fijo.')}));
    editRow.appendChild(button('↓','atlas-step__move',function(){if(moveStop(d,s.id,1))dayDetail(d.n);else alert('Esta parada no puede moverse a través de una reserva o traslado fijo.')}));
    editRow.appendChild(button(entry.skipped?'↩ Recuperar':'⏭ Saltar hoy','atlas-step__skip',function(){toggleSkipped(d,s.id);dayDetail(d.n)}));
    if(s.id.indexOf('c:')===0){editRow.appendChild(button('✕ Quitar extra','atlas-step__remove',function(){if(confirm('Quitar esta parada añadida del día '+d.n+'?')){removeAdded(d,s.id);dayDetail(d.n)}}));}
    box.appendChild(editRow);
  }
  if(s.opt||s.optionalDay1){var optional=document.createElement('p');optional.className='atlas-step__opt';optional.textContent=s.optionalDay1?'Tienda opcional · sin compromiso':'Parada opcional';box.appendChild(optional);}
  if(s.mine||s.note){var note=document.createElement('p');note.className='atlas-step__note';note.textContent=s.mine||s.note;box.appendChild(note);}
  if(s.ticketUrl){var ticket=document.createElement('a');ticket.href=s.ticketUrl;ticket.target='_blank';ticket.rel='noopener';ticket.className='atlas-ticket-link';ticket.textContent='🎫 Consultar entradas y plazas';box.appendChild(ticket);}
  var pt=journeyStop(s);if(hasCoords(pt)){
   var buttons=document.createElement('div');buttons.className='atlas-step__buttons';
   buttons.appendChild(button('Ver en mapa','',function(){showDayMap(d.n);atlas.map.setView(pt.ll,14);var p=atlas.all.find(function(p){return p.id==='plan:'+s.id||p.id==='idea:'+s.id.replace(/^c:/,'')});if(p)atlas.select(p)}));
   box.appendChild(buttons);
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
 var sub=document.createElement('p');sub.textContent=(d.n===1&&arrivalMode())?'Si llegáis con margen, paseo cerca del Airbnb antes de las 16:00. Después, dejar maletas, tiendas de gimnasio y anime, cena en Dōtonbori y barco sobre las 20:00. Hōzenji y la noria Ebisu son extras a pocos pasos; no os comprometáis a todo si surge algún retraso.':(d.sub||'Organiza tu jornada en Japón');head.appendChild(sub);root.appendChild(head);
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
 var departure=document.createElement('div');departure.className='atlas-departure';
 departure.innerHTML='<span>🕒</span><div><strong>'+esc(itineraryStartLabel(d))+'</strong><small>Las horas de cada parada son las de tu itinerario, no tiempos calculados por Google Maps. Si modificas el día, comprueba los desplazamientos.</small></div>';
 root.appendChild(departure);
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
 var links=dayRouteLinks(d);if(links.length){
  var box=document.createElement('details');box.className='atlas-routebox atlas-route-details';
  var summary=document.createElement('summary');summary.textContent='🧭 Ver '+links.length+' trayectos del día';box.appendChild(summary);
  var p=document.createElement('small');p.textContent=(d.n===1&&arrivalMode())?'Desde KIX al entorno del alojamiento, y después los paseos locales.':'Primer enlace desde vuestro alojamiento; después, de una parada a la siguiente. Google Maps comprueba los desplazamientos y el transporte.';box.appendChild(p);
  links.forEach(function(l){var a=document.createElement('a');a.href=l.url;a.textContent='📍 '+l.name;a.target='_blank';a.rel='noopener';box.appendChild(a)});root.appendChild(box);
 }
 var completed=effectiveStops(d).filter(function(s){return doneSet().has(s.id)}).length;var title=document.createElement('p');title.className='atlas-daycount';title.textContent='✓ '+completed+' visitas marcadas · Seguimiento compartido con tu app original en este dispositivo';root.appendChild(title);
 if(!(d.n===1&&arrivalMode()))renderDiscoveries(d,root);renderTimeline(d,root);$('screen').classList.remove('hidden');
}
window.jpDayRender=function(){if(dayPanel)dayDetail(dayPanel);else renderDays()};
var extClick=$('routebtn').onclick;
$('routebtn').onclick=function(){if(appDay){dayDetail(appDay.n);return;}if(extClick)extClick.call(this)};
createBar();
window.jpAtlasDay={showDayMap:showDayMap,dayDetail:dayDetail,clear:clearDay};
})();