import { renderGameBoard, InitializeGameBoard } from './gameBoard.js';
import { placeTetromino } from './tetrominoManipulation.js';
import { selectRandomTetromino } from './selectTetromino.js';
import { moveTetrominoDown } from './tetrominoMoves.js';
import { clearTetromino } from './tetrominoManipulation.js';
import { clearFullLine } from './clearLine.js';
import { checkGameOver,gameOver } from './gameOver.js';
let lastTime = 0;
let timeSinceLastMove = 0;
const moveInterval = 1000; 

export function gameLoop(timestamp, gameBoard, tetrominoes, position, gameBoardElement,gameState) {
    if(gameState.isGameOver || gameState.isGamePaused ){
        return;
    }
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    timeSinceLastMove += deltaTime;
    
    if (!gameState.activeTetromino) {
        gameState.activeTetromino = selectRandomTetromino(tetrominoes);
    }

    updateGame(deltaTime, gameBoard, gameState.activeTetromino, position,tetrominoes,gameState);  
    renderGameBoard(gameBoardElement, gameBoard);  

    requestAnimationFrame((newTimestamp) => 
        gameLoop(newTimestamp, gameBoard, tetrominoes, position, gameBoardElement,gameState)
    ); 
}


function updateGame(dTime,gameBoard,tetromino,position,tetrominoes,gameState){
    if(timeSinceLastMove >= moveInterval) {
        clearTetromino(gameBoard, tetromino, position);
        const moved = moveTetrominoDown(gameBoard,tetromino,position)
        if(!moved){

            placeTetromino(gameBoard,tetromino,position)

            const { newBoard, clearedLines,garbageLines } = clearFullLine(gameBoard);
            gameBoard.length = 0;
            gameBoard.push(...newBoard); 

            gameState.activeTetromino = selectRandomTetromino(tetrominoes);
            position.row = 0;
            position.col = 4; 

            if (checkGameOver(gameBoard, gameState.activeTetromino, position)) {
                gameOver(); 
                return;
            }
        }
        timeSinceLastMove = 0;
    }
    
}



requestAnimationFrame(gameLoop);  