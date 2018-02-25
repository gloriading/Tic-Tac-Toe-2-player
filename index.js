$(document).ready(function(){
  console.log('ready!');

  let counter = 0;
  let gameBoard = new Array(9);
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
      gameBoard[i] = 'empty';
    }
    return gameBoard;
  }

  function whoPlay(){
    if(counter % 2 === 0){
      return 'X';
    }else{
      return 'O';
    }
  }

  function clickOnCell(where, who){
    let message="";
    if( gameBoard[where] === 'empty'){
      gameBoard[where] = who;
      counter++;
      gameResult = checkWin();

      if(gameResult =='X' || gameResult =='O'){
        message = `the winner is ${gameResult}`;
        // $('#messageBox').html(message);
        // gameReset();
        deleverMessage(message);
        return message;
      }else if(gameResult =='tie'){
        message = `No winner. Game Over.`;
        // $('#messageBox').html(message);
        // gameReset();
        deleverMessage(message);
        return message;
      }else{
        $('#messageBox').html(message);
      }
    }
  }

// -------------------------------------------------------------- TESTING

  // gameReset();
  // console.log(clickOnCell('4', whoPlay())); // first player is X
  // console.log(clickOnCell('0', whoPlay()));
  // console.log(clickOnCell('6', whoPlay()));
  // console.log(clickOnCell('2', whoPlay()));
  // console.log(clickOnCell('8', whoPlay()));
  // console.log(counter);
  // console.log(clickOnCell('1', whoPlay()));
  // console.log(counter);
  // console.log(clickOnCell('7', whoPlay()));
  // console.log(counter);
  // console.log(clickOnCell('3', whoPlay()));
  // console.log(clickOnCell('5', whoPlay()));
  // console.log(clickOnCell('4', whoPlay()));

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
    let winner= "undecided";
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
    if(gameBoard.every(cell => cell != 'empty')){
      winner = "tie";
    }
    return winner;
  }

  // console.log(checkWin());

  function gameReset(){
    counter = 0;
    newBoard();
    $('.cell').html('');
    $('#messageBox').html('Click on board to start.');
  }

  function deleverMessage(input){
    const fixedMessage = 'Click on restart to play again.';
    // $('#messageBox').html(input + " " +fixedMessage);
    $('#messageBox').html(`${input} ${fixedMessage}`);
  }

  //-----------------------------------------------------------
  // $('.cell').click(function(){
  //   let location = $(this).attr('id');
  //   console.log(location);
  //   console.log(clickOnCell(location, whoPlay()));
  //   // $(this).html(whoPlay());
  // })

  gameReset();
  $('tbody').delegate('.cell','click', function(){
    let location = $( this ).attr('id');
    $(this).html(whoPlay());
    // console.log(location);
    console.log(clickOnCell(location, whoPlay()));
    // console.log(counter);


  })

  $('#restart').click(function(){

    gameReset();

  });

});
