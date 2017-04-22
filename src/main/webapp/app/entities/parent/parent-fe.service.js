(function() {
    'use strict';
    angular
        .module('dancekvartalApp')
        .factory('Parent', Parent);

    Parent.$inject = ['$resource'];

    function Parent ($resource) {
        var resourceUrl =  'api/parents/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
