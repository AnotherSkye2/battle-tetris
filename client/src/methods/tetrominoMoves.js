import { placeTetromino } from "./tetrominoManipulation.js";
import { checkCollisions,wallCollisionCheck } from "./collisionCheck.js";
import { clearFullLine } from "./clearLine.js";
import { addScore, updateLeaderboard } from "./gameScore.js";
import { userName } from "./gameDefaultValues.js";

export function moveTetrominoDown(gameBoard,tetromino,position){
    const shape  = tetromino; 
    const { row, col } = position; 

     const collisionDetected= checkCollisions(tetromino,position,"down",gameBoard)

    if(collisionDetected){
        placeTetromino(gameBoard,tetromino,position)
        return false;
    }

    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c] === "o") { 
                gameBoard[row + r][col + c] = ""; 
            }
        }
    }
    position.row += 1;

    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c] === "o") { 
                console.log(gameBoard[position.row + r][position.col + c], gameBoard)
                gameBoard[position.row + r][position.col + c] = "o"; 
            }
        }
    }
    return true
}

export function moveTetrominoLeft(gameBoard,tetromino,position) {
   const {row,col} = position

   for(let r = 0; r < tetromino.length; r++){
    for(let c =0; c < tetromino[r].length; c++){
        if(tetromino[r][c] === "o"  ){
            gameBoard[row + r][col + c - 1 ] = "o"
        }
    }
   }
   position.col -= 1
}

export function moveTetrominoRight(gameBoard,tetromino,position){
   const {row,col} = position

   for(let r = 0; r < tetromino.length; r++){
    for(let c =0; c < tetromino[r].length; c++){
        if(tetromino[r][c] === "o"  ){
            gameBoard[row + r][col + c + 1 ] = "o"
        }
    }
   }
   position.col += 1
}

export function moveTetrominoLowestPoint(gameBoard, tetromino, position, gameState, gameloopObject) {
    let dropY = position.row;

    while (!checkCollisions(tetromino, { row: dropY, col: position.col }, "down", gameBoard)) {
        dropY++; 
    }

     position.row = dropY ;

    placeTetromino(gameBoard, tetromino, position);
    const { newBoard, clearedLines, garbageLines } = clearFullLine(gameBoard);
    const score = addScore(clearedLines, gameloopObject)
    updateLeaderboard(score, userName, gameloopObject)
    
    gameBoard.length = 0;
    gameBoard.push(...newBoard); 

    position.row = 0
    position.col = 3;
    gameState.activeTetromino = null;

}