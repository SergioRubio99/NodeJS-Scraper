const puppeteer = require('puppeteer');
const jsdom = require("jsdom");

const num = (req, res, next) => {

    let pages_arr = [];
    (async () => {
            // We create an empty array:
            let sum_of_pages = req.params.num
            console.log(req.params)
            console.log(sum_of_pages)

            try{
                for (i = 1; i <= sum_of_pages; i++) {
                    //EUREKA!! If I put the browser variable declaration here, lifting a puppeteer instance everytime I iterate, a new browser will be set up to crawl every single page, separately! So no page will be left behind in the process of scraping. 

                    //Before this, with the browser constant declared outside the function's scope, I couldn't scrape more than 7 pages without randomly leaving some of them behind.

                    const browser = await puppeteer.launch();
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
                    
                    pages_arr.push(newArrObj)
                    await browser.close();
                }
            }catch(e){
                console.log(e)
            }
            console.log(pages_arr)
            console.log(pages_arr.length)
            // We close the browser
      
    })();
}

module.exports = num;