// Estado persistente local (localStorage). Sin servidores: todo vive en el dispositivo.
const KEY = 'fap.state.v1';
const blank = () => ({
  v: 1, lessons: {}, quiz: {}, srs: {}, tags: {}, checks: {}, goals: {}, memories: {}, missions: {},
  notes: {}, final: {}, last: null, flightStart: null, studySec: 0, created: Date.now()
});

let S = blank();
let memOnly = false;
try {
  const raw = localStorage.getItem(KEY);
  if (raw) S = Object.assign(blank(), JSON.parse(raw));
} catch { memOnly = true; }

let t;
export function save() {
  clearTimeout(t);
  t = setTimeout(() => {
    try { localStorage.setItem(KEY, JSON.stringify(S)); memOnly = false; } catch { memOnly = true; }
  }, 120);
}
export function saveNow() { try { localStorage.setItem(KEY, JSON.stringify(S)); return true; } catch { return false; } }
export const state = () => S;
export const isMemOnly = () => memOnly;
export function reset() { S = blank(); saveNow(); }
export function exportState() { return JSON.stringify(S, null, 2); }
export function importState(json) {
  const o = JSON.parse(json);
  if (!o || o.v !== 1) throw new Error('Formato no reconocido');
  S = Object.assign(blank(), o); saveNow();
}

// ---- Lecciones
export function markLesson(id) { if (!S.lessons[id]) { S.lessons[id] = Date.now(); save(); } }
export const lessonDone = id => !!S.lessons[id];

// ---- Retos de simulador
export function markGoal(id) { if (!S.goals[id]) { S.goals[id] = Date.now(); save(); return true; } return false; }

// ---- Repetición espaciada (cajas de Leitner con intervalos pensados para un vuelo)
// caja 0: 10 min · 1: 1 h · 2: 4 h · 3: 1 día · 4: 4 días · 5: 10 días
export const SRS_STEPS = [10, 60, 240, 1440, 5760, 14400].map(m => m * 60000);
export function srsAnswer(qid, ok, tag) {
  const c = S.srs[qid] || { box: 0, due: 0, seen: 0, wrong: 0 };
  c.seen++;
  if (ok) c.box = Math.min(5, c.box + 1); else { c.box = 0; c.wrong++; }
  c.due = Date.now() + SRS_STEPS[c.box];
  S.srs[qid] = c;
  if (tag) {
    const g = S.tags[tag] || { ok: 0, ko: 0 };
    ok ? g.ok++ : g.ko++; S.tags[tag] = g;
  }
  save();
}
export function srsDue(now = Date.now()) {
  return Object.entries(S.srs).filter(([, c]) => c.due <= now && c.box < 5).sort((a, b) => a[1].due - b[1].due).map(([id]) => id);
}

export function setQuiz(mod, pct) {
  const q = S.quiz[mod] || { best: 0, tries: 0 };
  q.tries++; q.best = Math.max(q.best, pct); q.last = pct; q.at = Date.now();
  S.quiz[mod] = q; save();
}

// ---- Niveles
export const LEVELS = [
  [0, 'Meritorio de cámara'], [150, 'Auxiliar de cámara'], [400, 'Foquista'], [800, 'Operador de cámara'],
  [1300, 'Director de fotografía júnior'], [1900, 'Director de fotografía'], [2600, 'Filmmaker profesional']
];
export function xp() {
  let x = Object.keys(S.lessons).length * 20;
  for (const q of Object.values(S.quiz)) x += Math.round(q.best);
  x += Object.keys(S.goals).length * 30;
  x += Object.values(S.missions).filter(m => m && m.done).length * 40;
  for (const f of Object.values(S.final)) x += Math.round((f.pct || 0) * 1.5);
  x += Object.values(S.srs).reduce((a, c) => a + c.box * 3, 0);
  return x;
}
export function level() {
  const x = xp(); let i = 0;
  while (i + 1 < LEVELS.length && x >= LEVELS[i + 1][0]) i++;
  const next = LEVELS[i + 1];
  return { x, i, name: LEVELS[i][1], next: next ? next[0] : null, nextName: next ? next[1] : null, base: LEVELS[i][0] };
}
