(function() {
  'use strict';
  angular.module('app')
    .controller('AnnouncementListController', AnnouncementListController);

  AnnouncementListController.$inject = ['U', '$scope', 'Posts', 'AnnouncementListModel', 'Message', '$ionicHistory', '$stateParams'];

  function AnnouncementListController(U, $scope, Posts, AnnouncementListModel, Message, $ionicHistory, $stateParams) {

    var AnnouncementList = this;
    AnnouncementList.Model = AnnouncementListModel;

    AnnouncementList.getNewerPosts = getNewerPosts;
    AnnouncementList.getOlderPosts = getOlderPosts;
    AnnouncementList.checkForMore = checkForMore;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //====================================================
    //  Implementation
    //====================================================
    function getPosts() {
      return Posts.getPosts({
          category: $stateParams.category,
          limit: 10,
          populates: 'photos'
        }).$promise
        .then(setView)
        .catch(getPostsError);
    }

    function getNewerPosts() {
      return Posts.getPosts({
          category: $stateParams.category,
          limit: 10,
          newerThan: U.getFirstListId(AnnouncementListModel.posts),
          populates: 'photos'
        }).$promise
        .then(prependToView)
        .catch(getNewerPostsError);
    }

    function getOlderPosts() {
      return Posts.getPosts({
          category: $stateParams.category,
          sort: 'id DESC',
          limit: 10,
          olderThan: U.getLastListId(AnnouncementListModel.posts),
          populates: 'photos'
        }).$promise
        .then(appendToView)
        .catch(getOlderPostsError);
    }

    function checkForMore() {
      return AnnouncementListModel.more;
    }
    //====================================================
    //  View state
    //====================================================
    function onBeforeEnter() {
      if (U.isForwardView('main.announcementDetail') || U.isBackView('main.announcementDetail')) {
        // For sibling views do not req more from server. other logic here;
      } else {
        // U.reset(AnnouncementListModel);
        // return getPosts();
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
    function setView(postsWrapper) {
      console.log(postsWrapper);
      AnnouncementListModel.posts = postsWrapper.posts;
      AnnouncementListModel.more = postsWrapper.more;
      U.resize();
      Message.hide();
    }

    function getPostsError(err) {
      console.log(err);
      Message.hide();
      return Message.alert();
    }

    function prependToView(postsWrapper) {
      console.log(postsWrapper);
      if (postsWrapper && postsWrapper.posts && postsWrapper.posts.length === 0) {
        return Message.alert(
          '새로운 내용이 없습니다',
          '나중에 다시 확인해주세요'
        );
      }
      angular.forEach(postsWrapper.posts, function(post) {
        AnnouncementListModel.posts.unshift(post);
      });
      U.resize();
      $scope.$broadcast('scroll.refreshComplete');
    }

    function getNewerPostsError(err) {
      console.log(err);
      $scope.$broadcast('scroll.refreshComplete');
      return Message.alert();
    }

    function appendToView(postsWrapper) {
      console.log(postsWrapper);
      angular.forEach(postsWrapper.posts, function(post) {
        AnnouncementListModel.posts.push(post);
      });
      AnnouncementListModel.more = postsWrapper.more;
      U.resize();
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    function getOlderPostsError(err) {
      console.log(err);
      $scope.$broadcast('scroll.infiniteScrollComplete');
      AnnouncementListModel.more = false;
      return Message.alert();
    }

  } //end
})();
