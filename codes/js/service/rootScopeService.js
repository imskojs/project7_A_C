//====================================================
//  createdBy;
// Seunghoon Ko (imskojs@gmail.com)
//====================================================

// Description: Extends $rootScope with custom functions;

// Usage;
// In app.js
// .run(['$rootScope', 'rootScopeService', function ($rootScope, rootScopeService){
//   angular.extend($rootScope, rootScopeService);
// }])
(function() {
  'use strict';

  angular.module('app')
    .factory('rootScopeService', rootScopeService);

  rootScopeService.$inject = ['$state', '$stateParams', '$ionicHistory', '$ionicSideMenuDelegate', 'Message', '$timeout', 'appStorage'];

  function rootScopeService($state, $stateParams, $ionicHistory, $ionicSideMenuDelegate, Message, $timeout, appStorage) {
    var service = {
      appStorage: appStorage,
      $state: $state,
      $stateParams: $stateParams,
      isState: isState,
      areStates: areStates,
      getState: getState,
      isParam: isParam,
      getParam: getParam,
      goToState: goToState,
      goBack: goBack,
      loading: loading,
      toggleSideMenu: toggleSideMenu,
      closeSideMenu: closeSideMenu,
    };

    return service;

    function isState(state) {
      return state === $ionicHistory.currentStateName();
    }

    function areStates(states) {
      return states.indexOf($ionicHistory.currentStateName()) !== -1;
    }

    function getState() {
      return $ionicHistory.currentStateName();
    }
    //====================================================
    //  $rootScope.isParam({id: '123', category: ''}) >> true | false
    //====================================================
    function isParam(paramObj) {
      for (var key in paramObj) {
        if ($stateParams[key] !== paramObj[key]) {
          return false;
        }
      }
      return true;
    }
    //====================================================
    // $rootScope.getParam(category)  >> $stateParams[category]
    //====================================================
    function getParam(key) {
      return $stateParams[key];
    }
    //====================================================
    //  $rootScope.goToState('main.home', {category: 'apple', theme: 'drink'})
    //====================================================
    function goToState(state, params) {
      $ionicSideMenuDelegate.toggleLeft(false);
      $state.go(state, params);
    }
    //====================================================
    //  $rootScope.goBack();
    //====================================================
    function goBack() {
      $ionicHistory.goBack();
    }
    //====================================================
    //  $rootScope.loading();
    //====================================================
    function loading() {
      Message.loading();
      $timeout(function() {
        Message.hide();
      }, 2000);
    }
    //====================================================
    //  $rootScope.closeSideMenu();
    //====================================================
    function closeSideMenu() {
      $ionicSideMenuDelegate.toggleLeft(false);
    }
    //====================================================
    //  $rootScope.toggleSideMenu();
    //====================================================
    function toggleSideMenu() {
      $ionicSideMenuDelegate.toggleLeft();
    }
  } //end
})();
