let totalScore = 0;

let words = ["worst", "potato"];
let letters = words[0].split("");

console.log(letters);

/// DOM ELEMENTS
let wordForm = document.querySelector(".word");
const button = document.getElementById("score");
const result = document.getElementById("result");
let allForms = document.querySelectorAll(".word");

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
    score(guess.id);
    document.querySelector(`#${guess.id} button`).classList.add("complete");
    document
      .querySelector(`#${guess.id} button`)
      .setAttribute("disabled", "true");

    if (
      document.querySelector(`#${guess.id}`).nextElementSibling &&
      totalScore < 5
    ) {
      let nextForm = document.querySelector(`#${guess.id}`).nextElementSibling;
      nextForm.classList.toggle("hidden");
      document.querySelector(`#${nextForm.id} input`).focus();
      document.querySelector(`#${nextForm.id} input`).select();
    }
  }
});

// ARE THE GUESSES RIGHT?
function score(form) {
  let score = 0;
  let guesses = document.querySelectorAll(`#${form} input`);
  guesses.forEach((letter) => {
    if (letter.value === letter.dataset.id) {
      letter.className = "letter-correct";
      score++;
    }
    if (letter.value !== letter.dataset.id) {
      if (
        letter.value !== letter.dataset.id &&
        letters.find((l) => {
          return l === letter.value;
        })
      ) {
        letter.className = "letter-maybe";
      } else {
        letter.className = "letter-wrong";
      }
    }
  });
  totalScore = score;
  if (totalScore === 5) {
    result.textContent = "Congratulations!";
    result.style.opacity = "1";
  }
}

console.log(
  letters.find((letter) => {
    return letter === "q";
  })
);
