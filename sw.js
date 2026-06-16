const CACHE_NAME = 'toolocean-v1';
const STATIC_ASSETS = [
  '/',
  'all-tools/',
  'css/bootstrap.min.css',      // update to your actual CSS paths
  'css/font-awesome.min.css',      // update to your actual CSS paths
  'css/global.css',      // update to your actual CSS paths
  'css/menu.css',      // update to your actual CSS paths
  'js/jquery.js',             // update to your actual JS paths
  'js/global.js',        // update to your actual JS paths
  'js/bootstrap.bundle.min.js',        // update to your actual JS paths
  'images/preview.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'offline.html'
];

// Install: cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clear old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first for static, network-first for pages
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      });
    }).catch(() => caches.match('/offline.html'))
  );
});