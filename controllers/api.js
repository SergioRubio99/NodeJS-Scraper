const getArticle = require("../functions/cache").getArticle;
const saveArticle = require("../functions/cache").saveArticle;
const crawler = require("../functions/crawler");

module.exports = async (req, res) => {
  try {
    //validation to ensure that a number is entered
    let pages = isNaN(parseInt(req.params.num)) ? 1 : parseInt(req.params.num);

    let art_arr = [];
    let ms = 900;
    for (i = 1; i <= pages; i++) {
      let cache_art = getArticle(i);
      if (cache_art) {
        art_arr.push(cache_art);
      } else {
        ms += 860;
        let crawl = function (i) {
          setTimeout(async () => {
            let crawled = await crawler(i);
            saveArticle([i, crawled]);
            art_arr.push([i, crawled]);
          }, ms);
        };
        crawl(i);
      }
    }
    let Output = setInterval(() => {
      art_arr = art_arr.sort(function compare(a, b) {
        if (a[0] > b[0]) {
          return 1;
        } else {
          return -1;
        }
      });
      if (art_arr.length === pages) {
        clearInterval(Output);
        return res.status(200).json(art_arr);
      }
    }, 10);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};
