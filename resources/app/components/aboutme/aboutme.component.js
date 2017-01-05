/**
 * Created by saurabhs on 02/01/17.
 */

angular.module('ancillary').component('aboutMe', {
    templateUrl: 'app/components/aboutme/aboutme.html',

    controller: ['$log', function myWelcomeMessage($log) {
        $log.log('Welcome called');

    }]
});