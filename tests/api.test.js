const request = require("supertest");
const app = require("../index");
const expect = require("chai").expect;



let res;
let artsArr;
it("respond with json containing an array", async () => {
  res = await request(app).get("/4");
  artsArr = res.body
  expect(Array.isArray(artsArr)).to.eql(true)
});

it("Each array element is an object", async () => {
    artsArr.slice(0, 10).forEach((art) => {
    expect(typeof art == "object").to.eql(true);
  });
});

it("Each article element has 6 entries", async () => {
  artsArr.forEach((art) => {
      expect(Object.keys(art).length).to.eql(6)
  });
});

it("Each title, user or age field, contains a String", async () => {
  artsArr.forEach((art) => {
      expect(typeof art.title === "string").to.eql(true);
      expect(typeof art.user === "string").to.eql(true);
      expect(typeof art.age === "string").to.eql(true);
  });
});

it("Each URL element is a String with an URL or 'none' inside", async () => {
  artsArr.forEach(art => {
    if(!/http/g.test(art.url)){
      expect(/none/g.test(art.url)).to.eql(true)
    }
  })
  // !/http/g.test(art) && !/none/g.test(art)
});
