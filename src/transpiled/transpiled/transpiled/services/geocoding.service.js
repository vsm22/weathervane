'use strict';

(function (angular) {

  'use strict';

  angular.module('wvApp').service('geocodingService', ['$http', function geocodingService($http) {
    var _this = this;

    this.data = {
      locationName: '',
      lat: '',
      lng: ''
    };

    this.getLatLngByAddress = function getLatLngByAddress(address) {
      var googleAPIUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

      var returnLatLng = new Promise(function (resolve, reject) {
        var requestUrl = googleAPIUrl + address + '&key=AIzaSyAKhS0sxNOqKDAZIvuJ6WLzTi5UgJ34Wtc';

        $http.get(requestUrl).then(function (response) {
          var lat = _this.data.lat = response.data.results[0].geometry.location.lat;
          var lng = _this.data.lng = response.data.results[0].geometry.location.lng;
          var name = _this.data.locationName = response.data.results[0].formatted_address;

          resolve({ lat: lat, lng: lng, name: name });
        });
      });

      return returnLatLng;
    };

    this.getLocationKeyByLatLng = function getLocationKeyByLatLng(lat, lng) {
      var locationRequestUrl = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?';

      var returnLocationKey = new Promise(function (resolve, reject) {
        var requestUrl = locationRequestUrl + 'f1c8829ea7dd441abdc154038161410' + '&q=' + lat + ',' + lng;

        $http.get(requestUrl).then(function (response) {
          var locationKey = response.data.key;

          resolve(locationKey);
        });
      });

      return returnLocationKey;
    };
  }]);
})(window.angular);