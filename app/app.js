/* jslint node:true */
'use strict';

angular.module('skillCalcApp', [
    'ngRoute',
    'ngAnimate',
    'skill.controller',
    'app.templates'
])
.config(['$routeProvider', '$provide', '$httpProvider', function($routeProvider, $provide, $httpProvider) {
    // @todo i'd instead like to say /:heroId/:buildhash but not swap ng-view on change
    $routeProvider
        .when('/', {
            templateUrl: 'views/components/skill/edit.tpl',
            controller: 'SkillController as skillCtrl',
            resolve: {
                patchData: ['PatchService', function(PatchService) { return PatchService.loadCurrent() }]
            }
        })
        .otherwise({ redirectTo: '/' });
    }])
    .controller('AppController', ['$rootScope', '$location', function($rootScope, $location) {
        $rootScope.link = function(location) {
            $location.path(location);
        };
    }]);