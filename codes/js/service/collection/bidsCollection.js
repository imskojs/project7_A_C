(function() {
  'use strict';

  angular.module('app')
    .factory('Bids', Bids);

  Bids.$inject = ['$resource', 'governorUrl'];

  function Bids($resource, governorUrl) {

    var bidUrl = governorUrl + '/bid';

    var params = {
      list: '@list'
    };

    var actions = {
      getBids: {
        method: 'GET',
        params: {
          list: 'list'
        }
      },
      findById: {
        method: 'GET'
      }
    };

    var service = $resource(bidUrl, params, actions);

    return service;
  }

})();
