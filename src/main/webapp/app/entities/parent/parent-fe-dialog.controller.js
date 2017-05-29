(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('ParentFeDialogController', ParentFeDialogController);

    ParentFeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Parent', 'User', 'Person', 'Student'];

    function ParentFeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Parent, User, Person, Student) {
        var vm = this;

        vm.parent = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.users = User.query();
        vm.people = Person.query({filter: 'parent-is-null'});
        $q.all([vm.parent.$promise, vm.people.$promise]).then(function() {
            if (!vm.parent.personId) {
                return $q.reject();
            }
            return Person.get({id : vm.parent.personId}).$promise;
        }).then(function(person) {
            vm.people.push(person);
        });
        vm.students = Student.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.parent.id !== null) {
                Parent.update(vm.parent, onSaveSuccess, onSaveError);
            } else {
                Parent.save(vm.parent, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dancekvartalApp:parentUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.birthday = false;

        function openCalendar(date) {
            vm.datePickerOpenStatus[date] = true;
        }


    }
})();
