var loggedIn = require("../middleware/loggedIn");
var BlogPost = require("../models/blogPost");
var Comment = require("../models/comment")

module.exports = function(app) {
  app.get("/posts", function(req, res) {
    res.redirect("/");
  });

  // create
  app.get("/posts/create", loggedIn, function(req, res) {
    res.render("post/create.jade");
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
      res.redirect("/posts/" + post.id);
    });
  });

  // read
  app.get("/posts/:id", function(req, res, next) {
    var id = req.param("id");

    var promise = BlogPost.findComments(id)
                          .sort('created')
                          .select('-_id') // exclude the _id
                          .exec();

    var query = BlogPost.findById(id).populate("author");
    query.exec(function (err, post) {
      if (err) return next(err);
      if (!post) return next(); // 404

      res.render("post/view.jade", { pageTitle: post.title, post: post, comments: promise });
    });
  });

  // edit
  app.get("/posts/edit/:id", loggedIn, function(req, res, next) {
    res.render("post/create.jade", {
      post: BlogPost.findById(req.param("id"))
    });
  });

  // update
  app.post("/posts/edit/:id", loggedIn, function(req, res, next) {
    BlogPost.edit(req, function(err) {
      if (err) return next(err);
      res.redirect("/posts/" + req.param("id"));
    })
  });

  // delete
  app.get("/posts/remove/:id", loggedIn, function(req, res, next) {
    var id = req.param("id");

    BlogPost.findOne({ _id: id }, function (err, post) {
      if (err) return next(err);

      // validate logged in user authored this post
      if (post.author != req.session.user) {
        return res.send(403);
      }

      post.remove(function(err) {
        if (err) return next(err);

        // TODO display a confirmation msg to user
        res.redirect("/");
      });
    });
  });

  // comments
  app.post("/posts/comment/:id", loggedIn, function(req, res, next) {
    var id = req.param("id");
    var text = req.param("text");
    var author = req.session.user;

    Comment.create({
      post: id,
      text: text,
      author: author
    }, function(err, comment) {
      if (err) return next(err);

      // TODO probably want to do this all with xhr
      res.redirect("/posts/" + id);
    })
  })
}


