/**
 * @name APP.JS
 * @overview This is the main file for the entry point for the Angular
 * application.
 */

/**
 * The first module of the application.
 * @type {*|angular.Module}
 */
var app = angular.module("personalApp",[]);

/**
 * @returns {$q} Returns a promise that makes a call to the MongoDB server in the back
 * returning all the feedback that has been recieved in the page.
 */
app.factory('commentsSrvc', ['$log', '$http', '$q', function($log, $http, $q){
        return $q(function(resolve, reject){
            $http({
                method: 'GET',
                url: '/comments'
            }).then(function successCallback(response) {
                $log.log(response);
                resolve(response.data);
            }, function errorCallback(response) {
                $log.log('error');
                reject(' Failed');
            });
        });

    }]);

/**
 * @description The main controller for the module:personalApp. It populates the initial comments
 * that have been prepoulated.
 */
app.controller('mainController', ['$scope', 'commentsSrvc', function($scope, commentsSrvc){
    $scope.welcomeMessage = "This application will use Angular";


    $scope._getComments = function () {
        console.log(' I got comments');
        commentsSrvc.then(function (commentsFromDB) {
            $scope.comments = commentsFromDB;
        }, function (reason) {
            console.log(' It failed');
        });
    };

    $scope.comments = $scope._getComments();
}]);
