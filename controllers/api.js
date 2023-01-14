const NodeCache = require("node-cache");
const crawler = require("../functions/crawler");
//We set a basic cache with 5m of duration
const cache = new NodeCache({ stdTTL: 300, checkperiod: 1 });
console.log(cache);

module.exports = (req,res) => {
  crawler(req.params.num)
  let articles_arr = [];
  return res.status(200).json({ articles_arr });
}