(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('teacher-fe', {
            parent: 'entity',
            url: '/teacher-fe',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dancekvartalApp.teacher.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/teacher/teachersFE.html',
                    controller: 'TeacherFeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('teacher');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('teacher-fe-detail', {
            parent: 'teacher-fe',
            url: '/teacher-fe/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dancekvartalApp.teacher.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/teacher/teacher-fe-detail.html',
                    controller: 'TeacherFeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('teacher');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Teacher', function($stateParams, Teacher) {
                    return Teacher.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'teacher-fe',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('teacher-fe-detail.edit', {
            parent: 'teacher-fe-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/teacher/teacher-fe-dialog.html',
                    controller: 'TeacherFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Teacher', function(Teacher) {
                            return Teacher.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('teacher-fe.new', {
            parent: 'teacher-fe',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/teacher/teacher-fe-dialog.html',
                    controller: 'TeacherFeDialogController',
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
                    $state.go('teacher-fe', null, { reload: 'teacher-fe' });
                }, function() {
                    $state.go('teacher-fe');
                });
            }]
        })
        .state('teacher-fe.edit', {
            parent: 'teacher-fe',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/teacher/teacher-fe-dialog.html',
                    controller: 'TeacherFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Teacher', function(Teacher) {
                            return Teacher.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('teacher-fe', null, { reload: 'teacher-fe' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('teacher-fe.delete', {
            parent: 'teacher-fe',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/teacher/teacher-fe-delete-dialog.html',
                    controller: 'TeacherFeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Teacher', function(Teacher) {
                            return Teacher.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('teacher-fe', null, { reload: 'teacher-fe' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
