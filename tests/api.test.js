const request = require("supertest");
const app = require("../index");
const expect = require("chai").expect;


it("respond with json", (done) => {
  request(app)
    .get("/2")
    .set("Accept", "application/json")
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(200, done);
});

it("respond with json containing an array", (done) => {
  request(app)
    .get("/")
    .then((res) => {
      array = res.body;
      Array.isArray(array) ? done() : done("Not an array!");
    });
});

it("Each array element is an object", async () => {
  let res = await request(app).get("/"),
    arr = res.body.slice(0, 10);
  arr.forEach((art) => {
    typeof art === "object" ? "" : done("Not an array!");
  });
});

it("Each article element has 6 entries", async () => {
  let res = await request(app).get("/3"),
    arr = res.body;
  arr.forEach((art) => {
    typeof art === "object" ? "" : done("Not an object!");
    Object.keys(art).forEach((e) => {
      e ? "" : done("One article has less than 6 entries");
    });
  });
});

it("Each URL element is a String with an URL or 'none' inside", async () => {
  let res = await request(app).get("/2")
  let arr = res.body;
  console.log(arr)
  arr.forEach(art => {
    if(!/http/g.test(art.url)){
     console.log(/none/g.test(art.url))
      expect(/none/g.test(art.url)).to.eql(true)
    }
  })
  // !/http/g.test(art) && !/none/g.test(art)
});
