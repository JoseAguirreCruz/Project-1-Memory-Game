
/*----- constants -----*/
const cards = {
  1: "csharp.png",
  2: "java.png",
  3: "js.png",
  4: "python.png",
  5: "sql.png"
}

const TIME_LIMIT = 60;


/*----- state variables -----*/
let board
let winner
let time


/*----- cached elements  -----*/
const boardEl = document.getElementById('board')
const sButton = document.getElementById('SButton')
const rButton = document.getElementById('RButton')
console.log(boardEl, sButton, rButton)


/*----- event listeners -----*/


/*----- functions -----*/