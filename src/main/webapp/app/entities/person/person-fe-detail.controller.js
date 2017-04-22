(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('PersonFeDetailController', PersonFeDetailController);

    PersonFeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Person'];

    function PersonFeDetailController($scope, $rootScope, $stateParams, previousState, entity, Person) {
        var vm = this;

        vm.person = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dancekvartalApp:personUpdate', function(event, result) {
            vm.person = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
