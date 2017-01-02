/**
 * @name APP.JS
 * @overview This is the main file for the entry point for the Angular
 * application.
 */

/**
 * The first module of the application.
 * @type {*|angular.Module}
 */
var app = angular.module('personalApp',['ancillary']);


/**
 * @description The main controller for the module:personalApp. It populates the initial comments
 * that have been prepoulated.
 */
app.controller('mainController', ['$scope', 'commentsSrvc', function($scope, commentsSrvc){
    $scope.welcomeMessage = "This application will use Angular";
}]);
