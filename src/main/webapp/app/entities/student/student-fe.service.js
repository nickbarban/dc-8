(function () {
    'use strict';
    angular
        .module('dancekvartalApp')
        .factory('Student', Student);

    Student.$inject = ['$resource', 'DateUtils'];

    function Student($resource, DateUtils) {
        var resourceUrl = 'api/students/:id';

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
