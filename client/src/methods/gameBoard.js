export function InitializeGameBoard(users) {
    const COLS = 10;
    const ROWS = 20;
    const gameGridArray = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

    const gameElement = document.createElement("div");
    gameElement.classList.add("game");

    const gameBoardElement = document.createElement("div");
    gameBoardElement.classList.add("player", "game-board");

    const gameBoardGrid = document.createElement("div");
    gameBoardGrid.classList.add("game-grid");
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (gameGridArray[row][col] === 1) {
                cell.classList.add('filled');
            }

            gameBoardGrid.appendChild(cell);
        }
    }
    gameBoardElement.append(gameBoardGrid)
    gameElement.append(gameBoardElement)

    for (let i = 1; i < users.length; i++) {
        console.log(users)
        const opponentGameBoardElement = document.createElement("div");
        opponentGameBoardElement.classList.add("opponent", "game-board");

        const opponentGameBoardGrid = document.createElement("div");
        opponentGameBoardGrid.classList.add("game-grid");

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                if (gameGridArray[row][col] === 1) {
                    cell.classList.add('filled');
                }
    
                opponentGameBoardGrid.appendChild(cell);
            }
        }
        console.log("opponentGameBoardElement, opponentGameBoardGrid: ", opponentGameBoardElement, opponentGameBoardGrid)
        console.log(gameElement)
        opponentGameBoardElement.appendChild(opponentGameBoardGrid)
        gameElement.appendChild(opponentGameBoardElement);
    }

    document.body.appendChild(gameElement)
    console.log(gameElement, gameBoardGrid)
    return { gameBoardElement, gameBoardGrid, gameGridArray };
}

export function renderGameBoard(gameBoardGrid,gameGridArray){
    const cells = gameBoardGrid.querySelectorAll('.cell');
    let index = 0;

    for (let row = 0; row < gameGridArray.length; row++) {
        for (let col = 0; col < gameGridArray[row].length; col++) {
            const cell = cells[index];
            if (gameGridArray[row][col] === 1) {
                cell.classList.add('filled');
            } else {
                cell.classList.remove('filled');
            }
            index++;
        }
    }
}