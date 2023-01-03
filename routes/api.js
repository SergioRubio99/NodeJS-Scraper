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
        
            console.log(req.params)
            // Abrimos una instancia del puppeteer y accedemos a la url de google
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            const response = await page.goto('https://news.ycombinator.com/?p=1');
            const body = await response.text();
            console.log(body);

            // We set up an instance of the puppeteer result, to send it to parse it with the help of JSDOM  

            const { window: { document } } = new jsdom.JSDOM(body);

            // We scrape the links and show them via the console.
            
            let arts_to_scrape = 30;
            document.querySelectorAll('.titleline > a')
                .forEach(element => console.log(element.getAttribute("href")));
            for (i = 0; i < arts_to_scrape; i++) {
            }

            let output_obj = {}

            // We close the browser
            await browser.close();
        } catch (error) {
            console.error(error);
        }
    })();

    next();
})


module.exports = router;