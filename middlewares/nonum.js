const puppeteer = require('puppeteer');
const jsdom = require("jsdom");


// We create an empty array:

let articles_arr = [];


const nonum = (req, res, next) => {

    (async () => {
        try {
            console.log(`
    
            req params!!!!!
            
            `)





            // We lift a puppeteer instance.

            const browser = await puppeteer.launch();

            const page = await browser.newPage();
            const response = await page.goto(`https://news.ycombinator.com/`);
            const body = await response.text();
            // We set up an instance of the puppeteer result, to send it to parse it with the help of JSDOM  

            const { window: { document } } = new jsdom.JSDOM(body);

            // We declare the function we will use later to fill the array

            let getTitlesFunction = function (element) {
                articles_arr.push({ "article": element.textContent })
            }

            // I transit the DOM as usual, like any browser does, using the DOM API methods, and with the use of the Array.prototype.forEach() method, I execute the function on every HTML tag containing a news title. There, with the use of element.textContent I extract the text to fill the array. Every article's description will be inside an object.

            document.querySelectorAll('td > span[class="titleline"] > a').forEach(getTitlesFunction);

            console.log(articles_arr)


            // We close the browser
            await browser.close();
            
        } catch (error) {
            console.error(error);
        }
    })();

    next();
}

module.exports = nonum