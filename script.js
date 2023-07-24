//Basic variables

//0=O(Ai) and 1=X(Guy)
var Player = 0;
// GAME = game state 1=ON 0=OFF
var GAME = 1;
var board=[["-","-","-"],["-","-","-"],["-","-","-"]];
var buttons=[["-","-","-"],["-","-","-"],["-","-","-"]];

function run(){
  GAME = 1;
  Player = 1;

  board=[["-","-","-"],["-","-","-"],["-","-","-"]];
  buttons=[["-","-","-"],["-","-","-"],["-","-","-"]];
  prepareBoard();
};
function prepareBoard(){
  //SET BOARD TO DEFAULT
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      buttons[i][j] = document.getElementById(`b${i}${j}`);
      buttons[i][j].free=true;
      buttons[i][j].row = i;
      buttons[i][j].col = j;
      console.log(buttons[i][j])
    };
  };
};
function currentPlayer(p){
    if (Player){return 'X'}
    if (!Player){return 'O'}
}

function broadcastVictory(){
    document.getElementById('messagebox').style.display ='block'
    document.getElementById('messagebox').innerHTML = `${currentPlayer(Player)} Wins`;
    // document.write(`${Player} Wins`)
}

function checkWin(player) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
      return true;
    }
  }
  // Check columns
  for (let j = 0; j < 3; j++) {
    if (board[0][j] === player && board[1][j] === player && board[2][j] === player) {
      return true;
    }
  }
  // Check diagonals
  if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
    return true;
  }
  if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
    return true;
  }
  // if no win possibility to `player`
  else{
    return false
  }
};

// When User Move
function playerMove(elem) {
  if (elem.free && GAME) {
    elem.innerText = 'O';
    Player = 1
    elem.free = false;
    board[elem.row][elem.col] = elem.innerText;
    if (checkWin(elem.innerText)) {
      console.log('VICTORY');
      GAME = 0;
      broadcastVictory();
    } else {
      console.log(aiMove());
    }
  }
}
