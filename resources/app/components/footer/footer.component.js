/**
 * Footer menu.
 */
angular.module('ancillary').component('footerMain', {
    templateUrl: 'app/components/footer/footer.html',

    controller: ['$log', function introductionMessage($log) {
        $log.log(' Footer controller');
    }]


}).run(function($log){
    $log.info('Inside footer.');
});