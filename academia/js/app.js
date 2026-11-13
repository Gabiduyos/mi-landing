// Filmmaker Academy Pro — carcasa, enrutador y pantallas de aprendizaje.
import { $, $$, esc, md, toast, download, copyText } from './ui.js';
import { state, save, saveNow, markLesson, lessonDone, setQuiz, level, srsDue, isMemOnly } from './store.js';
import { MODULES, CORE, mod, modProgress, overall, nextStep, weakTags, renderProse, runQuiz, QBANK } from './core.js';
import { SIMS, GOAL_COUNT, mountSim } from './sims/index.js';
import * as V from './views.js';

const ICON = {
  home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  book: '<path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-3a3 3 0 0 0-3 3"/><path d="M14 20a2 2 0 0 1 2-2h4V4"/>',
  sim: '<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2" fill="currentColor"/><circle cx="15" cy="12" r="2" fill="currentColor"/><circle cx="7" cy="18" r="2" fill="currentColor"/>',
  check: '<path d="M9 11l3 3 8-8"/><path d="M20 12v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h10"/>',
  more: '<circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/>'
};
const svg = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[k]}</svg>`;
const NAV = [
  ['#/', 'Dashboard', '01'], ['#/plan', 'Plan de vuelo 13 h', '02'], ['#/academia', 'Academia', '03'], ['#/sims', 'Simuladores', '04'],
  ['#/a7iv', 'Sony A7 IV', '05'], ['#/escenarios', 'Escenarios de luz', '06'], ['#/color', 'Laboratorio de color', '07'], ['#/examenes', 'Exámenes', '08'],
  ['#/biblioteca', 'Biblioteca', '09'], ['#/progreso', 'Mi progreso', '10'], ['#/chuletas', 'Chuletas rápidas', '11'], ['#/misiones', 'Misiones reales', '12'],
  ['sep'], ['#/offline', 'Modo avión', '✈']
];
const main = $('#main');

function shell() {
  const h = location.hash || '#/';
  const on = href => href === '#/' ? h === '#/' || h === '' : h.startsWith(href) || (href === '#/academia' && (h.startsWith('#/m/') || h.startsWith('#/final'))) || (href === '#/sims' && h.startsWith('#/sim/')) || (href === '#/examenes' && h.startsWith('#/repaso')) || (href === '#/biblioteca' && h.startsWith('#/fuentes'));
  $('#side').innerHTML = `<div class="brand"><i></i><div>FILMMAKER<small>ACADEMY PRO</small></div></div>` +
    NAV.map(n => n[0] === 'sep' ? '<div class="sep"></div>' : `<a href="${n[0]}" class="${on(n[0]) ? 'on' : ''}"><b>${n[2]}</b>${n[1]}</a>`).join('') +
    `<div class="rec"><span class="dot ${navigator.onLine ? '' : 'off'}"></span>${navigator.onLine ? 'CON CONEXIÓN' : 'SIN CONEXIÓN'}</div>`;
  $('#tabs').innerHTML = [['#/', 'Inicio', 'home'], ['#/academia', 'Academia', 'book'], ['#/sims', 'Simular', 'sim'], ['#/examenes', 'Exámenes', 'check']]
    .map(t => `<a href="${t[0]}" class="${on(t[0]) ? 'on' : ''}">${svg(t[2])}${t[1]}</a>`).join('') + `<button type="button" id="tab-more" aria-label="Más secciones">${svg('more')}Más</button>`;
  $('#tab-more').onclick = () => $('#side').classList.toggle('open');
}
document.addEventListener('click', e => { if (e.target.closest('#side a')) $('#side').classList.remove('open'); });

// ---------- Pantallas de aprendizaje
function dashboard() {
  const lv = level(), ov = overall(), nx = nextStep(), due = srsDue().length, weak = weakTags().slice(0, 3);
  const goals = Object.keys(state().goals).length;
  main.innerHTML = `<span class="eyebrow">Dashboard</span><h1>Aterriza en Japón razonando como un filmmaker</h1>
    <p class="muted">Curso intensivo de 13 horas, 8 simuladores, 19 escenarios de luz y biblioteca avanzada. Todo funciona sin conexión.</p>
    ${isMemOnly() ? '<div class="call OJO"><span class="chip">Atención</span>El navegador no permite guardar datos (¿navegación privada?). El progreso se perderá al cerrar.</div>' : ''}
    <a class="tile mt" href="${nx.href}" style="border-color:var(--blue)"><span class="n">CONTINUAR · ${esc(nx.kind).toUpperCase()}</span><h3>${esc(nx.label)}</h3><p>Sigue donde lo dejaste.</p></a>
    <div class="grid g4 mt">
      <div class="card"><span class="lbl">Curso intensivo</span><div class="stat">${ov}<small> %</small></div><div class="bar mt" style="margin-top:10px"><i style="width:${ov}%"></i></div></div>
      <div class="card"><span class="lbl">Nivel</span><div style="font-weight:700">${esc(lv.name)}</div><div class="mono small muted">${lv.x} XP${lv.next ? ' · siguiente a ' + lv.next : ''}</div><div class="bar o" style="margin-top:10px"><i style="width:${lv.next ? 100 * (lv.x - lv.base) / (lv.next - lv.base) : 100}%"></i></div></div>
      <a class="card tile" href="#/repaso"><span class="lbl">Repaso pendiente</span><div class="stat" style="color:${due ? 'var(--orange)' : 'inherit'}">${due}<small> preguntas</small></div></a>
      <a class="card tile" href="#/sims"><span class="lbl">Retos de simulador</span><div class="stat">${goals}<small> / ${GOAL_COUNT}</small></div></a>
    </div>
    ${weak.length ? `<div class="card mt"><span class="lbl">Tus puntos débiles ahora</span>${weak.map(w => `<div class="row sp" style="padding:6px 0"><span>${esc(w.name)} <span class="muted small">· ${w.ko} fallos de ${w.ok + w.ko}</span></span><a class="btn sm ghost" href="#/m/${w.mod}">Repasar módulo ${w.mod}</a></div>`).join('')}</div>` : ''}
    <h2 class="mt2">Módulos</h2><div class="grid g3">${MODULES.map(modTile).join('')}</div>
    <h2 class="mt2">Accesos</h2><div class="grid g3">
      <a class="tile" href="#/plan"><span class="n">02</span><h3>Plan de vuelo</h3><p>Las 13 horas, bloque a bloque, con cronómetro.</p></a>
      <a class="tile" href="#/escenarios"><span class="n">06</span><h3>Escenarios de luz</h3><p>19 situaciones con once apartados cada una.</p></a>
      <a class="tile" href="#/chuletas"><span class="n">11</span><h3>Chuletas rápidas</h3><p>Lo esencial para consultar en rodaje.</p></a>
      <a class="tile" href="#/offline" style="border-color:var(--orange)"><span class="n">✈</span><h3>Verificar modo avión</h3><p>Comprueba antes de embarcar que todo está guardado en el dispositivo.</p></a>
    </div>`;
}
function modTile(m) {
  const p = modProgress(m);
  return `<a class="tile" href="#/m/${m.id}"><div class="row sp"><span class="n">${m.extra ? 'EXTRA ' : 'MÓDULO '}${String(m.id).padStart(2, '0')}</span>${p.complete ? '<span class="chip g">Completado</span>' : p.pct ? `<span class="chip b">${p.pct} %</span>` : ''}</div>
    <h3>${esc(m.title)}</h3><p>${esc(m.goal)}</p><div class="bar ${p.complete ? 'g' : ''}" style="margin-top:12px"><i style="width:${p.pct}%"></i></div></a>`;
}
const modMins = m => m.lessons.reduce((a, l) => a + l.mins, 0);

function plan() {
  const S = state(), fs = S.flightStart, el = fs ? (Date.now() - fs) / 60000 : 0;
  const rows = CORE.map((m, i) => {
    const read = modMins(m), p = modProgress(m), sims = SIMS.filter(s => m.lessons.some(l => l.body.includes(`{{sim:${s.id}}`)));
    const quiz = m.quiz.length ? Math.round(m.quiz.length * 1.2) : 0, prac = Math.max(5, 60 - read - quiz);
    return `<tr><td class="mono">H${String(i + 1).padStart(2, '0')}</td><td><a href="#/m/${m.id}"><strong>${esc(m.title)}</strong></a><br><span class="small muted">${read} min de lecciones · ${m.finals ? '≈ 55 min de examen práctico (3 encargos)' : `${prac} min de ${sims.length ? 'simulador (' + sims.map(s => s.name).join(', ') + ') y ' : ''}casos y ejercicio · ${quiz} min de examen`}</span>${(i + 1) % 3 === 0 && i < 12 ? '<br><span class="small" style="color:var(--orange)">Después: pausa de 10 min. Levántate, agua, repaso espaciado.</span>' : ''}</td>
      <td>${p.complete ? '<span class="chip g">Hecho</span>' : `<span class="chip">${p.pct} %</span>`}</td></tr>`;
  }).join('');
  main.innerHTML = `<span class="eyebrow">Plan de vuelo</span><h1>13 horas, 13 módulos</h1>
    <p class="muted prose">Cada bloque combina lectura activa, práctica en simulador y examen. Los tiempos son orientativos: avanza a tu ritmo, la app recuerda dónde lo dejaste. No hay relleno; si terminas antes un bloque, pasa al siguiente o haz repaso.</p>
    <div class="card mt row sp"><div><span class="lbl">Cronómetro de vuelo</span><div class="stat">${fs ? `${Math.floor(el / 60)}<small> h </small>${String(Math.floor(el % 60)).padStart(2, '0')}<small> min</small>` : '—'}</div>
      <span class="small muted">${fs ? `A este ritmo deberías ir por el bloque H${String(Math.min(13, Math.floor(el / 60) + 1)).padStart(2, '0')}.` : 'Púlsalo al despegar para comparar tu avance con el plan.'}</span></div>
      <div class="row"><button class="btn" id="pl-go">${fs ? 'Reiniciar' : 'Iniciar al despegar'}</button>${fs ? '<button class="btn ghost" id="pl-stop">Parar</button>' : ''}</div></div>
    <div class="tw mt"><table><thead><tr><th>Hora</th><th>Bloque</th><th>Estado</th></tr></thead><tbody>${rows}</tbody></table></div>
    <h2 class="mt2">Método de estudio</h2><div class="prose">${md(`
- **Lee con el simulador abierto.** Cada concepto, compruébalo moviendo un control.
- **Responde antes de abrir** los recuadros «Piensa antes de abrir».
- **Examen al terminar cada módulo.** Necesitas un 70 % para darlo por superado.
- **Repaso espaciado:** las preguntas falladas vuelven a los 10 minutos, a la hora y a las 4 horas. Haz el repaso en cada pausa.
- **Cada tres módulos, pausa.** El rendimiento cae sin descansos; trece horas seguidas no son trece horas de aprendizaje.
- **Si te sobra tiempo:** módulos extra 14 (tu equipo DJI) y 15 (rodar en Japón), y la biblioteca avanzada.
- **Duerme algo.** Cruzarás muchos husos: un bloque de sueño a mitad de vuelo consolida lo estudiado.`)}</div>
    <h2 class="mt2">Extras opcionales</h2><div class="grid g2">${MODULES.filter(m => m.extra).map(modTile).join('')}</div>`;
  $('#pl-go').onclick = () => { state().flightStart = Date.now(); save(); plan(); };
  const st = $('#pl-stop'); if (st) st.onclick = () => { state().flightStart = null; save(); plan(); };
}

function academia() {
  main.innerHTML = `<span class="eyebrow">Academia</span><h1>Curso intensivo</h1><p class="muted">Trece módulos de una hora y dos extras. Cada uno: lecciones, casos reales, errores habituales, ejercicio, checklist, resumen descargable y examen.</p>
    <div class="grid g3 mt">${CORE.map(modTile).join('')}</div><h2 class="mt2">Módulos extra</h2><p class="muted">Añadidos porque tu mochila y tu destino lo piden.</p><div class="grid g3">${MODULES.filter(m => m.extra).map(modTile).join('')}</div>`;
}

function summaryText(m) {
  return `FILMMAKER ACADEMY PRO\nMódulo ${m.id} · ${m.title}\n${'='.repeat(40)}\n\nOBJETIVO\n${m.goal}\n\nRESUMEN\n${m.summary.map(s => '• ' + s).join('\n')}\n\n` +
    (m.errors.length ? `ERRORES HABITUALES\n${m.errors.map(s => '✕ ' + s).join('\n')}\n\n` : '') + `CHECKLIST DE RODAJE\n${m.checklist.map(s => '☐ ' + s).join('\n')}\n`;
}

function moduleView(id, tab = 'lecciones') {
  const m = mod(id); if (!m) return notFound();
  const p = modProgress(m), S = state();
  const tabs = [['lecciones', 'Lecciones'], ...(m.dialogs ? [['conversaciones', 'Conversaciones']] : []), ...(m.cases.length ? [['casos', 'Casos reales']] : []), ...(m.errors.length ? [['errores', 'Errores habituales']] : []), ['ejercicio', 'Ejercicio'], ['checklist', 'Checklist'], ['resumen', 'Resumen'], [m.finals ? 'final' : 'test', m.finals ? 'Examen final' : 'Examen']];
  let body = '';
  if (tab === 'lecciones') body = `<ul class="list card">${m.lessons.map((l, i) => `<li><a href="#/m/${m.id}/l/${i + 1}"><span class="mono ${lessonDone(l.id) ? 'ok' : 'muted'}">${lessonDone(l.id) ? '✓' : l.id}</span><span style="flex:1">${esc(l.title)}</span><span class="small muted">${l.mins} min</span></a></li>`).join('')}</ul>`;
  if (tab === 'conversaciones') body = `<p class="muted">Conversaciones simuladas con respuestas que tienen consecuencias. Busca el mejor final en cada una.</p><div class="grid g2">${m.dialogs.map(d => `<a class="tile" href="#/m/${m.id}/d/${d.id}"><span class="n">SIMULACIÓN</span><h3>${esc(d.title)}</h3><p>${esc(d.who)}</p>${S.checks['dlg:' + d.id] ? '<span class="chip g" style="margin-top:8px">Mejor final conseguido</span>' : ''}</a>`).join('')}</div>`;
  if (tab === 'casos') body = m.cases.map(c => `<div class="card mb"><h3 style="margin-top:0">${esc(c.t)}</h3><div class="prose">${md(c.b)}</div></div>`).join('');
  if (tab === 'errores') body = `<div class="card"><ul class="list">${m.errors.map(e => `<li><div style="padding:10px 4px"><span style="color:var(--orange)">✕</span> ${esc(e)}</div></li>`).join('')}</ul></div>`;
  if (tab === 'ejercicio') body = `<div class="card"><h3 style="margin-top:0">${esc(m.exercise.title)}</h3><ul class="list">${m.exercise.steps.map((s, i) => { const k = `ex:${m.id}:${i}`; return `<li><label><input type="checkbox" data-ck="${k}" ${S.checks[k] ? 'checked' : ''}><span>${esc(s)}</span></label></li>`; }).join('')}</ul><p class="mt"><strong>Entregable:</strong> ${esc(m.exercise.deliver)}</p>
      <span class="lbl mt">Tus notas (se guardan en el dispositivo)</span><textarea data-note="ex:${m.id}" placeholder="Escribe aquí tu respuesta o tus conclusiones…">${esc(S.notes['ex:' + m.id] || '')}</textarea></div>`;
  if (tab === 'checklist') body = `<div class="card"><ul class="list">${m.checklist.map((s, i) => { const k = `cl:${m.id}:${i}`; return `<li><label><input type="checkbox" data-ck="${k}" ${S.checks[k] ? 'checked' : ''}><span>${esc(s)}</span></label></li>`; }).join('')}</ul><button class="btn sm ghost mt" id="cl-reset">Desmarcar todo (nuevo rodaje)</button></div>`;
  if (tab === 'resumen') body = `<div class="card"><ul class="prose">${m.summary.map(s => `<li>${esc(s)}</li>`).join('')}</ul><div class="row mt"><button class="btn sm" id="sm-dl">Descargar resumen (.txt)</button><button class="btn sm ghost" id="sm-cp">Copiar</button><button class="btn sm ghost" id="sm-sh">Compartir</button><button class="btn sm ghost" onclick="print()">Imprimir / PDF</button></div><p class="small muted mt">Incluye objetivo, resumen, errores habituales y checklist. Se genera en tu dispositivo, sin conexión.</p></div>`;
  if (tab === 'test') body = `<div class="card"><p>${m.quiz.length} preguntas con explicación inmediata. Se supera con un 70 %. Las falladas pasan al repaso espaciado.</p><p class="mono small muted">${p.quiz != null ? `Mejor nota: ${p.quiz} % · intentos: ${S.quiz[m.id].tries}` : 'Aún no lo has hecho.'}</p><a class="btn" href="#/m/${m.id}/examen">${p.quiz != null ? 'Repetir examen' : 'Empezar examen'}</a></div>`;
  if (tab === 'final') body = `<div class="grid g3">${m.finals.map(f => { const r = S.final[f.id]; return `<a class="tile" href="#/final/${f.id}"><span class="n">ENCARGO</span><h3>${esc(f.title)}</h3><p>${esc(f.brief.slice(0, 120))}…</p>${r ? `<span class="chip ${r.pct >= 70 ? 'g' : 'o'}" style="margin-top:8px">Mejor: ${r.pct} %</span>` : ''}</a>`; }).join('')}</div>`;
  main.innerHTML = `<div class="crumbs"><a href="#/academia">Academia</a><span>/</span><span>Módulo ${m.id}</span></div>
    <span class="eyebrow">${m.extra ? 'Módulo extra' : 'Módulo'} ${String(m.id).padStart(2, '0')} · ≈ 60 min</span><h1>${esc(m.title)}</h1><p class="muted prose">${esc(m.goal)}</p>
    <div class="bar ${p.complete ? 'g' : ''}"><i style="width:${p.pct}%"></i></div>
    <div class="tabsbar">${tabs.map(t => `<a href="#/m/${m.id}/${t[0]}" class="${t[0] === tab ? 'on' : ''}">${t[1]}</a>`).join('')}</div>${body}`;
  const dl = $('#sm-dl'); if (dl) { dl.onclick = () => download(`modulo-${m.id}-resumen.txt`, summaryText(m)); $('#sm-cp').onclick = () => copyText(summaryText(m)); $('#sm-sh').onclick = () => navigator.share ? navigator.share({ title: m.title, text: summaryText(m) }).catch(() => { }) : copyText(summaryText(m)); }
  const cr = $('#cl-reset'); if (cr) cr.onclick = () => { m.checklist.forEach((_, i) => delete state().checks[`cl:${m.id}:${i}`]); save(); moduleView(id, 'checklist'); };
}

function lessonView(id, n) {
  const m = mod(id), l = m && m.lessons[n - 1]; if (!l) return notFound();
  const prev = n > 1 ? `#/m/${m.id}/l/${n - 1}` : `#/m/${m.id}`, last = n === m.lessons.length;
  const next = !last ? `#/m/${m.id}/l/${n + 1}` : m.finals ? `#/m/${m.id}/final` : m.quiz.length ? `#/m/${m.id}/examen` : `#/m/${m.id}`;
  main.innerHTML = `<div class="crumbs"><a href="#/academia">Academia</a><span>/</span><a href="#/m/${m.id}">Módulo ${m.id}</a><span>/</span><span>${l.id}</span></div>
    <span class="eyebrow">Lección ${l.id} · ${l.mins} min${lessonDone(l.id) ? ' · completada' : ''}</span><h1>${esc(l.title)}</h1>
    <div class="bar" style="margin-bottom:22px"><i style="width:${(n / m.lessons.length) * 100}%"></i></div>
    <article class="prose" id="ls-body" style="max-width:none"></article>
    <div class="row sp mt2"><a class="btn ghost" href="${prev}">← Anterior</a><button class="btn" id="ls-next">${last ? (m.finals ? 'Terminar e ir al examen final →' : m.quiz.length ? 'Terminar e ir al examen →' : 'Terminar módulo') : 'Completar y seguir →'}</button></div>`;
  renderProse($('#ls-body'), l.body);
  $$('#ls-body > p, #ls-body > ul, #ls-body > ol, #ls-body > h3, #ls-body > h4, #ls-body > .call, #ls-body > details, #ls-body > .tw, #ls-body > figure').forEach(e => e.style.maxWidth = '74ch');
  $('#ls-next').onclick = () => { markLesson(l.id); location.hash = next; };
}

function quizView(id) {
  const m = mod(id); if (!m || !m.quiz.length) return notFound();
  main.innerHTML = `<div class="crumbs"><a href="#/m/${m.id}">Módulo ${m.id}</a><span>/</span><span>Examen</span></div><h1>Examen · ${esc(m.title)}</h1><div id="qz" class="mt"></div>`;
  runQuiz($('#qz'), m.quiz.map((_, i) => `${m.id}:${i}`), { title: `Módulo ${m.id}`, onDone: (pct, x) => {
    setQuiz(m.id, pct); const nx = nextStep();
    x.innerHTML = `<a class="btn ghost" href="#/m/${m.id}/examen" id="qz-again">Repetir</a><a class="btn" href="${pct >= 70 ? nx.href : '#/m/' + m.id}">${pct >= 70 ? 'Continuar: ' + esc(nx.label) : 'Volver al módulo'}</a>`;
    $('#qz-again').onclick = e => { e.preventDefault(); quizView(id); };
  } });
}

function dialogView(id, did) {
  const m = mod(id), d = m && m.dialogs && m.dialogs.find(x => x.id === did); if (!d) return notFound();
  let pts = 0, max = 0; const log = [];
  main.innerHTML = `<div class="crumbs"><a href="#/m/${m.id}/conversaciones">Módulo ${m.id} · Conversaciones</a></div><span class="eyebrow">Conversación simulada</span><h1>${esc(d.title)}</h1><p class="muted">${esc(d.who)}</p><div id="dg" class="mt" style="max-width:70ch"></div>`;
  const box = $('#dg');
  function step(k) {
    const n = d.nodes[k];
    if (n.end) {
      const best = pts === max;
      if (best) { state().checks['dlg:' + d.id] = true; save(); }
      box.innerHTML = log.join('') + `<div class="card mb"><strong>${esc(n.say)}</strong></div><div class="fb ${best ? 'ok' : 'ko'}"><b>${pts} de ${max} puntos.</b>${best ? 'Has llevado la conversación por el mejor camino.' : 'Hay decisiones mejorables: revisa las explicaciones en naranja y vuelve a intentarlo.'}</div><div class="row mt"><button class="btn" id="dg-r">Repetir conversación</button><a class="btn ghost" href="#/m/${m.id}/conversaciones">Volver</a></div>`;
      $('#dg-r').onclick = () => dialogView(id, did); return;
    }
    const opts = n.opts.map((o, i) => [o, i]).sort(() => Math.random() - 0.5);
    box.innerHTML = log.join('') + `<div class="card mb"><span class="lbl">${esc(d.who.split(',')[0])}</span>${esc(n.say)}</div><span class="lbl">Tu respuesta</span>${opts.map(([o, i]) => `<button class="opt" data-i="${i}">${esc(o[0])}</button>`).join('')}`;
    box.onclick = e => {
      const b = e.target.closest('.opt'); if (!b) return; const o = n.opts[+b.dataset.i];
      pts += o[2]; max += 2;
      log.push(`<div class="card mb" style="opacity:.8"><span class="lbl">${esc(d.who.split(',')[0])}</span>${esc(n.say)}</div><div class="fb ${o[2] === 2 ? 'ok' : 'ko'}" style="margin:0 0 14px 24px"><b>Tú: ${esc(o[0])}</b>${o[2] === 2 ? '' : o[2] === 1 ? 'Aceptable, no óptimo. ' : 'Mala decisión. '}${esc(o[3])}</div>`);
      box.onclick = null; step(o[1]); window.scrollTo(0, document.body.scrollHeight);
    };
  }
  step(d.start);
}

function simsView() {
  const G = state().goals;
  main.innerHTML = `<span class="eyebrow">Simuladores</span><h1>Ocho simuladores funcionales</h1><p class="muted prose">Cada uno indica qué parte es cálculo real y qué parte es un modelo didáctico. Los retos se verifican con el estado real del simulador.</p>
    <div class="grid g3 mt">${SIMS.map(s => { const n = Object.keys(G).filter(k => k[0] === s.l).length; return `<a class="tile" href="#/sim/${s.id}"><div class="row sp"><span class="n">SIMULADOR ${s.l}</span>${n ? `<span class="chip g">${n} retos</span>` : ''}</div><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p></a>`; }).join('')}</div>`;
}
function simView(id) {
  const s = SIMS.find(x => x.id === id); if (!s) return notFound();
  main.innerHTML = `<div class="crumbs"><a href="#/sims">Simuladores</a><span>/</span><span>${s.l}</span></div><span class="eyebrow">Simulador ${s.l}</span><h1>${esc(s.name)}</h1><p class="muted">${esc(s.desc)}</p><div id="sim" class="card mt"></div>`;
  mountSim(id, $('#sim'));
}
function colorLab() {
  main.innerHTML = `<span class="eyebrow">Laboratorio de color</span><h1>Corrige, iguala y crea un look</h1><p class="muted prose">Trabaja en orden: transformación técnica, corrección primaria y, solo después, el look. Mira los scopes antes que la imagen.</p>
    <div id="sim" class="card mt"></div>
    <div class="grid g3 mt"><a class="tile" href="#/m/11"><span class="n">MÓDULO 11</span><h3>Color profesional</h3><p>Scopes, gestión de color en Resolve, igualado y look.</p></a>
    <a class="tile" href="#/sim/slog"><span class="n">SIMULADOR B</span><h3>S-Log3</h3><p>La señal antes de llegar al color.</p></a>
    <a class="tile" href="#/biblioteca/colorcamaras"><span class="n">BIBLIOTECA</span><h3>Gestión de color entre cámaras</h3><p>A7 IV, Pocket 3 y Mini 2 en un mismo proyecto.</p></a></div>`;
  mountSim('color', $('#sim'));
}
export function notFound() { main.innerHTML = `<h1>Pantalla no encontrada</h1><p><a class="btn" href="#/">Volver al inicio</a></p>`; }

// ---------- Enrutador
const routes = [
  [/^#?\/?$/, dashboard], [/^#\/plan$/, plan], [/^#\/academia$/, academia],
  [/^#\/m\/(\d+)$/, id => moduleView(id)], [/^#\/m\/(\d+)\/l\/(\d+)$/, (id, n) => lessonView(id, +n)], [/^#\/m\/(\d+)\/examen$/, quizView],
  [/^#\/m\/(\d+)\/d\/(\w+)$/, dialogView], [/^#\/m\/(\d+)\/(\w+)$/, (id, t) => moduleView(id, t)],
  [/^#\/sims$/, simsView], [/^#\/sim\/(\w+)$/, simView], [/^#\/color$/, colorLab],
  [/^#\/final\/(\w)$/, id => V.finalView(main, id)], [/^#\/a7iv(?:\/(\w+))?$/, t => V.a7iv(main, t)],
  [/^#\/escenarios(?:\/(\w+))?$/, id => V.scenarios(main, id)], [/^#\/examenes$/, () => V.exams(main)], [/^#\/repaso$/, () => V.review(main)],
  [/^#\/biblioteca(?:\/(\w+))?$/, id => V.library(main, id)], [/^#\/fuentes$/, () => V.sources(main)], [/^#\/progreso$/, () => V.progress(main)],
  [/^#\/chuletas$/, () => V.cheats(main)], [/^#\/misiones$/, () => V.missions(main)], [/^#\/offline$/, () => V.offline(main)]
];
function route() {
  const h = location.hash || '#/';
  shell();
  for (const [re, fn] of routes) { const m = h.match(re); if (m) { try { fn(...m.slice(1)); } catch (e) { console.error(e); main.innerHTML = `<h1>Error al mostrar la pantalla</h1><pre class="small">${esc(e.stack || e)}</pre>`; } break; } }
  if (!main.innerHTML) notFound();
  if (!/^#\/(offline)?$/.test(h)) { state().last = h; save(); }
  window.scrollTo(0, 0); main.focus({ preventScroll: true });
}
// Persistencia genérica de casillas y notas
document.addEventListener('change', e => {
  const k = e.target.dataset && e.target.dataset.ck; if (k) { e.target.checked ? state().checks[k] = true : delete state().checks[k]; save(); }
});
document.addEventListener('input', e => { const k = e.target.dataset && e.target.dataset.note; if (k) { state().notes[k] = e.target.value; save(); } });
window.addEventListener('hashchange', route);
// iOS puede cerrar la app sin aviso: guardar al pasar a segundo plano
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') saveNow(); });
window.addEventListener('pagehide', saveNow);
window.addEventListener('online', shell); window.addEventListener('offline', shell);

// Tiempo de estudio (solo con la pestaña visible)
setInterval(() => { if (document.visibilityState === 'visible') { state().studySec += 15; save(); } }, 15000);

// Service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(reg => {
    reg.addEventListener('updatefound', () => { const w = reg.installing; w && w.addEventListener('statechange', () => { if (w.state === 'activated' && navigator.serviceWorker.controller) toast('Academia actualizada y guardada para uso sin conexión'); }); });
  }).catch(e => console.warn('SW no registrado', e));
}
route();
