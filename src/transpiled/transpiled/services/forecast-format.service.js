'use strict';

(function (angular) {
  'use strict';

  angular.module('wvApp').service('forecastFormatService', [function forecastFormat() {
    var _this = this;

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    this.currentWeather = {};
    this.forecast = new Array(10);
    this.tempUnits = { value: 'C' };

    this.formatFiveDayForecast = function formatFiveDayForecast(rawForecast) {
      rawForecast.forEach(function (fcastFrame, index) {
        var date = void 0;

        _this.forecast[index] = {};

        _this.forecast[index].date = fcastFrame.date;
        _this.forecast[index].year = fcastFrame.date.substr(0, 4);
        _this.forecast[index].monthNum = fcastFrame.date.substr(5, 2);
        _this.forecast[index].monthName = months[parseInt(_this.forecast[index].monthNum - 1)];
        _this.forecast[index].dayNum = fcastFrame.date.substr(8, 2);
        date = new Date(_this.forecast[index].monthName + ' ' + _this.forecast[index].dayNum + ', ' + _this.forecast[index].year + ' 00:00:01');
        _this.forecast[index].dayName = days[date.getDay()];
        _this.forecast[index].weather = fcastFrame.day.condition.text;
        _this.forecast[index].tempHighC = fcastFrame.day.maxtemp_c;
        _this.forecast[index].tempHighF = fcastFrame.day.maxtemp_f;
        _this.forecast[index].tempLowC = fcastFrame.day.mintemp_c;
        _this.forecast[index].tempLowF = fcastFrame.day.mintemp_f;
        _this.forecast[index].windSpeed = fcastFrame.day.maxwind_mph; // mph
        _this.forecast[index].precip = fcastFrame.day.totalprecip_in; // in
      });

      return _this.forecast;
    };

    this.formatWeather = function formatWeather(rawWeather) {

      var formatedWeatherPromise = new Promise(function (resolve, reject) {
        var w = _this.currentWeather; //formated output object
        var date = new Date();

        _this.currentWeather.date = date.getDay();
        _this.currentWeather.year = date.getFullYear();
        _this.currentWeather.monthNum = date.getMonth();
        _this.currentWeather.monthName = months[parseInt(w.monthNum)];
        _this.currentWeather.dayNum = date.getDate();
        _this.currentWeather.dayName = days[date.getDay()];
        _this.currentWeather.hours = date.getHours();
        _this.currentWeather.hours12 = w.hours > 12 ? w.hours - 12 : w.hours; // convert to 12-hour system
        _this.currentWeather.hoursString = w.hours12 > 9 ? w.hours12.toString() : '0' + w.hours12; // make sure 2 digits always displayed (i.e. if hours is 3, display "03")
        _this.currentWeather.minutes = date.getMinutes();
        _this.currentWeather.minutesString = w.minutes > 9 ? w.minutes.toString() : '0' + w.minutes;
        _this.currentWeather.time = w.hoursString + ':' + w.minutesString + (w.hours >= 12 ? ' pm' : ' am');
        _this.currentWeather.weather = rawWeather.condition.text;
        _this.currentWeather.tempC = rawWeather.temp_c;
        _this.currentWeather.tempF = rawWeather.temp_f;
        _this.currentWeather.windSpeed = rawWeather.wind_mph; // mph
        _this.currentWeather.windDeg = rawWeather.wind_degree; // deg
        _this.currentWeather.windDirection = rawWeather.wind_dir;
        _this.currentWeather.humidity = rawWeather.humidity; //%
        _this.currentWeather.pressure = rawWeather.pressure_in; // in
        _this.currentWeather.precip = rawWeather.precip_in; //in

        resolve(_this.currentWeather);
      });

      return formatedWeatherPromise;
    };
  }]);
})(window.angular);