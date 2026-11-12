const boardElement = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let BOARD_SIZE = 10;
let WIN_LENGTH = 10;
let currentPlayer = "X";
let board = [];
let isGameOver = false;

function initBoard() {
    BOARD_SIZE = getRandomFromMap(10, 14);
    WIN_LENGTH = BOARD_SIZE;

    board = Array(BOARD_SIZE * BOARD_SIZE).fill("");
    isGameOver = false;
    currentPlayer = "X";
    statusText.textContent = `Na tahu: ${currentPlayer} (${BOARD_SIZE}x${BOARD_SIZE}, cíl: ${WIN_LENGTH} v řadě)`;

    boardElement.innerHTML = "";
    boardElement.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 35px)`;

    const obstacleCount = getRandomFromMap(1, 2);
    const obstacleIndices = new Set();
    while (obstacleIndices.size < obstacleCount) {
        obstacleIndices.add(getRandomFromMap(0, BOARD_SIZE * BOARD_SIZE - 1));
    }

    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const cell = document.createElement("button");
        cell.classList.add("cell");
        cell.dataset.index = i;

        if (obstacleIndices.has(i)) {
            board[i] = "#";
            cell.classList.add("obstacle");
            cell.disabled = true;
        } else {
            cell.addEventListener("click", handleCellClick);
        }

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
        statusText.textContent = `Na tahu: ${currentPlayer} (${BOARD_SIZE}x${BOARD_SIZE}, cíl: ${WIN_LENGTH} v řadě)`;
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

        for (let step = 1; step < WIN_LENGTH; step++) {
            const r = row + dr * step;
            const c = col + dc * step;
            if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r * BOARD_SIZE + c] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        for (let step = 1; step < WIN_LENGTH; step++) {
            const r = row - dr * step;
            const c = col - dc * step;
            if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && board[r * BOARD_SIZE + c] === currentPlayer) {
                count++;
            } else {
                break;
            }
        }

        if (count >= WIN_LENGTH) {
            return true;
        }
    }

    return false;
}

restartBtn.addEventListener("click", () => {
    initBoard();
});

initBoard();
