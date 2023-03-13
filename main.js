const card_images = [
  './img/csharp.png',
  './img/java.png',
  './img/js.png',
  './img/python.png',
  './img/sql.png'
]

const restartGameBtn = document.getElementById('RButton')
restartGameBtn.addEventListener('click', function () {
  restartGame()
})

const TIME_LIMIT = 60
const NUM_PAIRS = 5
let timeLeft = TIME_LIMIT
let timerInterval
let board
let numPairsMatched = 0
let winner = false
let time
let card1, card2, symbol1, symbol2



const boardEl = document.getElementById('board')
const sButton = document.getElementById('SButton')
const rButton = document.getElementById('RButton')
const timerEl = document.getElementById('time')

document.getElementById('SButton').addEventListener('click', () => {})

function init() {
  board = createBoard()
  shuffleCards(board)
  renderBoard(board)
  const cards = document.querySelectorAll('.card')
  addCardListeners(cards, cards)
}

function createBoard() {
  const rows = 2
  const cols = 5
  const symbols = Object.keys(card_images)
  const pairs = []
  for (let i = 0; i < NUM_PAIRS; i++) {
    const symbol = symbols[i]
    pairs.push(symbol, symbol)
  }
  const board = []
  for (let row = 0; row < rows; row++) {
    const rowArr = []
    for (let col = 0; col < cols; col++) {
      const idx = col
      const symbol = idx
      rowArr.push(symbol)
    }
    board.push(rowArr)
  }
  return board
}

function shuffleCards(board) {
  board.forEach((rowArr, rowIdx) => {
    rowArr.forEach((symbol, colIdx) => {
      let tmp = board[rowIdx][colIdx]
      let randRow = Math.floor(Math.random() * board.length)
      let randCol = Math.floor(Math.random() * rowArr.length)
      board[rowIdx][colIdx] = board[randRow][randCol]
      board[randRow][randCol] = tmp
    })
  })
}

function renderBoard(board) {
  board.forEach((rowArr, rowIdx) => {
    rowArr.forEach((symbol, colIdx) => {
      const cardEl = document.getElementById(`c${colIdx}r${rowIdx}`)
      cardEl.innerHTML = ``
      cardEl.classList.remove('flipped', 'matched')
      cardEl.dataset.symbol = symbol
      cardEl.style.backgroundColor = '#ccc'
    })
  })
}

function addCardListeners(cards) {
  let flippedCards = []
  let symbol
  cards.forEach((card) => {
    card.addEventListener('click', (event) => {
      if (card.classList.contains('matched') || flippedCards.length === 2 || timeLeft === TIME_LIMIT) {
        return
      }
      symbol = parseInt(card.dataset.symbol)
      if (!card.classList.contains('flipped')) {
        card.style.backgroundColor = 'grey'
        card.classList.add('flipped')
        flippedCards.push(card)
        const imgEl = document.createElement('img')
        imgEl.id = card.id + '-img'
        imgEl.src = card_images[symbol]
        card.appendChild(imgEl)
      }
      if (flippedCards.length === 2) {
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
            flippedCards.forEach((card) => {
              card.style.backgroundColor = '#ccc'
              card.classList.remove('flipped')
              document.getElementById(card.id + '-img').remove()
            })
            flippedCards = []
          }, 1000)
        }
      }
    })
  })
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--
    timerEl.textContent = timeLeft
    if (timeLeft === 0) {
      endGame()
    }
  }, 1000)
}

function endGame() {
  clearInterval(timerInterval)
  if (winner) {
    alert('Congrats!!, You won!')
  } else {
    alert('Awww, loser!!')
  }
}

const startGameBtn = document.getElementById('SButton')
startGameBtn.addEventListener('click', function () {
  if (timeLeft === 0) {
    alert('Time is up!')
  } else {
    startTimer()
  }
})

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
