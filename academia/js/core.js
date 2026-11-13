// Datos agregados y piezas compartidas entre pantallas: banco de preguntas, progreso por módulo, motor de test.
import m01 from './content/m01.js'; import m02 from './content/m02.js'; import m03 from './content/m03.js';
import m04 from './content/m04.js'; import m05 from './content/m05.js'; import m06 from './content/m06.js';
import m07 from './content/m07.js'; import m08 from './content/m08.js'; import m09 from './content/m09.js';
import m10 from './content/m10.js'; import m11 from './content/m11.js'; import m12 from './content/m12.js';
import m13 from './content/m13.js'; import m14 from './content/m14.js'; import m15 from './content/m15.js';
import { INCIDENTS } from './sims/pressure.js';
import { TAG_MODULE, TAG_NAME } from './content/extras.js';
import { $, esc, md } from './ui.js';
import { mountSim } from './sims/index.js';
import { state, srsAnswer, lessonDone } from './store.js';

export const MODULES = [m01, m02, m03, m04, m05, m06, m07, m08, m09, m10, m11, m12, m13, m14, m15];
export const CORE = MODULES.filter(m => !m.extra);
export const mod = id => MODULES.find(m => m.id === +id);

// Banco de preguntas unificado: tests de módulo + incidencias del simulador H
export const QBANK = {};
for (const m of MODULES) m.quiz.forEach((q, i) => { QBANK[`${m.id}:${i}`] = { ...q, id: `${m.id}:${i}`, mod: m.id }; });
for (const inc of INCIDENTS) {
  const best = inc.o.findIndex(o => o[1] === 2);
  QBANK['H:' + inc.id] = { id: 'H:' + inc.id, q: inc.s, o: inc.o.map(o => o[0]), a: best, w: inc.o[best][2], t: inc.tag, mod: TAG_MODULE[inc.tag] || 9 };
}

export function modProgress(m) {
  const S = state(), done = m.lessons.filter(l => S.lessons[l.id]).length, q = S.quiz[m.id];
  let parts = m.lessons.length, got = done;
  if (m.quiz.length) { parts += 1; if (q && q.best >= 70) got += 1; }
  if (m.finals) { parts += m.finals.length; got += m.finals.filter(f => S.final[f.id] && S.final[f.id].pct >= 70).length; }
  return { done, total: m.lessons.length, quiz: q ? q.best : null, pct: Math.round(100 * got / parts), complete: got === parts };
}
export function overall() {
  const ps = CORE.map(modProgress); return Math.round(ps.reduce((a, p) => a + p.pct, 0) / ps.length);
}
export function nextStep() {
  for (const m of MODULES) {
    const l = m.lessons.find(x => !lessonDone(x.id));
    if (l) return { href: `#/m/${m.id}/l/${m.lessons.indexOf(l) + 1}`, label: `Módulo ${m.id} · ${l.title}`, kind: 'Lección' };
    const p = modProgress(m);
    if (m.quiz.length && (p.quiz == null || p.quiz < 70)) return { href: `#/m/${m.id}/examen`, label: `Examen del módulo ${m.id} · ${m.title}`, kind: 'Examen' };
    if (m.finals) { const f = m.finals.find(x => !(state().final[x.id] && state().final[x.id].pct >= 70)); if (f) return { href: `#/final/${f.id}`, label: `Examen final · ${f.title}`, kind: 'Examen final' }; }
  }
  return { href: '#/repaso', label: 'Curso completado: mantén el repaso espaciado', kind: 'Repaso' };
}
export function weakTags() {
  return Object.entries(state().tags).map(([t, g]) => ({ t, name: TAG_NAME[t] || t, mod: TAG_MODULE[t], ok: g.ok, ko: g.ko, rate: g.ko / (g.ok + g.ko) }))
    .filter(x => x.ko >= 1 && x.rate >= 0.3).sort((a, b) => b.rate - a.rate || b.ko - a.ko);
}

// Renderiza marcado de lección y monta los simuladores incrustados
export function renderProse(el, src) {
  el.innerHTML = md(src);
  el.querySelectorAll('[data-sim]').forEach(d => mountSim(d.dataset.sim, d));
}

// Motor de test: una pregunta cada vez, respuesta con explicación inmediata, sin elogios por fallar.
export function runQuiz(el, ids, { title = 'Examen', onDone } = {}) {
  let i = 0, ok = 0; const wrong = [];
  const order = [...ids];
  function show() {
    const q = QBANK[order[i]]; if (!q) { i++; return i < order.length ? show() : end(); }
    const opts = q.o.map((t, k) => [t, k]).sort(() => Math.random() - 0.5);
    el.innerHTML = `<div class="row sp"><span class="chip b">${esc(title)}</span><span class="mono small muted">Pregunta ${i + 1} de ${order.length}</span></div>
      <div class="bar" style="margin:10px 0 18px"><i style="width:${(i / order.length) * 100}%"></i></div>
      <div class="q"><h3>${esc(q.q)}</h3><div id="qz-o">${opts.map(([t, k]) => `<button class="opt" data-k="${k}">${esc(t)}</button>`).join('')}</div><div id="qz-f"></div></div>`;
    $('#qz-o', el).onclick = e => {
      const b = e.target.closest('.opt'); if (!b || b.disabled) return;
      const k = +b.dataset.k, right = k === q.a;
      el.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (+x.dataset.k === q.a) x.classList.add('right'); else if (x === b) x.classList.add('wrong'); });
      if (right) ok++; else wrong.push(q);
      srsAnswer(q.id, right, q.t);
      $('#qz-f', el).innerHTML = `<div class="fb ${right ? 'ok' : 'ko'}"><b>${right ? 'Correcto.' : 'Incorrecto. La respuesta correcta es: ' + esc(q.o[q.a])}</b>${esc(q.w)}${right ? '' : `<br><span class="small muted">Esta pregunta volverá a aparecer en tu repaso en unos 10 minutos.</span>`}</div>
        <button class="btn mt" id="qz-n">${i + 1 < order.length ? 'Siguiente' : 'Ver resultado'}</button>`;
      $('#qz-n', el).onclick = () => { i++; i < order.length ? show() : end(); };
      $('#qz-n', el).focus();
    };
  }
  function end() {
    const pct = order.length ? Math.round(100 * ok / order.length) : 0;
    const tags = {}; wrong.forEach(q => { tags[q.t] = (tags[q.t] || 0) + 1; });
    el.innerHTML = `<div class="card"><span class="eyebrow">Resultado</span><div class="stat">${pct}<small> % · ${ok}/${order.length}</small></div>
      <p class="mt">${pct >= 90 ? 'Dominas este bloque.' : pct >= 70 ? 'Superado. Revisa los fallos para consolidar.' : 'No superado (mínimo 70 %). Repasa las lecciones indicadas y repite el examen.'}</p>
      ${wrong.length ? `<span class="lbl mt">Errores y qué repasar</span>` + wrong.map(q => `<div class="fb ko"><b>${esc(q.q)}</b>Correcta: ${esc(q.o[q.a])}. ${esc(q.w)}<br><a href="#/m/${q.mod}">Repasar módulo ${q.mod} →</a></div>`).join('') : ''}
      <div id="qz-x" class="row mt"></div></div>`;
    onDone && onDone(pct, $('#qz-x', el), wrong);
  }
  order.length ? show() : (el.innerHTML = '<p class="muted">No hay preguntas.</p>');
}
