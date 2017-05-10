(function() {
    'use strict';
    angular
        .module('dancekvartalApp')
        .factory('Parent', Parent);

    Parent.$inject = ['$resource', 'DateUtils'];

    function Parent ($resource, DateUtils) {
        var resourceUrl =  'api/parents/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.person.birthday = DateUtils.convertLocalDateFromServer(data.person.birthday);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
