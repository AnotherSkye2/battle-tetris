import { checkCollisions } from "../methods/collisionCheck";
import { placeBotTetromino } from "./botTetrManipulation";

export function moveBotTetrominoDown(botLoopObject, index) {
    console.log("moveBotTetrominoDown called for bot:", botLoopObject.botName);
    
    const tetromino = botLoopObject.gameState.activeTetromino;
    const type = botLoopObject.gameState.tetrominoType;
    const position = botLoopObject.position;
    const gameGridArray = botLoopObject.opponentGridDataArray[index].gameGridArray;
    const { row, col } = botLoopObject.position; 

    if (!tetromino) {
        console.log("No active tetromino for bot:", botLoopObject.botName);
        return;
    }

       const collisionDetected= checkCollisions(tetromino,position,"down",gameGridArray)
        if(collisionDetected){
            console.log("collisionDetected")
            placeBotTetromino(botLoopObject,index)
            return false;
        }

    for (let r = 0; r < tetromino.length; r++) {
        for (let c = 0; c < tetromino[r].length; c++) {
            if (tetromino[r][c] !== "") {
                gameGridArray[row + r][col + c] = ""; 
            }
        }
    }

    position.row += 1;

    for (let r = 0; r < tetromino.length; r++) {
        for (let c = 0; c < tetromino[r].length; c++) {
            if (tetromino[r][c] !== "") {
                gameGridArray[position.row + r][position.col + c] = type; 
            }
        }
    }

    console.log(`Bot ${botLoopObject.botName} moved tetromino down.`);
    return true
}