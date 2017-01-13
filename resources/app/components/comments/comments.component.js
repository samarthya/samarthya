/**
 * Created by saurabhs on 02/01/17.
 */

/**
 * Ancillary module that would contain some functions.
 * @type {*|angular.Module}
 */
var ancillary = angular.module('ancillary', []);

/**
 * @returns {$q} Returns a promise that makes a call to the MongoDB server in the back
 * returning all the feedback that has been recieved in the page.
 */
ancillary.factory('commentsSrvc', ['$log', '$http', '$q', function ($log, $http, $q) {

    return $q(function (resolve, reject) {
        $http({
            method: 'GET',
            url: '/comments'
        }).then(function successCallback(response, status, header, config) {
            $log.log(status + ':' + response);
            resolve(response);
        }, function errorCallback(response) {
            $log.log('error');
            reject(' Failed');
        });
    });

}]);



ancillary.component('commentsForm', { 
    templateUrl:'app/components/comments/comments.input.form.html'
});

ancillary.component('allComments', {
    /**
     * Template for the comments.
     */
    templateUrl: 'app/components/comments/comments.html',

    /**
     * Controller for the Comments.
     */
    controller: ['$log', '$q', 'commentsSrvc',
        function commentsController($log, $q, commentsSrvc ) {

            var self = this;

            /**
             * Method to make mongoDB call to fetch the comments via Service.
             * @private
             */
            this._getComments = function () {
                if (commentsSrvc != undefined) {
                    $log.log(' I got comments');
                    commentsSrvc.then(function success (commentsFromDB) {
                            self.objComments = commentsFromDB.data;
                            $log.log(commentsFromDB.status + '::' + commentsFromDB.data);
                        },
                        function failure (reason) {
                            $log.log(' Fetch comments - Failed!');
                        });
                } else {
                    $log.log(' Cannot load - the service');
                }
            };

            /**
             * Comments variable.
             */
            this.objComments = this._getComments();

            this.$onInit = function () {
                $log.log('On init called');
            }
        }]

});

ancillary.run(function ($log) {
    $log.info(' Inside run');
});