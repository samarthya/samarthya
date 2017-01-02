/**
 * Created by saurabhs on 30/12/16.
 */

'use strict';

describe("mainController", function(){

    var $httpBackend, $controller, dbRequestHandler, $rootScope, createController;
    var scope = {};

    beforeEach(module('ancillary'));
    beforeEach(module('personalApp'));



    beforeEach(inject(function($injector){

        // Get hold of a scope (i.e. the root scope)
        $rootScope = $injector.get('$rootScope');

        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');

        createController = function() {
            return $controller('mainController', {'$scope' : scope });
        };

    }));



    it('Check string', inject(function($controller) {
        var ctrl = createController();
        console.log(scope.welcomeMessage);
    }));


});