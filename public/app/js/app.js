!function() {
    /* global angular */
    /* global escape */
    'use strict'; // jshint ignore:line
    
    /**
    * @class AppController
    * @classdesc Main Controller for doing awesome things
    * @ngInject
    */
    function AppController($scope) {
    }
    
    AppController.$inject = ['$scope'];

    var app = angular.module('JollyApp', [
        'ngRoute',
        'ngResource',
        'jo.animate',
        'jo.header',
        'jo.content',
        'jo.footer',
        'jo.i18n'
    ]);
    
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider
        .when('/', {
            controller: 'AppController',
            templateUrl: 'app/templates/index.html',
            controllerAs: 'vm'
    })
    .when('/404', {
    })
    .otherwise({redirectTo: '/'})
    }])
    .controller('AppController', AppController)
    .run(['$location', function($location) {
    }]);
}();