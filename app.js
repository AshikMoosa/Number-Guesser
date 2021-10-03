//Game val
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

//UI elem
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessInput = document.querySelector("#guess-input"),
  guessBtn = document.querySelector("#guess-btn"),
  message = document.querySelector(".message");

//assign ui min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener("click", function () {
  const guess = parseInt(guessInput.value);

  //validations
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number btw ${min} and ${max}`, "red");
  }

  //Check if won
  if (guess === winningNum) {
    gameOver(true, `${guess} is the correct num, YOU WIN!! `);
  } else {
    //wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      //GameOver - lost
      gameOver(
        false,
        `Game Over, YOU LOST!! , The correct num was ${winningNum} `
      );
    } else {
      //Game continues
      guessInput.style.borderColor = "red";
      guessInput.value = "";
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");
    }
  }
});

//game over
function gameOver(won, msg) {
  won === true ? (color = "green") : (color = "red");
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  setMessage(msg, color);

  //Play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

//Get Winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//show message
function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}
