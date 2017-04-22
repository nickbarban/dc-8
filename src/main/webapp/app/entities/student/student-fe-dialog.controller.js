(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('StudentFeDialogController', StudentFeDialogController);

    StudentFeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Student', 'User', 'Person', 'Parent'];

    function StudentFeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Student, User, Person, Parent) {
        var vm = this;

        vm.student = entity;
        vm.clear = clear;
        vm.save = save;
        vm.users = User.query();
        vm.people = Person.query({filter: 'student-is-null'});
        $q.all([vm.student.$promise, vm.people.$promise]).then(function() {
            if (!vm.student.personId) {
                return $q.reject();
            }
            return Person.get({id : vm.student.personId}).$promise;
        }).then(function(person) {
            vm.people.push(person);
        });
        vm.parents = Parent.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.student.id !== null) {
                Student.update(vm.student, onSaveSuccess, onSaveError);
            } else {
                Student.save(vm.student, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dancekvartalApp:studentUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
