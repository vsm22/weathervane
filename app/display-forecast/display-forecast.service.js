'use strict';

angular
  .module('displayForecast')
  .service('displayForecastService', [
    function displayForecastService () {

      /**
       * Return the icon file name for the requested weather condition
       */
      this.getWeatherIcon = function getWeatherIcon(weatherCondition) {
        let iconMap = {
          'Clear': 'clear.svg',
          'Clouds': 'clouds.svg',
          'Drizzle': 'drizzle.svg',
          'Rain': 'rain.svg',
          'Snow': 'snow.svg',
          'Thunderstorm': 'thunderstorm.svg',
          'Additional': 'additional.svg',
          'Extreme': 'extreme.svg',
          'Atmosphere': 'atmosphere.svg',
          'Haze': 'atmosphere.svg',
          'Mist': 'atmosphere.svg',
          'Fog': 'atmosphere.svg'
        };
        return iconMap[weatherCondition];
      }
    }
  ]);
