var loggedIn = require('../middleware/loggedIn');
var BlogPost = require("../models/blogPost");

module.exports = function(app) {
  // create
  app.get("/posts/create", loggedIn, function(req, res) {
    res.render('post/create.jade');
  });

  app.post("/posts/create", loggedIn, function(req, res, next) {
    var body = req.param("body");
    var title = req.param("title");
    var user = req.session.user;

    BlogPost.create({
      body: body,
      title: title,
      author: user
    }, function (err, post) {
      if (err) return next(err);
      res.redirect('/posts/' + post.id);
    });
  });
}
