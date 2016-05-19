(function() {
  'use strict';
  angular.module('app')
    .controller('AnnouncementDetailController', AnnouncementDetailController);

  AnnouncementDetailController.$inject = ['U', '$scope', 'Posts', 'AnnouncementDetailModel', 'Message', '$stateParams'];

  function AnnouncementDetailController(U, $scope, Posts, AnnouncementDetailModel, Message, $stateParams) {

    var AnnouncementDetail = this;
    AnnouncementDetail.Model = AnnouncementDetailModel;

    // Used to update post on ion-refresh
    AnnouncementDetail.getPost = getPost;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    //====================================================
    //  Implementation
    //====================================================
    function getPost() {
      return Posts.findById({
          id: $stateParams.id,
          populates: 'photos'
        }).$promise
        .then(setView)
        .catch(findByIdError);
    }
    //====================================================
    //  View states
    //====================================================
    function onBeforeEnter() {
      console.log($stateParams.id);
      U.reset(AnnouncementDetailModel);
      return getPost();
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
    function setView(post) {
      console.log(post);
      AnnouncementDetailModel.post = post;
      U.resize();
      return Message.hide();
    }

    function findByIdError(err) {
      console.log(err);
      return Message.alert();
    }

  } //end
})();
