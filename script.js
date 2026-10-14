

//  ---  DOM References  ---

const pageGameboard = document.querySelector(".gameboard");



function createPlayer( symbol ) {
  return { symbol, score: 0 };
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

        let activeGrid = [...grid];

        return {
          checkLines: ( symbol ) => {
            for (let idx = 0; idx < winningLines.length; idx++) {
              const line = winningLines[idx];
              if (activeGrid[line[0]] === symbol &&
                  activeGrid[line[1]] === symbol &&
                  activeGrid[line[2]] === symbol
              ) return true;
            }
            return false;
          },
          clearActiveGrid: () => activeGrid = [...grid],
          fullBoard: () => !activeGrid.includes(null),
          rawActiveGrid: () => activeGrid
        }
      }
    )();


    const players = [
      createPlayer( "X" ),
      createPlayer( "O" )
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
          if (gameboard.rawActiveGrid()[idx] === null) {
            gameboard.rawActiveGrid()[idx] = currentPlayer().symbol;

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
      activeGrid: () => [...gameboard.rawActiveGrid()],
      isRunning: () => isRunning,
      resetActiveGrid: () => gameboard.clearActiveGrid(),
      turn: () => turn,
      winner: () => winner
    }
  }
)();



function updateGameboard() {
  pageGameboard.replaceChildren();

  tictactoe.activeGrid().forEach(squareValue => {
    const gridSquare = document.createElement("div");
    let gridSymbol;

    switch (squareValue) {
      case ("X"):
        gridSymbol = document.createElement("img");
        gridSymbol.setAttribute("src", "icons/x-teal.svg");
        gridSymbol.setAttribute("alt", "X Symbol");
        gridSquare.appendChild(gridSymbol);
        break;
      case ("O"):
        gridSymbol = document.createElement("img");
        gridSymbol.setAttribute("src", "icons/circle-yellow-orange.svg");
        gridSymbol.setAttribute("alt", "Circle Symbol");
        gridSquare.appendChild(gridSymbol);
        break;
    }

    pageGameboard.appendChild(gridSquare);
  });
}

updateGameboard();