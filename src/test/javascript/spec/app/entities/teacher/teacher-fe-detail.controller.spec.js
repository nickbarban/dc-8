'use strict';

describe('Controller Tests', function() {

    describe('Teacher Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockTeacher, MockUser, MockPerson;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockTeacher = jasmine.createSpy('MockTeacher');
            MockUser = jasmine.createSpy('MockUser');
            MockPerson = jasmine.createSpy('MockPerson');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Teacher': MockTeacher,
                'User': MockUser,
                'Person': MockPerson
            };
            createController = function() {
                $injector.get('$controller')("TeacherFeDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dancekvartalApp:teacherUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
