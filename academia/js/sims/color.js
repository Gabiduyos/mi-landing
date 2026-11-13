// SIMULADOR G — Laboratorio de color. Las transformaciones (S-Log3 → lineal → Rec.709) y los scopes
// se calculan de verdad sobre los píxeles de una escena sintética. No sustituye a Resolve ni a material real.
import { $, slider, seg, bindSeg, clamp } from '../ui.js';
import { coach } from './coach.js';
import { slog3IRE, slog3Inv, r709 } from './slog.js';

const W = 160, H = 90;
const RGB = s => 'carta gris R·G·B: ' + s.g.map(x => x.toFixed(0)).join(' · ');
const SKIN = s => 'piel a ' + s.skA.toFixed(0) + '° (línea de piel ≈ 123°) y ' + s.skY.toFixed(0) + ' %';
export const GOALS = [
  { id: 'G1', title: 'Quita una dominante cálida',
    story: 'Plano grabado en S-Log3 con el balance mal puesto: todo tira a naranja. Haz primero la corrección técnica: imagen neutra y bien expuesta.',
    setup: [['seg:src', 'B'], ['#sg-cst', false], ['#sg-prot', false], ['click:#sg-reset']],
    checks: [['Transformación S-Log3 → Rec.709 activada (paso 1)', s => s.cst], ['Carta gris neutra: R, G y B a menos de 2,5 puntos', s => s.gdev < 2.5, RGB],
      ['Gris entre el 36 y el 48 %', s => s.gY >= 36 && s.gY <= 48, s => 'ahora ' + s.gY.toFixed(0) + ' %'], ['Parche blanco sin recortar', s => s.whMax < 99.5, s => 'ahora ' + s.whMax.toFixed(0) + ' %']],
    hints: ['Primero activa la casilla de transformación: sin ella estás mirando la señal log, no la imagen final.', 'Mira el RGB Parade: el rojo va alto y el azul bajo. Mueve «Temperatura» hacia azul (izquierda) hasta igualarlos.', 'Si aún no cuadra, corrige el eje verde–magenta con «Tinte» y ajusta el nivel con «Exposición».'],
    solution: 'Transformación activada, Temperatura ≈ −0,75, Tinte ≈ +0,55 y Exposición ≈ −0,1.',
    learn: 'El balance se juzga en el RGB Parade sobre algo que debería ser neutro: si los tres canales están a la misma altura, no hay dominante. Siempre después de transformar el log y antes de cualquier look.' },
  { id: 'G2', title: 'Rescata una piel verdosa',
    story: 'Material subexpuesto y bajo LED verdoso: la piel está apagada. Llévala a un tono y nivel naturales sin desequilibrar el resto.',
    setup: [['seg:src', 'C'], ['#sg-cst', true], ['#sg-prot', false], ['click:#sg-reset']],
    checks: [['Piel sobre la línea de piel del vectorscopio (±7°)', s => Math.abs(s.skA - 123) <= 7, SKIN], ['Piel entre el 55 y el 72 % de luminancia', s => s.skY >= 55 && s.skY <= 72, s => 'ahora ' + s.skY.toFixed(0) + ' %'],
      ['Carta gris razonablemente neutra (< 3,5 puntos)', s => s.gdev < 3.5, RGB]],
    hints: ['Empieza por la exposición: la imagen está oscura. Mira la forma de onda.', 'El verde se corrige con «Tinte» hacia magenta (derecha). Mira cómo gira la mancha de piel en el vectorscopio.', 'La línea naranja del vectorscopio es la referencia de piel. Cuando la mancha caiga encima, revisa la carta gris.'],
    solution: 'Exposición ≈ +1,4 y Tinte ≈ +0,45.',
    learn: 'Primero niveles (forma de onda), después color (parade y vectorscopio). La línea de piel es una referencia común a todos los tonos de piel con luz neutra, no una ley.' },
  { id: 'G3', title: 'Look: sombras frías, piel natural',
    story: 'Sobre una imagen ya correcta, crea el look que pediste: contraste controlado, sombras un punto frías y la piel intacta.',
    setup: [['seg:src', 'A'], ['#sg-cst', true], ['#sg-prot', false], ['click:#sg-reset']],
    checks: [['Algo más de contraste (1,05 o más)', s => s.con >= 1.05, s => 'ahora ' + s.con.toFixed(2)], ['Sombras frías y sutiles: azul 2–8 puntos sobre el rojo en la pared oscura', s => s.cool > 0 && s.shBR >= 2 && s.shBR <= 8, s => 'ahora ' + (s.shBR >= 0 ? '+' : '') + s.shBR.toFixed(1)],
      ['La piel sigue en su línea (±8°)', s => Math.abs(s.skA - 123) <= 8, SKIN], ['Imagen todavía equilibrada (gris entre 30 y 52 %, casi neutro)', s => s.gdev < 6 && s.gY > 30 && s.gY < 52]],
    hints: ['Sube un poco el contraste: 1,1 basta.', 'Sube «Sombras frías» poco a poco y mira el dato «Pared oscura B−R». Sutil es 2–8.', 'Si la piel se escapa de su línea, activa «Proteger piel».'],
    solution: 'Contraste 1,1 y Sombras frías ≈ 0,5; activa «Proteger piel» si la piel se enfría.',
    learn: 'El look va después de la corrección y en sus propios controles. Tintar por luminancia afecta también a la piel en sombra: por eso los coloristas la protegen con un cualificador.' }
];
const SRC = {
  A: { n: 'S-Log3 bien expuesto', g: [1, 1, 1], e: 0 },
  B: { n: 'Dominante cálida', g: [1.32, 1, 0.6], e: 0.2 },
  C: { n: 'Subexpuesto y verdoso', g: [0.93, 1.1, 0.95], e: -1.3 }
};

function scene() {
  const m = new Float32Array(W * H * 3), reg = new Uint8Array(W * H); // reg: 1 gris, 2 piel, 3 blanco, 4 pared oscura
  const set = (i, r, g, b, k = 0) => { m[i * 3] = r; m[i * 3 + 1] = g; m[i * 3 + 2] = b; reg[i] = k; };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x, sh = 0.035 + 0.05 * (x / W) * (1 - y / H);
    set(i, sh, sh, sh, x < 60 && y < 50 ? 4 : 0);
    if (x > 120 && x < 152 && y > 6 && y < 40) set(i, 2.6, 2.7, 2.9);                                  // ventana
    const dx = (x - 80) / 17, dy = (y - 40) / 22;
    if (dx * dx + dy * dy < 1) { const s = 1 - 0.35 * (dx < 0 ? -dx : 0); set(i, 0.46 * s, 0.295 * s, 0.232 * s, Math.abs(dx) < 0.6 && Math.abs(dy) < 0.6 ? 2 : 0); }
    else if (((x - 80) / 19) ** 2 + ((y - 30) / 22) ** 2 < 1 && y < 36) set(i, 0.02, 0.016, 0.014);       // pelo
    else if (y > 60 && Math.abs(x - 80) < 20 + (y - 60) * 0.9) set(i, 0.09, 0.1, 0.13);                 // ropa
    if (y > 66 && y < 84) {
      if (x > 6 && x < 24) set(i, 0.18, 0.18, 0.18, 1);
      else if (x > 26 && x < 38) set(i, 0.9, 0.9, 0.9, 3);
      else if (x > 40 && x < 50) set(i, 0.03, 0.03, 0.03);
    }
    if (y > 52 && y < 62 && x > 6 && x < 50) { const k = ((x - 6) / 11) | 0; const c = [[0.5, 0.06, 0.05], [0.07, 0.35, 0.08], [0.05, 0.08, 0.45], [0.6, 0.5, 0.05]][k]; if (c) set(i, c[0], c[1], c[2]); }
  }
  return { m, reg };
}

export function mount(el, opts = {}) {
  const SC = scene();
  const p = { src: 'B', cst: false, exp: 0, temp: 0, tint: 0, lift: 0, gamma: 0, gain: 0, con: 1, sat: 1, cool: 0, warm: 0, prot: false };
  const S = (id, lab, a, b, st, v) => slider('sg-' + id, lab, a, b, st, v);
  el.innerHTML = `<div class="sim"><div>
    <div class="screen"><canvas width="${W}" height="${H}" id="sg-v" style="image-rendering:pixelated" aria-label="Imagen"></canvas></div>
    <div class="grid" style="grid-template-columns:1fr 1fr 0.6fr;gap:6px;margin-top:8px">
      <div><span class="lbl">Forma de onda</span><canvas class="scope" width="160" height="110" id="sg-w"></canvas></div>
      <div><span class="lbl">RGB Parade</span><canvas class="scope" width="160" height="110" id="sg-pa"></canvas></div>
      <div><span class="lbl">Vectorscopio</span><canvas class="scope" width="110" height="110" id="sg-ve"></canvas></div></div>
    <div class="readout"><div><b id="sg-gray">–</b><span>Carta gris R·G·B</span></div><div><b id="sg-skin">–</b><span>Piel: luma · ángulo</span></div><div><b id="sg-wh">–</b><span>Parche blanco</span></div><div><b id="sg-sh">–</b><span>Pared oscura B−R</span></div></div>
  </div><div>
    <div id="sg-coach"></div>
    <span class="lbl">Material de partida</span>${seg('src', Object.entries(SRC).map(([k, v]) => [k, v.n]), 'B')}
    <span class="lbl mt" style="margin-top:12px">1 · Transformación técnica</span>
    <label class="row small"><input type="checkbox" id="sg-cst"> Color Space Transform: S-Log3 → Rec.709</label>
    <span class="lbl" style="margin-top:12px">2 · Corrección primaria</span>
    ${S('exp', 'Exposición (stops, en lineal)', -3, 3, 0.05, 0)}${S('temp', 'Temperatura (azul ↔ ámbar)', -1, 1, 0.01, 0)}${S('tint', 'Tinte (verde ↔ magenta)', -1, 1, 0.01, 0)}
    ${S('lift', 'Lift (negros)', -0.15, 0.15, 0.005, 0)}${S('gamma', 'Gamma (medios)', -0.5, 0.5, 0.01, 0)}${S('gain', 'Gain (blancos)', -0.4, 0.4, 0.01, 0)}
    ${S('con', 'Contraste (pivote 43 %)', 0.6, 1.6, 0.01, 1)}${S('sat', 'Saturación', 0, 2, 0.01, 1)}
    <span class="lbl">3 · Look creativo</span>
    ${S('cool', 'Sombras frías', 0, 1, 0.01, 0)}${S('warm', 'Altas luces cálidas', 0, 1, 0.01, 0)}
    <label class="row small"><input type="checkbox" id="sg-prot"> Proteger piel (cualificador: excluye los tonos de piel del look)</label>
    <div class="row mt"><button class="btn sm ghost" id="sg-reset">Restablecer correcciones</button></div>
    <p class="note"><strong>Real:</strong> la decodificación S-Log3 (fórmula de Sony), las ganancias en lineal, la codificación Rec.709 y los scopes, calculados píxel a píxel.<br><strong>Simplificado:</strong> no hay conversión de gama de color (S-Gamut3.Cine → Rec.709), ni mapeo de tonos como el de Resolve; la escena es sintética y la «línea de piel» es una referencia orientativa, no una ley. Sirve para entender qué mueve cada control y cómo leer los scopes.</p>
  </div></div>`;
  const ids = ['exp', 'temp', 'tint', 'lift', 'gamma', 'gain', 'con', 'sat', 'cool', 'warm'];
  const cv = $('#sg-v', el).getContext('2d'), img = cv.createImageData(W, H);
  const wv = $('#sg-w', el).getContext('2d'), pa = $('#sg-pa', el).getContext('2d'), ve = $('#sg-ve', el).getContext('2d');

  function draw() {
    const s = SRC[p.src], d = img.data, ex = 2 ** p.exp;
    const gr = (1 + 0.5 * p.temp) * (1 + 0.12 * p.tint), gg = 1 - 0.22 * p.tint, gb = (1 - 0.5 * p.temp) * (1 + 0.12 * p.tint);
    const acc = { 1: [0, 0, 0, 0], 2: [0, 0, 0, 0], 3: [0, 0, 0, 0], 4: [0, 0, 0, 0] };
    const wvD = wv.createImageData(160, 110), paD = pa.createImageData(160, 110), veD = ve.createImageData(110, 110);
    const dot = (D, w, x, y, r, g, b) => { if (x < 0 || y < 0 || x >= w || y >= 110) return; const i = (y * w + x) * 4; D.data[i] = Math.min(255, D.data[i] + r); D.data[i + 1] = Math.min(255, D.data[i + 1] + g); D.data[i + 2] = Math.min(255, D.data[i + 2] + b); D.data[i + 3] = 255; };
    for (let i = 0; i < W * H; i++) {
      // «cámara»: escena → defecto de captura → señal S-Log3 (0–1)
      let c = [0, 1, 2].map(k => slog3IRE(Math.min(SC.m[i * 3 + k] * s.g[k] * 2 ** s.e, 11.5)) / 100);
      let v;
      if (p.cst) { const lin = c.map(x => slog3Inv(x * 100)); v = [r709(lin[0] * ex * gr) / 100, r709(lin[1] * ex * gg) / 100, r709(lin[2] * ex * gb) / 100]; }
      else v = [c[0] + p.exp * 0.075 + 0.05 * p.temp, c[1] + p.exp * 0.075 - 0.04 * p.tint, c[2] + p.exp * 0.075 - 0.05 * p.temp];
      // lift / gamma / gain / contraste
      v = v.map(x => { x = x * (1 + p.gain) + p.lift * (1 - x); x = Math.pow(clamp(x, 0, 1.2), 1 / (1 + p.gamma)); return (x - 0.435) * p.con + 0.435; });
      let Y = 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
      v = v.map(x => Y + (x - Y) * p.sat);
      // look: tinte por luminancia, con cualificador de piel opcional
      const isSkin = v[0] > v[1] && v[1] > v[2] && (v[0] - v[2]) > 0.06 && (v[0] - v[1]) < (v[0] - v[2]) * 0.75;
      const k = p.prot && isSkin ? 0 : 1, lo = Math.pow(clamp(1 - Y * 1.7, 0, 1), 1.5) * p.cool * k, hi = Math.pow(clamp((Y - 0.55) * 2.2, 0, 1), 1.5) * p.warm * k;
      v[0] += -0.07 * lo + 0.05 * hi; v[1] += -0.005 * lo + 0.015 * hi; v[2] += 0.075 * lo - 0.06 * hi;
      v = v.map(x => clamp(x, 0, 1)); Y = 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
      d[i * 4] = v[0] * 255; d[i * 4 + 1] = v[1] * 255; d[i * 4 + 2] = v[2] * 255; d[i * 4 + 3] = 255;
      const rg = SC.reg[i]; if (rg) { const a = acc[rg]; a[0] += v[0]; a[1] += v[1]; a[2] += v[2]; a[3]++; }
      const x = i % W;
      dot(wvD, 160, x, 105 - Math.round(Y * 100), 60, 200, 110);
      const px = Math.floor(x / 3); dot(paD, 160, px, 105 - Math.round(v[0] * 100), 255, 50, 50); dot(paD, 160, 54 + px, 105 - Math.round(v[1] * 100), 50, 230, 80); dot(paD, 160, 107 + px, 105 - Math.round(v[2] * 100), 70, 110, 255);
      const cb = (v[2] - Y) / 1.8556, cr = (v[0] - Y) / 1.5748; dot(veD, 110, Math.round(55 + cb * 100), Math.round(55 - cr * 100), v[0] * 200 + 40, v[1] * 200 + 40, v[2] * 200 + 40);
    }
    cv.putImageData(img, 0, 0); wv.putImageData(wvD, 0, 0); pa.putImageData(paD, 0, 0); ve.putImageData(veD, 0, 0);
    for (const c of [wv, pa]) { c.strokeStyle = 'rgba(255,255,255,.18)'; c.fillStyle = '#6f7887'; c.font = '8px monospace'; for (const l of [0, 50, 100]) { c.beginPath(); c.moveTo(0, 105.5 - l); c.lineTo(160, 105.5 - l); c.stroke(); c.fillText(l, 1, 103 - l + (l === 100 ? 10 : 0)); } }
    ve.strokeStyle = 'rgba(255,255,255,.2)'; ve.beginPath(); ve.arc(55, 55, 50, 0, 7); ve.stroke(); ve.beginPath(); ve.arc(55, 55, 25, 0, 7); ve.stroke();
    ve.strokeStyle = '#ff8a1f'; ve.beginPath(); ve.moveTo(55, 55); ve.lineTo(55 + 52 * Math.cos(123 * Math.PI / 180), 55 - 52 * Math.sin(123 * Math.PI / 180)); ve.stroke();
    const mean = k => acc[k].slice(0, 3).map(x => 100 * x / (acc[k][3] || 1));
    const g = mean(1), sk = mean(2), wh = mean(3), sh = mean(4);
    const skY = 0.2126 * sk[0] + 0.7152 * sk[1] + 0.0722 * sk[2], skA = Math.atan2((sk[0] - skY) / 1.5748, (sk[2] - skY) / 1.8556) * 180 / Math.PI;
    const gdev = Math.max(Math.abs(g[0] - g[1]), Math.abs(g[2] - g[1])), gY = (g[0] + g[1] + g[2]) / 3, whMax = Math.max(...wh), shBR = sh[2] - sh[0];
    $('#sg-gray', el).textContent = g.map(x => x.toFixed(0)).join(' · '); $('#sg-skin', el).textContent = `${skY.toFixed(0)} % · ${skA.toFixed(0)}°`;
    $('#sg-wh', el).innerHTML = whMax >= 99.5 ? '<span style="color:#ff5263">recortado</span>' : whMax.toFixed(0) + ' %'; $('#sg-sh', el).textContent = (shBR >= 0 ? '+' : '') + shBR.toFixed(1);
    for (const id of ids) { const o = $('#sg-' + id + '-o', el); if (o) o.textContent = (+p[id]).toFixed(2); }
    co.update({ src: p.src, cst: p.cst, con: p.con, cool: p.cool, g, gdev, gY, whMax, skA, skY, shBR });
  }
  let raf = 0; const sched = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); };
  for (const id of ids) $('#sg-' + id, el).oninput = e => { p[id] = +e.target.value; sched(); };
  $('#sg-cst', el).onchange = e => { p.cst = e.target.checked; sched(); };
  $('#sg-prot', el).onchange = e => { p.prot = e.target.checked; sched(); };
  $('#sg-reset', el).onclick = () => { Object.assign(p, { exp: 0, temp: 0, tint: 0, lift: 0, gamma: 0, gain: 0, con: 1, sat: 1, cool: 0, warm: 0 }); for (const id of ids) $('#sg-' + id, el).value = p[id]; sched(); };
  bindSeg(el, 'src', v => { p.src = v; sched(); });
  const co = coach($('#sg-coach', el), el, { goals: GOALS, start: opts.goal, intro: [
    'Trabaja en orden, de arriba abajo: 1 transformar el log, 2 corregir, 3 crear el look.',
    'Mira los scopes antes que la imagen: forma de onda para el brillo, RGB Parade para el balance y vectorscopio para el tono de la piel.',
    'Elige un reto: la lista te dice qué medir y se marca en verde según lo consigues.'] });
  draw();
}
