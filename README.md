# pwa-basic-guide

Progressive Web Apps basic guide

## Prerequisites

Service worker works only on HTTPS connection or localhost. Not file:// or HTTP.
We can´t not just open index.html, so we will need to use http-server.

## Life cicle

Installing > Activated > Idle > Fetch/Message > Terminated > Idle


### Instalation

installEvent.waitUntil()

### Activation


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
