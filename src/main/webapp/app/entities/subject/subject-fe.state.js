(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('subject-fe', {
            parent: 'entity',
            url: '/subject-fe',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dancekvartalApp.subject.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/subject/subjectsFE.html',
                    controller: 'SubjectFeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('subject');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('subject-fe-detail', {
            parent: 'subject-fe',
            url: '/subject-fe/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dancekvartalApp.subject.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/subject/subject-fe-detail.html',
                    controller: 'SubjectFeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('subject');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Subject', function($stateParams, Subject) {
                    return Subject.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'subject-fe',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('subject-fe-detail.edit', {
            parent: 'subject-fe-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/subject/subject-fe-dialog.html',
                    controller: 'SubjectFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Subject', function(Subject) {
                            return Subject.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('subject-fe.new', {
            parent: 'subject-fe',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/subject/subject-fe-dialog.html',
                    controller: 'SubjectFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                description: null,
                                active: false,
                                price: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('subject-fe', null, { reload: 'subject-fe' });
                }, function() {
                    $state.go('subject-fe');
                });
            }]
        })
        .state('subject-fe.edit', {
            parent: 'subject-fe',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/subject/subject-fe-dialog.html',
                    controller: 'SubjectFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Subject', function(Subject) {
                            return Subject.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('subject-fe', null, { reload: 'subject-fe' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('subject-fe.delete', {
            parent: 'subject-fe',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/subject/subject-fe-delete-dialog.html',
                    controller: 'SubjectFeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Subject', function(Subject) {
                            return Subject.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('subject-fe', null, { reload: 'subject-fe' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
