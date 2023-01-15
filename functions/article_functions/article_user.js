let getUser = (element) => {
    if (!element.querySelectorAll(".subline>.hnuser")[0]) {
        // console.log("HTML ELEMENT USER ====> NO USER!");
        return "none"; // In case we can't find any .score element, 0 points will be attributed to the article.
      }
      // console.log(
      //   "HTML ELEMENT USER ====> ",
      //   element.querySelectorAll(".subline>.hnuser")[0].textContent
      // );
      return element.querySelectorAll(".subline> .hnuser")[0].textContent;
}

module.exports = getUser;