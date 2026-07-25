const CACHE_NAME = 'todo-pro-v1';
const ASSETS = [
    '/todo-app-vanilla-js/',
    '/todo-app-vanilla-js/index.html',
    '/todo-app-vanilla-js/css/style.css',
    '/todo-app-vanilla-js/js/app.js',
    '/todo-app-vanilla-js/js/events.js',
    '/todo-app-vanilla-js/js/storage.js',
    '/todo-app-vanilla-js/js/todo.js',
    '/todo-app-vanilla-js/js/ui.js',
    '/todo-app-vanilla-js/js/utils.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then((response) => response || fetch(e.request))
    );
});
