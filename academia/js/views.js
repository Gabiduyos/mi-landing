// Pantallas de referencia, evaluación, progreso y modo avión.
import { $, $$, esc, md, toast, download, copyText } from './ui.js';
import { state, save, saveNow, level, LEVELS, srsDue, exportState, importState, reset, xp, SRS_STEPS } from './store.js';
import { MODULES, CORE, mod, modProgress, overall, weakTags, runQuiz, QBANK } from './core.js';
import { SCENARIOS, FIELDS } from './content/scenarios.js';
import { LIBRARY } from './content/library.js';
import { CHEATS, MISSIONS, SOURCES, MEM_FIELDS, MEM_TEMPLATES, TAG_MODULE } from './content/extras.js';
import { MENU, allItems } from './content/menumap.js';
import { evaluateCamera, scoreOf, APERTURES, SHUTTERS, ISOS, LENSES } from './sims/expo.js';
import { mountSim, GOAL_COUNT } from './sims/index.js';

// ---------- Examen final (módulo 13)
export function finalView(main, fid) {
  const f = mod(13).finals.find(x => x.id === fid); if (!f) { main.innerHTML = '<h1>Encargo no encontrado</h1>'; return; }
  const c = { ...f.cam }, pick = {}, rub = {};
  const sel = (id, opts, cur) => `<select id="fc-${id}">${opts.map(([v, t]) => `<option value="${v}" ${String(v) === String(cur) ? 'selected' : ''}>${t}</option>`).join('')}</select>`;
  main.innerHTML = `<div class="crumbs"><a href="#/m/13/final">Examen final</a><span>/</span><span>${f.id}</span></div><span class="eyebrow">Encargo ${f.id} · ≈ ${f.mins} min</span><h1>${esc(f.title)}</h1>
    <div class="card"><span class="lbl">Briefing</span><p>${esc(f.brief)}</p><span class="lbl">Datos de la escena</span><p class="small muted" style="margin:0">${esc(f.sceneNote)}</p></div>
    <h2 class="mt2">1 · Ajustes de cámara</h2><div class="card"><div class="grid g4">
      <div><span class="lbl">Fps</span>${sel('fps', [[25, '25p'], [50, '50p'], [100, '100p (HD)']], c.fps)}</div>
      <div><span class="lbl">Obturación</span>${sel('den', SHUTTERS.map(s => [s, '1/' + s]), c.den)}</div>
      <div><span class="lbl">Diafragma</span>${sel('N', APERTURES.map(a => [a, 'f/' + a]), c.N)}</div>
      <div><span class="lbl">ISO</span>${sel('iso', ISOS.map(a => [a, a]), c.iso)}</div>
      <div><span class="lbl">ND (stops)</span>${sel('nd', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(a => [a, a ? a + ' stops' : 'sin ND']), c.nd)}</div>
      <div><span class="lbl">Perfil</span>${sel('profile', [['slog3', 'S-Log3 / S-Gamut3.Cine'], ['scinetone', 'S-Cinetone'], ['std', 'Estándar (sin perfil)']], c.profile)}</div>
      <div><span class="lbl">Objetivo</span>${sel('lens', Object.entries(LENSES).map(([k, l]) => [k, l.name]), c.lens)}</div>
      <div><span class="lbl">Focal</span>${sel('focal', [24, 28, 35, 50, 70].map(a => [a, a + ' mm']), c.focal)}</div></div></div>
    <h2 class="mt2">2 · Decisiones</h2>${f.decisions.map((d, i) => { const o = d.o.map((x, k) => [x, k]).sort(() => Math.random() - 0.5); return `<div class="card mb q" data-d="${i}"><h3>${i + 1}. ${esc(d.q)}</h3>${o.map(([x, k]) => `<button class="opt" data-k="${k}">${esc(x[0])}</button>`).join('')}</div>`; }).join('')}
    <h2 class="mt2">3 · Justificación (autoevaluación guiada)</h2>${f.open.map((o, i) => `<div class="card mb"><h3 style="margin-top:0">${esc(o.q)}</h3><textarea data-note="fin:${f.id}:${i}" placeholder="Escribe tu razonamiento antes de evaluar…">${esc(state().notes[`fin:${f.id}:${i}`] || '')}</textarea><div class="rub" data-o="${i}" hidden><span class="lbl mt">Marca con honestidad lo que tu texto cumple</span>${o.rubric.map((r, k) => `<label class="row small" style="padding:6px 0"><input type="checkbox" data-r="${i}:${k}"><span>${esc(r)}</span></label>`).join('')}</div></div>`).join('')}
    <button class="btn warn" id="fin-go">Evaluar encargo</button><div id="fin-out" class="mt"></div>`;
  $$('.q[data-d]', main).forEach(q => q.addEventListener('click', e => { const b = e.target.closest('.opt'); if (!b || b.disabled) return; $$('.opt', q).forEach(x => x.classList.toggle('sel', x === b)); pick[q.dataset.d] = +b.dataset.k; }));
  $('#fin-go', main).onclick = () => {
    const miss = f.decisions.findIndex((_, i) => pick[i] == null);
    if (miss >= 0) { toast(`Falta responder la decisión ${miss + 1}`); $(`.q[data-d="${miss}"]`, main).scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    for (const k of ['fps', 'den', 'N', 'iso', 'nd', 'focal']) c[k] = +$('#fc-' + k, main).value;
    c.profile = $('#fc-profile', main).value; c.lens = $('#fc-lens', main).value;
    const L = LENSES[c.lens]; const extra = [];
    if (c.focal < L.min || c.focal > L.max) extra.push({ ok: false, pts: 0, max: 1, msg: `El ${L.name} no cubre ${c.focal} mm.` });
    if (c.fps === 100) extra.push({ ok: false, pts: 0, max: 1, msg: '100p solo existe en Full HD en la A7 IV: pierdes el 4K pactado salvo que lo asumas para ese plano.' });
    if (c.fps === 50) extra.push({ ok: true, pts: 0, max: 0, msg: `Recuerda: 4K 50p recorta ×1,5. Tus ${c.focal} mm encuadran como ${Math.round(c.focal * 1.5)} mm.` });
    const cam = [...evaluateCamera(f.scene, c), ...extra], cs = scoreOf(cam);
    let dp = 0; const dm = f.decisions.length * 2;
    const dh = f.decisions.map((d, i) => {
      const o = d.o[pick[i]], best = d.o.find(x => x[1] === 2); dp += o[1];
      $$(`.q[data-d="${i}"] .opt`, main).forEach(b => { b.disabled = true; const x = d.o[+b.dataset.k]; if (x[1] === 2) b.classList.add('right'); else if (+b.dataset.k === pick[i]) b.classList.add('wrong'); });
      return `<div class="fb ${o[1] === 2 ? 'ok' : 'ko'}"><b>${i + 1}. ${esc(d.q)} — ${o[1]}/2</b>${o[1] === 2 ? '' : 'Tu elección: ' + esc(o[0]) + '. '}${esc(o[2])}${o[1] < 2 ? `<br><br><b>Mejor opción: ${esc(best[0])}</b>${esc(best[2])}` : ''}</div>`;
    }).join('');
    const pct = Math.round(100 * (cs.s + dp) / (cs.m + dm));
    const S = state(); if (!S.final[f.id] || pct > S.final[f.id].pct) S.final[f.id] = { pct, at: Date.now() }; S.final[f.id].tries = (S.final[f.id].tries || 0) + 1; save();
    const camBad = cam.filter(r => !r.ok && r.max).length;
    $('#fin-out', main).innerHTML = `<div class="card"><span class="eyebrow">Evaluación automática</span><div class="stat">${pct}<small> % · cámara ${cs.s}/${cs.m} · decisiones ${dp}/${dm}</small></div>
      <p class="mt">${pct >= 70 ? 'Encargo superado.' : 'Encargo no superado (mínimo 70 %).'} ${camBad ? `Tienes ${camBad} fallo(s) en ajustes de cámara: repasa los módulos 2 y 3 y el simulador de exposición.` : 'Ajustes de cámara coherentes con la escena.'}</p>
      <span class="lbl mt">Cámara</span>${cam.map(r => `<div class="fb ${r.ok ? 'ok' : 'ko'}"><b>${r.ok ? '✓' : '✕'} ${r.max ? r.pts + '/' + r.max : 'nota'}</b>${esc(r.msg)}</div>`).join('')}
      <span class="lbl mt">Decisiones</span>${dh}
      <span class="lbl mt">Justificación</span><p class="small muted">Arriba se han desplegado los criterios de cada pregunta abierta. Compara tu texto y marca los que cumples: <strong id="fin-rub">0</strong> criterios marcados. Esta parte no altera la nota automática.</p>
      <div class="row mt"><button class="btn" id="fin-again">Repetir encargo</button><a class="btn ghost" href="#/m/13/final">Volver al examen final</a></div></div>`;
    $$('.rub', main).forEach(r => r.hidden = false);
    main.addEventListener('change', e => { if (e.target.dataset.r) { rub[e.target.dataset.r] = e.target.checked; $('#fin-rub', main).textContent = Object.values(rub).filter(Boolean).length; } });
    $('#fin-again', main).onclick = () => finalView(main, fid);
    $('#fin-go', main).disabled = true; $('#fin-out', main).scrollIntoView({ behavior: 'smooth' });
  };
}

// ---------- Sony A7 IV
const SPECS = [
  ['OFICIAL', 'Sensor', 'CMOS Exmor R retroiluminado de formato completo, ≈ 33 MP efectivos; procesador BIONZ XR'],
  ['OFICIAL', 'ISO', '100–51200 (foto ampliable 50–204800). S-Log: base 800, ampliable hacia abajo a 200–640'],
  ['OFICIAL', 'Vídeo 4K', 'Hasta 30p con todo el ancho (sobremuestreo 7K); 50/60p con recorte Super 35 (×1,5)'],
  ['OFICIAL', 'Vídeo HD', 'Hasta 100/120p'],
  ['OFICIAL', 'Grabación', '10 bits 4:2:2 interno; XAVC S (H.264), XAVC HS (H.265), XAVC S-I (All-Intra, hasta 600 Mb/s)'],
  ['OFICIAL', 'Perfiles', 'PP1–PP11 editables; de fábrica PP8 S-Log3/S-Gamut3.Cine, PP10 HLG2, PP11 S-Cinetone'],
  ['OFICIAL', 'Monitorización log', 'Asistente de visualización gamma. Sin carga de LUT de usuario ni modo Cine EI'],
  ['OFICIAL', 'Enfoque', '759 puntos de detección de fase (≈ 94 % de cobertura); AF de ojos humano/animal/ave en foto y vídeo'],
  ['OFICIAL', 'Ráfaga', 'Hasta 10 fps con AF/AE; menor con RAW sin comprimir o sin pérdida'],
  ['OFICIAL', 'Estabilización', '5 ejes en el cuerpo, hasta 5,5 stops (CIPA); modo Activo en vídeo con ligero recorte'],
  ['OFICIAL', 'Obturador', 'Mecánico hasta 1/8000; sincronización de flash 1/250'],
  ['OFICIAL', 'Tarjetas', 'Ranura 1: CFexpress Tipo A o SD UHS-II · Ranura 2: SD UHS-II'],
  ['PRACTICA', 'Rango dinámico medido', '12,9 stops (SNR = 2) en 4K S-Log3 ISO 800, según CineD. Sony anuncia más de 15'],
  ['PRACTICA', 'Rolling shutter medido', '26,8 ms en 4K full frame; ≈ 13 ms en Super 35, según CineD'],
  ['DEBATIDO', 'Segundo escalón de ganancia', 'Usuarios y pruebas independientes lo sitúan en torno a ISO 3200 en S-Log3. No documentado por Sony para este modelo: compruébalo']
];
const CHIP = { OFICIAL: ['b', 'Oficial'], PRACTICA: ['', 'Prueba independiente'], DEBATIDO: ['o', 'Debatido'] };
export function a7iv(main, tab = 'ficha') {
  const tabs = [['ficha', 'Ficha técnica'], ['menus', 'Mapa de menús'], ['camara', 'Cámara virtual'], ['memorias', 'Mis memorias']];
  main.innerHTML = `<span class="eyebrow">Sony A7 IV · ILCE-7M4</span><h1>Tu cámara</h1><div class="tabsbar">${tabs.map(t => `<a href="#/a7iv/${t[0]}" class="${t[0] === tab ? 'on' : ''}">${t[1]}</a>`).join('')}</div><div id="a7"></div>`;
  const el = $('#a7', main);
  if (tab === 'ficha') el.innerHTML = `<div class="tw"><table><thead><tr><th>Dato</th><th>Valor</th><th>Fuente</th></tr></thead><tbody>${SPECS.map(s => `<tr><td><strong>${s[1]}</strong></td><td>${esc(s[2])}</td><td><span class="chip ${CHIP[s[0]][0]}">${CHIP[s[0]][1]}</span></td></tr>`).join('')}</tbody></table></div>
    <p class="small muted">Las especificaciones oficiales proceden de la Guía de ayuda y de las páginas de producto de Sony; pueden variar con el firmware. <a href="#/fuentes">Ver bibliografía</a>.</p>
    <div class="grid g3 mt"><a class="tile" href="#/m/1"><span class="n">MÓDULO 1</span><h3>Dominar la Sony A7 IV</h3><p>Seis lecciones y examen.</p></a><a class="tile" href="#/m/3"><span class="n">MÓDULO 3</span><h3>S-Log3 y S-Cinetone</h3><p>Cuándo y cómo exponer cada uno.</p></a><a class="tile" href="#/m/14"><span class="n">EXTRA 14</span><h3>Gimbal, micro y filtros</h3><p>La A7 IV con el resto de tu mochila.</p></a></div>`;
  if (tab === 'menus') {
    const items = allItems();
    el.innerHTML = `<input type="text" id="mm-q" placeholder="Buscar ajuste: cebra, gamma, parpadeo, S35, audio…" aria-label="Buscar en el mapa de menús">
      <p class="small muted mt">Estructura de la Guía de ayuda en español. La redacción exacta puede variar ligeramente con el firmware; en la cámara, MENU tiene también buscador y «Mi menú». «De fábrica» indica el valor inicial documentado o habitual: tu cámara puede tener otro.</p><div id="mm-l"></div>`;
    const draw = q => {
      const f = q ? items.filter(i => (i.name + ' ' + i.note + ' ' + i.path).toLowerCase().includes(q.toLowerCase())) : null;
      $('#mm-l', el).innerHTML = f ? (f.length ? f.map(row).join('') : '<p class="muted">Sin resultados.</p>') :
        MENU.map(s => `<details class="card mb" ${s.id === 'expo' ? 'open' : ''}><summary style="cursor:pointer;font-weight:700"><span style="color:${s.color}">●</span> ${esc(s.name)} <span class="muted small">· ${s.groups.reduce((a, g) => a + g.items.length, 0)} ajustes</span></summary>${s.groups.map(g => `<span class="lbl mt">${esc(g.name)}</span>` + g.items.map(i => row({ ...i, path: '' })).join('')).join('')}</details>`).join('');
    };
    const row = i => `<div style="padding:10px 0;border-bottom:1px solid var(--line)"><div class="row sp"><strong>${esc(i.name)}</strong>${i.def !== '—' ? `<span class="chip">De fábrica: ${esc(i.def)}</span>` : ''}</div>${i.path ? `<div class="mono small muted">${esc(i.path)}</div>` : ''}${i.opts.length > 1 ? `<div class="small" style="color:var(--blue2);margin:4px 0">${i.opts.map(esc).join(' · ')}</div>` : ''}<div class="small muted">${esc(i.note)}${i.only ? ` <em>(solo ${i.only === 'video' ? 'vídeo' : 'foto'})</em>` : ''}</div></div>`;
    draw(''); $('#mm-q', el).oninput = e => draw(e.target.value.trim());
  }
  if (tab === 'camara') { el.className = 'card'; mountSim('camera', el); }
  if (tab === 'memorias') memories(el);
}
function memories(el) {
  const S = state(); let kind = 'video';
  const draw = () => {
    el.innerHTML = `<p class="muted prose">Registra aquí lo que tienes <strong>de verdad</strong> en las posiciones 1, 2 y 3 del dial, para foto y para vídeo. La app no presupone tus ajustes: los campos empiezan vacíos. Las plantillas son solo orientativas y nunca sobrescriben lo que hayas escrito sin pedírtelo.</p>
      <div class="seg mb"><button data-k="video" class="${kind === 'video' ? 'on' : ''}">Vídeo</button><button data-k="foto" class="${kind === 'foto' ? 'on' : ''}">Foto</button></div>
      <div class="grid g3">${[1, 2, 3].map(n => { const key = `${kind}-${n}`, d = S.memories[key] || {}; const filled = Object.values(d).some(v => v && v !== d._rev);
        return `<div class="card"><div class="row sp"><h3 style="margin:0">M${n} · ${kind === 'video' ? 'vídeo' : 'foto'}</h3>${d._rev ? `<span class="chip g">Revisada ${new Date(d._rev).toLocaleDateString('es-ES')}</span>` : '<span class="chip o">Sin revisar</span>'}</div>
          ${MEM_FIELDS.map(([k, l]) => `<div class="ctl" style="margin-top:10px"><label for="mem-${key}-${k}"><span>${l}</span></label><input type="text" id="mem-${key}-${k}" data-mem="${key}" data-f="${k}" value="${esc(d[k] || '')}"></div>`).join('')}
          <div class="row"><button class="btn sm" data-rev="${key}">Marcar como revisada hoy</button><button class="btn sm ghost" data-tpl="${key}">Ver plantilla orientativa</button></div><div class="small muted mt" id="tpl-${key}"></div></div>`; }).join('')}</div>
      <div class="row mt"><button class="btn sm ghost" id="mem-dl">Descargar mis memorias (.txt)</button></div>`;
  };
  el.addEventListener('input', e => { const m = e.target.dataset.mem; if (m) { (S.memories[m] = S.memories[m] || {})[e.target.dataset.f] = e.target.value; save(); } });
  el.addEventListener('click', e => {
    const k = e.target.closest('[data-k]'), r = e.target.closest('[data-rev]'), t = e.target.closest('[data-tpl]'), ap = e.target.closest('[data-apply]');
    if (k) { kind = k.dataset.k; draw(); }
    if (r) { (S.memories[r.dataset.rev] = S.memories[r.dataset.rev] || {})._rev = Date.now(); save(); draw(); toast('Memoria marcada como revisada'); }
    if (t) { const tp = MEM_TEMPLATES[t.dataset.tpl]; $('#tpl-' + t.dataset.tpl, el).innerHTML = `<strong>Plantilla orientativa (no son tus ajustes):</strong><br>${MEM_FIELDS.map(([f, l]) => `${l}: ${esc(tp[f] || '—')}`).join('<br>')}<br><button class="btn sm ghost" style="margin-top:8px" data-apply="${t.dataset.tpl}">Copiar a los campos vacíos</button>`; }
    if (ap) { const key = ap.dataset.apply, d = S.memories[key] = S.memories[key] || {}; for (const [f] of MEM_FIELDS) if (!d[f]) d[f] = MEM_TEMPLATES[key][f]; save(); draw(); toast('Plantilla copiada solo en campos vacíos'); }
    if (e.target.id === 'mem-dl') download('mis-memorias-a7iv.txt', ['video', 'foto'].flatMap(kd => [1, 2, 3].map(n => { const d = S.memories[`${kd}-${n}`] || {}; return `M${n} ${kd.toUpperCase()}\n` + MEM_FIELDS.map(([f, l]) => `  ${l}: ${d[f] || ''}`).join('\n'); })).join('\n\n'));
  });
  draw();
}

// ---------- Escenarios de luz
export function scenarios(main, id) {
  const s = SCENARIOS.find(x => x.id === id);
  if (!s) { main.innerHTML = `<span class="eyebrow">Escenarios de iluminación</span><h1>19 situaciones de luz</h1><p class="muted prose">Cada ficha responde a las mismas once preguntas. Los ajustes son puntos de partida razonables para tu A7 IV, no recetas: se comprueban siempre con cebras, medidor e histograma.</p>
    <div class="grid g3 mt">${SCENARIOS.map(x => `<a class="tile" href="#/escenarios/${x.id}" style="padding:0;overflow:hidden"><div style="height:64px;background:linear-gradient(135deg,${x.grad[0]},${x.grad[1]})"></div><div style="padding:14px"><h3 style="margin:0 0 4px">${esc(x.name)}</h3><p class="mono">EV ${esc(x.ev)}</p>${state().checks['sc:' + x.id] ? '<span class="chip g" style="margin-top:8px">Estudiado</span>' : ''}</div></a>`).join('')}</div>`; return; }
  const i = SCENARIOS.indexOf(s), nx = SCENARIOS[(i + 1) % SCENARIOS.length];
  main.innerHTML = `<div class="crumbs"><a href="#/escenarios">Escenarios</a><span>/</span><span>${i + 1} de ${SCENARIOS.length}</span></div>
    <div style="height:90px;border-radius:14px;background:linear-gradient(135deg,${s.grad[0]},${s.grad[1]});margin-bottom:16px"></div>
    <span class="eyebrow">EV orientativo (ISO 100): ${esc(s.ev)}</span><h1>${esc(s.name)}</h1>
    <div class="call MODELO"><span class="chip">No es una receta</span>Punto de partida para razonar. Mide tu escena real antes de fijar nada.</div>
    <details class="think"><summary>Antes de leer: ¿cuánta luz hay, cómo es, de qué color, parpadea y dónde está el conflicto?</summary>Respóndelo mentalmente y compara con la ficha.</details>
    ${FIELDS.map(([k, l]) => `<div class="card mb"><span class="lbl">${l}</span>${esc(s[k])}</div>`).join('')}
    <label class="row card"><input type="checkbox" data-ck="sc:${s.id}" ${state().checks['sc:' + s.id] ? 'checked' : ''}><span>Escenario estudiado</span></label>
    <div class="row sp mt"><a class="btn ghost" href="#/escenarios">Todos</a><a class="btn" href="#/escenarios/${nx.id}">Siguiente: ${esc(nx.name)} →</a></div>`;
}

// ---------- Exámenes y repaso
export function exams(main) {
  const S = state(), due = srsDue().length;
  main.innerHTML = `<span class="eyebrow">Exámenes</span><h1>Evalúa lo que sabes</h1>
    <div class="grid g2 mt"><a class="tile" href="#/repaso" style="border-color:${due ? 'var(--orange)' : 'var(--line)'}"><span class="n">REPASO ESPACIADO</span><h3>${due} preguntas pendientes</h3><p>Las falladas vuelven a los 10 min, 1 h, 4 h, 1 día, 4 días y 10 días.</p></a>
      <a class="tile" href="#/m/13/final"><span class="n">EXAMEN FINAL</span><h3>Tres encargos prácticos</h3><p>${mod(13).finals.map(f => `${f.id}: ${S.final[f.id] ? S.final[f.id].pct + ' %' : 'pendiente'}`).join(' · ')}</p></a></div>
    <h2 class="mt2">Exámenes por módulo</h2><div class="tw"><table><thead><tr><th>Módulo</th><th>Preguntas</th><th>Mejor nota</th><th></th></tr></thead><tbody>
    ${MODULES.filter(m => m.quiz.length).map(m => { const q = S.quiz[m.id]; return `<tr><td><strong>${m.id}. ${esc(m.title)}</strong></td><td>${m.quiz.length}</td><td>${q ? `<span class="chip ${q.best >= 70 ? 'g' : 'o'}">${q.best} %</span>` : '<span class="muted">—</span>'}</td><td><a class="btn sm ${q ? 'ghost' : ''}" href="#/m/${m.id}/examen">${q ? 'Repetir' : 'Empezar'}</a></td></tr>`; }).join('')}</tbody></table></div>
    <h2 class="mt2">Bajo presión</h2><a class="tile" href="#/sim/pressure"><span class="n">SIMULADOR H</span><h3>Rodajes bajo presión</h3><p>Seis incidencias con 45 segundos cada una.</p></a>
    <h2 class="mt2">Examen aleatorio global</h2><div class="card"><p>Veinte preguntas al azar de todos los módulos.</p><button class="btn" id="ex-rand">Empezar</button><div id="ex-box" class="mt"></div></div>`;
  $('#ex-rand', main).onclick = () => { const ids = Object.keys(QBANK).filter(k => !k.startsWith('H:')).sort(() => Math.random() - 0.5).slice(0, 20); runQuiz($('#ex-box', main), ids, { title: 'Global', onDone: (p, x) => { x.innerHTML = '<a class="btn ghost" href="#/progreso">Ver mi progreso</a>'; } }); };
}
export function review(main) {
  const due = srsDue(), S = state(), all = Object.values(S.srs);
  const upcoming = all.filter(c => c.due > Date.now() && c.box < 5).sort((a, b) => a.due - b.due)[0];
  main.innerHTML = `<div class="crumbs"><a href="#/examenes">Exámenes</a><span>/</span><span>Repaso</span></div><span class="eyebrow">Repetición espaciada</span><h1>Repaso</h1>
    <div class="readout">${[0, 1, 2, 3, 4, 5].map(b => `<div><b>${all.filter(c => c.box === b).length}</b><span>${['10 min', '1 hora', '4 horas', '1 día', '4 días', 'Dominadas'][b]}</span></div>`).join('')}</div><div id="rv" class="mt"></div>`;
  if (!due.length) { $('#rv', main).innerHTML = `<div class="card"><p>No hay preguntas pendientes ahora.${upcoming ? ` La próxima vence en ${Math.max(1, Math.round((upcoming.due - Date.now()) / 60000))} minutos.` : all.length ? '' : ' Haz algún examen de módulo: lo que falles aparecerá aquí.'}</p><a class="btn" href="#/examenes">Ir a exámenes</a></div>`; return; }
  runQuiz($('#rv', main), due.slice(0, 15), { title: 'Repaso', onDone: (p, x) => { x.innerHTML = '<a class="btn" href="#/repaso">Actualizar repaso</a><a class="btn ghost" href="#/">Inicio</a>'; $('a', x).onclick = e => { e.preventDefault(); review(main); }; } });
}

// ---------- Biblioteca y fuentes
export function library(main, id) {
  const t = LIBRARY.find(x => x.id === id);
  if (!t) { main.innerHTML = `<span class="eyebrow">Biblioteca avanzada</span><h1>Para seguir después del viaje</h1><p class="muted">${LIBRARY.length} temas complementarios al curso intensivo.</p>
    <div class="grid g3 mt">${LIBRARY.map((x, i) => `<a class="tile" href="#/biblioteca/${x.id}"><div class="row sp"><span class="n">${String(i + 1).padStart(2, '0')}</span>${state().checks['lib:' + x.id] ? '<span class="chip g">Leído</span>' : `<span class="small muted">${x.min} min</span>`}</div><h3>${esc(x.t)}</h3></a>`).join('')}
    <a class="tile" href="#/fuentes" style="border-color:var(--blue)"><span class="n">FUENTES</span><h3>Bibliografía y enlaces</h3><p>Descargable, con el tipo de cada fuente.</p></a></div>`; return; }
  const i = LIBRARY.indexOf(t), nx = LIBRARY[(i + 1) % LIBRARY.length];
  main.innerHTML = `<div class="crumbs"><a href="#/biblioteca">Biblioteca</a><span>/</span><span>${i + 1} de ${LIBRARY.length}</span></div><span class="eyebrow">Biblioteca avanzada · ${t.min} min</span><h1>${esc(t.t)}</h1>
    <article class="prose">${md(t.b)}</article><label class="row card mt"><input type="checkbox" data-ck="lib:${t.id}" ${state().checks['lib:' + t.id] ? 'checked' : ''}><span>Leído</span></label>
    <div class="row sp mt"><a class="btn ghost" href="#/biblioteca">Índice</a><a class="btn" href="#/biblioteca/${nx.id}">Siguiente: ${esc(nx.t)} →</a></div>`;
}
export function sources(main) {
  const txt = 'FILMMAKER ACADEMY PRO · BIBLIOGRAFÍA\n\n' + SOURCES.map(s => `[${s.k}] ${s.a}. ${s.t}.${s.u ? '\n  ' + s.u : ''}\n  ${s.n}`).join('\n\n');
  main.innerHTML = `<div class="crumbs"><a href="#/biblioteca">Biblioteca</a><span>/</span><span>Fuentes</span></div><span class="eyebrow">Bibliografía</span><h1>Fuentes y cómo se han usado</h1>
    <div class="prose">${md(`
En toda la academia, cada afirmación relevante lleva una etiqueta:

- **Especificación oficial**: documentación del fabricante.
- **Principio técnico**: física, normas o práctica establecida.
- **Consejo práctico**: recomendación de profesionales o medida independiente.
- **Opinión de usuarios**, **técnica debatida** y **preferencia estética**: nunca presentadas como regla.

> [OJO] Los enlaces solo se abren con conexión. Varias páginas (Guía de ayuda de Sony, CineD, Sony Cine) no pudieron abrirse desde el entorno en que se construyó esta app y se citan a partir de resultados de búsqueda de noviembre de 2026: contrasta las cifras críticas con el original antes de un encargo.`)}</div>
    <div class="row mb"><button class="btn sm" id="src-dl">Descargar bibliografía (.txt)</button><button class="btn sm ghost" id="src-cp">Copiar</button></div>
    ${SOURCES.map(s => `<div class="card mb"><div class="row sp"><strong>${esc(s.t)}</strong><span class="chip ${s.k.startsWith('Oficial') || s.k === 'Norma' ? 'b' : s.k === 'Comunidad' ? 'o' : ''}">${esc(s.k)}</span></div><div class="small muted">${esc(s.a)}</div><p class="small" style="margin:6px 0">${esc(s.n)}</p>${s.u ? `<a class="small" href="${esc(s.u)}" target="_blank" rel="noopener" style="word-break:break-all">${esc(s.u)}</a>` : ''}</div>`).join('')}`;
  $('#src-dl', main).onclick = () => download('filmmaker-academy-bibliografia.txt', txt); $('#src-cp', main).onclick = () => copyText(txt);
}

// ---------- Progreso
export function progress(main) {
  const S = state(), lv = level(), weak = weakTags(), mins = Math.round(S.studySec / 60), lessons = Object.keys(S.lessons).length, totalL = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  main.innerHTML = `<span class="eyebrow">Mi progreso</span><h1>${esc(lv.name)}</h1>
    <div class="grid g4"><div class="card"><span class="lbl">Experiencia</span><div class="stat">${lv.x}<small> XP</small></div></div><div class="card"><span class="lbl">Curso intensivo</span><div class="stat">${overall()}<small> %</small></div></div>
      <div class="card"><span class="lbl">Lecciones</span><div class="stat">${lessons}<small> / ${totalL}</small></div></div><div class="card"><span class="lbl">Tiempo de estudio</span><div class="stat">${Math.floor(mins / 60)}<small> h </small>${mins % 60}<small> min</small></div></div></div>
    <div class="card mt"><span class="lbl">Niveles</span>${LEVELS.map((l, i) => `<div class="row sp" style="padding:5px 0;${i === lv.i ? 'color:var(--orange);font-weight:700' : i < lv.i ? '' : 'color:var(--tx3)'}"><span>${i < lv.i ? '✓ ' : ''}${l[1]}</span><span class="mono small">${l[0]} XP</span></div>`).join('')}
      <p class="small muted mt">XP: 20 por lección, hasta 100 por examen de módulo, 30 por reto de simulador, 40 por misión real, hasta 150 por encargo final y puntos por repaso consolidado.</p></div>
    <h2 class="mt2">Recomendaciones de repaso</h2>${weak.length ? `<div class="card">${weak.map(w => `<div class="row sp" style="padding:8px 0;border-bottom:1px solid var(--line)"><div><strong>${esc(w.name)}</strong><div class="small muted">${w.ko} fallos de ${w.ok + w.ko} respuestas (${Math.round(w.rate * 100)} % de error)</div></div><a class="btn sm ghost" href="#/m/${w.mod}">Módulo ${w.mod}</a></div>`).join('')}</div>` : '<p class="muted">Todavía no hay errores registrados. Haz exámenes para que la app detecte tus puntos débiles.</p>'}
    <h2 class="mt2">Módulos</h2><div class="tw"><table><thead><tr><th>Módulo</th><th>Lecciones</th><th>Examen</th><th>Avance</th></tr></thead><tbody>${MODULES.map(m => { const p = modProgress(m); return `<tr><td><a href="#/m/${m.id}">${m.id}. ${esc(m.title)}</a></td><td>${p.done}/${p.total}</td><td>${m.finals ? mod(13).finals.map(f => S.final[f.id] ? S.final[f.id].pct + '%' : '—').join(' · ') : p.quiz != null ? p.quiz + ' %' : '—'}</td><td style="min-width:90px"><div class="bar ${p.complete ? 'g' : ''}"><i style="width:${p.pct}%"></i></div></td></tr>`; }).join('')}</tbody></table></div>
    <div class="grid g3 mt"><div class="card"><span class="lbl">Retos de simulador</span><div class="stat">${Object.keys(S.goals).length}<small> / ${GOAL_COUNT}</small></div></div><div class="card"><span class="lbl">Escenarios estudiados</span><div class="stat">${SCENARIOS.filter(s => S.checks['sc:' + s.id]).length}<small> / ${SCENARIOS.length}</small></div></div><div class="card"><span class="lbl">Misiones reales</span><div class="stat">${Object.values(S.missions).filter(m => m && m.done).length}<small> / ${MISSIONS.length}</small></div></div></div>
    <h2 class="mt2">Copia de seguridad del progreso</h2><div class="card"><p class="small muted">El progreso vive solo en este dispositivo. Exporta una copia antes del vuelo y cuando avances mucho.</p><div class="row"><button class="btn sm" id="pg-ex">Exportar progreso</button><label class="btn sm ghost">Importar<input type="file" id="pg-im" accept="application/json,.json" hidden></label><button class="btn sm ghost" id="pg-rs" style="color:var(--red)">Borrar todo</button></div></div>`;
  $('#pg-ex', main).onclick = () => download('filmmaker-academy-progreso.json', exportState(), 'application/json');
  $('#pg-im', main).onchange = async e => { try { importState(await e.target.files[0].text()); toast('Progreso importado'); progress(main); } catch (err) { toast('Archivo no válido'); } };
  $('#pg-rs', main).onclick = () => { if (confirm('¿Borrar todo el progreso de este dispositivo? No se puede deshacer.')) { reset(); progress(main); } };
}

// ---------- Chuletas y misiones
export function cheats(main) {
  main.innerHTML = `<span class="eyebrow">Chuletas rápidas</span><h1>Para consultar en rodaje</h1><p class="muted">Valores de partida. Comprueba siempre con tus instrumentos.</p><div class="grid g2 mt">${CHEATS.map(c => `<div class="card"><h3 style="margin-top:0">${esc(c.t)}</h3><div class="prose">${md(c.b)}</div></div>`).join('')}</div>`;
}
export function missions(main) {
  const S = state(), groups = [...new Set(MISSIONS.map(m => m.g))], done = MISSIONS.filter(m => S.missions[m.id] && S.missions[m.id].done).length;
  main.innerHTML = `<span class="eyebrow">Misiones reales</span><h1>Del simulador a la cámara</h1><p class="muted prose">Prácticas para hacer con tu equipo en Japón y a la vuelta. Márcalas al completarlas y anota lo que aprendas. ${done} de ${MISSIONS.length} completadas.</p>
    ${groups.map(g => `<h2 class="mt2">${esc(g)}</h2>` + MISSIONS.filter(m => m.g === g).map(m => { const st = S.missions[m.id] || {}; return `<div class="card mb"><label class="row"><input type="checkbox" data-ms="${m.id}" ${st.done ? 'checked' : ''}><strong style="flex:1">${esc(m.t)}</strong><a class="chip" href="#/m/${m.m}">Módulo ${m.m}</a></label><p class="small muted" style="margin:8px 0">${esc(m.d)}</p><textarea data-msn="${m.id}" placeholder="Notas: qué hiciste, qué aprendiste…" style="min-height:54px">${esc(st.note || '')}</textarea></div>`; }).join('')).join('')}`;
  main.onchange = e => { const k = e.target.dataset.ms; if (k) { (S.missions[k] = S.missions[k] || {}).done = e.target.checked; save(); if (e.target.checked) toast('Misión completada · +40 XP'); } };
  main.oninput = e => { const k = e.target.dataset.msn; if (k) { (S.missions[k] = S.missions[k] || {}).note = e.target.value; save(); } };
}

// ---------- Modo avión
const FLIGHT = ['Abrir la app desde el icono de la pantalla de inicio (no desde Safari)', 'Pulsar «Verificar modo avión»: 0 recursos faltantes', 'Ejecutar la prueba práctica sin conexión: todo correcto', 'Prueba real: activar modo avión, cerrar la app del todo y volver a abrirla', 'Abrir una lección, un simulador y un examen en modo avión', 'Exportar copia del progreso (Mi progreso)', 'Brillo y batería: cargador o batería externa en el equipaje de mano', 'Auriculares y una libreta para los ejercicios escritos'];
export function offline(main) {
  const list = self.FAP_PRECACHE || [], ver = self.FAP_VERSION || '?', S = state();
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  main.innerHTML = `<span class="eyebrow">Modo avión</span><h1>Estudiar sin conexión</h1>
    <p class="muted prose">Todo el contenido, las ilustraciones, los simuladores y los exámenes están en ${list.length} archivos locales. No hay vídeos ni recursos externos: nada depende de servidores durante el estudio.</p>
    <div class="readout"><div><b id="of-sw">…</b><span>Service worker</span></div><div><b>${standalone ? 'Instalada' : 'En navegador'}</b><span>Modo</span></div><div><b>${navigator.onLine ? 'Sí' : 'No'}</b><span>Conexión ahora</span></div><div><b id="of-st">…</b><span>Almacenamiento</span></div><div><b class="mono">${esc(ver)}</b><span>Versión</span></div><div><b id="of-ls">…</b><span>Guardado de progreso</span></div></div>
    <div class="card mt"><h3 style="margin-top:0">1 · Verificación de recursos</h3><p class="small muted">Comprueba uno por uno que los ${list.length} archivos están en la caché del dispositivo.</p><button class="btn warn" id="of-verify">VERIFICAR MODO AVIÓN</button> <button class="btn ghost" id="of-dl">Descargar / reparar todo</button><div id="of-res" class="mt"></div></div>
    <div class="card mt"><h3 style="margin-top:0">2 · Prueba práctica sin conexión</h3><p class="small muted">Durante unos segundos la app se niega a usar la red y vuelve a pedir todos sus archivos, además de cargar los ocho simuladores. Si algo depende de internet, fallará aquí y no en el avión.</p><button class="btn" id="of-test">Ejecutar prueba sin conexión</button><div id="of-tres" class="mt"></div></div>
    <div class="card mt"><h3 style="margin-top:0">3 · Checklist de preparación del vuelo</h3><ul class="list">${FLIGHT.map((t, i) => `<li><label><input type="checkbox" data-ck="fl:${i}" ${S.checks['fl:' + i] ? 'checked' : ''}><span>${esc(t)}</span></label></li>`).join('')}</ul></div>
    <div class="card mt"><h3 style="margin-top:0">Instalar en iPhone</h3><div class="prose">${md(`
1. Abre esta dirección en **Safari** (en otros navegadores de iOS la opción puede estar en el menú de compartir o no existir, según la versión).
2. Pulsa **Compartir** y elige **Añadir a pantalla de inicio**.
3. Abre la app **desde el icono** al menos una vez con conexión y espera a que esta pantalla indique «Activo».
4. Pulsa **Verificar modo avión** y ejecuta la prueba práctica.
5. Activa el modo avión, cierra la app deslizándola fuera y vuelve a abrirla.

> [OJO] En iOS, la app instalada tiene su **propio almacenamiento**, separado del de Safari: el progreso hecho en Safari no pasa al icono. Estudia siempre desde el icono.

> [OJO] iOS puede borrar los datos de sitios web que llevan tiempo sin usarse o cuando el dispositivo se queda sin espacio. Las apps añadidas a la pantalla de inicio están mejor protegidas que las pestañas de Safari, pero no hay garantía absoluta: abre la app y repite la verificación **el día antes y en la puerta de embarque**, y lleva una copia exportada de tu progreso.

- La app pide almacenamiento persistente al navegador; iOS puede ignorar la petición.
- Las descargas de resúmenes abren la hoja de compartir o la vista previa de iOS: usa «Guardar en Archivos». «Copiar» funciona siempre.
- El sonido de la claqueta del simulador de montaje requiere que el iPhone no esté en silencio.`)}</div>${ios && !standalone ? '<div class="call OJO"><span class="chip">Atención</span>Ahora mismo estás en el navegador, no en la app instalada.</div>' : ''}</div>`;
  // estado
  const swEl = $('#of-sw', main);
  if (!('serviceWorker' in navigator)) swEl.textContent = 'No disponible';
  else navigator.serviceWorker.getRegistration().then(r => { swEl.innerHTML = r && r.active ? (navigator.serviceWorker.controller ? '<span style="color:var(--green)">Activo</span>' : 'Activo (recarga)') : '<span style="color:var(--orange)">Instalando…</span>'; });
  $('#of-ls', main).innerHTML = saveNow() ? '<span style="color:var(--green)">Correcto</span>' : '<span style="color:var(--red)">Bloqueado</span>';
  (async () => {
    try {
      const e = await navigator.storage.estimate(); let p = false; try { p = await navigator.storage.persisted() || await navigator.storage.persist(); } catch { }
      $('#of-st', main).textContent = `${(e.usage / 1048576).toFixed(1)} MB${p ? ' · persistente' : ''}`;
    } catch { $('#of-st', main).textContent = 'n/d'; }
  })();
  const abs = u => new URL(u, location.href).href;
  async function verify() {
    const out = $('#of-res', main); out.innerHTML = '<p class="muted">Comprobando…</p>';
    if (!('caches' in window)) { out.innerHTML = '<div class="fb ko"><b>Este navegador no ofrece almacenamiento de caché.</b>La app no puede funcionar sin conexión aquí.</div>'; return false; }
    const miss = []; let bytes = 0;
    for (const u of list) { const r = await caches.match(abs(u), { ignoreSearch: true }); if (!r || !r.ok) miss.push(u); else { try { bytes += (await r.clone().blob()).size; } catch { } } }
    const ctrl = !!navigator.serviceWorker.controller;
    out.innerHTML = `<div class="fb ${!miss.length && ctrl ? 'ok' : 'ko'}"><b>${list.length - miss.length} de ${list.length} recursos guardados (${(bytes / 1048576).toFixed(2)} MB) · ${miss.length} faltan</b>
      ${!ctrl ? 'El service worker todavía no controla esta página: recárgala una vez con conexión y repite. ' : ''}${miss.length ? 'Pulsa «Descargar / reparar todo» con conexión.<br><span class="mono small">' + miss.map(esc).join('<br>') + '</span>' : ctrl ? 'Todos los recursos están en el dispositivo.' : ''}</div>`;
    S.checks.lastVerify = !miss.length && ctrl ? Date.now() : 0; save(); return !miss.length && ctrl;
  }
  $('#of-verify', main).onclick = verify;
  $('#of-dl', main).onclick = async () => {
    const out = $('#of-res', main); if (!navigator.onLine) { out.innerHTML = '<div class="fb ko"><b>Sin conexión.</b>La descarga necesita internet.</div>'; return; }
    out.innerHTML = '<p class="muted">Descargando…</p>'; const c = await caches.open('fap-' + ver); let bad = 0;
    for (const u of list) { try { const r = await fetch(abs(u), { cache: 'reload' }); if (!r.ok) throw 0; await c.put(abs(u), r); } catch { bad++; } }
    await verify(); if (bad) toast(`${bad} archivos no se pudieron descargar`);
  };
  $('#of-test', main).onclick = async () => {
    const out = $('#of-tres', main), sw = navigator.serviceWorker && navigator.serviceWorker.controller;
    if (!sw) { out.innerHTML = '<div class="fb ko"><b>No se puede ejecutar.</b>El service worker no controla la página. Recarga con conexión y vuelve.</div>'; return; }
    out.innerHTML = '<p class="muted">Bloqueando la red para esta app y probando…</p>';
    const ask = on => new Promise(res => { const ch = new MessageChannel(); ch.port1.onmessage = () => res(); sw.postMessage({ type: 'OFFLINE_TEST', on }, [ch.port2]); setTimeout(res, 1500); });
    await ask(true); const fail = []; let okN = 0;
    try {
      for (const u of list) { try { const r = await fetch(abs(u) + (u.includes('?') ? '&' : '?') + 't=' + Date.now(), { cache: 'no-store' }); r.ok ? okN++ : fail.push(u); } catch { fail.push(u); } }
      let net = 'bloqueada'; try { const r = await fetch(abs('sw.js') + '?red=' + Date.now(), { cache: 'no-store' }); if (r.ok && r.headers.get('x-fap') !== 'cache') net = 'NO bloqueada'; } catch { }
      const sims = []; const { SIMS } = await import('./sims/index.js');
      for (const s of SIMS) { try { const m = await s.load(); const d = document.createElement('div'); m.mount(d); sims.push([s.name, !!d.innerHTML]); } catch (e) { sims.push([s.name, false]); } }
      const allOk = !fail.length && sims.every(s => s[1]);
      out.innerHTML = `<div class="fb ${allOk ? 'ok' : 'ko'}"><b>${allOk ? 'Prueba superada: la app funciona sin red.' : 'Prueba no superada.'}</b>${okN} de ${list.length} archivos servidos desde el dispositivo con la red ${net}. Simuladores cargados: ${sims.filter(s => s[1]).length} de ${sims.length}.${fail.length ? '<br><span class="mono small">Fallan: ' + fail.map(esc).join(', ') + '</span>' : ''}
        <br><span class="small">Completa la comprobación con la prueba real: modo avión, cerrar la app y abrirla de nuevo.</span></div>`;
      S.checks.lastTest = allOk ? Date.now() : 0; save();
    } finally { await ask(false); }
  };
}
