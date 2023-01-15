const crawler = require("../functions/crawler");
const saveCache = require("../functions/cache").saveCache;
const getCache = require("../functions/cache").getCache;
module.exports = async (req, res) => {
  let pages_to_scrape = req.params.num;
  let articles_arr = [];

  pages_to_scrape === undefined ? (pages_to_scrape = 1) : "";

  for (i = 1; i <= pages_to_scrape; i++) {
    let page = await crawler(i);
    articles_arr.push(page);
  }

  saveCache(articles_arr);
  console.log(getCache().data["pages"]["v"]);
  return res.status(200).json({ nycombinator: articles_arr.flat() });
};
