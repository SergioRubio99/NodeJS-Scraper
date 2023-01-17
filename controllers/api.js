const crawler = require("../functions/crawler");
const saveCache = require("../functions/cache").saveCache;
const getCache = require("../functions/cache").getCache;

module.exports = async (req, res) => {
  try {
    //validation to ensure that a number is entered
    let pages_to_scrape = isNaN(parseInt(req.params.num)) ? 1 : parseInt(req.params.num);
    articles_arr = [],
    isCacheEmpty = Object.keys(getCache().data).length === 0;

    // Check if cache is empty, if so, initialize it with an empty array
    let cachePages = !isCacheEmpty ? getCache().data["pages"]["v"] : [];
    // Set the starting page for crawling using the cache length
    crawlFromPage = Object.keys(cachePages).length / 30+1;

    // Add cache pages to articles array up to the number of pages requested
    articles_arr.push(...cachePages.slice(0, pages_to_scrape * 30));

    //Start crawling:
    for (i = crawlFromPage; i <= pages_to_scrape; i++) {
      let page = await crawler(i);
      articles_arr.push(page);
    }
    //If we had to crawl anything, renew the cache:

    if(crawlFromPage <= pages_to_scrape) saveCache(articles_arr.flat());
    return res.status(200).json({ nycombinator: articles_arr.flat() });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al procesar la solicitud" });
  } 
};
