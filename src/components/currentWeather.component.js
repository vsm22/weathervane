(function(angular) {
  'use strict';

  const CurrentWeatherCtrl = function CurrentWeatherCtrl ($scope, geocodingService, forecastFormatService, displayForecastService) {
    const $ctrl = this;

    $ctrl.locationData = geocodingService.data;
    $ctrl.weather = forecastFormatService.currentWeather;
    $ctrl.getWeatherIcon = displayForecastService.getWeatherIcon;
    $ctrl.tempUnits = forecastFormatService.tempUnits;
  };
  CurrentWeatherCtrl.$inject = ['$scope', 'geocodingService', 'forecastFormatService', 'displayForecastService'];

  angular.module('wvApp').component('currentWeather', {
    templateUrl: '../templates/currentWeather.html',
    controller: CurrentWeatherCtrl
  });

}(window.angular));
