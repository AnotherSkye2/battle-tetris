import { clearTetromino, placeTetromino } from "../methods/tetrominoManipulation";

export default function getAggregateHeight(botLoopObject) {
    clearTetromino(botLoopObject)
    let gameGridArray = botLoopObject.gameGridArray
    gameGridArray = gameGridArray.filter(row => row.some(cell => cell !== ""))

    let aggregateHeights = new Array(10).fill(0);
    if (gameGridArray.length <= 0) {return aggregateHeights}

    for(let r = gameGridArray.length - 1; r >= 0; r--){
        for(let c =0; c < gameGridArray[r].length; c++) {
            if (gameGridArray[r][c] !== "") {aggregateHeights[c] = Math.abs(r - gameGridArray.length)}
        }
    }
    placeTetromino(botLoopObject);
    
    return aggregateHeights
}