

// [
//   null, "x",  null,
//   "o" , null, "o",
//   "x" , "x",  null,
// ]


function game() {
  const board = [
    null, null, null, 
    null, null, null, 
    null, null, null
  ];

  function mark( index, symbol ) {
    if (board[index] === null) board[index] = symbol;
  }
}