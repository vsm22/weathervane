'use strict';

angular.module('geocoding').service('geocodingService', ['$http', 'keyService', function geocodingService($http, keyService) {

  /**
   *
   */
  this.getLatLngByAddress = function getLatLngByAddress(address) {
    const googleAPIUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

    let returnLatLng = new Promise(function (resolve, reject) {
      keyService.getKey("Google Maps").then(function (key) {
        requestGeocodeData(key);
      });

      function requestGeocodeData(key) {
        let requestUrl = googleAPIUrl + address + '&key=' + key;

        $http.get(requestUrl).then(function (response) {
          let lat = response.data.results[0].geometry.location.lat;
          let lng = response.data.results[0].geometry.location.lng;
          let name = response.data.results[0].formatted_address;

          resolve({ lat: lat, lng: lng, name: name });
        });
      }
    });

    return returnLatLng;
  };

  this.getLocationKeyByLatLng = function getLocationKeyByLatLng(lat, lng) {
    const locationRequestUrl = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?';

    let returnLocationKey = new Promise(function (resolve, reject) {
      keyService.getKey("AccuWeather").then(function (apiKey) {
        requestLocationKey(apiKey);
      });

      function requestLocationKey(apiKey) {
        let requestUrl = locationRequestUrl + apiKey + '&q=' + lat + ',' + lng;

        $http.get(requestUrl).then(function (response) {
          let locationKey = response.data.key;

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