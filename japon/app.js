(function () {
  'use strict';

  var T = window.TRIP;
  var DAYS = T.days;
  var hasLeaflet = typeof window.L !== 'undefined';

  // ── Almacenamiento local (solo comodidades de este móvil) ──────────────
  var store = {
    get: function (k, d) {
      try { var v = localStorage.getItem('jp26:' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem('jp26:' + k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ }
    }
  };

  var state = {
    tab: 'dias',
    day: 0,
    done: new Set(store.get('done', [])),
    booked: new Set(store.get('booked', [])),
    edits: store.get('lodging', {}),
    me: null,
    watchId: null,
    phasesOn: new Set(Object.keys(T.phases))
  };

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
  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.hidden = true; }, 3800);
  }

  // ── Alojamientos (con las direcciones que se editen en Info) ───────────
  function parseLL(text) {
    var m = /(-?\d{1,3}\.\d{3,})\s*,\s*(-?\d{1,3}\.\d{3,})/.exec(text || '');
    if (!m) return null;
    var lat = +m[1], lng = +m[2];
    return (lat > 20 && lat < 50 && lng > 120 && lng < 150) ? [lat, lng] : null;
  }
  function lodging(key) {
    var base = T.lodging[key], e = state.edits[key] || {};
    var ll = e.addr ? parseLL(e.addr) : null;
    return {
      key: key, label: base.label, name: base.name, note: base.note,
      addr: e.addr || base.addr,
      q: e.addr || base.q,
      ll: ll || base.ll,
      approx: !ll && base.approx,
      edited: !!e.addr
    };
  }

  function info(s) {
    if (s.lodge) {
      var l = lodging(s.lodge);
      return { name: s.name, place: l.name, ja: s.ja || '', q: l.q, ll: l.ll, approx: l.approx, addr: l.edited ? l.addr : '' };
    }
    return { name: s.name, ja: s.ja || '', q: s.q, ll: s.ll, approx: !!s.approx, addr: '' };
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
    day.stops.forEach(function (s) {
      if (s.opt || s.kind === 'task') return;
      var q = info(s).q;
      if (q && pts[pts.length - 1] !== q) pts.push(q);
    });
    return 'https://www.google.com/maps/dir/' + pts.map(function (q) {
      return encodeURIComponent(q).replace(/%20/g, '+');
    }).join('/') + '/data=!4m2!4m1!3e0';
  }

  // ── Iconos ─────────────────────────────────────────────────────────────
  var ICON = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5 12 5l8 6.5"/><path d="M6.5 10v9h11v-9"/></svg>',
    box: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8l8-4 8 4v8l-8 4-8-4z"/><path d="M4 8l8 4 8-4M12 12v8"/></svg>',
    route: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8 18h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>',
    from: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12M13 7l5 5-5 5"/></svg>',
    ja: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h9M8.5 4v2M6 6c0 4 3 7 7 8M11 6c-1 4-3.5 7-7 8M13.5 20l3.5-9 3.5 9M14.7 17h4.6"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    walk: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="13" cy="4.5" r="1.8"/><path d="M10 21l2.5-6.5L15 17v4M9 12l2-4.5 3 2.5 3 1M12.5 14.5 11 8"/></svg>',
    rain: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 16 0z"/><path d="M12 12v6.5a2 2 0 0 1-4 0"/></svg>',
    sunrise: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18h16M7 18a5 5 0 0 1 10 0M12 4v4M9.5 6.5 12 4l2.5 2.5"/></svg>',
    sunset: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18h16M7 18a5 5 0 0 1 10 0M12 4v4M9.5 5.5 12 8l2.5-2.5"/></svg>',
    temp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z"/></svg>',
    train: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5.5" y="3.5" width="13" height="13" rx="3"/><path d="M5.5 10h13M8.5 20l2-3.5M15.5 20l-2-3.5"/></svg>',
    car: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 16V12l2-5h10l2 5v4z"/><path d="M5 12h14"/><circle cx="8" cy="16.5" r="1.6"/><circle cx="16" cy="16.5" r="1.6"/></svg>'
  };
  var KIND = { sight: 'Visita', food: 'Comida', shop: 'Tiendas', move: 'Trayecto', home: 'Alojamiento', task: 'Tarea' };

  function phaseOf(day) { return day.phase; }
  function numbering(day) {
    var n = 0, out = {};
    day.stops.forEach(function (s) { if (s.kind !== 'home' && s.kind !== 'task') out[s.id] = ++n; });
    return out;
  }
  function nodeHtml(day, s, nums) {
    if (s.kind === 'home') return ICON.home;
    if (s.kind === 'task') return ICON.box;
    return String(nums[s.id]);
  }

  // ── Estado del viaje (cabecera) ────────────────────────────────────────
  function tripIndex() {
    var i = daysBetween(T.start, today);
    return (i >= 0 && i < DAYS.length) ? i : -1;
  }
  function renderStatus() {
    var el = $('#status');
    var toStart = daysBetween(today, T.start);
    var i = tripIndex();
    if (i >= 0) {
      el.innerHTML = 'Día <b>' + (i + 1) + '</b> de ' + DAYS.length + ' · ' + esc(T.phases[DAYS[i].phase].name);
    } else if (toStart > 0) {
      el.innerHTML = toStart === 1 ? 'Sales <b>mañana</b>' : 'Faltan <b>' + toStart + '</b> días';
    } else {
      el.textContent = 'Viaje completado';
    }
  }

  function renderStrip() {
    var strip = $('#daystrip');
    strip.innerHTML = DAYS.map(function (d, i) {
      var p = parts(d.date);
      var all = d.stops.filter(function (s) { return !s.opt; });
      var complete = all.length && all.every(function (s) { return state.done.has(s.id); });
      return '<a class="ticket' + (d.date === today ? ' is-today' : '') + (complete ? ' is-complete' : '') +
        '" href="#dia-' + d.n + '" data-phase="' + phaseOf(d) + '"' + (i === state.day && state.tab === 'dias' ? ' aria-current="page"' : '') +
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
  function dayCenter(day) {
    var pts = day.stops.map(function (s) { return info(s).ll; }).filter(Boolean);
    if (!pts.length) pts = [lodging(day.base).ll];
    var lat = 0, lng = 0;
    pts.forEach(function (p) { lat += p[0]; lng += p[1]; });
    return [lat / pts.length, lng / pts.length];
  }

  function renderDay(newlyDone) {
    var day = DAYS[state.day];
    var p = parts(day.date);
    var c = dayCenter(day);
    var sun = sunTimes(day.date, c[0], c[1]);
    var nums = numbering(day);
    var home = lodging(day.base);
    var homeMode = day.mode === 'car' ? 'driving' : 'transit';
    var phase = T.phases[day.phase];

    var html = '';
    html += '<p class="eyebrow" style="--c:var(--' + day.phase + ')"><span class="phase-dot"></span>Día ' + day.n + ' · ' +
      WD[p.wd] + ' ' + p.d + ' ' + MES[p.m] + ' · ' + esc(phase.name) + '</p>';
    html += '<h1 class="day-title" id="day-title">' + esc(day.title) + '</h1>';
    html += '<p class="day-sub">' + esc(day.sub) + '</p>';
    html += '<ul class="meta">' +
      '<li>' + ICON.temp + '<span><b>' + day.temp[0] + '°</b> / ' + day.temp[1] + '° aprox.</span></li>' +
      '<li>' + ICON.sunrise + '<span>Sale <b>' + fmtMin(sun.rise) + '</b></span></li>' +
      '<li>' + ICON.sunset + '<span>Se pone <b>' + fmtMin(sun.set) + '</b></span></li>' +
      '<li>' + (day.mode === 'car' ? ICON.car + '<span>En coche</span>' : ICON.train + '<span>Transporte público</span>') + '</li>' +
      '</ul>';
    html += '<div class="day-actions">';
    html += '<a class="btn btn--primary" target="_blank" rel="noopener" href="' + esc(gDir(home.q, '', homeMode)) + '">' + ICON.home + 'Volver a casa</a>';
    if (day.mode === 'car') {
      html += '<a class="btn" target="_blank" rel="noopener" href="' + esc(carRouteUrl(day)) + '">' + ICON.route + 'Ruta en coche completa</a>';
    }
    html += '</div>';

    if (day.changes && day.changes.length) {
      html += '<details class="review"' + (store.get('review-' + day.n, true) ? ' open' : '') + ' data-review="' + day.n + '">' +
        '<summary><span class="seal" aria-hidden="true">改</span>Cambios respecto al PDF <span class="count">(' + day.changes.length + ')</span></summary><ul>' +
        day.changes.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></details>';
    }
    if (day.rain) html += '<p class="rain">' + ICON.rain + '<span><b>Si llueve:</b> ' + esc(day.rain) + '</span></p>';

    html += '<ol class="timeline">';
    var prev = null;
    day.stops.forEach(function (s) {
      var inf = info(s);
      var done = state.done.has(s.id);
      var mode = legMode(day, s);
      var dist = (state.me && inf.ll) ? fmtDist(haversine([state.me.lat, state.me.lng], inf.ll)) : '';
      html += '<li class="stop' + (s.opt ? ' stop--opt' : '') + (done ? ' is-done' : '') + '" id="stop-' + s.id + '" data-phase="' + day.phase + '">';
      html += '<button class="stop__num" type="button" data-focus="' + s.id + '" aria-label="Ver ' + esc(inf.name) + ' en el mapa"' + (inf.ll ? '' : ' disabled') + '>' + nodeHtml(day, s, nums) + '</button>';
      html += '<div class="stop__card">';
      if (done) html += '<span class="hanko' + (newlyDone === s.id ? ' is-new' : '') + '" aria-hidden="true">済</span>';
      html += '<p class="stop__kind">' + (s.t && s.t !== '—' ? '<span class="stop__time">' + esc(s.t) + '</span>' : '') + '<span>' + KIND[s.kind] + '</span>' +
        (s.opt ? '<span class="tag">Opcional</span>' : '') +
        (inf.approx && inf.ll ? '<span class="tag">Ubicación aprox.</span>' : '') +
        (dist ? '<span class="dist">a ' + dist + '</span>' : '') + '</p>';
      html += '<h2 class="stop__name">' + esc(inf.name) + '</h2>';
      if (s.lodge) html += '<p class="stop__ja">' + esc(inf.place) + (inf.addr ? ' · ' + esc(inf.addr) : '') + '</p>';
      else if (inf.ja) html += '<p class="stop__ja" lang="ja">' + esc(inf.ja) + '</p>';
      if (s.how) html += '<p class="stop__how">' + (mode === 'walking' ? ICON.walk : (day.mode === 'car' ? ICON.car : ICON.train)) + '<span>' + esc(s.how) + '</span></p>';
      if (s.note) html += '<p class="stop__note">' + esc(s.note) + '</p>';
      if (s.tips && s.tips.length) html += '<ul class="stop__tips">' + s.tips.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
      if (s.shops && s.shops.length) {
        html += '<ul class="shops" aria-label="Tiendas">' + s.shops.map(function (sh) {
          return '<li><a target="_blank" rel="noopener" href="' + esc(gSearch(sh.q)) + '">' + ICON.pin + esc(sh.n) + '</a></li>';
        }).join('') + '</ul>';
      }
      html += '<div class="stop__actions">';
      if (inf.q) {
        html += '<a class="btn btn--primary" target="_blank" rel="noopener" href="' + esc(gDir(inf.q, '', mode)) + '">' + ICON.route + 'Cómo llegar</a>';
        if (prev && prev.q && prev.q !== inf.q) {
          html += '<a class="btn" target="_blank" rel="noopener" href="' + esc(gDir(inf.q, prev.q, mode)) + '">' + ICON.from + 'Desde la anterior</a>';
        }
      }
      html += '</div><div class="stop__more">';
      if (inf.q && !s.lodge) html += '<a class="btn btn--sm" target="_blank" rel="noopener" href="' + esc(gSearch(inf.q)) + '" aria-label="Ver ' + esc(inf.name) + ' en Google Maps">' + ICON.pin + 'Maps</a>';
      if (inf.ja || inf.addr) html += '<button class="btn btn--sm" type="button" data-ja="' + s.id + '">' + ICON.ja + 'Japonés</button>';
      html += '<button class="btn btn--sm btn-done" type="button" data-done="' + s.id + '" aria-pressed="' + done + '">' + ICON.check + 'Hecho</button>';
      html += '</div></div></li>';
      if (inf.q && s.kind !== 'task') prev = inf;
    });
    html += '</ol>';

    $('#day-body').innerHTML = html;
    renderDayMap();
  }

  // ── Mapas ──────────────────────────────────────────────────────────────
  var dayMap = null, dayLayer = null, dayMarkers = {}, tripMap = null, tripLayers = {}, meLayers = [];

  function addBase(map, offlineEl) {
    map.createPane('coast');
    map.getPane('coast').style.zIndex = 150;
    if (window.JP_COAST) {
      L.polygon(window.JP_COAST.map(function (r) { return r.map(function (p) { return [p[1], p[0]]; }); }), {
        pane: 'coast', className: 'coast', weight: 1, fillOpacity: 1, interactive: false
      }).addTo(map);
    }
    var ok = 0, bad = 0;
    var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      crossOrigin: 'anonymous',
      className: 'tiles',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
    });
    tiles.on('tileload', function () { ok++; offlineEl.hidden = true; });
    tiles.on('tileerror', function () { bad++; if (!ok && bad >= 3) offlineEl.hidden = false; });
    tiles.addTo(map);
  }

  function pinIcon(cls, html, size) {
    size = size || 28;
    return L.divIcon({ className: '', html: '<div class="pin ' + cls + '">' + html + '</div>', iconSize: [size, size], iconAnchor: [size / 2, size / 2], popupAnchor: [0, -size / 2] });
  }

  function popupHtml(day, s, extraDayLink) {
    var inf = info(s);
    var mode = legMode(day, s);
    var h = '<p class="pop__t">Día ' + day.n + (s.t && s.t !== '—' ? ' · ' + esc(s.t) : '') + '</p>' +
      '<p class="pop__n">' + esc(inf.name) + '</p>' +
      (s.lodge ? '<p class="pop__ja">' + esc(inf.place) + '</p>' : (inf.ja ? '<p class="pop__ja" lang="ja">' + esc(inf.ja) + '</p>' : '')) +
      (inf.approx ? '<p class="pop__approx">Ubicación aproximada: la ruta usa el nombre.</p>' : '') +
      '<div class="pop__a"><a class="btn btn--primary" target="_blank" rel="noopener" href="' + esc(gDir(inf.q, '', mode)) + '">Cómo llegar</a>';
    h += extraDayLink
      ? '<a class="btn" href="#dia-' + day.n + '">Ver día ' + day.n + '</a>'
      : '<button class="btn" type="button" data-goto="' + s.id + '">Ver en la lista</button>';
    return h + '</div>';
  }

  function ensureDayMap() {
    if (dayMap || !hasLeaflet) return;
    dayMap = L.map('daymap', { zoomControl: true, scrollWheelZoom: true, tap: true });
    addBase(dayMap, $('#daymap-offline'));
    dayLayer = L.layerGroup().addTo(dayMap);
    dayMap.getContainer().addEventListener('click', function (e) {
      var b = e.target.closest('[data-goto]');
      if (!b) return;
      var el = document.getElementById('stop-' + b.getAttribute('data-goto'));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        highlight(el);
      }
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
    var nums = numbering(day);
    dayLayer.clearLayers();
    dayMarkers = {};
    var pts = [], seen = {};
    day.stops.forEach(function (s) {
      var inf = info(s);
      if (!inf.ll) return;
      var key = inf.ll.join(',');
      var cls = 'pin--' + day.phase + (s.opt ? ' pin--opt' : '') + (state.done.has(s.id) ? ' is-done' : '');
      var html = s.kind === 'home' ? ICON.home : (s.kind === 'task' ? ICON.box : nums[s.id]);
      if (s.kind === 'home' || s.kind === 'task') cls = 'pin--home' + (state.done.has(s.id) ? ' is-done' : '');
      if (seen[key]) { dayMarkers[s.id] = seen[key]; return; }
      var m = L.marker(inf.ll, { icon: pinIcon(cls, html), title: inf.name, riseOnHover: true }).bindPopup(popupHtml(day, s));
      m.addTo(dayLayer);
      seen[key] = m;
      dayMarkers[s.id] = m;
      if (!s.opt && !s.far) pts.push(inf.ll);
    });
    if (pts.length > 1) {
      L.polyline(pts, { className: 'route route--' + day.phase, weight: 3, opacity: .8, dashArray: '1 8', lineCap: 'round', interactive: false }).addTo(dayLayer);
    }
    if (state.me) drawMe();
    fitDay(false);
  }

  function fitDay(animate) {
    if (!dayMap) return;
    var day = DAYS[state.day];
    // Las paradas lejanas (el aeropuerto) no cuentan para encuadrar el día.
    var pts = day.stops.filter(function (s) { return !s.far; })
      .map(function (s) { return info(s).ll; }).filter(Boolean);
    dayMap.invalidateSize();
    if (pts.length === 1) dayMap.setView(pts[0], 15, { animate: animate });
    else if (pts.length) dayMap.fitBounds(L.latLngBounds(pts), { padding: [36, 36], maxZoom: 16, animate: animate });
  }

  function focusStop(id) {
    var day = DAYS[state.day];
    var s = day.stops.find(function (x) { return x.id === id; });
    if (!s || !dayMap) return;
    var inf = info(s);
    if (!inf.ll) return;
    var wrap = $('.day-map-wrap');
    if (window.matchMedia('(max-width: 959px)').matches) {
      var top = wrap.getBoundingClientRect().top + window.scrollY - $('.topbar').offsetHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
    dayMap.flyTo(inf.ll, Math.max(dayMap.getZoom(), 15), { duration: .6 });
    var m = dayMarkers[id];
    if (m) setTimeout(function () { m.openPopup(); }, 650);
    var el = document.getElementById('stop-' + id);
    if (el) highlight(el);
  }

  function ensureTripMap() {
    if (tripMap || !hasLeaflet) return;
    tripMap = L.map('tripmap', { zoomControl: false, tap: true });
    L.control.zoom({ position: 'topright' }).addTo(tripMap);
    addBase(tripMap, $('#tripmap-offline'));
    var all = [];
    Object.keys(T.phases).forEach(function (ph) { tripLayers[ph] = L.layerGroup().addTo(tripMap); });
    DAYS.forEach(function (day) {
      var pts = [];
      day.stops.forEach(function (s) {
        var inf = info(s);
        if (!inf.ll || s.far || s.kind === 'home' || s.kind === 'task') return;
        pts.push(inf.ll);
        all.push(inf.ll);
        L.marker(inf.ll, { icon: pinIcon('pin--dot pin--' + day.phase + (s.opt ? ' pin--opt' : ''), '', 14), title: inf.name })
          .bindPopup(popupHtml(day, s, true)).addTo(tripLayers[day.phase]);
      });
      if (pts.length > 1) {
        L.polyline(pts, { className: 'route route--' + day.phase, weight: 2, opacity: .7, dashArray: '1 6', lineCap: 'round', interactive: false }).addTo(tripLayers[day.phase]);
      }
    });
    Object.keys(T.lodging).forEach(function (k) {
      var l = lodging(k);
      L.marker(l.ll, { icon: pinIcon('pin--home pin--sm', ICON.home, 22), title: l.label, zIndexOffset: 500 })
        .bindPopup('<p class="pop__t">' + esc(l.label) + '</p><p class="pop__n">' + esc(l.name) + '</p>' +
          (l.approx ? '<p class="pop__approx">Ubicación aproximada.</p>' : '') +
          '<div class="pop__a"><a class="btn btn--primary" target="_blank" rel="noopener" href="' + esc(gDir(l.q, '', 'transit')) + '">Cómo llegar</a></div>')
        .addTo(tripMap);
    });
    tripMap.fitBounds(L.latLngBounds(all), { padding: [30, 30] });
    if (state.me) drawMe();
  }

  function renderLegend() {
    $('#legend').innerHTML = Object.keys(T.phases).map(function (k) {
      return '<button class="chip" type="button" data-phase="' + k + '" aria-pressed="' + state.phasesOn.has(k) + '">' + esc(T.phases[k].name) + '</button>';
    }).join('');
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
      renderDay();
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
        if (state.tab === 'dias') renderDay();
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
  function renderInfo() {
    var h = '<h1 class="page__title" id="info-title">Info del viaje</h1>' +
      '<p class="page__lead">Qué se ha corregido del PDF, direcciones de los alojamientos y lo práctico para moverse.</p>';

    h += '<h2>Qué ha cambiado</h2><ul class="changes">' + T.summary.map(function (c) {
      return '<li><a href="#dia-' + c.d + '">DÍA ' + c.d + '</a><p>' + esc(c.t) + '</p></li>';
    }).join('') + '</ul>';

    h += '<h2>Alojamientos</h2><p class="page__lead">Pega la dirección exacta o unas coordenadas (por ejemplo, copiadas de Google Maps: <span lang="en">34.6658, 135.5058</span>). Con coordenadas, el pin se coloca exacto.</p><div class="lodging">';
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

  // ── Navegación ─────────────────────────────────────────────────────────
  function defaultDay() {
    var i = tripIndex();
    if (i >= 0) return i;
    var saved = store.get('day', 0);
    return (saved >= 0 && saved < DAYS.length) ? saved : 0;
  }

  function route() {
    var h = location.hash.replace(/^#/, '');
    var m = /^dia-(\d{1,2})$/.exec(h);
    var prevTab = state.tab, prevDay = state.day;
    if (m) {
      state.tab = 'dias';
      state.day = Math.min(DAYS.length - 1, Math.max(0, +m[1] - 1));
    } else if (h === 'mapa' || h === 'reservas' || h === 'info') {
      state.tab = h;
    } else {
      state.tab = 'dias';
      state.day = defaultDay();
    }
    store.set('day', state.day);
    show(prevTab !== state.tab || prevDay !== state.day);
  }

  var firstShow = true;
  function show(changed) {
    ['dias', 'mapa', 'reservas', 'info'].forEach(function (t) { $('#view-' + t).hidden = state.tab !== t; });
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
      var day = DAYS[state.day];
      var s = day.stops.find(function (x) { return x.id === b.getAttribute('data-ja'); });
      var inf = info(s);
      openSheet({ eyebrow: 'Enseñar al taxista o al personal', ja: inf.ja || inf.place || inf.name, addr: inf.addr, phrase: true, es: 'Hasta aquí, por favor · ' + inf.name });
      return;
    }
    if ((b = t.closest('[data-phrase]'))) {
      var f = T.phrases[+b.getAttribute('data-phrase')];
      openSheet({ eyebrow: f.ro, ja: f.ja, phrase: false, es: f.es });
      return;
    }
    if ((b = t.closest('.chip[data-phase]'))) {
      var ph = b.getAttribute('data-phase');
      if (state.phasesOn.has(ph)) { state.phasesOn.delete(ph); tripLayers[ph] && tripLayers[ph].remove(); }
      else { state.phasesOn.add(ph); tripLayers[ph] && tripLayers[ph].addTo(tripMap); }
      b.setAttribute('aria-pressed', state.phasesOn.has(ph));
      return;
    }
    if ((b = t.closest('[data-lodge-reset]'))) {
      delete state.edits[b.getAttribute('data-lodge-reset')];
      store.set('lodging', state.edits);
      afterLodgingChange('Dirección quitada.');
      return;
    }
    if ((b = t.closest('[data-theme-set]'))) {
      var th = b.getAttribute('data-theme-set');
      store.set('theme', th);
      applyTheme();
      renderInfo();
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
    if (t.closest('#btn-locate') || t.closest('#btn-locate-2')) { toggleLocate(); return; }
    if (t.closest('#btn-fit')) { fitDay(true); return; }
  });

  document.addEventListener('change', function (e) {
    var c = e.target.closest('[data-bk]');
    if (c) {
      var id = c.getAttribute('data-bk');
      if (c.checked) state.booked.add(id); else state.booked.delete(id);
      store.set('booked', Array.from(state.booked));
      renderBookings();
    }
  });

  document.addEventListener('toggle', function (e) {
    var d = e.target;
    if (d.matches && d.matches('details[data-review]')) store.set('review-' + d.getAttribute('data-review'), d.open);
  }, true);

  document.addEventListener('submit', function (e) {
    var f = e.target.closest('form[data-lodge]');
    if (!f) return;
    e.preventDefault();
    var k = f.getAttribute('data-lodge');
    var v = f.querySelector('input').value.trim();
    if (v) state.edits[k] = { addr: v }; else delete state.edits[k];
    store.set('lodging', state.edits);
    afterLodgingChange(v ? (parseLL(v) ? 'Guardado con coordenadas exactas.' : 'Guardado. Para un pin exacto, añade también las coordenadas.') : 'Dirección quitada.');
  });

  function afterLodgingChange(msg) {
    if (tripMap) { tripMap.remove(); tripMap = null; tripLayers = {}; }
    renderInfo();
    renderDay();
    toast(msg);
  }

  function applyTheme() {
    var th = store.get('theme', 'auto');
    if (th === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', th);
  }

  // Altura real de la cabecera para el mapa a pantalla completa.
  function syncHeader() {
    document.documentElement.style.setProperty('--top-h', $('.topbar').offsetHeight + 'px');
  }

  // ── Arranque ───────────────────────────────────────────────────────────
  applyTheme();
  renderStatus();
  renderLegend();
  renderBookings();
  window.addEventListener('hashchange', route);
  route();
  syncHeader();
  if ('ResizeObserver' in window) new ResizeObserver(syncHeader).observe($('.topbar'));
  window.addEventListener('resize', function () { if (dayMap) dayMap.invalidateSize(); if (tripMap) tripMap.invalidateSize(); });

  // Si cambia el día (app abierta de un día para otro), refrescar estado.
  setInterval(function () {
    var now = localISO();
    if (now !== today) { today = now; renderStatus(); renderStrip(); renderBookings(); }
  }, 60000);

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();
