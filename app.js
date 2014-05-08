var mongoose = require("mongoose");
var express = require("express");
var configure = require("./middleware");
var routes = require("./routes");

mongoose.connect('mongodb://localhost', function(err) {
  if (err) throw err;
  console.log('connected to mongodb');

  var app = express();
  configure(app);
  routes(app);

  app.listen(3000, function() {
  	console.log('http://localhost:3000');
  });
})
