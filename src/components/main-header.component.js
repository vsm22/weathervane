(function(angular) {
    'use strict';

    let MainHeaderCtrl = function MainHeaderCtrl($scope, backgroundAnimationService, geocodingService, forecastRequestService, forecastFormatService, displayForecastService) {
        const $ctrl = this;

        $ctrl.locationInput = 'city, zip, or location';
        $ctrl.locationData = geocodingService.data;
        $ctrl.tempUnits = forecastFormatService.tempUnits;

        backgroundAnimationService.applyBackgroundAnimation();

        /* clear the location search input field */
        $ctrl.clearLocationInput = function() {
            $ctrl.locationInput = '';
        }

        /* get conditions for a location */
        $ctrl.getLocationConditions = function getLoactionConditions() {
            hideWeather();

            geocodingService.getLatLngByAddress($ctrl.locationInput).then(function(location) {
                requestForecast({
                    lat: location.lat,
                    lng: location.lng
                });
            });

            function requestForecast(latLng) {
                forecastRequestService.forecastRequestByLatLng(latLng.lat, latLng.lng)
                    .then(function(response) {
                        formatForecast(response.forecast.forecastday);
                        formatWeather(response.current);
                });
            }

            function formatWeather(weather) {
                $ctrl.weather = forecastFormatService.formatWeather(weather).then(function() {
                  displayWeather();
                });
            }

            function formatForecast(forecast) {
                $ctrl.fiveDayForecast = forecastFormatService.formatFiveDayForecast(forecast);
            }

            function hideWeather() {
              let resultsDisplay = document.getElementById('resultsDisplay');
              resultsDisplay.style.transition = 'transform 0s';
              resultsDisplay.style.transform = 'translateY(-3000px)';
            }

            function displayWeather() {
                let resultsDisplay = document.getElementById('resultsDisplay');
                resultsDisplay.style.transition = 'transform 1s';
                resultsDisplay.style.transform = 'translateY(0px)';
                $scope.$apply();
            }
        }
    };
    MainHeaderCtrl.$inject = ['$scope', 'backgroundAnimationService', 'geocodingService', 'forecastRequestService', 'forecastFormatService', 'displayForecastService'];

    angular.module('wvApp').component('mainHeader', {
        templateUrl: './templates/mainHeader.html',
        controller: MainHeaderCtrl,
        $routeConfig: [
          {path: '/current-weather/', name: 'CurrentWeather', component: 'currentWeather', useAsDefault: true},
          {path: '/five-day-forecast/', name: 'FiveDayForecast', component: 'fiveDayForecast'},
          {path: '/ten-day-forecast/', name: 'TenDayForecast', component: 'tenDayForecast'}
        ]
      });
})(window.angular);
