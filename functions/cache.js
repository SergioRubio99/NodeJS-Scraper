const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 15, checkperiod: 1 });

const saveArticle = (page) => {
  cache.set(`page ${page[0]}`, page);
};

const getArticle = (page) => {
  if (cache.get(`page ${page}`)) {
    console.log(
      `Controller: page ${cache.get(`page ${page}`)[0]} retrieved from the cache!`
    );
    return cache.get(`page ${page}`);
  }
};

module.exports = { saveArticle, getArticle, cache };
