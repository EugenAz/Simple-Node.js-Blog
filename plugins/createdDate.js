module.exports = exports = function createdDate(schema, options) {
  schema.add({ created: Date });

  schema.pre('save', function(next) {
    this.created = Date.now;
    next();
  });

  if (options && options.index) {
    schema.path('created').index(options.index);
  }
}
