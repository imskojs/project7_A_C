(function() {
  'use strict';
  angular.module('app')
    .controller('MyProductListController', MyProductListController);

  MyProductListController.$inject = ['U', '$scope', 'Products', 'MyProductListModel', 'Message', '$ionicHistory', '$stateParams'];

  function MyProductListController(U, $scope, Products, MyProductListModel, Message, $ionicHistory, $stateParams) {

    var MyProductList = this;
    MyProductList.Model = MyProductListModel;

    MyProductList.getMyNewerProducts = getMyNewerProducts;
    MyProductList.getMyOlderProducts = getMyOlderProducts;
    MyProductList.checkForMore = checkForMore;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //====================================================
    //  Implementation
    //====================================================
    function getMyProducts() {
      return Products.getMyProducts({
          category: $stateParams.category,
          limit: 10,
          populates: 'photos'
        }).$promise
        .then(setView)
        .catch(getMyProductsError);
    }

    function getMyNewerProducts() {
      return Products.getMyProducts({
          category: $stateParams.category,
          limit: 10,
          newerThan: U.getFirstListId(MyProductListModel.products),
          populates: 'photos'
        }).$promise
        .then(prependToView)
        .catch(getMyNewerProductsError);
    }

    function getMyOlderProducts() {
      return Products.getMyProducts({
          category: $stateParams.category,
          sort: 'id DESC',
          limit: 10,
          olderThan: U.getLastListId(MyProductListModel.products),
          populates: 'photos'
        }).$promise
        .then(appendToView)
        .catch(getMyOlderProductsError);
    }

    function checkForMore() {
      return MyProductListModel.more;
    }
    //====================================================
    //  View state
    //====================================================
    function onBeforeEnter() {
      if (U.isForwardView('main.bidList') || U.isBackView('main.bidList')) {
        // For sibling views do not req more from server. other logic here;
      } else {
        // U.reset(MyProductListModel);
        console.log(MyProductListModel);
        return getMyProducts();
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
      MyProductListModel.products = productsWrapper.products;
      MyProductListModel.more = productsWrapper.more;
      U.resize();
      Message.hide();
    }

    function getMyProductsError(err) {
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
      angular.forEach(productsWrapper.products, function(post) {
        MyProductListModel.products.unshift(post);
      });
      U.resize();
      $scope.$broadcast('scroll.refreshComplete');
    }

    function getMyNewerProductsError(err) {
      console.log(err);
      $scope.$broadcast('scroll.refreshComplete');
      return Message.alert();
    }

    function appendToView(productsWrapper) {
      console.log(productsWrapper);
      angular.forEach(productsWrapper.products, function(post) {
        MyProductListModel.products.push(post);
      });
      MyProductListModel.more = productsWrapper.more;
      U.resize();
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    function getMyOlderProductsError(err) {
      console.log(err);
      $scope.$broadcast('scroll.infiniteScrollComplete');
      MyProductListModel.more = false;
      return Message.alert();
    }

  } //end
})();
