/**
 * Created by saurabhs on 30/12/16.
 */

'use strict';

describe("mainController", function(){

    var $httpBackend, $controller, dbRequestHandler, $rootScope, createController;
    var scope = {};

    beforeEach(module('personalApp'));
    var commentsResponse = [{
        "comments": "Test",
        "sbj": "test",
        "name": "Saurabh",
        "email": "saurabh777@gmail.com",
        "_id": "58654b12d7c60e1daa68287d"
    }];

    beforeEach(inject(function($injector){
        $httpBackend = $injector.get('$httpBackend');
        dbRequestHandler = $httpBackend.when('GET', '/comments').respond(200, commentsResponse);

        // Get hold of a scope (i.e. the root scope)
        $rootScope = $injector.get('$rootScope');

        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');

        createController = function() {
            return $controller('mainController', {'$scope' : scope });
        };

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Check string', inject(function($controller) {
        var ctrl = createController();
        console.log(scope.welcomeMessage);
        $httpBackend.flush();
        expect(scope.welcomeMessage).toBe('This application will use Angular');
    }));

    it('Check comments', inject(function($controller){
        $httpBackend.expectGET('/comments');
        var ctrl = $controller('mainController',{$scope:scope});
        $httpBackend.flush();
        expect(scope.comments).not.toBe(null);
        expect(scope.comments[0].comments).toBe('Test');
        expect(scope.comments[0].email).toBe('saurabh777@gmail.com');
    }));
});