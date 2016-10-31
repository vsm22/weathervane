'use strict';

(function (angular) {
  'use strict';

  var FiveDayForecastCtrl = function FiveDayForecastCtrl($scope, geocodingService, forecastFormatService, displayForecastService) {
    var $ctrl = this;

    $ctrl.fiveDayForecast = forecastFormatService.forecast;
    $ctrl.tempUnits = forecastFormatService.tempUnits;
    $ctrl.getWeatherIcon = displayForecastService.getWeatherIcon;
  };
  FiveDayForecastCtrl.$inject = ['$scope', 'geocodingService', 'forecastFormatService', 'displayForecastService'];

  angular.module('wvApp').component('fiveDayForecast', {
    templateUrl: '../templates/fiveDayForecast.html',
    controller: FiveDayForecastCtrl
  });
})(window.angular);