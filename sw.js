const CACHE = 'treinao-v1';
const ASSETS = ['/workout-quesia/', '/workout-quesia/index.html', '/workout-quesia/manifest.json', '/workout-quesia/icon-192.png', '/workout-quesia/icon-512.png'];

self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => e.respondWith(fetch(e.request).catch(() => caches.match(e.request))));
