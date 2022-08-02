fetch("../static/data_comment.json")
  .then((response) => {
    return response.json();
  })
  .then((jsondata) => {
    let dataComment = jsondata;
    // console.log(dataComment)
    // var totalComment = dataComment.length;
    // Map Comment
    // dataComment.map(( text ) => {
    //     console.log(text)
    // })
    // console.log(join)
    // const counts = {};
    // join.forEach((x) => {
    //     counts[x] = (counts[x] || 0) + 1;
    // });

    // Table & Total
    // var total = (document.getElementById("total").innerHTML = totalComment);
    $(document).ready(function () {
      $("#example").DataTable({
        data: dataComment,
        columns: [
          {
            data: "author",
          },
          {
            data: "text",
          },
          {
            data: "time",
          },
        ],
        paging: false,
      });
    });
  });

//   Wordcloud

function submitForm() {
  document.getElementById("loading").style.display = "block";
}

fetch("../static/data_parsing.json")
  .then((response) => {
    return response.json()
  })
  .then((jsondata) => {
    let dataParsing = jsondata[0].text
    const findTopThree = (dataParsing = '') => {
      dataParsing = dataParsing
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, " ")
      .toLowerCase();
      const arr = dataParsing.split(' ');
      const map = {};
      arr.forEach(word => {
         map[word] = (map[word] || 0) + 1;
      });
      const res = Array.from(Object.keys(map), key => [key, map[key]]);
      res.sort((a, b) => b[1] - a[1]);
      return [res[0][0], res[1][0], res[2][0], res[3][0], res[4][0]];
   };
   mostArray = findTopThree(dataParsing)
   document.getElementById("mostWords").textContent = mostArray.join(" | ")
   console.log(mostArray);
   
   

    // OLD ==============================================
    // let mostPopular = findMostRepeatedWord(dataParsing)
    // document.getElementById("mostWords").innerHTML = mostPopular
    // console.log(mostPopular)
    // function findMostRepeatedWord(dataParsing) {
    //   let words = dataParsing.match(/\w+/g);
    //   // console.log(words); // [ 'How', 'do', 'you', 'do' ]

    //   let occurances = {};

    //   for (let word of words) {
    //     if (occurances[word]) {
    //       occurances[word]++;
    //     } else {
    //       occurances[word] = 1;
    //     }
    //   }

    //   // console.log(occurances); // { How: 1, do: 2, you: 1 }

    //   let max = 0;
    //   let mostRepeatedWord = '';

    //   for (let word of words) {
    //     if (occurances[word] > max) {
    //       max = occurances[word];
    //       mostRepeatedWord = word;
    //     }
    //   }
    //   document.getElementById("totalWords").innerHTML = max
    //   console.log("Total Words:" + max)
    //   return mostRepeatedWord;
    // }

  })

  