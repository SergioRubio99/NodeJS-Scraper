const crawler = require("../functions/crawler");
const saveCache = require("../functions/cache").saveCache;
const getCache = require("../functions/cache").getCache;

module.exports = async (req, res) => {
  let [pages_to_scrape, articles_arr] = [parseInt(req.params.num), []];
  let isCacheEmpty = Object.keys(getCache().data).length === 0;
  isNaN(pages_to_scrape) ? (pages_to_scrape = 1) : "";

  if (!isCacheEmpty) {
    let cachePages = getCache().data["pages"]["v"];
    //If the number of pages available in the CACHE is the same client requested, just return the cache in the response:

    if (Object.keys(cachePages).length / 30 === pages_to_scrape) {
      return res.status(200).json({ nycombinator: cachePages });
    }

    //If the client wants less pages than those in the cache, just return the number of pages requested from the cache:

    if (Object.keys(cachePages).length / 30 > pages_to_scrape) {
      return res
        .status(200)
        .json({ nycombinator: cachePages.slice(0, pages_to_scrape * 30) });
    }

    //If the client wants more pages than those in the cache, return all the pages present in the cache, and crawl the missing ones. Then overwrite the cache:

    if (Object.keys(cachePages).length / 30 < pages_to_scrape) {
      let cacheLen = cachePages.length;
      console.log(cacheLen)
      for (i = (cacheLen/30)+1; i <= pages_to_scrape; i++) {
        let page = await crawler(i);
        articles_arr.push(page);
      }
      console.log(`articles_arr`,
      articles_arr
      )

      console.log(`cachePages`,
      cachePages
      )

      
      articles_arr = cachePages.concat(articles_arr);
      return res.status(200).json({ nycombinator: articles_arr.flat() });
    }
  }



  for (i = 1; i <= pages_to_scrape; i++) {
    let page = await crawler(i);
    articles_arr.push(page);
  }

  // console.log(Object.keys(getCache().data).length === 0);
  saveCache(articles_arr.flat());
  // console.log(Object.keys(getCache().data["pages"]["v"]));

  return res.status(200).json({ nycombinator: articles_arr.flat() });
};
