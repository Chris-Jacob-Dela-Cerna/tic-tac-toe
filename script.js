

//  ---  DOM References  ---

const pageGameboard = document.querySelector(".gameboard");
const pageRestartBtn = document.querySelector(".tictactoe__restart-btn");
const pageXScores = document.getElementById("scoreboard__x");
const pageTieScores = document.getElementById("scoreboard__tie");
const pageOScores = document.getElementById("scoreboard__o");



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
          checkLines: ( symbol ) => 
            winningLines.some(winningLine => {
              return activeGrid[winningLine[0]] === symbol &&
                     activeGrid[winningLine[1]] === symbol &&
                     activeGrid[winningLine[2]] === symbol;
            }
          ),
          resetActiveGrid: () => activeGrid = [...grid],
          fullBoard: () => !activeGrid.includes(null),
          rawActiveGrid: () => activeGrid
        }
      }
    )();


    const players = [
      { symbol: "X", score: 0 },
      { symbol: "O", score: 0 }
    ];

    let currentPlayerIdx = 0;
    let isRunning = true;
    let ties = 0;


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
            ++currentPlayer().score;
            updateScoreboard();
            isRunning = false;
          } 
          else if (gameboard.fullBoard()) {
            ++ties;
            updateScoreboard();
            isRunning = false;
          } 
          else {
            switchPlayer();
          }
        }
      }
    }

    function resetGameboard() {
      currentPlayerIdx = 0;
      isRunning = true;
      gameboard.resetActiveGrid();
      updateGameboard();
    }

    function switchPlayer() {
      if (currentPlayerIdx === 0) ++currentPlayerIdx;
      else --currentPlayerIdx;
    }

    function updateGameboard() {
      pageGameboard.replaceChildren();

      gameboard.activeGridCopy().forEach((squareValue, squareIdx) => {
        const gridSquare = document.createElement("div");

        gridSquare.classList.add("gameboard__square");
        gridSquare.addEventListener("click", () => mark(squareIdx));

        switch (squareValue) {
          case ("X"):
            gridSymbol = document.createElement("img");
            gridSymbol.classList.add("gameboard__x-symbol");
            gridSymbol.setAttribute("src", "icons/x-teal.svg");
            gridSymbol.setAttribute("alt", "X Symbol");
            gridSquare.appendChild(gridSymbol);
            break;
          case ("O"):
            gridSymbol = document.createElement("img");
            gridSymbol.classList.add("gameboard__o-symbol");
            gridSymbol.setAttribute("src", "icons/circle-yellow-orange.svg");
            gridSymbol.setAttribute("alt", "O Symbol");
            gridSquare.appendChild(gridSymbol);
            break;
        }

        pageGameboard.appendChild(gridSquare);
      });
    }

    function updateScoreboard() {
      pageXScores.textContent = players[0].score;
      pageTieScores.textContent = ties;
      pageOScores.textContent = players[1].score;
    }

    return {
      resetGameboard,
      updateGameboard
    };
  }
)();



pageRestartBtn.addEventListener("click", () => tictactoe.resetGameboard());



tictactoe.updateGameboard();