const axios = require("axios");
const jsdom = require("jsdom");
const buildUpperArticle = require("./scrape_article_functions/buildUpperArticle");
const buildLowerArticle = require("./scrape_article_functions/buildLowerArticle");

const axiosInstance = axios.create({
  baseURL: "https://news.ycombinator.com/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});


const crawler = async (pages) => {
  pages === undefined ? (pages = 1) : undefined;
  let page = await axiosInstance.get();
  const { document } = new jsdom.JSDOM(page.data).window;
  document.querySelectorAll('span[class="titleline"] > a').forEach(buildUpperArticle);
  document.querySelectorAll(".subtext").forEach(buildLowerArticle);
};

module.exports = crawler;
