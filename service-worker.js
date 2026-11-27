const CACHE_NAME = "quiz-v2.1.0";
const CACHE_PREFIX = "quiz-";

const ASSETS = [
    "./",
    "./index.html",
    "./css/style.css",
    "./data/QuizLearn_Bank.json",
    "./js/storage.js",
    "./js/ui.js",
    "./js/quiz.js",
    "./js/app.js",
    "./js/banks.js",
    "./js/qti.js",
    "./DOCX_to_questions_HTML/docx-to-questions.html",
    "./manifest.json",
    "./icons/favicon.png",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
];

// ==============================
// INSTALL
// Αποθήκευση βασικών αρχείων
// ==============================

self.addEventListener("install", (event) => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS);
            })
            .then(() => self.skipWaiting())
    );

});

// ==============================
// ACTIVATE
// Διαγραφή μόνο παλιών quiz-* caches
// ==============================

self.addEventListener("activate", (event) => {

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) =>
                            cacheName.startsWith(CACHE_PREFIX) &&
                            cacheName !== CACHE_NAME
                        )
                        .map((cacheName) =>
                            caches.delete(cacheName)
                        )
                );
            })
            .then(() => self.clients.claim())
    );

});

// ==============================
// FETCH
// Cache First
// ==============================

self.addEventListener("fetch", (event) => {

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {

                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request);

            })
    );

});
