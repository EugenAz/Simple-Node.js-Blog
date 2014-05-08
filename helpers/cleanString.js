module.exports = function(str) {
  if (typeof str !== "string") {
    str = str.toString();
  }
  return str.trim();
}
