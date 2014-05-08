var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

module.exports = function(app) {
  app.use(logger());

  // in real world I should use connect-mongo instead of the next stack:
  app.use(cookieParser());
  app.use(session({ secret: 'building a blog' }));
  app.use(bodyParser());

  // expose session in views
  app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
  });
}
