const num = require("../middlewares/num");

//We add this to increase the time limit!

jest.setTimeout(60000)


// Tests:

test("Check whether or not every article entry is an Object with a String inside",
    async () => {
        const arr = await fetch("http://localhost:3000/2")
        for (i = 0; i < arr.length; i++) {

            //With the Object.values() method, we conver the page Objects into arrays, and with forEach we unify all the strings into the same array, so we can iterate and check if the content of every article is correct.

           Object.values(arr[i]).forEach((e) => {
               
                // We use "<" instead of "<=" because .length starts countin from 1, and the "i" variable needs to be counted from 0, so we can navigate the array index:

                for (i = 0; i < e.length; i++) {
                    // console.log("element!!! =>")
                    // console.log(e[i].article)
                    expect(typeof e[i].article == "string").toBe(true)
                }
            })
        }
    })


test("The result of the scrape is an array",
    async () => {
        const arr = await num()
        expect(arr instanceof Array).toBe(true)
    })

test("The array does not come empty",
    async () => {
        const arr = await num()
        expect(arr.length).toBeGreaterThan(0)
    })

