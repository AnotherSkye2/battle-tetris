import { renderGameBoard, InitializeGameBoard } from './gameBoard.js';
import { placeTetromino } from './tetrominoManipulation.js';
import { selectRandomTetromino } from './selectTetromino.js';
import { moveTetrominoDown, moveTetrominoLowestPoint } from './tetrominoMoves.js';
import { clearTetromino } from './tetrominoManipulation.js';
import { clearFullLine } from './clearLine.js';
import { checkGameOver,checkGameWin,gameOver } from './gameOver.js';
import { gameState, levelMoveIntervals, roomId, timeToLevelUp, userName } from '../methods/gameDefaultValues.js';
import { addScore, updateLeaderboard } from './gameScore.js';
import { socket } from '../socket.js';
import { addLines } from './addLine.js';
import { placeBotTetromino } from '../botMethods/botTetrManipulation.js';
import { moveBotTetrominoDown } from '../botMethods/moveBotDown.js';
import { clearBotTetromino } from '../botMethods/clearBotTetr.js';

let lastTime = 0;
let timeSinceLastMove = 0;

export function gameLoop(gameloopObject) {
    if(gameloopObject.gameState.isGameOver || gameloopObject.gameState.isGamePaused ){
        return;
    }

    if (checkGameWin()) {
        console.log("checkGameWin")
        gameOver(); 
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
    gameloopObject.gameState.timeSinceLastLevel += deltaTime;

    if (!gameState.activeTetromino) {
        [gameloopObject.gameState.activeTetromino, gameloopObject.gameState.tetrominoType] = selectRandomTetromino(gameloopObject.gameState,gameloopObject.tetrominoes);
    }

    if(gameloopObject.botGameLoopObjects.length > 1){
        updateBotBoards(gameloopObject,gameloopObject.botGameLoopObjects,deltaTime)
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

function updateBotBoards(gameloopObject,botGameLoopObjects,deltaTime){

    console.log(botGameLoopObjects)
    botGameLoopObjects.forEach((botLoopObject,index) => {
        const moveInterval = levelMoveIntervals[gameloopObject.gameState.level];
        botLoopObject.timeSinceLastMove = (botLoopObject.timeSinceLastMove || 0) + deltaTime;
        
       
        if (botLoopObject.timeSinceLastMove >= moveInterval) {
            botLoopObject.timeSinceLastMove = 0;
            clearBotTetromino(botLoopObject,index)

            if(!botLoopObject.gameState.activeTetromino){
                [botLoopObject.gameState.activeTetromino, botLoopObject.gameState.tetrominoType] = selectRandomTetromino(gameloopObject.gameState, gameloopObject.tetrominoes);
            }
            

            const moved = moveBotTetrominoDown(botLoopObject,index)
            if(!moved){
                placeBotTetromino(botLoopObject,index); 


            [botLoopObject.gameState.activeTetromino, botLoopObject.gameState.tetrominoType] = selectRandomTetromino(gameloopObject.gameState, gameloopObject.tetrominoes);
            botLoopObject.position.row = 0;
            botLoopObject.position.col = 4; 
            }
            
            
        }

    })
}   



function updateGame(dTime,gameloopObject){
    const moveInterval = levelMoveIntervals[gameloopObject.gameState.level]
    if(timeSinceLastMove >= moveInterval) {
        clearTetromino(gameloopObject);
        const moved = moveTetrominoDown(gameloopObject)
        if(!moved){
            placeTetromino(gameloopObject)

            let { newBoard, clearedLines } = clearFullLine(gameloopObject.gameGridArray);
            const score = addScore(clearedLines, gameloopObject)
            updateLeaderboard(score, userName, gameloopObject)

            if (clearedLines > 1) {
                const users = gameloopObject.users
                let target = gameloopObject.gameState.target
                for (let i = 0; i < users.length; i++) {
                    // TESTING ONLY
                    if (!target && users[i].name != userName) {target = users[i].name}
                    // TESTING ONLY
                    console.log("users, target", users, target)
                    if (users[i].name === target) {
                        console.log("garbage send", users, target)
                        socket.emit('garbage', users[i].socketId, clearedLines)
                    }
                }
            }
            if (gameloopObject.gameState.garbageLines > 0) {
                newBoard = addLines(newBoard, gameloopObject.gameState.garbageLines)
                console.log(newBoard, gameloopObject.gameGridArray)
                gameloopObject.gameState.garbageLines = 0
            }

            gameloopObject.gameGridArray.length = 0;
            gameloopObject.gameGridArray.push(...newBoard); 
            console.log(gameState.timeSinceLastLevel)
            if (gameState.timeSinceLastLevel >= timeToLevelUp) {
                gameloopObject.gameState.level++
                console.log("level up", gameloopObject.gameState.level)
                gameState.timeSinceLastLevel = 0
            }

            if (checkGameOver(gameloopObject.gameGridArray) || checkGameWin()) {
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