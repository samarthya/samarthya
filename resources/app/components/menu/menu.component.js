
/**
 * Main menu
 */
angular.module('ancillary').component('mainMenu', {
    templateUrl: 'app/components/menu/menu.html',

    controller: ['$log', function introductionMessage($log) {
        $log.log(' Menu Controller');
    }]


}).run(function($log){
    $log.info('Inside Main menu');
});