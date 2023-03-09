
/*----- constants -----*/
const cards = {
  '🐶': 'csharp.png',
  '🐱': 'java.png',
  '🐻': 'js.png',
  '🐰': 'python.png',
  '🦊': 'sql.png'
};


const TIME_LIMIT = 60;
const NUM_PAIRS = 5;
let timeLeft = TIME_LIMIT;
let timerInterval;

/*----- state variables -----*/
let board
let numPairsMatched = 0;
let winner = false;
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
});
/*----- functions -----*/

/////////////////////////////////////////////////////////

function init() {
const board = createBoard();
shuffleCards(board);
renderBoard(board);
addCardListeners();
startTimer();
}


function createBoard() {
  const rows = 2;
  const cols = 5; 
  const symbols = Object.keys(cards);
  const pairs = [];
  for (let i = 0; i < NUM_PAIRS; i++) {
    const symbol = symbols[i];
    pairs.push(symbol, symbol);
  }
  const board = [];
  for (let row = 0; row < rows; row++) {
    const rowArr = [];
      for (let col = 0; col < cols; col++) {
        const idx = Math.floor(Math.random() * pairs.length);
        const symbol = pairs.splice(idx, 1)[0];
        rowArr.push(symbol);
      }
      board.push(rowArr);
  }
  return board;
}

function shuffleCards(board) {
  board.forEach(row => {
    for (let i = row.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      [row[i], row[j]] = [row[j], row[i]]
    }
  })
}

function renderBoard(board) {
  board.forEach((rowArr, rowIdx) => {
      rowArr.forEach((symbol, colIdx) => {
          const cardEl = document.getElementById(`c${colIdx}r${rowIdx}`);
          cardEl.innerHTML = `<img src="${cards[symbol]}">`;
      });
  });
}


function addCardListeners() {
}

function startTimer() {
  timerInterval = setInterval(() => {
  timeLeft--;
  timerEl.textContent = timeLeft;
  if (timeLeft === 0) {
    endGame()
    }
  }, 1000)
}

const startGameBtn = document.getElementById('SButton');
startGameBtn.addEventListener('click', init);
