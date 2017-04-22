(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('ParentFeDeleteController',ParentFeDeleteController);

    ParentFeDeleteController.$inject = ['$uibModalInstance', 'entity', 'Parent'];

    function ParentFeDeleteController($uibModalInstance, entity, Parent) {
        var vm = this;

        vm.parent = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Parent.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
