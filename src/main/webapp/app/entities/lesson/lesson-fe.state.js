(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('lesson-fe', {
            parent: 'entity',
            url: '/lesson-fe',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dancekvartalApp.lesson.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/lesson/lessonsFE.html',
                    controller: 'LessonFeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('lesson');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('lesson-fe-detail', {
            parent: 'lesson-fe',
            url: '/lesson-fe/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dancekvartalApp.lesson.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/lesson/lesson-fe-detail.html',
                    controller: 'LessonFeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('lesson');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Lesson', function($stateParams, Lesson) {
                    return Lesson.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'lesson-fe',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('lesson-fe-detail.edit', {
            parent: 'lesson-fe-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lesson/lesson-fe-dialog.html',
                    controller: 'LessonFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Lesson', function(Lesson) {
                            return Lesson.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('lesson-fe.new', {
            parent: 'lesson-fe',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lesson/lesson-fe-dialog.html',
                    controller: 'LessonFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                startLesson: null,
                                endLesson: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('lesson-fe', null, { reload: 'lesson-fe' });
                }, function() {
                    $state.go('lesson-fe');
                });
            }]
        })
        .state('lesson-fe.edit', {
            parent: 'lesson-fe',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lesson/lesson-fe-dialog.html',
                    controller: 'LessonFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Lesson', function(Lesson) {
                            return Lesson.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('lesson-fe', null, { reload: 'lesson-fe' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('lesson-fe.delete', {
            parent: 'lesson-fe',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/lesson/lesson-fe-delete-dialog.html',
                    controller: 'LessonFeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Lesson', function(Lesson) {
                            return Lesson.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('lesson-fe', null, { reload: 'lesson-fe' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
