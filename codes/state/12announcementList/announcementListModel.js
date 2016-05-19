(function() {
  'use strict';

  angular.module('app')
    .factory('AnnouncementListModel', AnnouncementListModel);

  AnnouncementListModel.$inject = [];

  function AnnouncementListModel() {

    var model = {
      posts: [{
        photos: [{
          url: 'http://placehold.it/600x400'
        }],
        title: 'J.Holt 앱출시',
        content: 'J.Holt는 투자회사로 뉴질랜드 오클랜드에 취히하고 있다. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla quod, culpa totam. Veritatis dicta error necessitatibus accusantium repudiandae accusamus sint nulla tempora suscipit eligendi sit sunt, totam voluptatibus natus explicabo.'
      }, {
        photos: [{
          url: 'http://placehold.it/600x400'
        }],
        title: 'J.Holt 앱출시',
        content: 'J.Holt는 투자회사로 뉴질랜드 오클랜드에 취히하고 있다. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla quod, culpa totam. Veritatis dicta error necessitatibus accusantium repudiandae accusamus sint nulla tempora suscipit eligendi sit sunt, totam voluptatibus natus explicabo.'

      }],
      more: false
    };
    return model;
  }
})();
