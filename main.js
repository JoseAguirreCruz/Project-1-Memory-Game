
/*----- constants -----*/
const cards = {
  '🐶': 'csharp.png',
  '🐱': 'java.png',
  '🐻': 'js.png',
  '🐰': 'python.png',
  '🦊': 'sql.png'
};


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
  const symbols = ['🐶', '🐱', '🐻', '🐰', '🦊', '🐸', '🐼', '🐨']; 
  const board = [];
  for (let row = 0; row < rows; row++) {
    const rowArr = [];
      for (let col = 0; col < cols; col++) {
            const symbol = symbols[Math.floor(Math.random() * symbols.length)];
          rowArr.push(symbol);
      }
      board.push(rowArr);
  }
  return board;
}

function shuffleCards(board) {
  const cards = board.flat();
  for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  let idx = 0;
  for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
          board[row][col] = cards[idx];
          idx++;
      }
  }
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

const startGameBtn = document.getElementById('SButton');
startGameBtn.addEventListener('click', init);
