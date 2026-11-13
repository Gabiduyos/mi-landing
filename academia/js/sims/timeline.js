// SIMULADOR F — Montaje. Línea de tiempo simplificada con evaluación por reglas explícitas.
// Las reglas son convenciones de montaje útiles, no leyes: el informe explica cada una.
import { $, $$, esc, goalsHTML, toast } from '../ui.js';
import { state, markGoal } from '../store.js';

const COL = { PG: '#2a5d8f', PM: '#3d7a5a', PP: '#a8552a', PD: '#7a4a9c' };
const SZ = { PG: 'General', PM: 'Medio', PP: 'Primer plano', PD: 'Detalle' };
const PROJECTS = {
  F1: {
    name: 'Reel HYROX · 15–20 s · 120 BPM', beat: 0.5, min: 15, max: 20,
    brief: 'Reel vertical para el Instagram del gimnasio organizador. Tiene que parar el pulgar en el primer segundo, enseñar el ambiente y terminar con un cierre claro.',
    clips: [
      { id: 'a', n: 'Cara de esfuerzo extremo, sudor', z: 'PP', r: 'gancho', s: 'atleta', d: 1.5 },
      { id: 'b', n: 'Nave completa con público', z: 'PG', r: 'contexto', s: 'sala', d: 2 },
      { id: 'c', n: 'Manos agarran el trineo', z: 'PD', r: 'accion', s: 'trineo', d: 1 },
      { id: 'd', n: 'Empuje de trineo, lateral', z: 'PM', r: 'accion', s: 'atleta', d: 2 },
      { id: 'e', n: 'Zapatillas corriendo (50p)', z: 'PD', r: 'accion', s: 'pies', d: 1.5 },
      { id: 'f', n: 'Wall balls, contrapicado', z: 'PM', r: 'accion', s: 'atleta2', d: 2 },
      { id: 'g', n: 'Público animando', z: 'PM', r: 'reaccion', s: 'publico', d: 1.5 },
      { id: 'h', n: 'Cruza la meta, brazos arriba (50p)', z: 'PG', r: 'climax', s: 'atleta', d: 2.5 },
      { id: 'i', n: 'Abrazo con compañero', z: 'PP', r: 'cierre', s: 'atleta', d: 2 },
      { id: 'j', n: 'Cronómetro de meta', z: 'PD', r: 'detalle', s: 'crono', d: 1 },
      { id: 'k', n: 'Atleta calentando, medio', z: 'PM', r: 'contexto', s: 'atleta', d: 2 }
    ],
    rules: ['dur', 'hook', 'close', 'jump', 'beat', 'sizes', 'climaxLate', 'context']
  },
  F2: {
    name: 'Testimonio de socio · 25–35 s', beat: 0.5, min: 25, max: 35,
    brief: 'Vídeo para la web de un gimnasio. Un socio cuenta su cambio. Debes ordenar las frases para que haya historia y cubrir los cortes de la entrevista con recursos.',
    clips: [
      { id: 'a', n: '«Perdí 20 kilos y recuperé mi vida»', z: 'PM', r: 'gancho', s: 'busto', d: 4, o: 0 },
      { id: 'b', n: '«Hace un año no subía una escalera»', z: 'PM', r: 'problema', s: 'busto', d: 5, o: 1 },
      { id: 'c', n: 'Recurso: entra al gimnasio', z: 'PG', r: 'recurso', s: 'broll1', d: 3 },
      { id: 'd', n: '«Aquí me hicieron un plan a medida»', z: 'PP', r: 'metodo', s: 'busto', d: 5, o: 2 },
      { id: 'e', n: 'Recurso: entrenadora corrige postura', z: 'PM', r: 'recurso', s: 'broll2', d: 3 },
      { id: 'f', n: 'Recurso: manos con magnesio', z: 'PD', r: 'recurso', s: 'broll3', d: 2 },
      { id: 'g', n: '«Ahora entreno cuatro días y disfruto»', z: 'PM', r: 'resultado', s: 'busto', d: 5, o: 3 },
      { id: 'h', n: '«Si yo pude, tú también. Ven a probar»', z: 'PP', r: 'cierre', s: 'busto', d: 4, o: 4 },
      { id: 'i', n: 'Recurso: sonríe tras levantar', z: 'PP', r: 'recurso', s: 'broll4', d: 2.5 }
    ],
    rules: ['dur', 'hook', 'close', 'order', 'jumpTalk', 'broll']
  },
  F3: {
    name: 'Estribillo de videoclip · 12–16 s · 140 BPM', beat: 60 / 140, min: 12, max: 16,
    brief: 'Último estribillo de un videoclip nocturno. La energía debe crecer: los planos se acortan hacia el final y alternan interpretación (playback) con narrativa.',
    clips: [
      { id: 'a', n: 'Playback, medio, neón rojo', z: 'PM', r: 'playback', s: 'cant', d: 3 },
      { id: 'b', n: 'Playback, primer plano, mirada a cámara', z: 'PP', r: 'playback', s: 'cant', d: 2 },
      { id: 'c', n: 'Narrativa: corre por el callejón', z: 'PG', r: 'narrativa', s: 'calle', d: 2.5 },
      { id: 'd', n: 'Narrativa: mano suelta el móvil', z: 'PD', r: 'narrativa', s: 'movil', d: 1 },
      { id: 'e', n: 'Playback, general con coche', z: 'PG', r: 'playback', s: 'cant', d: 2.5 },
      { id: 'f', n: 'Detalle: boca al micro', z: 'PD', r: 'playback', s: 'boca', d: 0.85 },
      { id: 'g', n: 'Narrativa: se gira bajo la lluvia', z: 'PP', r: 'narrativa', s: 'calle', d: 1.7 },
      { id: 'h', n: 'Destello de farola (transición)', z: 'PD', r: 'recurso', s: 'luz', d: 0.43 },
      { id: 'i', n: 'Final: se aleja de espaldas', z: 'PG', r: 'cierre', s: 'calle', d: 2.5 }
    ],
    rules: ['dur', 'close', 'jump', 'beat', 'accel', 'alternate', 'sizes']
  }
};
const GOALS = [
  { id: 'F1', text: 'Reel HYROX: consigue al menos un 85 % en la evaluación.' },
  { id: 'F2', text: 'Testimonio: ordena la historia y cubre los cortes (85 % o más).' },
  { id: 'F3', text: 'Estribillo: ritmo creciente y cortes a tiempo (85 % o más).' }
];

const RULES = {
  dur: (t, P, tot) => [tot >= P.min - 0.01 && tot <= P.max + 0.01, `Duración total ${tot.toFixed(1)} s (objetivo ${P.min}–${P.max} s).`, 'Un encargo con duración pactada se cumple: las plataformas y el cliente cuentan los segundos.'],
  hook: t => [t[0] && t[0].r === 'gancho', 'El primer plano es el gancho.', 'En redes, el primer segundo decide si siguen mirando: abre con la imagen o la frase más fuerte, no con un plano de situación tranquilo.'],
  close: t => [t.length && t[t.length - 1].r === 'cierre', 'El último plano funciona como cierre.', 'Termina con resolución (emoción, llamada a la acción o salida) para que el final no parezca un corte accidental.'],
  jump: t => { const bad = t.findIndex((c, i) => i && c.z === t[i - 1].z && c.s === t[i - 1].s); return [bad < 0, 'Sin saltos de eje de tamaño (mismo sujeto y mismo tamaño seguidos).', bad < 0 ? '' : `Los planos ${bad} y ${bad + 1} muestran al mismo sujeto con el mismo tamaño: se percibe como un salto (jump cut). Cambia tamaño o ángulo de forma clara, o intercala otro plano. Puede usarse a propósito como recurso de estilo, pero entonces debe verse deliberado.`]; },
  jumpTalk: t => { const bad = t.findIndex((c, i) => i && c.s === 'busto' && t[i - 1].s === 'busto' && c.z === t[i - 1].z); return [bad < 0, 'No hay dos frases de entrevista seguidas con el mismo encuadre.', 'Dos cortes de la misma entrevista con igual encuadre saltan. Soluciones: recurso encima, cambiar a la segunda cámara/tamaño o un punch-in claro (≥ 20 %).']; },
  beat: (t, P) => { let acc = 0, on = 0; t.slice(0, -1).forEach(c => { acc += c.d; const k = acc / P.beat; if (Math.abs(k - Math.round(k)) < 0.04) on++; }); const n = Math.max(1, t.length - 1), pct = on / n; return [pct >= 0.7, `${on} de ${n} cortes caen sobre un pulso de la música.`, 'Cortar a tiempo da sensación de control. No hace falta que TODOS caigan en el pulso: adelantar algún corte un par de fotogramas o cortar con la acción también funciona, pero la mayoría debe respirar con la música. Ajusta duraciones con − / +.']; },
  sizes: t => { const n = new Set(t.map(c => c.z)).size; return [n >= 3, `Variedad de tamaños de plano: ${n} distintos.`, 'Alternar general, medio y detalle da ritmo visual e información distinta en cada corte.']; },
  climaxLate: (t, P, tot) => { let acc = 0, at = -1; t.forEach(c => { if (c.r === 'climax') at = acc; acc += c.d; }); return [at >= tot * 0.55, 'El clímax llega en el tramo final.', at < 0 ? 'No has usado el plano de clímax (la meta): es el motivo de la pieza.' : 'Si enseñas la meta demasiado pronto, lo que venga después es bajada. Construye hacia ella.']; },
  context: t => [t.slice(0, 4).some(c => c.r === 'contexto'), 'Hay un plano de situación entre los cuatro primeros.', 'Tras el gancho, el espectador necesita saber dónde está y qué ocurre.'],
  order: t => { const o = t.filter(c => c.o != null).map(c => c.o); const ok = o.every((v, i) => !i || v > o[i - 1]) && o.length >= 4; return [ok, 'Las frases siguen un arco: gancho → problema → método → resultado → llamada.', o.length < 4 ? 'Faltan frases: sin problema o sin resultado no hay transformación que contar.' : 'El orden actual rompe la lógica causa → efecto. El gancho puede adelantar el resultado, pero después la historia debe avanzar.']; },
  broll: t => { const n = t.filter(c => c.r === 'recurso').length; return [n >= 2, `Recursos (B-roll) utilizados: ${n}.`, 'Los recursos ilustran lo que se dice, tapan cortes y dan aire. Úsalos entre frases, no amontonados al final.']; },
  accel: t => { const h = Math.floor(t.length / 2); if (t.length < 4) return [false, 'Ritmo creciente.', 'Necesitas al menos cuatro planos para construir una progresión.']; const body = t.slice(0, -1), a = body.slice(0, Math.floor(body.length / 2)), b = body.slice(Math.floor(body.length / 2)); const avg = x => x.reduce((s, c) => s + c.d, 0) / x.length; return [avg(b) < avg(a) * 0.85, `Duración media: ${avg(a).toFixed(2)} s en la primera mitad → ${avg(b).toFixed(2)} s en la segunda (sin contar el cierre).`, 'Para que la energía suba, acorta los planos conforme avanza el estribillo y reserva un plano más largo para respirar al final.']; },
  alternate: t => { let run = 1, mx = 1; t.forEach((c, i) => { if (i && c.r === t[i - 1].r && (c.r === 'playback' || c.r === 'narrativa')) { run++; mx = Math.max(mx, run); } else run = 1; }); const both = t.some(c => c.r === 'playback') && t.some(c => c.r === 'narrativa'); return [both && mx <= 2, 'Interpretación y narrativa se alternan (máximo dos seguidos del mismo tipo).', 'Un videoclip con ambas líneas funciona por el diálogo entre ellas; bloques largos de una sola rompen el ritmo del estribillo.']; }
};

export function mount(el) {
  let pid = 'F1', tl = [], sel = -1, playing = null, actx = null, snd = false;
  const P = () => PROJECTS[pid];
  el.innerHTML = `<div class="tabsbar" id="sf-p" style="margin-top:0">${Object.entries(PROJECTS).map(([k, v]) => `<button type="button" data-p="${k}">${esc(v.name)}</button>`).join('')}</div>
    <p id="sf-brief" class="muted"></p>
    <div class="grid g2"><div><span class="lbl">Monitor</span><div class="screen" id="sf-mon" style="aspect-ratio:16/9;display:grid;place-items:center;text-align:center;padding:14px;font-weight:700"></div>
      <div class="row mt" style="margin-top:8px"><button class="btn sm" id="sf-play">▶ Reproducir</button><label class="row small"><input type="checkbox" id="sf-snd"> Claqueta de pulso (sonido)</label><span class="mono small" id="sf-tot"></span></div></div>
      <div><span class="lbl">Material (toca para añadir al final)</span><div class="bin" id="sf-bin"></div></div></div>
    <span class="lbl mt">Línea de tiempo · las marcas son pulsos de la música</span>
    <div class="timeline" id="sf-tl" aria-label="Línea de tiempo"></div>
    <canvas id="sf-ruler" class="scope" height="18" style="height:18px;margin-top:2px"></canvas>
    <div class="row mt" style="margin-top:10px"><button class="btn sm ghost" data-a="l">← Mover</button><button class="btn sm ghost" data-a="r">Mover →</button><button class="btn sm ghost" data-a="-">− Acortar</button><button class="btn sm ghost" data-a="+">+ Alargar</button><button class="btn sm ghost" data-a="x">Quitar</button><button class="btn sm ghost" data-a="c">Vaciar</button><button class="btn sm warn" id="sf-eval">Evaluar montaje</button></div>
    <div id="sf-out" class="mt"></div>
    <div id="sf-goals" class="mt">${goalsHTML(GOALS, state().goals)}</div>
    <p class="note"><strong>Límite del modelo:</strong> evalúa estructura (orden, duración, variedad, sincronía con el pulso), no la calidad real de las imágenes ni el corte exacto dentro del movimiento. Las reglas son convenciones que conviene dominar antes de romperlas a propósito.</p>`;
  const PX = 46; // px por segundo
  const total = () => tl.reduce((s, c) => s + c.d, 0);

  function draw() {
    const p = P();
    $$('#sf-p button', el).forEach(b => b.classList.toggle('on', b.dataset.p === pid));
    $('#sf-brief', el).textContent = p.brief;
    $('#sf-bin', el).innerHTML = p.clips.map(c => `<button type="button" class="clip ${tl.some(t => t.id === c.id) ? 'used' : ''}" data-add="${c.id}" style="background:${COL[c.z]};text-align:left">${esc(c.n)}<small>${SZ[c.z]} · ${c.d}s</small></button>`).join('');
    $('#sf-tl', el).innerHTML = tl.length ? tl.map((c, i) => `<button type="button" class="clip ${i === sel ? 'sel' : ''}" data-i="${i}" style="background:${COL[c.z]};width:${Math.max(44, c.d * PX)}px;text-align:left">${i + 1}. ${esc(c.n)}<small>${c.z} · ${c.d.toFixed(2)}s</small></button>`).join('') : '<span class="muted small" style="align-self:center;padding:0 10px">Vacía. Añade planos desde el material.</span>';
    $('#sf-tot', el).textContent = `${total().toFixed(1)} s / ${p.min}–${p.max} s`;
    const r = $('#sf-ruler', el); r.width = Math.max(300, total() * PX + 20); r.style.width = r.width + 'px'; const x = r.getContext('2d'); x.clearRect(0, 0, r.width, 18);
    for (let b = 0, k = 0; b <= total() + 0.01; b += p.beat, k++) { x.fillStyle = k % 4 === 0 ? '#ff8a1f' : '#3a404b'; x.fillRect(8 + b * PX, k % 4 === 0 ? 2 : 8, 1.5, 16); }
  }
  function stop() { if (playing) { cancelAnimationFrame(playing); playing = null; $('#sf-play', el).textContent = '▶ Reproducir'; } }
  function click() { if (!snd) return; try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); const o = actx.createOscillator(), g = actx.createGain(); o.frequency.value = 880; g.gain.value = 0.08; o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + 0.04); } catch { } }
  function play() {
    if (playing) return stop(); if (!tl.length) return toast('Añade planos primero');
    const t0 = performance.now(), tot = total(), p = P(); let lastBeat = -1; $('#sf-play', el).textContent = '■ Parar';
    const tick = now => {
      const t = (now - t0) / 1000; if (t >= tot || !el.isConnected) { stop(); $('#sf-mon', el).innerHTML = '<span class="muted">FIN</span>'; return; }
      let acc = 0, cur = tl[0], idx = 0; for (let i = 0; i < tl.length; i++) { if (t < acc + tl[i].d) { cur = tl[i]; idx = i; break; } acc += tl[i].d; }
      const bt = Math.floor(t / p.beat); if (bt !== lastBeat) { lastBeat = bt; click(); }
      const m = $('#sf-mon', el); m.style.background = COL[cur.z]; m.innerHTML = `<div><div class="mono small">${idx + 1}/${tl.length} · ${SZ[cur.z]} · ${t.toFixed(1)} s</div><div style="font-size:1.15rem;margin-top:6px">${esc(cur.n)}</div></div>`;
      playing = requestAnimationFrame(tick);
    }; playing = requestAnimationFrame(tick);
  }
  function evaluate() {
    const p = P(), tot = total();
    if (!tl.length) { $('#sf-out', el).innerHTML = '<div class="fb ko">La línea de tiempo está vacía.</div>'; return; }
    const res = p.rules.map(k => RULES[k](tl, p, tot)), ok = res.filter(r => r[0]).length, pct = Math.round(100 * ok / res.length);
    $('#sf-out', el).innerHTML = `<div class="card"><div class="row sp"><strong>Evaluación: ${ok}/${res.length} criterios · ${pct} %</strong><span class="chip ${pct >= 85 ? 'g' : 'o'}">${pct >= 85 ? 'Superado' : 'Revisar'}</span></div>` +
      res.map(r => `<div class="fb ${r[0] ? 'ok' : 'ko'}"><b>${r[0] ? '✓' : '✕'} ${esc(r[1])}</b>${r[0] ? '' : esc(r[2])}</div>`).join('') + '</div>';
    if (pct >= 85 && markGoal(pid)) { $('#sf-goals', el).innerHTML = goalsHTML(GOALS, state().goals); toast('Reto superado · +30 XP'); }
  }
  el.addEventListener('click', e => {
    const pb = e.target.closest('[data-p]'), add = e.target.closest('[data-add]'), ci = e.target.closest('[data-i]'), a = e.target.closest('[data-a]');
    if (pb) { stop(); pid = pb.dataset.p; tl = []; sel = -1; $('#sf-out', el).innerHTML = ''; $('#sf-mon', el).innerHTML = ''; $('#sf-mon', el).style.background = '#000'; draw(); }
    if (add) { const c = P().clips.find(x => x.id === add.dataset.add); if (tl.some(t => t.id === c.id)) return toast('Ese plano ya está en la línea de tiempo'); tl.push({ ...c }); sel = tl.length - 1; draw(); }
    if (ci) { sel = +ci.dataset.i; draw(); }
    if (a) {
      const k = a.dataset.a, st = P().beat / 2;
      if (k === 'c') { tl = []; sel = -1; }
      else if (sel < 0 || !tl[sel]) return toast('Selecciona un plano de la línea de tiempo');
      else if (k === 'l' && sel > 0) { [tl[sel - 1], tl[sel]] = [tl[sel], tl[sel - 1]]; sel--; }
      else if (k === 'r' && sel < tl.length - 1) { [tl[sel + 1], tl[sel]] = [tl[sel], tl[sel + 1]]; sel++; }
      else if (k === '-') tl[sel].d = Math.max(st, +(Math.round((tl[sel].d - st) / st) * st).toFixed(4));
      else if (k === '+') tl[sel].d = Math.min(8, +(Math.round((tl[sel].d + st) / st) * st).toFixed(4));
      else if (k === 'x') { tl.splice(sel, 1); sel = Math.min(sel, tl.length - 1); }
      draw();
    }
    if (e.target.id === 'sf-play') play();
    if (e.target.id === 'sf-eval') evaluate();
  });
  $('#sf-snd', el).onchange = e => { snd = e.target.checked; };
  draw();
}
