'use strict';

angular
  .module('forecastFormat')
  .service('forecastFormatService', [
    function forecastFormat() {

      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      /**
       *
       */
      this.formatFiveDayForecast = function formatFiveDayForecast (rawForecast) {
        let fiveDayForecast = [];

        rawForecast.forEach((fcastFrame, index) => {
          let f = {}; //formated output object
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

          if(!fiveDayForecast[fiveDayForecast.length - 1]
             || fiveDayForecast[fiveDayForecast.length - 1].dayNum !== f.dayNum) {
            fiveDayForecast.push(f);
          };
        });

        return fiveDayForecast;
      }

      this.formatWeather = function formatWeather (rawWeather) {

        let w = {}; //formated output object
        let date = new Date();

        w.date = date.getDay();
        w.year = date.getFullYear();
        w.monthNum = date.getMonth();
        w.monthName = months[parseInt(w.monthNum)];
        w.dayNum = date.getDate();
        w.dayName = days[date.getDay()];
        w.hours = date.getHours();
        w.minutes = date.getMinutes();
        w.time = ((w.hours > 12) ? w.hours - 12 : w.hours)
                 + ':' + w.minutes 
                 + ((w.hours >= 12) ? ' pm' : ' am');
        w.weather = rawWeather.weather[0].description;
        w.weatherMain = rawWeather.weather[0].main;
        w.tempC = rawWeather.main.temp - 273.15;
        w.tempF = (w.tempC * (9/5)) + 32;
        w.windSpeed = rawWeather.wind.speed; // m/s
        w.windDeg = rawWeather.wind.deg; // deg
        w.humidity = rawWeather.main.humidity; //%
        w.pressure = rawWeather.main.pressure * 0.02952998751; // in
        w.cloudCover = rawWeather.clouds.all; //%

        return w;
      }
    }
  ]);
