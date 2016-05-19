(function() {
  'use strict';
  angular.module('app')
    .controller('FavoriteProductListController', FavoriteProductListController);

  FavoriteProductListController.$inject = ['U', '$scope', 'Products', 'appStorage', 'FavoriteProductListModel', 'Message'];

  function FavoriteProductListController(U, $scope, Products, appStorage, FavoriteProductListModel, Message) {

    var FavoriteProductList = this;
    FavoriteProductList.Model = FavoriteProductListModel;

    FavoriteProductList.getNewerProducts = getNewerProducts;
    FavoriteProductList.getOlderProducts = getOlderProducts;
    FavoriteProductList.checkForMore = checkForMore;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //====================================================
    //  Implementation
    //====================================================
    function getProducts() {
      return Products.getProducts({
          id: appStorage.favorites,
          limit: 10,
          populates: 'photos,place'
        }).$promise
        .then(setView)
        .catch(getProductsError);
    }

    function getNewerProducts() {
      return Products.getProducts({
          id: appStorage.favorites,
          limit: 10,
          newerThan: U.getFirstListId(FavoriteProductListModel.products),
          populates: 'photos,place'
        }).$promise
        .then(prependToView)
        .catch(getNewerProductsError);
    }

    function getOlderProducts() {
      return Products.getProducts({
          id: appStorage.favorites,
          sort: 'id DESC',
          limit: 10,
          olderThan: U.getLastListId(FavoriteProductListModel.products),
          populates: 'photos,place'
        }).$promise
        .then(appendToView)
        .catch(getOlderProductsError);
    }

    function checkForMore() {
      return FavoriteProductListModel.more;
    }
    //====================================================
    //  View state
    //====================================================
    function onBeforeEnter() {
      if (U.isForwardView('main.productDetail') || U.isBackView('main.productDetail')) {
        // For sibling views do not req more from server. other logic here;
      } else {
        // U.reset(FavoriteProductListModel);
        // return getProducts();
      }
    }

    function onBeforeLeave() {
      return Message.loading();
    }

    function onAfterEnter() {
      return Message.hide();
    }
    //====================================================
    //  Helper
    //====================================================
    function setView(productsWrapper) {
      console.log(productsWrapper);
      FavoriteProductListModel.products = productsWrapper.products;
      FavoriteProductListModel.more = productsWrapper.more;
      U.resize();
      Message.hide();
    }

    function getProductsError(err) {
      console.log(err);
      Message.hide();
      return Message.alert();
    }

    function prependToView(productsWrapper) {
      console.log(productsWrapper);
      if (productsWrapper && productsWrapper.products && productsWrapper.products.length === 0) {
        return Message.alert(
          '새로운 내용이 없습니다',
          '나중에 다시 확인해주세요'
        );
      }
      angular.forEach(productsWrapper.products, function(product) {
        FavoriteProductListModel.products.unshift(product);
      });
      U.resize();
      $scope.$broadcast('scroll.refreshComplete');
    }

    function getNewerProductsError(err) {
      console.log(err);
      $scope.$broadcast('scroll.refreshComplete');
      return Message.alert();
    }

    function appendToView(productsWrapper) {
      console.log(productsWrapper);
      angular.forEach(productsWrapper.products, function(product) {
        FavoriteProductListModel.products.push(product);
      });
      FavoriteProductListModel.more = productsWrapper.more;
      U.resize();
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    function getOlderProductsError(err) {
      console.log(err);
      $scope.$broadcast('scroll.infiniteScrollComplete');
      FavoriteProductListModel.more = false;
      return Message.alert();
    }

  } //end
})();
