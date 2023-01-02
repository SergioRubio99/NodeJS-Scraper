const puppeteer = require('puppeteer')
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    async function scraper() {
        const headless_browser = await puppeteer.launch({});
        const page = await headless_browser.newPage();
        await page.goto('https://news.ycombinator.com/')
        let article_title = await page.waitForSelector(".athing > .title > .titleLine > a");
        console.log(article_title);
        let titleText = await page.evaluate(article_title => article_title.textContent, article_title);

        let articleFunction = () => {

        }

        let article_url = await page.$$(".titleline > a[href]", el => el.getAttribute("href"));
        let json = res.json(Array.from(article_url))

        console.log(titleText);
        console.log(article_url);

        headless_browser.close();
    }
    scraper()

})

module.exports = router;