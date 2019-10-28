
function format(d) {

  if (d.length > 0) {
    var index = d.indexOf(";base64,");
    if (index > -1) {
      index = index + 8;
    }
    d = d.substr(index);
  }

  return d;
}
export default {
  format
};
