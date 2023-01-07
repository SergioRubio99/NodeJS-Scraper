const puppeteer = require('puppeteer');
const jsdom = require("jsdom");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 5 });
console.log(cache)
let pages_arr = [];
const num = async (req, res) => {

    let sum_of_pages = req.params.num
    sum_of_pages === undefined ? sum_of_pages = 1 :

        // We create an empty array:
        console.log("Total of pages to crawl! => ", sum_of_pages)
    console.log(`CACHE =>>>> 
        `, cache.get("page"));

        //We make the program check whether the cache is filled or not, using a conditional: 
        if(Object.keys(cache.data).length ===0){
            
        }
    try {
        for (i = 1; i <= sum_of_pages; ++i) {
            //EUREKA!! If I put the browser variable declaration here, lifting a puppeteer instance everytime I iterate, a new browser will be set up to crawl every single page, separately! So no page will be left behind in the process of scraping. 

            //Before this, with the browser constant declared outside the function's scope, I couldn't scrape more than 7 pages without randomly leaving some of them behind.
            inTheCache = cache.set(`page ${i}`, pages_arr, 10000);

            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            const response = await page.goto(`https://news.ycombinator.com/?p=${i}`);
            const body = await response.text();
            // We set up an instance of the puppeteer result, to send it to parse it with the help of JSDOM  

            const { window: { document } } = new jsdom.JSDOM(body);
            newArrObjNameString = `page ${i}`;
            //I will use Object.values() method to iterate over the newArrObj as if it was an array, and then access the array inside. I need to do this, because if not, I cannot asign the variable names dinamically ("page 1", "page 2", etc), asigning a space in each object key. 

            let newArrObj = {}
            newArrObj[newArrObjNameString] = [];
            // We declare the function we will use later to fill the array

            let getTitlesFunction = function (element) {
                let obj = Object.values(newArrObj)[0]
                obj.push({ "article": element.textContent })
            }
            // I transit the DOM as usual, like any browser does, using the DOM API methods, and with the use of the Array.prototype.forEach() method, I execute the function on every HTML tag containing a news title. There, with the use of element.textContent I extract the text to fill the array. Every article's description will be inside an object.

            document.querySelectorAll('tr > td > span[class="titleline"] > a').forEach(getTitlesFunction);



            pages_arr.push(newArrObj)

            //This last line of code makes the crawler stop if it's taking no more information! This is useful if, for instance, the user inputs in the URL a number superior to the number of pages available in the website. It makes the loop stop (making "i" reach whatever number is sum_of_pages), and deletes with ( Array.prototype.pop() ) the last element of the pages_array (that will come empty, obviously): 
            if (Object.values(newArrObj)[0].length === 0) {
                //we stop the loop:
                i = sum_of_pages
                pages_arr.pop()
            }

            console.log(`
            
            A new page has been crawled!  👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
            
            `, newArrObj, `
            
            Page here! ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️
            
            `)
            // We close the browser
            await browser.close();
        //     console.log(`CACHE PAGE 1=>>>> 
        
        // `, cache.get("page 1"));

        console.log(cache.data)
        console.log(Object.keys(cache.data).length)
            // console.clear();
        }
        // console.log(pages_arr);

        res.status(200).json({ "nycombinatorscraped": pages_arr })

    } catch (e) {
        console.log(e)
    }


}

module.exports = num;