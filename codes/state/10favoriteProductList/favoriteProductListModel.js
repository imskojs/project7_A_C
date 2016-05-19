(function() {
  'use strict';

  angular.module('app')
    .factory('FavoriteProductListModel', FavoriteProductListModel);

  FavoriteProductListModel.$inject = [];

  function FavoriteProductListModel() {

    var model = {
      products: [{
        id: 'asdf',
        name: '아이패드 2015년 형',
        price: 250000,
        photos: [{
          url: ''
        }],
        place: {
          name: '착한 전당포'
        }
      }, {
        name: '아이패드 2015년 형',
        price: 250000,
        place: {
          name: '착한 전당포'
        }
      }, {
        name: '아이패드 2015년 형',
        price: 250000,
        place: {
          name: '착한 전당포'
        }
      }, {
        name: '아이패드 2015년 형',
        price: 250000,
        place: {
          name: '착한 전당포'
        }
      }, {
        name: '아이패드 2015년 형',
        price: 250000,
        place: {
          name: '착한 전당포'
        }
      }, {
        name: '아이패드 2015년 형',
        price: 250000,
        place: {
          name: '착한 전당포'
        }
      }],
      more: false
    };
    return model;
  }
})();
