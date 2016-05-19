(function() {
  'use strict';

  angular.module('app')
    .factory('MyProductListModel', MyProductListModel);

  MyProductListModel.$inject = [];

  function MyProductListModel() {

    var model = {
      products: [{}, {}],
      more: false
    };
    return model;
  }
})();
