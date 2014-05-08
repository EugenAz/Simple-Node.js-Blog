var mongoose = require('mongoose');
var validEmail = require('../helpers/validate/email');

var schema = mongoose.Schema({
  _id: { type: String, validate: validEmail },
  name: { first: String, last: String },
  salt: { type: String, required: true },
  hash: { type: String, required: true },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', schema);
