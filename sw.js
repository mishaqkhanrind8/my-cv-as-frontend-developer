const CACHE_NAME = "cv-site-cache-v1";

// ✅ Add all important files for offline use
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/profile-img.webp",
  "/assets/android-chrome-192x192.png",
  "/assets/android-chrome-512x512.png",
  // Add your CSS and JS files if any:
  // "/assets/style.css",
  // "/assets/script.js"
];

// ✅ Install Service Worker and Cache Files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  console.log("Service Worker: Installed");
});

// ✅ Activate Service Worker and Remove Old Caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  console.log("Service Worker: Activated");
});

// ✅ Fetch Cached Files (Offline Support)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return from cache or fetch new
      return response || fetch(event.request);
    })
  );
});
    console.log("Service Worker: Fetching");