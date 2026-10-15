

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
          activeGridCopy: () => [...activeGrid],
          checkLines: ( symbol ) => {
            winningLines.forEach(winningLine => {
              if (activeGrid[winningLine] === symbol &&
                  activeGrid[winningLine] === symbol &&
                  activeGrid[winningLine] === symbol
              ) return true;
            });
            return false;
          },
          resetActiveGrid: () => activeGrid = [...grid],
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


    function currentPlayer() {
      return players[currentPlayerIdx];
    }

    function mark( idx ) {
      if (isRunning) 
      {
        if (gameboard.rawActiveGrid()[idx] === null) {
          gameboard.rawActiveGrid()[idx] = currentPlayer().symbol;
          updateGameboard();

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
    }

    function switchPlayer() {
      if (currentPlayerIdx === 0) ++currentPlayerIdx;
      else --currentPlayerIdx;
    }

    function updateGameboard() {
      pageGameboard.replaceChildren();

      gameboard.activeGridCopy().forEach((squareValue, squareIdx) => {
        const gridSquare = document.createElement("div");

        gridSquare.addEventListener("click", () => {
          mark(squareIdx);
        });

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
            gridSymbol.setAttribute("alt", "O Symbol");
            gridSquare.appendChild(gridSymbol);
            break;
        }

        pageGameboard.appendChild(gridSquare);
      });
    }

    return { updateGameboard };
  }
)();



tictactoe.updateGameboard();