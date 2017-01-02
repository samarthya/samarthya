/**
 * Created by saurabhs on 02/01/17.
 */

angular.module('ancillary').component('welcomeMessage', {
    templateUrl: 'app/components/welcome/welcome.html',

    controller: ['$log', function myWelcomeMessage($log) {
        $log.log('Welcome called');
        this.message = 'my dear';
    }]
});