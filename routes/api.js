const puppeteer = require('puppeteer')
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    console.log(process.env.PORT);
    
    async function scraper() {
        const headless_browser = await puppeteer.launch({});
        const page = await headless_browser.newPage();
        await page.goto('https://news.ycombinator.com/')
        let element = await page.waitForSelector("#\33 4223998 > td:nth-child(3) > span:nth-child(1) > a:nth-child(1)")

        browser.close()
    }
    scraper()

})

module.exports = router;