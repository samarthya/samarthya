/**
 * Created by saurabhs on 02/01/17.
 */
'use strict';

describe("allComments", function(){

    var $httpBackend, dbRequestHandler;

    var scope = {};

    beforeEach(module('ancillary'));
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

    }));


    afterEach(function() {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
    });


    it('Check comments', inject(function($componentController){
        $httpBackend.expectGET('/comments');

        var ctrl = $componentController('allComments', {'$scope': scope});

        $httpBackend.flush();

        expect(ctrl.objComments).not.toBe(null);
        expect(ctrl.objComments[0].name).toBe('Saurabh');
    }));

});