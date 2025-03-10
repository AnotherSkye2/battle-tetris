import { gameLoop } from "./gameLoop.js";

export function pauseGame(gameState){
    gameState.isGamePaused = true
}



export function resumeGame(gameBoard, tetrominoes, position, gameBoardGrid, gameState, opponentGridDataArray, socket) {
    if (!gameState.isGamePaused) return; 
    gameState.isGamePaused = false;
    requestAnimationFrame((timestamp) => 
        gameLoop(timestamp, gameBoard, tetrominoes, position, gameBoardGrid, gameState, opponentGridDataArray, socket)
    );
}