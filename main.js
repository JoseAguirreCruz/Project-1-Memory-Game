const boardEl = document.getElementById('board')
const squaresElF = Array.from(document.getElementsByClassName('squareF'))
const squaresElB = Array.from(document.getElementsByClassName('squareB'))
const messageEl = document.querySelector('h1')
const faceCard = Array.from(document.getElementsByClassName('cardFaces'))


const players = {
  0: 'white',
  1: 'player1',
  '-1': 'player2'
}

const cards = [
  {
  name: "java",
  img: "java.png",
  id: 1,
  },
  {
    name: "c#",
    img: "c#.png",
    id: 2,
  },
  {
    name: "py",
    img: "pything.png",
    id: 3,
  },
  {
    name: "js",
    img: "js.png",
    id: 4,
  },
  {
    name: "sql",
    img: "sql.png",
    id: 5
  }
]

let board
let turn
let winner
let counter = cards.length + 5;

// Event listeners
//ex: someEl.addEventListener('click', handledrop)

// functions

init(cards)

function init() {
  board = [
    [0, 0, 0, 0, 0],//0
    [0, 0, 0, 0, 0] //1
  ]
  turn = 1
  winner = null
  render()
}

function render() {
  renderBoard(board)
  renderMessage()
}

// const shuffleCards = board.sort((Arr, idx) => Math.random() - 0.5)
function shuffleCards(array) {
  return array.sort(() => Math.random() - 0.5);
}
const shuffledArray = shuffleCards(cards);


document.querySelectorAll('#board').forEach(function (board) {
  board.addEventListener('click', function () {
    this.querySelector('.cardFaces').classList.toggle('flipped')
  })
});

  [...faceCard].forEach((cardArr) => {
  cardArr.addEventListener('click', function () {
    cardArr.classList.toggle('is-flipped')
  })
})

//flipCardBack
function flipCard(cardEl) {
  cardEl.classList.toggle('flipped');
}

function renderBoard(board) {
  const cardImages = ['card_back.png', 'java.png', 'c#.png', 'python.png', 'js.png', 'sql.png']
  board.forEach(function (pArr, pIdx) {
    if (Array.isArray(pArr)) {
      pArr.forEach(function(Arr, idx) {
        const squareId = `${pIdx}${idx}`
        const squareEl = document.getElementById(squareId)
        if (squareEl) { 
          const cardImg = document.createElement('img')
          const cardIndex = pIdx * 2 + idx
          cardImg.src = cardImages[cardIndex]
          squareEl.appendChild(cardImg)
        }
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

