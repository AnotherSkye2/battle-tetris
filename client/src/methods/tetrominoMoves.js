import { placeTetromino } from "./tetrominoManipulation.js";
import { checkCollisions } from "./collisionCheck.js";
import { clearFullLine } from "./clearLine.js";
import { addScore, updateLeaderboard } from "./gameScore.js";
import { userName } from "./gameDefaultValues.js";
import { socket } from "../socket.js";

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
        console.log("collisionDetected")
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

export function moveTetrominoLowestPoint(gameloopObject) {
    const tetromino = gameloopObject.gameState.activeTetromino
    const position = gameloopObject.position
    const gameGridArray = gameloopObject.gameGridArray

    let dropY = position.row;

    while (!checkCollisions(tetromino, { row: dropY, col: position.col }, "down", gameloopObject.gameGridArray)) {
        dropY++; 
    }

     position.row = dropY ;

    placeTetromino(gameloopObject);
    const { newBoard, clearedLines } = clearFullLine(gameloopObject.gameGridArray);
    const score = addScore(clearedLines, gameloopObject)
    updateLeaderboard(score, userName, gameloopObject)
    if (clearedLines > 0) {
        const users = gameloopObject.users
        let target = gameloopObject.gameState.target
        for (let i = 0; i < users.length; i++) {
            // TESTING ONLY
            if (!target && users[i].name != userName) {target = users[i].name}
            // TESTING ONLY
            console.log("users, target", users, target)
            if (users[i].name === target) {
                socket.emit('garbage', users[i].socketId, clearedLines)
            }
        }
    }
    
    gameGridArray.length = 0;
    gameGridArray.push(...newBoard); 

    position.row = 0
    position.col = 3;
    gameloopObject.gameState.activeTetromino = null;
    gameloopObject.gameState.tetrominoType = null;

}