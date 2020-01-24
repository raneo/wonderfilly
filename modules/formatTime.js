module.exports = (m) => {
  var date = new Date(m.createdTimestamp);
  return `[${date.getFullYear()}${date.getMonth()+1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}]`;
}
