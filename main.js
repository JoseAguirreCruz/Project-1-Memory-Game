const boardEl = document.getElementById('board')
const squaresElF = Array.from(document.getElementsByClassName('squareF'))
const squaresElB = Array.from(document.getElementsByClassName('squareB'))
const messageEl = document.querySelector('h1')
const faceCard = Array.from(document.getElementsByClassName('cardFaces'))

let board
let turn
let winner

const players = {
  0: 'white',
  1: 'player1',
  '-1': 'playuer2'
}

// Event listeners
//ex: someEl.addEventListener('click', handledrop)

// functions

init()

function init() {
  board = [
    [0, 0, 0, 0, 0][(0, 0, 0, 0, 0)] //0 //1
  ]
  turn = 1
  winner = null
  render()
}

function render() {
  renderBoard()
  renderMessage()
}

// const shuffleCards = board.sort((Arr, idx) => Math.random() - 0.5)
document.querySelectorAll('#board').forEach(function (board) {
  board.addEventListener('click', function () {
    this.querySelector('.cardFaces').classList.toggle('flipped')
  })
})

;[...faceCard].forEach((cardArr) => {
  cardArr.addEventListener('click', function () {
    cardArr.classList.toggle('is-flipped')
  })
})

//flipCardBack
function flipCard() {
  setTimeout(function () {
    squaresElF.classList.remove('squareF')
    squaresElF.classList.remove('squareB')
  }, 3000)
  flipCardFront()
}

function renderBoard() {
  board.forEach(function (pArr, pIdx) {
    if (Array.isArray(pArr)) {
      pArr.forEach(function(Arr, idx) {
        const squareId = `${pIdx}${idx}`
        const squareEl = document.getElementById(squareId)
        const cardImg = document.createElement('img')
        cardImg.src = 'card_back.png'
        squareEl.appendChild(cardImg)
      })
    }
  })
}



function renderMessage() {
  if (winner === 'T') {
    messageEl.textContent = `It's a draw!`
  } else if (winner) {
    let currentPlayer = players[winner]
    messageEl.innerHTML = `<span style="color: ${currentPlayer};">${currentPlayer.toUpperCase()}</span> Wins!`
  } else {
    let currentPlayer = players[turn]
    messageEl.innerHTML = `<span style="color: ${currentPlayer};">${currentPlayer.toUpperCase()}</span>'s Turn...`
  }
}
