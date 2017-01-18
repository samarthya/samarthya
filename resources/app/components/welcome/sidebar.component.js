/**
 * @component sidebar
 */
angular.module('ancillary').component('sideBar', {
    templateUrl: 'app/components/welcome/sidebar.html',

    controller: ['$log', function sideBarInit($log) {
        $log.log('Sidebar called');
    }]
});