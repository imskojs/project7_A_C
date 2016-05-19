(function() {
  'use strict';

  angular.module('app')
    .factory('ReservationRegisterModel', ReservationRegisterModel);

  ReservationRegisterModel.$inject = [];

  function ReservationRegisterModel() {

    var model = {
      reservation: {
        place: {
          address: '강남구 테헤란로 34길 21-6, 벧엘빌딩 6층',
          geoJSON: {
            type: 'Point',
            coordinates: [127.04091574589415, 37.49985665082049]
          }
        }
      }
    };
    return model;
  }
})();
