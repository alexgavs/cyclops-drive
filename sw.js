// Cyclops Drive service worker — offline app shell + camera DB, cached map tiles.
const V = 'cyclops-v2';
const SHELL = [
  './', './index.html', './cameras.json', './phrases.js', './manifest.webmanifest', './icon.svg',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = e.request.url;
  // OSM tiles: cache-first, then network, store for offline reuse
  if (/tile\.openstreetmap\.org/.test(url)) {
    e.respondWith(caches.open('cyclops-tiles').then(async cache => {
      const hit = await cache.match(e.request);
      if (hit) return hit;
      try { const res = await fetch(e.request); cache.put(e.request, res.clone()); return res; }
      catch (_) { return hit || Response.error(); }
    }));
    return;
  }
  // app shell + data: cache-first, fall back to network
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
    if (res.ok && e.request.method === 'GET') { const cp = res.clone(); caches.open(V).then(c => c.put(e.request, cp)); }
    return res;
  }).catch(() => hit)));
});
