// Utilidades de interfaz: selección, escape, mini-marcado de lecciones, descargas.
import { FIGS } from './figs.js';

export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

const TAGS = {
  OFICIAL: 'Especificación oficial', PRINCIPIO: 'Principio técnico', PRACTICA: 'Consejo práctico',
  OPINION: 'Opinión de usuarios', DEBATIDO: 'Técnica debatida', ESTETICA: 'Preferencia estética',
  OJO: 'Atención', MODELO: 'Límite del modelo'
};

function inline(s) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[\[(.+?)\|(.+?)\]\]/g, '<a href="$1">$2</a>');
}

// Mini-marcado: ## título, - lista, 1. lista, > [TAG] aviso, | tabla |, ?? pregunta || respuesta,
// {{fig:id|pie}}, {{sim:id}}
export function md(src) {
  const lines = String(src).trim().split('\n');
  let out = '', i = 0;
  const flushList = (re, tag) => {
    let h = `<${tag}>`;
    while (i < lines.length && re.test(lines[i])) { h += `<li>${inline(lines[i].replace(re, ''))}</li>`; i++; }
    return h + `</${tag}>`;
  };
  while (i < lines.length) {
    const l = lines[i].trim();
    if (!l) { i++; continue; }
    let m;
    if (l.startsWith('### ')) { out += `<h4>${inline(l.slice(4))}</h4>`; i++; }
    else if (l.startsWith('## ')) { out += `<h3>${inline(l.slice(3))}</h3>`; i++; }
    else if (/^- /.test(l)) { lines[i] = l; out += flushList(/^\s*- /, 'ul'); }
    else if (/^\d+\. /.test(l)) { out += flushList(/^\s*\d+\. /, 'ol'); }
    else if ((m = l.match(/^> \[(\w+)\] (.*)$/))) {
      out += `<div class="call ${m[1]}"><span class="chip">${TAGS[m[1]] || m[1]}</span>${inline(m[2])}</div>`; i++;
    }
    else if (l.startsWith('?? ')) {
      const [q, a] = l.slice(3).split('||');
      out += `<details class="think"><summary>Piensa antes de abrir: ${inline(q.trim())}</summary>${inline((a || '').trim())}</details>`; i++;
    }
    else if (l.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) { rows.push(lines[i].trim().slice(1, -1).split('|').map(c => c.trim())); i++; }
      out += '<div class="tw"><table><thead><tr>' + rows[0].map(c => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>' +
        rows.slice(1).map(r => '<tr>' + r.map(c => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>';
    }
    else if ((m = l.match(/^\{\{fig:([\w-]+)(?:\|(.*))?\}\}$/))) {
      const f = FIGS[m[1]];
      out += f ? `<figure>${f}${m[2] ? `<figcaption>${inline(m[2])}</figcaption>` : ''}</figure>` : '';
      i++;
    }
    else if ((m = l.match(/^\{\{sim:([\w-]+)\}\}$/))) { out += `<div class="card mb" data-sim="${m[1]}"></div>`; i++; }
    else { out += `<p>${inline(l)}</p>`; i++; }
  }
  return out;
}

export function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2400);
}

export function download(name, text, type = 'text/plain') {
  const blob = new Blob([text], { type: type + ';charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); toast('Copiado al portapapeles'); }
  catch { toast('No se pudo copiar; usa Descargar'); }
}

// Control deslizante estándar para simuladores
export function slider(id, label, min, max, step, val, fmt = '') {
  return `<div class="ctl"><label for="${id}"><span>${label}</span><output id="${id}-o">${fmt}</output></label>
  <input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"></div>`;
}
export function seg(name, opts, cur) {
  return `<div class="seg" data-seg="${name}">${opts.map(([v, t]) => `<button type="button" data-v="${esc(v)}" class="${String(v) === String(cur) ? 'on' : ''}">${t}</button>`).join('')}</div>`;
}
export function bindSeg(root, name, fn) {
  const el = $(`[data-seg="${name}"]`, root);
  if (!el) return;
  el.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $$('button', el).forEach(x => x.classList.toggle('on', x === b)); fn(b.dataset.v);
  });
}
export function goalsHTML(goals, done) {
  return goals.map(g => `<div class="goal ${done[g.id] ? 'done' : ''}" data-goal="${g.id}"><span class="st">${done[g.id] ? '✓ RETO SUPERADO' : 'RETO'}</span> · ${esc(g.text)}</div>`).join('');
}
