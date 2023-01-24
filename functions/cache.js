const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300, checkperiod: 1 });

const saveArticle = (page) => {
  cache.set(`page ${page[0]}`, page);
};

const cacheArticle = (page) => {
  if (cache.get(`page ${page}`)) {
    return cache.get(`page ${page}`);
  }
};

module.exports = { saveArticle, cacheArticle, cache };
