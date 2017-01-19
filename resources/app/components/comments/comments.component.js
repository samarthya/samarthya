/**
 * Created by saurabhs on 02/01/17.
 */

/**
 * Ancillary module that would contain some functions.
 * @type {*|angular.Module}
 */
var ancillary = angular.module('ancillary', []);

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