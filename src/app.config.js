'use strict';

angular
  .module('wvApp')
  .config(['$routeProvider', '$locationProvider',
    function wvAppConfig ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/default', {
          template: '<main-page></main-page>'
        })
        .otherwise('/default');
    }]);
