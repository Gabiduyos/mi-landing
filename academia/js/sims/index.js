// Registro de simuladores. La carga es diferida (import dinámico) pero todo está precacheado.
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
export const GOAL_COUNT = 4 + 3 + 3 + 3 + 3 + 3 + 3 + 1;
export async function mountSim(id, el) {
  const s = SIMS.find(x => x.id === id);
  if (!s) { el.textContent = 'Simulador no encontrado'; return; }
  el.innerHTML = '<p class="muted">Cargando simulador…</p>';
  try { const m = await s.load(); m.mount(el); }
  catch (e) { el.innerHTML = `<div class="fb ko"><b>No se pudo cargar el simulador.</b>${String(e.message || e)}</div>`; console.error(e); }
}
