(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('PayFeDetailController', PayFeDetailController);

    PayFeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Pay', 'Person'];

    function PayFeDetailController($scope, $rootScope, $stateParams, previousState, entity, Pay, Person) {
        var vm = this;

        vm.pay = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dancekvartalApp:payUpdate', function(event, result) {
            vm.pay = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
