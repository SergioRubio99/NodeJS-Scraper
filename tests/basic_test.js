const app = require("../index");
const request = require("supertest");

module.exports = (pages) => {
    request(app)
    .get(pages)
    .set("Accept", "application/json")
    .expect("Content-Type", "application/json; charset=utf-8")
    .expect(200, done);
}