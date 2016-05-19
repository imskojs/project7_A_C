(function() {
  'use strict';
  angular.module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', 'Users', 'LoginModel', 'Message', 'appStorage', '$state'];

  function LoginController($scope, Users, LoginModel, Message, appStorage, $state) {

    var Login = this;
    Login.Model = LoginModel;

    Login.login = login;

    $scope.$on('$ionicView.enter', onEnter);
    //====================================================
    //  Implementation
    //====================================================

    function login() {
      Message.loading();
      Users.login({}, {
        identifier: LoginModel.form.email,
        password: LoginModel.form.password
      }).$promise
        .then(onLoginSuccess)
        .catch(onLoginError);
    }

    function onEnter() {
      LoginModel.form = {};
    }

    //====================================================
    //  Helper
    //====================================================
    function onLoginSuccess(authData) {
      appStorage.token = authData.token;
      appStorage.user = authData.user;
      Message.hide();
      $state.go('main.home');
    }

    function onLoginError(err) {
      console.log(err);
      Message.hide();
      Message.alert('로그인 알림', '이메일이나 암호가 잘못 되었습니다.')
        .then(function() {
          LoginModel.form = {};
        });
    }
  }
})();
