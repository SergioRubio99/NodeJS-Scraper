let getPoints = (element) => {
  //We use an if statement, because some articles don't have anything under .subline > .score We can't point to textContent if its father element may come empty!

  if (!element.querySelectorAll(".subline>.score")[0]) {
    console.log("HTML ELEMENT POINTS ====> NO POINTS!");
    return 0; // In case we can't find any .score element, 0 points will be attributed to the article.
  } else {
    points_number = element
      .querySelectorAll(".subline>.score")[0] //We take the HTML element.
      .textContent.replace(/[^0-999]/g, ""); // We take the String inside it and discard any character that isn't numerical.
    return parseInt(points_number); // We send it back to  buildLowerArticle()
  }
};

module.exports = getPoints;
