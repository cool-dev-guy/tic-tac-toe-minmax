
function minimax(board, depth, isMaximizing) {
  if (checkWin('X')) {
    return 10 - depth;
  }
  if (checkWin('O')) {
    return depth - 10;
  }
  if (!isMovesLeft()) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '-') {
          board[i][j] = 'X';
          let score = minimax(board, depth + 1, false);
          board[i][j] = '-';
          bestScore = Math.max(bestScore, score);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '-') {
          board[i][j] = 'O';
          let score = minimax(board, depth + 1, true);
          board[i][j] = '-';
          bestScore = Math.min(bestScore, score);
        }
      }
    }
    return bestScore;
  }
}

function bestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '-') {
        board[i][j] = 'X';
        let score = minimax(board, 0, false);
        board[i][j] = '-';
        if (score > bestScore) {
          bestScore = score;
          move = { row: i, col: j };
        }
      }
    }
  }
  return move;
}
function isMovesLeft() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '-') {
        return true;
      }
    }
  }
  return false;
}

function aiMove() {
  if (GAME && Player == 1) {
    let move = bestMove();
    let aiButton = buttons[move.row][move.col];
    aiButton.innerText = 'X';
    aiButton.free = false;
    board[move.row][move.col] = 'X';
    if (checkWin('X')) {
      console.log('AI wins!');
      GAME = 0;
      broadcastVictory();
    }
  }
}

