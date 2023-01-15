
const getPoints = require("./article_points");
const getUser = require("./article_user");
const getComments = require("./article_comments");
const getAge = require("./article_age");

const buildLowerArticle = (article_side) => {
    console.log(article_side);
    let points = getPoints(article_side);
    let user = getUser(article_side);
    let creationDate = getAge(article_side);
    let comments = getComments(article_side);
}

module.exports = buildLowerArticle