'use strict';

angular
  .module('forecastFormat')
  .service('forecastFormatService', [
    function forecastFormat() {

      let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      /**
       *
       */
      this.formatFiveDayForecast = function formatFiveDayForecast (rawForecast) {
        let fiveDayForecast = [];

        rawForecast.forEach((fcastFrame, index) => {
          let f = {}; //formated output object
          let date;

          f.date = fcastFrame.date;
          f.year = fcastFrame.date.substr(0, 4);
          f.monthNum = fcastFrame.date.substr(5, 2);
          f.monthName = months[parseInt(f.monthNum - 1)];
          f.dayNum = fcastFrame.date.substr(8, 2);
          date = new Date(f.monthName + ' ' + f.dayNum + ', ' + f.year + ' 00:00:01');
          f.dayName = days[date.getDay()];
          f.weather = fcastFrame.day.condition.text;
          f.tempHighC = fcastFrame.day.maxtemp_c;
          f.tempHighF = fcastFrame.day.maxtemp_f;
          f.tempLowC = fcastFrame.day.mintemp_c;
          f.tempLowF = fcastFrame.day.mintemp_f;
          f.windSpeed = fcastFrame.day.maxwind_mph; // mph
          f.precip = fcastFrame.day.totalprecip_in; // in

          fiveDayForecast.push(f);
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
        w.hours12 = (w.hours > 12) ? w.hours - 12 : w.hours; // convert to 12-hour system
        w.hoursString = (w.hours12 > 9) ? w.hours12.toString() : '0' + w.hours12; // make sure 2 digits always displayed (i.e. if hours is 3, display "03")
        w.minutes = date.getMinutes();
        w.minutesString = (w.minutes > 9) ? w.minutes.toString() : '0' + w.minutes;
        w.time = w.hoursString
                 + ':' + w.minutesString
                 + ((w.hours >= 12) ? ' pm' : ' am');
        w.weather = rawWeather.condition.text;
        w.tempC = rawWeather.temp_c;
        w.tempF = rawWeather.temp_f;
        w.windSpeed = rawWeather.wind_mph; // mph
        w.windDeg = rawWeather.wind_degree; // deg
        w.windDirection = rawWeather.wind_dir;
        w.humidity = rawWeather.humidity; //%
        w.pressure = rawWeather.pressure_in; // in
        w.precip = rawWeather.precip_in; //in

        return w;
      }
    }
  ]);
