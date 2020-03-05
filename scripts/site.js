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
            // Now that we are registered, we start to use web APIs
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
            document.getElementById('startLat').innerHTML = 'Current latitude is: ' + position.coords.latitude;
            document.getElementById('startLon').innerHTML = 'Current longitude is: ' + position.coords.longitude;
            document.querySelector('#accuracy').innerHTML = 'Distance accuracy is: ' + position.coords.accuracy;
        }, function () {
            console.error('Not able to get current position')
        });
};

/**
 * Subscribes to deviceorientation event, so it updates device orientation when it changes
 */
function getOrientation() {
    if (window.DeviceOrientationEvent) {
        // deviceorientation supported
        window.addEventListener('deviceorientation', function (orientationInfo) {
            updateDeviceOrientation(orientationInfo)
        });
    }

    /**
     * Updates documents showing the new orientation values.
     * @param {Object} orientationData 
     */
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
        $(".progress-bar").css({
            "width": batteryData.level * 100 + '%'
        });
        switch (true) {
            case (batteryData.level * 100 > 80):
                $('.progress-bar').addClass('bg-success');
                break;
            case (batteryData.level  * 100 > 60):
                $('.progress-bar').addClass('bg-info');
                break;
            case (batteryData.level  * 100 > 40):
                $('.progress-bar').addClass('bg-warning');
                break;
            case (batteryData.level  * 100 > 20):
                $('.progress-bar').addClass('bg-danger');
                break;
            default:
                $('.progress-bar').removeClass('bg-success');
                $('.progress-bar').removeClass('bg-info');
                $('.progress-bar').removeClass('bg-warning');
                $('.progress-bar').removeClass('bg-danger');
                break;
        }
        $('.progress-bar')[0].setAttribute('aria-valuenow', batteryData.level * 100 + '%');
        $('.progress-bar')[0].innerHTML = 'BATTERY LEVEL: ' + batteryData.level * 100 + '%';
    }
}


/**
 * 
 * @param {*} subscription 
 */
function updateSubscriptionOnServer(subscription) {
    window.alert('You have been subscribed to: ' + subscription);
}