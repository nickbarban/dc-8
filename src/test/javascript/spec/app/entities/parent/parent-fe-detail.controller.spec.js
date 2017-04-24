'use strict';

describe('Controller Tests', function() {

    describe('Parent Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockParent, MockUser, MockPerson, MockStudent;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockParent = jasmine.createSpy('MockParent');
            MockUser = jasmine.createSpy('MockUser');
            MockPerson = jasmine.createSpy('MockPerson');
            MockStudent = jasmine.createSpy('MockStudent');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Parent': MockParent,
                'User': MockUser,
                'Person': MockPerson,
                'Student': MockStudent
            };
            createController = function() {
                $injector.get('$controller')("ParentFeDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'dancekvartalApp:parentUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
