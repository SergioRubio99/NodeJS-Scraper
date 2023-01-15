const axios = require("axios");
const jsdom = require("jsdom");

const DOM = async function (pages) {
  let url = `https://news.ycombinator.com/?p=${pages}`;
  const axiosInstance = axios.create({
    baseURL: url,
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });

  let page = await axiosInstance.get();
  console.log("AXIOS INSTANCE => ", page);
  return new jsdom.JSDOM(page.data).window;;
};

module.exports = DOM;
