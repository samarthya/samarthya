/**
 * Created by saurabhs on 29/12/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactMe = new Schema({
    email: String,
    sbj: String,
    comments: String,
    name: String
});

module.exports = mongoose.model('Contact', ContactMe);