// Registro de simuladores. Todo está precacheado para uso sin conexión.
import { GOALS as GA } from './exposure.js';
import { GOALS as GB } from './slog.js';
import { GOALS as GC } from './camera.js';
import { GOALS as GD } from './lighting.js';
import { GOALS as GE } from './optics.js';
import { GOALS as GF } from './timeline.js';
import { GOALS as GG } from './color.js';
export const SIM_GOALS = { exposure: GA, slog: GB, camera: GC, lighting: GD, optics: GE, timeline: GF, color: GG,
  pressure: [{ id: 'H1', title: 'Seis incidencias con un 80 % o más', story: 'Resuelve una tanda de incidencias de rodaje con 45 segundos para cada decisión.' }] };
// Simuladores con los que se practica cada módulo
export const MOD_SIMS = { 1: ['camera'], 2: ['exposure'], 3: ['slog'], 4: ['exposure', 'pressure'], 5: ['exposure'], 6: ['optics'], 7: ['lighting'], 8: ['optics'], 9: ['pressure'], 10: ['timeline'], 11: ['color'], 12: ['pressure'], 14: ['lighting', 'optics'], 15: ['exposure'] };
export const SIMS = [
  { id: 'exposure', l: 'A', name: 'Exposición', desc: 'ISO, diafragma, obturación y ND sobre cinco escenas, con histograma, cebras y aviso de parpadeo.', load: () => import('./exposure.js') },
  { id: 'slog', l: 'B', name: 'S-Log3', desc: 'Curvas reales, niveles de gris, piel y blanco, recorte, ruido y vista con LUT o normalizada.', load: () => import('./slog.js') },
  { id: 'camera', l: 'C', name: 'Cámara virtual A7 IV', desc: 'Dial, selector Foto/Vídeo, menús en español, memorias y avisos de dependencias.', load: () => import('./camera.js') },
  { id: 'lighting', l: 'D', name: 'Iluminación', desc: 'Arrastra principal, relleno y contra; ajusta intensidad, suavidad y temperatura de color.', load: () => import('./lighting.js') },
  { id: 'optics', l: 'E', name: 'Ópticas', desc: 'Tus tres objetivos: encuadre, distancia, compresión, profundidad de campo y desenfoque.', load: () => import('./optics.js') },
  { id: 'timeline', l: 'F', name: 'Montaje', desc: 'Ordena planos en una línea de tiempo con pulso musical y recibe una evaluación por criterios.', load: () => import('./timeline.js') },
  { id: 'color', l: 'G', name: 'Color', desc: 'Transforma S-Log3, corrige y crea un look leyendo forma de onda, parade y vectorscopio.', load: () => import('./color.js') },
  { id: 'pressure', l: 'H', name: 'Rodajes bajo presión', desc: 'Incidencias reales con cuenta atrás: luz, audio, foco, clientes, datos y seguridad.', load: () => import('./pressure.js') }
];
export const GOAL_COUNT = Object.values(SIM_GOALS).reduce((a, g) => a + g.length, 0);
export async function mountSim(id, el, opts = {}) {
  const s = SIMS.find(x => x.id === id);
  if (!s) { el.textContent = 'Simulador no encontrado'; return; }
  el.innerHTML = '<p class="muted">Cargando simulador…</p>';
  try { const m = await s.load(); m.mount(el, opts); }
  catch (e) { el.innerHTML = `<div class="fb ko"><b>No se pudo cargar el simulador.</b>${String(e.message || e)}</div>`; console.error(e); }
}
