(function() {
  'use strict';

  angular.module('app')
    .factory('PostListModel', PostListModel);

  PostListModel.$inject = [];

  function PostListModel() {

    var model = {
      posts: [{
        id: 0,
        createdBy: 'HUNGERS',
        content: '메인 페이지 디자인 요청사항 입니다.',
        priority: 'high',
        //association
        reply: {
          createdBy: '홍다혜',
          position: '디자이너'
        }
      }, {
        id: 1,
        createdBy: 'HUNGERS',
        content: '메인 페이지 디자인 요청사항 입니다.',
        priority: 'high',
        //association
        reply: undefined

      }],
      more: false
    };
    return model;
  }
})();
