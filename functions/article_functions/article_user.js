let getUser = (element) => {
    if (!element.querySelectorAll(".subline>.hnuser")[0]) {
        return "none"; // In case we can't find any .score element, 0 points will be attributed to the article.
      }
      return element.querySelectorAll(".subline> .hnuser")[0].textContent;
}

module.exports = getUser;