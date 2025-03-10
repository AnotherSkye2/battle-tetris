export function InitializeGameBoard(users, userName) {
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
            gameBoardGrid.appendChild(cell);
        }
    }
    gameBoardElement.append(gameBoardGrid)
    gameElement.append(gameBoardElement)

    let opponentGridDataArray = [];

    for (let i = 0; i < users.length; i++) {
        if (users[i].name == userName) {continue}
        console.log(users[i].name)
        let opponentGameGridArray = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

        const opponentGameBoardElement = document.createElement("div");
        opponentGameBoardElement.classList.add("opponent", "game-board");

        const opponentGameBoardGrid = document.createElement("div");
        opponentGameBoardGrid.classList.add("game-grid");

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                opponentGameBoardGrid.appendChild(cell);
            }
        }
        opponentGameBoardElement.appendChild(opponentGameBoardGrid)
        opponentGridDataArray.push({
            name: users[i].name,
            gameBoardGrid: opponentGameBoardGrid,
            gameGridArray: opponentGameGridArray
        })
        gameElement.appendChild(opponentGameBoardElement);
    }

    document.body.appendChild(gameElement)
    console.log(gameElement, gameBoardGrid)
    return { gameBoardElement, gameBoardGrid, gameGridArray, opponentGridDataArray};
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