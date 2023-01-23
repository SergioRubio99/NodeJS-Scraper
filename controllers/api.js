const crawl = require("../controllers/methods/crawl");
const compare = require("../controllers/methods/compare");

module.exports = async (req, res) => {
  try {
    //validation to ensure that a number is entered
    let pages = isNaN(parseInt(req.params.num)) ? 1 : parseInt(req.params.num),
    art_arr = [],
    DELAY = 900;
    for (i = 1; i <= pages; i++) {
        DELAY += 900;
        crawl(i, DELAY, art_arr);
    }
    let Output = setInterval(() => {
      if (art_arr.length === pages) {
        art_arr = art_arr.sort(compare);
        clearInterval(Output);
        return res.status(200).json(art_arr);
      }
    }, 10);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};
