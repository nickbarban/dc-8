(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .controller('LessonFeDetailController', LessonFeDetailController);

    LessonFeDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Lesson'];

    function LessonFeDetailController($scope, $rootScope, $stateParams, previousState, entity, Lesson) {
        var vm = this;

        vm.lesson = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('dancekvartalApp:lessonUpdate', function(event, result) {
            vm.lesson = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
