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

  // read
  app.get("/posts/:id", function(req, res, next) {
    var query = BlogPost.findById(req.param('id'));

    query.populate('author');

    query.exec(function (err, post) {

      console.log("post", post);
      console.log("post.author", post.author);

      if (err) return next(err);

      if (!post) return next(); // 404

      res.render('post/view.jade', { post: post });
    });
  });

  // update

  // delete
  app.get("/posts/remove/:id", loggedIn, function(req, res, next) {
    var id = req.param('id');

    BlogPost.findOne({ _id: id }, function (err, post) {
      if (err) return next(err);

      // validate logged in user authored this post
      if (post.author != req.session.user) {
        return res.send(403);
      }

      post.remove(function(err) {
        if (err) return next(err);

        // TODO display a confirmation msg to user
        res.redirect('/');
      });
    });
  })
}


