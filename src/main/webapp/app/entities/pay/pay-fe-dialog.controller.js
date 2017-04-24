(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('PayFeDialogController', PayFeDialogController);

    PayFeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Pay', 'Person'];

    function PayFeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Pay, Person) {
        var vm = this;

        vm.pay = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.people = Person.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.pay.id !== null) {
                Pay.update(vm.pay, onSaveSuccess, onSaveError);
            } else {
                Pay.save(vm.pay, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dancekvartalApp:payUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.date = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
