// Práctica guiada para los simuladores: el reto prepara la escena, una lista en vivo marca
// cada condición, hay pistas progresivas y solución, y al terminar se explica lo aprendido.
import { esc, toast } from '../ui.js';
import { state, markGoal } from '../store.js';

// Aplica una preparación declarativa: [['#selector', valor], ['seg:nombre', valor], ['click:#selector']]
export function applyDom(root, setup) {
  for (const [k, v] of setup) {
    if (k.startsWith('seg:')) { const b = root.querySelector(`[data-seg="${k.slice(4)}"] [data-v="${v}"]`); if (b) b.click(); continue; }
    if (k.startsWith('click:')) { const b = root.querySelector(k.slice(6)); if (b) b.click(); continue; }
    const e = root.querySelector(k); if (!e) continue;
    if (e.type === 'checkbox') { if (e.checked !== !!v) { e.checked = !!v; e.dispatchEvent(new Event('change', { bubbles: true })); } continue; }
    e.value = v; e.dispatchEvent(new Event('input', { bubbles: true })); e.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

function evalChecks(g, s) {
  if (!s) return [];
  const list = typeof g.checks === 'function' ? g.checks(s) : g.checks.map(([label, fn, det]) => [label, !!fn(s), det ? det(s) : '']);
  return list.map(([label, ok, detail]) => ({ label, ok: !!ok, detail: detail || '' }));
}

export function coach(host, root, cfg) {
  const G = cfg.goals;
  let active = cfg.start && G.find(g => g.id === cfg.start) ? cfg.start : null, hints = 0, solShown = false, success = false, last = null;
  const doneN = () => G.filter(g => state().goals[g.id]).length;
  // Barra fija con el siguiente paso, visible cuando el panel del reto queda fuera de pantalla
  const mini = document.createElement('button'); mini.type = 'button'; mini.className = 'coach-mini'; mini.hidden = true;
  document.body.appendChild(mini);
  let inView = true;
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => { inView = es[0].isIntersecting; miniUpd(); }) : null;
  if (io) io.observe(host);
  mini.onclick = () => host.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const gone = () => { if (!host.isConnected) { mini.remove(); io && io.disconnect(); window.removeEventListener('hashchange', gone); return true; } return false; };
  window.addEventListener('hashchange', () => setTimeout(gone, 0));
  function miniUpd() {
    if (gone()) return;
    if (!active || success || inView || !last) { mini.hidden = true; return; }
    const r = evalChecks(G.find(x => x.id === active), last), ok = r.filter(c => c.ok).length, nx = r.find(c => !c.ok);
    mini.hidden = false;
    mini.innerHTML = `<span class="coach-mini-n">${ok}/${r.length}</span><span class="coach-mini-t">${nx ? 'Siguiente: ' + esc(nx.label) : '¡Todo listo!'}</span><span class="coach-mini-up">Ver reto ↑</span>`;
  }

  function list() {
    const any = doneN();
    host.innerHTML = `<div class="coach">
      <details class="coach-how" ${any ? '' : 'open'}><summary>Cómo se usa este simulador</summary><ol>${cfg.intro.map(t => `<li>${esc(t)}</li>`).join('')}</ol></details>
      <div class="row sp" style="margin:12px 0 8px"><span class="lbl" style="margin:0">Retos guiados</span><span class="mono small muted">${any} / ${G.length} superados</span></div>
      ${G.map((g, i) => { const d = state().goals[g.id]; return `<button type="button" class="coach-goal ${d ? 'done' : ''}" data-cg="${g.id}">
        <span class="coach-n">${d ? '✓' : i + 1}</span><span style="flex:1"><strong>${esc(g.title)}</strong><span class="small muted">${esc(g.story)}</span></span><span class="coach-go">${d ? 'Repetir' : 'Empezar'} →</span></button>`; }).join('')}
      <p class="small muted" style="margin:10px 0 0">También puedes mover los controles libremente: los retos se marcan solos si los cumples.</p></div>`;
  }
  function panel() {
    const g = G.find(x => x.id === active);
    const sol = solShown ? `<div class="coach-sol"><b>Solución</b>${esc(g.solution)}</div>` : '';
    host.innerHTML = `<div class="coach on">
      <div class="row sp"><span class="chip b">Reto ${G.indexOf(g) + 1} de ${G.length}</span><button type="button" class="btn sm ghost" data-cx="list">Todos los retos</button></div>
      <h3 style="margin:10px 0 6px">${esc(g.title)}</h3><p class="small" style="margin:0 0 10px">${esc(g.story)}</p>
      <span class="lbl">Consigue esto</span><ul class="coach-list" id="cc-list"></ul>
      <div id="cc-hint">${g.hints.slice(0, hints).map((h, i) => `<div class="coach-hint"><b>Pista ${i + 1}</b>${esc(h)}</div>`).join('')}${sol}</div>
      <div class="row" style="margin-top:10px">${hints < g.hints.length ? `<button type="button" class="btn sm ghost" data-cx="hint">💡 Pista ${hints + 1} de ${g.hints.length}</button>` : ''}${!solShown && hints >= Math.min(2, g.hints.length) ? '<button type="button" class="btn sm ghost" data-cx="sol">Ver solución</button>' : ''}<button type="button" class="btn sm ghost" data-cx="restart">Reiniciar escena</button></div></div>`;
    checks();
  }
  function checks() {
    const ul = host.querySelector('#cc-list'); if (!ul || !active) return;
    const g = G.find(x => x.id === active), r = evalChecks(g, last);
    ul.innerHTML = r.map(c => `<li class="${c.ok ? 'ok' : ''}"><span class="coach-tick">${c.ok ? '✓' : '○'}</span><span>${esc(c.label)}${c.detail ? `<span class="coach-det">${esc(c.detail)}</span>` : ''}</span></li>`).join('');
  }
  function win(g) {
    success = true; mini.hidden = true;
    const next = G.find(x => !state().goals[x.id] && x.id !== g.id) || G[(G.indexOf(g) + 1) % G.length];
    host.innerHTML = `<div class="coach on win"><span class="chip g">✓ Reto superado${solShown ? ' (con solución)' : hints ? ` (con ${hints} pista${hints > 1 ? 's' : ''})` : ''}</span>
      <h3 style="margin:10px 0 6px">${esc(g.title)}</h3><span class="lbl">Lo que acabas de aprender</span><p style="margin:0 0 12px">${esc(g.learn)}</p>
      <div class="row">${next && next.id !== g.id ? `<button type="button" class="btn sm" data-cg="${next.id}">Siguiente reto: ${esc(next.title)} →</button>` : ''}<button type="button" class="btn sm ghost" data-cx="list">Todos los retos</button></div></div>`;
  }
  function start(id) {
    active = id; hints = 0; solShown = false; success = false;
    const g = G.find(x => x.id === id);
    panel();
    (cfg.apply || (s => applyDom(root, s)))(g.setup);
    host.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  host.addEventListener('click', e => {
    const s = e.target.closest('[data-cg]'), x = e.target.closest('[data-cx]');
    if (s) start(s.dataset.cg);
    if (!x) return;
    const k = x.dataset.cx;
    if (k === 'list') { active = null; success = false; list(); miniUpd(); }
    if (k === 'hint') { hints++; panel(); }
    if (k === 'sol') { solShown = true; panel(); }
    if (k === 'restart') start(active);
  });
  active ? setTimeout(() => start(active), 0) : list();

  return {
    update(s) {
      last = s;
      for (const g of G) {
        const r = evalChecks(g, s), pass = r.length && r.every(c => c.ok);
        if (!pass) continue;
        const first = markGoal(g.id);
        if (active === g.id && !success) { if (first) toast('Reto superado · +30 XP'); win(g); }
        else if (first) { toast(`Reto «${g.title}» superado · +30 XP`); if (!active) list(); }
      }
      if (active && !success) checks();
      miniUpd();
    }
  };
}
