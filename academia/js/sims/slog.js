// SIMULADOR B — S-Log3. La curva S-Log3 usa la fórmula publicada por Sony. S-Cinetone, ruido y recorte: modelo didáctico.
import { $, slider, seg, bindSeg } from '../ui.js';
import { coach } from './coach.js';

export const slog3Code = x => x >= 0.01125 ? 420 + Math.log10((x + 0.01) / 0.19) * 261.5 : x * (171.2102946929 - 95) / 0.01125 + 95;
export const slog3IRE = x => (slog3Code(x) - 64) / 876 * 100;
export const slog3Inv = ire => { const c = ire / 100 * 876 + 64; return c >= 171.2102946929 ? Math.pow(10, (c - 420) / 261.5) * 0.19 - 0.01 : (c - 95) * 0.01125 / (171.2102946929 - 95); };
export const r709 = x => 100 * (x <= 0 ? 0 : x >= 1 ? 1 : x < 0.018 ? 4.5 * x : 1.099 * Math.pow(x, 0.45) - 0.099);
// Aproximación ilustrativa de una curva tipo S-Cinetone (NO son datos de Sony): 709 con hombro suave y negro algo más bajo
const scine = x => { const b = r709(x * 0.92) - 1.5; if (b < 62) return Math.max(0, b); const t = (Math.log2(x / 0.18) - 1.05) / 3.6; return Math.min(104, 62 + 42 * (1 - Math.exp(-2.4 * Math.max(0, t))) / (1 - Math.exp(-2.4))); };
const st = s => 0.18 * 2 ** s;
const CLIP = 6; // stops sobre el gris en que satura la señal en S-Log3 (≈94 %); coherente con la fórmula
const sg = v => (v >= 0 ? '+' : '') + v.toFixed(1);
export const GOALS = [
  { id: 'B1', title: '«Siempre +1,7»: ponlo a prueba',
    story: 'Contraluz con el cielo a +7 stops sobre el gris. Un compañero te dice que S-Log3 siempre se sobreexpone +1,7. La escena ya está expuesta así.',
    setup: [['#sb-hi', 7], ['#sb-off', 1.7], ['seg:view', 'log']],
    checks: [['Alta luz de la escena en +7 o más', s => s.hi >= 7, s => 'ahora +' + s.hi], ['Nada recorta: la línea naranja fuera de la zona roja', s => !s.hclip, s => s.hclip ? 'recortas ' + (s.hi + s.off - 6).toFixed(1) + ' stops de cielo' : '']],
    hints: ['En la gráfica, la zona roja es lo que el archivo no puede guardar. La línea naranja vertical es tu cielo.', 'Baja «Exposición respecto a la de referencia»: toda la escena baja por la curva y gana sitio arriba.', 'Con el cielo a +7 necesitas exponer a −1 o menos.'],
    solution: 'Exposición a −1,0 (o algo menos). El cielo cabe justo en la señal.',
    learn: '+1,7 fijo habría recortado 2,7 stops de cielo, y eso no se recupera. Sobreexponer S-Log3 es un intercambio: cada stop que subes es un stop de altas luces que pierdes. Primero mira qué recorta.' },
  { id: 'B2', title: 'Escena plana: ahora sí, sube',
    story: 'Entrevista con luz suave y sin ventanas en plano: lo más brillante está a +3. Aquí sobreexponer no cuesta nada. Compruébalo y mira qué gana la imagen.',
    setup: [['#sb-hi', 3], ['#sb-off', 0], ['seg:view', 'log']],
    checks: [['Escena de bajo contraste (alta luz en +3 o menos)', s => s.hi <= 3, s => 'ahora +' + s.hi], ['Exposición +1,5 o más', s => s.off >= 1.5, s => 'ahora ' + sg(s.off)],
      ['Nada recorta', s => !s.hclip], ['Mira el resultado en la vista «Tras normalizar en posproducción»', s => s.view === 'post']],
    hints: ['Sube «Exposición respecto a la de referencia».', 'Con la alta luz en +3 tienes margen de sobra: el recorte empieza unos 6 stops sobre el gris.', 'Pulsa «Tras normalizar en posproducción» y compara los parches oscuros con los de exposición 0.'],
    solution: 'Exposición entre +1,5 y +3 y vista «Tras normalizar».',
    learn: 'Al normalizar bajas la imagen, y con ella el ruido: las sombras quedan más limpias. Con poco contraste, sobreexponer es ganancia sin coste. La decisión depende de la escena, no de una cifra fija.' },
  { id: 'B3', title: 'Coloca la piel en su nivel',
    story: 'Retrato con cebra de rango. La guía de exposición de Sony Cine propone piel clara hacia el 52 % en S-Log3. Ahora mismo está subexpuesta.',
    setup: [['#sb-hi', 5], ['#sb-off', -1], ['seg:view', 'log']],
    checks: [['Alta luz en +5 o menos', s => s.hi <= 5], ['Piel clara en 52 % ±1', s => Math.abs(s.sk - 52) <= 1, s => 'ahora ' + s.sk.toFixed(0) + ' %'], ['Nada recorta', s => !s.hclip]],
    hints: ['Mira el dato «Piel clara» bajo los parches.', 'Sube la exposición poco a poco.', 'Está justo por encima de la referencia, hacia +0,3.'],
    solution: 'Exposición ≈ +0,3: la piel queda en 52 % y el gris en ~43 %.',
    learn: 'En S-Log3 el gris va en 41 %, la piel clara en torno al 48–52 % y el blanco en 61 %. Son niveles de señal: con S-Cinetone la misma piel iría hacia el 60 %. Las cebras no se copian de un perfil a otro.' }
];

export function mount(el, opts = {}) {
  const p = { off: 0, hi: 5, iso: 800, view: 'log' };
  el.innerHTML = `<div class="sim"><div>
    <canvas class="scope" width="640" height="360" id="sb-c" aria-label="Curvas de transferencia"></canvas>
    <span class="lbl mt">Carta de 17 parches (de −8 a +8 stops de la escena)</span>
    ${seg('view', [['log', 'Señal S-Log3 grabada'], ['lut', 'Con asistente/LUT 709'], ['post', 'Tras normalizar en posproducción']], 'log')}
    <canvas class="scope mt" width="646" height="80" id="sb-p" style="margin-top:8px" aria-label="Carta de parches"></canvas>
    <div class="readout"><div><b id="sb-g">–</b><span>Gris 18 %</span></div><div><b id="sb-s">–</b><span>Piel clara (~+1)</span></div><div><b id="sb-w">–</b><span>Blanco 90 %</span></div><div><b id="sb-h">–</b><span>Alta luz máx.</span></div><div><b id="sb-n">–</b><span>Sombra útil hasta</span></div></div>
  </div><div>
    <div id="sb-coach"></div>
    ${slider('sb-off', 'Exposición respecto a la «de referencia»', -3, 3, 0.1, 0)}
    ${slider('sb-hi', 'Alta luz más brillante de la escena', 2, 9, 0.5, 5)}
    <span class="lbl">ISO en S-Log3</span>${seg('iso', [[800, '800'], [3200, '3200'], [12800, '12800']], 800)}
    <div class="card mt" id="sb-msg" style="font-size:.9rem"></div>
    <p class="note"><strong>Exacto:</strong> la curva S-Log3 (fórmula de Sony: gris 18 % → 41 %, blanco 90 % → 61 %, negro → 3,5 %) y la curva Rec.709.<br><strong>Modelo didáctico:</strong> la curva «tipo S-Cinetone» es una aproximación ilustrativa; el suelo de ruido (≈7 stops bajo el gris a ISO 800, coherente con los ~12,9 stops que midió CineD) y su variación con el ISO están simplificados. La mejora en torno a ISO 3200 la describen pruebas independientes; Sony no la documenta para la A7 IV.</p>
  </div></div>`;
  const c = $('#sb-c', el), x = c.getContext('2d'), pc = $('#sb-p', el), px = pc.getContext('2d');
  const X = s => 50 + (s + 8) / 16 * 570, Y = v => 330 - v / 109 * 310;
  const floor = () => -7 + Math.log2(p.iso / 800) - (p.iso >= 3200 ? 1.2 : 0);

  function draw() {
    x.clearRect(0, 0, 640, 360); x.font = '11px ui-monospace,Menlo,monospace';
    for (let s = -8; s <= 8; s += 2) { x.strokeStyle = '#1d222a'; x.beginPath(); x.moveTo(X(s), 20); x.lineTo(X(s), 330); x.stroke(); x.fillStyle = '#6f7887'; x.textAlign = 'center'; x.fillText((s > 0 ? '+' : '') + s, X(s), 346); }
    for (let v = 0; v <= 100; v += 20) { x.strokeStyle = '#1d222a'; x.beginPath(); x.moveTo(50, Y(v)); x.lineTo(620, Y(v)); x.stroke(); x.fillStyle = '#6f7887'; x.textAlign = 'right'; x.fillText(v + ' %', 44, Y(v) + 4); }
    x.textAlign = 'left'; x.fillText('stops de escena respecto al gris medio →', 380, 358);
    // zonas: ruido y recorte según desplazamiento
    const fl = floor() - p.off, cl = CLIP - p.off;
    x.fillStyle = 'rgba(255,138,31,.10)'; x.fillRect(X(-8), 20, Math.max(0, X(Math.max(-8, fl)) - X(-8)), 310);
    if (cl < 8) { x.fillStyle = 'rgba(255,82,99,.13)'; x.fillRect(X(cl), 20, X(8) - X(cl), 310); }
    x.fillStyle = '#ff8a1f'; x.fillText('ruido', X(-8) + 4, 34); if (cl < 7.4) { x.fillStyle = '#ff5263'; x.fillText('recorte', X(cl) + 4, 34); }
    const curve = (fn, col, w, dash) => { x.strokeStyle = col; x.lineWidth = w; x.setLineDash(dash || []); x.beginPath(); for (let s = -8; s <= 8.01; s += 0.1) { const v = fn(st(s + p.off)); s === -8 ? x.moveTo(X(s), Y(v)) : x.lineTo(X(s), Y(v)); } x.stroke(); x.setLineDash([]); };
    curve(r709, '#6f7887', 1.5, [5, 4]); curve(scine, '#35c98a', 1.5, [2, 3]);
    curve(v => Math.min(slog3IRE(v), slog3IRE(st(CLIP))), '#2f7bff', 2.5);
    x.fillStyle = '#2f7bff'; x.fillText('S-Log3', 56, Y(slog3IRE(st(-8 + p.off))) - 8);
    x.fillStyle = '#6f7887'; x.fillText('Rec.709', X(1.2 - p.off) - 70, Y(86));
    x.fillStyle = '#35c98a'; x.fillText('tipo S-Cinetone (ilustrativa)', X(3 - p.off) > 420 ? 410 : X(3 - p.off) + 8, Y(104) + 14);
    const mark = (s, lab, col) => { const v = slog3IRE(st(Math.min(s + p.off, CLIP))); x.fillStyle = col; x.beginPath(); x.arc(X(s), Y(v), 5, 0, 7); x.fill(); x.fillText(lab, X(s) + 8, Y(v) + 14); return v; };
    const g = mark(0, 'gris', '#fff'), sk = mark(1, 'piel', '#ffb38a'), w = mark(2.32, 'blanco 90 %', '#fff');
    x.strokeStyle = '#ff8a1f'; x.setLineDash([3, 3]); x.beginPath(); x.moveTo(X(p.hi), 20); x.lineTo(X(p.hi), 330); x.stroke(); x.setLineDash([]); x.fillStyle = '#ff8a1f'; x.fillText('alta luz máx.', Math.min(X(p.hi) + 4, 540), 50);
    const hclip = p.hi + p.off > CLIP + 0.001;
    $('#sb-g', el).textContent = g.toFixed(0) + ' %'; $('#sb-s', el).textContent = sk.toFixed(0) + ' %'; $('#sb-w', el).textContent = w.toFixed(0) + ' %';
    $('#sb-h', el).innerHTML = hclip ? '<span style="color:#ff5263">RECORTA</span>' : slog3IRE(st(p.hi + p.off)).toFixed(0) + ' %';
    $('#sb-n', el).textContent = fl.toFixed(1) + ' st';
    $('#sb-off-o', el).textContent = (p.off >= 0 ? '+' : '') + p.off.toFixed(1) + ' stops'; $('#sb-hi-o', el).textContent = '+' + p.hi + ' stops';
    // parches
    px.clearRect(0, 0, 646, 80);
    for (let i = 0; i < 17; i++) {
      const s = i - 8, cap = s + p.off, clipped = cap > CLIP, sig = st(Math.min(cap, CLIP));
      let v, noiseAmp = 0.5 * Math.pow(2, (floor() - cap)) ; // amplitud relativa didáctica: 0,5 cuando señal = suelo
      if (p.view === 'log') { v = slog3IRE(sig) / 100; noiseAmp *= 0.25; }
      else if (p.view === 'lut') { v = r709(sig / 0.9 * 0.9 * (0.18 / 0.18)) / 100; v = scineLike(sig); noiseAmp *= 0.6; }
      else { const norm = Math.min(sig, st(CLIP)) / 2 ** p.off; v = scineLike(norm); noiseAmp *= 0.6; }
      const id = px.createImageData(36, 60);
      for (let k = 0; k < 36 * 60; k++) { const n = (Math.random() + Math.random() + Math.random() - 1.5) * Math.min(0.5, noiseAmp) * Math.max(v, 0.06); const o = Math.max(0, Math.min(1, v + n)) * 255; id.data[k * 4] = id.data[k * 4 + 1] = id.data[k * 4 + 2] = o; id.data[k * 4 + 3] = 255; }
      px.putImageData(id, 2 + i * 38, 2);
      px.fillStyle = clipped ? '#ff5263' : s === 0 ? '#fff' : '#6f7887'; px.font = '10px ui-monospace,Menlo,monospace'; px.textAlign = 'center'; px.fillText(clipped ? 'CLIP' : (s > 0 ? '+' : '') + s, 20 + i * 38, 76);
    }
    // mensaje
    const usable = Math.min(p.hi, CLIP - p.off) - fl;
    let m = hclip ? `<b style="color:#ff5263">Recortas ${(p.hi + p.off - CLIP).toFixed(1)} stops de altas luces.</b> Esa información no existe en el archivo: ninguna corrección la devuelve. Si esas luces importan (cielo, piel al sol, vestido blanco), baja la exposición; si son focos o reflejos especulares, quizá puedas aceptarlo.`
      : p.off > 0.4 ? `<b style="color:#35c98a">Sobreexposición de +${p.off.toFixed(1)} sin recorte.</b> Al normalizar en posproducción bajas la señal y el ruido con ella: sombras más limpias. Te quedan ${(CLIP - p.off - p.hi).toFixed(1)} stops de margen sobre tu alta luz más brillante.`
        : p.off < -0.4 ? `<b style="color:#ff8a1f">Subexposición de ${p.off.toFixed(1)}.</b> Proteges ${(CLIP - p.off).toFixed(1)} stops sobre el gris, pero al subir la imagen en posproducción subirás también el ruido: mira los parches oscuros en «Tras normalizar».`
          : `<b>Exposición de referencia.</b> Gris en ~41 %, blanco 90 % en ~61 %. Margen de ${(CLIP - p.hi - p.off).toFixed(1)} stops sobre la alta luz más brillante.`;
    m += `<br><span class="muted">Rango de escena aprovechable ahora: ≈ ${usable.toFixed(1)} stops.</span>`;
    if (p.view === 'lut') m += '<br><span class="muted">La vista con asistente/LUT solo cambia lo que ves: el archivo sigue siendo la señal S-Log3. Lo que la LUT muestra quemado puede estar intacto en la grabación, y al revés.</span>';
    $('#sb-msg', el).innerHTML = m;
    co.update({ ...p, hclip, sk });
  }
  function scineLike(lin) { return Math.max(0, Math.min(1, scine(lin) / 100)); }
  $('#sb-off', el).oninput = e => { p.off = +e.target.value; draw(); };
  $('#sb-hi', el).oninput = e => { p.hi = +e.target.value; draw(); };
  bindSeg(el, 'iso', v => { p.iso = +v; draw(); });
  bindSeg(el, 'view', v => { p.view = v; draw(); });
  const co = coach($('#sb-coach', el), el, { goals: GOALS, start: opts.goal, intro: [
    'La gráfica muestra cómo cada stop de la escena (eje horizontal) se convierte en señal grabada (eje vertical). La línea azul es S-Log3.',
    'Mueve la exposición: toda la escena se desliza por la curva. La zona roja es recorte y la naranja, ruido.',
    'Elige un reto: la lista se marca en verde según lo consigues. Los parches de abajo enseñan el resultado en tres vistas.'
  ] });
  draw();
}
