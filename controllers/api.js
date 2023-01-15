const [crawler] = [require("../functions/crawler")];

module.exports = async (req, res) => {
  req.params.num === undefined ? (req.params.num = 1) : "";
  let page = await crawler(req.params.num);
  let articles_arr = [];
  page.concat(articles_arr);
  console.log(page);
  return res.status(200).json({ "nycombinator": page });
};
