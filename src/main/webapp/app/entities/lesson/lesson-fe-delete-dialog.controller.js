(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('LessonFeDeleteController',LessonFeDeleteController);

    LessonFeDeleteController.$inject = ['$uibModalInstance', 'entity', 'Lesson'];

    function LessonFeDeleteController($uibModalInstance, entity, Lesson) {
        var vm = this;

        vm.lesson = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Lesson.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
