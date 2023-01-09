const puppeteer = require('puppeteer');
const jsdom = require("jsdom");
const NodeCache = require("node-cache");
//We set a basic cache with 10s of duration
const cache = new NodeCache({ stdTTL: 10 });
console.log(cache)
let pages_arr = [];

const num = async (req, res) => {

    //Let's store in a variable, the number of pages that client wants scraped: 

    let sum_of_pages = req.params.num;
    sum_of_pages === undefined ? sum_of_pages = 1 : undefined;

    // console.log("Total of pages to crawl! => ", sum_of_pages);
    // console.log(`CACHE =>>>> `, cache.get("page"));
    // console.log("FALSE OR TRUE >==>>>", Object.keys(cache.data).length === 0);
    // console.log(Object.keys(cache.data).length);
    // console.log(Object.keys(cache.data).length);
    // console.log(Object.keys(cache.data).length);
    // console.log("EEEE, ", Object.values(cache.data).length === 0)
    
    //We check whether the cache is filled or not, and if the pages requested are more than those you can find in the cache (URL /X > cache.data.length):
    
    if (Object.keys(cache.data).length === 0) {

        //If the cache is empty, we want the scraper to crawl every page needed, store it in in the cache and send the JSON response, as usual. Like we did before, without reading the cache at all:

        try {

            //This for loop is dedicated to scrape a page, nothing else:

            for (i = 1; i <= sum_of_pages; ++i) {

                //If I put the browser variable declaration here, lifting a puppeteer instance everytime I iterate, a new browser will be set up to crawl every single page, separately! So no page will be left behind in the process of scraping. Before this, with the browser constant declared outside the function's scope, I couldn't scrape more than 7 pages without randomly leaving some of them behind.

                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                const response = await page.goto(`https://news.ycombinator.com/?p=${i}`);
                const body = await response.text();
                // We set up an instance of the puppeteer result (body), to parse it with the help of JSDOM  

                const { window: { document } } = new jsdom.JSDOM(body);

                //DYNAMIC CREATION OF THE OBJECT, ITS OBJECT KEYS, AND THE CONTENT INSIDE:

                newArrObjNameString = `page ${i}`;

                //I will use Object.values() method to iterate over the newArrObj as if it was an array, and then access the array inside. I need to do this, because if not, I cannot asign the variable names dinamically ("page 1", "page 2", etc), with a space in each object key. 

                let newArrObj = {}
                //we create the "page X" entry inside the object: 

                newArrObj[newArrObjNameString] = [];


                // We declare the function we will use later to fill the array:

                let getTitlesFunction = function (element) {
                    let obj = Object.values(newArrObj)[0]
                    obj.push({ "article": element.textContent })
                }

                
                // I transit the DOM as in any frontend app, using the DOM API methods, and with the use of the Array.prototype.forEach() method, I execute the function on every HTML tag containing an article description. There, with the use of element.textContent I extract the text to fill the array. Every article's description will be inside its own object.

                document.querySelectorAll('tr > td > span[class="titleline"] > a').forEach(getTitlesFunction);
                pages_arr.push(newArrObj)


                //This last line of code makes the crawler stop if it's taking no more information! This is useful if, for instance, the user inputs in the URL a number superior to the number of pages available in the website. It makes the loop stop (making "i" reach whatever number is sum_of_pages), and deletes with ( Array.prototype.pop() ) the last element of the pages_array (that will come empty, obviously): 
                
                if (Object.values(newArrObj)[0].length === 0) {
                    //we halt the loop:
                    i = sum_of_pages
                    pages_arr.pop()
                }

                //This will indicate through the console that the scraper is scraping pages, with content inside (and not experiencing any kind of error or obstacle): 
                
                console.log(`
                    
                    A new page has been crawled!  👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
                    
                    `, newArrObj, `
                    
                    Page here! ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️
                    
                    `)

                // We close the browser instance:
                
                await browser.close();
                
                //     console.log(`CACHE PAGE 1=>>>> 

                // `, cache.get("page 1"));
                
                console.log(cache.data)

                // console.log(cache.data.Object.Keys(cache.data))
                // console.log(Object.keys(cache.data).length)

                // console.clear();
            }
            // console.log(pages_arr);
            cache.set(`pages_first_half`, pages_arr, 10);
            console.log("cached arr => ", cache.data["pages_first_half"]["v"])
            return res.status(200).json({ "nycombinatorscraped": pages_arr })

        } catch (e) {
            console.log(e);
        }
 
           
    } else {

        //What if the cache is not empty? In this case, there are two possibilites: the user wants a page beyond the pages cached, or the user wants pages included in the cache pages range. For instance: the cache has content until the 4th page, and the user requests until the 6th page, or maybe the user requests until the 3rd page (in this case, no crawling is needed, since every page requested is into the cache). 

        // In the following two ifs, we will deliver the whole content of the cache (if pages requested are the same that exist in the cache), or less pages than what are available inside the cache (if the user requests less pages than those available inside the cache):

        console.log(sum_of_pages)
        console.log(cache.data["pages_first_half"]["v"].length)

        // If the pages requested are the same that you can find in the cache (URL /X == cache.data.length):

        if (cache.data["pages_first_half"]["v"].length == sum_of_pages) {
            console.log("THE CLIENT REQUESTED THE SAME AMOUNT OF PAGES THAT ARE CACHED ALREADY")
            cache.set(`pages_first_half`, cache.data["pages_first_half"]["v"], 10);

            return res.status(200).json({ "nycombinatorscraped": cache.data["pages_first_half"]["v"] })
        }

        // If the pages requested are the less than those you can find in the cache (URL /X < cache.data.length):

        if (sum_of_pages < cache.data["pages_first_half"]["v"].length) {
            console.log("THE CLIENT REQUESTED LESS PAGES THAT THOSE CACHED ALREADY");
            // cache.set(`pages_first_half`, cache.data["pages_first_half"]["v"].slice(0, sum_of_pages), 10);
            return res.status(200).json({ "nycombinatorscraped": cache.data["pages_first_half"]["v"].slice(0, sum_of_pages) })
        }

    }

    if(sum_of_pages > Object.values(cache.data).length){
        pages_arr = []
        console.log("THE CLIENT REQUESTED MORE PAGES THAT THOSE CACHED ALREADY");
        console.log(pages_arr);
    
        // return res.status(200).json({ "nycombinatorscraped": cache.data["pages_first_half"]["v"].slice(0, sum_of_pages) })

        try {
            for (i = (cache.data["pages_first_half"]["v"].length+1); i <= sum_of_pages; ++i) {

  //Here, we scrape exactly the same way we did it when the cache is empty, and we have to scrape all the pages requested by the user. With the difference that now the loop starts iterating just after the last page available in the cache (if 4 pages are available inside the cache, the loop will start in the number 5). Doing this, we avoid scraping uselessly pages already scraped.
  

                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                const response = await page.goto(`https://news.ycombinator.com/?p=${i}`);
                const body = await response.text();

                const { window: { document } } = new jsdom.JSDOM(body);
                newArrObjNameString = `page ${i}`;
             
                let newArrObj = {}
                newArrObj[newArrObjNameString] = [];
        

                let getTitlesFunction = function (element) {
                    let obj = Object.values(newArrObj)[0]
                    obj.push({ "article": element.textContent })
                }
        

                document.querySelectorAll('tr > td > span[class="titleline"] > a').forEach(getTitlesFunction);
                pages_arr.push(newArrObj)

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
              
                await browser.close();
            
                console.log(cache.data)

                // console.log(cache.data.Object.Keys(cache.data))
                // console.log(Object.keys(cache.data).length)
            }
            console.log(`cached arr => 
            
            
            
            `, cache.data["pages_first_half"]["v"]);
            
            
            console.log(`crawled arr => 
            
            
            
            
            `, pages_arr);

            pages_arr = cache.data["pages_first_half"]["v"].concat(pages_arr);
            cache.set(`pages_first_half`, pages_arr, 10);
            return res.status(200).json({ "nycombinatorscraped": pages_arr })

        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = num;