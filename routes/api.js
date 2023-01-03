const puppeteer = require('puppeteer')
const express = require("express");
const jsdom = require("jsdom");
const router = express.Router();


router.get("/", (req, res, next) => {

    console.log("random")
})

router.get("/:num", (req, res, next) => {

    (async () => {
        try {
            console.log(`
    
            req params!!!!!
            
            `)

            // We create an empty array:

            const articles_arr = []

            let page_count = req.params.num
            console.log(req.params)
            console.log(page_count)

            // We lift a puppeteer instance.

            const browser = await puppeteer.launch();
            for (i = 1; i <= page_count; i++) {
                console.log("page-count => ", page_count)
                const page = await browser.newPage();
                const response = await page.goto(`https://news.ycombinator.com/?p=${i}`);
                const body = await response.text();
                console.log(body);
                // We set up an instance of the puppeteer result, to send it to parse it with the help of JSDOM  

                const { window: { document } } = new jsdom.JSDOM(body);

                // We declare the function we will use later to fill the array

                let getTitlesFunction = function (element) {
                    articles_arr.push({ "article": element.textContent });
                }

                // I transit the DOM as usual, like any browser does, using the DOM API methods, and with the use of the Array.prototype.forEach() method, I execute the function on every HTML tag containing a news title. There, with the use of element.textContent I extract the text to fill the array. Every article's description will be inside an object.

                document.querySelectorAll('tr > td > span[class="titleline"] > a').forEach(getTitlesFunction);
                console.log(articles_arr)
            }


            // We close the browser
            await browser.close();
        } catch (error) {
            console.error(error);
        }
    })();

    next();
})


module.exports = router;