const crawl = require("./controller_methods/crawl")
const compare = require("./controller_methods/compare")
module.exports = async (req, res) => {
  try {
    //validation to ensure that a number is entered
    let pages = isNaN(parseInt(req.params.num)) ? 1 : parseInt(req.params.num),
    art_arr = [];
    for (i = 1; i <= pages; i++) {
        crawl(i, art_arr);
    }
    
    const crawl_interval = setInterval(() => {
      if (art_arr.length === pages) {
        art_arr = art_arr.sort(compare);
        clearInterval(crawl_interval);
        return res.status(200).json(art_arr.map(e => e.slice(1)).flat(2));
      }
    }, 10);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al procesar la solicitud" });
  }
};
