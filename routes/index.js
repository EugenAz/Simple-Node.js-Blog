var errors = require('./errors');
var login = require('./login');
var posts = require('./posts');

module.exports = function(app) {

  // home page
  app.get('/', function(req, res) {
    res.render('home.jade', { session: res.locals.session });
  });

  // login / logout
  login(app);

  // posts
  posts(app);

  // error handlers
  errors(app);
};
