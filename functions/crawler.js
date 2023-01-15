const axios = require("axios");
const jsdom = require("jsdom");
const buildUpperArticle = require("./article_functions/buildUpperArticle");
const buildLowerArticle = require("./article_functions/buildLowerArticle");

const axiosInstance = axios.create({
  baseURL: "https://news.ycombinator.com/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});


const crawler = async (pages) => {
  pages === undefined ? (pages = 1) : undefined;
  let page = await axiosInstance.get();
  const { document } = new jsdom.JSDOM(page.data).window;
  let upperArr = []
  document.querySelectorAll('span[class="titleline"] > a').forEach((e)=> {
    console.log(buildUpperArticle(e))
  });
  console.log(upperArr)
  document.querySelectorAll(".subtext").forEach(buildLowerArticle);
};

module.exports = crawler;
