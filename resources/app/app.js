/**
 * @name APP.JS
 * @overview This is the main file for the entry point for the Angular
 * application.
 */

/**
 * The first module of the application.
 * @type {*|angular.Module}
 */
var app = angular.module('personalApp',['ancillary', 'ngRoute']);


/**
 * @description The main controller for the module:personalApp. It populates the initial comments
 * that have been prepoulated.
 */
app.controller('mainController', ['$scope', 'commentsSrvc', function($scope, commentsSrvc){
    $scope.welcomeMessage = "This application will use Angular";
}]);

app.config(function($routeProvider){
    $routeProvider.when('/', {
            controller: 'mainController',
            templateUrl: 'app/views/welcome.html'
    }).when('/about', {    
        controller: 'aboutController',
        templateUrl: 'app/views/about.html'
    }).when('/contactus', {    
        templateUrl: 'app/views/contactus.html'
    }).
    otherwise ({
        redirectTo: '/'
    });
});