
//We add this to increase the time limit!

jest.setTimeout(60000);


// Tests:


let json;


test("The result of the scrape comes in JSON format",
    async () => {
        //Now, the testing does not work if no numbers are input a URL parameter. I can tweak them to do so, but I find it useless. 

        const response = await fetch("http://localhost:3000/5");
        json = await response.json();
        // console.log("TYPEOF RESPONSE", typeof json)
        expect(typeof json).toBe("object")
    })


test("Inside the object, there is an array with data inside",
    async () => {
        // const response = await fetch("http://localhost:3000/2")
        // const json = await response.json()
        // console.log(`JSON ARR CHECK =>>>

        // `, Array.isArray(json.nycombinatorscraped))
        expect(Array.isArray(json.nycombinatorscraped)).toBe(true)
        expect(json.nycombinatorscraped.length).toBeGreaterThan(0)
    }
)



test("Check whether or not every article entry is an Object with a String inside",
    async () => {
        // const response = await fetch("http://localhost:3000/2");
        // const json = await response.json();
        const arr = json.nycombinatorscraped;
        console.log(`JSON ARR CHECK =>>>
        `, json)

        for (i = 0; i < arr.length; i++) {

            //With the Object.values() method, we conver the page Objects into arrays, and with forEach we unify all the strings into the same array, so we can iterate and check if the content of every article is correct.    

            Object.values(arr[i]).forEach((article_arr) => {

                // We use "<" instead of "<=" because .length starts countin from 1, and the "i" variable needs to be counted from 0, so we can navigate the array index:    

                for (i = 0; i < article_arr.length; i++) {
                    // console.log("element!!! =>")    
                    // console.log(e[i].article)
                    expect(typeof article_arr[i].article == "string").toBe(true)
                    //We want to test that the String is not 0 characters long:
                    expect(article_arr[i].article.length).toBeGreaterThan(0)

                }
            })
        }
    })




