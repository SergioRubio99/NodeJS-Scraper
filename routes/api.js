const puppeteer = require('puppeteer')
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    
    async function scraper() {
        const headless_browser = await puppeteer.launch({});
        const page = await headless_browser.newPage();
        await page.goto('https://news.ycombinator.com/')
        let element = await page.waitForSelector(".athing > .title > .titleLine > a")
        console.log(element);
        var text = await page.evaluate(element => element.textContent, element)
        console.log(text)
        headless_browser.close()
    }
    scraper()

})

module.exports = router;