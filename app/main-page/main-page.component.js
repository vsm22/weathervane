'use strict';

angular
  .module('mainPage')
  .component('mainPage', {
    templateUrl: './main-page/main-page.template.html',
    controller: ['$scope',
                 'keyService',
                 'geocodingService',
                 'forecastRequestService',
                 'forecastFormatService',
                 'displayForecastService',
      function mainPageController($scope,
                                  keyService,
                                  geocodingService,
                                  forecastRequestService,
                                  forecastFormatService,
                                  displayForecastService) {
        var _this = this;

        this.locationInput = 'city, zip, or location';
        this.fiveDayForecast = [];
        this.getWeatherIcon = displayForecastService.getWeatherIcon;

        this.clearLocationInput = function () {
          _this.locationInput = '';
        }

        this.getLocationConditions = function getLoactionConditions() {
          geocodingService.getLatLngByAddress(_this.locationInput).then(function(latLng){
            requestForecast(latLng);
          });

          function requestForecast(latLng) {
            keyService.getKey("Open Weather Map").then(function(key){
              getForecast(key);
            });

            function getForecast(key) {
              forecastRequestService.requestByLatLng(latLng.lat, latLng.lng, key)
                .then(function (forecast) {
                  formatForecast(forecast);
                });
            }
          }

          function formatForecast(forecast) {
            _this.fiveDayForecast = forecastFormatService.formatFiveDayForecast(forecast);
            $scope.$apply();
          }
        }
      }
    ]
  });
