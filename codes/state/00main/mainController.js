(function() {
  'use strict';
  angular.module('app')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', 'MainModel', 'appStorage', '$state', '$ionicSideMenuDelegate', '$ionicModal'];

  function MainController($scope, MainModel, appStorage, $state, $ionicSideMenuDelegate, $ionicModal) {

    var Main = this;
    Main.Model = MainModel;

    Main.logout = logout;

    //====================================================
    //  Implementation
    //====================================================
    function logout(stateAfterLogout) {
      appStorage.token = null;
      appStorage.user = {};
      $ionicSideMenuDelegate.toggleLeft(false);
      $state.go(stateAfterLogout);
    }
    //====================================================
    //  Modal
    //====================================================
    $ionicModal.fromTemplateUrl('state/modal/requestLogin.html', {
      scope: $scope,
      animation: 'mh-slide'
    }).then(function(modal) {
      Main.requestLoginModal = modal;
    });
  }
})();
