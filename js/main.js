// Setting Game Name
let gameName = "Guess The Word Game";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created By Elzero Web School`;

//Setting Game Options
let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// Mange Words / Check
let wordToGass = "";
const words = ["Delete", "Update", "Create"];
wordToGass = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(wordToGass);
const message = document.querySelector(".message");

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGesses);

// Mange Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);

function generateInput() {
  const inputsContainer = document.querySelector(".inputs");
  // console.log(inputsContainer)
  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;
    inputsContainer.appendChild(tryDiv);
    if (i !== 1) tryDiv.classList.add("disabled-inputes");

    // Create Inputes
    for (let j = 1; j <= numberOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
  }
  inputsContainer.children[0].children[1].focus();

  // Disable All Input Except First One
  let inputsInDisable = document.querySelectorAll(".disabled-inputes input");
  inputsInDisable.forEach((input) => (input.disabled = true));

  // Make Input letters Upper
  const inputes = document.querySelectorAll("input");
  inputes.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextIndex = inputes[index + 1];
      if (nextIndex) nextIndex.focus();
    });

    input.addEventListener("keydown", function (event) {
      // console.log(event)
      const currentIndex = Array.from(inputes).indexOf(event.target); // or this
      // console.log(currentIndex)
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputes.length) inputes[nextInput].focus();
      }

      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputes[prevInput].focus();
      }
    });
  });
}

function handleGesses() {
  let successGuess = true;
  for (let i = 1; i <= numberOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGass[i - 1];

    if (letter === actualLetter) {
      inputField.classList.add("yes-in-place");
    } else if (wordToGass.includes(letter) && letter !== "") {
      inputField.classList.add("no-in-place");
      successGuess = false;
    } else if (letter !== actualLetter && letter !== "") {
      inputField.classList.add("no");
      successGuess = false;
    }
  }

  if (successGuess) {
    if(numberOfHints === 2){
      message.innerHTML = `<p>Congratz You Didn't Use Hints <span>${wordToGass}</span></p>`;

    }else{
      message.innerHTML = `<p>You Win The Word Is <span>${wordToGass}</span></p>`;
    }
    const inputAll = document.querySelectorAll(".inputs div");
    inputAll.forEach((input) => input.classList.add("disabled-inputes"));
    guessButton.disabled = true;
    getHintButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputes");
    let currentTryInput = document.querySelectorAll(`.try-${currentTry} input`);
    currentTryInput.forEach((input) => (input.disabled = true));

    currentTry++;

    let nextDiv = document.querySelector(`.try-${currentTry}`);

    if (nextDiv) {
      nextDiv.classList.remove("disabled-inputes");
      let nextTryInput = document.querySelectorAll(`.try-${currentTry} input`);
      nextTryInput.forEach((input) => (input.disabled = false));
      nextDiv.children[1].focus();
    } else {
      guessButton.disabled = true;
      getHintButton.disabled = true;
      message.innerHTML = `<p>You Lose The Word Is <span>${wordToGass}</span></p>`;
    }
  }
}

function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    getHintButton.disabled = true;
  }

  const enabledInput = document.querySelectorAll("input:not([disabled])");
  // console.log(enabledInput);
  const emptyEnabledInput = Array.from(enabledInput).filter(
    (input) => input.value === ""
  );
  // console.log(emptyEnabledInput);
  if (emptyEnabledInput.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInput.length);
    // console.log(randomIndex);
    const randomInput = emptyEnabledInput[randomIndex];
    // console.log(randomInput);
    const indexToFill = Array.from(enabledInput).indexOf(randomInput);

    if (indexToFill !== -1) {
      randomInput.value = wordToGass[indexToFill].toUpperCase();
    }
  }
}

function hadndlBackspace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}

document.addEventListener("keydown", hadndlBackspace);

window.onload = function () {
  generateInput();
};
