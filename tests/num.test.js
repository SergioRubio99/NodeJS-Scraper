const num = require("../middlewares/num");

//We add this to increase the time limit!

jest.setTimeout(10000)


// Tests:

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

test("Check whether or not every article entry is an object",
    async () => {
      
        const arr = await num()
        for (i = 0; i < arr.length; i++) {
            expect(arr[i] instanceof Object).toBe(true)
            console.log(typeof arr[i])
        }
    })

test("Check whether or not every article entry is a String",
    async () => {
        const arr = await num()

    })

//For now, the code to test must run before 5 seconds. Jest cannot do test longer than that, and I've not figured out how to overcome that limit yet.