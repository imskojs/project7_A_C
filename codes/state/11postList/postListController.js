(function() {
  'use strict';
  angular.module('app')
    .controller('PostListController', PostListController);

  PostListController.$inject = ['U', '$scope', 'Posts', 'PostListModel', 'Message', '$ionicHistory', '$stateParams', '$ionicModal'];

  function PostListController(U, $scope, Posts, PostListModel, Message, $ionicHistory, $stateParams, $ionicModal) {

    var PostList = this;
    PostList.Model = PostListModel;

    PostList.dynamicStyle = dynamicStyle;
    PostList.getNewerPosts = getNewerPosts;
    PostList.getOlderPosts = getOlderPosts;
    PostList.checkForMore = checkForMore;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //====================================================
    //  Implementation
    //====================================================
    function dynamicStyle(post) {
      var result = {};
      if (post.reply) {
        result.height = '160';
      } else {
        result.height = '80';
      }
      return result;
    }

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
          newerThan: U.getFirstListId(PostListModel.posts),
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
          olderThan: U.getLastListId(PostListModel.posts),
          populates: 'photos'
        }).$promise
        .then(appendToView)
        .catch(getOlderPostsError);
    }

    function checkForMore() {
      return PostListModel.more;
    }
    //====================================================
    //  View state
    //====================================================
    function onBeforeEnter() {
      if (U.isForwardView('main.postDetail') || U.isBackView('main.postDetail')) {
        // For sibling views do not req more from server. other logic here;
      } else {
        U.reset(PostListModel);
        return getPosts();
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
      PostListModel.posts = postsWrapper.posts;
      PostListModel.more = postsWrapper.more;
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
        PostListModel.posts.unshift(post);
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
        PostListModel.posts.push(post);
      });
      PostListModel.more = postsWrapper.more;
      U.resize();
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    function getOlderPostsError(err) {
      console.log(err);
      $scope.$broadcast('scroll.infiniteScrollComplete');
      PostListModel.more = false;
      return Message.alert();
    }



    //====================================================
    //  Modal
    //====================================================
    $ionicModal.fromTemplateUrl('state/modal/writeModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      PostList.writeModal = modal;
    });

  } //end
})();
