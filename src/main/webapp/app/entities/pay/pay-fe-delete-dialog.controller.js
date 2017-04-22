(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('PayFeDeleteController',PayFeDeleteController);

    PayFeDeleteController.$inject = ['$uibModalInstance', 'entity', 'Pay'];

    function PayFeDeleteController($uibModalInstance, entity, Pay) {
        var vm = this;

        vm.pay = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Pay.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
