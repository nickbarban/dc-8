(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('StudentFeDetailController', StudentFeDetailController);

    StudentFeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Student', 'User', 'Person', 'Parent'];

    function StudentFeDetailController($scope, $rootScope, $stateParams, previousState, entity, Student, User, Person, Parent) {
        var vm = this;

        vm.student = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dancekvartalApp:studentUpdate', function(event, result) {
            vm.student = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
