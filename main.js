
/*----- constants -----*/
const cards = {
  one: 'csharp.png',
  two: 'java.png',
  three: 'js.png',
  four: 'python.png',
  five: 'sql.png'
};


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


function addCardListeners() {
  const cards = document.querySelectorAll('.card')
  let flippedCards = []
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('matched') || flippedCards.length === 2){
      return;
      }
      card.style.backgroundColor = 'white'
      card.classList.add('flipped')
      flippedCards.push(card)
      if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards
        const symbol1 = card1.dataset.symbol
        const symbol2 = card2.dataset.symbol
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
          flippedCards.forEach(card => {
          card.style.backgroundColor = '#ccc'
          card.classList.remove('flipped')
          })
          flippedCards = []
        }, 1000)
        // let isMatch = symbol1 === symbol2
        // if(isMatch) {
        //   card1.classList.add('matched')
        //   card2.classList.add('matched')
        //   numPairsMatched++;
        //   if(numPairsMatched === NUM_PAIRS) {
        //     winner = true
        //     endGame()
        const imgEl = document.createElement('img')
        imgEl.src = cards[card.dataset.symbol]
        // imgEl.classList.add('card-img')
        card.appendChild(imgEl)
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
  addCardListeners()
  startTimer()
}

init()