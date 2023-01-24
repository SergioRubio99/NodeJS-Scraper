const cacheArticle = require("../../functions/cache").cacheArticle;
const saveArticle = require("../../functions/cache").saveArticle;
const crawler = require("../../functions/crawler"); 
let crawl = function (page, art_arr) {
    let crawled = cacheArticle(page);
    if (crawled) {
      art_arr.push(crawled);
    } else {
      setTimeout(async () => {
        if(cacheArticle(page)){
          crawled = cacheArticle(page)
          art_arr.push(crawled);
        }else{
          crawled = await crawler(page);
          saveArticle(crawled); 
          art_arr.push(crawled);
        }
      });
    }
  };

  module.exports = crawl;