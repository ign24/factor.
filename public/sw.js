const CACHE_NAME = 'factor-cache-v2';
const STATIC_CACHE = 'factor-static-v2';
const DYNAMIC_CACHE = 'factor-dynamic-v2';

const urlsToCache = [
  '/',
  '/index.html',
  '/factor.webp',
  '/circulo.webp'
];

// Critical resources that should be cached immediately
const criticalResources = [
  '/index.html',
  '/factor.webp'
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching critical resources');
        return cache.addAll(criticalResources);
      })
      .then(() => self.skipWaiting())
  );
});

// Fetch event - optimized caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache based on resource type
            const cacheName = isStaticResource(request) ? STATIC_CACHE : DYNAMIC_CACHE;
            
            caches.open(cacheName)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Helper function to determine if resource is static
function isStaticResource(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)$/);
}

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker activated');
      return self.clients.claim();
    })
  );
});
