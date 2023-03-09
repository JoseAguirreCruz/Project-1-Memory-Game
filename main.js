
/*----- constants -----*/
const cards = {
  1: "csharp.png",
  2: "java.png",
  3: "js.png",
  4: "python.png",
  5: "sql.png"
}

const TIME_LIMIT = 60;
let timeLeft = TIME_LIMIT;
let timerInterval;

/*----- state variables -----*/
let board
let winner
let time

const startTimer = () => {
  timerInterval = setInterval(() => {
    timeLeft--;
    // Update the timer display
    document.getElementById("time").textContent = timeLeft;
    // Stop the timer when time is up
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      return
    }
  }, 1000);
};
/*----- cached elements  -----*/
const boardEl = document.getElementById('board')
const sButton = document.getElementById('SButton')
const rButton = document.getElementById('RButton')
const timerEl = document.getElementById('time')

/*----- event listeners -----*/

document.getElementById("SButton").addEventListener("click", () => {
  startTimer();
});
/*----- functions -----*/