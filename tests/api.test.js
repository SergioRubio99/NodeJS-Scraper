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
  request(app)
    .get("/4")
    .expect(200)
    .end(function (err, res) {
      res.body.forEach((art) => {
        //each URl must be a link or a none string (see article_url function)
        if (!/http/g.test(art.url) && !/none/g.test(art.url)) {
          throw err
        }
      });
    });

  // !/http/g.test(art) && !/none/g.test(art)
});
