// const boardEl = document.getElementById('board')
// const squaresElF = Array.from(document.getElementsByClassName('squareF'))
// const squaresElB = Array.from(document.getElementsByClassName('squareB'))
const messageEl = document.querySelector('h1')
// const faceCard = Array.from(document.getElementsByClassName('cardFaces'))
const boardEl = document.getElementById("board");
const cardsEl = Array.from(document.getElementsByClassName("card"));

const players = {
  0: 'white',
  1: 'player1',
  '-1': 'player2'
}

const cards = [
  { name: "java", img: "java.png" },
  { name: "c#", img: "csharp.png" },
  { name: "py", img: "python.png" },
  { name: "js", img: "js.png" },
  { name: "sql", img: "sql.png" }
];



// let board
// let turn
// let winner
let firstCard = null;

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
// function flipCard() {
//   setTimeout(function () {
//     squaresElF.forEach(function (squareEl) {
//       squareEl.classList.remove('squareF')
//       squareEl.classList.remove('squareB')
//     })
//   }, 3000)
// }


function shuffleCards(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const shuffledCards = shuffleCards(cards);

shuffledCards.forEach(card => {
  const cardEl = document.createElement("div");
  cardEl.classList.add("card");
  cardEl.dataset.cardName = card.name;
  cardEl.innerHTML = `
    <div class="card-face card-face-front"></div>
    <div class="card-face card-face-back">
      <img src="${card.img}">
    </div>
  `;
  boardEl.appendChild(cardEl);
});

document.querySelectorAll('#board .cardFaces').forEach(function (cardEl) {
  cardEl.addEventListener('click', function () {
    flipCard(cardEl)
  })
});

//   [...faceCard].forEach((cardArr) => {
//   cardArr.addEventListener('click', function () {
//     cardArr.classList.toggle('is-flipped')
//   })
// })


function renderBoard(board) {
  board.forEach(function (pArr, pIdx) {
    if (Array.isArray(pArr)) {
      pArr.forEach(function(Arr, idx) {
        const squareId = `${pIdx}${idx}`
        const squareEl = document.getElementById(squareId)
        if (squareEl) { 
          const cardImg = document.createElement('img')
          const cardIndex = pArr[idx] * 2 + pIdx
          cardImg.src = shuffledCards[cardIndex].img
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

