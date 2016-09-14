'use strict';

angular
  .module('geocoding')
  .service('geocodingService', ['$http',
                                'keyService',
    function geocodingService($http, keyService) {

      /**
       *
       */
      this.getLatLngByAddress = function getLatLngByAddress(address) {
        const googleAPIUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

        var returnLatLng = new Promise(function(resolve, reject) {
          keyService.getKey("Google Maps").then(function(key){
            requestGeocodeData(key);
          });

          function requestGeocodeData (key) {
            let requestUrl = googleAPIUrl
                             + address
                             + '&key=' + key;

            $http.get(requestUrl).then(function(response) {
              let lat = response.data.results[0].geometry.location.lat;
              let lng = response.data.results[0].geometry.location.lng;

              resolve({lat: lat, lng: lng});
            });
          }
        });

        return returnLatLng;
      }

      /*
      this.locationInputType = function (locationInput) {
        var zipRegex;
        var hasZip;

        zipRegex = /((^|\s)(\d\d\d\d\d)(\s|$))|((^|\s)(\d\d\d\d\d-\d\d\d\d)(\s|$))/;
        hasZip = zipRegex.test(locationInput);

        if (hasZip === true) {
          return 'zip';
        }
      }
      */
    }
  ]);
