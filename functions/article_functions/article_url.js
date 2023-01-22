let getUrl = (element) => {
  if (/http/.test(element.href)) {
    return element.href;
  }
  //Sometimes the website doesn't provice an URL.
  return "none";
};

module.exports = getUrl;
