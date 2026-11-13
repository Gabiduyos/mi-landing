// Genera precache-manifest.js: lista de TODOS los archivos de la app + versión por contenido.
// Ejecutar tras cualquier cambio:  node tools/build-manifest.mjs
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skip = new Set(['tools', 'README.md', 'precache-manifest.js', 'sw.js', '.DS_Store']);
const files = [];
(function walk(d) { for (const n of readdirSync(d)) { if (d === root && skip.has(n)) continue; const p = join(d, n); statSync(p).isDirectory() ? walk(p) : files.push(relative(root, p).split('\\').join('/')); } })(root);
files.sort();
const h = createHash('sha256');
for (const f of [...files, 'sw.js']) h.update(f).update(readFileSync(join(root, f)));
const version = h.digest('hex').slice(0, 10);
const list = ['./', 'precache-manifest.js', ...files];
writeFileSync(join(root, 'precache-manifest.js'), `// Generado por tools/build-manifest.mjs — no editar a mano.\nself.FAP_VERSION = '${version}';\nself.FAP_PRECACHE = ${JSON.stringify(list, null, 1)};\n`);
const bytes = files.reduce((a, f) => a + statSync(join(root, f)).size, 0);
console.log(`v${version} · ${list.length} recursos · ${(bytes / 1048576).toFixed(2)} MB`);
