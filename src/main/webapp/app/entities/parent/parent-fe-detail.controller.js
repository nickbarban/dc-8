(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('ParentFeDetailController', ParentFeDetailController);

    ParentFeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Parent', 'User', 'Person'];

    function ParentFeDetailController($scope, $rootScope, $stateParams, previousState, entity, Parent, User, Person) {
        var vm = this;

        vm.parent = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dancekvartalApp:parentUpdate', function(event, result) {
            vm.parent = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
