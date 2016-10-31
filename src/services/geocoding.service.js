(function(angular) {

  'use strict';

  angular.module('wvApp').service('geocodingService', ['$http',
      function geocodingService($http) {
        const _this = this;

        this.data = {
          locationName: '',
          lat: '',
          lng: ''
        };

        this.getLatLngByAddress = function getLatLngByAddress(address) {
          const googleAPIUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

          const returnLatLng = new Promise(function(resolve, reject) {
            const requestUrl = googleAPIUrl
                             + address
                             + '&key=AIzaSyAKhS0sxNOqKDAZIvuJ6WLzTi5UgJ34Wtc';

            $http.get(requestUrl).then(function(response) {
              let lat = _this.data.lat = response.data.results[0].geometry.location.lat;
              let lng = _this.data.lng = response.data.results[0].geometry.location.lng;
              let name = _this.data.locationName = response.data.results[0].formatted_address;

              resolve({lat: lat, lng: lng, name: name});
            });
          });

          return returnLatLng;
        };

        this.getLocationKeyByLatLng = function getLocationKeyByLatLng (lat, lng) {
          const locationRequestUrl = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?';

          const returnLocationKey = new Promise(function(resolve, reject) {
            let requestUrl = locationRequestUrl
                             + 'f1c8829ea7dd441abdc154038161410'
                             + '&q='
                             + lat + ',' + lng;

            $http.get(requestUrl).then(function(response) {
              let locationKey = response.data.key;

              resolve(locationKey);
            });
          });

          return returnLocationKey;
        };
      }
  ]);
})(window.angular);
