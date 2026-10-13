

function createPlayer( name, symbol ) {
  return { name, symbol };
}



const tictactoe = ( function () 
  {
    const gameboard = ( function () 
      {
        const grid = [
          null, null, null, 
          null, null, null, 
          null, null, null
        ];
        const winningLines = [
          [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ], [ 0, 3, 6 ], 
          [ 1, 4, 7 ], [ 2, 5, 8 ], [ 0, 4, 8 ], [ 2, 4, 6 ]
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
          fullBoard: () => !grid.includes(null),
          rawGrid: () => grid
        }
      }
    )();


    const players = [
      createPlayer( "Player 1", "X" ),
      createPlayer( "Player 2", "O" )
    ];

    let currentPlayerIdx = 0;
    let isRunning = true;
    let turn = 1;
    let winner = null;

    function switchPlayer() {
      if (currentPlayerIdx === 0) ++currentPlayerIdx;
      else --currentPlayerIdx;
    }


    function currentPlayer() {
      return players[currentPlayerIdx];
    }


    return {
      currentPlayer,
      mark: ( idx ) => {
        if (isRunning) 
        {
          if (gameboard.rawGrid()[idx] === null) {
            gameboard.rawGrid()[idx] = currentPlayer().symbol;

            if (gameboard.checkLines( currentPlayer().symbol )) {
              winner = currentPlayer();
              isRunning = false;
            } 
            else if (gameboard.fullBoard()) {
              winner = "tie";
              isRunning = false;
            } 
            else {
              switchPlayer();
              ++turn;
            }
          }
        }
      },
      grid: () => [...gameboard.rawGrid()],
      isRunning: () => isRunning,
      turn: () => turn,
      winner: () => winner
    }
  }
)();