var loggedIn = require('../middleware/loggedIn');

module.exports = function(app) {
  // create
  app.get("/post/create", loggedIn, function(req, res) {
    res.render('post/create.jade');
  });
}
