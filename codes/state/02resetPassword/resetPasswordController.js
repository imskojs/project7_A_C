(function() {
  'use strict';
  angular.module('app')
    .controller('ResetPasswordController', ResetPasswordController);

  ResetPasswordController.$inject = ['ResetPasswordModel'];

  function ResetPasswordController(ResetPasswordModel) {

    var ResetPassword = this;
    ResetPassword.Model = ResetPasswordModel;


    //------------------------
    //  IMPLEMENTATIONS
    //------------------------
  }
})();
