// SIMULADOR C — Cámara virtual. Reproduce la LÓGICA de configuración (dependencias y avisos), no el firmware real.
import { $, $$, esc, seg, bindSeg, toast } from '../ui.js';
import { coach } from './coach.js';
import { MENU, allItems } from '../content/menumap.js';
import { APERTURES, SHUTTERS, ISOS } from './expo.js';

const now = v => 'ahora: ' + v;
export const GOALS = [
  { id: 'C1', title: 'Prepara la cámara para un videoclip que vas a etalonar',
    story: 'Mañana ruedas un videoclip y habrá tiempo de color. Parte de la cámara de fábrica y déjala lista: cada línea te dice en qué menú está el ajuste.',
    setup: [['click:#sc-reset'], ['seg:sel', 'video']],
    checks: [['Selector inferior en Vídeo', c => c.sel === 'video'], ['Dial en M (manual)', c => c.dial === 'M', c => now(c.dial)],
      ['Formato 4K · pestaña Toma', c => /4K/.test(c.vidFmt), c => now(c.vidFmt)], ['25p · pestaña Toma', c => c.fps === '25p', c => now(c.fps)],
      ['10 bits 4:2:2 · Toma → Grabar ajuste', c => /4:2:2 10/.test(c.grabar), c => now(c.grabar)], ['Perfil PP8 (S-Log3) · pestaña Exposición/Color', c => c.pp === 'PP8', c => now(c.pp)],
      ['ISO 800 o más (desplegable ISO bajo la pantalla)', c => c.iso >= 800, c => now('ISO ' + c.iso)], ['Balance de blancos fijo, no automático · Exposición/Color', c => c.wb !== 'Automático', c => now(c.wb)],
      ['Cebra activada · Exposición/Color', c => c.cebra === 'Activar'], ['Nivel de cebra C2 94+ (aviso de recorte)', c => /94\+/.test(c.cebraNivel), c => now(c.cebraNivel)],
      ['Asistente de visualización gamma · pestaña Ajustes', c => c.gda === 'Activar']],
    hints: ['Ve de arriba abajo por la lista: cada línea indica la pestaña del menú donde está el ajuste.', 'Los avisos de la pantalla negra te avisan de combinaciones peligrosas, como log en 8 bits.', 'Lo más olvidado: el asistente gamma está en la pestaña Ajustes y el ISO en el desplegable bajo la pantalla.'],
    solution: 'Dial M · Toma: 4K, 25p, 4:2:2 10 bits · Exposición/Color: PP8, balance Luz diurna (o el que toque), cebra Activar, nivel C2 94+ · Ajustes: asistente gamma Activar · ISO 800.',
    learn: 'Esta es la base de un rodaje en S-Log3: 10 bits para no romper la imagen al etalonar, ISO 800 de base, balance fijo, cebra de recorte para proteger las luces y asistente gamma para ver bien. Compruébalo siempre dentro del perfil: PP8 solo es S-Log3 de fábrica.' },
  { id: 'C2', title: 'Memoria para cámara lenta en HYROX',
    story: 'En competición no hay tiempo para menús. Configura una cámara lenta con seguimiento de atletas, guárdala en la memoria 2 y recupérala desde el dial.',
    setup: [['click:#sc-reset'], ['seg:sel', 'video']],
    checks: [['Formato 4K · Toma', c => /4K/.test(c.vidFmt)], ['50p · Toma', c => c.fps === '50p', c => now(c.fps)], ['10 bits · Toma → Grabar ajuste', c => /10 bits/.test(c.grabar), c => now(c.grabar)],
      ['Detección de motivo: Humano · pestaña Enfoque', c => c.motivo === 'Humano'], ['Prioridad cara/ojos activada · Enfoque', c => c.ojos === 'Activar'],
      ['Sensibilidad de cambio de motivo en 1 (bloqueado) · Enfoque', c => /^1/.test(c.afSens), c => now(c.afSens)], ['Enfoque automático (no MF)', c => c.afModo !== 'MF'],
      ['Guardado en M2 y recuperado girando el dial a 2', c => c._recalled === 2, c => c._recalled === 2 ? '' : 'pulsa «M2» abajo y después el botón 2 del dial']],
    hints: ['Configura primero, guarda después: el botón «M2» guarda el estado actual.', 'Bloquear la sensibilidad evita que el foco salte a quien cruce por delante del atleta.', 'Si cambias algo después de recuperar, vuelve a guardar y recuperar.'],
    solution: 'Toma: 4K, 50p, 10 bits · Enfoque: Humano, ojos Activar, sensibilidad 1 · botón M2 · dial 2.',
    learn: 'Las memorias 1, 2 y 3 del dial son tres «cámaras» listas. Fíjate en el aviso: 4K 50p recorta a Super 35, tu 24 mm encuadra como 36 mm.' },
  { id: 'C3', title: 'Foto deportiva en un pabellón',
    story: 'Pasas a foto para la final: atletas rápidos bajo focos que parpadean. Configura la cámara para congelar la acción sin bandas.',
    setup: [['click:#sc-reset'], ['seg:sel', 'video']],
    checks: [['Selector inferior en Foto', c => c.sel === 'foto'], ['Dial en M o S', c => ['M', 'S'].includes(c.dial), c => now(c.dial)], ['Obturación 1/1000 o más rápida', c => c.den >= 1000, c => now('1/' + c.den)],
      ['AF-C · Enfoque', c => c.afModo === 'AF-C', c => now(c.afModo)], ['Área Seguimiento · Enfoque', c => c.afArea === 'Seguimiento', c => now(c.afArea)],
      ['Ráfaga Hi o Hi+ · Toma', c => /Hi/.test(c.drive), c => now(c.drive)], ['Formato RAW · Toma', c => /RAW/.test(c.fotoFmt), c => now(c.fotoFmt)],
      ['Toma antiparpadeo activada · Toma', c => c.antiflicker === 'Activar'], ['Obturador no electrónico', c => c.obtTipo !== 'Obtur. electrónico']],
    hints: ['Empieza por el selector inferior: Foto. Algunos ajustes solo existen en foto.', 'Para congelar un sprint necesitas al menos 1/1000.', 'El antiparpadeo solo funciona con obturador mecánico.'],
    solution: 'Selector Foto · dial S o M · 1/1000 · Enfoque: AF-C y Seguimiento · Toma: Continua Hi, RAW, antiparpadeo Activar · obturador mecánico.',
    learn: 'En foto de acción la obturación manda (1/1000 o más), AF-C con seguimiento sigue al atleta y el antiparpadeo dispara en el pico de luz de los focos para evitar fotos más oscuras o con bandas.' }
];
const items = allItems();
const defaults = () => { const o = { sel: 'video', dial: 'M', N: 2.8, den: 50, iso: 100 }; for (const i of items) o[i.id] = i.def; return o; };

function derive(c) {
  const w = [], vid = c.sel !== 'foto', k4 = /4K/.test(c.vidFmt), pp = c.pp;
  if (vid) {
    if (k4 && c.fps === '50p') w.push(['o', 'Recorte Super 35 (×1,5) activo: 4K 50p no usa el ancho completo del sensor. Tu 24 mm encuadra como 36 mm.']);
    if (k4 && c.fps === '100p') w.push(['r', '100p no existe en 4K en la A7 IV. La cámara real solo lo ofrece en XAVC S HD / S-I HD.']);
    if (/S-I 4K/.test(c.vidFmt)) w.push(['o', 'XAVC S-I 4K: tasas de bits muy altas. Sony exige SDXC V90 o CFexpress Tipo A.']);
    if (/HS/.test(c.vidFmt)) w.push(['b', 'XAVC HS (H.265): archivos compactos; comprueba que tu ordenador lo edita con fluidez o usa proxies.']);
    if ((pp === 'PP8' || pp === 'PP9' || pp === 'PP7') && /8 bits/.test(c.grabar)) w.push(['r', 'Perfil log en 8 bits: muy pocos niveles tras la transformación → bandas en cielos y pieles. Usa 10 bits.']);
    if ((pp === 'PP8' || pp === 'PP9') && c.iso < 800) w.push(['o', 'S-Log3 con ISO inferior a 800: zona ampliada (200–640), menos margen en altas luces.']);
    if ((pp === 'PP8' || pp === 'PP9') && c.gda !== 'Activar') w.push(['b', 'S-Log3 sin asistente gamma: verás una imagen lavada y juzgarás peor foco y exposición.']);
    if (pp === 'PP11' && c.gda === 'Activar') w.push(['b', 'S-Cinetone no es log: el asistente gamma no hace falta.']);
    if (c.wb === 'Automático') w.push(['b', 'Balance automático en vídeo: puede variar durante el plano y entre planos.']);
    if (c.ss === 'Activo') w.push(['b', 'SteadyShot Activo: ligero recorte adicional. En gimbal suele ser innecesario.']);
    if (c.dial === 'M' && c.den < 50 && c.fps === '50p') w.push(['r', 'Obturación más lenta que el fotograma (1/50): imposible a 50p.']);
  } else {
    if (c.obtTipo === 'Obtur. electrónico' && c.antiflicker === 'Activar') w.push(['o', 'La toma antiparpadeo requiere obturador mecánico.']);
    if (c.drive === 'Continua Hi+' && c.rawTipo !== 'Comprimido' && /RAW/.test(c.fotoFmt)) w.push(['b', 'Con RAW sin comprimir o sin pérdida la ráfaga máxima baja (≈6 fps según Sony).']);
    if (c.afArea === 'Seguimiento' && c.afModo !== 'AF-C') w.push(['o', 'El área Seguimiento solo funciona en AF-C.']);
    if (c.pp !== 'Desactivar') w.push(['b', 'Perfil de imagen activo en foto: afecta al JPEG y a la previsualización. Mucha gente lo desactiva en foto.']);
  }
  return w;
}

export function mount(el, opts = {}) {
  let c = defaults(), tab = 'toma', co = null;
  const mem = {}; // memorias virtuales de esta sesión
  el.innerHTML = `<div class="sim"><div class="cam">
      <span class="lbl">Selector inferior</span>${seg('sel', [['foto', 'Foto'], ['video', 'Vídeo'], ['sq', 'S&Q']], 'video')}
      <span class="lbl mt" style="margin-top:10px">Dial de modo</span><div class="dial" id="sc-dial">${['AUTO', 'P', 'A', 'S', 'M', '1', '2', '3'].map(d => `<button type="button" data-d="${d}" aria-label="Modo ${d}">${d}</button>`).join('')}</div>
      <div class="lcd" id="sc-lcd" aria-live="polite"></div>
      <div class="grid g3" style="margin-top:10px;gap:8px">
        <div><span class="lbl">Diafragma</span><select id="sc-N">${APERTURES.map(a => `<option>${a}</option>`).join('')}</select></div>
        <div><span class="lbl">Obturación</span><select id="sc-den">${SHUTTERS.map(a => `<option value="${a}">1/${a}</option>`).join('')}</select></div>
        <div><span class="lbl">ISO</span><select id="sc-iso">${ISOS.map(a => `<option>${a}</option>`).join('')}</select></div>
      </div>
      <div class="row" style="margin-top:10px"><span class="small muted">Guardar estado en:</span>${[1, 2, 3].map(n => `<button class="btn sm ghost" data-save="${n}">M${n}</button>`).join('')}<button class="btn sm ghost" id="sc-reset">Restablecer</button></div>
    </div><div>
      <div id="sc-coach"></div><div class="tabsbar" id="sc-tabs" style="margin-top:0">${MENU.map(s => `<button type="button" data-t="${s.id}" style="border-color:${s.color}55">${s.name}</button>`).join('')}</div>
      <div id="sc-menu"></div>
    </div></div>
    <p class="note"><strong>Límite del modelo:</strong> es una cámara didáctica. Reproduce la estructura de menús y las dependencias importantes (recortes, tarjetas, perfiles, avisos), no todas las opciones ni el comportamiento exacto del firmware. Los valores «de fábrica» proceden de la Guía de ayuda; tu cámara puede tener otros.</p>`;

  function lcd() {
    const w = derive(c), vid = c.sel !== 'foto', auto = d => ['AUTO', 'P'].includes(c.dial) || (d === 'N' && c.dial === 'S') || (d === 'den' && c.dial === 'A');
    const ppName = { PP8: 'S-Log3 / S-Gamut3.Cine', PP9: 'S-Log3 / S-Gamut3', PP11: 'S-Cinetone', PP10: 'HLG2', PP7: 'S-Log2', Desactivar: 'sin perfil' }[c.pp] || c.pp + ' (gamma estándar)';
    $('#sc-lcd', el).innerHTML = `<div class="row sp"><span class="hl">${c.sel === 'foto' ? 'FOTO' : c.sel === 'sq' ? 'S&Q' : 'VÍDEO'} · ${c.dial}</span><span>${vid ? `${esc(c.vidFmt)} ${c.fps}` : esc(c.fotoFmt)}</span></div>
      <div style="font-size:1.15rem;margin:8px 0">${auto('N') ? 'f/auto' : 'f/' + c.N} &nbsp; ${auto('den') ? '1/auto' : '1/' + c.den} &nbsp; ISO ${c.iso}</div>
      <div>${vid ? esc(c.grabar) + ' · ' : ''}${esc(ppName)}${c.pp !== 'Desactivar' ? ` <span class="muted">(${c.pp} de fábrica)</span>` : ''}</div>
      <div>WB ${esc(c.wb)} · ${esc(c.afModo)} · ${esc(c.afArea)} · ${esc(c.motivo)}</div>
      <div>${c.cebra === 'Activar' ? 'Cebra ' + esc(c.cebraNivel) : 'Cebra off'} · ${c.gda === 'Activar' ? 'Asist. gamma ON' : 'Asist. gamma off'} · SteadyShot ${esc(c.ss)}</div>
      <hr style="border-color:#222">${w.length ? w.map(([k, m]) => `<div style="color:${k === 'r' ? '#ff5263' : k === 'o' ? '#ff8a1f' : '#7fb0ff'};margin-bottom:5px">${k === 'r' ? '✕' : k === 'o' ? '⚠' : 'ℹ'} ${esc(m)}</div>`).join('') : '<div style="color:#35c98a">Sin avisos.</div>'}`;
    $$('#sc-dial button', el).forEach(b => b.classList.toggle('on', b.dataset.d === c.dial));
    $('#sc-N', el).value = c.N; $('#sc-den', el).value = c.den; $('#sc-iso', el).value = c.iso;
    check();
  }
  function menu() {
    const s = MENU.find(m => m.id === tab);
    $$('#sc-tabs button', el).forEach(b => b.classList.toggle('on', b.dataset.t === tab));
    $('#sc-menu', el).innerHTML = s.groups.map(g => `<span class="lbl" style="margin-top:12px">${esc(g.name)}</span>` + g.items.map(i => {
      const off = (i.only === 'foto' && c.sel !== 'foto') || (i.only === 'video' && c.sel === 'foto');
      return `<div class="ctl" style="${off ? 'opacity:.4' : ''}"><label for="sc-i-${i.id}"><span>${esc(i.name)}</span>${off ? `<span>solo ${i.only}</span>` : ''}</label>
        ${i.opts.length > 1 ? `<select id="sc-i-${i.id}" data-i="${i.id}" ${off ? 'disabled' : ''}>${i.opts.map(o => `<option ${o === c[i.id] ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>` : ''}
        <span class="small muted">${esc(i.note)}</span></div>`;
    }).join('')).join('');
  }
  function check() {
    if (co) co.update(c);
  }
  el.addEventListener('change', e => {
    const i = e.target.dataset.i;
    if (i) { c[i] = e.target.value; c._recalled = 0; lcd(); }
    if (e.target.id === 'sc-N') { c.N = +e.target.value; lcd(); }
    if (e.target.id === 'sc-den') { c.den = +e.target.value; lcd(); }
    if (e.target.id === 'sc-iso') { c.iso = +e.target.value; lcd(); }
  });
  el.addEventListener('click', e => {
    const d = e.target.closest('[data-d]'), t = e.target.closest('[data-t]'), sv = e.target.closest('[data-save]');
    if (d) {
      if (['1', '2', '3'].includes(d.dataset.d)) {
        const key = d.dataset.d + c.sel;
        if (!mem[key]) { toast(`Memoria ${d.dataset.d} vacía para ${c.sel === 'foto' ? 'foto' : 'vídeo'}: guarda primero un estado`); return; }
        c = { ...mem[key], _recalled: +d.dataset.d }; c.dial = mem[key].dial; toast(`Recuperada M${d.dataset.d} (${c.sel === 'foto' ? 'foto' : 'vídeo'})`);
        menu();
      } else { c.dial = d.dataset.d; c._recalled = 0; }
      lcd();
    }
    if (t) { tab = t.dataset.t; menu(); }
    if (sv) { mem[sv.dataset.save + c.sel] = { ...c, _recalled: 0 }; toast(`Estado guardado en M${sv.dataset.save} (${c.sel === 'foto' ? 'foto' : 'vídeo'})`); }
    if (e.target.id === 'sc-reset') { c = defaults(); menu(); lcd(); }
  });
  bindSeg(el, 'sel', v => { c.sel = v; c._recalled = 0; menu(); lcd(); });
  co = coach($('#sc-coach', el), el, { goals: GOALS, start: opts.goal, intro: [
    'Arriba tienes el selector Foto/Vídeo/S&Q y el dial de modo; la pantalla negra muestra cómo está la cámara y avisa de combinaciones peligrosas.',
    'Las pestañas de colores son los menús de la A7 IV. Cada ajuste explica para qué sirve.',
    'Elige un reto: la lista te dice qué ajustar y en qué menú, y se marca en verde según avanzas.'
  ] });
  menu(); lcd();
}
