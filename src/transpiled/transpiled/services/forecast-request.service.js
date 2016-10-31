'use strict';

(function (angular) {
    'use strict';

    angular.module('wvApp').service('forecastRequestService', ['$http', function forecastRequest($http) {
        var _this = this;

        this.forecastRequestByLatLng = function forecastRequestByLatLng(lat, lng) {
            console.log('starting forecast request by LatLng');

            var forecastRequest = new Promise(function (resolve, reject) {
                var forecastReqUrl = void 0;
                var forecastResponse = void 0;

                forecastReqUrl = 'https://api.apixu.com/v1/forecast.json?key=' + 'f1c8829ea7dd441abdc154038161410' + '&q=' + lat + ',' + lng + '&days=10';

                $http.get(forecastReqUrl).then(function (response) {
                    forecastResponse = response.data;
                    resolve(forecastResponse);
                });
            });

            return forecastRequest;
        };

        this.currentWeatherRequestByLatLng = function currentWeatherRequestByLatLng(lat, lng) {
            var weatherRequest = new Promise(function (resolve, reject) {
                var weatherReqUrl = void 0;
                var weatherResponse = void 0;

                weatherReqUrl = 'https://api.apixu.com/v1/current.json?key=' + 'f1c8829ea7dd441abdc154038161410' + '&q=' + lat + ',' + lng + '&days=5';

                $http.get(weatherReqUrl).then(function (response) {
                    weatherResponse = response.data;
                    resolve(weatherResponse);
                });
            });

            return weatherRequest;
        };
    }]);
})(window.angular);