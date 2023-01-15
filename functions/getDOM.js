[axios, jsdom] = [require("axios"), require("jsdom")];

module.exports = async (pages) => {
  let url = `https://news.ycombinator.com/?p=${pages}`;
  const axiosInstance = axios.create({
    baseURL: url,
    timeout: 1000,
    headers: { "X-Custom-Header": "foobar" },
  });
  let page = await axiosInstance.get();
  return new jsdom.JSDOM(page.data).window;
};
