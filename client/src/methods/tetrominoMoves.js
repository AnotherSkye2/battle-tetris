import { placeTetromino } from "./tetrominoManipulation.js";
import { checkCollisions } from "./collisionCheck.js";
import { clearFullLine } from "./clearLine.js";
import { addScore, updateLeaderboard } from "./gameScore.js";
import { timeToLevelUp } from "./gameDefaultValues.js";
import { addLines } from "./addLine.js";
import sendGarbage from "./sendGarbage.js";
import { checkGameOver, checkGameWin } from "./gameOver.js";

export function moveTetrominoDown(gameloopObject){
    const tetromino = gameloopObject.gameState.activeTetromino
    const type = gameloopObject.gameState.tetrominoType
    const position = gameloopObject.position
    const gameGridArray = gameloopObject.gameGridArray
    const { row, col } = position; 

    if(!tetromino){
        return
    }
    const collisionDetected= checkCollisions(tetromino,position,"down",gameGridArray)
    if(collisionDetected){
        placeTetromino(gameloopObject)
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
    return true
}

export function moveTetrominoLeft(gameloopObject) {
    const tetromino = gameloopObject.gameState.activeTetromino
    const type = gameloopObject.gameState.tetrominoType
    const position = gameloopObject.position
    const { row, col } = position; 

   for(let r = 0; r < tetromino.length; r++){
    for(let c =0; c < tetromino[r].length; c++){
        if(tetromino[r][c] === type  ){
            gameloopObject.gameGridArray[row + r][col + c - 1 ] = type
        }
    }
   }
   position.col -= 1
}

export function moveTetrominoRight(gameloopObject){
    const tetromino = gameloopObject.gameState.activeTetromino
    const type = gameloopObject.gameState.tetrominoType
    const position = gameloopObject.position
    const { row, col } = position; 


   for(let r = 0; r < tetromino.length; r++){
    for(let c =0; c < tetromino[r].length; c++){
        if(tetromino[r][c] === type  ){
            gameloopObject.gameGridArray[row + r][col + c + 1 ] = type
        }
    }
   }
   position.col += 1
}

export function moveTetrominoLowestPoint(gameloopObject, gameLoopObjectArray) {
    const gameState = gameloopObject.gameState
    const tetromino = gameState.activeTetromino
    const position = gameloopObject.position
    const gameGridArray = gameloopObject.gameGridArray

    let dropY = position.row;

    while (!checkCollisions(tetromino, { row: dropY, col: position.col }, "down", gameloopObject.gameGridArray)) {
        dropY++; 
    }

     position.row = dropY ;

    placeTetromino(gameloopObject);
    let { newBoard, clearedLines } = clearFullLine(gameloopObject.gameGridArray);
    const score = addScore(clearedLines, gameloopObject)
    updateLeaderboard(score, gameloopObject.name, gameloopObject)
    if (clearedLines > 1) {
        console.log("garbage: clearedLines: ", clearedLines)
        sendGarbage(clearedLines, gameloopObject, gameLoopObjectArray)
    }
    if (gameState.garbageLines > 0) {
        newBoard = addLines(newBoard, gameState.garbageLines)
        gameState.garbageLines = 0
    }

    if (gameState.timeSinceLastLevel >= timeToLevelUp && gameloopObject.gameState.level < 10) {
        gameloopObject.gameState.level++
        console.log("level up", gameloopObject.gameState.level, gameState.timeSinceLastLevel, gameloopObject.name)
        gameState.timeSinceLastLevel = 0
    }

    if (checkGameOver(gameloopObject.gameGridArray) || checkGameWin()) {
        console.log("checkGameOver")
        gameloopObject.gameState.gameOverPending = true; 
        return;
    }


    gameGridArray.length = 0;
    gameGridArray.push(...newBoard); 

    position.row = 0
    position.col = 3;
    gameState.activeTetromino = null;
    gameState.tetrominoType = null;

}