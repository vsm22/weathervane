'use strict';

(function (angular) {
  'use strict';

  var TenDayForecastCtrl = function TenDayForecastCtrl($scope, geocodingService, forecastFormatService, displayForecastService) {
    var $ctrl = this;

    $ctrl.tenDayForecast = forecastFormatService.forecast;
    $ctrl.tempUnits = forecastFormatService.tempUnits;
    $ctrl.getWeatherIcon = displayForecastService.getWeatherIcon;
  };
  TenDayForecastCtrl.$inject = ['$scope', 'geocodingService', 'forecastFormatService', 'displayForecastService'];

  angular.module('wvApp').component('tenDayForecast', {
    templateUrl: './templates/tenDayForecast.html',
    controller: TenDayForecastCtrl
  });
})(window.angular);