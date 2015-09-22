(function () {
    'use strict';

    angular
        .module('openeApp', [
            'ngSanitize',
            'ngMaterial',
            'material.wizard',
            'ui.router',
            'ngResource',
            'ngPDFViewer',
            'swfobject',
            'isteven-multi-select',
            'openeApp.translations',
            'openeApp.cases',
            'openeApp.cases.members',
            'openeApp.cases.parties',
            'openeApp.classification',
            'openeApp.dashboard',
            'openeApp.files',
            'openeApp.tasks',
            'openeApp.documents',
            'openeApp.notes',
            'openeApp.contacts',
            'openeApp.administration',
            'openeApp.office',
            'openeApp.groups',
            'openeApp.users',
            'openeApp.workflows',
            'openeApp.search',
            'openeApp.search.component.filter'
        ])
        .constant('USER_ROLES', {
            admin: 'admin',
            user: 'user',
            guest: 'guest'
        })
        .constant('ALFRESCO_URI', {
            apiProxy: '/alfresco/api/',
            serviceApiProxy: '/alfresco/service/api/',
            serviceSlingshotProxy: '/alfresco/service/slingshot/'
        })
        .config(config)
        .run(function ($rootScope, $state, $stateParams, authService) {
            $rootScope.$on('$stateChangeStart', function (event, next, params) {
                $rootScope.toState = next;
                $rootScope.toStateParams = params;
                if (next.data.authorizedRoles.length == 0) {
                    return;
                }
                if (authService.isAuthenticated()) {

                } else {
                    event.preventDefault();
                    $rootScope.returnToState = $rootScope.toState;
                    $rootScope.returnToStateParams = $rootScope.toStateParams;
                    $state.go('login');
                }
            });
        });

    config.$inject = ['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', 'USER_ROLES', '$mdIconProvider'];

    function config($mdThemingProvider, $stateProvider, $urlRouterProvider, USER_ROLES, $mdIconProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue', {
                'default': '600',
                'hue-1': '400',
                'hue-2': '800',
                'hue-3': '900'
            })
            .accentPalette('amber')
            .warnPalette('deep-orange');

        $mdIconProvider.icon('md-calendar', '/app/assets/img/icons/today.svg');

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('site', {
            abstract: true,
            resolve: {
                authorize: ['authService', function (authService) {
                }]
            }
        }).state('dashboard', {
            parent: 'site',
            url: '/',
            views: {
                'content@': {
                    templateUrl: '/app/src/dashboard/view/dashboard.html',
                    controller: 'DashboardController'
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.user]
            }
        }).state('cases', {
            parent: 'site',
            url: '/cases',
            views: {
                'content@': {
                    templateUrl: '/app/src/cases/view/cases.html',
                    controller: 'CaseController',
                    controllerAs: 'vm'
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.user]
            }
        }).state('caseinfo', {
            parent: 'site',
            url: '/cases/case/:caseId',
            views: {
                'content@': {
                    templateUrl: '/app/src/cases/view/case.html',
                    controller: 'CaseInfoController',
                    controllerAs: 'vm'
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.user]
            }
        }).state('docDetails', {
            parent: 'site',
            url: '/cases/case/:caseId/doc/:storeType/:storeId/:id',
            views: {
                'content@': {
                    controller: 'DocumentDetailsController',
                    templateUrl: 'app/src/documents/view/document.html',
                    controllerAs: 'docCtrl'
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.user]
            }
        }).state('login', {
            parent: 'site',
            url: '/login',
            views: {
                'content@': {
                    templateUrl: '/app/src/authentication/view/login.html',
                    controller: 'AuthController',
                    controllerAs: 'vm'
                }
            },
            data: {
                authorizedRoles: []
            }
        }).state('tasks', {
            parent: 'site',
            url: '/tasks',
            views: {
                'content@': {
                    templateUrl: '/app/src/tasks/view/tasks.html',
                    controller: 'tasksOverviewController',
                    controllerAs: 'tasksCtrl'
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.user]
            }
        }).state('administration', {
            parent: 'site',
            url: '/admin',
            views: {
                'content@': {
                    templateUrl: '/app/src/admin/view/admin.html',
                    controller: 'AdminController',
                    controllerAs: 'vm'
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.user],
                searchContext: 'USERS',
                selectedTab: 0
            }
        }).state('administration.groups', {
            parent: 'site',
            url: '/admin/groups/{shortName}',
            views: {
                'content@': {
                    templateUrl: '/app/src/admin/view/admin.html',
                    controller: 'AdminController',
                    controllerAs: 'vm'
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.user],
                searchContext: 'GROUPS',
                selectedTab: 1
            }
        }).state('administration.organizations', {
            parent: 'site',
            url: '/admin/organizations',
            views: {
                'content@': {
                    templateUrl: '/app/src/admin/view/admin.html',
                    controller: 'AdminController',
                    controllerAs: 'vm'
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.user],
                searchContext: 'CONTACT_ORGANISATIONS',
                selectedTab: 2
            }
        }).state('administration.contacts', {
            parent: 'site',
            url: '/admin/contacts',
            views: {
                'content@': {
                    templateUrl: '/app/src/admin/view/admin.html',
                    controller: 'AdminController',
                    controllerAs: 'vm'
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.user],
                searchContext: 'CONTACT_USERS',
                selectedTab: 3
            }
        }).state('administration.organizations.organization', {
            parent: 'site',
            url: '/admin/organizations/:storeProtocol/:storeIdentifier/:uuid',
            views: {
                'content@': {
                    templateUrl: '/app/src/contacts/view/organization.html',
                    controller: 'OrganizationController',
                    controllerAs: 'vm'
                }
            },
            data: {
                authorizedRoles: [USER_ROLES.user]
            }
        });
    }

})();
