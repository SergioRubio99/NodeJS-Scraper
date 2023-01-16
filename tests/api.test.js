const request = require("supertest");
const app = require("../index");

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
      array = res.body["nycombinator"];
      Array.isArray(array) ? done() : done("Not an array!");
    });
});

it("Each array element is an object", async () => {
  let res = await request(app).get("/"),
  arr = res.body["nycombinator"].slice(0,10)
  arr.forEach((art) => {
    typeof art === "object" ? "" : done("Not an array!");
  });
});
