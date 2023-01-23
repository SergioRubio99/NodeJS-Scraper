const getArticle = require("../../functions/cache").getArticle;
const saveArticle = require("../../functions/cache").saveArticle;
const crawler = require("../../functions/crawler"); 
let crawl = function (page, art_arr) {
    let crawled = getArticle(page);
    if (crawled) {
      art_arr.push(crawled);
    } else {
      setTimeout(async () => {
        if(getArticle(page)){
          crawled = getArticle(page)
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