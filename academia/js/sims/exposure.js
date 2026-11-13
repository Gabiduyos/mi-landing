// SIMULADOR A — Exposición. EV, ángulo y parpadeo: cálculo real. Ruido, desenfoques y escena: modelo didáctico.
import { $, slider, seg, bindSeg, goalsHTML, toast } from '../ui.js';
import { APERTURES, SHUTTERS, ISOS, overStops, shutterAngle, flickerSafe } from './expo.js';
import { state, markGoal } from '../store.js';

const W = 240, H = 135;
const SCENES = {
  sol: { name: 'Mediodía con sol', ev: 15, hz: 0, hi: 2.6, sky: [0.5, 0.75, 1.4], ground: 0.3, shade: -3 },
  nublado: { name: 'Día nublado', ev: 12, hz: 0, hi: 1.6, sky: [0.75, 0.8, 0.85], ground: 0.22, shade: -1.5 },
  ventana: { name: 'Interior con ventana', ev: 7, hz: 0, hi: 5.5, sky: [0.16, 0.14, 0.12], ground: 0.08, shade: -3, window: true },
  gym: { name: 'Gimnasio LED (red 50 Hz)', ev: 6.5, hz: 50, hi: 3.5, sky: [0.07, 0.075, 0.085], ground: 0.06, shade: -2.5, lamps: true },
  noche: { name: 'Noche urbana con neones', ev: 3, hz: 0, hi: 6, sky: [0.012, 0.014, 0.03], ground: 0.035, shade: -3, neon: true }
};
const GOALS = [
  { id: 'A1', text: 'Mediodía con sol a 25p: exposición ±0,3 stops manteniendo 1/50 y f/2.8. (Pista: el ISO ya no baja más.)' },
  { id: 'A2', text: 'Gimnasio LED a 50p: exposición ±0,5 stops, sin riesgo de parpadeo y con ángulo de 180°.' },
  { id: 'A3', text: 'Noche urbana a 25p: sujeto a ±0,5 stops con obturación 1/50 e ISO no superior a 6400.' },
  { id: 'A4', text: 'Interior con ventana: expón para que la ventana NO recorte (0 % de píxeles al 100 %) y observa qué le pasa al sujeto.' }
];

function gauss() { let u = 0; for (let i = 0; i < 4; i++) u += Math.random(); return (u - 2) * 1.73; }

function buildScene(sc) {
  // mapa lineal relativo: 0.18 = gris medio con exposición «correcta»
  const bg = new Float32Array(W * H * 3), fg = new Float32Array(W * H * 4);
  const hi = 0.18 * 2 ** sc.hi;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 3, v = y / H;
    let r, g, b;
    if (v < 0.62) { const k = 1 - v * 0.5; r = sc.sky[0] * k; g = sc.sky[1] * k; b = sc.sky[2] * k; }
    else { const k = sc.ground * (1.3 - (v - 0.62)); r = k; g = k * 0.97; b = k * 0.92; }
    // edificio/estructura en sombra
    if (x > 150 && x < 225 && y > 28 && y < 84) { const k = 0.18 * 2 ** sc.shade; r = k; g = k; b = k * 1.1; if (((x - 150) % 15 > 9) && ((y - 28) % 14 > 8)) { r = g = b = k * (sc.neon || sc.lamps ? 30 : 2.2); } }
    if (!sc.window && !sc.lamps && !sc.neon) { const d = Math.hypot(x - 42, y - 22); if (d < 9) { r = g = b = hi; } else if (d < 26) { const k = (26 - d) / 17; r += hi * 0.18 * k; g += hi * 0.16 * k; b += hi * 0.1 * k; } }
    if (sc.window && x > 18 && x < 88 && y > 12 && y < 62) { const cross = Math.abs(x - 53) < 1.5 || Math.abs(y - 37) < 1.5; r = cross ? 0.02 : hi; g = cross ? 0.02 : hi * 1.02; b = cross ? 0.02 : hi * 1.1; }
    if (sc.lamps && y > 6 && y < 10 && (x % 48) > 8 && (x % 48) < 40) { r = g = b = hi; }
    if (sc.neon) {
      if (y > 30 && y < 36 && x > 14 && x < 86) { r = hi; g = hi * 0.08; b = hi * 0.5; }
      if (x > 96 && x < 101 && y > 16 && y < 70) { r = hi * 0.05; g = hi * 0.7; b = hi; }
      const d = Math.hypot(x - 130, y - 16); if (d < 4) { r = hi; g = hi * 0.8; b = hi * 0.4; }
    }
    bg[i] = r; bg[i + 1] = g; bg[i + 2] = b;
  }
  // sujeto (nítido): cabeza con piel ~ +1 stop sobre el gris, camiseta gris 18 %
  const put = (x, y, r, g, b) => { if (x < 0 || x >= W || y < 0 || y >= H) return; const i = (y * W + x) * 4; fg[i] = r; fg[i + 1] = g; fg[i + 2] = b; fg[i + 3] = 1; };
  const key = sc.window ? 0.75 : 1;
  for (let y = 40; y < H; y++) for (let x = 85; x < 150; x++) {
    const dx = x - 117, dy = y - 60;
    if (dx * dx / 196 + dy * dy / 289 < 1) { const s = (0.34 + dx * 0.004 * (sc.window ? -1.6 : 1)) * key; put(x, y, s * 1.12, s * 0.9, s * 0.74); }
    else if (y > 80 && Math.abs(dx) < 16 + (y - 80) * 0.75 && Math.abs(dx) < 34) put(x, y, 0.18 * key, 0.18 * key, 0.185 * key);
    else if (y > 74 && y <= 82 && Math.abs(dx) < 6) put(x, y, 0.28 * key, 0.23 * key, 0.19 * key);
  }
  return { bg, fg };
}

function boxBlur(src, r) {
  if (r < 1) return src;
  const tmp = new Float32Array(src.length), out = new Float32Array(src.length), n = 2 * r + 1;
  for (let y = 0; y < H; y++) for (let c = 0; c < 3; c++) {
    let acc = 0;
    for (let x = -r; x <= r; x++) acc += src[(y * W + Math.min(W - 1, Math.max(0, x))) * 3 + c];
    for (let x = 0; x < W; x++) {
      tmp[(y * W + x) * 3 + c] = acc / n;
      acc += src[(y * W + Math.min(W - 1, x + r + 1)) * 3 + c] - src[(y * W + Math.max(0, x - r)) * 3 + c];
    }
  }
  for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) {
    let acc = 0;
    for (let y = -r; y <= r; y++) acc += tmp[(Math.min(H - 1, Math.max(0, y)) * W + x) * 3 + c];
    for (let y = 0; y < H; y++) {
      out[(y * W + x) * 3 + c] = acc / n;
      acc += tmp[(Math.min(H - 1, y + r + 1) * W + x) * 3 + c] - tmp[(Math.max(0, y - r) * W + x) * 3 + c];
    }
  }
  return out;
}
const oetf = v => v <= 0 ? 0 : v >= 1 ? 1 : (v < 0.018 ? 4.5 * v : 1.099 * Math.pow(v, 0.45) - 0.099);

export function mount(el) {
  const p = { scene: 'sol', N: 2.8, den: 50, iso: 100, nd: 0, fps: 25, zebra: true };
  el.innerHTML = `<div class="sim"><div>
    <div class="screen"><canvas width="${W}" height="${H}" aria-label="Vista simulada de la escena"></canvas>
      <div class="hud top"><span id="xa-mm"></span><span id="xa-ang"></span><span id="xa-fl"></span></div>
      <div class="hud"><span id="xa-set"></span></div></div>
    <canvas class="scope mt" width="256" height="70" id="xa-h" aria-label="Histograma"></canvas>
    <div class="readout"><div><b id="xa-ev">–</b><span>EV escena</span></div><div><b id="xa-over">–</b><span>Desviación</span></div><div><b id="xa-clip">–</b><span>Recortado</span></div><div><b id="xa-blk">–</b><span>Negro aplastado</span></div></div>
    <div id="xa-goals">${goalsHTML(GOALS, state().goals)}</div>
  </div><div>
    <span class="lbl">Escena</span><select id="xa-scene" aria-label="Escena">${Object.entries(SCENES).map(([k, s]) => `<option value="${k}">${s.name}</option>`).join('')}</select>
    <div class="mt"></div>
    <span class="lbl">Fotogramas por segundo</span>${seg('fps', [[25, '25p'], [50, '50p'], [100, '100p']], 25)}
    <div class="mt"></div>
    ${slider('xa-N', 'Diafragma', 0, APERTURES.length - 1, 1, 2)}
    ${slider('xa-den', 'Obturación', 0, SHUTTERS.length - 1, 1, 2)}
    ${slider('xa-iso', 'ISO', 0, ISOS.length - 1, 1, 0)}
    ${slider('xa-nd', 'Filtro ND (stops)', 0, 10, 0.5, 0)}
    <label class="row small"><input type="checkbox" id="xa-z" checked> Cebras 100 %+ (recorte)</label>
    <p class="note"><strong>Qué es exacto:</strong> la relación entre EV, diafragma, obturación, ISO y ND, el ángulo de obturación y la compatibilidad con la frecuencia de red.<br><strong>Qué es un modelo didáctico:</strong> la escena dibujada, la cantidad de ruido, el desenfoque de fondo y el de movimiento, y el punto exacto de recorte. No representa la respuesta real del sensor de la A7 IV.</p>
  </div></div>`;
  const cv = $('canvas', el), ctx = cv.getContext('2d'), img = ctx.createImageData(W, H);
  const hc = $('#xa-h', el), hx = hc.getContext('2d');
  let map = buildScene(SCENES[p.scene]), blurred = null, blurKey = '';

  function draw() {
    const sc = SCENES[p.scene], over = overStops(sc.ev, p), gain = 2 ** over, k = p.iso / 100;
    const br = Math.round(Math.max(0, 7 / p.N - 0.3));
    if (blurKey !== p.scene + br) { blurred = boxBlur(map.bg, br); blurKey = p.scene + br; }
    const hist = new Uint32Array(64); let clip = 0, blk = 0, winClip = 0, winN = 0;
    const streak = Math.min(60, Math.round(900 / p.den)), d = img.data;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x, a = map.fg[i * 4 + 3];
      let r = a ? map.fg[i * 4] : blurred[i * 3], g = a ? map.fg[i * 4 + 1] : blurred[i * 3 + 1], b = a ? map.fg[i * 4 + 2] : blurred[i * 3 + 2];
      // objeto en movimiento (balón): estela proporcional al tiempo de obturación — didáctico
      const by = 112, bx0 = 30;
      if (Math.abs(y - by) < 6 && x >= bx0 - 6 && x <= bx0 + streak + 6) {
        const dy = y - by, half = Math.sqrt(36 - dy * dy), cover = Math.max(0, Math.min(x + half, bx0 + streak) - Math.max(x - half, bx0)) / (streak + 0.001);
        const al = Math.min(1, cover * (streak < 2 ? 1 : 1)); const c = Math.min(1, Math.max(al, streak < 2 && Math.hypot(x - bx0, dy) < 6 ? 1 : 0));
        r = r * (1 - c) + 0.5 * c; g = g * (1 - c) + 0.22 * c; b = b * (1 - c) + 0.05 * c;
      }
      const ns = k > 1 || over < -1 ? gauss() : gauss() * 0.6;
      const lum = (r + g + b) / 3 * gain, sens = lum / k;
      const noise = Math.sqrt(0.00003 * Math.max(sens, 0) + 2.2e-8) * k * ns;
      r = r * gain + noise; g = g * gain + noise * 0.9; b = b * gain + noise * 1.1;
      const isWin = !a && map.bg[i * 3] > 0.18 * 2 ** (sc.hi - 0.6);
      if (isWin) winN++;
      const cl = r >= 1 || g >= 1 || b >= 1;
      if (cl) { clip++; if (isWin) winClip++; }
      const R = oetf(r), G = oetf(g), B = oetf(b), Y = 0.2126 * R + 0.7152 * G + 0.0722 * B;
      if (Y < 0.02) blk++;
      hist[Math.min(63, Y * 64 | 0)]++;
      const z = p.zebra && cl && ((x + y) % 6 < 3);
      d[i * 4] = z ? 20 : R * 255; d[i * 4 + 1] = z ? 20 : G * 255; d[i * 4 + 2] = z ? 20 : B * 255; d[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    // histograma
    hx.clearRect(0, 0, 256, 70); const mx = Math.max(...hist.slice(1, 63), 1);
    for (let j = 0; j < 64; j++) { hx.fillStyle = j === 63 && hist[j] > W * H * 0.005 ? '#ff8a1f' : j === 0 && hist[0] > W * H * 0.2 ? '#ff8a1f' : '#2f7bff'; const h = Math.min(68, hist[j] / mx * 62); hx.fillRect(j * 4, 70 - h, 3, h); }
    const ang = shutterAngle(p.fps, p.den), fl = flickerSafe(sc.hz, p.den), pc = 100 * clip / (W * H);
    $('#xa-mm', el).innerHTML = `M.M. <span class="${Math.abs(over) > 1 ? 'w' : 'g'}">${over >= 0 ? '+' : ''}${Math.abs(over) > 5 ? (over > 0 ? '5.0+' : '−5.0') : over.toFixed(1)}</span>`;
    $('#xa-ang', el).innerHTML = `${ang > 360 ? '<span class="w">imposible: obturación más lenta que el fotograma</span>' : Math.round(ang) + '°'}`;
    $('#xa-fl', el).innerHTML = sc.hz ? (fl ? '<span class="g">sin parpadeo de red</span>' : '<span class="w">⚠ parpadeo 50 Hz</span>') : '';
    $('#xa-set', el).textContent = `f/${p.N}  1/${p.den}  ISO ${p.iso}${p.nd ? '  ND ' + p.nd : ''}  ${p.fps}p`;
    $('#xa-ev', el).textContent = 'EV ' + sc.ev; $('#xa-over', el).textContent = (over >= 0 ? '+' : '') + over.toFixed(1) + ' st';
    $('#xa-clip', el).textContent = pc.toFixed(1) + ' %'; $('#xa-blk', el).textContent = (100 * blk / (W * H)).toFixed(0) + ' %';
    $('#xa-N-o', el).textContent = 'f/' + p.N; $('#xa-den-o', el).textContent = '1/' + p.den + ' s'; $('#xa-iso-o', el).textContent = p.iso; $('#xa-nd-o', el).textContent = p.nd ? p.nd + ' stops (ND' + Math.round(2 ** p.nd) + ')' : 'sin filtro';
    // retos
    const ok = {
      A1: p.scene === 'sol' && p.fps === 25 && p.den === 50 && p.N === 2.8 && Math.abs(over) <= 0.3,
      A2: p.scene === 'gym' && p.fps === 50 && p.den === 100 && Math.abs(over) <= 0.5,
      A3: p.scene === 'noche' && p.fps === 25 && p.den === 50 && p.iso <= 6400 && Math.abs(over) <= 0.5,
      A4: p.scene === 'ventana' && winN > 0 && winClip === 0 && ang <= 360
    };
    for (const g of GOALS) if (ok[g.id] && markGoal(g.id)) { $('#xa-goals', el).innerHTML = goalsHTML(GOALS, state().goals); toast('Reto superado · +30 XP'); }
  }
  let raf = 0; const sched = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); };
  $('#xa-scene', el).onchange = e => { p.scene = e.target.value; map = buildScene(SCENES[p.scene]); blurKey = ''; sched(); };
  $('#xa-N', el).oninput = e => { p.N = APERTURES[+e.target.value]; sched(); };
  $('#xa-den', el).oninput = e => { p.den = SHUTTERS[+e.target.value]; sched(); };
  $('#xa-iso', el).oninput = e => { p.iso = ISOS[+e.target.value]; sched(); };
  $('#xa-nd', el).oninput = e => { p.nd = +e.target.value; sched(); };
  $('#xa-z', el).onchange = e => { p.zebra = e.target.checked; sched(); };
  bindSeg(el, 'fps', v => { p.fps = +v; sched(); });
  draw();
}
