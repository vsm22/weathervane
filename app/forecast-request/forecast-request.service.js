'use strict';

/* request URL: http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID={APIKEY} */

angular
  .module('forecastRequest')
  .service('forecastRequestService', ['$http',
    function forecastRequest($http) {
      var _this = this;

      this.forecastRequestByLatLng = function forecastRequestByLatLng (lat, lng, apiKey) {

        var forecastRequest = new Promise(function(resolve, reject) {
          let forecastReqUrl;
          let forecastResponse;

          forecastReqUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat='
                           + lat
                           + '&lon='
                           + lng
                           + '&APPID='
                           + apiKey;

          $http.get(forecastReqUrl).then(function(response) {
            forecastResponse = response.data.list;
            resolve(forecastResponse);
          });
        });

        return forecastRequest;
      }


      this.currentWeatherRequestByLatLng = function currentWeatherRequestByLatLng (lat, lng, apiKey) {

        var weatherRequest = new Promise(function(resolve, reject) {
          let weatherReqUrl;
          let weatherResponse;

          weatherReqUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='
                           + lat
                           + '&lon='
                           + lng
                           + '&APPID='
                           + apiKey;

          $http.get(weatherReqUrl).then(function(response) {
            weatherResponse = response.data;
            resolve(weatherResponse);
          });
        });

        return weatherRequest;
      }
    }
  ]);
