const BOARD_SIZE = 10;
const boardElement = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let board = Array(BOARD_SIZE * BOARD_SIZE).fill("");
let isGameOver = false;

// Initialize the game board
function initBoard() {
    boardElement.innerHTML = "";
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const cell = document.createElement("button");
        cell.classList.add("cell");
        cell.dataset.index = i;
        boardElement.appendChild(cell);
    }
}

initBoard();
