let getAge = (element) => {
    if (!element.querySelectorAll(".subline> .age")[0]) {
        // In some articles, age is located under the a different selector:
        if(element.querySelectorAll(".subtext > .age > a")){
          let age = element.querySelectorAll(".subtext > .age > a")[0].textContent;
          return age.slice(0,-4); //
        }
      }
      let age = element.querySelectorAll(".subline> .age")[0].textContent;
      return age.slice(0,-4);
}

module.exports = getAge;