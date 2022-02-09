

export function timestamp (url) {
  // var getTimestamp=Math.random();
  var getTimestamp = new Date().getTime();
  url = url + "?timestamp=" + getTimestamp
  return url;
}
