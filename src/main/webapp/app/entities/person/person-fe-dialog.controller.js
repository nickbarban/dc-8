(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('PersonFeDialogController', PersonFeDialogController);

    PersonFeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Person'];

    function PersonFeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Person) {
        var vm = this;

        vm.person = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.person.id !== null) {
                Person.update(vm.person, onSaveSuccess, onSaveError);
            } else {
                Person.save(vm.person, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dancekvartalApp:personUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.birthday = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
