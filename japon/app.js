(function () {
  'use strict';

  var T = window.TRIP;
  var DAYS = T.days;
  var PLACES = window.PLACES || [];
  var CATS = window.PLACE_CATS || {};
  var NEARBY = window.NEARBY || [];
  var hasLeaflet = typeof window.L !== 'undefined';

  // ── Almacenamiento local (solo en este dispositivo) ────────────────────
  var store = {
    get: function (k, d) {
      try { var v = localStorage.getItem('jp26:' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem('jp26:' + k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ }
    }
  };

  // El plan editable: orden de paradas por día, sitios propios, horas y notas.
  function normalizePlan(p) {
    p = (p && typeof p === 'object') ? p : {};
    return {
      order: (p.order && typeof p.order === 'object') ? p.order : {},
      custom: (p.custom && typeof p.custom === 'object') ? p.custom : {},
      times: (p.times && typeof p.times === 'object') ? p.times : {},
      notes: (p.notes && typeof p.notes === 'object') ? p.notes : {}
    };
  }
  var plan = normalizePlan(store.get('plan', null));
  function savePlan() { store.set('plan', plan); }

  var state = {
    tab: 'dias',
    day: 0,
    done: new Set(store.get('done', [])),
    booked: new Set(store.get('booked', [])),
    edits: store.get('lodging', {}),
    me: null,
    watchId: null,
    phasesOn: new Set(Object.keys(T.phases)),
    catsOn: new Set(store.get('cats-on', Object.keys(CATS))),
    ideasOnDay: store.get('ideas-day', false),
    editing: false,
    addTab: 'ideas',
    addCat: 'all',
    addQuery: '',
    picking: null,
    basemap: store.get('basemap', 'sat')
  };

  // Índices
  var BASE = {}, BASE_DAY = {};
  DAYS.forEach(function (d) { d.stops.forEach(function (s, i) { BASE[s.id] = s; BASE_DAY[s.id] = { n: d.n, i: i }; }); });
  var PLACE = {};
  PLACES.forEach(function (p) { PLACE[p.id] = p; });
  function dayByN(n) { return DAYS[n - 1]; }

  // ── Utilidades ─────────────────────────────────────────────────────────
  function $(s, el) { return (el || document).querySelector(s); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  function localISO(d) { d = d || new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parseISO(s) { var p = s.split('-').map(Number); return Date.UTC(p[0], p[1] - 1, p[2]); }
  function daysBetween(a, b) { return Math.round((parseISO(b) - parseISO(a)) / 864e5); }
  var WD = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var WD3 = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
  var MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  function parts(iso) { var d = new Date(parseISO(iso)); return { wd: d.getUTCDay(), d: d.getUTCDate(), m: d.getUTCMonth() }; }
  function fmtShort(iso) { var p = parts(iso); return p.d + ' ' + MES[p.m]; }
  function fmtMin(m) { m = ((Math.round(m) % 1440) + 1440) % 1440; return Math.floor(m / 60) + ':' + pad(m % 60); }
  function timeToMin(t) { var m = /^(\d{1,2}):(\d{2})$/.exec(t || ''); return m ? (+m[1]) * 60 + (+m[2]) : null; }
  function timeForInput(t) { var m = timeToMin(t); return m == null ? '' : pad(Math.floor(m / 60)) + ':' + pad(m % 60); }
  function timeForDisplay(t) { var m = timeToMin(t); return m == null ? '' : Math.floor(m / 60) + ':' + pad(m % 60); }
  var today = localISO();

  // Salida y puesta de sol (algoritmo NOAA), en hora de Japón.
  function sunTimes(iso, lat, lng) {
    var t = parseISO(iso);
    var n = Math.floor((t - Date.UTC(new Date(t).getUTCFullYear(), 0, 1)) / 864e5) + 1;
    var g = 2 * Math.PI / 365 * (n - 1);
    var eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
    var decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) +
      0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
    var r = Math.PI / 180, la = lat * r;
    var ha = Math.acos(Math.cos(90.833 * r) / (Math.cos(la) * Math.cos(decl)) - Math.tan(la) * Math.tan(decl)) / r;
    return { rise: 720 - 4 * (lng + ha) - eq + 540, set: 720 - 4 * (lng - ha) - eq + 540 };
  }

  function haversine(a, b) {
    var r = Math.PI / 180, dLat = (b[0] - a[0]) * r, dLng = (b[1] - a[1]) * r;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 12742000 * Math.asin(Math.sqrt(h));
  }
  function fmtDist(m) { return m < 950 ? Math.round(m / 10) * 10 + ' m' : (m < 20000 ? (m / 1000).toFixed(1).replace('.', ',') : Math.round(m / 1000)) + ' km'; }

  var toastTimer;
  function toast(msg, action) {
    var el = $('#toast');
    el.innerHTML = '<span>' + esc(msg) + '</span>' + (action ? '<button class="toast__btn" type="button">' + esc(action.label) + '</button>' : '');
    if (action) el.querySelector('button').addEventListener('click', function () { el.hidden = true; action.fn(); });
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, action ? 6500 : 3800);
  }

  // ── Coordenadas y alojamientos ─────────────────────────────────────────
  function inJapan(lat, lng) { return lat > 20 && lat < 50 && lng > 120 && lng < 150; }
  function parseLL(text) {
    text = text || '';
    var pats = [/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/, /@(-?\d+\.\d+),(-?\d+\.\d+)/, /[?&](?:q|ll|query|destination)=(-?\d+\.\d+)(?:,|%2C)\s*(-?\d+\.\d+)/i, /(-?\d{1,3}\.\d{3,})\s*,\s*(-?\d{1,3}\.\d{3,})/];
    for (var i = 0; i < pats.length; i++) {
      var m = pats[i].exec(text);
      if (m && inJapan(+m[1], +m[2])) return [+m[1], +m[2]];
    }
    return null;
  }
  function lodging(key) {
    var base = T.lodging[key], e = state.edits[key] || {};
    var ll = e.addr ? parseLL(e.addr) : null;
    return {
      key: key, label: base.label, name: base.name, note: base.note,
      addr: e.addr || base.addr,
      q: e.addr ? (ll ? ll.join(',') : e.addr) : base.q,
      ll: ll || base.ll,
      approx: !ll && base.approx,
      edited: !!e.addr
    };
  }

  // ── El plan efectivo ───────────────────────────────────────────────────
  function placeStop(p) {
    return {
      id: 'c:' + p.id, kind: (CATS[p.cat] || {}).kind || 'sight', cat: p.cat, name: p.name, ja: p.ja, q: p.q,
      ll: p.ll, approx: p.approx, note: p.note, shops: p.shops, t: '', car: p.car, fromCatalog: true
    };
  }
  function stopById(id) {
    if (BASE[id]) return BASE[id];
    if (id.indexOf('c:') === 0) { var p = PLACE[id.slice(2)]; return p ? placeStop(p) : null; }
    return plan.custom[id] || null;
  }
  function withEdits(s) {
    var t = plan.times[s.id], n = plan.notes[s.id];
    if (t == null && !n) return s;
    var o = Object.assign({}, s);
    if (t != null) o.t = t;
    if (n) o.mine = n;
    return o;
  }
  function stopsOf(day) {
    var ids = plan.order[day.n];
    var list = ids ? ids.map(stopById).filter(Boolean) : day.stops;
    return list.map(withEdits);
  }
  function ensureOrder(n) {
    if (!plan.order[n]) plan.order[n] = dayByN(n).stops.map(function (s) { return s.id; });
    return plan.order[n];
  }
  function planIndex() {
    var idx = {};
    DAYS.forEach(function (d) {
      (plan.order[d.n] || d.stops.map(function (s) { return s.id; })).forEach(function (id) { (idx[id] = idx[id] || []).push(d.n); });
    });
    return idx;
  }
  function isEdited(n) { return !!plan.order[n]; }

  function info(s) {
    if (s.lodge) {
      var l = lodging(s.lodge);
      return { name: s.name, place: l.name, ja: s.ja || '', q: l.q, ll: l.ll, approx: l.approx, addr: l.edited ? l.addr : '' };
    }
    return { name: s.name, ja: s.ja || '', q: s.q || s.name, ll: s.ll || null, approx: !!s.approx, addr: '', url: s.url || '' };
  }

  // ── Enlaces de Google Maps ─────────────────────────────────────────────
  function gDir(dest, origin, mode) {
    return 'https://www.google.com/maps/dir/?api=1' +
      (origin ? '&origin=' + encodeURIComponent(origin) : '') +
      '&destination=' + encodeURIComponent(dest) +
      '&travelmode=' + mode;
  }
  function gSearch(q) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q); }
  function legMode(day, s) {
    if (s.how && /^A pie/.test(s.how)) return 'walking';
    return day.mode === 'car' ? 'driving' : 'transit';
  }
  function carRouteUrl(day) {
    var pts = [];
    stopsOf(day).forEach(function (s) {
      if (s.opt || s.kind === 'task') return;
      var q = info(s).q;
      if (q && pts[pts.length - 1] !== q) pts.push(q);
    });
    return 'https://www.google.com/maps/dir/' + pts.slice(0, 10).map(function (q) {
      return encodeURIComponent(q).replace(/%20/g, '+');
    }).join('/') + '/data=!4m2!4m1!3e0';
  }

  // ── Iconos ─────────────────────────────────────────────────────────────
  function svg(d) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>'; }
  var ICON = {
    home: svg('<path d="M4 11.5 12 5l8 6.5"/><path d="M6.5 10v9h11v-9"/>'),
    box: svg('<path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/>'),
    route: svg('<circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8 18h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h7"/>'),
    pin: svg('<path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>'),
    from: svg('<path d="M5 12h12M13 7l5 5-5 5"/>'),
    ja: svg('<path d="M4 6h9M8.5 4v2M6 6c0 4 3 7 7 8M11 6c-1 4-3.5 7-7 8M13.5 20l3.5-9 3.5 9M14.7 17h4.6"/>'),
    check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    walk: svg('<circle cx="13" cy="4.5" r="1.8"/><path d="M10 21l2.5-6.5L15 17v4M9 12l2-4.5 3 2.5 3 1M12.5 14.5 11 8"/>'),
    rain: svg('<path d="M4 12a8 8 0 0 1 16 0z"/><path d="M12 12v6.5a2 2 0 0 1-4 0"/>'),
    sunrise: svg('<path d="M4 18h16M7 18a5 5 0 0 1 10 0M12 4v4M9.5 6.5 12 4l2.5 2.5"/>'),
    sunset: svg('<path d="M4 18h16M7 18a5 5 0 0 1 10 0M12 4v4M9.5 5.5 12 8l2.5-2.5"/>'),
    temp: svg('<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z"/>'),
    train: svg('<rect x="5.5" y="3.5" width="13" height="13" rx="3"/><path d="M5.5 10h13M8.5 20l2-3.5M15.5 20l-2-3.5"/>'),
    car: svg('<path d="M5 16V12l2-5h10l2 5v4z"/><path d="M5 12h14"/><circle cx="8" cy="16.5" r="1.6"/><circle cx="16" cy="16.5" r="1.6"/>'),
    plus: svg('<path d="M12 5v14M5 12h14"/>'),
    edit: svg('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>'),
    up: svg('<path d="M12 19V5M6 11l6-6 6 6"/>'),
    down: svg('<path d="M12 5v14M6 13l6 6 6-6"/>'),
    trash: svg('<path d="M5 7h14M10 7V4.5h4V7M7 7l1 13h8l1-13"/>'),
    clock: svg('<circle cx="12" cy="12" r="8"/><path d="M12 8v4.5l3 2"/>'),
    bulb: svg('<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>'),
    close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
    search: svg('<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>'),
    target: svg('<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>')
  };
  var CAT_ICON = {
    foto: svg('<rect x="3.5" y="7" width="17" height="12" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M8.5 7l1.5-2.5h4L15.5 7"/>'),
    ropa: svg('<path d="M8 4 3.5 7l2 4L8 10v10h8V10l2.5 1 2-4L16 4c-.6 1.4-2 2.4-4 2.4S8.6 5.4 8 4z"/>'),
    figuras: svg('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),
    retro: svg('<rect x="3" y="8" width="18" height="9" rx="4.5"/><path d="M7.5 12.5h3M9 11v3"/><path d="M15 12h.01M17.5 13.5h.01" stroke-width="2.6"/>'),
    cultura: svg('<path d="M3.5 6.5c3 .9 14 .9 17 0M5 10.5h14M7 7v13M17 7v13M12 7.2v3.3"/>'),
    mercado: svg('<path d="M4 9l2-4h12l2 4z"/><path d="M4 9c0 1.4 1.2 2.3 2.7 2.3S9.3 10.4 9.3 9c0 1.4 1.2 2.3 2.7 2.3s2.7-.9 2.7-2.3c0 1.4 1.2 2.3 2.7 2.3S20 10.4 20 9"/><path d="M5.5 11.5V19h13v-7.5"/>'),
    vistas: svg('<path d="M3 19l6.5-11 4 6.5 2.5-3.5L21 19z"/>'),
    mine: ICON.pin
  };
  var KIND = { sight: 'Visita', food: 'Comida', shop: 'Tiendas', move: 'Trayecto', home: 'Alojamiento', task: 'Tarea' };
  function kindLabel(s) {
    if (s.cat && CATS[s.cat]) return CATS[s.cat].name;
    if (s.custom) return 'Tu sitio · ' + (KIND[s.kind] || 'Visita');
    return KIND[s.kind] || 'Visita';
  }

  function numbering(list) {
    var n = 0, out = {};
    list.forEach(function (s) { if (s.kind !== 'home' && s.kind !== 'task') out[s.id] = ++n; });
    return out;
  }
  function nodeHtml(s, nums) {
    if (s.kind === 'home') return ICON.home;
    if (s.kind === 'task') return ICON.box;
    return String(nums[s.id]);
  }

  // ── Cabecera ───────────────────────────────────────────────────────────
  function tripIndex() {
    var i = daysBetween(T.start, today);
    return (i >= 0 && i < DAYS.length) ? i : -1;
  }
  function renderStatus() {
    var el = $('#status');
    var toStart = daysBetween(today, T.start);
    var i = tripIndex();
    if (i >= 0) el.innerHTML = 'Día <b>' + (i + 1) + '</b> de ' + DAYS.length + ' · ' + esc(T.phases[DAYS[i].phase].name);
    else if (toStart > 0) el.innerHTML = toStart === 1 ? 'Sales <b>mañana</b>' : 'Faltan <b>' + toStart + '</b> días';
    else el.textContent = 'Viaje completado';
  }

  function renderStrip() {
    $('#daystrip').innerHTML = DAYS.map(function (d, i) {
      var p = parts(d.date);
      var all = stopsOf(d).filter(function (s) { return !s.opt; });
      var complete = all.length && all.every(function (s) { return state.done.has(s.id); });
      return '<a class="ticket' + (d.date === today ? ' is-today' : '') + (complete ? ' is-complete' : '') + (isEdited(d.n) ? ' is-edited' : '') +
        '" href="#dia-' + d.n + '" data-phase="' + d.phase + '"' + (i === state.day && state.tab === 'dias' ? ' aria-current="page"' : '') +
        ' aria-label="Día ' + d.n + ', ' + WD[p.wd] + ' ' + p.d + ' de noviembre: ' + esc(d.title) + '">' +
        '<span class="ticket__wd">' + WD3[p.wd] + '</span>' +
        '<span class="ticket__d">' + p.d + '</span>' +
        '<span class="ticket__m">' + MES[p.m].toUpperCase() + '</span></a>';
    }).join('');
  }
  function scrollStripToCurrent(smooth) {
    var cur = $('#daystrip [aria-current="page"]');
    if (cur) cur.scrollIntoView({ inline: 'center', block: 'nearest', behavior: smooth ? 'smooth' : 'auto' });
  }

  // ── Vista de día ───────────────────────────────────────────────────────
  function dayPoints(day) {
    return stopsOf(day).filter(function (s) { return !s.far; }).map(function (s) { return info(s).ll; }).filter(Boolean);
  }
  function dayCenter(day) {
    var pts = dayPoints(day);
    if (!pts.length) pts = [lodging(day.base).ll];
    var lat = 0, lng = 0;
    pts.forEach(function (p) { lat += p[0]; lng += p[1]; });
    return [lat / pts.length, lng / pts.length];
  }

  function nearbyChips(day) {
    var list = NEARBY.slice();
    if (day && day.mode === 'car') list.sort(function (a, b) { return (b.car ? 1 : 0) - (a.car ? 1 : 0); });
    return '<ul class="nearby">' + list.map(function (c) {
      return '<li><a class="chip chip--link" target="_blank" rel="noopener" href="' + esc(gSearch(c.q)) + '">' + esc(c.n) + '</a></li>';
    }).join('') + '</ul>';
  }

  function dayOptions(current) {
    return DAYS.map(function (d) {
      var p = parts(d.date);
      return '<option value="' + d.n + '"' + (d.n === current ? ' disabled' : '') + '>Día ' + d.n + ' · ' + WD3[p.wd].toLowerCase() + ' ' + p.d + ' · ' + esc(T.phases[d.phase].name) + '</option>';
    }).join('');
  }

  function renderDay(newlyDone) {
    var day = DAYS[state.day];
    var list = stopsOf(day);
    var p = parts(day.date);
    var c = dayCenter(day);
    var sun = sunTimes(day.date, c[0], c[1]);
    var nums = numbering(list);
    var home = lodging(day.base);
    var homeMode = day.mode === 'car' ? 'driving' : 'transit';
    var ed = state.editing;

    var html = '';
    html += '<p class="eyebrow" style="--c:var(--' + day.phase + ')"><span class="phase-dot"></span>Día ' + day.n + ' · ' +
      WD[p.wd] + ' ' + p.d + ' ' + MES[p.m] + ' · ' + esc(T.phases[day.phase].name) + '</p>';
    html += '<h1 class="day-title" id="day-title">' + esc(day.title) + '</h1>';
    html += '<p class="day-sub">' + esc(day.sub) + '</p>';
    html += '<ul class="meta">' +
      '<li>' + ICON.temp + '<span><b>' + day.temp[0] + '°</b> / ' + day.temp[1] + '° aprox.</span></li>' +
      '<li>' + ICON.sunrise + '<span>Sale <b>' + fmtMin(sun.rise) + '</b></span></li>' +
      '<li>' + ICON.sunset + '<span>Se pone <b>' + fmtMin(sun.set) + '</b></span></li>' +
      '<li>' + (day.mode === 'car' ? ICON.car + '<span>En coche</span>' : ICON.train + '<span>Transporte público</span>') + '</li>' +
      '</ul>';

    html += '<div class="day-actions">';
    if (ed) {
      html += '<button class="btn btn--primary" type="button" id="edit-toggle" aria-pressed="true">' + ICON.check + 'Listo</button>';
      html += '<button class="btn" type="button" data-open-add="' + day.n + '">' + ICON.plus + 'Añadir parada</button>';
      html += '<button class="btn" type="button" id="sort-time">' + ICON.clock + 'Ordenar por hora</button>';
      if (isEdited(day.n)) html += '<button class="btn btn--ghost" type="button" id="reset-day">Restablecer día</button>';
    } else {
      html += '<a class="btn btn--primary" target="_blank" rel="noopener" href="' + esc(gDir(home.q, '', homeMode)) + '">' + ICON.home + 'Volver a casa</a>';
      html += '<button class="btn" type="button" id="edit-toggle" aria-pressed="false">' + ICON.edit + 'Editar plan</button>';
      if (day.mode === 'car') html += '<a class="btn" target="_blank" rel="noopener" href="' + esc(carRouteUrl(day)) + '">' + ICON.route + 'Ruta en coche</a>';
    }
    html += '</div>';
    if (ed) html += '<p class="edit-hint">Sube, baja, cambia la hora, mueve a otro día o quita paradas. Los cambios se guardan en este dispositivo.</p>';

    if (!ed && day.changes && day.changes.length) {
      html += '<details class="review"' + (store.get('review-' + day.n, true) ? ' open' : '') + ' data-review="' + day.n + '">' +
        '<summary><span class="seal" aria-hidden="true">改</span>Cambios respecto al PDF <span class="count">(' + day.changes.length + ')</span></summary><ul>' +
        day.changes.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></details>';
    }
    if (!ed && day.rain) html += '<p class="rain">' + ICON.rain + '<span><b>Si llueve:</b> ' + esc(day.rain) + '</span></p>';

    html += '<ol class="timeline' + (ed ? ' is-editing' : '') + '">';
    var prev = null;
    list.forEach(function (s, i) {
      var inf = info(s);
      var done = state.done.has(s.id);
      var mode = legMode(day, s);
      var dist = (state.me && inf.ll) ? fmtDist(haversine([state.me.lat, state.me.lng], inf.ll)) : '';
      var t = timeForDisplay(s.t);
      html += '<li class="stop' + (s.opt ? ' stop--opt' : '') + (done ? ' is-done' : '') + '" id="stop-' + cssId(s.id) + '" data-phase="' + day.phase + '">';
      html += '<button class="stop__num" type="button" data-focus="' + esc(s.id) + '" aria-label="Ver ' + esc(inf.name) + ' en el mapa"' + (inf.ll ? '' : ' disabled') + '>' + nodeHtml(s, nums) + '</button>';
      html += '<div class="stop__card">';
      if (done && !ed) html += '<span class="hanko' + (newlyDone === s.id ? ' is-new' : '') + '" aria-hidden="true">済</span>';
      html += '<p class="stop__kind">' + (t ? '<span class="stop__time">' + esc(t) + '</span>' : '') + '<span>' + esc(kindLabel(s)) + '</span>' +
        (s.opt ? '<span class="tag">Opcional</span>' : '') +
        (s.fromCatalog ? '<span class="tag">Añadida</span>' : '') +
        (inf.approx && inf.ll ? '<span class="tag">Ubicación aprox.</span>' : '') +
        (!inf.ll && !s.lodge ? '<span class="tag">Sin pin</span>' : '') +
        (dist ? '<span class="dist">a ' + dist + '</span>' : '') + '</p>';
      html += '<h2 class="stop__name">' + esc(inf.name) + '</h2>';
      if (s.lodge) html += '<p class="stop__ja">' + esc(inf.place) + (inf.addr ? ' · ' + esc(inf.addr) : '') + '</p>';
      else if (inf.ja) html += '<p class="stop__ja" lang="ja">' + esc(inf.ja) + '</p>';

      if (ed) {
        html += '<div class="stop__edit">' +
          '<div class="edit-row">' +
          '<button class="ibtn" type="button" data-move="-1" data-id="' + esc(s.id) + '" aria-label="Subir"' + (i === 0 ? ' disabled' : '') + '>' + ICON.up + '</button>' +
          '<button class="ibtn" type="button" data-move="1" data-id="' + esc(s.id) + '" aria-label="Bajar"' + (i === list.length - 1 ? ' disabled' : '') + '>' + ICON.down + '</button>' +
          '<label class="edit-time"><span class="sr">Hora de ' + esc(inf.name) + '</span><input type="time" id="time-' + cssId(s.id) + '" data-time="' + esc(s.id) + '" value="' + timeForInput(s.t) + '" /></label>' +
          '<button class="ibtn ibtn--danger" type="button" data-remove="' + esc(s.id) + '" aria-label="Quitar ' + esc(inf.name) + '">' + ICON.trash + '</button>' +
          '</div>' +
          '<label class="edit-move"><span class="sr">Mover a otro día</span><select id="move-' + cssId(s.id) + '" data-moveday="' + esc(s.id) + '"><option value="">Mover a otro día…</option>' + dayOptions(day.n) + '</select></label>' +
          '<label class="edit-note"><span class="sr">Tu nota</span><input type="text" id="note-' + cssId(s.id) + '" data-note="' + esc(s.id) + '" value="' + esc(plan.notes[s.id] || '') + '" placeholder="Tu nota (opcional)" /></label>' +
          '</div>';
      } else {
        if (s.how) html += '<p class="stop__how">' + (mode === 'walking' ? ICON.walk : (day.mode === 'car' ? ICON.car : ICON.train)) + '<span>' + esc(s.how) + '</span></p>';
        if (s.note) html += '<p class="stop__note">' + esc(s.note) + '</p>';
        if (s.mine) html += '<p class="stop__mine"><b>Tu nota:</b> ' + esc(s.mine) + '</p>';
        if (s.tips && s.tips.length) html += '<ul class="stop__tips">' + s.tips.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
        if (s.shops && s.shops.length) {
          html += '<ul class="shops" aria-label="Tiendas">' + s.shops.map(function (sh) {
            return '<li><a target="_blank" rel="noopener" href="' + esc(gSearch(sh.q)) + '">' + ICON.pin + esc(sh.n) + '</a></li>';
          }).join('') + '</ul>';
        }
        html += '<div class="stop__actions">';
        if (inf.q) {
          html += '<a class="btn btn--primary" target="_blank" rel="noopener" href="' + esc(gDir(inf.q, '', mode)) + '">' + ICON.route + 'Cómo llegar</a>';
          if (prev && prev.q && prev.q !== inf.q) html += '<a class="btn" target="_blank" rel="noopener" href="' + esc(gDir(inf.q, prev.q, mode)) + '">' + ICON.from + 'Desde la anterior</a>';
        }
        html += '</div><div class="stop__more">';
        if (!s.lodge && (inf.url || inf.q)) html += '<a class="btn btn--sm" target="_blank" rel="noopener" href="' + esc(inf.url || gSearch(inf.q)) + '" aria-label="Ver ' + esc(inf.name) + ' en Google Maps">' + ICON.pin + 'Maps</a>';
        if (inf.ja || inf.addr) html += '<button class="btn btn--sm" type="button" data-ja="' + esc(s.id) + '">' + ICON.ja + 'Japonés</button>';
        html += '<button class="btn btn--sm btn-done" type="button" data-done="' + esc(s.id) + '" aria-pressed="' + done + '">' + ICON.check + 'Hecho</button>';
        html += '</div>';
      }
      html += '</div></li>';
      if (inf.q && s.kind !== 'task') prev = inf;
    });
    html += '</ol>';
    html += '<button class="add-stop" type="button" data-open-add="' + day.n + '">' + ICON.plus + '<span>Añadir parada a este día</span></button>';

    if (!ed) {
      html += '<section class="nearby-wrap" aria-labelledby="nearby-title"><h2 class="nearby__title" id="nearby-title">' +
        (day.mode === 'car' ? 'Con el coche: busca cerca de ti' : 'Buscar cerca de ti') + '</h2>' +
        '<p class="nearby__sub">Abre Google Maps con resultados alrededor de donde estés.</p>' + nearbyChips(day) + '</section>';
    }

    $('#day-body').innerHTML = html;
    renderDayMap();
  }
  function cssId(id) { return String(id).replace(/[^a-zA-Z0-9_-]/g, '_'); }

  // ── Edición del plan ───────────────────────────────────────────────────
  function moveStop(id, delta) {
    var n = DAYS[state.day].n, arr = ensureOrder(n), i = arr.indexOf(id), j = i + delta;
    if (i < 0 || j < 0 || j >= arr.length) return;
    arr.splice(j, 0, arr.splice(i, 1)[0]);
    savePlan();
    rerenderKeepingScroll();
  }
  function moveToDay(id, m) {
    var n = DAYS[state.day].n;
    if (!m || m === n) return;
    var a = ensureOrder(n), i = a.indexOf(id);
    if (i >= 0) a.splice(i, 1);
    var b = ensureOrder(m);
    if (b.indexOf(id) < 0) b.push(id);
    savePlan();
    rerenderKeepingScroll();
    refreshTripMap();
    toast('Movida al día ' + m + '.', { label: 'Ver día ' + m, fn: function () { location.hash = '#dia-' + m; } });
  }
  function removeStop(id) {
    var n = DAYS[state.day].n, arr = ensureOrder(n), i = arr.indexOf(id);
    if (i < 0) return;
    arr.splice(i, 1);
    savePlan();
    rerenderKeepingScroll();
    refreshTripMap();
    var name = (stopById(id) || {}).name || 'Parada';
    toast('«' + name + '» quitada.', { label: 'Deshacer', fn: function () { var a = ensureOrder(n); a.splice(Math.min(i, a.length), 0, id); savePlan(); rerenderKeepingScroll(); refreshTripMap(); } });
  }
  function addToDay(id, n) {
    var arr = ensureOrder(n);
    if (arr.indexOf(id) >= 0) { toast('Ya está en el día ' + n + '.'); return false; }
    arr.push(id);
    savePlan();
    if (DAYS[state.day].n === n && state.tab === 'dias') rerenderKeepingScroll();
    else renderStrip();
    refreshTripMap();
    return true;
  }
  function sortByTime() {
    var n = DAYS[state.day].n, arr = ensureOrder(n);
    var last = -1;
    var keyed = arr.map(function (id, i) {
      var s = withEdits(stopById(id) || { t: '' });
      var m = timeToMin(s.t);
      if (m == null) m = last; else last = m;
      return { id: id, k: m, i: i };
    });
    keyed.sort(function (a, b) { return a.k - b.k || a.i - b.i; });
    plan.order[n] = keyed.map(function (x) { return x.id; });
    savePlan();
    rerenderKeepingScroll();
    toast('Ordenado por hora.');
  }
  function resetDay() {
    var n = DAYS[state.day].n;
    var prevOrder = plan.order[n];
    delete plan.order[n];
    savePlan();
    rerenderKeepingScroll();
    refreshTripMap();
    toast('Día ' + n + ' como en el plan original.', { label: 'Deshacer', fn: function () { plan.order[n] = prevOrder; savePlan(); rerenderKeepingScroll(); refreshTripMap(); } });
  }
  function rerenderKeepingScroll() {
    var y = window.scrollY;
    renderDay();
    renderStrip();
    window.scrollTo(0, y);
  }

  // ── Mapas ──────────────────────────────────────────────────────────────
  var dayMap = null, dayLayer = null, ideaLayer = null, dayMarkers = {}, tripMap = null, tripLayers = {}, tripIdeas = {}, meLayers = [];

  // Mapa base: satélite (Esri) con nombres, o calles (OpenStreetMap). La elección se recuerda.
  var bases = [];
  function addBase(map, offlineEl) {
    map.createPane('coast');
    map.getPane('coast').style.zIndex = 150;
    if (window.JP_COAST) {
      L.polygon(window.JP_COAST.map(function (r) { return r.map(function (p) { return [p[1], p[0]]; }); }), {
        pane: 'coast', className: 'coast', weight: 1, fillOpacity: 1, interactive: false
      }).addTo(map);
    }
    var ok = 0, bad = 0;
    function watch(layer) {
      layer.on('tileload', function () { ok++; offlineEl.hidden = true; });
      layer.on('tileerror', function () { bad++; if (!ok && bad >= 3) { offlineEl.hidden = false; updateGmapsLinks(); } });
      return layer;
    }
    var street = watch(L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      crossOrigin: 'anonymous',
      className: 'tiles',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
    }));
    var sat = L.layerGroup([
      watch(L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        maxNativeZoom: 19,
        crossOrigin: 'anonymous',
        className: 'tiles-sat',
        zIndex: 1,
        attribution: 'Imágenes &copy; Esri, Maxar, Earthstar Geographics'
      })),
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        maxNativeZoom: 18,
        crossOrigin: 'anonymous',
        className: 'tiles-sat',
        zIndex: 2
      })
    ]);
    var b = { map: map, street: street, sat: sat };
    bases.push(b);
    (state.basemap === 'street' ? street : sat).addTo(map);
    map.on('moveend', updateGmapsLinks);
  }
  function setBasemap(kind) {
    state.basemap = kind;
    store.set('basemap', kind);
    bases.forEach(function (b) {
      if (kind === 'street') { b.map.removeLayer(b.sat); b.street.addTo(b.map); }
      else { b.map.removeLayer(b.street); b.sat.addTo(b.map); }
    });
    syncLayerButtons();
  }
  function syncLayerButtons() {
    var sat = state.basemap !== 'street';
    ['#btn-layer', '#btn-layer-2'].forEach(function (sel) {
      var btn = $(sel);
      if (!btn) return;
      btn.setAttribute('aria-pressed', sat);
      btn.querySelector('[data-layer-tag]').textContent = sat ? 'SAT' : 'MAPA';
    });
  }
  // Enlace a la misma zona en Google Maps en modo satélite (útil sin conexión o dentro de Claude).
  function updateGmapsLinks() {
    [[dayMap, '#daymap-offline'], [tripMap, '#tripmap-offline']].forEach(function (pair) {
      var map = pair[0], el = $(pair[1] + ' [data-gmaps-sat]');
      if (!map || !el) return;
      var c = map.getCenter();
      el.href = 'https://www.google.com/maps/@?api=1&map_action=map&center=' + c.lat.toFixed(5) + ',' + c.lng.toFixed(5) +
        '&zoom=' + Math.max(3, Math.min(20, Math.round(map.getZoom()))) + '&basemap=satellite';
    });
  }

  function pinIcon(cls, html, size) {
    size = size || 28;
    return L.divIcon({ className: '', html: '<div class="pin ' + cls + '">' + html + '</div>', iconSize: [size, size], iconAnchor: [size / 2, size / 2], popupAnchor: [0, -size / 2] });
  }

  function popupHtml(day, s, inTripMap) {
    var inf = info(s);
    var mode = legMode(day, s);
    var t = timeForDisplay(s.t);
    var h = '<p class="pop__t">Día ' + day.n + (t ? ' · ' + esc(t) : '') + '</p>' +
      '<p class="pop__n">' + esc(inf.name) + '</p>' +
      (s.lodge ? '<p class="pop__ja">' + esc(inf.place) + '</p>' : (inf.ja ? '<p class="pop__ja" lang="ja">' + esc(inf.ja) + '</p>' : '')) +
      (inf.approx ? '<p class="pop__approx">Ubicación aproximada: la ruta usa el nombre.</p>' : '') +
      '<div class="pop__a"><a class="btn btn--primary" target="_blank" rel="noopener" href="' + esc(gDir(inf.q, '', mode)) + '">Cómo llegar</a>';
    h += inTripMap
      ? '<a class="btn" href="#dia-' + day.n + '">Ver día ' + day.n + '</a>'
      : '<button class="btn" type="button" data-goto="' + esc(s.id) + '">Ver en la lista</button>';
    return h + '</div>';
  }

  function nearestDay(p) {
    if (p.fit && p.fit.length) return p.fit[0];
    var best = 1, bd = Infinity;
    DAYS.forEach(function (d) {
      dayPoints(d).forEach(function (q) { var x = haversine(p.ll, q); if (x < bd) { bd = x; best = d.n; } });
    });
    return best;
  }

  function ideaPopup(p, fixedDay) {
    var idx = planIndex();
    var inPlan = idx['c:' + p.id];
    var h = '<p class="pop__t">' + esc((CATS[p.cat] || {}).name || '') + (p.car ? ' · en coche' : '') + ' · ' + esc(p.area) + '</p>' +
      '<p class="pop__n">' + esc(p.name) + '</p>' +
      (p.ja ? '<p class="pop__ja" lang="ja">' + esc(p.ja) + '</p>' : '') +
      '<p class="pop__note">' + esc(p.note) + '</p>' +
      (inPlan ? '<p class="pop__in">En tu plan: día ' + inPlan.join(', ') + '</p>' : '') +
      '<div class="pop__a">';
    if (fixedDay) {
      h += '<button class="btn btn--primary" type="button" data-addplace="' + esc(p.id) + '" data-day="' + fixedDay + '">Añadir a este día</button>';
    } else {
      var def = nearestDay(p);
      h += '<label class="pop__sel"><span class="sr">Día</span><select id="pop-day-' + cssId(p.id) + '" data-pop-day="' + esc(p.id) + '">' +
        DAYS.map(function (d) { return '<option value="' + d.n + '"' + (d.n === def ? ' selected' : '') + '>Día ' + d.n + '</option>'; }).join('') +
        '</select></label><button class="btn btn--primary" type="button" data-addplace="' + esc(p.id) + '">Añadir</button>';
    }
    h += '<a class="btn" target="_blank" rel="noopener" href="' + esc(gSearch(p.q)) + '">Maps</a></div>';
    return h;
  }

  function ensureDayMap() {
    if (dayMap || !hasLeaflet) return;
    dayMap = L.map('daymap', { zoomControl: true, scrollWheelZoom: true });
    addBase(dayMap, $('#daymap-offline'));
    ideaLayer = L.layerGroup().addTo(dayMap);
    dayLayer = L.layerGroup().addTo(dayMap);
    dayMap.on('click', function (e) {
      if (!state.picking) return;
      var pk = state.picking;
      state.picking = null;
      $('#pick-banner').hidden = true;
      $('#daymap').classList.remove('is-picking');
      pk.values.place = e.latlng.lat.toFixed(5) + ', ' + e.latlng.lng.toFixed(5);
      openAdd(pk.n, 'mine', pk.values);
    });
  }

  function highlight(el) {
    document.querySelectorAll('.stop.is-focus').forEach(function (x) { x.classList.remove('is-focus'); });
    el.classList.add('is-focus');
  }

  function renderDayMap() {
    if (!hasLeaflet) { $('#daymap').hidden = true; return; }
    ensureDayMap();
    var day = DAYS[state.day];
    var list = stopsOf(day);
    var nums = numbering(list);
    dayLayer.clearLayers();
    dayMarkers = {};
    var pts = [], seen = {};
    list.forEach(function (s) {
      var inf = info(s);
      if (!inf.ll) return;
      var key = inf.ll.join(',');
      var done = state.done.has(s.id);
      var cls = 'pin--' + day.phase + (s.opt ? ' pin--opt' : '') + (done ? ' is-done' : '');
      var html = s.kind === 'home' ? ICON.home : (s.kind === 'task' ? ICON.box : nums[s.id]);
      if (s.kind === 'home' || s.kind === 'task') cls = 'pin--home' + (done ? ' is-done' : '');
      if (seen[key]) { dayMarkers[s.id] = seen[key]; return; }
      var m = L.marker(inf.ll, { icon: pinIcon(cls, html), title: inf.name, riseOnHover: true, zIndexOffset: 200 }).bindPopup(popupHtml(day, s));
      m.addTo(dayLayer);
      seen[key] = m;
      dayMarkers[s.id] = m;
      if (!s.opt && !s.far) pts.push(inf.ll);
    });
    if (pts.length > 1) {
      L.polyline(pts, { className: 'route route--' + day.phase, weight: 3, opacity: .8, dashArray: '1 8', lineCap: 'round', interactive: false }).addTo(dayLayer);
    }
    renderDayIdeas();
    if (state.me) drawMe();
    fitDay(false);
  }

  function ideasNearDay(day) {
    // Los trayectos (recogida del coche, aeropuerto) no cuentan: solo donde se pasa el día.
    var pts = stopsOf(day).filter(function (s) { return !s.far && s.kind !== 'move' && s.kind !== 'home' && s.kind !== 'task'; })
      .map(function (s) { return info(s).ll; }).filter(Boolean);
    if (!pts.length) pts = dayPoints(day);
    var radius = day.mode === 'car' ? 15000 : 3500;
    var idx = planIndex();
    return PLACES.filter(function (p) {
      if (!p.ll || (idx['c:' + p.id] || []).indexOf(day.n) >= 0) return false;
      if (p.fit && p.fit.indexOf(day.n) >= 0) return true;
      return pts.some(function (q) { return haversine(p.ll, q) < radius; });
    });
  }

  function renderDayIdeas() {
    if (!ideaLayer) return;
    ideaLayer.clearLayers();
    $('#btn-ideas').classList.toggle('is-on', !!state.ideasOnDay);
    $('#btn-ideas').setAttribute('aria-pressed', !!state.ideasOnDay);
    if (!state.ideasOnDay) return;
    var day = DAYS[state.day];
    ideasNearDay(day).forEach(function (p) {
      L.marker(p.ll, { icon: pinIcon('pin--idea', CAT_ICON[p.cat] || ICON.pin, 26), title: p.name })
        .bindPopup(ideaPopup(p, day.n)).addTo(ideaLayer);
    });
  }

  function fitDay(animate) {
    if (!dayMap) return;
    var pts = dayPoints(DAYS[state.day]);
    dayMap.invalidateSize();
    if (pts.length === 1) dayMap.setView(pts[0], 15, { animate: animate });
    else if (pts.length) dayMap.fitBounds(L.latLngBounds(pts), { padding: [36, 36], maxZoom: 16, animate: animate });
    else dayMap.setView(lodging(DAYS[state.day].base).ll, 13);
  }

  function focusStop(id) {
    var s = stopsOf(DAYS[state.day]).find(function (x) { return x.id === id; });
    if (!s || !dayMap) return;
    var inf = info(s);
    if (!inf.ll) return;
    if (window.matchMedia('(max-width: 959px)').matches) {
      var top = $('.day-map-wrap').getBoundingClientRect().top + window.scrollY - $('.topbar').offsetHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
    dayMap.flyTo(inf.ll, Math.max(dayMap.getZoom(), 15), { duration: .6 });
    var m = dayMarkers[id];
    if (m) setTimeout(function () { m.openPopup(); }, 650);
    var el = document.getElementById('stop-' + cssId(id));
    if (el) highlight(el);
  }

  function ensureTripMap() {
    if (tripMap || !hasLeaflet) return;
    tripMap = L.map('tripmap', { zoomControl: false });
    L.control.zoom({ position: 'topright' }).addTo(tripMap);
    addBase(tripMap, $('#tripmap-offline'));
    Object.keys(CATS).forEach(function (k) { tripIdeas[k] = L.layerGroup(); if (state.catsOn.has(k)) tripIdeas[k].addTo(tripMap); });
    Object.keys(T.phases).forEach(function (ph) { tripLayers[ph] = L.layerGroup(); if (state.phasesOn.has(ph)) tripLayers[ph].addTo(tripMap); });
    tripLayers.home = L.layerGroup().addTo(tripMap);
    drawTrip();
    var all = [];
    DAYS.forEach(function (d) { all = all.concat(dayPoints(d)); });
    tripMap.fitBounds(L.latLngBounds(all), { padding: [30, 30] });
    if (state.me) drawMe();
  }

  function drawTrip() {
    if (!tripMap) return;
    Object.keys(tripLayers).forEach(function (k) { tripLayers[k].clearLayers(); });
    Object.keys(tripIdeas).forEach(function (k) { tripIdeas[k].clearLayers(); });
    DAYS.forEach(function (day) {
      var pts = [];
      stopsOf(day).forEach(function (s) {
        var inf = info(s);
        if (!inf.ll || s.far || s.kind === 'home' || s.kind === 'task') return;
        pts.push(inf.ll);
        L.marker(inf.ll, { icon: pinIcon('pin--dot pin--' + day.phase + (s.opt ? ' pin--opt' : ''), '', 14), title: inf.name, zIndexOffset: 300 })
          .bindPopup(popupHtml(day, s, true)).addTo(tripLayers[day.phase]);
      });
      if (pts.length > 1) {
        L.polyline(pts, { className: 'route route--' + day.phase, weight: 2, opacity: .7, dashArray: '1 6', lineCap: 'round', interactive: false }).addTo(tripLayers[day.phase]);
      }
    });
    var idx = planIndex();
    PLACES.forEach(function (p) {
      if (!p.ll || !tripIdeas[p.cat] || idx['c:' + p.id]) return;
      L.marker(p.ll, { icon: pinIcon('pin--idea pin--idea-sm', CAT_ICON[p.cat] || ICON.pin, 22), title: p.name })
        .bindPopup(ideaPopup(p)).addTo(tripIdeas[p.cat]);
    });
    Object.keys(T.lodging).forEach(function (k) {
      var l = lodging(k);
      L.marker(l.ll, { icon: pinIcon('pin--home pin--sm', ICON.home, 22), title: l.label, zIndexOffset: 500 })
        .bindPopup('<p class="pop__t">' + esc(l.label) + '</p><p class="pop__n">' + esc(l.name) + '</p>' +
          (l.approx ? '<p class="pop__approx">Ubicación aproximada.</p>' : '') +
          '<div class="pop__a"><a class="btn btn--primary" target="_blank" rel="noopener" href="' + esc(gDir(l.q, '', 'transit')) + '">Cómo llegar</a></div>')
        .addTo(tripLayers.home);
    });
  }
  function refreshTripMap() { if (tripMap) { tripMap.closePopup(); drawTrip(); } }

  function renderLegend() {
    $('#legend').innerHTML =
      '<div class="legend__row">' + Object.keys(T.phases).map(function (k) {
        return '<button class="chip" type="button" data-phase="' + k + '" aria-pressed="' + state.phasesOn.has(k) + '">' + esc(T.phases[k].name) + '</button>';
      }).join('') + '</div>' +
      '<div class="legend__row legend__row--ideas" role="group" aria-label="Ideas"><span class="legend__label">Ideas</span>' + Object.keys(CATS).map(function (k) {
        return '<button class="chip chip--idea" type="button" data-cat="' + k + '" aria-pressed="' + state.catsOn.has(k) + '">' + (CAT_ICON[k] || '') + esc(CATS[k].name) + '</button>';
      }).join('') + '</div>';
  }

  // ── Ubicación ──────────────────────────────────────────────────────────
  function drawMe() {
    meLayers.forEach(function (l) { l.remove(); });
    meLayers = [];
    if (!state.me) return;
    [dayMap, tripMap].forEach(function (map) {
      if (!map) return;
      var ll = [state.me.lat, state.me.lng];
      meLayers.push(L.circle(ll, { radius: state.me.acc, weight: 1, color: '#2f80ed', fillOpacity: .1, interactive: false }).addTo(map));
      meLayers.push(L.marker(ll, { icon: L.divIcon({ className: '', html: '<div class="me-dot"></div>', iconSize: [18, 18], iconAnchor: [9, 9] }), zIndexOffset: 1000, interactive: false }).addTo(map));
    });
  }

  function toggleLocate() {
    if (!('geolocation' in navigator)) { toast('Este navegador no permite ver la ubicación.'); return; }
    if (state.watchId !== null) {
      navigator.geolocation.clearWatch(state.watchId);
      state.watchId = null;
      state.me = null;
      drawMe();
      setLocateButtons(false);
      if (state.tab === 'dias') rerenderKeepingScroll();
      return;
    }
    var first = true;
    setLocateButtons(true);
    toast('Buscando tu ubicación…');
    state.watchId = navigator.geolocation.watchPosition(function (pos) {
      state.me = { lat: pos.coords.latitude, lng: pos.coords.longitude, acc: pos.coords.accuracy };
      drawMe();
      if (first) {
        first = false;
        var map = state.tab === 'mapa' ? tripMap : dayMap;
        if (map) map.flyTo([state.me.lat, state.me.lng], 15, { duration: .7 });
        if (state.tab === 'dias') rerenderKeepingScroll();
      }
    }, function (err) {
      toast(err.code === 1 ? 'Permiso de ubicación denegado. Actívalo en los ajustes del navegador.' : 'No se pudo obtener la ubicación.');
      if (state.watchId !== null) navigator.geolocation.clearWatch(state.watchId);
      state.watchId = null;
      setLocateButtons(false);
    }, { enableHighAccuracy: true, maximumAge: 15000, timeout: 20000 });
  }
  function setLocateButtons(on) {
    ['#btn-locate', '#btn-locate-2'].forEach(function (s) { $(s).classList.toggle('is-on', on); $(s).setAttribute('aria-pressed', on); });
  }

  // ── Hoja «Añadir parada» ───────────────────────────────────────────────
  var addDay = 1;
  function openAdd(n, tab, values) {
    addDay = n;
    state.addTab = tab || state.addTab || 'ideas';
    $('#add-title').textContent = 'Añadir al día ' + n;
    renderAddTabs();
    renderAddList();
    var f = $('#add-mine');
    f.reset();
    if (values) {
      ['name', 'place', 'time', 'kind', 'note'].forEach(function (k) { if (values[k] != null && f.elements[k]) f.elements[k].value = values[k]; });
    }
    var dlg = $('#add-sheet');
    if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute('open', '');
  }
  function closeAdd() {
    var dlg = $('#add-sheet');
    if (dlg.open && typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
  }
  function renderAddTabs() {
    document.querySelectorAll('[data-addtab]').forEach(function (b) {
      var on = b.getAttribute('data-addtab') === state.addTab;
      b.setAttribute('aria-selected', on);
    });
    $('#add-ideas').hidden = state.addTab !== 'ideas';
    $('#add-mine').hidden = state.addTab !== 'mine';
  }
  function renderAddList() {
    var day = dayByN(addDay);
    var c = dayCenter(day);
    var idx = planIndex();
    var q = state.addQuery.trim().toLowerCase();
    $('#add-cats').innerHTML = ['all'].concat(Object.keys(CATS)).map(function (k) {
      return '<button class="chip chip--idea" type="button" data-addcat="' + k + '" aria-pressed="' + (state.addCat === k) + '">' +
        (k === 'all' ? 'Todo' : (CAT_ICON[k] || '') + esc(CATS[k].name)) + '</button>';
    }).join('');

    // Paradas del plan original que se han quitado
    var removed = Object.keys(BASE).filter(function (id) { return !idx[id] && BASE[id].kind !== 'home'; });
    var html = '';
    if (removed.length && state.addCat === 'all' && !q) {
      html += '<li class="idea-group">Quitadas del plan</li>' + removed.map(function (id) {
        var s = BASE[id], from = BASE_DAY[id].n;
        return '<li class="idea"><span class="idea__icon">' + ICON.trash + '</span><div class="idea__body"><p class="idea__name">' + esc(s.name) + '</p>' +
          '<p class="idea__meta">Era del día ' + from + '</p></div>' +
          '<button class="btn btn--sm" type="button" data-restore="' + esc(id) + '">Recuperar</button></li>';
      }).join('');
    }

    var items = PLACES.filter(function (p) {
      if (state.addCat !== 'all' && p.cat !== state.addCat) return false;
      if (!q) return true;
      return (p.name + ' ' + (p.ja || '') + ' ' + p.area + ' ' + p.note).toLowerCase().indexOf(q) >= 0;
    }).map(function (p) {
      return { p: p, d: p.ll ? haversine(c, p.ll) : Infinity, fits: p.fit && p.fit.indexOf(addDay) >= 0 };
    }).sort(function (a, b) { return (b.fits - a.fits) || (a.d - b.d); });

    html += '<li class="idea-group">Ideas, de más cerca a más lejos</li>';
    html += items.map(function (x) {
      var p = x.p, here = (idx['c:' + p.id] || []).indexOf(addDay) >= 0, other = idx['c:' + p.id];
      return '<li class="idea"><span class="idea__icon">' + (CAT_ICON[p.cat] || ICON.pin) + '</span><div class="idea__body">' +
        '<p class="idea__name">' + esc(p.name) + '</p>' +
        '<p class="idea__meta">' + esc(CATS[p.cat].name) + ' · ' + esc(p.area) + (isFinite(x.d) ? ' · a ' + fmtDist(x.d) : '') +
        (x.fits ? ' · <b>encaja este día</b>' : '') + (p.car ? ' · en coche' : '') +
        (other && !here ? ' · ya en el día ' + other.join(', ') : '') + '</p>' +
        '<p class="idea__note">' + esc(p.note) + '</p></div>' +
        (here ? '<span class="idea__in">En el día</span>' : '<button class="btn btn--sm btn--primary" type="button" data-addplace="' + esc(p.id) + '" data-day="' + addDay + '">Añadir</button>') +
        '</li>';
    }).join('');
    if (!items.length) html += '<li class="idea-empty">Nada con ese filtro. Prueba otra categoría o añade tu propio sitio.</li>';
    $('#add-list').innerHTML = html;
    $('#add-nearby').innerHTML = nearbyChips(day);
  }

  function addCustomFromForm(f) {
    var name = f.elements.name.value.trim();
    if (!name) { f.elements.name.focus(); toast('Ponle un nombre al sitio.'); return; }
    var place = f.elements.place.value.trim();
    var ll = parseLL(place);
    var isUrl = /^https?:\/\//i.test(place);
    var id = 'u' + Date.now().toString(36);
    plan.custom[id] = {
      id: id, custom: true, kind: f.elements.kind.value || 'sight', name: name,
      q: ll ? ll.join(',') : (isUrl ? name : (place || name)),
      ll: ll, url: isUrl ? place : '', note: f.elements.note.value.trim(),
      t: f.elements.time.value || ''
    };
    savePlan();
    addToDay(id, addDay);
    closeAdd();
    toast('«' + name + '» añadido al día ' + addDay + (ll ? '.' : '. Sin coordenadas no sale en el mapa; la ruta usa el nombre.'));
  }

  // ── Reservas ───────────────────────────────────────────────────────────
  function bkStatus(b) {
    if (state.booked.has(b.id)) return { cls: 'done', label: 'Hecho', rank: 3 };
    var diff = daysBetween(today, b.due);
    if (b.opens) {
      if (diff > 1) return { cls: 'opens', label: 'Abre el ' + fmtShort(b.due), rank: 1 };
      if (diff === 1) return { cls: 'urgent', label: 'Abre mañana', rank: 0 };
      if (diff === 0) return { cls: 'urgent', label: 'Abre hoy', rank: 0 };
      return { cls: 'late', label: 'Ya abierta', rank: 0 };
    }
    if (diff < 0) return { cls: 'late', label: 'Hacer ya', rank: 0 };
    if (diff <= (b.crit ? 10 : 7)) return { cls: 'urgent', label: diff === 0 ? 'Hoy' : (diff === 1 ? 'Mañana' : 'En ' + diff + ' días'), rank: 0 };
    return { cls: 'later', label: 'Antes del ' + fmtShort(b.due), rank: 2 };
  }

  function renderBookings() {
    var list = T.bookings.map(function (b) { return { b: b, st: bkStatus(b) }; });
    list.sort(function (x, y) {
      if (x.st.rank !== y.st.rank) return x.st.rank - y.st.rank;
      if (!!x.b.crit !== !!y.b.crit) return x.b.crit ? -1 : 1;
      return parseISO(x.b.due) - parseISO(y.b.due);
    });
    var pending = list.filter(function (x) { return x.st.cls === 'urgent' || x.st.cls === 'late'; }).length;
    $('#bk-lead').textContent = pending
      ? pending + (pending === 1 ? ' tarea necesita' : ' tareas necesitan') + ' atención ya. Las marcas se guardan en este dispositivo.'
      : 'Nada urgente ahora mismo. Las marcas se guardan en este dispositivo.';
    var badge = $('#bk-badge');
    badge.hidden = !pending;
    badge.textContent = pending;
    $('#bookings').innerHTML = list.map(function (x) {
      var b = x.b, st = x.st;
      return '<li class="bk' + (st.cls === 'done' ? ' is-done' : '') + '">' +
        '<input class="bk__check" type="checkbox" id="bk-' + b.id + '" data-bk="' + b.id + '"' + (st.cls === 'done' ? ' checked' : '') + ' />' +
        '<div><div class="bk__top"><label class="bk__title" for="bk-' + b.id + '">' + esc(b.title) + '</label>' +
        '<span class="pill pill--' + st.cls + '">' + esc(st.label) + '</span></div>' +
        '<p class="bk__who">' + esc(b.who) + '</p>' +
        '<p class="bk__body">' + esc(b.body) + '</p></div></li>';
    }).join('');
  }

  // ── Info ───────────────────────────────────────────────────────────────
  function planStats() {
    var edited = DAYS.filter(function (d) { return isEdited(d.n); }).length;
    var added = 0, idx = planIndex();
    Object.keys(idx).forEach(function (id) { if (!BASE[id]) added += idx[id].length; });
    return { edited: edited, added: added };
  }

  function renderInfo() {
    var h = '<h1 class="page__title" id="info-title">Info del viaje</h1>' +
      '<p class="page__lead">Tu plan, qué se ha corregido del PDF, direcciones de los alojamientos y lo práctico para moverse.</p>';

    var st = planStats();
    h += '<h2>Tu plan</h2><p class="page__lead">' +
      (st.edited ? 'Has cambiado ' + st.edited + (st.edited === 1 ? ' día' : ' días') + (st.added ? ' y añadido ' + st.added + (st.added === 1 ? ' sitio' : ' sitios') : '') + '. ' : 'Aún no has cambiado nada. ') +
      'Se guarda en este dispositivo. Para pasárselo a otra persona o a otro móvil, compártelo por enlace; también puedes copiarlo como texto.</p>' +
      '<div class="lodge__row"><button class="btn btn--primary" type="button" data-open-share>Compartir por enlace</button>' +
      '<button class="btn" type="button" id="plan-copy">Copiar mi plan</button>' +
      '<button class="btn" type="button" id="plan-import-open">Pegar un plan</button>' +
      '<button class="btn btn--ghost" type="button" id="plan-reset">Volver al plan original</button></div>' +
      '<div class="plan-io" id="plan-io" hidden><label for="plan-text">Plan en texto</label><textarea id="plan-text" rows="5" spellcheck="false"></textarea>' +
      '<div class="lodge__row"><button class="btn btn--primary" type="button" id="plan-import">Cargar este plan</button><button class="btn btn--ghost" type="button" id="plan-io-close">Cerrar</button></div></div>';

    h += '<h2>Qué ha cambiado</h2><ul class="changes">' + T.summary.map(function (c) {
      return '<li><a href="#dia-' + c.d + '">DÍA ' + c.d + '</a><p>' + esc(c.t) + '</p></li>';
    }).join('') + '</ul>';

    h += '<h2>Alojamientos</h2><p class="page__lead">Pega la dirección exacta, un enlace de Google Maps con coordenadas o las coordenadas (por ejemplo <span lang="en">34.6658, 135.5058</span>). Con coordenadas, el pin se coloca exacto.</p><div class="lodging">';
    Object.keys(T.lodging).forEach(function (k) {
      var l = lodging(k);
      h += '<form class="lodge" data-lodge="' + k + '">' +
        '<p class="lodge__label">' + esc(l.label) + '</p>' +
        '<p class="lodge__name">' + esc(l.name) + '</p>' +
        (l.note ? '<p class="lodge__note">' + esc(l.note) + '</p>' : '') +
        '<label for="lodge-' + k + '">Dirección o coordenadas</label>' +
        '<input id="lodge-' + k + '" name="addr" autocomplete="street-address" value="' + esc(state.edits[k] && state.edits[k].addr || '') + '" placeholder="' + esc(T.lodging[k].addr) + '" />' +
        '<div class="lodge__row"><button class="btn btn--primary" type="submit">Guardar</button>' +
        (l.edited ? '<button class="btn btn--ghost" type="button" data-lodge-reset="' + k + '">Quitar</button>' : '') +
        '<a class="btn btn--ghost" target="_blank" rel="noopener" href="' + esc(gSearch(l.q)) + '">' + ICON.pin + 'Ver en Maps</a></div>' +
        '</form>';
    });
    h += '</div>';

    h += '<h2>Lo práctico</h2>';
    T.info.forEach(function (sec, i) {
      h += '<details class="acc"' + (i === 0 ? ' open' : '') + '><summary>' + esc(sec.title) + '</summary><ul>' +
        sec.items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></details>';
    });

    h += '<h2>Frases útiles</h2><p class="page__lead">Toca una frase para enseñarla en grande.</p><ul class="phrases">' +
      T.phrases.map(function (f, i) {
        return '<li><button class="phrase" type="button" data-phrase="' + i + '"><span class="phrase__ja" lang="ja">' + esc(f.ja) + '</span>' +
          '<span class="phrase__ro">' + esc(f.ro) + '</span><span class="phrase__es">' + esc(f.es) + '</span></button></li>';
      }).join('') + '</ul>';
    h += '<h2>En las etiquetas</h2><ul class="phrases">' + T.glossary.map(function (f) {
      return '<li class="phrase"><span class="phrase__ja" lang="ja">' + esc(f.ja) + '</span><span class="phrase__ro">' + esc(f.ro) + '</span><span class="phrase__es">' + esc(f.es) + '</span></li>';
    }).join('') + '</ul>';

    h += '<h2>Emergencias</h2><ul class="sos">' + T.emergency.map(function (e) {
      return '<li><span>' + esc(e.label) + '</span><a href="tel:' + e.num.replace(/[^\d+]/g, '') + '">' + esc(e.num) + '</a></li>';
    }).join('') + '</ul>';

    var theme = store.get('theme', 'auto');
    h += '<h2>Ajustes</h2><div class="lodge__row" role="group" aria-label="Tema">' +
      ['auto', 'light', 'dark'].map(function (t) {
        return '<button class="btn' + (theme === t ? ' btn--primary' : '') + '" type="button" data-theme-set="' + t + '" aria-pressed="' + (theme === t) + '">' +
          { auto: 'Tema automático', light: 'Claro', dark: 'Oscuro' }[t] + '</button>';
      }).join('') +
      '<button class="btn btn--ghost" type="button" id="reset-progress">Borrar marcas de «hecho»</button></div>';

    h += '<p class="fineprint">Datos revisados el 15 de octubre de 2026. Horarios y precios pueden cambiar: confirmar lo importante antes de ir. ' +
      'Mapa © colaboradores de OpenStreetMap; costa de respaldo de Natural Earth. Los mapas ya vistos quedan guardados para usarlos sin conexión.</p>';
    $('#info').innerHTML = h;
  }

  function exportPlan() {
    return JSON.stringify({ app: 'ruta-japon-2026', v: 1, plan: plan, lodging: state.edits, done: Array.from(state.done), booked: Array.from(state.booked) });
  }
  // Sustituye el plan (y, si vienen, direcciones y marcas) y devuelve una copia para deshacer.
  function applyPlanData(data) {
    var backup = { plan: plan, edits: state.edits };
    plan = normalizePlan(data.plan);
    savePlan();
    if (data.lodging && typeof data.lodging === 'object') { state.edits = data.lodging; store.set('lodging', state.edits); }
    if (Array.isArray(data.done)) { state.done = new Set(data.done); store.set('done', data.done); }
    if (Array.isArray(data.booked)) { state.booked = new Set(data.booked); store.set('booked', data.booked); }
    afterPlanSwap();
    return backup;
  }
  function restorePlan(b) {
    plan = b.plan;
    savePlan();
    state.edits = b.edits;
    store.set('lodging', state.edits);
    afterPlanSwap();
  }
  function afterPlanSwap() {
    refreshTripMap();
    renderStrip();
    renderBookings();
    if (state.tab === 'info') renderInfo();
    if (state.tab === 'dias') renderDay();
  }
  function importPlan(text) {
    var data;
    try { data = JSON.parse(text); } catch (e) { toast('Ese texto no es un plan válido.'); return; }
    if (!data || data.app !== 'ruta-japon-2026' || !data.plan) { toast('Ese texto no es un plan de esta app.'); return; }
    var b = applyPlanData(data);
    toast('Plan cargado.', { label: 'Deshacer', fn: function () { restorePlan(b); } });
  }

  // ── Compartir ──────────────────────────────────────────────────────────
  // La app pública vive en Vercel; el plan viaja comprimido dentro del enlace (#plan=…).
  var APP_URL = 'https://mi-landing-five.vercel.app/japon/';
  var shareLinks = { app: APP_URL, plan: '' };
  var incoming = null;

  function b64urlFromBytes(bytes) {
    var bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function bytesFromB64url(t) {
    t = t.replace(/-/g, '+').replace(/_/g, '/');
    while (t.length % 4) t += '=';
    var bin = atob(t), out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  function pipeBytes(bytes, transform) {
    return new Response(new Blob([bytes]).stream().pipeThrough(transform)).arrayBuffer().then(function (b) { return new Uint8Array(b); });
  }
  function packPlan(obj) {
    var bytes = new TextEncoder().encode(JSON.stringify(obj));
    if (typeof CompressionStream !== 'function') return Promise.resolve('j' + b64urlFromBytes(bytes));
    return pipeBytes(bytes, new CompressionStream('deflate-raw')).then(
      function (z) { return 'z' + b64urlFromBytes(z); },
      function () { return 'j' + b64urlFromBytes(bytes); });
  }
  function unpackPlan(code) {
    return new Promise(function (resolve) { resolve(bytesFromB64url(code.slice(1))); }).then(function (bytes) {
      if (code.charAt(0) !== 'z') return bytes;
      if (typeof DecompressionStream !== 'function') throw new Error('Este navegador no puede leer el enlace.');
      return pipeBytes(bytes, new DecompressionStream('deflate-raw'));
    }).then(function (b) { return JSON.parse(new TextDecoder().decode(b)); });
  }

  function planSummary(p, lodg) {
    var order = p.order || {}, days = Object.keys(order).length, added = 0;
    Object.keys(order).forEach(function (n) { (order[n] || []).forEach(function (id) { if (!BASE[id]) added++; }); });
    var bits = [days ? days + (days === 1 ? ' día cambiado' : ' días cambiados') : 'ajustes del plan'];
    if (added) bits.push(added + (added === 1 ? ' sitio añadido' : ' sitios añadidos'));
    var l = Object.keys(lodg || {}).length;
    if (l) bits.push(l + (l === 1 ? ' dirección de alojamiento' : ' direcciones de alojamiento'));
    return bits.join(', ');
  }
  function hasPlanChanges() {
    return Object.keys(plan.order).length || Object.keys(plan.times).length || Object.keys(plan.notes).length || Object.keys(state.edits).length;
  }

  function showDialog(id) {
    var dlg = document.getElementById(id);
    if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute('open', '');
  }
  function closeDialog(id) {
    var dlg = document.getElementById(id);
    if (dlg.open && typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
  }

  function openShare() {
    $('#share-url-app').value = APP_URL;
    var withPlan = !!hasPlanChanges();
    $('#share-opt-plan').hidden = !withPlan;
    shareLinks.plan = '';
    if (withPlan) {
      $('#share-plan-desc').textContent = 'Incluye ' + planSummary(plan, state.edits) + '. No incluye tus marcas de «hecho» ni el estado de las reservas.';
      $('#share-url-plan').value = 'Preparando el enlace…';
      packPlan({ app: 'ruta-japon-2026', v: 1, plan: plan, lodging: state.edits }).then(function (code) {
        shareLinks.plan = APP_URL + '#plan=' + code;
        $('#share-url-plan').value = shareLinks.plan;
      });
    }
    showDialog('share-sheet');
  }
  function copyLink(kind) {
    var url = shareLinks[kind];
    var input = $(kind === 'plan' ? '#share-url-plan' : '#share-url-app');
    var fallback = function () { input.focus(); input.select(); toast('Selecciona el enlace y cópialo.'); };
    if (!url) return;
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(function () { toast('Enlace copiado.'); }, fallback);
    else fallback();
  }
  function shareLink(kind) {
    var url = shareLinks[kind];
    if (!url) return;
    if (!navigator.share) { copyLink(kind); return; }
    navigator.share({
      title: 'Ruta Japón 2026',
      text: kind === 'plan' ? 'Nuestro plan para Japón (15–29 nov):' : 'Itinerario del viaje a Japón (15–29 nov):',
      url: url
    }).then(function () { /* compartido */ }, function (e) { if (!e || e.name !== 'AbortError') copyLink(kind); });
  }

  // Al abrir un enlace con plan, se ofrece cargarlo (sin tocar el plan propio hasta confirmar).
  function checkIncoming() {
    var m = /^#plan=([A-Za-z0-9_-]+)$/.exec(location.hash);
    if (!m) return false;
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { location.hash = ''; }
    unpackPlan(m[1]).then(function (data) {
      if (!data || data.app !== 'ruta-japon-2026' || !data.plan) throw new Error('no es un plan');
      incoming = data;
      $('#incoming-desc').textContent = 'Trae ' + planSummary(normalizePlan(data.plan), data.lodging) +
        '. Si lo cargas, sustituye el plan guardado en este dispositivo; podrás deshacerlo justo después.';
      showDialog('incoming-sheet');
    }).catch(function () { toast('El enlace del plan está incompleto o dañado. Pide que te lo vuelvan a enviar.'); });
    return true;
  }

  // ── Hoja en japonés ────────────────────────────────────────────────────
  function openSheet(o) {
    $('#jp-sheet .sheet__eyebrow').textContent = o.eyebrow;
    $('#jp-sheet-name').textContent = o.ja;
    $('#jp-sheet-addr').textContent = o.addr || '';
    $('#jp-sheet-addr').hidden = !o.addr;
    $('#jp-sheet .sheet__phrase').hidden = !o.phrase;
    $('#jp-sheet-es').textContent = o.es || '';
    var dlg = $('#jp-sheet');
    if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute('open', '');
  }


  // ── Asistente: divisas e IA ────────────────────────────────────────────
  // La IA usa la capacidad «sample» de Claude cuando la app se abre dentro de Claude
  // (cuenta del propio usuario, sin claves). Fuera de Claude se ofrece el enlace.
  var AI_URL = 'https://claude.ai/artifact/MgKyiPLLVFXSeuEqHWw1PH';
  var JP_RE = /[぀-ヿ㐀-鿿ｦ-ﾟ][　-〿぀-ヿ㐀-鿿！-ﾟ0-9 ]*/;
  var fx = { rate: parseFloat(store.get('fx-rate', 180)) || 180 };
  var nf0 = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 });
  var nf2 = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var ai = { status: 'loading', sample: null, limits: null, busy: false, ctl: null, img: null, imgUrl: '', chat: store.get('chat', []) };
  if (!Array.isArray(ai.chat)) ai.chat = [];

  function parseNum(v) {
    v = String(v == null ? '' : v).replace(/[\s¥€]/g, '');
    if (!v) return null;
    if (/,\d{1,2}$/.test(v)) v = v.replace(/\./g, '').replace(',', '.');
    else v = v.replace(/[.,](?=\d{3}(\D|$))/g, '');
    var n = parseFloat(v);
    return isFinite(n) ? n : null;
  }
  function fxFromYen(yen) {
    var tax = $('#fx-tax');
    if (yen == null) { $('#fx-eur').value = ''; tax.textContent = 'Si la etiqueta pone 税抜 (sin IVA), aquí verás el precio final con el 10 %.'; return; }
    $('#fx-eur').value = nf2.format(yen / fx.rate);
    var withTax = Math.round(yen * 1.1);
    tax.innerHTML = 'Si pone <span lang="ja">税抜</span> (sin IVA): <b>' + nf0.format(withTax) + ' ¥ ≈ ' + nf2.format(withTax / fx.rate) + ' €</b> con el 10 %.';
  }
  function fxFromEur(eur) {
    if (eur == null) { $('#fx-yen').value = ''; fxFromYen(null); return; }
    var yen = Math.round(eur * fx.rate);
    $('#fx-yen').value = nf0.format(yen);
    var withTax = Math.round(yen * 1.1);
    $('#fx-tax').innerHTML = 'Con el 10 % de IVA serían <b>' + nf0.format(withTax) + ' ¥</b>.';
  }
  function renderFx() {
    $('#fx-rate').value = String(fx.rate).replace('.', ',');
    $('#fx-chips').innerHTML = [1000, 3000, 5000, 10000, 50000].map(function (y) {
      return '<button class="chip chip--link" type="button" data-fx="' + y + '">' + nf0.format(y) + ' ¥ <span>≈ ' + nf2.format(y / fx.rate) + ' €</span></button>';
    }).join('');
  }

  function initAI() {
    if (!window.claude || typeof window.claude.use !== 'function') { ai.status = 'off'; renderAIState(); return; }
    window.claude.use('sample').then(function (smp) {
      if (!smp) { ai.status = 'unavailable'; return null; }
      ai.sample = smp;
      return smp.limits().then(function (l) { ai.limits = l; }, function () { ai.limits = null; }).then(function () { ai.status = 'ok'; });
    }).then(function () { renderAIState(); }, function () { ai.status = 'unavailable'; renderAIState(); });
  }

  function renderAIState() {
    var on = ai.status === 'ok';
    $('#ai-loading').hidden = ai.status !== 'loading';
    $('#ai-on').hidden = !on;
    $('#ai-off').hidden = on || ai.status === 'loading';
    if (ai.status === 'off') {
      $('#ai-off').innerHTML = '<p>La IA funciona cuando abres esta app dentro de Claude: usa tu propia cuenta, sin claves ni pagos aparte. Aquí tienes el mapa de calles y el GPS; allí, el asistente.</p>' +
        '<a class="btn btn--primary" target="_blank" rel="noopener" href="' + AI_URL + '">Abrir el asistente en Claude</a>' +
        '<p class="ai__hint">Para que la IA vea tus cambios del plan: Info → Copiar mi plan aquí, y Pegar un plan allí.</p>';
    } else if (ai.status === 'denied') {
      $('#ai-off').innerHTML = '<p>Esta página no tiene permiso para usar Claude. Puedes activarlo en los permisos de la página.</p>' +
        '<button class="btn btn--primary" type="button" id="ai-perms">Revisar permisos</button>';
    } else if (ai.status === 'unavailable') {
      $('#ai-off').innerHTML = '<p>La IA no está disponible en esta vista o en esta cuenta. El conversor de arriba sigue funcionando.</p>';
    }
    var canImg = !!(ai.limits && ai.limits.images);
    $('#ai-photo-btn').hidden = !canImg;
    if (canImg && ai.limits.images.mediaTypes) $('#ai-photo').accept = ai.limits.images.mediaTypes.join(',');
    if (on) { renderAIChips(); renderChat(); }
  }

  function renderAIChips() {
    var n = state.day + 1;
    var chips = [
      { n: 'Traducir una foto', t: '¿Qué pone en esta foto? Tradúcelo y dime lo importante.', photo: true },
      { n: '¿Cómo se dice…?', t: '¿Cómo se dice en japonés: «' },
      { n: '¿Es buen precio?', t: '¿Es buen precio? Te paso la foto de la etiqueta.', photo: true },
      { n: 'Ayúdame a pedir', t: 'Estoy en un restaurante y no entiendo la carta. Ayúdame a pedir.', photo: true },
      { n: '¿Qué hago hoy?', t: 'Según mi plan, ¿qué me recomiendas hacer hoy y en qué orden? Anochece pronto.' },
      { n: 'Ideas para el día ' + n, t: '¿Qué 3 ideas del catálogo me recomiendas añadir al día ' + n + ' y por qué?' }
    ];
    if (!(ai.limits && ai.limits.images)) chips = chips.filter(function (c) { return !c.photo; });
    $('#ai-chips').innerHTML = chips.map(function (c, i) {
      return '<button class="chip chip--link" type="button" data-aichip="' + i + '" data-text="' + esc(c.t) + '"' + (c.photo ? ' data-photo="1"' : '') + '>' + esc(c.n) + '</button>';
    }).join('');
  }

  function inlineMd(t) { return t.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>'); }
  function bigBtn(t) {
    var m = JP_RE.exec(t);
    var seg = m ? m[0].trim() : '';
    return seg.length >= 2 ? ' <button class="big" type="button" data-big="' + seg + '" aria-label="Ampliar ' + seg + '">Ampliar</button>' : '';
  }
  function md(text) {
    var out = [], list = null;
    esc(text).split('\n').forEach(function (line) {
      var t = line.trim(), m;
      if (!t) { if (list) { out.push('</' + list + '>'); list = null; } return; }
      m = /^(?:[-*•]|\d+[.)])\s+(.*)$/.exec(t);
      if (m) {
        var tag = /^\d/.test(t) ? 'ol' : 'ul';
        if (list !== tag) { if (list) out.push('</' + list + '>'); out.push('<' + tag + '>'); list = tag; }
        out.push('<li>' + inlineMd(m[1]) + bigBtn(m[1]) + '</li>');
        return;
      }
      if (list) { out.push('</' + list + '>'); list = null; }
      m = /^#{1,4}\s+(.*)$/.exec(t);
      if (m) { out.push('<p class="msg__h">' + inlineMd(m[1]) + '</p>'); return; }
      out.push('<p>' + inlineMd(t) + bigBtn(t) + '</p>');
    });
    if (list) out.push('</' + list + '>');
    return out.join('');
  }

  function bubble(m) {
    if (m.role === 'user') {
      return '<li class="msg msg--me">' + (m.img ? '<span class="msg__img">Foto adjunta</span>' : '') + '<p>' + esc(m.content) + '</p></li>';
    }
    return '<li class="msg msg--ai' + (m.content ? '' : ' msg--err') + '">' + (m.content ? md(m.content) : '') +
      (m.note ? '<p class="msg__note">' + esc(m.note) + '</p>' : '') + '</li>';
  }
  function renderChat() {
    var el = $('#chat');
    if (!ai.chat.length) {
      el.innerHTML = '<li class="chat__empty"><p>Ejemplos de lo que puedes preguntar:</p><ul>' +
        '<li>Foto de un cartel en una estación: «¿qué pone y por dónde voy?»</li>' +
        '<li>Foto de una cámara usada con su etiqueta: «¿es buen precio? ¿qué miro?»</li>' +
        '<li>«¿Cómo pido que me guarden la maleta?»</li>' +
        '<li>«Añade el Museo Ghibli al día 8» (lo mete en tu plan).</li></ul></li>';
      return;
    }
    el.innerHTML = ai.chat.map(bubble).join('');
  }
  function saveChat() { store.set('chat', ai.chat.slice(-40)); }
  function scrollChat() {
    var c = $('#composer');
    if (c && c.getBoundingClientRect().bottom > window.innerHeight - 80) c.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
  function setAIBusy(on) {
    ai.busy = on;
    $('#ai-send').disabled = on;
    $('#ai-stop').hidden = !on;
    $('#ai-clear').hidden = on;
  }
  function setAIImage(file) {
    if (ai.imgUrl) { try { URL.revokeObjectURL(ai.imgUrl); } catch (e) { /* nada */ } }
    ai.img = file || null;
    ai.imgUrl = file ? URL.createObjectURL(file) : '';
    $('#composer-img').hidden = !file;
    $('#composer-img-prev').src = ai.imgUrl || '';
    if (!file) $('#ai-photo').value = '';
  }

  function aiRules() {
    var i = tripIndex(), toStart = daysBetween(today, T.start);
    var when = i >= 0 ? 'El viaje está en curso: hoy es el día ' + (i + 1) + '.' : (toStart > 0 ? 'Faltan ' + toStart + ' días para el viaje.' : 'El viaje ya terminó.');
    var planTxt = DAYS.map(function (d) {
      var p = parts(d.date);
      return 'Día ' + d.n + ' (' + WD[p.wd] + ' ' + p.d + ' nov, ' + T.phases[d.phase].name + (d.mode === 'car' ? ', en coche' : '') + '): ' +
        stopsOf(d).map(function (st) {
          var t = timeForDisplay(st.t);
          return (t ? t + ' ' : '') + st.name + (st.opt ? ' (opcional)' : '') + (st.mine ? ' [nota: ' + st.mine + ']' : '');
        }).join('; ');
    }).join('\n');
    var ideas = PLACES.map(function (p) {
      return p.id + ' · ' + p.name + ' · ' + p.area + ' · ' + CATS[p.cat].name + (p.car ? ' · coche' : '') + (p.fit && p.fit.length ? ' · días ' + p.fit.join(',') : '');
    }).join('\n');
    var canAdd = !!(ai.limits && ai.limits.tools);
    var lodg = Object.keys(T.lodging).map(function (k) { var l = lodging(k); return l.label + ': ' + l.name + ' (' + l.addr + ')'; }).join('; ');
    return [
      'Eres el asistente de viaje integrado en la app «Ruta Japón 2026». El usuario es un viajero español que está en Japón del 15 al 29 de noviembre de 2026. Le interesan la fotografía (cámaras nuevas y usadas), la ropa de segunda mano, las figuras, el anime, lo retro y la cultura japonesa. Alquila coche los días 11 a 14.',
      'Responde en español de España, breve y práctico (unas 120 palabras salvo que pida más), con listas cortas si ayudan y sin preámbulos.',
      'Lo que haces:',
      '- Traducir entre japonés y español. Cuando des una frase en japonés para usarla, ponla sola en su línea y debajo la lectura en rōmaji y el significado.',
      '- Leer fotos (carteles, menús, etiquetas, tickets, máquinas, pantallas) y explicar qué pone y qué hay que hacer.',
      '- Convertir precios con este tipo de cambio: 1 € = ' + fx.rate + ' ¥. 税抜 significa sin IVA (hay que sumar el 10 %); 税込, con IVA incluido.',
      '- Valorar precios de segunda mano (cámaras, objetivos, figuras, ropa, videojuegos) con prudencia: estado, qué revisar y si parece razonable.',
      '- Explicar costumbres, normas, comida, transporte y cómo funcionan las tiendas.',
      '- Recomendar según su plan y el catálogo de ideas investigadas que tienes abajo.',
      'Sé honesto: si no lees bien una foto o no sabes un dato actual (horarios, precios, si algo sigue abierto), dilo y sugiere comprobarlo. No inventes horarios, direcciones ni precios.',
      canAdd ? 'Si el usuario te pide añadir algo a su plan, usa la herramienta anadir_parada (con idea_id cuando esté en el catálogo) y confirma qué has añadido. No añadas nada que no te haya pedido.'
        : 'No puedes cambiar el plan. Si te lo pide, dile que use «Añadir parada» en ese día.',
      'Las fotos de mensajes anteriores ya no las ves: si hace falta, pide que la vuelva a enviar.',
      '',
      'Fecha de hoy: ' + today + '. ' + when + ' Ahora está mirando el día ' + (state.day + 1) + ' en la app.',
      'Alojamientos: ' + lodg + '.',
      '',
      'Su plan actual:',
      planTxt,
      '',
      'Catálogo de ideas (id · nombre · zona · categoría · días en que encaja):',
      ideas
    ].join('\n');
  }

  function aiInput() {
    var hist = ai.chat.filter(function (m) { return m.content && m.content.trim(); }).slice(-16).map(function (m) {
      return { role: m.role, content: (m.img ? '[Con una foto adjunta] ' : '') + m.content };
    });
    return [{ role: 'user', content: aiRules() }].concat(hist);
  }

  function aiTools() {
    return [{
      name: 'anadir_parada',
      description: 'Añade una parada al plan del viaje del usuario y devuelve una confirmación en texto. Úsala solo cuando el usuario pida añadir algo. Para una idea del catálogo pasa idea_id; para otro sitio pasa nombre y busqueda (texto que Google Maps encuentre: nombre y ciudad, o el nombre en japonés).',
      inputSchema: {
        type: 'object',
        properties: {
          dia: { type: 'integer', minimum: 1, maximum: 15, description: 'Día del viaje, de 1 a 15.' },
          idea_id: { type: 'string', description: 'id de una idea del catálogo.' },
          nombre: { type: 'string', description: 'Nombre del sitio si no está en el catálogo.' },
          busqueda: { type: 'string', description: 'Texto para encontrarlo en Google Maps.' },
          hora: { type: 'string', description: 'Hora prevista HH:MM (opcional).' },
          nota: { type: 'string', description: 'Nota breve (opcional).' }
        },
        required: ['dia']
      },
      execute: function (input) {
        var n = Math.round(Number(input.dia));
        if (!(n >= 1 && n <= DAYS.length)) throw new Error('El día tiene que estar entre 1 y ' + DAYS.length + '.');
        var id, name, note = String(input.nota || '').trim();
        if (input.idea_id) {
          var p = PLACE[String(input.idea_id)];
          if (!p) throw new Error('No hay ninguna idea con ese id en el catálogo.');
          id = 'c:' + p.id;
          name = p.name;
          if (note) plan.notes[id] = note;
        } else {
          name = String(input.nombre || '').trim();
          if (!name) throw new Error('Falta el nombre del sitio.');
          var q = String(input.busqueda || name).trim();
          var ll = parseLL(q);
          id = 'u' + Date.now().toString(36);
          plan.custom[id] = { id: id, custom: true, kind: 'sight', name: name, q: ll ? ll.join(',') : q, ll: ll, url: '', note: note, t: '' };
        }
        var arr = ensureOrder(n);
        if (arr.indexOf(id) >= 0) return '«' + name + '» ya estaba en el día ' + n + '.';
        arr.push(id);
        var hora = String(input.hora || '');
        if (timeToMin(hora) != null) plan.times[id] = timeForInput(hora);
        savePlan();
        renderStrip();
        refreshTripMap();
        toast('IA: «' + name + '» añadido al día ' + n + '.', { label: 'Deshacer', fn: function () {
          var a = ensureOrder(n), k = a.indexOf(id);
          if (k >= 0) a.splice(k, 1);
          savePlan(); renderStrip(); refreshTripMap();
        } });
        return 'Añadido «' + name + '» al día ' + n + (plan.times[id] ? ' a las ' + timeForDisplay(plan.times[id]) : '') + '.';
      }
    }];
  }

  var AI_ERR = {
    not_granted: 'Esta página no tiene permiso para usar Claude.',
    sampling_disabled: 'La IA no está disponible para esta cuenta.',
    not_declared: 'La IA no está disponible en esta versión de la página.',
    capability_disabled: 'La IA no está disponible en esta vista.',
    capability_removed: 'La IA no está disponible en esta vista.',
    images_unavailable: 'Aquí no se pueden enviar fotos. Escribe la pregunta.',
    image_rejected: 'No he podido usar esa foto (formato o tamaño). Prueba con otra.',
    rate_limited: 'Demasiadas preguntas seguidas o has llegado al límite de uso. Espera un poco y vuelve a intentarlo.',
    session_expired: 'Tu sesión de Claude ha caducado: vuelve a iniciar sesión.',
    refused: 'Claude no responde a eso. Prueba a preguntarlo de otra forma.',
    empty_completion: 'No ha llegado respuesta. Prueba a preguntarlo de otra forma.',
    prompt_too_large: 'La conversación es demasiado larga: bórrala y vuelve a empezar.'
  };

  function aiSend() {
    if (ai.busy || ai.status !== 'ok') return;
    var box = $('#ai-input');
    var text = box.value.trim();
    var file = ai.img;
    if (!text && !file) { box.focus(); return; }
    if (!text) text = 'Mira la foto: dime qué pone, tradúcelo y explícame lo importante.';
    ai.chat.push({ role: 'user', content: text, img: !!file });
    var turn = { role: 'assistant', content: '' };
    ai.chat.push(turn);
    box.value = '';
    setAIImage(null);
    renderChat();
    var live = $('#chat').lastElementChild;
    live.innerHTML = '<p class="msg__thinking">Pensando</p>';
    setAIBusy(true);
    scrollChat();
    var ctl = ai.ctl = new AbortController();
    var opts = {
      signal: ctl.signal,
      cache: false,
      modelTier: file ? 'default' : 'quick',
      onText: function (u) { turn.content = u.text; live.innerHTML = md(u.text); scrollChat(); }
    };
    if (file) opts.images = [file];
    if (ai.limits && ai.limits.tools) opts.tools = aiTools();
    ai.sample(aiInput(), opts).then(function (r) {
      turn.content = r.text;
      if (r.truncated) turn.note = 'Respuesta cortada: pide algo más concreto.';
    }, function (e) {
      var code = (e && e.code) || 'upstream_error';
      turn.content = code === 'refused' ? '' : ((e && e.text) || '');
      if (code === 'cancelled') turn.note = 'Parado.';
      else turn.note = AI_ERR[code] || 'Se ha cortado la conexión. Vuelve a intentarlo.';
      if (/^(not_granted|sampling_disabled|not_declared|capability_disabled|capability_removed)$/.test(code)) {
        ai.status = code === 'not_granted' ? 'denied' : 'unavailable';
      }
      if (code === 'images_unavailable' && ai.limits) { ai.limits = Object.assign({}, ai.limits, { images: undefined }); }
    }).then(function () {
      setAIBusy(false);
      saveChat();
      renderAIState();
      scrollChat();
    });
  }

  // ── Navegación ─────────────────────────────────────────────────────────
  function defaultDay() {
    var i = tripIndex();
    if (i >= 0) return i;
    var saved = store.get('day', 0);
    return (saved >= 0 && saved < DAYS.length) ? saved : 0;
  }

  function route() {
    if (checkIncoming()) return;
    var h = location.hash.replace(/^#/, '');
    var m = /^dia-(\d{1,2})$/.exec(h);
    var prevTab = state.tab, prevDay = state.day;
    if (m) {
      state.tab = 'dias';
      state.day = Math.min(DAYS.length - 1, Math.max(0, +m[1] - 1));
    } else if (h === 'mapa' || h === 'reservas' || h === 'info' || h === 'ia') {
      state.tab = h;
    } else {
      state.tab = 'dias';
      state.day = defaultDay();
    }
    if (prevDay !== state.day) state.editing = false;
    store.set('day', state.day);
    show(prevTab !== state.tab || prevDay !== state.day);
  }

  var firstShow = true;
  function show(changed) {
    ['dias', 'mapa', 'ia', 'reservas', 'info'].forEach(function (t) { $('#view-' + t).hidden = state.tab !== t; });
    document.querySelectorAll('.tab').forEach(function (a) {
      var t = a.getAttribute('data-tab');
      if (t === 'dias') a.setAttribute('href', '#dia-' + (state.day + 1));
      if (t === state.tab) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    renderStrip();
    if (state.tab === 'dias') {
      if (changed || firstShow) {
        renderDay();
        if (!firstShow) window.scrollTo({ top: 0 });
      }
      if (dayMap) setTimeout(function () { dayMap.invalidateSize(); }, 0);
    } else if (state.tab === 'mapa') {
      ensureTripMap();
      if (tripMap) setTimeout(function () { tripMap.invalidateSize(); }, 0);
    } else if (state.tab === 'ia') {
      renderFx();
      renderAIState();
    } else if (state.tab === 'reservas') {
      renderBookings();
    } else if (state.tab === 'info') {
      renderInfo();
    }
    scrollStripToCurrent(!firstShow);
    firstShow = false;
  }

  // ── Eventos ────────────────────────────────────────────────────────────
  document.addEventListener('click', function (e) {
    var t = e.target;
    var b;
    if ((b = t.closest('[data-focus]'))) { focusStop(b.getAttribute('data-focus')); return; }
    if ((b = t.closest('[data-goto]'))) {
      var el = document.getElementById('stop-' + cssId(b.getAttribute('data-goto')));
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); highlight(el); }
      return;
    }
    if ((b = t.closest('[data-done]'))) {
      var id = b.getAttribute('data-done');
      var on = !state.done.has(id);
      if (on) state.done.add(id); else state.done.delete(id);
      store.set('done', Array.from(state.done));
      var y = window.scrollY;
      renderDay(on ? id : null);
      renderStrip();
      window.scrollTo(0, y);
      return;
    }
    if ((b = t.closest('[data-ja]'))) {
      var s = stopsOf(DAYS[state.day]).find(function (x) { return x.id === b.getAttribute('data-ja'); });
      if (!s) return;
      var inf = info(s);
      openSheet({ eyebrow: 'Enseñar al taxista o al personal', ja: inf.ja || inf.place || inf.name, addr: inf.addr, phrase: true, es: 'Hasta aquí, por favor · ' + inf.name });
      return;
    }
    if ((b = t.closest('[data-phrase]'))) {
      var f = T.phrases[+b.getAttribute('data-phrase')];
      openSheet({ eyebrow: f.ro, ja: f.ja, phrase: false, es: f.es });
      return;
    }
    // Edición
    if (t.closest('#edit-toggle')) {
      state.editing = !state.editing;
      rerenderKeepingScroll();
      return;
    }
    if ((b = t.closest('[data-move]'))) { moveStop(b.getAttribute('data-id'), +b.getAttribute('data-move')); return; }
    if ((b = t.closest('[data-remove]'))) { removeStop(b.getAttribute('data-remove')); return; }
    if (t.closest('#sort-time')) { sortByTime(); return; }
    if (t.closest('#reset-day')) { resetDay(); return; }
    if ((b = t.closest('[data-open-add]'))) { openAdd(+b.getAttribute('data-open-add'), 'ideas'); return; }
    if ((b = t.closest('[data-addtab]'))) { state.addTab = b.getAttribute('data-addtab'); renderAddTabs(); return; }
    if ((b = t.closest('[data-addcat]'))) { state.addCat = b.getAttribute('data-addcat'); renderAddList(); return; }
    if (t.closest('[data-close-add]')) { closeAdd(); return; }
    if ((b = t.closest('[data-addplace]'))) {
      var pid = b.getAttribute('data-addplace');
      var n = +b.getAttribute('data-day');
      if (!n) { var sel = document.getElementById('pop-day-' + cssId(pid)); n = sel ? +sel.value : nearestDay(PLACE[pid]); }
      if (addToDay('c:' + pid, n)) {
        if (dayMap) dayMap.closePopup();
        if ($('#add-sheet').open) renderAddList();
        toast('«' + PLACE[pid].name + '» añadido al día ' + n + '.', DAYS[state.day].n === n && state.tab === 'dias' ? null : { label: 'Ver día ' + n, fn: function () { closeAdd(); location.hash = '#dia-' + n; } });
      }
      return;
    }
    if ((b = t.closest('[data-restore]'))) {
      var rid = b.getAttribute('data-restore'), from = BASE_DAY[rid];
      var arr = ensureOrder(from.n);
      arr.splice(Math.min(from.i, arr.length), 0, rid);
      savePlan();
      renderAddList();
      if (DAYS[state.day].n === from.n) rerenderKeepingScroll(); else renderStrip();
      refreshTripMap();
      toast('Recuperada en el día ' + from.n + '.');
      return;
    }
    if (t.closest('#pick-on-map')) {
      var form = $('#add-mine');
      var vals = { name: form.elements.name.value, place: form.elements.place.value, time: form.elements.time.value, kind: form.elements.kind.value, note: form.elements.note.value };
      closeAdd();
      if (state.tab !== 'dias' || DAYS[state.day].n !== addDay) location.hash = '#dia-' + addDay;
      state.picking = { n: addDay, values: vals };
      $('#pick-banner').hidden = false;
      $('#daymap').classList.add('is-picking');
      setTimeout(function () {
        var top = $('.day-map-wrap').getBoundingClientRect().top + window.scrollY - $('.topbar').offsetHeight;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }, 50);
      return;
    }
    if (t.closest('#pick-cancel')) {
      var pk = state.picking;
      state.picking = null;
      $('#pick-banner').hidden = true;
      $('#daymap').classList.remove('is-picking');
      if (pk) openAdd(pk.n, 'mine', pk.values);
      return;
    }
    if (t.closest('#btn-ideas')) {
      state.ideasOnDay = !state.ideasOnDay;
      store.set('ideas-day', state.ideasOnDay);
      renderDayIdeas();
      if (state.ideasOnDay) toast(ideasNearDay(DAYS[state.day]).length + ' ideas cerca de este día. Toca una para añadirla.');
      return;
    }
    // Mapa general
    if ((b = t.closest('.chip[data-phase]'))) {
      var ph = b.getAttribute('data-phase');
      if (state.phasesOn.has(ph)) { state.phasesOn.delete(ph); tripLayers[ph] && tripLayers[ph].remove(); }
      else { state.phasesOn.add(ph); tripLayers[ph] && tripLayers[ph].addTo(tripMap); }
      b.setAttribute('aria-pressed', state.phasesOn.has(ph));
      return;
    }
    if ((b = t.closest('.chip[data-cat]'))) {
      var ck = b.getAttribute('data-cat');
      if (state.catsOn.has(ck)) { state.catsOn.delete(ck); tripIdeas[ck] && tripIdeas[ck].remove(); }
      else { state.catsOn.add(ck); tripIdeas[ck] && tripIdeas[ck].addTo(tripMap); }
      store.set('cats-on', Array.from(state.catsOn));
      b.setAttribute('aria-pressed', state.catsOn.has(ck));
      return;
    }
    // Info
    if ((b = t.closest('[data-lodge-reset]'))) {
      delete state.edits[b.getAttribute('data-lodge-reset')];
      store.set('lodging', state.edits);
      afterLodgingChange('Dirección quitada.');
      return;
    }
    if ((b = t.closest('[data-theme-set]'))) {
      store.set('theme', b.getAttribute('data-theme-set'));
      applyTheme();
      renderInfo();
      return;
    }
    if (t.closest('#plan-copy')) {
      var text = exportPlan();
      var showText = function () { $('#plan-io').hidden = false; var ta = $('#plan-text'); ta.value = text; ta.focus(); ta.select(); toast('Selecciona y copia el texto.'); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { toast('Plan copiado. Pégalo donde quieras guardarlo.'); }, showText);
      } else showText();
      return;
    }
    if (t.closest('#plan-import-open')) { $('#plan-io').hidden = false; $('#plan-text').value = ''; $('#plan-text').focus(); return; }
    if (t.closest('#plan-io-close')) { $('#plan-io').hidden = true; return; }
    if (t.closest('#plan-import')) { importPlan($('#plan-text').value.trim()); return; }
    if (t.closest('#plan-reset')) {
      var rb = t.closest('#plan-reset');
      if (rb.dataset.armed) {
        var backup = plan;
        plan = normalizePlan(null);
        savePlan();
        refreshTripMap();
        renderInfo();
        renderStrip();
        toast('Plan original recuperado.', { label: 'Deshacer', fn: function () { plan = backup; savePlan(); refreshTripMap(); renderInfo(); renderStrip(); } });
      } else {
        rb.dataset.armed = '1';
        rb.textContent = '¿Seguro? Pulsa otra vez';
      }
      return;
    }
    if (t.closest('#reset-progress')) {
      var btn = t.closest('#reset-progress');
      if (btn.dataset.armed) {
        state.done.clear();
        store.set('done', []);
        renderStrip();
        btn.textContent = 'Marcas borradas';
        delete btn.dataset.armed;
      } else {
        btn.dataset.armed = '1';
        btn.textContent = '¿Seguro? Pulsa otra vez';
      }
      return;
    }
    // Compartir
    if (t.closest('#btn-share') || t.closest('[data-open-share]')) { openShare(); return; }
    if ((b = t.closest('[data-share]'))) { shareLink(b.getAttribute('data-share')); return; }
    if ((b = t.closest('[data-copy]'))) { copyLink(b.getAttribute('data-copy')); return; }
    if ((b = t.closest('[data-close-dialog]'))) { closeDialog(b.getAttribute('data-close-dialog')); return; }
    if (t.closest('#incoming-load')) {
      closeDialog('incoming-sheet');
      if (!incoming) return;
      var bk = applyPlanData(incoming);
      incoming = null;
      toast('Plan compartido cargado.', { label: 'Deshacer', fn: function () { restorePlan(bk); } });
      return;
    }
    // Asistente
    if ((b = t.closest('[data-fx]'))) { var y = +b.getAttribute('data-fx'); $('#fx-yen').value = nf0.format(y); fxFromYen(y); return; }
    if ((b = t.closest('[data-big]'))) { openSheet({ eyebrow: 'Enseñar al personal', ja: b.getAttribute('data-big'), phrase: false, es: '' }); return; }
    if ((b = t.closest('[data-aichip]'))) {
      var box = $('#ai-input');
      box.value = b.getAttribute('data-text');
      box.focus();
      if (b.getAttribute('data-photo') && !ai.img) $('#ai-photo').click();
      return;
    }
    if (t.closest('#ai-stop')) { if (ai.ctl) ai.ctl.abort(); return; }
    if (t.closest('#composer-img-x')) { setAIImage(null); return; }
    if (t.closest('#ai-clear')) {
      if (!ai.chat.length) return;
      var old = ai.chat;
      ai.chat = [];
      saveChat();
      renderChat();
      toast('Chat borrado.', { label: 'Deshacer', fn: function () { ai.chat = old; saveChat(); renderChat(); } });
      return;
    }
    if (t.closest('#ai-perms')) {
      window.claude.use('permissions').then(function (pm) { return pm ? pm.manage() : Promise.reject(); })
        .then(function () { ai.status = 'ok'; renderAIState(); }, function () { toast('Abre el menú de permisos de la página para permitir Claude.'); });
      return;
    }
    if (t.closest('#btn-locate') || t.closest('#btn-locate-2')) { toggleLocate(); return; }
    if (t.closest('#btn-fit')) { fitDay(true); return; }
    if (t.closest('#btn-layer') || t.closest('#btn-layer-2')) {
      setBasemap(state.basemap === 'street' ? 'sat' : 'street');
      toast(state.basemap === 'street' ? 'Mapa de calles.' : 'Vista de satélite.');
      return;
    }
  });

  document.addEventListener('change', function (e) {
    var c;
    if ((c = e.target.closest('[data-bk]'))) {
      var id = c.getAttribute('data-bk');
      if (c.checked) state.booked.add(id); else state.booked.delete(id);
      store.set('booked', Array.from(state.booked));
      renderBookings();
      return;
    }
    if ((c = e.target.closest('[data-time]'))) {
      var sid = c.getAttribute('data-time');
      plan.times[sid] = c.value || '';
      savePlan();
      toast('Hora guardada.', { label: 'Ordenar por hora', fn: sortByTime });
      return;
    }
    if ((c = e.target.closest('[data-moveday]'))) {
      if (c.value) moveToDay(c.getAttribute('data-moveday'), +c.value);
      return;
    }
    if (e.target.id === 'ai-photo') {
      var f = e.target.files && e.target.files[0];
      if (f) setAIImage(f);
      return;
    }
    if ((c = e.target.closest('[data-note]'))) {
      var nid = c.getAttribute('data-note');
      if (c.value.trim()) plan.notes[nid] = c.value.trim(); else delete plan.notes[nid];
      savePlan();
      return;
    }
  });

  document.addEventListener('input', function (e) {
    var id = e.target.id;
    if (id === 'add-search') { state.addQuery = e.target.value; renderAddList(); }
    else if (id === 'fx-yen') fxFromYen(parseNum(e.target.value));
    else if (id === 'fx-eur') fxFromEur(parseNum(e.target.value));
    else if (id === 'fx-rate') {
      var r = parseNum(e.target.value);
      if (r && r > 10 && r < 1000) {
        fx.rate = r;
        store.set('fx-rate', r);
        renderFx();
        e.target.focus();
        fxFromYen(parseNum($('#fx-yen').value));
      }
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.target.id === 'ai-input' && e.key === 'Enter' && !e.shiftKey && !e.isComposing && window.matchMedia('(min-width: 960px)').matches) {
      e.preventDefault();
      aiSend();
    }
  });

  document.addEventListener('toggle', function (e) {
    var d = e.target;
    if (d.matches && d.matches('details[data-review]')) store.set('review-' + d.getAttribute('data-review'), d.open);
  }, true);

  document.addEventListener('submit', function (e) {
    var f = e.target;
    if (f.id === 'add-mine') { e.preventDefault(); addCustomFromForm(f); return; }
    if (f.id === 'composer') { e.preventDefault(); aiSend(); return; }
    f = f.closest('form[data-lodge]');
    if (!f) return;
    e.preventDefault();
    var k = f.getAttribute('data-lodge');
    var v = f.querySelector('input').value.trim();
    if (v) state.edits[k] = { addr: v }; else delete state.edits[k];
    store.set('lodging', state.edits);
    afterLodgingChange(v ? (parseLL(v) ? 'Guardado con coordenadas exactas.' : 'Guardado. Para un pin exacto, añade también las coordenadas.') : 'Dirección quitada.');
  });

  function afterLodgingChange(msg) {
    refreshTripMap();
    renderInfo();
    renderDay();
    toast(msg);
  }

  function applyTheme() {
    var th = store.get('theme', 'auto');
    if (th === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', th);
  }

  function syncHeader() {
    document.documentElement.style.setProperty('--top-h', $('.topbar').offsetHeight + 'px');
  }

  // ── Arranque ───────────────────────────────────────────────────────────
  applyTheme();
  syncLayerButtons();
  initAI();
  renderStatus();
  renderLegend();
  renderBookings();
  window.addEventListener('hashchange', route);
  route();
  syncHeader();
  if ('ResizeObserver' in window) new ResizeObserver(syncHeader).observe($('.topbar'));
  window.addEventListener('resize', function () { if (dayMap) dayMap.invalidateSize(); if (tripMap) tripMap.invalidateSize(); });

  setInterval(function () {
    var now = localISO();
    if (now !== today) { today = now; renderStatus(); renderStrip(); renderBookings(); }
  }, 60000);

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();
