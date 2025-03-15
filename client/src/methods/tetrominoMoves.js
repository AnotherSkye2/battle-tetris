import { placeTetromino } from "./tetrominoManipulation.js";
import { checkCollisions } from "./collisionCheck.js";
import { clearFullLine } from "./clearLine.js";
import { addScore, updateLeaderboard } from "./gameScore.js";
import { timeToLevelUp } from "./gameDefaultValues.js";
import { socket } from "../socket.js";
import { addLines } from "./addLine.js";

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
    const tetromino = gameloopObject.gameState.activeTetromino
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
        const users = gameloopObject.users
        let target = gameloopObject.gameState.target
        console.log(users, target)
        for (let i = 0; i < users.length; i++) {
            // TESTING ONLY
            if (!target && users[i].name != gameloopObject.name) {target = users[i].name}
            // TESTING ONLY
            console.log("users, target", users, target)
            if (users[i].name === target) {
                console.log("garbage send", users, target, gameloopObject)
                if (gameloopObject.isBotGame) {
                    for (let i = 0; i < gameLoopObjectArray.length; i++) {
                        console.log("gameLoopObjectArray, target: ", gameLoopObjectArray, target)
                        if ( gameLoopObjectArray[i].name == target) {
                            gameLoopObjectArray[i].gameState.garbageLines += clearedLines
                        }
                    }
                } else {
                    console.log("garbage emit")
                    socket.emit('garbage', users[i].socketId, clearedLines)
                }
            }
        }
    }
    if (gameloopObject.gameState.garbageLines > 0) {
        newBoard = addLines(newBoard, gameloopObject.gameState.garbageLines)
        gameloopObject.gameState.garbageLines = 0
    }

    if (gameloopObject.gameState.timeSinceLastLevel >= timeToLevelUp) {
        gameloopObject.gameState.level++
        gameloopObject.gameState.timeSinceLastLevel = 0
    }
    
    gameGridArray.length = 0;
    gameGridArray.push(...newBoard); 

    position.row = 0
    position.col = 3;
    gameloopObject.gameState.activeTetromino = null;
    gameloopObject.gameState.tetrominoType = null;

}