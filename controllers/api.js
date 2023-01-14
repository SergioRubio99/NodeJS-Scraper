const puppeteer = require("puppeteer");
const jsdom = require("jsdom");
const NodeCache = require("node-cache");
//We set a basic cache with 5m of duration
const cache = new NodeCache({ stdTTL: 300, checkperiod: 1 });
console.log(cache);
