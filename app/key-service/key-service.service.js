'use strict';

angular.module('keyService').service('keyService', ['$http', function keyService($http) {

  this.getKey = function getKey(apiName) {

    var getKey = new Promise(function (resolve, reject) {
      $http.get('./keys/keys.json').then(function (response) {
        resolve(response.data[apiName].key);
      });
    });

    return getKey;
  };
}]);