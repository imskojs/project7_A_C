(function() {
  'use strict';
  angular.module('app')
    .controller('ProductListController', ProductListController);

  ProductListController.$inject = ['ProductListModel'];

  function ProductListController(ProductListModel) {

    var ProductList = this;
    ProductList.Model = ProductListModel;


    //------------------------
    //  IMPLEMENTATIONS
    //------------------------
  }
})();
