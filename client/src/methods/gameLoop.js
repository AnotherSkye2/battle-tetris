import { renderGameBoard, InitializeGameBoard } from './gameBoard.js';
import { placeTetromino } from './tetrominoManipulation.js';
import { selectRandomTetromino } from './selectTetromino.js';
import { moveTetrominoDown } from './tetrominoMoves.js';
import { clearTetromino } from './tetrominoManipulation.js';
import { clearFullLine } from './clearLine.js';
import { checkGameOver,gameOver } from './gameOver.js';
import { roomId, userName } from '../methods/gameDefaultValues.js';
import { addScore, updateLeaderboard } from './gameScore.js';


let lastTime = 0;
let timeSinceLastMove = 0;
const moveInterval = 400; 

export function gameLoop(gameloopObject) {
    if(gameloopObject.gameState.isGameOver || gameloopObject.gameState.isGamePaused ){
        return;
    }
    const deltaTime = gameloopObject.timestamp - lastTime;
    lastTime = gameloopObject.timestamp;

    timeSinceLastMove += deltaTime;
    
    if (!gameloopObject.gameState.activeTetromino) {
        gameloopObject.gameState.activeTetromino = selectRandomTetromino(gameloopObject.tetrominoes);
    }
    updateGame(deltaTime, gameloopObject);  
    renderGameBoard(gameloopObject.gameBoardGrid, gameloopObject.gameGridArray);
    if (gameloopObject.socket) {   
        gameloopObject.socket.emit('board state', roomId, gameloopObject.gameGridArray)
        for (let i = 0; i < gameloopObject.opponentGridDataArray.length; i++) {
            const opponentGameBoardGrid = gameloopObject.opponentGridDataArray[i].gameBoardGrid 
            const opponentGameGridArray = gameloopObject.opponentGridDataArray[i].gameGridArray 
            renderGameBoard(opponentGameBoardGrid, opponentGameGridArray)
        }
    }
    requestAnimationFrame((newTimestamp) => {
        gameloopObject.timestamp = newTimestamp
        gameLoop(gameloopObject)
    }); 
}


function updateGame(dTime,gameloopObject){
    if(timeSinceLastMove >= moveInterval) {
        clearTetromino(gameloopObject.gameGridArray, gameloopObject.gameState.activeTetromino, gameloopObject.position);
        const moved = moveTetrominoDown(gameloopObject.gameGridArray,gameloopObject.gameState.activeTetromino,gameloopObject.position)
        if(!moved){
            placeTetromino(gameloopObject.gameGridArray,gameloopObject.gameState.activeTetromino,gameloopObject.position)
            const { newBoard, clearedLines,garbageLines } = clearFullLine(gameloopObject.gameGridArray);
            const score = addScore(clearedLines, gameloopObject)
            updateLeaderboard(score, userName, gameloopObject)
            gameloopObject.gameGridArray.length = 0;
            gameloopObject.gameGridArray.push(...newBoard); 

            if (checkGameOver(gameloopObject.gameGridArray, gameloopObject.gameState.activeTetromino, { row: 0, col: 4 })) {
                gameOver();
                return; 
            }
            gameloopObject.gameState.activeTetromino = selectRandomTetromino(gameloopObject.tetrominoes);
            gameloopObject.position.row = 0;
            gameloopObject.position.col = 4; 

        }
        timeSinceLastMove = 0;
    }
    
}



requestAnimationFrame(gameLoop);  