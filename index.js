const onloadModal = document.querySelector('#onloadModal');
function onloadMessage(){
  onloadModal.style.display = "block";
  setTimeout(function(){
    onloadModal.style.display = "none";
  },3000);
}

window.onload = function(){
  onloadMessage();
}


$(document).ready(function(){
  console.log('ready!');

  let counter = 0;
  let gameBoard = new Array(9);
  let gameResult = "";
  let winCombo; // for the effects after winning
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

  const gameEndModal = $('#gameEndModel');
  const gameStartModel = $('#gameStartModel');
  let xWin = 0, oWin = 0, even = 0;
  $('#author span').click(function(){
     stats();
  })
  function stats(){
    console.log(`x: ${xWin}`);
    console.log(`o: ${oWin}`);
    console.log(`even: ${even}`);
  }

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
      $(`.cell#${where}`).html(whoPlay());
      gameBoard[where] = who;
      counter++;
      gameResult = checkWin();

      if(gameResult == 'X'){
        xWin ++;
      }else if(gameResult == 'O'){
        oWin ++;
      }else if(gameReset == 'tie'){
        even ++;
      }

      if(gameResult =='X' || gameResult =='O'){
        message = `The winner is ${gameResult}`;
        deleverMessage(message);
        winningDeclare(winCombo, 'red');
        gameEndModal.css('display','block');
        return message;
      }else if(gameResult =='tie'){
        message = `No more moves.`;
        deleverMessage(message);
        gameEndModal.css('display','block');
        return message;
      }else{
        $('#messageBox').html(message);
      }
    }
  }

  function checkWin(){
    let winner= "undecided";
    for(let[index, win] of winningCombos.entries()){
        let arr = [];

        for(let ele of win){
          arr.push(gameBoard[ele]);
        }

        if(arr.every(cell => cell == "X")){
          winner = "X";
          winCombo = win;
          break;
        }else if(arr.every(cell => cell == "O")){
          winner = "O";
          winCombo = win;
          break;
        }

    }
    if(gameBoard.every(cell => cell != 'empty')){
      winner = "tie";
    }
    return winner;
  }

  function gameReset(){
    counter = 0;
    newBoard();
    winCombo = null;
    $('.cell').html('');
    $('.cell').css('color','black');
  }

  function deleverMessage(input){
    $('#messageBox').html(input);
  }

  function winningDeclare(paintWhere, color){
    for(let ele of paintWhere){
      let temp = `.cell#${ele}`;
      // $(temp).css('background-color',color);
      $(temp).css('color',color);
    }
  }

  function showGameStart(){
    gameStartModel.css('display','block');
    setTimeout(function(){
      gameStartModel.css('display','none');
    },500);
  }

  //-----------------------------------------------------------

  $('#newGame').click(function(){
    showGameStart()
    gameReset();
  })


  $('tbody').delegate('.cell','click', function(){
    let location = $( this ).attr('id');
    clickOnCell(location, whoPlay());
  })

  $('#restart').click(function(){
    gameReset();
    gameEndModal.css('display','none');
    setTimeout(function(){
      showGameStart()
    },200);

  });



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

});
