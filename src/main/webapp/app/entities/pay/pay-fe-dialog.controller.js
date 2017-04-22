(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('PayFeDialogController', PayFeDialogController);

    PayFeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Pay', 'Person'];

    function PayFeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Pay, Person) {
        var vm = this;

        vm.pay = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.users = Person.query({filter: 'pay-is-null'});
        $q.all([vm.pay.$promise, vm.users.$promise]).then(function() {
            if (!vm.pay.userId) {
                return $q.reject();
            }
            return Person.get({id : vm.pay.userId}).$promise;
        }).then(function(user) {
            vm.users.push(user);
        });

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
