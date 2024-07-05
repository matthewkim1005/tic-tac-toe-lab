//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/*-------------------------------- Constants --------------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
  ];
  //console.log(winningCombos[1][0]);
/*---------------------------- Variables (state) ----------------------------*/

let board = ['', '', '', '', '', '', '', '', '',];
let turn = 'X';
let winner = false;
let tie = false;

/*------------------------ Cached Element References ------------------------*/

const resetButtonEl = document.querySelector('.reset');
resetButtonEl.addEventListener('click' , init);

/*-------------------------------- Functions --------------------------------*/
init();

function init() {
    board = ['', '', '', '', '', '', '', '', '',];
    turn = 'X';
    winner = false;
    tie = false;
    messageEl.style.color = "black";
    console.log('Initialized!');
    render();
}

function updateBoard() {
    squareEls.forEach(element => {
        element.innerHTML = board[element.id];
        //console.log(board[element.id])
    });
}

function updateMessage() {
    if(!winner && !tie) {
        messageEl.innerHTML = `It is ${turn}'s turn!`;
    } else if (!winner && tie) {
        messageEl.innerHTML = 'It is a tie!'
    } else if (winner && !tie) {
        messageEl.innerHTML = `${winner} wins!`
        messageEl.style.color = "green";
    }
}

function render() {
    updateBoard();
    updateMessage();
}

function handleClick(event) {
    const squareIndex = event.target.id;
      if (board[squareIndex] || winner) {
        messageEl.innerHTML = 'That square is already taken!';
      } else if (winner) {
        messageEl.innerHTML = 'There is already a winner!';
      } else if (tie) {
        messageEl.innerHTML = 'It is a tie!';
      } else if (!board[squareIndex]) {
        placePiece(squareIndex);
      }
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
}

function placePiece(index) {
  board[index] = turn;
  //console.log(board);
}

function checkForWinner() {
  for (let array of winningCombos) {
    if (board[array[0]] !== '' && board[array[0]] === board[array[1]] && board[array[0]] === board[array[2]]) {
      winner = board[array[0]];
    }
  }
}

function checkForTie() {
  if (winner === false && !board.includes('')){
    tie = true;
  }
}

function switchPlayerTurn() {
  if(winner === false && turn === 'X') {
    turn = 'O';
  } else if (winner === false && turn === 'O'){
    turn = 'X';
  }
}
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
  square.addEventListener('click', (event) => {
    handleClick(event);
  });
});