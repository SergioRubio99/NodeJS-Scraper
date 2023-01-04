const puppeteer = require('puppeteer');
const jsdom = require("jsdom");

const num = (req, res, next) => {

    let articles_arr = [];
    (async () => {
        try {
            console.log(`
    
            req params!!!!!
            
            `)

            // We create an empty array:


            let sum_of_pages = req.params.num
            console.log(req.params)
            console.log(sum_of_pages)

            // We lift a puppeteer instance.

            const browser = await puppeteer.launch();
            for (i = 1; i <= sum_of_pages; i++) {
                const page = await browser.newPage();
                const response = await page.goto(`https://news.ycombinator.com/?p=${i}`);
                const body = await response.text();
                // We set up an instance of the puppeteer result, to send it to parse it with the help of JSDOM  

                const { window: { document } } = new jsdom.JSDOM(body);

                // We declare the function we will use later to fill the array
                
                let newArrObj = { "page": [] }
                let getTitlesFunction = function (element) {
                    newArrObj.page.push({"article": element.textContent})
                }
                
                // I transit the DOM as usual, like any browser does, using the DOM API methods, and with the use of the Array.prototype.forEach() method, I execute the function on every HTML tag containing a news title. There, with the use of element.textContent I extract the text to fill the array. Every article's description will be inside an object.
                
                document.querySelectorAll('tr > td > span[class="titleline"] > a').forEach(getTitlesFunction);
                
                articles_arr.push(newArrObj)
            }
            console.log(articles_arr)
            console.log(articles_arr.length)
      
            // We close the browser
            await browser.close();
        } catch (error) {
            console.error(error);
        }
    })();

 
}

module.exports = num;