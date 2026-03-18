/* DATASYS — Service Worker v1.0
   Estrategia: Cache-first para assets, Network-first para páginas
*/
const CACHE = 'datasys-v1';
const PRECACHE = [
  '/index_mobile.html',
  '/manifest.json',
  '/imagenes/logo.png',
  '/js/datos.js',
  '/js/bio.js',
  '/js/apps.js',
  '/js/bolsa.js',
  '/js/auto.js',
  '/js/inventario.js',
  '/js/cyber.js',
  '/js/consul.js',
  '/js/revista.js',
  '/js/clientes.js'
];

// Instalación: precachear recursos clave
self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(PRECACHE); })
  );
  self.skipWaiting();
});

// Activación: limpiar caches viejos
self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE; })
            .map(function(k){ return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Network-first con fallback a cache
self.addEventListener('fetch', function(e){
  if(e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  // Ignorar requests externos (APIs, fonts, trackers)
  if(url.origin !== location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then(function(resp){
        if(resp && resp.status === 200){
          var clone = resp.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, clone); });
        }
        return resp;
      })
      .catch(function(){
        return caches.match(e.request).then(function(cached){
          return cached || caches.match('/index_mobile.html');
        });
      })
  );
});
