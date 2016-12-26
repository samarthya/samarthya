'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: String,
    author: String,
    category: String
//    possessor: {
//        type: String,
//        required: true,
//        default: 'Saurabh Sharma'
//    },
//    published: Boolean,
//    publishedDate: { 
//        type: Date,
//        default: Date.now
//    },
//    keywords: Array,
//    author: {
//        type: Schema.ObjectId,
//        ref: 'User'
//    },
//    detail: {
//        modelNumber: NUmber,
//        hardcover: Boolean,
//        reviews: Number,
//        rank: Number
//    }
    
});
module.exports = mongoose.model('Book', BookSchema);
