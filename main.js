const boardEl = document.getElementById('board');
const squares = Array.from(document.getElementsByClassName('square'));
const messageEl = document.querySelector('h1');



let board
let turn
let winner

const players = {
  0: 'white',
  1: 'player1',
  '-1': 'playuer2'
}
console.log(players)