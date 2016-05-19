(function() {
  'use strict';
  angular.module('app')
    .controller('ReservationRegisterController1', ReservationRegisterController1);

  ReservationRegisterController1.$inject = ['ReservationRegisterModel'];

  function ReservationRegisterController1(ReservationRegisterModel) {

    var ReservationRegister1 = this;
    ReservationRegister1.Model = ReservationRegisterModel;
    //====================================================
    //  Implementation
    //====================================================

  }
})();
