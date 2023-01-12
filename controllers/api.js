const puppeteer = require('puppeteer');
const jsdom = require("jsdom");
const NodeCache = require("node-cache");
//We set a basic cache with 10s of duration
const cache = new NodeCache({ stdTTL: 3 });
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
    
    //We check whether the cache is filled or not, and if the pages requested are more than those you can find in the cache (if URL /X > cache.data.length):
    
    if (Object.keys(cache.data).length === 0) {
        console.log("CACHE IS EMPTY/////////////////////////////")        //If the cache is empty, we want the scraper to crawl every page needed, store it in in the cache and send the JSON response, as usual. Like we did before, without reading the cache at all:
        try {

            //This for loop is dedicated to scrape a page and cache it, nothing else:

            for (i = 1; i <= sum_of_pages; ++i) {

                //If I put the browser variable declaration here, lifting a puppeteer instance everytime I iterate, a new browser will be set up to crawl every single page, separately! So no page will be left behind in the process of scraping. Before this, with the browser constant declared outside the function's scope, I couldn't scrape more than 7 pages without randomly leaving some of them behind.

                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                const response = await page.goto(`https://news.ycombinator.com/?p=${i}`);
                const body = await response.text();
                // We set up an instance of the puppeteer result (body), to parse it with the help of JSDOM  (because response.text() delivers us the HTML as plain text)

                const { window: { document } } = new jsdom.JSDOM(body);

                //DYNAMIC CREATION OF THE OBJECT, ITS OBJECT KEYS, AND THE CONTENT INSIDE:

                newArrObjNameString = `page ${i}`;


                //We declare the object that will contain the page we're set on:

                let newArrObj = {}

                //We create the "page X" entry inside the object: 

                newArrObj[newArrObjNameString] = [];


                // FIELD OBTAINING FUNCTIONS;

                // The function to get URLs:

                let getURL = (element) => {
                    return element.href
                }

                // The function to get the points of each article:

                let getPoints = (element) => {
              
                  //We take the element received , which is a HTMLSpanElement {}. Then convert it to a Nodelist via querySelectorAll(). After that, we can substract the points.

                  //We use an if statement, because some articles don't have anything under .subline > .score We can't point to textContent if its father element may come empty!

                  if (!element.querySelectorAll(".subline>.score")[0]) {
                    console.log("HTML ELEMENT POINTS ====> NO POINTS!");
                    return 0; // In case we can't find any .score element, 0 points will be attributed to the article. 
                  } else {
                    // console.log(
                    //   "HTML ELEMENT POINTS ====> ",
                    //   element.querySelectorAll(".subline>.score")[0].textContent
                    // );
                    points_number = element
                      .querySelectorAll(".subline>.score")[0] //We take the HTML element.
                      .textContent.replace(/[^0-999]/g, ""); // We take the String inside it and discard any no numerical character
                    return parseInt(points_number); // We send it back to  buildLowerArticle()
                  }
                };

                // The function to get the users associated to every article:


                let getUser = function (element) {
                  if (!element.querySelectorAll(".subline>.hnuser")[0]) {
                    // console.log("HTML ELEMENT USER ====> NO USER!");
                    return "none"; // In case we can't find any .score element, 0 points will be attributed to the article.
                  }
                  // console.log(
                  //   "HTML ELEMENT USER ====> ",
                  //   element.querySelectorAll(".subline>.hnuser")[0].textContent
                  // );
                    return element.querySelectorAll(".subline> .hnuser")[0].textContent
                };

                // The function to get the age of each article:

                let getAge = function (element) {
                  if (!element.querySelectorAll(".subline> .age")[0]) {
                    // In some articles, the AGE is located under the a different selector:
                    
                    return "unknown"; //
                  }
                  let creationDate = element.querySelectorAll(".subline> .age")[0].textContent;
                  // console.log(
                  //   "HTML ELEMANT AGE == ==> ",
                  //   element.querySelectorAll(".subline> .age")[0].textContent
                  // );
                  return creationDate;
                };

                let getComments = function (element) {
                  if(!element.querySelectorAll(".subline > a:nth-child(6)")[0]){
                    return "none";
                  }
                  // document.querySelectorAll('.subtext').forEach(e => console.log( e.querySelectorAll(".subline > a:nth-child(6)"))) 
                  // console.log("HI FROM THE GETCOMMENTS FUNCTION => ", element.querySelectorAll(".subline > a:nth-child(6)")[0].textContent);
                  return element.querySelectorAll(".subline > a:nth-child(6)")[0].textContent;
                }

                let buildUpperArticle = function (element) {
                    let title = element.textContent;
                    let url = getURL(element);
                    let obj = Object.values(newArrObj)[0];
                    obj.push({ title, url });
                };

                let buildLowerArticle = function (element) {
                    let points = getPoints(element)
                    let user = getUser(element);
                    let creationDate = getAge(element);
                    let comments = getComments(element)
                    let obj = Object.values(newArrObj)[0];
                    obj.push({ points: points, user, creationDate, comments}); 
                }

                let completeArticle = function () {
                  let crawledArr = Object.values(newArrObj)[0]
                  //Now, we have two separate arrays: one containing title and url, and another one containing points, user, creationDate and comments. 
                  //Here you can see how the elements are pun inside them both:
                  
                  let firstHalf = crawledArr.slice(0, crawledArr.length/2);
                  //I divide between 2 because every article has been crawled twice separatedly (the JSDOM file, not the web itself. We only send one online request), to get each different field. This was necessary due to the HTML structure, where there is an upper block and a lower block dividing each article:

                  let secondHalf = crawledArr.slice(crawledArr.length/2,crawledArr.length);

                  // console.log(firstHalf);
                  // console.log(secondHalf);
                  
                  newArrObj[newArrObjNameString] = []
                  for (x = 0; x < crawledArr.length / 2; x++) {
                    let obj = {
                      //We sum both sides: upper and lower:
                      ...firstHalf[x],
                      ...secondHalf[x],
                    };
                    newArrObj[newArrObjNameString].push(obj);
                  }
                  return newArrObj[newArrObjNameString]
                }
                // I transit the DOM as in any frontend app, using the DOM API methods, and scrape the articles taking into account the two blocks that divide them. For each block, I execute a function with more functions that obtain each single field (they "break down" the block, so to say).

                document.querySelectorAll('span[class="titleline"] > a').forEach(buildUpperArticle);
                document.querySelectorAll('.subtext').forEach(buildLowerArticle);
                completeArticle();
              
                //We insert the page:
                
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
                    
                    Page ${i} here! ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️
                    
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

            //We set the cache for the next possible request.

            cache.set(`pages_first_half`, pages_arr, 10);
            console.log("cached arr => ", cache.data["pages_first_half"]["v"])
            return res.status(200).json({ "NY Combinator Scraped => ": pages_arr })

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
            cache.set(`pages_first_half`, cache.data["pages_first_half"]["v"], 4);

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
        console.log("THE CLIENT REQUESTED MORE PAGES THAT THOSE CACHED ALREADY");
        console.log(pages_arr);
    
        // return res.status(200).json({ "nycombinatorscraped": cache.data["pages_first_half"]["v"].slice(0, sum_of_pages) })

        try {
             //This for loop is dedicated to scrape a page, nothing else:

             for (i = (cache.data["pages_first_half"]["v"].length+1); i <= sum_of_pages; ++i) {

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

                //We create the "page X" entry inside the object: 

                newArrObj[newArrObjNameString] = [];

                // The function to get URLs:

                let getURL = (element) => {
                    return element.href
                }

                // The function to get the points of each article:

                let getPoints = (element) => {
              
                  //We take the element received , which is a HTMLSpanElement {}. Then convert it to a Nodelist via querySelectorAll(). After that, we can substract the points.

                  //We use an if statement, because some articles don't have anything under .subline > .score We can't point to textContent if its father element may come empty!

                  if (!element.querySelectorAll(".subline>.score")[0]) {
                    console.log("HTML ELEMENT POINTS ====> NO POINTS!");
                    return 0; // In case we can't find any .score element, 0 points will be attributed to the article. 
                  } else {
                    console.log(
                      "HTML ELEMENT POINTS ====> ",
                      element.querySelectorAll(".subline>.score")[0].textContent
                    );
                    points_number = element
                      .querySelectorAll(".subline>.score")[0] //We take the HTML element.
                      .textContent.replace(/[^0-999]/g, ""); // We take the String inside it and discard any no numerical character
                    return parseInt(points_number); // We send it back to the buildLowerArticle()
                  }
                };

                // The function to get the users associated to every article:


                let getUser = function (element) {
                  if (!element.querySelectorAll(".subline>.hnuser")[0]) {
                    // console.log("HTML ELEMENT USER ====> NO USER!");
                    return "none"; // In case we can't find any .score element, 0 points will be attributed to the article.
                  }
                  // console.log(
                  //   "HTML ELEMENT USER ====> ",
                  //   element.querySelectorAll(".subline>.hnuser")[0].textContent
                  // );
                  //   return element.querySelectorAll(".subline> .hnuser")[0].textContent
                };

                // The function to get the age of each article:

                let getAge = function (element) {
                  if (!element.querySelectorAll(".subline> .age")[0]) {
                    // In some articles, the AGE is located under the a different selector:
                    
                    let creationDate = element.querySelectorAll(".subtext > .age > a")[0].textContent
                    return creationDate; //
                  }
                  let creationDate = element.querySelectorAll(".subline> .age")[0].textContent;
                  // console.log(
                  //   "HTML ELEMANT AGE == ==> ",
                  //   element.querySelectorAll(".subline> .age")[0].textContent
                  // );
                  return creationDate;
                };

                let getComments = function (element) {
                  if(!element.querySelectorAll(".subline > a:nth-child(6)")[0]){
                    return "none" 
                  }
                  // document.querySelectorAll('.subtext').forEach(e => console.log( e.querySelectorAll(".subline > a:nth-child(6)"))) 
                  // console.log("HI FROM THE GETCOMMENTS FUNCTION => ", element.querySelectorAll(".subline > a:nth-child(6)")[0].textContent);
                  return element.querySelectorAll(".subline > a:nth-child(6)")[0].textContent;
                }

                let buildUpperArticle = function (element) {
                    let title = element.textContent;
                    let url = getURL(element);
                    let obj = Object.values(newArrObj)[0];
                    obj.push({ title, url });
                };

                let buildLowerArticle = function (element) {
                    let points = getPoints(element)
                    let user = getUser(element);
                    let creationDate = getAge(element);
                    let comments = getComments(element)
                    let obj = Object.values(newArrObj)[0];
                    obj.push({ points: points, user, creationDate, comments}); 
                }

                let completeArticle = function () {
                  let crawledArr = Object.values(newArrObj)[0]
                  //Now, we have two separate arrays: one containing title and url, and another one containing points, user, creationDate and comments. 
                  //Here you can see how the elements are pun inside them both:
                  
                  let firstHalf = crawledArr.slice(0, crawledArr.length/2);
                  //I divide between 2 because every article has been crawled twice to get the different fields. This was necessary due to the HTML structure, where there is an upper block and a lower block dividing each article:

                  let secondHalf = crawledArr.slice(crawledArr.length/2,crawledArr.length);
                  // console.log(firstHalf);
                  // console.log(secondHalf);
                  newArrObj[newArrObjNameString] = []
                  let arr = []
                  for (x = 0; x < crawledArr.length / 2; x++) {
                    let obj = {
                      ...firstHalf[x],
                      ...secondHalf[x],
                    };
                    newArrObj[newArrObjNameString].push(obj);
                  }
                  return newArrObj[newArrObjNameString]
                }
                // I transit the DOM as in any frontend app, using the DOM API methods, and with the use of the Array.prototype.forEach() method, I execute the function on every HTML tag containing an article description. There, with the use of element.textContent I extract the text to fill the array. Every article's description will be inside its own object.

                document.querySelectorAll('span[class="titleline"] > a').forEach(buildUpperArticle);
                document.querySelectorAll('.subtext').forEach(buildLowerArticle);
                completeArticle();
              
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
                    
                    Page ${i} here! ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️ ☝️
                    
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
            return res.status(200).json({ "NY Combinator Scraped => ": pages_arr })
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = num;