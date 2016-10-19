'use strict';

angular.module('forecastFormat').service('forecastFormatService', [function forecastFormat() {

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  /**
   *
   */
  this.formatFiveDayForecast = function formatFiveDayForecast(rawForecast) {
    var fiveDayForecast = [];

    rawForecast.forEach(function (fcastFrame, index) {
      var f = {}; //formated output object
      var date = void 0;

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
  };

  this.formatWeather = function formatWeather(rawWeather) {

    var w = {}; //formated output object
    var date = new Date();

    w.date = date.getDay();
    w.year = date.getFullYear();
    w.monthNum = date.getMonth();
    w.monthName = months[parseInt(w.monthNum)];
    w.dayNum = date.getDate();
    w.dayName = days[date.getDay()];
    w.hours = date.getHours();
    w.minutes = date.getMinutes();
    w.time = (w.hours > 12 ? w.hours - 12 : w.hours) + ':' + w.minutes + (w.hours >= 12 ? ' pm' : ' am');
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
  };
}]);