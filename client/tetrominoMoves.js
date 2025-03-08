import { placeTetromino } from "./tetrominoManipulation.js";
import { checkCollisions,wallCollisionCheck } from "./collisionCheck.js";

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
            if (shape[r][c] === 1) { 
                gameBoard[row + r][col + c] = 0; 
            }
        }
    }
    position.row += 1;

    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c] === 1) { 
                gameBoard[position.row + r][position.col + c] = 1; 
            }
        }
    }
    return true
}

export function moveTetrominoLeft(gameBoard,tetromino,position) {
   const {row,col} = position

   for(let r = 0; r < tetromino.length; r++){
    for(let c =0; c < tetromino[r].length; c++){
        if(tetromino[r][c] === 1  ){
            gameBoard[row + r][col + c - 1 ] = 1
        }
    }
   }
   position.col -= 1
}

export function moveTetrominoRight(gameBoard,tetromino,position){
   const {row,col} = position

   for(let r = 0; r < tetromino.length; r++){
    for(let c =0; c < tetromino[r].length; c++){
        if(tetromino[r][c] === 1  ){
            gameBoard[row + r][col + c + 1 ] = 1
        }
    }
   }
   position.col += 1
}
