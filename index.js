$(document).ready(function(){
  console.log('ready!');

  const winningCombos = [
                        [0,1,2],
                        [3,4,5],
                        [6,7,8],
                        [0,3,6],
                        [1,4,7],
                        [2,5,8],
                        [0,4,8],
                        [2,4,6]
                      ];
  const x = "X";
  const o = "O";
  let playerO, playerX;
  let xCombo = [];
  let oCombo = [];
  let turn = true; // turn == true ? playerX : playerO


// every cell is an object {id: state}

// Starting Situation

// First check if the cell is clickable:
// clickable if it hasn't been clicked yet

// first click is for x, when click on a cell:
// 1- change the html
// 2- store the cell id to xCombo
// 3- mark the cell as clicked so it cannot be clicked again
// 4- pass the selection to o

function takeTurn(){
  return !turn;
}

function whoPlay() {
  if(turn){
    return "X";
  }else {
    return "O";
  }
}

$('.cell').click(function(){
  // const cellId = $(this).attr('id');
  // xCombo.push(cellId);
  // $(this).html(x);
  // console.log(xCombo);

  takeTurn();
  setTimeout(function(){
      console.log(whoPlay());
  },10);

});

//---------------------------------------------------------------------------
let counter = 0;
let gameBoard = [];
let gameResult = "";

const winningCombos = [
                      [0,1,2],
                      [3,4,5],
                      [6,7,8],
                      [0,3,6],
                      [1,4,7],
                      [2,5,8],
                      [0,4,8],
                      [2,4,6]
                    ];

function newBoard(){
  for(let i = 0; i < 9; i++){
    gameBoard.push('empty');
  }
  // return gameBoard;
}

function whoPlay(){
  if(counter % 2 === 0){
    return 'X';
  }else{
    return 'O';
  }
}

function clickOnCell(where, who){
  if(gameBoard.every(cell => cell != 'empty')){
    return 'No more moves';
  }
  for(let i=0; i< gameBoard.length; i++){
    if(i+"" === where && gameBoard[i] === 'empty'){
      gameBoard[i] = who;
      counter++;
    }
    gameResult = checkWin();
    if(gameResult != 'tie'){
      gameReset();
      return `the winner is ${gameResult}`;
    }
  }
}

// playing
// newBoard(); //call on a new board
gameReset();
console.log(clickOnCell('4', whoPlay())); // first player is X
console.log(clickOnCell('0', whoPlay()));
console.log(clickOnCell('6', whoPlay()));
console.log(clickOnCell('2', whoPlay()));
console.log(clickOnCell('8', whoPlay()));
console.log(counter);
console.log(clickOnCell('1', whoPlay()));
console.log(counter);
console.log(clickOnCell('7', whoPlay()));
console.log(counter);
console.log(clickOnCell('3', whoPlay()));
console.log(clickOnCell('5', whoPlay()));
console.log(clickOnCell('4', whoPlay()));

// console.log(gameBoard);

// console.log(clickOnCell('2', whoPlay()));
// console.log(clickOnCell('4', whoPlay()));
// console.log(clickOnCell('8', whoPlay()));
// console.log(clickOnCell('5', whoPlay()));
// console.log(clickOnCell('3', whoPlay()));
// console.log(clickOnCell('1', whoPlay()));
// console.log(clickOnCell('7', whoPlay()));
// console.log(clickOnCell('6', whoPlay()));
// console.log(clickOnCell('0', whoPlay()));
// console.log(clickOnCell('0', whoPlay()));

function checkWin(){
  let winner= "tie";
  for(let[index, win] of winningCombos.entries()){
    let arr = [];

    for(let ele of win){
      arr.push(gameBoard[ele]);
    }

    if(arr.every(cell => cell == "X")){
      winner = "X";
      break;
    }else if(arr.every(cell => cell == "O")){
      winner = "O";
      break;
    }
  }
  return winner;
}

// console.log(checkWin());

function gameReset(){
  counter = 0;
  newBoard();
}

//

});
