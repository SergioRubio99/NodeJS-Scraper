const crawler = require("../functions/crawler");
const saveCache = require("../functions/cache").saveCache;
const getCache = require("../functions/cache").getCache;

module.exports = async (req, res) => {
  //We take the num of pages requested by client in the URL, and check if its existing. In affirmative case, nothing done, in the opposite case, that value is 1.

  let pages_to_scrape = isNaN(parseInt(req.params.num)) ? 1 : parseInt(req.params.num);
  articles_arr = [],
  isCacheEmpty = Object.keys(getCache().data).length === 0;

  //If the cache is empty, the cache will be filled with an Array. If it already has data, a new variable (cachePages) will contain that data. Then we define the page the loop will start crawling from (crawlFromPage), using the cache length.

  let cachePages = !isCacheEmpty ? getCache().data["pages"]["v"] : [];
  crawlFromPage = Object.keys(cachePages).length / 30+1;

  //The slice method default behavior allows to input a second value (until where to substract) larger than the arrays length. In this case, it will cut until there. This is useful in those cases when the number of articles requested by client is lesser than the total of articles cached.
  articles_arr.push(...cachePages.slice(0, pages_to_scrape * 30));
  console.log(cachePages.length)
  
  //We start crawling:
  for (i = crawlFromPage; i <= pages_to_scrape; i++) {
    let page = await crawler(i);
    articles_arr.push(page);
  }
  if(crawlFromPage < pages_to_scrape) saveCache(articles_arr.flat());
  return res.status(200).json({ nycombinator: articles_arr.flat() });
};
