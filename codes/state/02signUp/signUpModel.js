(function() {
  'use strict';

  angular.module('app')
    .factory('SignUpModel', SignUpModel);

  SignUpModel.$inject = [];

  function SignUpModel() {

    var model = {
      form: {},
      confirmPassword: null
    };

    return model;
  }
})();
