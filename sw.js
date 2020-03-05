var CACHE_NAME = 'my-site-cache-v1';
/* var urlsToCache = [
    // This is incorrect, we can´t cache everything in our root, cache have to be file by file.
    '/',
    '/styles/main.css',
    'script/main.js'
]; */

var urlsToCache = [
    '/css/main.css',
    '/icons/icon_timer.png',
    '/images/hello.jpg',
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png',
    'images/offline.png',
    '/scripts/site.js',
    '/scripts/timer.js',
    'index.html',
    'sw.js',
    'manifest.json',
    '/templates/offline.html',
    'libraries/jquery/jquery.min.js',
    'libraries/jquery/jquery.slim.min.js',
    'libraries/bootstrap/js/bootstrap.bundle.min.js',
    'libraries/bootstrap/css/bootstrap.min.css',
    'libraries/bootstrap/css/bootstrap-grid.min.css',
    'libraries/bootstrap/css/bootstrap-reboot.min.css'
];


self.addEventListener('install', function (event) {
    // Install steps
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener('beforeInstallPrompt', function (event) {
    window.alert('Installing the PWA!!')
})

// Fetch proxy
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(
            function (response) {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(function (response) {
                    if (response.status === 404) {
                        return caches.match('/templates/offline.html')
                    }
                    return response
                });
            }
        ).catch(function () {
            return caches.match('/templates/offline.html')
        })
    )
});


self.addEventListener('push', function (event) {
    var title, options;
    console.log(event)
    console.info('Service worker push received: ' + event.data.text());

    title = 'Push from PWA basic guide';
    options = {
        body: event.data.text(),
        icon: 'images/hello.jpg',
        badges: 'images/hello.jpg'
    };

    event.waitUntil(self.registration.showNotification(title, options));

});


//what we want to do when user clicks on the notification
//https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/notificationclick_event
self.addEventListener('notificationclick', function (event) {
    console.info('Service worker notification click received.');
    event.notification.close();
    console.info(event)
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function () {
                document.getElementById('startLat').innerHTML = startPos.coords.latitude;
                document.getElementById('startLon').innerHTML = startPos.coords.longitude;
            }, function () {
                console.error('Not able to get current position')
            });

    } else {
        // We don't have window access here, so we use clients
        clients.openWindow('https://www.youtube.com/watch?v=E8BeSSdIUW4');
    }
})