let alphabet = {
  a: false,
  b: false,
  c: false,
  d: false,
  e: false,
  f: false,
  g: false,
  h: false,
  i: false,
  j: false,
  k: false,
  l: false,
  m: false,
  n: false,
  o: false,
  p: false,
  q: false,
  r: false,
  s: false,
  t: false,
  u: false,
  v: false,
  w: false,
  x: false,
  y: false,
  z: false,
};

let totalScore = 0;

let words = ["overt", "coven", "prime", "trove", "write", "trite", "could"];
let letters = words[0].split("");

console.log(letters);

/// DOM ELEMENTS
let wordForm = document.querySelector(".word");
const button = document.getElementById("score");
const result = document.getElementById("result");
const alphabetList = document.getElementById("alphabet");
let allForms = document.querySelectorAll(".word");

Object.entries(alphabet).forEach(([key, value]) => {
  alphabetList.insertAdjacentHTML(
    "beforeend",
    `<li data-used=${value} data-letter=${key}>${key}</li`
  );
});

allForms.forEach((form) => {
  for (const [index, value] of letters.entries()) {
    document
      .querySelector(`#${form.id} input:nth-child(${index + 1})`)
      .setAttribute("data-id", value);
  }
});

/// EVENT LISTENERS

document.addEventListener("input", function (e) {
  console.log(e.target);
  if (e.target.parentElement.classList.contains("word")) {
    if (e.target.nextElementSibling && e.target.value) {
      e.target.nextElementSibling.focus();
      if (e.target.nextElementSibling.tagName === "INPUT") {
        e.target.nextElementSibling.select();
      }
    }
  }
});

document.addEventListener("submit", function (e) {
  console.log(e);
  if (e.target.classList.contains("word")) {
    let guess = e.target;
    e.preventDefault();
    //collect guessed word
    let inputs = document.querySelectorAll(`#${guess.id} input`);
    console.log(inputs);
    let guessedWord = [];
    inputs.forEach((el) => guessedWord.push(el.value));
    validateWord(guessedWord.join(""), guess.id);

    // score(guess.id);
  }
});
// is the guess a  real word?
function validateWord(word, id) {
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
  // const catUrl = "https://catfact.ninja/fact";
  console.log(`${url}${word}`);

  fetch(`${url}${word}`, {})
    .then((response) => response.json())
    .then((data) => {
      if (data.length) {
        console.log("word!");
        // alert("this is a word");

        //close this form
        document.querySelector(`#${id} button`).classList.add("complete");
        document
          .querySelector(`#${id} button`)
          .setAttribute("disabled", "true");
        score(id);
      } else {
        console.log("nope!");
        // alert("that is not a word");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// ARE THE GUESSES RIGHT?
function score(form) {
  let score = 0;
  let guesses = document.querySelectorAll(`#${form} input`);
  let guessedWord = [];
  guesses.forEach((letter) => {
    guessedWord.push(letter.value);
    if (letter.value === letter.dataset.id) {
      letter.className = "letter-correct";
      score++;
      document
        .querySelector(`[data-letter=${letter.value}]`)
        .setAttribute("data-used", "yes");
    }
    if (letter.value !== letter.dataset.id) {
      if (
        letter.value !== letter.dataset.id &&
        letters.find((l) => {
          return l === letter.value;
        })
      ) {
        letter.className = "letter-maybe";
        document
          .querySelector(`[data-letter=${letter.value}]`)
          .setAttribute("data-used", "maybe");
      } else {
        letter.className = "letter-wrong";
        document
          .querySelector(`[data-letter=${letter.value}]`)
          .setAttribute("data-used", "no");
      }
    }
  });
  console.log(totalScore, score);
  totalScore = score;
  if (totalScore === 5) {
    result.textContent = "Congratulations!";
    result.style.opacity = "1";
  }

  if (document.querySelector(`#${form}`).nextElementSibling && totalScore < 5) {
    let nextForm = document.querySelector(`#${form}`).nextElementSibling;
    nextForm.classList.toggle("hidden");
    document.querySelector(`#${nextForm.id} input`).focus();
    document.querySelector(`#${nextForm.id} input`).select();
  }
}

console.log(
  letters.find((letter) => {
    return letter === "q";
  })
);

// function checkWord(word) {
//   validateWord(word).then((a) => {
//     return a;
//   });
// }

// let noWord = validateWord("blorpity");
// let realWord = validateWord("radish");
