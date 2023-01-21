const [buildUpperArticle, buildLowerArticle, DOM] = [
  require("./article_functions/buildUpperArticle"),
  require("./article_functions/buildLowerArticle"),
  require("./getDOM"),
];
 
module.exports = async (pages) => {
  const { document } = await DOM(pages);
  [upperArr, lowerArr, page_arr] = [[], [], []];
  //First, we call buildUpperArticle() to scrape the first half of the article:
  document.querySelectorAll('span[class="titleline"] > a').forEach((e) => {
    upperArr.push(buildUpperArticle(e));
  });
  //Once this is done, we call buildLowerArticle() to scrape the second half:
  document
    .querySelectorAll(".subtext")
    .forEach((e) => lowerArr.push(buildLowerArticle(e)));
  //Once each half is into a separate array, we mix them both, merging each object of upperArr with each object of lowerArr:
  upperArr.forEach((e, i) => {
    let obj = {
      title: e.title,
      url: e.url,
      ...lowerArr[i],
    };
    page_arr.push(obj);
  });
  console.log(`Page ${pages} crawled!`);
  return page_arr
};;
