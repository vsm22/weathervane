(function(angular) {
    'use strict';

    angular.module('wvApp').service('displayForecastService', [
        function displayForecastService() {
            const conditionMap = [{
                "code": 1000,
                "day": "Sunny",
                "night": "Clear",
                "icon": 113,
                "condition": "Clear"
            }, {
                "code": 1003,
                "day": "Partly Cloudy",
                "night": "Partly Cloudy",
                "icon": 116,
                "condition": "Clouds"
            }, {
                "code": 1006,
                "day": "Cloudy",
                "night": "Cloudy",
                "icon": 119,
                "condition": "Clouds"
            }, {
                "code": 1009,
                "day": "Overcast",
                "night": "Overcast",
                "icon": 122,
                "condition": "Clouds"
            }, {
                "code": 1030,
                "day": "Mist",
                "night": "Mist",
                "icon": 143,
                "condition": "Mist"
            }, {
                "code": 1063,
                "day": "Patchy rain nearby",
                "night": "Patchy rain nearby",
                "icon": 176,
                "condition": "Rain"
            }, {
                "code": 1066,
                "day": "Patchy snow nearby",
                "night": "Patchy snow nearby",
                "icon": 179,
                "condition": "Snow"
            }, {
                "code": 1069,
                "day": "Patchy sleet nearby",
                "night": "Patchy sleet nearby",
                "icon": 182,
                "condition": "Atmosphere"
            }, {
                "code": 1072,
                "day": "Patchy freezing drizzle nearby",
                "night": "Patchy freezing drizzle nearby",
                "icon": 185,
                "condition": "Drizzle"
            }, {
                "code": 1087,
                "day": "Thundery outbreaks in nearby",
                "night": "Thundery outbreaks in nearby",
                "icon": 200,
                "condition": "Thunderstorm"
            }, {
                "code": 1114,
                "day": "Blowing snow",
                "night": "Blowing snow",
                "icon": 227,
                "condition": "Snow"
            }, {
                "code": 1117,
                "day": "Blizzard",
                "night": "Blizzard",
                "icon": 230,
                "condition": "Snow"
            }, {
                "code": 1135,
                "day": "Fog",
                "night": "Fog",
                "icon": 248,
                "condition": "Fog"
            }, {
                "code": 1147,
                "day": "Freezing fog",
                "night": "Freezing fog",
                "icon": 260,
                "condition": "Fog"
            }, {
                "code": 1150,
                "day": "Patchy light drizzle",
                "night": "Patchy light drizzle",
                "icon": 263,
                "condition": "Drizzle"
            }, {
                "code": 1153,
                "day": "Light drizzle",
                "night": "Light drizzle",
                "icon": 266,
                "condition": "Drizzle"
            }, {
                "code": 1168,
                "day": "Freezing drizzle",
                "night": "Freezing drizzle",
                "icon": 281,
                "condition": "Drizzle"
            }, {
                "code": 1171,
                "day": "Heavy freezing drizzle",
                "night": "Heavy freezing drizzle",
                "icon": 284,
                "condition": "Drizzle"
            }, {
                "code": 1180,
                "day": "Patchy light rain",
                "night": "Patchy light rain",
                "icon": 293,
                "condition": "Rain"
            }, {
                "code": 1183,
                "day": "Light rain",
                "night": "Light rain",
                "icon": 296,
                "condition": "Rain"
            }, {
                "code": 1186,
                "day": "Moderate rain at times",
                "night": "Moderate rain at times",
                "icon": 299,
                "condition": "Rain"
            }, {
                "code": 1189,
                "day": "Moderate rain",
                "night": "Moderate rain",
                "icon": 302,
                "condition": "Rain"
            }, {
                "code": 1192,
                "day": "Heavy rain at times",
                "night": "Heavy rain at times",
                "icon": 305,
                "condition": "Rain"
            }, {
                "code": 1195,
                "day": "Heavy rain",
                "night": "Heavy rain",
                "icon": 308,
                "condition": "Rain"
            }, {
                "code": 1198,
                "day": "Light freezing rain",
                "night": "Light freezing rain",
                "icon": 311,
                "condition": "Rain"
            }, {
                "code": 1201,
                "day": "Moderate or heavy freezing rain",
                "night": "Moderate or heavy freezing rain",
                "icon": 314,
                "condition": "Rain"
            }, {
                "code": 1204,
                "day": "Light sleet",
                "night": "Light sleet",
                "icon": 317,
                "condition": "Snow"
            }, {
                "code": 1207,
                "day": "Moderate or heavy sleet",
                "night": "Moderate or heavy sleet",
                "icon": 320,
                "condition": "Snow"
            }, {
                "code": 1210,
                "day": "Patchy light snow",
                "night": "Patchy light snow",
                "icon": 323,
                "condition": "Snow"
            }, {
                "code": 1213,
                "day": "Light snow",
                "night": "Light snow",
                "icon": 326,
                "condition": "Snow"
            }, {
                "code": 1216,
                "day": "Patchy moderate snow",
                "night": "Patchy moderate snow",
                "icon": 329,
                "condition": "Snow"
            }, {
                "code": 1219,
                "day": "Moderate snow",
                "night": "Moderate snow",
                "icon": 332,
                "condition": "Snow"
            }, {
                "code": 1222,
                "day": "Patchy heavy snow",
                "night": "Patchy heavy snow",
                "icon": 335,
                "condition": "Snow"
            }, {
                "code": 1225,
                "day": "Heavy snow",
                "night": "Heavy snow",
                "icon": 338,
                "condition": "Snow"
            }, {
                "code": 1237,
                "day": "Ice pellets",
                "night": "Ice pellets",
                "icon": 350,
                "condition": "Snow"
            }, {
                "code": 1240,
                "day": "Light rain shower",
                "night": "Light rain shower",
                "icon": 353,
                "condition": "Rain"
            }, {
                "code": 1243,
                "day": "Moderate or heavy rain shower",
                "night": "Moderate or heavy rain shower",
                "icon": 356,
                "condition": "Rain"
            }, {
                "code": 1246,
                "day": "Torrential rain shower",
                "night": "Torrential rain shower",
                "icon": 359,
                "condition": "Rain"
            }, {
                "code": 1249,
                "day": "Light sleet showers",
                "night": "Light sleet showers",
                "icon": 362,
                "condition": "Rain"
            }, {
                "code": 1252,
                "day": "Moderate or heavy sleet showers",
                "night": "Moderate or heavy sleet showers",
                "icon": 365,
                "condition": "Snow"
            }, {
                "code": 1255,
                "day": "Light snow showers",
                "night": "Light snow showers",
                "icon": 368,
                "condition": "Snow"
            }, {
                "code": 1258,
                "day": "Moderate or heavy snow showers",
                "night": "Moderate or heavy snow showers",
                "icon": 371,
                "condition": "Snow"
            }, {
                "code": 1261,
                "day": "Light showers of ice pellets",
                "night": "Light showers of ice pellets",
                "icon": 374,
                "condition": "Snow"
            }, {
                "code": 1264,
                "day": "Moderate or heavy showers of ice pellets",
                "night": "Moderate or heavy showers of ice pellets",
                "icon": 377,
                "condition": "Snow"
            }, {
                "code": 1273,
                "day": "Patchy light rain in area with thunder",
                "night": "Patchy light rain in area with thunder",
                "icon": 386,
                "condition": "Thunderstorm"
            }, {
                "code": 1276,
                "day": "Moderate or heavy rain in area with thunder",
                "night": "Moderate or heavy rain in area with thunder",
                "icon": 389,
                "condition": "Thunderstorm"
            }, {
                "code": 1279,
                "day": "Patchy light snow in area with thunder",
                "night": "Patchy light snow in area with thunder",
                "icon": 392,
                "condition": "Thunderstorm"
            }, {
                "code": 1282,
                "day": "Moderate or heavy snow in area with thunder",
                "night": "Moderate or heavy snow in area with thunder",
                "icon": 395,
                "condition": "Thunderstorm"
            }];

            const iconMap = {
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

            /**
             * Return the icon file name for the requested weather condition
             */
            this.getWeatherIcon = function getWeatherIcon(dayCondition) {
                if (dayCondition) {
                    let weatherCondition = conditionMap.find(function(entry) {
                        return entry.day.toLowerCase() === dayCondition.toLowerCase();
                    });

                    weatherCondition = (weatherCondition) ? weatherCondition : conditionMap[1];

                    return iconMap[weatherCondition.condition];
                }
            }
        }
    ]);
})(window.angular);
