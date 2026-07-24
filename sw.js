const CACHE = 'jmcontrol-v1';
const ASSETS = ['./index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Network-first for everything (dados sempre atualizados); cache só como fallback offline do shell.
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
