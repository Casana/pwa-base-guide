# pwa-basic-guide

Progressive Web Apps basic guide

## Prerequisites

Service worker works only on HTTPS connection or localhost. Not file:// or HTTP.
We can´t not just open index.html, so we will need to use http-server.

## Life cicle

Installing > Activated > Idle > Fetch/Message > Terminated > Idle


### Instalation

First event. Only happens one time.

The promise installEvent.waitUntil() manages success or error on the instalation.

### Activation

Once the service worker is ready to control the client and administrate events like (push or sync), it will emit an activate event.

### Actualization



## Scope

Service Worker have only access to the scope that we define. 
We cannot access to files from other folder.

## Manifest

Manisfest is a file that allows you to install your application.

https://developer.mozilla.org/en-US/docs/Web/Manifest

https://app-manifest.firebaseapp.com/

## Push Notificacions

We can simulate notifications from dev tools.


## Documentation

#### PWA
> https://developers.google.com/web/ilt/pwa
> https://pwa.rocks/
> https://www.udemy.com/course/aplicaciones-web-progresivas/
> https://medium.com/@addyosmani/a-tinder-progressive-web-app-performance-case-study-78919d98ece0
> https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0

#### APIs
> https://developer.mozilla.org/es/docs/WebAPI/Estado_de_Bateria
> https://developer.mozilla.org/es/docs/Web/API/Navigator/vibrate
> https://developer.mozilla.org/es/docs/Web/API/NavigatorGeolocation/geolocation
> https://developer.mozilla.org/es/docs/Web/API/Detecting_device_orientation

#### Tools
>https://app-manifest.firebaseapp.com/
>https://tomitm.github.io/appmanifest/
>https://learngitbranching.js.org/

