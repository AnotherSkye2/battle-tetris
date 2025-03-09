export function InitializeGameBoard() {
    const COLS = 10;
    const ROWS = 20;

    const gameBoardElement = document.createElement("div");
    gameBoardElement.classList.add("game-board");

    let gameBoard = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (gameBoard[row][col] === 1) {
                cell.classList.add('filled');
            }

            gameBoardElement.appendChild(cell);
        }
    }
    document.body.appendChild(gameBoardElement);
    
    return {gameBoardElement,gameBoard};
}

export function renderGameBoard(gameBoardElement,gameBoard){
    const cells = gameBoardElement.querySelectorAll('.cell');
    let index = 0;

    for (let row = 0; row < gameBoard.length; row++) {
        for (let col = 0; col < gameBoard[row].length; col++) {
            const cell = cells[index];
            if (gameBoard[row][col] === 1) {
                cell.classList.add('filled');
            } else {
                cell.classList.remove('filled');
            }
            index++;
        }
    }
}