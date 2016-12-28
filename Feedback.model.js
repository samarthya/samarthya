var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  email: String,
  subject: String,
  comments: String,
  telephone: Number
});

module.exports = mongoose.model('Feedback', FeedbackSchema);