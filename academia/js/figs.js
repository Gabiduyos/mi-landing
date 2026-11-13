// Ilustraciones vectoriales locales (sin red). Son esquemas didácticos, no fotografías.
const W = '#e9edf2', G = '#6f7887', B = '#2f7bff', O = '#ff8a1f', GR = '#35c98a', R = '#ff5263', L = '#2c323d';
const svg = (w, h, body, label) => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}" font-family="ui-monospace,Menlo,monospace" font-size="11">${body}</svg>`;
const t = (x, y, s, c = W, a = 'start', fs = 11) => `<text x="${x}" y="${y}" fill="${c}" text-anchor="${a}" font-size="${fs}">${s}</text>`;
const ln = (x1, y1, x2, y2, c = G, w = 1, d = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" ${d ? `stroke-dasharray="${d}"` : ''}/>`;
const rc = (x, y, w, h, f, s = 'none', r = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" stroke="${s}" rx="${r}"/>`;
const ci = (x, y, r, f, s = 'none', sw = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" stroke="${s}" stroke-width="${sw}"/>`;

function histo(x, y, w, h, fn, label, warn) {
  let p = `M${x},${y + h}`;
  for (let i = 0; i <= 40; i++) p += ` L${x + (i / 40) * w},${y + h - fn(i / 40) * h}`;
  return rc(x, y, w, h, '#0a0c10', L, 4) + `<path d="${p} L${x + w},${y + h} Z" fill="${warn ? O : B}" opacity=".85"/>` + t(x + w / 2, y + h + 16, label, warn ? O : W, 'middle');
}
const bell = (c, s) => v => Math.exp(-((v - c) ** 2) / (2 * s * s));

function person(x, y, s, c = W) { // figura simple, y = pies
  return `<g fill="none" stroke="${c}" stroke-width="${Math.max(1.5, s / 18)}" stroke-linecap="round">` +
    `<circle cx="${x}" cy="${y - s * 0.9}" r="${s * 0.1}" fill="${c}"/>` +
    `<path d="M${x},${y - s * 0.8} L${x},${y - s * 0.4} M${x - s * 0.18},${y - s * 0.62} L${x + s * 0.18},${y - s * 0.62} M${x},${y - s * 0.4} L${x - s * 0.13},${y} M${x},${y - s * 0.4} L${x + s * 0.13},${y}"/></g>`;
}
function camIcon(x, y, rot = 0, c = B) {
  return `<g transform="translate(${x},${y}) rotate(${rot})"><rect x="-10" y="-7" width="20" height="14" rx="2" fill="${c}"/><path d="M10,-4 L18,-9 L18,9 L10,4Z" fill="${c}"/></g>`;
}
function lamp(x, y, rot, c = O, lab = '') {
  return `<g transform="translate(${x},${y}) rotate(${rot})"><path d="M-8,-8 L8,-8 L14,8 L-14,8Z" fill="${c}"/></g>` + (lab ? t(x, y - 16, lab, c, 'middle', 10) : '');
}

export const FIGS = {
  triangulo: svg(600, 300,
    `<path d="M300,30 L80,250 L520,250Z" fill="none" stroke="${B}" stroke-width="2"/>` +
    t(300, 22, 'DIAFRAGMA  f/', W, 'middle', 13) + t(300, 60, 'cantidad de luz + profundidad de campo', G, 'middle') +
    t(70, 272, 'OBTURACIÓN  1/s', W, 'middle', 13) + t(110, 290, 'tiempo de luz + desenfoque de movimiento', G, 'middle') +
    t(530, 272, 'ISO', W, 'middle', 13) + t(500, 290, 'amplificación + ruido', G, 'middle') +
    ci(300, 180, 34, 'none', O, 2) + t(300, 177, 'ND', O, 'middle', 13) + t(300, 192, 'resta luz', O, 'middle', 9) +
    t(300, 130, 'cada lado cambia la luz Y la estética', G, 'middle'), 'Triángulo de exposición con filtro ND en el centro'),

  stops: svg(600, 150,
    [0, 1, 2, 3, 4, 5, 6].map(i => rc(30 + i * 78, 40, 70, 40, `rgb(${20 + i * 38},${20 + i * 38},${20 + i * 38})`, L, 4) +
      t(65 + i * 78, 100, ['f/16', 'f/11', 'f/8', 'f/5.6', 'f/4', 'f/2.8', 'f/2'][i], W, 'middle') +
      t(65 + i * 78, 116, ['1/800', '1/400', '1/200', '1/100', '1/50', '1/25', '1/13'][i], G, 'middle') +
      t(65 + i * 78, 132, ['100', '200', '400', '800', '1600', '3200', '6400'][i], B, 'middle')).join('') +
    t(30, 26, 'Cada casilla = 1 stop = el doble de luz que la anterior (diafragma · obturación · ISO)', W), 'Escala de pasos de exposición'),

  histos: svg(600, 170,
    histo(15, 15, 180, 110, v => bell(0.12, 0.09)(v) * 0.95 + (v < 0.03 ? 0.9 : 0), 'Subexpuesto: pegado a la izquierda', true) +
    histo(210, 15, 180, 110, v => bell(0.45, 0.2)(v) * 0.8, 'Repartido, sin tocar extremos') +
    histo(405, 15, 180, 110, v => bell(0.85, 0.1)(v) * 0.8 + (v > 0.97 ? 1 : 0), 'Altas luces recortadas (pico derecho)', true), 'Tres histogramas: subexpuesto, equilibrado y quemado'),

  angulo: svg(600, 190,
    [[90, 45, '45° · 1/200 a 25p', 'nítido, nervioso'], [300, 180, '180° · 1/50 a 25p', 'desenfoque natural'], [510, 360, '360° · 1/25 a 25p', 'muy barrido']].map(([x, a, l1, l2]) => {
      const r = 52, rad = (a - 90) * Math.PI / 180, ex = x + r * Math.cos(rad), ey = 80 + r * Math.sin(rad);
      const arc = a >= 360 ? ci(x, 80, r, B) : `<path d="M${x},80 L${x},${80 - r} A${r},${r} 0 ${a > 180 ? 1 : 0} 1 ${ex},${ey}Z" fill="${B}"/>`;
      return ci(x, 80, r, '#0a0c10', L) + arc + t(x, 155, l1, W, 'middle') + t(x, 172, l2, G, 'middle');
    }).join('') + t(300, 14, 'Ángulo de obturación = fracción del fotograma en que el sensor recibe luz', G, 'middle'), 'Ángulos de obturación 45, 180 y 360 grados'),

  eje180: svg(600, 300,
    ln(40, 150, 560, 150, O, 2, '8 5') + t(555, 142, 'EJE DE ACCIÓN', O, 'end') +
    ci(210, 150, 14, W) + t(210, 126, 'A', W, 'middle', 13) + ci(390, 150, 14, W) + t(390, 126, 'B', W, 'middle', 13) +
    `<path d="M60,150 A240,240 0 0 0 540,150" fill="rgba(47,123,255,.12)" stroke="${B}" stroke-dasharray="4 4"/>` +
    camIcon(170, 245, -55) + camIcon(300, 275, -90) + camIcon(430, 245, -125) + t(300, 215, 'zona segura: A siempre mira a la derecha', B, 'middle') +
    camIcon(300, 50, 90, R) + t(300, 28, 'cruzar el eje: A y B parecen mirar al mismo lado', R, 'middle'), 'Regla del eje de 180 grados vista desde arriba'),

  planos: svg(600, 200,
    [['PG', 0.28, 'General: lugar'], ['PA', 0.55, 'Americano'], ['PM', 0.85, 'Medio: gesto'], ['PP', 1.6, 'Primer plano: emoción'], ['PD', 4, 'Detalle: información']].map(([n, sc, d], i) => {
      const x = 12 + i * 118, s = 130 * sc, cx = x + 55;
      const body = sc >= 4 ? ci(cx, 85, 46, 'none', W, 2) + ci(cx, 85, 18, W) :
        `<svg x="${x}" y="20" width="110" height="130" viewBox="${x} 20 110 130">${person(cx, sc > 1 ? 20 + s * 0.98 : 148, s)}</svg>`;
      return rc(x, 20, 110, 130, '#0a0c10', L, 4) + body + t(cx, 168, n, B, 'middle', 13) + t(cx, 184, d, G, 'middle', 9);
    }).join(''), 'Escala de planos: general, americano, medio, primer plano y detalle'),

  tercios: svg(600, 240,
    rc(20, 20, 270, 152, '#0a0c10', L, 4) + ln(110, 20, 110, 172, G, 1, '3 3') + ln(200, 20, 200, 172, G, 1, '3 3') + ln(20, 70.6, 290, 70.6, G, 1, '3 3') + ln(20, 121.3, 290, 121.3, G, 1, '3 3') +
    ci(200, 70.6, 5, O) + person(200, 165, 110) + t(155, 195, 'Tercios: ojos en el tercio superior,', W, 'middle') + t(155, 211, 'aire hacia donde mira o se mueve', G, 'middle') +
    rc(310, 20, 270, 152, '#0a0c10', L, 4) + ln(445, 20, 445, 172, G, 1, '3 3') + `<path d="M310,172 L445,80 L580,172" fill="none" stroke="${B}" stroke-width="2"/>` + person(445, 150, 80) +
    t(445, 195, 'Simetría + líneas guía:', W, 'middle') + t(445, 211, 'el entorno conduce la mirada al sujeto', G, 'middle'), 'Composición por tercios y por simetría con líneas guía'),

  trespuntos: svg(600, 320,
    ci(300, 150, 22, W) + t(300, 154, 'sujeto', '#000', 'middle', 9) + camIcon(300, 285, -90) + t(330, 300, 'cámara', B) +
    lamp(150, 235, -45, O, 'PRINCIPAL (key) ~45°') + ln(165, 222, 280, 163, O, 1, '4 3') +
    lamp(455, 245, 45, GR, 'RELLENO (fill), más débil') + ln(440, 232, 320, 165, GR, 1, '4 3') +
    lamp(410, 45, 150, B, 'CONTRA / separación') + ln(400, 60, 315, 135, B, 1, '4 3') +
    rc(60, 20, 200, 10, G) + t(160, 48, 'fondo: se expone aparte', G, 'middle'), 'Esquema cenital de iluminación a tres puntos'),

  durasuave: svg(600, 210,
    ci(60, 60, 6, O) + ci(170, 110, 26, W) + `<path d="M196,110 L290,150 L290,190 L170,136Z" fill="#000" stroke="${L}"/>` + ln(66, 62, 150, 96, O, 1, '3 3') +
    t(150, 200, 'Fuente pequeña → borde de sombra nítido (dura)', W, 'middle') +
    rc(330, 20, 14, 90, O) + ci(470, 110, 26, W) + `<defs><linearGradient id="sg" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient></defs>` +
    `<path d="M494,118 L590,150 L590,190 L470,136Z" fill="url(#sg)"/>` + ln(344, 30, 450, 95, O, 1, '3 3') + ln(344, 105, 448, 122, O, 1, '3 3') +
    t(455, 200, 'Fuente grande respecto al sujeto → transición gradual (suave)', W, 'middle'), 'Luz dura frente a luz suave según el tamaño aparente de la fuente'),

  cuadrado: svg(600, 170,
    ci(40, 85, 10, O) + [[150, 20, '1 m', '100 %'], [300, 40, '2 m', '25 % (−2 stops)'], [490, 80, '4 m', '6 % (−4 stops)']].map(([x, s, d, p], i) =>
      rc(x - s / 2, 85 - s / 2, s, s, `rgba(255,138,31,${[0.9, 0.35, 0.12][i]})`, O) + t(x, 150, d, W, 'middle') + t(x, 164, p, G, 'middle')).join('') +
    ln(50, 80, 530, 45, O, 1, '3 3') + ln(50, 90, 530, 125, O, 1, '3 3') + t(300, 14, 'Ley del cuadrado inverso (fuente pequeña): doble distancia = ¼ de luz', G, 'middle'), 'Ley del cuadrado inverso de la luz'),

  croma: svg(600, 170,
    [['4:4:4', (x, y) => true], ['4:2:2', (x, y) => x % 2 === 0], ['4:2:0', (x, y) => x % 2 === 0 && y % 2 === 0]].map(([n, f], k) => {
      let s = '';
      for (let y = 0; y < 2; y++) for (let x = 0; x < 4; x++)
        s += rc(30 + k * 195 + x * 38, 30 + y * 38, 34, 34, '#3a404b', 'none', 3) + (f(x, y) ? ci(47 + k * 195 + x * 38, 47 + y * 38, 8, O) : '');
      return s + t(105 + k * 195, 130, n, W, 'middle', 13) + t(105 + k * 195, 148, ['color en cada píxel', 'color en 1 de cada 2 columnas', 'color en 1 de cada 4 píxeles'][k], G, 'middle', 9);
    }).join('') + t(300, 16, 'Gris = luminancia (siempre completa) · Naranja = muestra de color', G, 'middle'), 'Submuestreo de croma 4:4:4, 4:2:2 y 4:2:0'),

  crop: svg(600, 220,
    rc(120, 20, 360, 160, '#10141a', W, 4) + t(130, 38, 'Full frame 35,9 × 23,9 mm · 4K hasta 30p (sobremuestreo 7K)', W) +
    rc(180, 47, 240, 106, 'rgba(255,138,31,.12)', O, 4) + t(190, 66, 'Super 35 (×1,5) · obligatorio en 4K 50/60p', O) +
    t(300, 108, '24 mm → encuadra como 36 mm', O, 'middle') + t(300, 124, '50 mm → como 75 mm', O, 'middle') +
    t(300, 205, 'El recorte cambia el encuadre, no la perspectiva: si reculas para compensar, sí cambia', G, 'middle'), 'Recorte Super 35 en 4K 50 y 60p de la A7 IV'),

  jlcut: svg(600, 190,
    t(20, 20, 'J-CUT: el audio de B entra antes que su imagen', W) + rc(20, 30, 180, 26, B, 'none', 3) + rc(200, 30, 180, 26, O, 'none', 3) + t(110, 47, 'vídeo A', '#fff', 'middle') + t(290, 47, 'vídeo B', '#000', 'middle') +
    rc(20, 60, 130, 20, '#1d4fa8', 'none', 3) + rc(150, 60, 230, 20, '#b56114', 'none', 3) + t(85, 74, 'audio A', '#fff', 'middle', 9) + t(265, 74, 'audio B', '#fff', 'middle', 9) +
    t(20, 115, 'L-CUT: el audio de A continúa sobre la imagen de B', W) + rc(20, 125, 180, 26, B, 'none', 3) + rc(200, 125, 180, 26, O, 'none', 3) + t(110, 142, 'vídeo A', '#fff', 'middle') + t(290, 142, 'vídeo B', '#000', 'middle') +
    rc(20, 155, 240, 20, '#1d4fa8', 'none', 3) + rc(260, 155, 120, 20, '#b56114', 'none', 3) + t(140, 169, 'audio A', '#fff', 'middle', 9) + t(320, 169, 'audio B', '#fff', 'middle', 9) +
    t(400, 60, 'Crea anticipación:', G) + t(400, 76, 'oímos antes de ver.', G) + t(400, 150, 'Suaviza el corte:', G) + t(400, 166, 'la reacción sobre la voz.', G), 'Esquema de J-cut y L-cut en la línea de tiempo'),

  nodos: svg(600, 150,
    [['1 CST entrada', 'S-Log3 → espacio de trabajo'], ['2 Primarias', 'exposición · balance'], ['3 Secundarias', 'piel · ventanas'], ['4 Look', 'contraste · tinte · grano'], ['5 CST salida', '→ Rec.709 Gamma 2.4']].map(([a, b], i) =>
      rc(10 + i * 118, 45, 106, 56, i === 0 || i === 4 ? '#17243d' : '#1a1e25', i === 3 ? '#c58bff' : i === 0 || i === 4 ? B : L, 6) + t(63 + i * 118, 68, a, W, 'middle', 10) + t(63 + i * 118, 86, b, G, 'middle', 8) +
      (i < 4 ? ln(116 + i * 118, 73, 128 + i * 118, 73, G, 2) : '')).join('') +
    t(300, 24, 'Técnico (azul) ≠ creativo (violeta): primero transformar y corregir, después estilizar', G, 'middle') +
    t(300, 130, 'Orden lógico de trabajo; en la práctica el look se suele diseñar pronto y corregir «debajo» de él', G, 'middle', 9), 'Árbol de nodos básico en DaVinci Resolve'),

  vector: svg(300, 300,
    ci(150, 150, 120, '#05070a', L) + ci(150, 150, 60, 'none', L) + ln(30, 150, 270, 150, L) + ln(150, 30, 150, 270, L) +
    [['R', 103], ['Mg', 61], ['B', 347], ['Cy', 283], ['G', 241], ['Yl', 167]].map(([n, a]) => { const r = a * Math.PI / 180; return rc(150 + 96 * Math.cos(r) - 7, 150 - 96 * Math.sin(r) - 7, 14, 14, 'none', G) + t(150 + 114 * Math.cos(r), 154 - 114 * Math.sin(r), n, G, 'middle', 10); }).join('') +
    ln(150, 150, 150 + 118 * Math.cos(123 * Math.PI / 180), 150 - 118 * Math.sin(123 * Math.PI / 180), O, 2) + t(60, 40, 'línea de piel', O, 'middle', 10) +
    `<ellipse cx="128" cy="116" rx="9" ry="20" transform="rotate(-33 128 116)" fill="${O}" opacity=".5"/>`, 'Vectorscopio con la línea de tono de piel'),

  zebra: svg(600, 190,
    rc(20, 20, 250, 140, '#30343b', L, 6) + ci(145, 80, 34, '#c9a184') + `<defs><pattern id="zb" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="8" fill="#fff"/></pattern></defs>` +
    `<ellipse cx="135" cy="68" rx="14" ry="10" fill="url(#zb)" opacity=".8"/>` + t(145, 178, 'Cebra de rango (p. ej. 52 % ±2): mide un tono', W, 'middle') +
    rc(330, 20, 250, 140, '#30343b', L, 6) + rc(450, 30, 110, 70, '#f4f4f4') + rc(450, 30, 110, 70, 'url(#zb)') + ci(400, 95, 28, '#8a6a55') + t(455, 178, 'Cebra de límite (p. ej. 94 %+): avisa del recorte', O, 'middle'), 'Dos usos de las cebras: medir un tono y avisar del recorte'),

  flujocolor: svg(600, 130,
    [['Escena', 'luz real'], ['Captura', 'S-Log3 / S-Gamut3.Cine'], ['Trabajo', 'DaVinci WG / Intermediate'], ['Salida', 'Rec.709 Gamma 2.4'], ['Pantalla', 'móvil · monitor']].map(([a, b], i) =>
      rc(8 + i * 119, 38, 108, 54, '#1a1e25', i === 1 ? O : i === 3 ? B : L, 6) + t(62 + i * 119, 60, a, W, 'middle', 11) + t(62 + i * 119, 78, b, G, 'middle', 8) +
      (i < 4 ? `<path d="M${116 + i * 119},65 l9,0 m-4,-4 l4,4 l-4,4" stroke="${G}" fill="none" stroke-width="1.5"/>` : '')).join('') +
    t(300, 20, 'Gestión de color: cada flecha es una transformación que debe ser la correcta', G, 'middle') +
    t(300, 116, 'Si interpretas mal la entrada (p. ej. tratar S-Log3 como Rec.709), todo lo demás hereda el error', G, 'middle', 9), 'Cadena de gestión de color de la escena a la pantalla'),

  hz: svg(600, 200,
    `<path d="M300,20 C330,40 345,70 335,100 C350,120 340,150 310,165 C290,185 250,180 230,160 C200,150 190,120 205,100 C200,70 240,30 300,20Z" fill="#10141a" stroke="${L}"/>` +
    ln(268, 30, 268, 185, O, 1.5, '5 4') + t(350, 70, 'ESTE · 50 Hz', B, 'start', 13) + t(350, 88, 'Tokio, Yokohama, Sendai, Sapporo', G) + t(350, 104, 'obturación segura: 1/50 · 1/100', W) +
    t(190, 70, 'OESTE · 60 Hz', O, 'end', 13) + t(190, 88, 'Osaka, Kioto, Nagoya, Hiroshima', G, 'end') + t(190, 104, 'obturación segura: 1/60 · 1/120', W, 'end') +
    t(300, 196, 'Esquema, no mapa a escala. El límite ronda los ríos Fuji (Shizuoka) e Itoi (Niigata).', G, 'middle', 9), 'Frecuencia eléctrica en Japón: 50 Hz al este y 60 Hz al oeste')
};
