(function(){
  'use strict';

  var wvApp = angular.module('wvApp', []);
  wvApp.controller('wvCtrl', ['$scope', 'resolveLocation' function ($scope, resolveLocation) {
    this.location = '';

    this.logLocation = function () {
      console.log('location: ' + this.location);
    }
  }]);

  wvApp.service('resolveLocation', [function(){
    logLocation = function () {
      console.log('location: ' + this.location);
    }

    return logLocation();
  }]);

  wvApp.service('forecastRequest', [function(){
    var reqLatLng, reqLat, reqLng, reqUrl, forecastReq;
    var forecastData = {};

    function getLocationLatLng (location) {
        return {lat: 35.9940, lng: 78.8986};
    }

    reqLatLng = getLocationLatLng();
    reqLat = reqLatLng.lat;
    reqLng = reqLatLng.lng;

    forecastReq = new XMLHttpRequest();

    forecastReq.onreadystatechange = () => {
      if(forecastReq.readyState === XMLHttpRequest.DONE) {
        if(forecastReq.status === 200) {
          forecastData = JSON.parse(forecastReq.responseText);
          console.log(forecastData);
        }
      }
    };

    function makeForecastRequest () {
      reqUrl = 'http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=8d777a24a113a3ac4bbb2f9cc65a0e88';
      forecastReq.open('GET', reqUrl, true);
      forecastReq.send();
    }
  }]);



})();
