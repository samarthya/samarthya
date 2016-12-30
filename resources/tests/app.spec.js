/**
 * Created by saurabhs on 30/12/16.
 */

'use strict';

describe("mainController", function(){

    beforeEach(module('personalApp'));

    var $controller;


    it('Check string', inject(function($controller) {
        var scope = {};

        var ctrl = $controller('mainController',{$scope:scope});
        console.log(scope.welcomeMessage);
        expect(scope.welcomeMessage).toBe('This application will use Angular');
    }));
});