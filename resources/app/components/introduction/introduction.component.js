/**
 * Created by saurabhs on 02/01/17.
 */

angular.module('ancillary').component('introductionMessage', {
    templateUrl: 'app/components/introduction/introduction.html',

    controller: ['$scope', '$log', 'appSettings', function introductionMessage($scope, $log, appSettings) {
        $scope.appSettings = appSettings;
        
        this.$onInit = function () {
            $log.log('ON-INIT:(introductionMessage): IntroductionMessage')
        }
    }]

}).run(function($log){
    $log.info('Initialized Introduction blog');
});