// Matemática de exposición compartida. Esta parte SÍ es físicamente fundamentada (definición de EV, ISO 2720).
export const APERTURES = [1.8, 2, 2.8, 4, 5.6, 8, 11, 16, 22];
export const SHUTTERS = [25, 30, 50, 60, 100, 120, 200, 250, 500, 1000, 2000, 4000, 8000];
export const ISOS = [100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200];
export const FPS = [24, 25, 30, 50, 60, 100, 120];

export const log2 = Math.log2;
// EV de los ajustes referido a ISO 100, incluyendo ND (en stops)
export const cameraEV = ({ N, den, iso, nd = 0 }) => log2(N * N * den) + nd - log2(iso / 100);
// stops de sobreexposición (+) o subexposición (−) respecto al gris medio de la escena
export const overStops = (sceneEV, p) => sceneEV - cameraEV(p);
export const shutterAngle = (fps, den) => 360 * fps / den;
// ¿La obturación es múltiplo del semiperiodo de la red? (luz que parpadea a 2×Hz)
export function flickerSafe(hz, den) {
  if (!hz) return true;
  const k = (2 * hz) / den;
  return k >= 0.99 && Math.abs(k - Math.round(k)) < 0.04;
}

export const LENSES = {
  gm: { name: '24–70 mm f/2.8 GM', min: 24, max: 70, maxAp: () => 2.8 },
  f50: { name: '50 mm f/1.8', min: 50, max: 50, maxAp: () => 1.8 },
  kit: { name: '28–70 mm f/3.5–5.6', min: 28, max: 70, maxAp: f => +(3.5 + (f - 28) / 42 * 2.1).toFixed(1) }
};

// Evaluador de coherencia de ajustes para un encargo. Devuelve [{ok, pts, max, msg}]
export function evaluateCamera(scene, p) {
  const out = [];
  const add = (ok, max, msg, partial) => out.push({ ok: ok === true, pts: ok === true ? max : (partial || 0), max, msg });
  const over = overStops(scene.ev, p);
  const log = p.profile === 'slog3';
  // 1 exposición
  const lo = log ? -0.3 : -0.7, hi = log ? 1.7 : 0.5;
  if (over >= lo && over <= hi) add(true, 3, `Exposición coherente: ${over >= 0 ? '+' : ''}${over.toFixed(1)} stops respecto al gris medio de la escena${log && over > 0.5 ? ' (sobreexposición deliberada de S-Log3: comprueba que las altas luces importantes no recortan)' : ''}.`);
  else add(false, 3, `Exposición incoherente: con estos ajustes la escena queda ${over > 0 ? 'sobreexpuesta' : 'subexpuesta'} ${Math.abs(over).toFixed(1)} stops. ${over > 0 ? 'Cierra diafragma, baja ISO o añade ND.' : 'Abre diafragma, sube ISO o alarga la obturación (o añade luz).'}`, Math.abs(over) < 1.5 ? 1 : 0);
  // 2 parpadeo
  if (scene.hz) {
    if (flickerSafe(scene.hz, p.den)) add(true, 2, `Obturación 1/${p.den} compatible con red de ${scene.hz} Hz: sin bandas por la frecuencia de red (los LED con atenuación PWM pueden parpadear igualmente: revisa en pantalla).`);
    else add(false, 2, `Riesgo de parpadeo: 1/${p.den} no es múltiplo del ciclo de luz de una red de ${scene.hz} Hz. Usa 1/${scene.hz} o 1/${scene.hz * 2}.`);
  }
  // 3 movimiento
  if (scene.mode === 'video') {
    const ang = shutterAngle(p.fps, p.den);
    if (ang >= 120 && ang <= 220) add(true, 2, `Ángulo de obturación ≈ ${Math.round(ang)}°: desenfoque de movimiento natural.`);
    else if (scene.allowFast && ang < 120 && ang >= 40) add(true, 2, `Ángulo ≈ ${Math.round(ang)}°: movimiento más nítido y nervioso; aceptable aquí por decisión estética o para evitar ND.`);
    else add(false, 2, `Ángulo de obturación ≈ ${Math.round(ang)}°. ${ang > 220 ? 'Demasiado abierto: el movimiento se emborrona.' : 'Muy cerrado: movimiento entrecortado; justifícalo (acción, estética) o acércate a 180°.'}`, ang >= 80 && ang <= 300 ? 1 : 0);
    if (scene.needSlow) {
      if (p.fps >= 50) add(true, 2, `${p.fps} fps permite cámara lenta real (${Math.round(p.fps / 25 * 100)} % sobre una línea de 25p).${p.fps <= 60 ? ' Recuerda: en 4K 50/60p la A7 IV recorta a Super 35 (×1,5).' : ' 100/120p solo en Full HD.'}`);
      else add(false, 2, `El encargo pide cámara lenta y has elegido ${p.fps} fps: ralentizarlo en montaje inventará fotogramas. Graba a 50p o más los planos que vayas a ralentizar.`);
    }
  } else if (scene.freeze) {
    if (p.den >= scene.freeze) add(true, 2, `1/${p.den} congela el movimiento de esta acción.`);
    else add(false, 2, `1/${p.den} dejará trepidación de sujeto: para esta acción parte de 1/${scene.freeze} o más rápido.`, p.den >= scene.freeze / 2 ? 1 : 0);
  }
  // 4 perfil e ISO
  if (log) {
    if (p.iso < 800) add(false, 2, `S-Log3 por debajo de ISO 800 usa la zona ampliada (200–640): menos ruido pero también menos margen en altas luces. Úsalo solo si lo has decidido a propósito.`, 1);
    else if (p.iso > 12800) add(false, 2, `S-Log3 a ISO ${p.iso}: señal muy pobre y sombras ruidosas que el etalonaje amplificará. Añade luz, abre diafragma o plantéate S-Cinetone.`);
    else add(true, 2, `ISO ${p.iso} dentro de la zona de trabajo razonable de S-Log3${p.iso === 800 || p.iso === 3200 ? ' (coincide con un punto de ganancia base/medido)' : ''}.`);
    if (scene.fastDelivery) add(false, 2, 'Entrega inmediata sin tiempo de etalonaje: S-Log3 obliga a transformar y corregir cada plano. S-Cinetone sería más sensato.', 1);
  } else {
    if (p.iso > 25600) add(false, 2, `ISO ${p.iso}: ruido alto incluso en S-Cinetone. Busca más luz o más apertura.`, 1);
    else add(true, 2, `ISO ${p.iso} asumible para ${p.profile === 'scinetone' ? 'S-Cinetone' : 'el perfil elegido'}.`);
    if (scene.highDR && p.profile !== 'slog3') add(false, 2, 'Escena de contraste muy alto: un perfil tipo Rec.709/S-Cinetone recortará antes. Válido si aceptas perder altas luces o controlas la luz; si no, S-Log3 10 bits.', 1);
  }
  // 5 óptica
  const L = LENSES[p.lens];
  if (L) {
    const mx = L.maxAp(p.focal || L.min);
    if (p.N < mx - 0.05) add(false, 2, `El ${L.name} no abre a f/${p.N}${p.focal ? ` a ${p.focal} mm` : ''} (máximo f/${mx}). Ajuste imposible.`);
    else add(true, 1, `Apertura f/${p.N} disponible en el ${L.name}.`);
  }
  if (p.nd > 0 && scene.ev < 9) add(false, 1, 'ND en una escena con poca luz: estás tirando luz que necesitas. Quítalo.');
  return out;
}
export const scoreOf = list => { const s = list.reduce((a, r) => a + r.pts, 0), m = list.reduce((a, r) => a + r.max, 0); return { s, m, pct: m ? Math.round(100 * s / m) : 0 }; };
