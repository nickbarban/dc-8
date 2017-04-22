(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('parent-fe', {
            parent: 'entity',
            url: '/parent-fe',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dancekvartalApp.parent.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/parent/parentsFE.html',
                    controller: 'ParentFeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('parent');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('parent-fe-detail', {
            parent: 'parent-fe',
            url: '/parent-fe/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dancekvartalApp.parent.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/parent/parent-fe-detail.html',
                    controller: 'ParentFeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('parent');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Parent', function($stateParams, Parent) {
                    return Parent.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'parent-fe',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('parent-fe-detail.edit', {
            parent: 'parent-fe-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/parent/parent-fe-dialog.html',
                    controller: 'ParentFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Parent', function(Parent) {
                            return Parent.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('parent-fe.new', {
            parent: 'parent-fe',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/parent/parent-fe-dialog.html',
                    controller: 'ParentFeDialogController',
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
                    $state.go('parent-fe', null, { reload: 'parent-fe' });
                }, function() {
                    $state.go('parent-fe');
                });
            }]
        })
        .state('parent-fe.edit', {
            parent: 'parent-fe',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/parent/parent-fe-dialog.html',
                    controller: 'ParentFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Parent', function(Parent) {
                            return Parent.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('parent-fe', null, { reload: 'parent-fe' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('parent-fe.delete', {
            parent: 'parent-fe',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/parent/parent-fe-delete-dialog.html',
                    controller: 'ParentFeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Parent', function(Parent) {
                            return Parent.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('parent-fe', null, { reload: 'parent-fe' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
