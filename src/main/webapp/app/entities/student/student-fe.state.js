(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('student-fe', {
            parent: 'entity',
            url: '/student-fe',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dancekvartalApp.student.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/student/studentsFE.html',
                    controller: 'StudentFeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('student');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('student-fe-detail', {
            parent: 'student-fe',
            url: '/student-fe/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dancekvartalApp.student.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/student/student-fe-detail.html',
                    controller: 'StudentFeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('student');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Student', function($stateParams, Student) {
                    return Student.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'student-fe',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('student-fe-detail.edit', {
            parent: 'student-fe-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/student/student-fe-dialog.html',
                    controller: 'StudentFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Student', function(Student) {
                            return Student.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('student-fe.new', {
            parent: 'student-fe',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/student/student-fe-dialog.html',
                    controller: 'StudentFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                active: false,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('student-fe', null, { reload: 'student-fe' });
                }, function() {
                    $state.go('student-fe');
                });
            }]
        })
        .state('student-fe.edit', {
            parent: 'student-fe',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/student/student-fe-dialog.html',
                    controller: 'StudentFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Student', function(Student) {
                            return Student.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('student-fe', null, { reload: 'student-fe' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('student-fe.delete', {
            parent: 'student-fe',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/student/student-fe-delete-dialog.html',
                    controller: 'StudentFeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Student', function(Student) {
                            return Student.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('student-fe', null, { reload: 'student-fe' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
