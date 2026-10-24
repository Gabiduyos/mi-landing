// Service worker: la app funciona sin conexión y guarda los mapas ya vistos.
var VERSION = 'ruta-japon-v14';
var SHELL = [
  './',
  'index.html',
  'styles.css',
  'app.js',
  'data.js',
  'places.js',
  'coast.js',
  'manifest.webmanifest',
  'icon.svg',
  'icon-192.png',
  'vendor/leaflet/leaflet.js',
  'vendor/leaflet/leaflet.css'
];
var TILES = 'ruta-japon-tiles';
var FONTS = 'ruta-japon-fonts';
var MAX_TILES = 1500;

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION && k !== TILES && k !== FONTS; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

var puts = 0;
function trimTiles() {
  return caches.open(TILES).then(function (c) {
    return c.keys().then(function (keys) {
      var extra = keys.length - MAX_TILES;
      return extra > 0 ? Promise.all(keys.slice(0, extra).map(function (k) { return c.delete(k); })) : null;
    });
  });
}

// Red primero (con límite de tiempo) para la propia app; si no hay red, la copia guardada.
function networkFirst(req) {
  return caches.open(VERSION).then(function (cache) {
    var net = fetch(req).then(function (res) {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    });
    net.catch(function () {});
    var timeout = new Promise(function (resolve) { setTimeout(resolve, 3500); });
    return Promise.race([net, timeout]).then(function (res) {
      return res || cache.match(req, { ignoreSearch: true }).then(function (hit) { return hit || net; });
    }).catch(function () {
      return cache.match(req, { ignoreSearch: true }).then(function (hit) { return hit || cache.match('index.html'); });
    });
  });
}

function cacheFirst(req, name, onPut) {
  return caches.open(name).then(function (cache) {
    return cache.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && (res.ok || res.type === 'opaque')) { cache.put(req, res.clone()); if (onPut) onPut(); }
        return res;
      });
    });
  });
}

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.hostname === 'tile.openstreetmap.org' || url.hostname === 'server.arcgisonline.com') {
    e.respondWith(cacheFirst(req, TILES, function () { if (++puts % 60 === 0) trimTiles(); }));
  } else if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(cacheFirst(req, FONTS));
  } else if (url.origin === self.location.origin) {
    e.respondWith(networkFirst(req));
  }
});
