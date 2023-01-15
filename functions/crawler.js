const buildUpperArticle = require("./article_functions/buildUpperArticle");
const buildLowerArticle = require("./article_functions/buildLowerArticle");
const DOM = require("./getDOM");

const crawler = async (pages) => {
  pages === undefined ? (pages = 1) : undefined;
  const { document } = await DOM(pages);
  let upperArr = [];
  let lowerArr = [];
  //First, we call buildUpperArticle() to scrape the first half of the article:

  document.querySelectorAll('span[class="titleline"] > a').forEach((e) => {
    upperArr.push(buildUpperArticle(e));
  });

  //Once this is done, we call buildLowerArticle() to scrape the second half:

  document
    .querySelectorAll(".subtext")
    .forEach((e) => lowerArr.push(buildLowerArticle(e)));

  //Once each half is into a separate array, we mix them both, merging each object of upperArr with each object of lowerArr:

  let page_arr = [];
  upperArr.forEach((e, i) => {
    let title = e.title;
    let url = e.url;
    let obj = {
      title,
      url,
      ...lowerArr[i],
    };
    console.log(obj);
    page_arr.push(obj);
  });
};

module.exports = crawler;
