'use strict';

angular
  .module('forecastFormat')
  .service('forecastFormatService', [
    function forecastFormat() {

      /** */
      this.formatFiveDayForecast = function formatFiveDayForecast (rawForecast) {
        var fiveDayForecast = [];

        rawForecast.forEach((fcastFrame, index) => {
          let f = {}; //formated output object
          let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
          let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          let date;

          f.date = fcastFrame.dt_txt.substr(0, 10);
          f.year = fcastFrame.dt_txt.substr(0, 4);
          f.monthNum = fcastFrame.dt_txt.substr(5, 2);
          f.monthName = months[parseInt(f.monthNum - 1)];
          f.dayNum = fcastFrame.dt_txt.substr(8, 2);
          date = new Date(f.monthName + ' ' + f.dayNum + ', ' + f.year + ' 00:00:01');
          f.dayName = days[date.getDay()];
          f.time = fcastFrame.dt_txt.substr(11, 5);
          f.weather = fcastFrame.weather[0].description;
          f.weatherMain = fcastFrame.weather[0].main;
          f.tempC = fcastFrame.main.temp - 273.15;
          f.tempF = (f.tempC * (9/5)) + 32;
          f.windSpeed = fcastFrame.wind.speed; // m/s
          f.windDeg = fcastFrame.wind.deg; // deg
          f.humidity = fcastFrame.main.humidity; //%
          f.pressure = fcastFrame.main.pressure * 0.02952998751; // in
          f.cloudCover = fcastFrame.clouds.all; //%

          fiveDayForecast[index] = f;
        });

        return fiveDayForecast;
      }
    }
  ]);
