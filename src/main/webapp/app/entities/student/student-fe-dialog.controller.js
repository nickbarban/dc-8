(function () {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('StudentFeDialogController', StudentFeDialogController);

    StudentFeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity',
        'Student', 'User', 'Person', 'Subject', 'Parent', 'Lesson'];

    function StudentFeDialogController($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Student, User,
                                       Person, Subject, Parent, Lesson) {
        var vm = this;
        vm.student = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.users = User.query();
        vm.people = Person.query({filter: 'student-is-null'});
        $q.all([vm.student.$promise, vm.people.$promise]).then(function () {
            if (!vm.student.person || !vm.student.person.id) {
                return $q.reject();
            }
            return Person.get({id: vm.student.person.id}).$promise;
        }).then(function (person) {
            vm.people.push(person);
        });
        vm.subjects = Subject.query();
        vm.parents = Parent.query();
        vm.lessons = Lesson.query();

        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            vm.isSaving = true;
            if (vm.student.id !== null) {
                Student.update(vm.student, onSaveSuccess, onSaveError);
            } else {
                Student.save(vm.student, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess(result) {
            console.log("Result: " + result);
            $scope.$emit('dancekvartalApp:studentUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError() {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.birthday = false;

        function openCalendar(date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
