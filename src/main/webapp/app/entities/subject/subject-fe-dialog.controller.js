(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('SubjectFeDialogController', SubjectFeDialogController);

    SubjectFeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Subject'];

    function SubjectFeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Subject) {
        var vm = this;

        vm.subject = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.subject.id !== null) {
                Subject.update(vm.subject, onSaveSuccess, onSaveError);
            } else {
                Subject.save(vm.subject, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dancekvartalApp:subjectUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
