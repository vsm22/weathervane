'use strict';

angular.module('geocoding').service('geocodingService', ['$http', 'keyService', function geocodingService($http, keyService) {

  /**
   *
   */
  this.getLatLngByAddress = function getLatLngByAddress(address) {
    var googleAPIUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

    var returnLatLng = new Promise(function (resolve, reject) {
      keyService.getKey("Google Maps").then(function (key) {
        requestGeocodeData(key);
      });

      function requestGeocodeData(key) {
        var requestUrl = googleAPIUrl + address + '&key=' + key;

        $http.get(requestUrl).then(function (response) {
          var lat = response.data.results[0].geometry.location.lat;
          var lng = response.data.results[0].geometry.location.lng;
          var name = response.data.results[0].formatted_address;

          resolve({ lat: lat, lng: lng, name: name });
        });
      }
    });

    return returnLatLng;
  };

  this.getLocationKeyByLatLng = function getLocationKeyByLatLng(lat, lng) {
    var locationRequestUrl = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?';

    var returnLocationKey = new Promise(function (resolve, reject) {
      keyService.getKey("AccuWeather").then(function (apiKey) {
        requestLocationKey(apiKey);
      });

      function requestLocationKey(apiKey) {
        var requestUrl = locationRequestUrl + apiKey + '&q=' + lat + ',' + lng;

        $http.get(requestUrl).then(function (response) {
          var locationKey = response.data.key;

          resolve(locationKey);
        });
      }
    });

    return returnLocationKey;
  };

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
}]);