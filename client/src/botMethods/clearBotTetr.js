export function clearBotTetromino(botLoopObject, index) {
    const tetromino = botLoopObject.gameState.activeTetromino;
    const type = botLoopObject.gameState.tetrominoType;
    const { row, col } = botLoopObject.position;
    const gameGridArray = botLoopObject.opponentGridDataArray[index]?.gameGridArray; 

    if (!tetromino || !gameGridArray) {
        console.log("No active tetromino or no grid for bot:", botLoopObject.botName);
        return;
    }

    for (let r = 0; r < tetromino.length; r++) {
        for (let c = 0; c < tetromino[r].length; c++) {
            if (tetromino[r][c] === type && gameGridArray[row + r]) {
                gameGridArray[row + r][col + c] = ""; 
            }
        }
    }

    console.log(`Bot ${botLoopObject.botName} cleared its tetromino.`);
}