import { renderGameBoard, InitializeGameBoard } from './gameBoard.js';
import { placeTetromino } from './tetrominoManipulation.js';
import { selectRandomTetromino } from './selectTetromino.js';
import { moveTetrominoDown } from './tetrominoMoves.js';
import { clearTetromino } from './tetrominoManipulation.js';
import { clearFullLine } from './clearLine.js';
import { checkGameOver,gameOver } from './gameOver.js';
import { roomId, userName } from '../methods/gameDefaultValues.js';
import { addScore, updateLeaderboard } from './gameScore.js';
import { socket } from '../socket.js';


let lastTime = 0;
let timeSinceLastMove = 0;
const moveInterval = 400; 

export function gameLoop(gameloopObject) {
    if(gameloopObject.gameState.isGameOver || gameloopObject.gameState.isGamePaused ){
        return;
    }

    if (gameloopObject.gameState.gameOverPending) {
        gameOver(); 
        gameloopObject.gameState.gameOverPending = false; 
        return;
    }
    const deltaTime = gameloopObject.timestamp - lastTime;
    lastTime = gameloopObject.timestamp;

    timeSinceLastMove += deltaTime;
    
    if (!gameloopObject.gameState.activeTetromino) {
        [gameloopObject.gameState.activeTetromino, gameloopObject.gameState.tetrominoType] = selectRandomTetromino(gameloopObject.gameState,gameloopObject.tetrominoes);
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
        clearTetromino(gameloopObject);
        const moved = moveTetrominoDown(gameloopObject)
        if(!moved){
            placeTetromino(gameloopObject)

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

            gameloopObject.gameGridArray.length = 0;
            gameloopObject.gameGridArray.push(...newBoard); 
            

            if (checkGameOver(gameloopObject.gameGridArray)) {
                console.log("checkGameOver")
                gameloopObject.gameState.gameOverPending = true; 
                return;
            }
            [gameloopObject.gameState.activeTetromino, gameloopObject.gameState.tetrominoType] = selectRandomTetromino(gameloopObject.gameState,gameloopObject.tetrominoes);
            gameloopObject.position.row = 0;
            gameloopObject.position.col = 4; 

        }
        timeSinceLastMove = 0;
    }
    
}



requestAnimationFrame(gameLoop);  