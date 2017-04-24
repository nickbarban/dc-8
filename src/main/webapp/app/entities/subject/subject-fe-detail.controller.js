(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('SubjectFeDetailController', SubjectFeDetailController);

    SubjectFeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Subject', 'Teacher', 'Student'];

    function SubjectFeDetailController($scope, $rootScope, $stateParams, previousState, entity, Subject, Teacher, Student) {
        var vm = this;

        vm.subject = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dancekvartalApp:subjectUpdate', function(event, result) {
            vm.subject = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
