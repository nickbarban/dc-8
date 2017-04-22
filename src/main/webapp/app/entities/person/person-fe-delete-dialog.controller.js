(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('PersonFeDeleteController',PersonFeDeleteController);

    PersonFeDeleteController.$inject = ['$uibModalInstance', 'entity', 'Person'];

    function PersonFeDeleteController($uibModalInstance, entity, Person) {
        var vm = this;

        vm.person = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Person.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
