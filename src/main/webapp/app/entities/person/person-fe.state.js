(function() {
    'use strict';

    angular
        .module('dancekvartalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('person-fe', {
            parent: 'entity',
            url: '/person-fe',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dancekvartalApp.person.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/person/peopleFE.html',
                    controller: 'PersonFeController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('person');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('person-fe-detail', {
            parent: 'person-fe',
            url: '/person-fe/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'dancekvartalApp.person.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/person/person-fe-detail.html',
                    controller: 'PersonFeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('person');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Person', function($stateParams, Person) {
                    return Person.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'person-fe',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('person-fe-detail.edit', {
            parent: 'person-fe-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/person/person-fe-dialog.html',
                    controller: 'PersonFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Person', function(Person) {
                            return Person.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('person-fe.new', {
            parent: 'person-fe',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/person/person-fe-dialog.html',
                    controller: 'PersonFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                firstname: null,
                                lastname: null,
                                birthday: null,
                                address: null,
                                phone1: null,
                                phone2: null,
                                email: null,
                                photoUrl: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('person-fe', null, { reload: 'person-fe' });
                }, function() {
                    $state.go('person-fe');
                });
            }]
        })
        .state('person-fe.edit', {
            parent: 'person-fe',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/person/person-fe-dialog.html',
                    controller: 'PersonFeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Person', function(Person) {
                            return Person.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('person-fe', null, { reload: 'person-fe' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('person-fe.delete', {
            parent: 'person-fe',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/person/person-fe-delete-dialog.html',
                    controller: 'PersonFeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Person', function(Person) {
                            return Person.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('person-fe', null, { reload: 'person-fe' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
