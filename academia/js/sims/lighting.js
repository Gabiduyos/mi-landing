// SIMULADOR D — Iluminación. Sombreado difuso real sobre una esfera (Lambert + cuadrado inverso);
// la «suavidad» es una aproximación (wrap lighting), no un cálculo de fuente extensa.
import { $, $$, slider, clamp } from '../ui.js';
import { coach } from './coach.js';

const deg = v => Math.round(v) + '°';
const BASE = { key: { on: true, a: 45, d: 2, i: 70, s: 0.3, k: 5600 }, fill: { on: true, a: -40, d: 2.5, i: 12, s: 0.9, k: 5600 }, back: { on: true, a: -150, d: 2, i: 55, s: 0.2, k: 5600 } };
export const GOALS = [
  { id: 'D1', title: 'Arregla un retrato plano',
    story: 'La principal está pegada a la cámara y es dura: la cara queda plana y sin volumen. Conviértelo en un retrato suave clásico.',
    setup: { L: { ...BASE, key: { on: true, a: 0, d: 2, i: 70, s: 0.15, k: 5600 } }, wb: 5600, bg: 15 },
    checks: [['Principal desplazada entre 30° y 60° (arrastra el punto naranja)', s => s.ka >= 30 && s.ka <= 60, s => 'ahora ' + deg(s.ka)],
      ['Principal suave: «Suavidad» al 60 % o más', s => s.key.s >= 0.6, s => 'ahora ' + Math.round(s.key.s * 100) + ' %'], ['Relleno encendido', s => s.fill.on],
      ['Contraste entre los dos lados de la cara de 1 a 2 stops', s => s.stops >= 1 && s.stops <= 2, s => 'ahora ' + s.stops.toFixed(1) + ' stops'], ['Piel sin quemar', s => s.lvl < 92]],
    hints: ['En la planta, la cámara está abajo. Arrastra el punto naranja (principal) hacia un lado, en diagonal.', 'Selecciona «Principal» y sube «Suavidad»: así simulas una fuente más grande, como una ventana o un softbox.', 'Si el contraste no llega a 1 stop, el relleno está demasiado fuerte: selecciónalo y baja su intensidad.'],
    solution: 'Principal a unos 45° y suavidad al 60 %; relleno encendido a intensidad baja (≈ 12 %, como viene).',
    learn: 'Mover la luz fuera del eje de cámara crea sombra, y la sombra crea volumen. La suavidad la da el tamaño aparente de la fuente; el relleno decide lo oscura que queda esa sombra.' },
  { id: 'D2', title: 'Look de videoclip dramático',
    story: 'El artista quiere un plano duro y oscuro, con media cara en sombra y un borde de luz que lo separe del fondo negro.',
    setup: { L: BASE, wb: 5600, bg: 15 },
    checks: [['Relleno apagado (casilla «Encendida»)', s => !s.fill.on], ['Principal lateral, entre 60° y 100°', s => s.ka >= 60 && s.ka <= 100, s => 'ahora ' + deg(s.ka)],
      ['Contra encendida, detrás y en el lado opuesto a la principal', s => s.back.on && Math.abs(s.ba) > 110 && Math.sign(s.ba) !== Math.sign(s.kaS), s => s.back.on ? (Math.abs(s.ba) <= 110 ? 'la contra no está detrás del sujeto' : Math.sign(s.ba) === Math.sign(s.kaS) ? 'está en el mismo lado que la principal' : '') : 'contra apagada'],
      ['Contraste de 3 stops o más', s => s.stops >= 3, s => 'ahora ' + s.stops.toFixed(1) + ' stops']],
    hints: ['Selecciona «Relleno» y desmarca «Encendida».', 'Arrastra la principal hacia el lateral del sujeto, casi a 90°.', 'La contra (azul) va detrás, en el lado contrario a la principal: dibuja el borde del lado en sombra.'],
    solution: 'Relleno apagado, principal a ≈ 80° por un lado y contra detrás por el lado contrario (≈ −150°).',
    learn: 'Quitar luz es tan importante como ponerla. Con 3 stops o más entre lados, la cara gana dramatismo; la contra evita que el lado oscuro se funda con el fondo.' },
  { id: 'D3', title: 'Separación por color, sin geles',
    story: 'Truco clásico con poco equipo: piel neutra-cálida y un borde frío. Tu LED principal va a 3200 K y la contra, a luz día.',
    setup: { L: BASE, wb: 5600, bg: 15 },
    checks: [['Balance de cámara entre 3200 y 3600 K', s => s.wb >= 3200 && s.wb <= 3600, s => 'ahora ' + s.wb + ' K'], ['Principal a 3300 K o menos', s => s.key.on && s.key.k <= 3300, s => 'ahora ' + s.key.k + ' K'],
      ['Contra a 5600 K o más, detrás del sujeto', s => s.back.on && s.back.k >= 5600 && Math.abs(s.ba) > 110, s => 'ahora ' + s.back.k + ' K'], ['Fondo por debajo del 20 %', s => s.bg < 20, s => 'ahora ' + s.bg + ' %']],
    hints: ['El balance de cámara está bajo la línea, en el mismo panel.', 'Selecciona «Principal» y baja su temperatura a 3200 K.', 'Con la cámara a 3200–3600 K, la contra a luz día se verá azul: esa es la separación.'],
    solution: 'Balance 3400 K, principal a 3200 K, contra a 5600 K detrás y fondo al 15 %.',
    learn: 'El balance es global: lo que coincide con él se ve neutro y lo que es más frío se ve azul. Así consigues el contraste cálido–frío del cine sin filtros de color.' }
];
const kel = k => { const t = (k - 5600) / 2400; return [1 - 0.28 * t, 1 - 0.04 * Math.abs(t), 1 + 0.42 * t].map(v => Math.max(0.3, v)); };
const S = 150;

export function mount(el, opts = {}) {
  const L = {
    key: { n: 'Principal', c: '#ff8a1f', on: true, a: 45, d: 2, i: 70, s: 0.3, k: 5600, e: 25 },
    fill: { n: 'Relleno', c: '#35c98a', on: true, a: -40, d: 2.5, i: 12, s: 0.9, k: 5600, e: 10 },
    back: { n: 'Contra', c: '#2f7bff', on: true, a: -150, d: 2, i: 55, s: 0.2, k: 5600, e: 40 }
  };
  let sel = 'key', wb = 5600, bg = 15, co = null;
  el.innerHTML = `<div class="sim"><div>
    <div class="grid" style="grid-template-columns:1fr 1fr;gap:10px">
      <div><span class="lbl">Planta (arrastra las luces)</span><svg class="stage" viewBox="0 0 300 300" id="sd-top" aria-label="Planta del set"></svg></div>
      <div><span class="lbl">Lo que ve la cámara</span><div class="screen"><canvas width="${S}" height="${S}" id="sd-c" aria-label="Sujeto iluminado"></canvas></div></div>
    </div>
    <div class="readout"><div><b id="sd-r">–</b><span>Contraste cara</span></div><div><b id="sd-kf">–</b><span>Principal:relleno</span></div><div><b id="sd-p">–</b><span>Esquema</span></div><div><b id="sd-x">–</b><span>Nivel piel</span></div></div>
  </div><div>
    <div id="sd-coach"></div>
    <span class="lbl">Luz seleccionada</span>
    <div class="seg" id="sd-sel">${Object.entries(L).map(([k, l]) => `<button type="button" data-l="${k}" style="border-color:${l.c}">${l.n}</button>`).join('')}</div>
    <label class="row small" style="margin:10px 0"><input type="checkbox" id="sd-on"> Encendida</label>
    ${slider('sd-i', 'Intensidad', 0, 100, 1, 70)}
    ${slider('sd-s', 'Suavidad (tamaño aparente)', 0, 100, 1, 60)}
    ${slider('sd-k', 'Temperatura de color', 2700, 8000, 100, 5600)}
    <hr style="border-color:var(--line)">
    ${slider('sd-wb', 'Balance de blancos de cámara', 2700, 8000, 100, 5600)}
    ${slider('sd-bg', 'Luz sobre el fondo', 0, 100, 1, 15)}
    <p class="note"><strong>Fundamentado:</strong> la luz cae con el cuadrado de la distancia y la sombra depende del ángulo entre la superficie y la luz. Acercar una luz la hace más intensa <em>y</em>, en la realidad, más suave (aquí la suavidad se ajusta aparte).<br><strong>Modelo didáctico:</strong> la cara es una esfera sin nariz ni cuencas, la suavidad es una aproximación, no hay rebotes de la sala ni sombras proyectadas. Los nombres de esquema dependen también de la altura de la luz, que aquí es fija.</p>
  </div></div>`;
  const top = $('#sd-top', el), cv = $('#sd-c', el), ctx = cv.getContext('2d'), img = ctx.createImageData(S, S);
  const pos = l => [150 + l.d * 36 * Math.sin(l.a * Math.PI / 180), 125 + l.d * 36 * Math.cos(l.a * Math.PI / 180)];

  function drawTop() {
    top.innerHTML = `<rect x="20" y="8" width="260" height="8" fill="rgb(${bg * 2 + 30},${bg * 2 + 30},${bg * 2 + 36})"/><text x="150" y="30" fill="#6f7887" font-size="9" text-anchor="middle" font-family="monospace">fondo</text>
      ${[1, 2, 3].map(r => `<circle cx="150" cy="125" r="${r * 36}" fill="none" stroke="#1d222a"/>`).join('')}
      <circle cx="150" cy="125" r="13" fill="#e9edf2"/><path d="M150,138 l-4,8 h8z" fill="#e9edf2"/>
      <g transform="translate(150,280)"><rect x="-12" y="-8" width="24" height="16" rx="2" fill="#6f7887"/><rect x="-5" y="-15" width="10" height="8" fill="#6f7887"/></g><text x="180" y="285" fill="#6f7887" font-size="9" font-family="monospace">cámara</text>
      ${Object.entries(L).map(([k, l]) => { const [x, y] = pos(l); return `<line x1="${x}" y1="${y}" x2="150" y2="125" stroke="${l.c}" stroke-dasharray="3 3" opacity="${l.on ? 0.7 : 0.15}"/><g data-l="${k}" style="cursor:grab"><circle cx="${x}" cy="${y}" r="20" fill="transparent"/><circle cx="${x}" cy="${y}" r="${6 + l.s * 8}" fill="${l.c}" opacity="${l.on ? 1 : 0.3}" stroke="${k === sel ? '#fff' : 'none'}" stroke-width="2"/></g>`; }).join('')}`;
  }
  function render() {
    const w = kel(wb), d = img.data, lights = Object.values(L).filter(l => l.on && l.i > 0).map(l => {
      const a = l.a * Math.PI / 180, e = l.e * Math.PI / 180, c = kel(l.k);
      return { v: [Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e)], E: (l.i / 70) * 4 / (l.d * l.d), w: l.s * 0.35, c: [c[0] / w[0], c[1] / w[1], c[2] / w[2]] };
    });
    let sl = 0, sr = 0, nl = 0, nr = 0, sm = 0, nm = 0;
    const R = 46, cx = S / 2, cy = 62;
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const i = (y * S + x) * 4, dx = (x - cx) / R, dy = (cy - y) / R, r2 = dx * dx + dy * dy;
      let r, g, b;
      const body = y > cy + R - 4 && Math.abs(x - cx) < 30 + (y - cy - R) * 1.1;
      if (r2 <= 1 || body) {
        let n = r2 <= 1 ? [dx, dy, Math.sqrt(1 - r2)] : [(x - cx) / 90, 0.35, 0.9];
        const alb = r2 <= 1 ? [0.62, 0.45, 0.36] : [0.2, 0.2, 0.22];
        r = g = b = 0.004;
        for (const l of lights) { const nd = n[0] * l.v[0] + n[1] * l.v[1] + n[2] * l.v[2], df = Math.max(0, (nd + l.w) / (1 + l.w)) * l.E; r += df * l.c[0]; g += df * l.c[1]; b += df * l.c[2]; }
        const lum = (r + g + b) / 3;
        if (r2 <= 0.55) { if (dx < -0.35) { sl += lum; nl++; } else if (dx > 0.35) { sr += lum; nr++; } sm += lum * 0.45; nm++; }
        r *= alb[0]; g *= alb[1]; b *= alb[2];
      } else { const v = (bg / 100) ** 2 * 0.9 * (1 - Math.hypot(x - cx, y - 60) / 260); r = v / w[0] * 0.9; g = v; b = v / w[2] * 1.05; }
      d[i] = 255 * Math.pow(clamp(r, 0, 1), 0.45); d[i + 1] = 255 * Math.pow(clamp(g, 0, 1), 0.45); d[i + 2] = 255 * Math.pow(clamp(b, 0, 1), 0.45); d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    const a = sl / (nl || 1) + 0.002, b2 = sr / (nr || 1) + 0.002, stops = Math.abs(Math.log2(a / b2));
    const k = L.key, f = L.fill, ek = k.on ? k.i / (k.d * k.d) : 0, ef = f.on ? f.i / (f.d * f.d) : 0, ka = Math.abs(((k.a + 540) % 360) - 180);
    const patt = !k.on ? 'sin principal' : ka < 15 ? 'frontal (plana)' : ka < 35 ? 'tipo «loop»' : ka < 60 ? '45° (Rembrandt si es alta)' : ka < 105 ? 'lateral (split)' : 'contra / recorte';
    const lvl = 100 * Math.pow(clamp(sm / (nm || 1), 0, 1), 0.45);
    $('#sd-r', el).textContent = stops.toFixed(1) + ' stops'; $('#sd-kf', el).textContent = ef > 0 && ek > 0 ? `${((ek + ef) / ef).toFixed(1)}:1` : ek > 0 ? 'sin relleno' : '–';
    $('#sd-p', el).textContent = patt; $('#sd-x', el).innerHTML = lvl > 92 ? '<span style="color:#ff5263">quemada</span>' : lvl < 20 ? '<span style="color:#ff8a1f">muy oscura</span>' : lvl.toFixed(0) + ' %';
    const bk = L.back, ba = ((bk.a + 540) % 360) - 180, kaS = ((k.a + 540) % 360) - 180;
    if (co) co.update({ key: k, fill: f, back: bk, ka, kaS, ba, stops, lvl, wb, bg });
  }
  function panel() {
    const l = L[sel];
    $$('#sd-sel button', el).forEach(b => b.classList.toggle('on', b.dataset.l === sel));
    $('#sd-on', el).checked = l.on; $('#sd-i', el).value = l.i; $('#sd-s', el).value = l.s * 100; $('#sd-k', el).value = l.k;
    $('#sd-i-o', el).textContent = l.i + ' % · ' + l.d.toFixed(1) + ' m'; $('#sd-s-o', el).textContent = l.s < 0.3 ? 'dura' : l.s < 0.65 ? 'media' : 'suave'; $('#sd-k-o', el).textContent = l.k + ' K';
    $('#sd-wb-o', el).textContent = wb + ' K'; $('#sd-bg-o', el).textContent = bg + ' %';
  }
  const all = () => { drawTop(); panel(); render(); };
  let drag = null;
  top.addEventListener('pointerdown', e => { const g = e.target.closest('[data-l]'); if (!g) return; drag = sel = g.dataset.l; top.setPointerCapture(e.pointerId); all(); });
  top.addEventListener('pointermove', e => {
    if (!drag) return; const r = top.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * 300 - 150, y = (e.clientY - r.top) / r.height * 300 - 125;
    const l = L[drag]; l.d = clamp(Math.hypot(x, y) / 36, 0.7, 3.4); l.a = Math.round(Math.atan2(x, y) * 180 / Math.PI); all();
  });
  const end = () => { drag = null; }; top.addEventListener('pointerup', end); top.addEventListener('pointercancel', end);
  $('#sd-sel', el).onclick = e => { const b = e.target.closest('button'); if (b) { sel = b.dataset.l; all(); } };
  $('#sd-on', el).onchange = e => { L[sel].on = e.target.checked; all(); };
  $('#sd-i', el).oninput = e => { L[sel].i = +e.target.value; all(); };
  $('#sd-s', el).oninput = e => { L[sel].s = e.target.value / 100; all(); };
  $('#sd-k', el).oninput = e => { L[sel].k = +e.target.value; all(); };
  $('#sd-wb', el).oninput = e => { wb = +e.target.value; all(); };
  $('#sd-bg', el).oninput = e => { bg = +e.target.value; all(); };
  co = coach($('#sd-coach', el), el, { goals: GOALS, start: opts.goal,
    apply: st => { for (const k in st.L) Object.assign(L[k], st.L[k]); wb = st.wb; bg = st.bg; $('#sd-wb', el).value = wb; $('#sd-bg', el).value = bg; sel = 'key'; all(); },
    intro: ['La planta es el plató visto desde arriba: el sujeto en el centro y la cámara abajo. Arrastra los puntos de color para mover cada luz.',
      'Toca una luz (o sus botones) para seleccionarla y cambiar intensidad, suavidad, temperatura o apagarla.',
      'A la derecha ves el resultado en la cara. Elige un reto y sigue la lista: se marca en verde.'] });
  all();
}
