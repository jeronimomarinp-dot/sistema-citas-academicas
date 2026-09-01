const CACHE_NAME = 'sistema-citas-v1';

const ARCHIVOS_CACHE = [
    '/pages/login.html',
    '/assets/css/global.css',
    '/assets/css/login.css',
    '/assets/js/api.js',
    '/assets/js/login.js',
    '/assets/icons/icon-192.png',
    '/assets/icons/icon-512.png'
];

self.addEventListener('install', (event) => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ARCHIVOS_CACHE);
            })
    );

    self.skipWaiting();
});


self.addEventListener('activate', (event) => {

    event.waitUntil(
        caches.keys()
            .then((nombresCaches) => {

                return Promise.all(
                    nombresCaches
                        .filter((nombre) => nombre !== CACHE_NAME)
                        .map((nombre) => caches.delete(nombre))
                );

            })
    );

    self.clients.claim();
});


self.addEventListener('fetch', (event) => {

    event.respondWith(

        caches.match(event.request)
            .then((respuestaCache) => {

                if (respuestaCache) {
                    return respuestaCache;
                }

                return fetch(event.request);

            })

    );

});