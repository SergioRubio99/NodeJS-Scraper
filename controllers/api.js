const getCache = require("../functions/cache").getCache;
const saveCache = require("../functions/cache").saveCache;
const crawler = require("../functions/crawler");


module.exports = async (req, res) => {
  try {
    //validation to ensure that a number is entered
    let pages_to_deliver = isNaN(parseInt(req.params.num))
      ? 1
      : parseInt(req.params.num);

    let art_arr = [];
    let ms = 200;
    for (i = 1; i <= pages_to_deliver; i++) {
      ms += 900;
      let crawl = function (i) {
        setTimeout(async () => {
          let crawled = await crawler(i);
          art_arr.push([i, crawled]);
          return crawled;
        }, ms);
      };
      crawl(i);
    }

    setTimeout(() => {
      if (art_arr.length === pages_to_deliver) {
        return res.status(200).json(art_arr.sort((a,b)=>{a[0]<b[0]}));
      }
    }, 900 * pages_to_deliver + 900);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};
