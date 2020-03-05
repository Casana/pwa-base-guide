// Check if navigator supports ServiceWorkers and Push Manager
var myServiceWorker;
if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.info('Service Worker and Push is supported');
    navigator.serviceWorker.register('sw.js').then(
        // Registration sucessful
        function (registration) {
            myServiceWorker = registration;
            console.info('Next service worker is registered with scope: ', registration.scope);
            Notification.requestPermission().then(function (permission) {
                console.info('Current permission status is: ' + permission);
            });
            getGeolocation();
            getOrientation();
            getDeviceBattery();
            initializeUI();
        }).catch(function (err) {
            console.error('ServiceWorker registration + Push Manager failed: ', err);
        })
    /* navigator.serviceWorker.ready.then(function () {

    }) */
};

/**
 * 
 * @param {*} registrationistration 
 */
function initializeUI() {
    myServiceWorker.pushManager.getSubscription().then(
        function (subscription) {
            if (subscription) {
                updateSubscriptionOnServer(subscription)
                console.info('User is subscribed to: ' + subscription)
            } else {
                console.warn('User is NOT subscribed.');
            }
        }
    )

};



// WEB APIS: 
// https://developer.mozilla.org/en-US/docs/Web/API
// https://w3c.github.io/geolocation-api/#api_description


/**
 * https://developers.google.com/web/fundamentals/native-hardware/user-location
 */
function getGeolocation() {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            console.info(position);
            document.getElementById('startLat').innerHTML = 'Current latitude is: ' + position.coords.latitude;
            document.getElementById('startLon').innerHTML = 'Current longitude is: ' + position.coords.longitude;
            document.querySelector('.accuracy').innerHTML = 'Distance accuracy is: ' + position.coords.accuracy;
        }, function () {
            console.error('Not able to get current position')
        });
};

/**
 * 
 */
function getOrientation() {
    if (window.DeviceOrientationEvent) {
        console.info("deviceorientation supported!");      
        window.addEventListener('deviceorientation', function (orientationInfo) {
            updateDeviceOrientation (orientationInfo)
        });
    }

    function updateDeviceOrientation(orientationData) {
        document.getElementById('alpha').innerHTML = 'α: ' + orientationData.alpha;
        document.getElementById('beta').innerHTML = 'β: ' + orientationData.beta;
        document.getElementById('gamma').innerHTML = 'γ: ' + orientationData.gamma;
    }
};

/**
 * Get battery data, update it and set event listeners so we update every time charging and level changes.
 * https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API
 */
function getDeviceBattery() {
    navigator.getBattery().then(function (batteryData) {
        updateBatteryInfo(batteryData);

        batteryData.addEventListener('chargingchange', function (event) {
            updateBatteryInfo(batteryData);
        });
        batteryData.addEventListener('levelchange', function (event) {
            updateBatteryInfo(batteryData);
        });
    });

    /**
     * 
     * @param {Object} batteryData 
     */
    function updateBatteryInfo(batteryData) {
        document.getElementById('charging').innerHTML = batteryData.charging ? 'Battery is charging' : 'Charger not connected';
        document.getElementById('batteryLevel').innerHTML = 'Battery level:' + batteryData.level * 100 + '%';
    }
}


/**
 * 
 * @param {*} subscription 
 */
function updateSubscriptionOnServer(subscription) {
    window.alert('You have been subscribed to: ' + subscription);
}