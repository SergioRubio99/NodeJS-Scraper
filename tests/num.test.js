const num = require("../middlewares/num");

test("The result of the scrape is an array", async () => {
    const arr = await num()
    expect(arr instanceof Array).toBe(true)
})

test("The array does not come empty", async () => {
    const arr = await num()
    expect(arr.length).toBeGreaterThan(0)
})




//For now, the code to test must run before 5 seconds. Jest cannot do test longer than that, and I've not figured out how to overcome that limit yet.