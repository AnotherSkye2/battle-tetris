import { renderGameBoard, InitializeGameBoard } from './gameBoard.js';
import { placeTetromino } from './tetrominoManipulation.js';
import { selectRandomTetromino } from './selectTetromino.js';
import { moveTetrominoDown } from './tetrominoMoves.js';
import { clearTetromino } from './tetrominoManipulation.js';
import { clearFullLine } from './clearLine.js';
import { checkGameOver,checkGameWin,gameOver } from './gameOver.js';
import { gameState, levelMoveIntervals, roomId, timeToLevelUp, userNames } from '../methods/gameDefaultValues.js';
import { addScore, updateLeaderboard } from './gameScore.js';
import { socket } from '../socket.js';
import { addLines } from './addLine.js';
import { TETROMINOES } from "../methods/tetrominoes.js";
import makeBotMove from '../botMethods/makeBotMove.js';
import sendGarbage from './sendGarbage.js';

let lastTime = 0;

export function gameLoop(mainGameloopObject, gameLoopObjectArray) {
    if(mainGameloopObject.gameState.isGameOver || mainGameloopObject.gameState.isGamePaused ){
        return;
    }

    if (checkGameWin()) {
        console.log("checkGameWin")
        gameOver(); 
        return;
    }
    if (mainGameloopObject.gameState.gameOverPending) {
        gameOver(); 
        mainGameloopObject.gameState.gameOverPending = false; 
        return;
    }

    const deltaTime = mainGameloopObject.timestamp - lastTime;
    lastTime = mainGameloopObject.timestamp;


    if (!gameState.activeTetromino) {
        [mainGameloopObject.gameState.activeTetromino, mainGameloopObject.gameState.tetrominoType] = selectRandomTetromino(mainGameloopObject.gameState, TETROMINOES);
    }

    if(mainGameloopObject.botGameLoopObjects.length >= 1){
        for(let i = 0; i < mainGameloopObject.botGameLoopObjects.length; i++) {
            const botGameState = mainGameloopObject.botGameLoopObjects[i].gameState
            if (!botGameState.gameOverPending && !botGameState.isGameOver) {
                if (!botGameState.activeTetromino) {
                    [botGameState.activeTetromino, botGameState.tetrominoType] = selectRandomTetromino(botGameState, TETROMINOES);
                }
                makeBotMove(deltaTime, mainGameloopObject.botGameLoopObjects[i], gameLoopObjectArray)
                updateGame(deltaTime,mainGameloopObject.botGameLoopObjects[i], gameLoopObjectArray)
            } else {
                botGameState.isGameOver = true
                gameState.playersLost += 1
                mainGameloopObject.gameState.gameOverPending = false; 
            }
        }
    }

    updateGame(deltaTime, mainGameloopObject, gameLoopObjectArray);  
    renderGameBoard(mainGameloopObject.gameBoardGrid, mainGameloopObject.gameGridArray);

    if (mainGameloopObject.socket) {   
        mainGameloopObject.socket.emit('board state', roomId, mainGameloopObject.gameGridArray)
        for (let i = 0; i < mainGameloopObject.opponentGridDataArray.length; i++) {
            const opponentGameBoardGrid = mainGameloopObject.opponentGridDataArray[i].gameBoardGrid 
            const opponentGameGridArray = mainGameloopObject.opponentGridDataArray[i].gameGridArray 
            renderGameBoard(opponentGameBoardGrid, opponentGameGridArray)
        }
    }
    requestAnimationFrame((newTimestamp) => {
        mainGameloopObject.timestamp = newTimestamp
        if(mainGameloopObject.botGameLoopObjects.length >= 1){
            for(let i = 0; i < mainGameloopObject.botGameLoopObjects.length; i++) {
                mainGameloopObject.botGameLoopObjects[i].timestamp = newTimestamp
            }
        }
        gameLoop(mainGameloopObject, gameLoopObjectArray)
    }); 
}

function updateGame(deltaTime,gameloopObject, gameLoopObjectArray){
    const moveInterval = levelMoveIntervals[gameloopObject.gameState.level]
    gameloopObject.timeSinceLastMove += deltaTime;
    gameloopObject.gameState.timeSinceLastLevel += deltaTime;
    if(gameloopObject.timeSinceLastMove >= moveInterval) {
        clearTetromino(gameloopObject);
        const moved = moveTetrominoDown(gameloopObject)
        if(!moved){
            placeTetromino(gameloopObject)

            let { newBoard, clearedLines } = clearFullLine(gameloopObject.gameGridArray);
            const score = addScore(clearedLines, gameloopObject)
            updateLeaderboard(score, gameloopObject.name, gameloopObject)
            if (clearedLines > 1) {
                sendGarbage(clearedLines, gameloopObject, gameLoopObjectArray)
            }
            if (gameloopObject.gameState.garbageLines > 0) {
                newBoard = addLines(newBoard, gameloopObject.gameState.garbageLines)
                gameloopObject.gameState.garbageLines = 0
            }

            gameloopObject.gameGridArray.length = 0;
            gameloopObject.gameGridArray.push(...newBoard); 
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
            [gameloopObject.gameState.activeTetromino, gameloopObject.gameState.tetrominoType] = selectRandomTetromino(gameloopObject.gameState, TETROMINOES);
            gameloopObject.position.row = 0;
            gameloopObject.position.col = 4; 

        }
        gameloopObject.timeSinceLastMove = 0;
    }
    
}



requestAnimationFrame(gameLoop);  