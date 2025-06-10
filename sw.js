const CACHE_NAME = "tiktok-clone-v1";


const PROJECT_ROOT = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" 
    ? "/" 
    : "/daohuyenmy-test/";

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                `${PROJECT_ROOT}favicon.ico`,
                `${PROJECT_ROOT}index.html`,
                `${PROJECT_ROOT}offline.html`,
                `${PROJECT_ROOT}placeholder.jpg`,
                `${PROJECT_ROOT}sw.js`,
                `${PROJECT_ROOT}videos.json`
            ]);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) =>
                    !cacheWhitelist.includes(cacheName) && caches.delete(cacheName)
                )
            )
        ).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    const requestUrl = new URL(event.request.url);

    // Bỏ qua caching cho video
    if (requestUrl.pathname.match(/\.(mp4|webm|ogg)$/i)) {
        event.respondWith(fetch(event.request));
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    console.log("From cache:", requestUrl.pathname);
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then((networkResponse) => {
                        if (networkResponse.ok && requestUrl.pathname.match(/\.(ico|html|jpg|json)$/i)) {
                            console.log("Caching:", requestUrl.pathname);
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    })
                    .catch((err) => {
                        console.error("Fetch failed:", err);
                        return caches.match(`${PROJECT_ROOT}offline.html`);
                    });
            });
        })
    );
});