const boardEl = document.getElementById('board');
const squares = Array.from(document.getElementsByClassName('squareF'));
const messageEl = document.querySelector('h1');
const faceCard = Array.from(document.getElementsByClassName('cardFaces'));




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

init();

function init() {
  board = [
    [0, 0, 0, 0, 0]//0
    [0, 0, 0, 0, 0]//1
  ]
  turn = 1
  winner = null
  render()
}

const shuffleCards = board.sort((Arr, idx) => Math.random() - 0.5)