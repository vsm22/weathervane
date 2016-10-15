'use strict';

/* request URL: http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID={APIKEY} */

angular.module('forecastRequest').service('forecastRequestService', ['$http', function forecastRequest($http) {
  var _this = this;

  this.forecastRequestByLatLng = function forecastRequestByLatLng(lat, lng, apiKey) {

    var forecastRequest = new Promise(function (resolve, reject) {
      let forecastReqUrl;
      let forecastResponse;

      forecastReqUrl = 'https://api.apixu.com/v1/forecast.json?key=' + apiKey + '&q=' + lat + ',' + lng + '&days=5';

      $http.get(forecastReqUrl).then(function (response) {
        forecastResponse = response.data;
        resolve(forecastResponse);
      });
    });

    return forecastRequest;
  };

  this.currentWeatherRequestByLatLng = function currentWeatherRequestByLatLng(lat, lng, apiKey) {

    var weatherRequest = new Promise(function (resolve, reject) {
      let weatherReqUrl;
      let weatherResponse;

      weatherReqUrl = 'https://api.apixu.com/v1/current.json?key=' + apiKey + '&q=' + lat + ',' + lng + '&days=5';

      $http.get(weatherReqUrl).then(function (response) {
        weatherResponse = response.data;
        resolve(weatherResponse);
      });
    });

    return weatherRequest;
  };
}]);