var CACHE_NAME = 'sw-demo-1';
var caches_files = [
  '/',
  '/images/yumi.jpg',
  '/dist/bundle.js'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('cache is worked');
      return cache.addAll(caches_files);
    })
    .catch(function(err){
      console.error(err);
    })
  )
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response){
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(function(e) {
        console.error(e, 'fetching the resource');
      })
  )
})

