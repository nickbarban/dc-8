'use strict';

describe('Controller Tests', function() {

    describe('Lesson Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockLesson, MockTeacher, MockStudent;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockLesson = jasmine.createSpy('MockLesson');
            MockTeacher = jasmine.createSpy('MockTeacher');
            MockStudent = jasmine.createSpy('MockStudent');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Lesson': MockLesson,
                'Teacher': MockTeacher,
                'Student': MockStudent
            };
            createController = function() {
                $injector.get('$controller')("LessonFeDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dancekvartalApp:lessonUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
