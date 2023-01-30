const cacheArticle = require("../../functions/cache").cacheArticle;
const saveArticle = require("../../functions/cache").saveArticle;
const crawler = require("../../functions/crawler"); 
module.exports = function (page, art_arr) {
    let crawled = cacheArticle(page);
    if (crawled) {
        art_arr.push(cacheArticle(page));
        console.log(`Controller: page ${page} retrieved from the cache!`);
    } else {
      setTimeout(async () => {
          crawled = await crawler(page);
          saveArticle(crawled);
          art_arr.push(crawled);
      });
    }
  };

