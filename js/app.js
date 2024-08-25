/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
    
  ]
  

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;
let playerX ;
let playerO;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const boardEl = document.querySelector('.board');
const resetButtonEl = document.querySelector('#reset');



/*-------------------------------- Functions --------------------------------*/

const init = () => {
    console.log('initializing...');
     board = ['','','','','','','','',''];
     
    turn = 'X';
     
    winner = false;
     
    tie = false;
    
    render()
};


const render = () => {
    console.log('rendering...')
    updateBoard();
    updateMessage();

};

const updateBoard = () => {
    board.forEach((square, index) => {
        squareEls[index].textContent = square;
    })
};

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.textContent = `Its your turn, ${turn}!`; 
    
    } else if (winner === false && tie === true) {
        messageEl.textContent = 'You tied!';
    
    } else messageEl.textContent = `Player ${turn === 'X' ? 'O' : 'X'} wins!`;
    
};

const checkForWinner = () => {
    winner = false;
    winningCombos.forEach(Combo => {
        const [a, b, c] = Combo;
        console.log("checking combos")

        //if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        if (board[a] !== '') {
            if (board[a] === board[b] && board[a] === board[c]) {
                winner = true;
                console.log(winner);
            }
        }
    });
};

const checkForTie = () => {
    if (winner === true) {
        return;
    } 
    if (board.every(square => square !== '')) {
    tie = true;
    }
    console.log("tie:" + tie);

};

const placePiece = (index) => {
    if (board[index] === '') {
    board[index] = turn;
    }
};

const switchPlayerTurn = () => {
    if (winner === true) {
        return;
    } turn = (turn === 'X') ? 'O' : 'X';  // Review this code
};


/*----------------------------- Event Listeners -----------------------------*/
const handleClick = (event) => {
    if (winner === true) {
        return;
    }
    const target = event.target;

    if (!target.classList.contains('sqr')) {
        return; 
    }

    const squareIndex = parseInt(target.getAttribute('id'), 10);
    console.log("squareIndex:" + squareIndex)

    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
};

boardEl.addEventListener('click', handleClick);


resetButtonEl.addEventListener('click', function(event) {
    init();
});


document.addEventListener('DOMContentLoaded', init);