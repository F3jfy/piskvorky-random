const BOARD_SIZE = 10;
const boardElement = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let board = Array(BOARD_SIZE * BOARD_SIZE).fill("");
let isGameOver = false;

function initBoard() {
    boardElement.innerHTML = "";
    board = Array(BOARD_SIZE * BOARD_SIZE).fill("");
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const cell = document.createElement("button");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        boardElement.appendChild(cell);
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const index = Number(cell.dataset.index);

    if (board[index] !== "" || isGameOver) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    const row = Math.floor(index / BOARD_SIZE);
    const col = index % BOARD_SIZE;

    if (checkWin(row, col)) {
        statusText.textContent = `Vyhrál hráč ${currentPlayer}!`;
        isGameOver = true;
    } else if (!board.includes("")) {
        statusText.textContent = "Remíza!";
        isGameOver = true;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Na tahu: ${currentPlayer}`;
    }
}

function checkWin(row, col) {
    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1]
    ];

    for (let [dr, dc] of directions) {
        let count = 1;

        for (let step = 1; step < 5; step++) {
            const r = row + dr * step;
            const c = col + dc * step;
            if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r * BOARD_SIZE + c] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        for (let step = 1; step < 5; step++) {
            const r = row - dr * step;
            const c = col - dc * step;
            if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r * BOARD_SIZE + c] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        if (count >= 5) {
            return true;
        }
    }

    return false;
}

restartBtn.addEventListener("click", () => {
    currentPlayer = "X";
    isGameOver = false;
    statusText.textContent = "Na tahu: X";
    initBoard();
});

initBoard();
