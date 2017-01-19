
/**
 * @config
 */
angular.module('personalApp').config(function($routeProvider){
    $routeProvider.when('/', {
            controller: 'mainController',
            templateUrl: 'app/views/welcome.html'
    }).when('/about', {    
        controller: 'aboutController',
        templateUrl: 'app/views/about.html'
    }).when('/contactus', {    
        templateUrl: 'app/views/contactus.html'
    }).
    otherwise ({
        redirectTo: '/'
    });
});