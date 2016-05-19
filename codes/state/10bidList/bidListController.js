(function() {
  'use strict';
  angular.module('app')
    .controller('BidListController', BidListController);

  BidListController.$inject = ['U', '$scope', 'Bids', 'BidListModel', 'Message', '$ionicHistory', '$stateParams'];

  function BidListController(U, $scope, Bids, BidListModel, Message, $ionicHistory, $stateParams) {

    var BidList = this;
    BidList.Model = BidListModel;

    BidList.getNewerBids = getNewerBids;
    BidList.getOlderBids = getOlderBids;
    BidList.checkForMore = checkForMore;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //====================================================
    //  Implementation
    //====================================================
    function getBids() {
      return Bids.getBids({
          product: $stateParams.product,
          to: $stateParams.to,
          limit: 10,
          populates: 'place,user,product'
        }).$promise
        .then(setView)
        .catch(getBidsError);
    }

    function getNewerBids() {
      return Bids.getBids({
          product: $stateParams.product,
          to: $stateParams.to,
          limit: 10,
          newerThan: U.getFirstListId(BidListModel.bids),
          populates: 'place,user,product'
        }).$promise
        .then(prependToView)
        .catch(getNewerBidsError);
    }

    function getOlderBids() {
      return Bids.getBids({
          product: $stateParams.product,
          to: $stateParams.to,
          sort: 'id DESC',
          limit: 10,
          olderThan: U.getLastListId(BidListModel.bids),
          populates: 'place,user,product'
        }).$promise
        .then(appendToView)
        .catch(getOlderBidsError);
    }

    function checkForMore() {
      return BidListModel.more;
    }
    //====================================================
    //  View state
    //====================================================
    function onBeforeEnter() {
      if (U.isForwardView('main.bidDetail') || U.isBackView('main.bidDetail')) {
        // For sibling views do not req more from server. other logic here;
      } else {
        // U.reset(BidListModel);
        console.log(BidListModel);
        // return getBids();
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
    function setView(bidsWrapper) {
      console.log(bidsWrapper);
      BidListModel.bids = bidsWrapper.bids;
      BidListModel.more = bidsWrapper.more;
      U.resize();
      Message.hide();
    }

    function getBidsError(err) {
      console.log(err);
      Message.hide();
      return Message.alert();
    }

    function prependToView(bidsWrapper) {
      console.log(bidsWrapper);
      if (bidsWrapper && bidsWrapper.bids && bidsWrapper.bids.length === 0) {
        return Message.alert(
          '새로운 내용이 없습니다',
          '나중에 다시 확인해주세요'
        );
      }
      angular.forEach(bidsWrapper.bids, function(bid) {
        BidListModel.bids.unshift(bid);
      });
      U.resize();
      $scope.$broadcast('scroll.refreshComplete');
    }

    function getNewerBidsError(err) {
      console.log(err);
      $scope.$broadcast('scroll.refreshComplete');
      return Message.alert();
    }

    function appendToView(bidsWrapper) {
      console.log(bidsWrapper);
      angular.forEach(bidsWrapper.bids, function(bid) {
        BidListModel.bids.push(bid);
      });
      BidListModel.more = bidsWrapper.more;
      U.resize();
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    function getOlderBidsError(err) {
      console.log(err);
      $scope.$broadcast('scroll.infiniteScrollComplete');
      BidListModel.more = false;
      return Message.alert();
    }

  } //end
})();
