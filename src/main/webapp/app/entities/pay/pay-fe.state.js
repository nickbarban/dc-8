(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('pay-fe', {
            parent: 'entity',
            url: '/pay-fe',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dancekvartalApp.pay.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pay/paysFE.html',
                    controller: 'PayFeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('pay');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('pay-fe-detail', {
            parent: 'pay-fe',
            url: '/pay-fe/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dancekvartalApp.pay.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/pay/pay-fe-detail.html',
                    controller: 'PayFeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('pay');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Pay', function($stateParams, Pay) {
                    return Pay.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'pay-fe',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('pay-fe-detail.edit', {
            parent: 'pay-fe-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pay/pay-fe-dialog.html',
                    controller: 'PayFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Pay', function(Pay) {
                            return Pay.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pay-fe.new', {
            parent: 'pay-fe',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pay/pay-fe-dialog.html',
                    controller: 'PayFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                date: null,
                                sum: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('pay-fe', null, { reload: 'pay-fe' });
                }, function() {
                    $state.go('pay-fe');
                });
            }]
        })
        .state('pay-fe.edit', {
            parent: 'pay-fe',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pay/pay-fe-dialog.html',
                    controller: 'PayFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Pay', function(Pay) {
                            return Pay.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('pay-fe', null, { reload: 'pay-fe' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('pay-fe.delete', {
            parent: 'pay-fe',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/pay/pay-fe-delete-dialog.html',
                    controller: 'PayFeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Pay', function(Pay) {
                            return Pay.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('pay-fe', null, { reload: 'pay-fe' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
