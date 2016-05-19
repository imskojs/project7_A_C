(function() {
  'use strict';

  angular.module('app')
    .factory('BidListModel', BidListModel);

  BidListModel.$inject = [];

  function BidListModel() {

    var model = {
      bids: [{
        price: 30000,
        place: {
          id: '1234',
          name: 'name test',
          address: 'address test',
          geoJSON: {
            type: 'Point',
            coordinates: [150, 30]
          }
        },
        product: {
          id: 'asdf',
          name: 'product.name test'
        }
      }, {
        price: 30000,
        place: {
          id: '1234',
          name: 'name test',
          address: 'address test',
          geoJSON: {
            type: 'Point',
            coordinates: [150, 30]
          }
        },
        product: {
          id: 'asdf',
          name: 'product.name test'
        }
      }],
      more: false

    };
    return model;
  }
})();
