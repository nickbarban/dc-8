(function () {
    'use strict';
    angular
        .module('dancekvartalApp')
        .factory('Teacher', Teacher);

    Teacher.$inject = ['$resource', 'DateUtils'];

    function Teacher($resource, DateUtils) {
        var resourceUrl = 'api/teachers/:id';

        return $resource(resourceUrl, {}, {
            'query': {method: 'GET', isArray: true},
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
            'update': {method: 'PUT'}
        });
    }
})();
