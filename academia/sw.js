// Service worker de Filmmaker Academy Pro: toda la app se guarda en el dispositivo al instalarse.
// La lista de archivos y la versión las genera tools/build-manifest.mjs.
importScripts('precache-manifest.js');
const VERSION = self.FAP_VERSION;
const CACHE = 'fap-' + VERSION;
const FILES = self.FAP_PRECACHE;
let offlineTest = false; // prueba práctica: negarse a usar la red

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(FILES.map(u => fetch(new Request(u, { cache: 'reload' })).then(r => { if (!r.ok) throw new Error(u + ' ' + r.status); return c.put(new URL(u, self.registration.scope).href, r); }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  // Solo se borran cachés propias (prefijo fap-): en este dominio conviven otras apps.
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('fap-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'OFFLINE_TEST') { offlineTest = !!e.data.on; if (e.ports[0]) e.ports[0].postMessage('ok'); }
});
const tag = r => { const h = new Headers(r.headers); h.set('x-fap', 'cache'); return r.blob().then(b => new Response(b, { status: r.status, statusText: r.statusText, headers: h })); };
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin || !url.pathname.startsWith(new URL(self.registration.scope).pathname)) return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    let hit = await c.match(req, { ignoreSearch: true });
    if (!hit && (req.mode === 'navigate' || url.pathname.endsWith('/'))) hit = await c.match(new URL('index.html', self.registration.scope).href);
    if (hit) return tag(hit);
    if (offlineTest) return new Response('sin conexión (prueba)', { status: 504 });
    try { const r = await fetch(req); if (r.ok) c.put(req, r.clone()); return r; }
    catch { return new Response('Sin conexión y recurso no guardado', { status: 504, headers: { 'content-type': 'text/plain; charset=utf-8' } }); }
  })());
});
