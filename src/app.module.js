(function(angular){
  'use strict';

  angular.module('wvApp', ['ngComponentRouter'])
    .config(function($locationProvider) {
      $locationProvider.html5Mode(true);
    })
    .value('$routerRootComponent', 'mainHeader');

})(window.angular);
