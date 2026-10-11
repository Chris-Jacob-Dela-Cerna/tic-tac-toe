


function game() {
  const gameboard = (
    function() {
      const board = [
        null, null, null, 
        null, null, null, 
        null, null, null
      ];

      return {
        getBoard: () => board,
        mark: ( index, symbol ) => { 
          if (board[index] === null) board[index] = symbol;
          console.log(board);
        }
      }
    }
  )();

  function player( symbol ) {
    return {
      mark: index => gameboard.mark( index, symbol )
    }
  }
}

game()