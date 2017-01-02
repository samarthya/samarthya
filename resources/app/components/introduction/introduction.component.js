/**
 * Created by saurabhs on 02/01/17.
 */

angular.module('ancillary').component('introductionMessage', {
    templateUrl: 'app/components/introduction/introduction.html',

    controller: ['$log', function introductionMessage($log) {
        this.title = 'Welcome';
        this.$onInit = function () {
            $log.log('ON-INIT: IntroductionMessage')
        }
    }]


}).run(function($log){
    $log.info('Initialized Introduction blog');
});