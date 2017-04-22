(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('StudentFeDeleteController',StudentFeDeleteController);

    StudentFeDeleteController.$inject = ['$uibModalInstance', 'entity', 'Student'];

    function StudentFeDeleteController($uibModalInstance, entity, Student) {
        var vm = this;

        vm.student = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Student.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
