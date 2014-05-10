var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var createdDate = require('../plugins/createdDate');
var validEmail = require('../helpers/validate/email');

var schema = mongoose.Schema({
  post: { type: ObjectId, index: true },
  text: { type: String, required: true, trim: true, validate: validateText },
  author: String
});

function validateText(str) {
  return str.length < 250;
}

// in production we disable auto index creation
// schema.set('autoIndex', false);

// add created date property
schema.plugin(createdDate);

module.exports = mongoose.model('Comment', schema);
