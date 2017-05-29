(function () {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('LessonFeDialogController', LessonFeDialogController);

    LessonFeDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Lesson', 'Teacher', 'Student', 'Subject'];

    function LessonFeDialogController($timeout, $scope, $stateParams, $uibModalInstance, entity, Lesson, Teacher, Student, Subject) {
        var vm = this;

        vm.lesson = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.teachers = Teacher.query();
        vm.subjects = Subject.query();
        vm.students = Student.query();

        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            vm.isSaving = true;
            if (vm.lesson.id !== null) {
                Lesson.update(vm.lesson, onSaveSuccess, onSaveError);
            } else {
                Lesson.save(vm.lesson, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess(result) {
            $scope.$emit('dancekvartalApp:lessonUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError() {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.startLesson = false;
        vm.datePickerOpenStatus.endLesson = false;

        function openCalendar(date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
