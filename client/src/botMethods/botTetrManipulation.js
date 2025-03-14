export function placeBotTetromino(botLoopObject,index) {

    const { row, col } = botLoopObject.position; 
    const tetromino = botLoopObject.gameState.activeTetromino; 
    const type = botLoopObject.gameState.tetrominoType; 
    const gameGridArray = botLoopObject.opponentGridDataArray[index].gameGridArray; 


    if (!tetromino) {
        console.log("No active tetromino for bot:", botLoopObject.botName);
        return; 
    }

  
    for (let r = 0; r < tetromino.length; r++) {
        for (let c = 0; c < tetromino[r].length; c++) {
            if (tetromino[r][c] === type) {
                gameGridArray[row + r][col + c] = type; 
            }
        }
    }

}