

const gameBoard = ( 
  function () {
    const grid = [
      null, null, null, 
      null, null, null, 
      null, null, null
    ];
    const winningLines = [
      [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ],
      [ 0, 3, 6 ], [ 1, 4, 7 ], [ 2, 5, 8 ],
      [ 0, 4, 8 ], [ 2, 4, 6 ]
    ];

    return {
      checkLines: ( symbol ) => {
        for (let idx = 0; idx < winningLines.length; idx++) {
          const line = winningLines[idx];
          if (grid[line[0]] === symbol &&
              grid[line[1]] === symbol &&
              grid[line[2]] === symbol
          ) return true;
        }
        return false;
      },
      full: () => !grid.includes(null),
      grid: () => grid,
      mark: ( idx, symbol ) => { 
        if (grid[idx] === null) {
          grid[idx] = symbol;
          return true;
        } else {
          return false;
        }
      }
    }
  }
)();



const game = ( 
  function () {
    const players = [
      { name: "Player 1", symbol: "X" },
      { name: "Player 2", symbol: "O" }
    ];

    let currentPlayerIdx = 0;
    let isRunning = true;
    let turn = 1;
    let winner = null;

    function currentPlayer() {
      return players[currentPlayerIdx];
    }
    function switchPlayer() {
      if (currentPlayerIdx === 0) ++currentPlayerIdx;
      else --currentPlayerIdx;
    }

    return {
      currentPlayer,
      isRunning: () => isRunning,
      mark: ( idx ) => {
        if (isRunning) {
          if (gameBoard.mark( idx, currentPlayer().symbol )) {
            console.log(currentPlayer().symbol)
            if (gameBoard.checkLines( currentPlayer().symbol )) {
              winner = currentPlayer();
              isRunning = false;
            } else if (gameBoard.full()) {
              winner = null;
              isRunning = false;
            } else {
              switchPlayer();
              ++turn;
            }
          }
        }
      },
      turn: () => turn,
      winner: () => winner
    }
  }
)();