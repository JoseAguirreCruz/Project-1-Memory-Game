
/*----- constants -----*/
const cards = {
  one: './img/csharp.png',
  two: './img/java.png',
  three: '<./img/js.png',
  four: '<./img/python.png',
  five: '<./img/sql.png'
};
console.log(cards)


const restartGameBtn = document.getElementById('RButton')
restartGameBtn.addEventListener('click', function() {
  restartGame()
})

const TIME_LIMIT = 60;
const NUM_PAIRS = 5;
let timeLeft = TIME_LIMIT;
let timerInterval;

/*----- state variables -----*/
let board
let numPairsMatched = 0;
let winner = false;
let time
let card1, card2, symbol1, symbol2;

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
board = createBoard();
shuffleCards(board);
renderBoard(board);
const cards = document.querySelectorAll('.card')
addCardListeners(cards, cards);
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
    let j;
    for (let i = row.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      [row[i], row[j]] = [row[j], row[i]]
    }
  })
}

function renderBoard(board) {
  board.forEach((rowArr, rowIdx) => {
      rowArr.forEach((symbol, colIdx) => {
          const cardEl = document.getElementById(`c${colIdx}r${rowIdx}`);
          cardEl.innerHTML = ``;
          cardEl.classList.remove('flipped', 'matched')
          cardEl.dataset.symbol = symbol;
          cardEl.style.backgroundColor = '#ccc'
      });
  });
}


function addCardListeners(cards) {
  let flippedCards = []
  let symbol;
  cards.forEach(card => {
    card.addEventListener('click', (event) => {
      // console.log('I am inside the event')
      if (card.classList.contains('matched') || flippedCards.length === 2){
      return;
      }
      card.style.backgroundColor = 'white'
      card.classList.add('flipped')
      flippedCards.push(card)
      if (flippedCards.length === 2) {
        // this is where the issue starts
        const [card1, card2] = flippedCards
        symbol1 = card1.dataset.symbol
        symbol2 = card2.dataset.symbol
        if (symbol1 === symbol2) {
          card1.classList.add('matched')
          card2.classList.add('matched')
          numPairsMatched++
          if (numPairsMatched === NUM_PAIRS) {
            winner = true
            endGame()
          }
          flippedCards = []
        } else {
        setTimeout(() => {
          console.log(cards[symbol])
          flippedCards.forEach(card => {
          card.style.backgroundColor = '#ccc'
          card.classList.remove('flipped')
          })
          flippedCards = []
        }, 1000)
        symbol = symbol1 === symbol2 ? symbol1 : undefined
        if (symbol) {
        console.log('hello')
        const imgEl = document.createElement('div')
        imgEl.innerHTML = cards[symbol]
        // imgEl.classList.add('card-img')
        card.appendChild(imgEl)
        console.log('hello')
              }
            } 
          }
        }
    )}
  )}
  

function startTimer() {
  timerInterval = setInterval(() => {
  timeLeft--;
  timerEl.textContent = timeLeft;
  if (timeLeft === 0) {
    endGame()
    }
  }, 1000)
}

function endGame() {
  clearInterval(timerInterval)
  if(winner) {
    alert('Congrats!!, You won!')
  } else {
    alert('Awww, loser!!')
  }
}
console.log(endGame)

const startGameBtn = document.getElementById('SButton');
startGameBtn.addEventListener('click', function() {
});

function restartGame() {
  clearInterval(timerInterval)
  timeLeft = TIME_LIMIT
  numPairsMatched = 0
  winner = false
  time = 0
  board = createBoard()
  shuffleCards(board)
  renderBoard(board)
  const cards = document.querySelectorAll('.card')
  addCardListeners(cards)
  startTimer()
}

init()