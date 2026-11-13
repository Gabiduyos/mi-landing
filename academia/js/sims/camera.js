// SIMULADOR C — Cámara virtual. Reproduce la LÓGICA de configuración (dependencias y avisos), no el firmware real.
import { $, $$, esc, seg, bindSeg, goalsHTML, toast } from '../ui.js';
import { MENU, allItems } from '../content/menumap.js';
import { APERTURES, SHUTTERS, ISOS } from './expo.js';
import { state, markGoal } from '../store.js';

const GOALS = [
  { id: 'C1', text: 'Videoclip para etalonar: selector en Vídeo, modo M, 4K 25p, 10 bits 4:2:2, perfil S-Log3 de fábrica, ISO 800 o más, asistente gamma activado, cebra de límite 94+ y balance de blancos NO automático.' },
  { id: 'C2', text: 'Cámara lenta en HYROX: 4K 50p 10 bits, AF continuo con detección de humanos y sensibilidad de cambio de motivo bloqueada. Guárdalo en la memoria 2 y recupéralo desde el dial.' },
  { id: 'C3', text: 'Foto deportiva en pabellón: selector en Foto, modo M o S, AF-C, área Seguimiento, ráfaga Hi o Hi+, RAW, obturación 1/1000 o más rápida y toma antiparpadeo activada.' }
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

export function mount(el) {
  let c = defaults(), tab = 'toma';
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
      <div class="tabsbar" id="sc-tabs" style="margin-top:0">${MENU.map(s => `<button type="button" data-t="${s.id}" style="border-color:${s.color}55">${s.name}</button>`).join('')}</div>
      <div id="sc-menu"></div>
    </div></div>
    <div id="sc-goals" class="mt">${goalsHTML(GOALS, state().goals)}</div>
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
    const hiShut = c.den >= 1000;
    const ok = {
      C1: c.sel === 'video' && c.dial === 'M' && /4K/.test(c.vidFmt) && c.fps === '25p' && /4:2:2 10/.test(c.grabar) && c.pp === 'PP8' && c.iso >= 800 && c.gda === 'Activar' && c.cebra === 'Activar' && /94\+/.test(c.cebraNivel) && c.wb !== 'Automático',
      C2: c.sel === 'video' && c._recalled === 2 && /4K/.test(c.vidFmt) && c.fps === '50p' && /10 bits/.test(c.grabar) && c.motivo === 'Humano' && c.ojos === 'Activar' && /^1/.test(c.afSens) && c.afModo !== 'MF',
      C3: c.sel === 'foto' && ['M', 'S'].includes(c.dial) && c.afModo === 'AF-C' && c.afArea === 'Seguimiento' && /Hi/.test(c.drive) && /RAW/.test(c.fotoFmt) && hiShut && c.antiflicker === 'Activar' && c.obtTipo !== 'Obtur. electrónico'
    };
    for (const g of GOALS) if (ok[g.id] && markGoal(g.id)) { $('#sc-goals', el).innerHTML = goalsHTML(GOALS, state().goals); toast('Reto superado · +30 XP'); }
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
  menu(); lcd();
}
