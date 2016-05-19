(function() {
  'use strict';
  angular.module('app')
    .controller('ReservationRegisterController0', ReservationRegisterController0);

  ReservationRegisterController0.$inject = ['ReservationRegisterModel', '$window', 'daum'];

  function ReservationRegisterController0(ReservationRegisterModel, $window, daum) {

    var ReservationRegister0 = this;
    ReservationRegister0.Model = ReservationRegisterModel;
    //====================================================
    //  Implementation
    //====================================================
    var staticMapContainer = $window.document.getElementById('staticMap');
    var longitude = ReservationRegisterModel.reservation.place.geoJSON.coordinates[0];
    var latitude = ReservationRegisterModel.reservation.place.geoJSON.coordinates[1];
    var staticMapOption = {
      center: new daum.maps.LatLng(latitude, longitude),
      level: 3,
      marker: {
        position: new daum.maps.LatLng(latitude, longitude)
      }
    };
    new daum.maps.StaticMap(staticMapContainer, staticMapOption);

  }
})();
