(function() {
  'use strict';
  angular.module('app')
    .filter('appText', appText);

  appText.$inject = [];

  function appText() {
    return function(input) {
      if (input === 'high') {
        return 'HIGH';
      } else if (input === 'mid') {
        return 'MID';
      } else if (input === 'low') {
        return 'LOW';
      } else if (input === 'news') {
        return '새로운 소식';
      }

    };
  }
})();
