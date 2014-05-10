var errors = require('./errors');
var login = require('./login');
var posts = require('./posts');
var BlogPost = require("../models/blogPost");

module.exports = function(app) {

  // home page
  app.get('/', function(req, res, next) {
    BlogPost.find().sort('created').limit(10).exec(function(err, posts) {
      if (err) return next(err);

      // res.render('home.jade', { session: res.locals.session, posts: posts });
      res.render('home.jade', { posts: posts });
    })
  });

  // login / logout
  login(app);

  // posts
  posts(app);

  // error handlers
  errors(app);
};
