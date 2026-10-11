

function createPlayer( name, symbol ) {
  return { name, symbol };
}



const gameController = ( function () {
    const gameBoard = ( function () {
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
            for (let idx = 0; idx < grid.length; idx++) {
              const line = winningLines[idx];
              if (grid[line[0]] === symbol &&
                  grid[line[1]] === symbol &&
                  grid[line[2]] === symbol
              ) return true;
              else {
                return false;
              }
            }
          },
          full: () => grid.includes(null),
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
    const players = [
      createPlayer("Player 1", "X"),
      createPlayer("Player 2", "O")
    ];

    let currentPlayerIdx = 0;
    let turn = 1;

    function currentPlayer() {
      return players[currentPlayerIdx];
    }
    function switchPlayer() {
      if (currentPlayerIdx === 0) ++currentPlayerIdx;
      else --currentPlayerIdx;
    }

    return {
      currentPlayer,
      mark: ( idx ) => {
        if (gameBoard.mark( idx, currentPlayer() )) {
          switchPlayer();
          ++turn;
        }
      },
      stats: () => turn
    }
  }
)();