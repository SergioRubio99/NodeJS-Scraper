const getArticle = require("../../functions/cache").getArticle;
const saveArticle = require("../../functions/cache").saveArticle;
const crawler = require("../../functions/crawler"); 
let crawl = function (i, DELAY, art_arr) {
    let crawled = getArticle(i);
    if (crawled) {
      art_arr.push(crawled);
    } else {
      setTimeout(async () => {
        if(getArticle(i)){
          crawled = getArticle(i)
          art_arr.push(crawled);
        }else{
          crawled = await crawler(i);
          saveArticle(crawled);
          art_arr.push(crawled);
        }
      }, DELAY);
    }
  };

  module.exports = crawl;