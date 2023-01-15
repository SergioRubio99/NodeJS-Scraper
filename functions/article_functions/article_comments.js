let getComments = (element) => {
    // Here, we're looking for the possible number of comments of the article. We extract the number, and in case no number is found, we send 0 as the number of total comments. We try to match with 4,3,2 and 1 digit numbers: 
  
  if (!element.querySelectorAll(".subline > a:nth-child(6)")[0]) {
    commentsNum = 0;
    return commentsNum;
  }
  
  let comments = element.querySelectorAll(".subline > a:nth-child(6)")[0].textContent;

  if (/[0-9]{4}/.test(comments)) {
    commentsNum = parseInt(comments.match(/[0-9]{4}/)[0]);
    return commentsNum;
  }
  if (/[0-9]{3}/.test(comments)) {
    commentsNum = parseInt(comments.match(/[0-9]{3}/)[0]);
    return commentsNum;
  }
  if (/[0-9]{2}/.test(comments)) {
    commentsNum = parseInt(comments.match(/[0-9]{2}/)[0]);
    return commentsNum;
  }
  if (/[0-9]/.test(comments)) {

    commentsNum = parseInt(comments.match(/[0-9]/)[0]);
    return commentsNum;
  }
  commentsNum = 0;
  return commentsNum
};

module.exports = getComments;
