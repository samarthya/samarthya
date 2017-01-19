/**
 * @description The main controller for the module:personalApp. It populates the initial comments
 * that have been prepoulated.
 */
angular.module('personalApp').controller('mainController', ['$scope', 'commentsSrvc', 
    function ($scope, commentsSrvc) {
        $scope.welcomeMessage = "This application will use Angular";
    }
]);