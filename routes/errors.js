module.exports = function(app) {
  // 404s
  app.use(function(req, res, next) {
    res.status(404);

    if (req.accepts('html')) {
      return res.send("<h2>Sorry. Couldn't find that page</h2>");
    }

    if (req.accepts('json')) {
      return res.json({ error: 'Not found' });
    }

    // default response type
    res.type('txt');
    res.send("Hmmm, couldn't find that page.")
  });

  // 500s
  app.use(function(err, req, res, next) {
    console.log('error at %s\n', req.url, err);
    res.send(500, "Ooops, we made a 500");
  });
}
