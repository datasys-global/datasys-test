/* ═══════════════════════════════════════════════════════
   CFE·SICL — Service Worker
   Versión: 1.0.0
   Estrategia: Cache-First con actualización en background
═══════════════════════════════════════════════════════ */

const CACHE_NAME   = 'sicl-v1';
const OFFLINE_URL  = 'offline.html';

/* Archivos que se cachean al instalar */
const PRECACHE_ASSETS = [
  './index_clave.html',
  './index_administracion.html',
  './index_transporte.html',
  './index_recepcion.html',
  './manifest.json',
  './offline.html',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png'
];

/* ── INSTALL: pre-cachear assets esenciales ── */
self.addEventListener('install', event => {
  console.log('[SW] Instalando SICL v1...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-cacheando assets...');
        // Cachear de forma individual para que un error no bloquee todo
        return Promise.allSettled(
          PRECACHE_ASSETS.map(url =>
            cache.add(url).catch(err =>
              console.warn('[SW] No se pudo cachear:', url, err)
            )
          )
        );
      })
      .then(() => {
        console.log('[SW] Instalación completa');
        return self.skipWaiting(); // Activa inmediatamente
      })
  );
});

/* ── ACTIVATE: limpiar caches viejos ── */
self.addEventListener('activate', event => {
  console.log('[SW] Activando...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => {
              console.log('[SW] Eliminando cache viejo:', name);
              return caches.delete(name);
            })
        )
      )
      .then(() => {
        console.log('[SW] Activado y controlando clientes');
        return self.clients.claim(); // Toma control sin recargar
      })
  );
});

/* ── FETCH: Cache-First con fallback a red ── */
self.addEventListener('fetch', event => {
  // Solo manejar peticiones GET
  if (event.request.method !== 'GET') return;

  // Ignorar extensiones de Chrome y peticiones externas (fuentes Google, etc.)
  const url = new URL(event.request.url);
  if (url.origin !== location.origin &&
      !url.href.includes('fonts.googleapis.com') &&
      !url.href.includes('fonts.gstatic.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Tenemos cache → devolver inmediatamente y actualizar en background
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              if (networkResponse && networkResponse.status === 200) {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, responseToCache));
              }
              return networkResponse;
            })
            .catch(() => { /* Sin red, OK, ya tenemos cache */ });

          // No esperamos la actualización
          event.waitUntil(fetchPromise);
          return cachedResponse;
        }

        // No hay cache → ir a la red
        return fetch(event.request)
          .then(networkResponse => {
            if (!networkResponse || networkResponse.status !== 200 ||
                networkResponse.type === 'opaque') {
              return networkResponse;
            }
            // Guardar en cache para la próxima vez
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));
            return networkResponse;
          })
          .catch(() => {
            // Sin red y sin cache → mostrar página offline
            if (event.request.destination === 'document') {
              return caches.match(OFFLINE_URL);
            }
          });
      })
  );
});

/* ── MENSAJE: forzar actualización desde la app ── */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
