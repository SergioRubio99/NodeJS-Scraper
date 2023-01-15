const getUrl = require("./article_url");
const buildUpperArticle = (article_side) => {
    let title = article_side.textContent;
    let url = getUrl(article_side);
    return {title, url};
}

module.exports = buildUpperArticle;