//We add this to increase the time limit!

jest.setTimeout(10000);

// Tests:

let json;

test("The result of the scrape comes in JSON format", async () => {
  //Now, the testing does not work if no numbers are inputted as URL parameter. I can tweak them to do so, but I find it useless.

  const response = await fetch("http://localhost:3000/4");
  json = await response.json();
  // console.log("TYPEOF RESPONSE", typeof json)
  expect(typeof json).toBe("object");
});

test("Inside the object, there is an array with data inside", () => {
  // const response = await fetch("http://localhost:3000/2")
  // const json = await response.json()
  // console.log(`JSON ARR CHECK =>>>

  // `, json)
  expect(Array.isArray(json.nycombinatorscraped)).toBe(true);
  expect(json.nycombinatorscraped.length).toBeGreaterThan(0);
});

test("Check whether or not every page entry is an Object with an Array filled with data", () => {
  // const response = await fetch("http://localhost:3000/2");
  // const json = await response.json();
  const arr = json.nycombinatorscraped;
  // console.log(`JSON PAGES ARR CHECK =>>>
  // `, json.nycombinatorscraped)

  for (i = 0; i < arr.length; i++) {
    //With the Object.values() method, we convert the page Objects into arrays, and with forEach we unify all the strings into the same array, so we can iterate and check if the content of every article is correct.
    Object.values(arr[i]).forEach((page_arr) => {
      console.log("PAGE ARR =>", page_arr.length);
      expect(Array.isArray(page_arr)).toBe(true);
      expect(page_arr.length).toBeGreaterThan(0);
    });
  }
});

test("Check whether or not every article is an Object with 5 entries", () => {
  // const response = await fetch("http://localhost:3000/2");
  // const json = await response.json();
  const arr = json.nycombinatorscraped;
  //    console.log(`JSON PAGES ARR CHECK =>>>
  //    `, json.nycombinatorscraped);

  for (i = 0; i < arr.length; i++) {
    //With the Object.values() method, we convert the page Objects into arrays, and with forEach we unify all the strings into the same array, so we can iterate and check if the content of every article is correct.
    Object.values(arr[i]).forEach((page_arr) => {
      //    console.log("PAGE ARR =>", page_arr)
      page_arr.forEach((article) =>
        expect(Object.entries(article).length).toBe(6)
      );
    });
  }
});

test("Check fields: title, url, points, user, creationDate, comments", () => {
  // const response = await fetch("http://localhost:3000/2");
  // const json = await response.json();
  const arr = json.nycombinatorscraped;
  console.log(
    `JSON PAGES ARR CHECK =>>>
      `,
    json.nycombinatorscraped
  );

  for (i = 0; i < arr.length; i++) {
    //With the Object.values() method, we convert the page Objects into arrays, and with forEach we unify all the strings into the same array, so we can iterate and check if the content of every article is correct.
    Object.values(arr[i]).forEach((page_arr) => {
      //Inside the pages arr, we iterate over every article, and inside every article we iterate over every element:
      console.clear();
      page_arr.forEach((article) => {
        let articleObjArr = Object.values(article);
        //-----------------------------
        //title test:
        expect(typeof articleObjArr[0]).toBe("string");
        expect(articleObjArr[0].length).toBeGreaterThan(0);
        // console.log(articleObjArr[0]);
        //-----------------------------
        // url test:
        expect(typeof articleObjArr[1]).toBe("string");
        expect(articleObjArr[1].length).toBeGreaterThan(8);
        // console.log(articleObjArr[1]);
        //-----------------------------
        // points test:
        expect(typeof articleObjArr[2]).toBe("number");
        expect(articleObjArr[2] < 0).toBe(false);
        // console.log(articleObjArr[2]);
        //-----------------------------
        // user test:
        expect(typeof articleObjArr[3]).toBe("string");
        expect(articleObjArr[3].length).toBeGreaterThan(1);
        // console.log(articleObjArr[3]);
        //-----------------------------
        // creationDate test:
        expect(typeof articleObjArr[4]).toBe("string");
        //Why do I choose 7 as minimum length required? Because it is the length of the termm "unknown". This is what getAge() function will deliver if no date is placed into the array
        expect(articleObjArr[4].length).toBeGreaterThan(6);
        //-----------------------------
        // comments test:
        expect(articleObjArr[5].length).toBeGreaterThan(3);
        console.log(articleObjArr[5]);

        return;
      });
    });
  }
});
 