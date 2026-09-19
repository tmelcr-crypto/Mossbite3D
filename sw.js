/* Offline support: the game files are cached after the first visit.
   index.html is fetched fresh when online (so updates arrive), everything else comes from cache first. */
const CACHE = 'mossbite3d-v3';
const FILES = ['./', 'index.html', 'lib/three.min.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FILES); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  if(url.origin !== location.origin) return;
  const isPage = req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('index.html');
  if(isPage){
    e.respondWith(fetch(req).then(function(res){
      const copy = res.clone(); caches.open(CACHE).then(function(c){ c.put(req, copy); }); return res;
    }).catch(function(){ return caches.match(req).then(function(r){ return r || caches.match('index.html'); }); }));
  } else {
    e.respondWith(caches.match(req).then(function(r){ return r || fetch(req).then(function(res){
      const copy = res.clone(); caches.open(CACHE).then(function(c){ c.put(req, copy); }); return res; }); }));
  }
});
