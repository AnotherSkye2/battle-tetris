export function InitializeGameBoard(userNames, userName) {
    const COLS = 10;
    const ROWS = 20;
    const gameGridArray = Array.from({ length: ROWS }, () => Array(COLS).fill(""));

    const gameElement = document.createElement("div");
    gameElement.classList.add("game");

    const gameBoardElement = document.createElement("div");
    gameBoardElement.classList.add("player", "game-board");

    const gameBoardName = document.createElement("h2");
    gameBoardName.classList.add("name", "micro-5-regular");
    gameBoardName.innerHTML = userName
    gameBoardElement.appendChild(gameBoardName)

    const gameBoardGrid = document.createElement("div");
    gameBoardGrid.classList.add("game-grid");
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            gameBoardGrid.appendChild(cell);
        }
    }
    gameBoardElement.appendChild(gameBoardGrid)
    gameElement.appendChild(gameBoardElement)

    let opponentGridDataArray = [];

    for (let i = 0; i < userNames.length; i++) {
        if (userNames[i].name == userName) {continue}
        console.log(userNames[i].name)
        let opponentGameGridArray = Array.from({ length: ROWS }, () => Array(COLS).fill(""));

        const opponentGameBoardElement = document.createElement("div");
        opponentGameBoardElement.classList.add("opponent", "game-board");

        const opponentGameBoardName = document.createElement("h2");
        opponentGameBoardName.classList.add("name", "micro-5-regular");
        opponentGameBoardName.innerHTML = userNames[i].name
        opponentGameBoardElement.appendChild(opponentGameBoardName)

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
            name: userNames[i].name,
            gameBoardGrid: opponentGameBoardGrid,
            gameGridArray: opponentGameGridArray
        })
        gameElement.appendChild(opponentGameBoardElement);
    }

    document.body.appendChild(gameElement)
    console.log(gameElement, gameBoardGrid)
    return { gameElement, gameBoardElement, gameBoardGrid, gameGridArray, opponentGridDataArray};
}

export function renderGameBoard(gameBoardGrid,gameGridArray){
    const cells = gameBoardGrid.querySelectorAll('.cell');
    let index = 0;

    for (let row = 0; row < gameGridArray.length; row++) {
        for (let col = 0; col < gameGridArray[row].length; col++) {
            const cell = cells[index];
            cell.classList.remove('filled', 'l', 'j', 't', 'o', 'i', 's', 'z', 'g');
            if (gameGridArray[row][col] !== "") {
                cell.classList.add('filled', gameGridArray[row][col]);
            }
            index++;
        }
    }
}