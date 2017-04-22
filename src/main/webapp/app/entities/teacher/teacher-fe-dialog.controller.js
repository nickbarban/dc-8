(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('TeacherFeDialogController', TeacherFeDialogController);

    TeacherFeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Teacher', 'User', 'Person'];

    function TeacherFeDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Teacher, User, Person) {
        var vm = this;

        vm.teacher = entity;
        vm.clear = clear;
        vm.save = save;
        vm.users = User.query();
        vm.people = Person.query({filter: 'teacher-is-null'});
        $q.all([vm.teacher.$promise, vm.people.$promise]).then(function() {
            if (!vm.teacher.personId) {
                return $q.reject();
            }
            return Person.get({id : vm.teacher.personId}).$promise;
        }).then(function(person) {
            vm.people.push(person);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.teacher.id !== null) {
                Teacher.update(vm.teacher, onSaveSuccess, onSaveError);
            } else {
                Teacher.save(vm.teacher, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('dancekvartalApp:teacherUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
