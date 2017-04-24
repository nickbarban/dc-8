(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('TeacherFeDetailController', TeacherFeDetailController);

    TeacherFeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Teacher', 'User', 'Person', 'Subject', 'Lesson'];

    function TeacherFeDetailController($scope, $rootScope, $stateParams, previousState, entity, Teacher, User, Person, Subject, Lesson) {
        var vm = this;

        vm.teacher = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dancekvartalApp:teacherUpdate', function(event, result) {
            vm.teacher = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
