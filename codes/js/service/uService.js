//====================================================
// createdBy;
// Seunghoon Ko (imskojs@gmail.com)
//====================================================
(function() {
  'use strict';

  angular.module('app')
    .factory('U', U);

  U.$inject = ['$ionicHistory', '$ionicScrollDelegate', '$timeout'];

  function U($ionicHistory, $ionicScrollDelegate, $timeout) {

    var service = {
      getFirstListId: getFirstListId,
      getLastListId: getLastListId,
      isForwardView: isForwardView,
      isBackView: isBackView,
      resize: resize,
      reset: reset
    };

    return service;

    function getFirstListId(list) {
      var firstListId = list[0] && list[0].id;
      return firstListId;
    }

    function getLastListId(list) {
      var lastIndex = list.length - 1;
      var lastListId = list[lastIndex] && list[lastIndex].id;
      return lastListId;
    }

    function isForwardView(stateName) {
      console.log($ionicHistory.viewHistory());
      var isView =
        $ionicHistory.viewHistory().forwardView &&
        $ionicHistory.viewHistory().forwardView.stateName === stateName;
      return isView;
    }

    function isBackView(stateName) {
      console.log($ionicHistory.viewHistory());
      var isView =
        $ionicHistory.viewHistory().backView &&
        $ionicHistory.viewHistory().backView.stateName === stateName;
      return isView;
    }

    function resize() {
      $timeout(function() {
        $ionicScrollDelegate.resize();
      }, 0);
    }

    function reset(model) {
      for (var key in model) {
        if (Array.isArray(model[key])) {
          model[key] = [];
        } else if (model[key] !== null && typeof model[key] === 'object') {
          model[key] = {};
        } else if (typeof model[key] === 'boolean') {
          model[key] = false;
        } else {
          model[key] = null;
        }
      }
    }


  } // Service END
})();
