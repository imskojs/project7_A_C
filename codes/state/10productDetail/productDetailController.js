(function() {
  'use strict';
  angular.module('app')
    .controller('ProductDetailController', ProductDetailController);

  ProductDetailController.$inject = ['ProductDetailModel'];

  function ProductDetailController(ProductDetailModel) {

    var ProductDetail = this;
    ProductDetail.Model = ProductDetailModel;


    //------------------------
    //  IMPLEMENTATIONS
    //------------------------
  }
})();
