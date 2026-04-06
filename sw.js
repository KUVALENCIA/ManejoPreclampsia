const CACHE_NAME = 'the-clinico-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icono.svg',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

// Instalar el Service Worker y guardar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones para que funcione sin internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Devuelve la versión guardada en el teléfono
        }
        return fetch(event.request); // Si no está guardado, busca en internet
      }
    )
  );
});