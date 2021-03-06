#!/bin/env node
 //  OpenShift sample Node application
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

/**
 * Mongoose database.
 */
var mongoose = require('mongoose');
var options = {
    promiseLibrary: require('bluebird')
};

/**
 * Different models that my application has.
 */
//var Book = require('./Book.model');
//var Feedback = require('./Feedback.model');
var Contact = require('./Contactme.model');



/**
 *  Define the sample application.
 */
var SampleApp = function () {

    //  Scope.
    var self = this;
    var dburl = "";

    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function () {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
        self.port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3002;

        self.node_modules = './node_modules';

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };

        self.dburl = 'mongodb://admin:JwCcFDK1jNqS@' + self.ipaddress + '/samarthya'

        if (process.env.OPENSHIFT_NODEJS_DIR) {
            self.node_modules = process.env.OPENSHIFT_NODEJS_DIR + '/node_modules';
        }

        if (process.env.OPENSHIFT_MONGODB_DB_URL) {
            self.dburl = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME;
        }
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function () {

        if (typeof self.zcache === "undefined") {
            self.zcache = {
                'index.html': ''
            };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function (key) {
        return self.zcache[key];
    };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function (sig) {
        if (typeof sig === "string") {
            console.log('%s: Received %s - terminating sample app ...',
                Date(Date.now()), sig);
            process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()));
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function () {
        //  Process on exit and signals.
        process.on('exit', function () {
            self.terminator();
        });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
            'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function (element, index, array) {
            process.on(element, function () {
                self.terminator(element);
            });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function () {
        self.routes = {};

        self.routes['/asciimo'] = function (req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/'] = function (req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html'));
        };


        /** Added new routes for MongoDB **/
        // self.routes['/books'] = function (req, res) {
        //     Book.find().exec(function( err, books){
        //         if(err){
        //             res.send('Error occurred');
        //         } else {
        //             console.log(books);
        //             res.json(books);
        //         }
        //     });  
        // };

        // self.routes['/books/:id'] = function(req, res) {
        //     console.log('getting all books');

        //     Book.findOne({
        //     _id: req.params.id
        //     })
        //     .exec(function(err, books) {
        //       if(err) {
        //         res.send('error occured')
        //       } else {
        //         console.log(books);
        //         res.json(books);
        //       }
        //     });
        // };


    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function () {
        self.createRoutes();
        self.app = express();
        self.app.use(express.static('resources'));

        /**
         * For it to work on OpenShift server
         */
        if (process.env.OPENSHIFT_NODEJS_DIR) {
            self.app.use(express.static(process.env.OPENSHIFT_REPO_DIR + '/node_modules'));
        } else {
            self.app.use(express.static('node_modules'));
        }

        self.app.use(bodyParser.json())
        self.app.use(bodyParser.urlencoded({
            extended: true
        }));

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }

        /**
         * Add the comments.
         */
        self.app.post('/savecomment', function (req, res) {
            var comment = new Contact();
            console.log(req);

            if (req.body != null) {
                comment.email = req.body.contactEmail;
                comment.name = req.body.contactName;
                comment.sbj = req.body.contactSubject;
                comment.comments = req.body.contactMessage;

                comment.save(function (err, comments) {
                    if (err) {
                        res.send('Error saving comments.');
                    } else {
                        console.log(comments);
                        //res.send(comments)
                        //res.send('<html><body>Thank you!</body></html>');
                        res.redirect('/');
                    }
                });
            }

        });


        self.app.get('/comments', function (req, res) {

            Contact.find().exec(function (err, comments) {
                if (err) {
                    res.send('Error occurred reading comments');
                } else {
                    console.log(comments);
                    res.json(comments);
                }
            });

        });

        //  self.app.post('/pushfd', function(req, res){
        //     var feedback = new Feedback();
        //     console.log(req);

        //     if(req.body != null){
        //         feedback.email=req.body.email;
        //         feedback.telephone=req.body.telephone;
        //         feedback.subject=req.body.subject;
        //         feedback.comments=req.body.comments;

        //         feedback.save(function(err, comment){
        //             if(err){
        //                 res.send('Error saving comments.');
        //             }else{
        //                 console.log(comment);
        //                 res.send(comment);
        //             }
        //         });    
        //     }

        // });
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function () {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function () {

        // self.app.post('/booksp', function(req, res){
        //     var newBook = new Book();
        //     console.log(req);

        //     if(req.body != null){
        //         newBook.title=req.body.title;

        //         newBook.author=req.body.author;
        //         newBook.category=req.body.category;

        //         newBook.save(function(err, book){
        //             if(err){
        //                 res.send('Error saving book.');
        //             }else{
        //                 console.log(book);
        //                 res.send(book);
        //             }
        //         });    
        //     }

        // });



        self.app.saveComment = function (req) {
            var comment = new Contact();
            console.log(req);

            if (req.body != null) {
                comment.email = req.body.email;
                comment.name = req.body.name;
                comment.sbj = req.body.sbj;
                comment.comments = req.body.comments;

                comment.save(function (err, comments) {
                    if (err) {
                        res.send('Error saving comments.');
                    } else {
                        console.log(comments);
                        res.send(comments);
                    }
                });
            }
        }


        //  self.app.post('/booksp2', function(req, res){
        //      console.log(' In the sp2 function');
        //      Book.create(req.body, function(err, book){
        //             if(err){
        //                 res.send('Error saving book.');
        //             }else{
        //                 console.log(book);
        //                 res.send(book);
        //             }
        //         });  
        // });

        // self.app.put('/book/:id', function(req, res){

        //     console.log(' Modifying ' + req.params.id);

        //     Book.update({
        //        _id: req.params.id
        //     }, {$set: {title: req.body.title}},    
        //         function(err, newBook) {
        //             if(err){
        //                 console.log(err);
        //             } else {
        //                 console.log(newBook);
        //                 res.send(newBook);
        //             }
        //         }); 
        // });

        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function () {
            console.log('%s: Node server started on %s:%d ...',
                Date(Date.now()), self.ipaddress, self.port);
            console.log(' DB ' + self.dburl)
        });

        mongoose.createConnection(self.dburl, options).on('open', function(){
            console.log(' DB connection opened');
        });

        //mongoose.connect(self.dburl);

}; /* self-start ends */

}; /*  Sample Application.  */




/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();