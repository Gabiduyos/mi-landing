// SIMULADOR E — Ópticas. Geometría de lente delgada: campo de visión, tamaño relativo del fondo,
// profundidad de campo y disco de desenfoque son cálculos reales. El dibujo es esquemático.
import { $, slider, seg, bindSeg, goalsHTML, toast, clamp } from '../ui.js';
import { LENSES } from './expo.js';
import { state, markGoal } from '../store.js';

const GOALS = [
  { id: 'E1', text: 'Retrato con el 50 mm f/1.8: encuadra un primer plano y consigue un disco de desenfoque del fondo de al menos el 2 % del ancho de imagen.' },
  { id: 'E2', text: 'Compresión: activa «Mantener tamaño del sujeto» y recorre el 24–70 de 24 a 70 mm. Fíjate en cómo crece el fondo sin que cambie la persona.' },
  { id: 'E3', text: 'Plano general de sala con todo nítido: 24 mm, sujeto a 3 m o más y profundidad de campo que llegue hasta el infinito.' }
];
const AP = [1.8, 2, 2.8, 4, 5.6, 8, 11, 16];

export function mount(el) {
  const p = { lens: 'gm', f: 35, N: 2.8, d: 2.5, bg: 8, crop: 1, vert: false, lock: false };
  let seen = { lo: false, hi: false };
  el.innerHTML = `<div class="sim"><div>
    <div class="screen" style="max-width:${640}px;margin:auto"><svg id="so-v" viewBox="0 0 640 360" style="display:block;width:100%;background:#0a0c10" aria-label="Encuadre simulado"></svg>
      <div class="hud"><span id="so-hud"></span></div></div>
    <div class="readout"><div><b id="so-fov">–</b><span>Ángulo horiz.</span></div><div><b id="so-w">–</b><span>Ancho a sujeto</span></div><div><b id="so-shot">–</b><span>Tipo de plano</span></div><div><b id="so-dof">–</b><span>Prof. de campo</span></div><div><b id="so-blur">–</b><span>Disco fondo</span></div><div><b id="so-hyp">–</b><span>Hiperfocal</span></div></div>
    <div id="so-msg" class="small muted"></div>
    <div id="so-goals" class="mt">${goalsHTML(GOALS, state().goals)}</div>
  </div><div>
    <span class="lbl">Objetivo</span><select id="so-lens">${Object.entries(LENSES).map(([k, l]) => `<option value="${k}">${l.name}</option>`).join('')}</select>
    <div class="mt"></div>
    ${slider('so-f', 'Focal', 24, 70, 1, 35)}
    ${slider('so-N', 'Diafragma', 0, AP.length - 1, 1, 2)}
    ${slider('so-d', 'Distancia cámara–sujeto', 0.5, 15, 0.1, 2.5)}
    ${slider('so-bg', 'Distancia sujeto–fondo', 0.5, 60, 0.5, 8)}
    <span class="lbl">Sensor</span>${seg('crop', [[1, 'Full frame'], [1.5, 'Super 35 (4K 50/60p)']], 1)}
    <span class="lbl mt" style="margin-top:10px">Formato</span>${seg('vert', [['h', 'Horizontal 16:9'], ['v', 'Vertical 9:16']], 'h')}
    <label class="row small" style="margin-top:12px"><input type="checkbox" id="so-lock"> Mantener tamaño del sujeto (al cambiar la focal, la cámara se mueve)</label>
    <p class="note"><strong>Fundamentado:</strong> campo de visión, tamaños relativos, profundidad de campo (círculo de confusión 0,03 mm en full frame, 0,02 mm en Super 35) y diámetro del disco de desenfoque.<br><strong>Modelo didáctico:</strong> persona de 1,75 m y un pórtico de 6 × 5 m como fondo; no se simulan la distorsión óptica del objetivo, el viñeteo ni la forma del bokeh. La profundidad de campo «aceptable» depende del tamaño de visionado.</p>
  </div></div>`;
  const v = $('#so-v', el);

  function draw() {
    const L = LENSES[p.lens]; p.f = clamp(p.f, L.min, L.max); const mx = L.maxAp(p.f); if (p.N < mx) p.N = AP.find(a => a >= mx - 0.01) || mx;
    const sw = (p.vert ? 20.25 : 36) / p.crop, sh = (p.vert ? 36 : 20.25) / p.crop;
    const FW = p.vert ? 202 : 640, FH = 360, ox = (640 - FW) / 2;
    const fieldW = p.d * sw / p.f, fieldH = p.d * sh / p.f, ppm = FH / fieldH; // px por metro en el plano del sujeto
    const dB = p.d + p.bg, ppmB = FH / (dB * sh / p.f);
    const f = p.f, s = p.d * 1000, c0 = 0.03 / p.crop, Hy = f * f / (p.N * c0) + f;
    const near = s * (Hy - f) / (Hy + s - 2 * f), far = s >= Hy ? Infinity : s * (Hy - f) / (Hy - s);
    const blurMM = f * f * (p.bg * 1000) / (p.N * (s - f) * (s + p.bg * 1000)), blurPct = 100 * blurMM / sw, sd = blurMM / sw * FW / 2.2;
    const personH = 1.75 * ppm, eyeY = personH > FH * 0.9 ? FH * 0.36 : null;
    const feetY = eyeY != null ? eyeY + personH * 0.93 : FH * 0.9, cx = ox + FW * (p.vert ? 0.5 : 0.42);
    const hor = feetY - (1.5 * ppm) + 1.5 * ppmB > FH ? FH * 0.6 : feetY - 1.5 * ppm + 1.5 * ppmB; // suelo del fondo según altura de cámara 1,5 m
    const gy = clamp(hor, 0, FH), bw = 6 * ppmB, bh = 5 * ppmB, bx = ox + FW * 0.58;
    const u = personH;
    v.innerHTML = `<defs><filter id="so-b" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${clamp(sd, 0, 40).toFixed(1)}"/></filter><clipPath id="so-cl"><rect x="${ox}" y="0" width="${FW}" height="${FH}"/></clipPath></defs>
      <g clip-path="url(#so-cl)"><g filter="url(#so-b)">
        <rect x="${ox - 60}" y="-40" width="${FW + 120}" height="${gy + 40}" fill="#27405f"/><rect x="${ox - 60}" y="${gy}" width="${FW + 120}" height="${FH - gy + 60}" fill="#3a3a36"/>
        <g fill="none" stroke="#ff5a3c" stroke-width="${Math.max(1.5, bw * 0.08)}"><path d="M${bx - bw / 2},${gy} v${-bh} M${bx + bw / 2},${gy} v${-bh} M${bx - bw * 0.62},${gy - bh * 0.95} h${bw * 1.24} M${bx - bw * 0.5},${gy - bh * 0.72} h${bw}"/></g>
        ${[-2.2, -1.2, 1.5, 2.6].map(k => `<circle cx="${bx + k * bw * 0.8}" cy="${gy - 3 * ppmB}" r="${1.6 * ppmB}" fill="#1f4d36"/><rect x="${bx + k * bw * 0.8 - 0.15 * ppmB}" y="${gy - 1.6 * ppmB}" width="${0.3 * ppmB}" height="${1.6 * ppmB}" fill="#3b2a1c"/>`).join('')}
        ${[0.2, 0.5, 0.8].map(k => `<circle cx="${ox + FW * k}" cy="${gy - 4.2 * ppmB}" r="${0.12 * ppmB + 1}" fill="#ffd9a0"/>`).join('')}
      </g>
      <g><circle cx="${cx}" cy="${feetY - u * 0.93}" r="${u * 0.066}" fill="#d9a988"/>
        <path d="M${cx - u * 0.12},${feetY - u * 0.84} q${u * 0.12},${-u * 0.03} ${u * 0.24},0 l${u * 0.03},${u * 0.34} h${-u * 0.3}z" fill="#2f7bff"/>
        <path d="M${cx - u * 0.09},${feetY - u * 0.5} h${u * 0.18} l${u * 0.01},${u * 0.5} h${-u * 0.08} l${-u * 0.02},${-u * 0.36} l${-u * 0.02},${u * 0.36} h${-u * 0.08}z" fill="#1b1e24"/></g>
      <g stroke="#fff" stroke-opacity=".18"><line x1="${ox + FW / 3}" y1="0" x2="${ox + FW / 3}" y2="${FH}"/><line x1="${ox + 2 * FW / 3}" y1="0" x2="${ox + 2 * FW / 3}" y2="${FH}"/><line x1="${ox}" y1="${FH / 3}" x2="${ox + FW}" y2="${FH / 3}"/><line x1="${ox}" y1="${2 * FH / 3}" x2="${ox + FW}" y2="${2 * FH / 3}"/></g></g>
      <rect x="${ox}" y="0" width="${FW}" height="${FH}" fill="none" stroke="#2c323d"/>`;
    const shot = fieldH > 4 ? 'General' : fieldH > 2.1 ? 'Entero' : fieldH > 1.3 ? 'Americano' : fieldH > 0.75 ? 'Medio' : fieldH > 0.38 ? 'Primer plano' : 'Primerísimo / detalle';
    const fov = 2 * Math.atan(sw / (2 * f)) * 180 / Math.PI, m = n => n >= 100 ? '∞' : n.toFixed(n < 10 ? 2 : 1) + ' m';
    $('#so-fov', el).textContent = fov.toFixed(0) + '°'; $('#so-w', el).textContent = fieldW.toFixed(2) + ' m'; $('#so-shot', el).textContent = shot;
    $('#so-dof', el).textContent = `${m(near / 1000)} – ${far === Infinity ? '∞' : m(far / 1000)}`; $('#so-blur', el).textContent = blurPct.toFixed(1) + ' %'; $('#so-hyp', el).textContent = m(Hy / 1000);
    $('#so-hud', el).textContent = `${f} mm${p.crop > 1 ? ' (equiv. ' + Math.round(f * 1.5) + ' mm)' : ''} · f/${p.N} · ${p.d.toFixed(1)} m`;
    $('#so-f-o', el).textContent = f + ' mm'; $('#so-N-o', el).textContent = 'f/' + p.N + (p.N <= mx + 0.01 ? ' (máx.)' : ''); $('#so-d-o', el).textContent = p.d.toFixed(1) + ' m'; $('#so-bg-o', el).textContent = p.bg + ' m';
    const fi = $('#so-f', el); fi.min = L.min; fi.max = L.max; fi.value = f; fi.disabled = L.min === L.max; $('#so-N', el).value = AP.indexOf(p.N) >= 0 ? AP.indexOf(p.N) : 0; $('#so-d', el).value = p.d;
    let msg = [];
    if (p.d < 0.9 && f * p.crop < 40 && fieldH < 0.9) msg.push('⚠ Muy cerca con angular: la nariz queda mucho más próxima que las orejas y la cara se deforma (es perspectiva por distancia, no un defecto del objetivo).');
    if (p.lens === 'kit') msg.push(`El 28–70 pierde luz al cerrar zoom: a ${f} mm no abre más de f/${mx}.`);
    if (far !== Infinity && (far - near) / 1000 < 0.12) msg.push('Profundidad de campo de pocos centímetros: con sujeto en movimiento el AF trabajará al límite; plantéate cerrar un paso.');
    $('#so-msg', el).innerHTML = msg.join('<br>');
    if (p.lock && p.lens === 'gm') { if (f <= 25) seen.lo = true; if (f >= 69) seen.hi = true; }
    const ok = { E1: p.lens === 'f50' && p.N <= 2 && fieldH > 0.38 && fieldH <= 0.75 && blurPct >= 2, E2: seen.lo && seen.hi, E3: f * p.crop <= 24.5 && p.d >= 3 && far === Infinity };
    for (const g of GOALS) if (ok[g.id] && markGoal(g.id)) { $('#so-goals', el).innerHTML = goalsHTML(GOALS, state().goals); toast('Reto superado · +30 XP'); }
  }
  $('#so-lens', el).onchange = e => { p.lens = e.target.value; draw(); };
  $('#so-f', el).oninput = e => { const nf = +e.target.value; if (p.lock) p.d = clamp(p.d * nf / p.f, 0.5, 15); p.f = nf; draw(); };
  $('#so-N', el).oninput = e => { p.N = AP[+e.target.value]; draw(); };
  $('#so-d', el).oninput = e => { p.d = +e.target.value; draw(); };
  $('#so-bg', el).oninput = e => { p.bg = +e.target.value; draw(); };
  $('#so-lock', el).onchange = e => { p.lock = e.target.checked; seen = { lo: false, hi: false }; draw(); };
  bindSeg(el, 'crop', x => { p.crop = +x; draw(); });
  bindSeg(el, 'vert', x => { p.vert = x === 'v'; draw(); });
  draw();
}
