'use strict';

/* request URL: http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID={APIKEY} */

angular
  .module('forecastRequest')
  .service('forecastRequestService', ['$http',
    function forecastRequest($http) {
      var _this = this;

      this.requestByLatLng = function requestByLatLng (lat, lng, apiKey) {

        var forecastRequest = new Promise(function(resolve, reject) {
          var forecastReqUrl;
          var forecastResponse;

          forecastReqUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat='
                           + lat
                           + '&lon='
                           + lng
                           + '&APPID='
                           + apiKey;

          $http.get(forecastReqUrl).then(function(response) {
            forecastResponse = response.data.list;
            console.log(forecastResponse);
            resolve(forecastResponse);
          });
        });

        return forecastRequest;
      }
    }
  ]);
