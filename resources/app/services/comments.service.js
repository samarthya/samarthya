/**
 * @factory Comments Service
 * Fetches comments from the Backend mongo database.
 */

/**
 * @returns {$q} Returns a promise that makes a call to the MongoDB server in the back
 * returning all the feedback that has been recieved in the page.
 */
angular.module('ancillary').factory('commentsSrvc', ['$log', '$http', '$q', function ($log, $http, $q) {

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