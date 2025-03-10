import { renderGameBoard, InitializeGameBoard } from './gameBoard.js';
import { placeTetromino } from './tetrominoManipulation.js';
import { selectRandomTetromino } from './selectTetromino.js';
import { moveTetrominoDown } from './tetrominoMoves.js';
import { clearTetromino } from './tetrominoManipulation.js';
import { clearFullLine } from './clearLine.js';
import { checkGameOver,gameOver } from './gameOver.js';
import { roomId } from './gameDefaultValues.js';

let lastTime = 0;
let timeSinceLastMove = 0;
const moveInterval = 400; 

export function gameLoop(timestamp, gameGridArray, tetrominoes, position, gameBoardGrid,gameState, opponentGridDataArray, socket) {
    if(gameState.isGameOver || gameState.isGamePaused ){
        return;
    }
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    timeSinceLastMove += deltaTime;
    
    if (!gameState.activeTetromino) {
        gameState.activeTetromino = selectRandomTetromino(tetrominoes);
    }
    updateGame(deltaTime, gameGridArray, gameState.activeTetromino, position,tetrominoes,gameState);  
    renderGameBoard(gameBoardGrid, gameGridArray);
    if (socket) {   
        socket.emit('board state', roomId, gameGridArray)
        for (let i = 0; i < opponentGridDataArray.length; i++) {
            const opponentGameBoardGrid = opponentGridDataArray[i].gameBoardGrid 
            const opponentGameGridArray = opponentGridDataArray[i].gameGridArray 
            renderGameBoard(opponentGameBoardGrid, opponentGameGridArray)
        }
    }
    requestAnimationFrame((newTimestamp) => 
        gameLoop(newTimestamp, gameGridArray, tetrominoes, position, gameBoardGrid,gameState, opponentGridDataArray, socket)
    ); 
}


function updateGame(dTime,gameGridArray,tetromino,position,tetrominoes,gameState){
    if(timeSinceLastMove >= moveInterval) {
        clearTetromino(gameGridArray, tetromino, position);
        const moved = moveTetrominoDown(gameGridArray,tetromino,position)
        if(!moved){

            placeTetromino(gameGridArray,tetromino,position)

            const { newBoard, clearedLines,garbageLines } = clearFullLine(gameGridArray);
            gameGridArray.length = 0;
            gameGridArray.push(...newBoard); 

            if (checkGameOver(gameGridArray, gameState.activeTetromino, { row: 0, col: 4 })) {
                gameOver();
                return; 
            }
            gameState.activeTetromino = selectRandomTetromino(tetrominoes);
            position.row = 0;
            position.col = 4; 

        }
        timeSinceLastMove = 0;
    }
    
}



requestAnimationFrame(gameLoop);  