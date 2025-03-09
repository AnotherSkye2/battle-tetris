import { gameLoop } from "./gameLoop.js";

export function pauseGame(gameState){
    gameState.isGamePaused = true
    gameState.isTimerRunning = false;
}



export function resumeGame(gameBoard, tetrominoes, position, gameBoardElement, gameState) {
    if (!gameState.isGamePaused) return; 
    gameState.isGamePaused = false;
    requestAnimationFrame((timestamp) => 
        gameLoop(timestamp, gameBoard, tetrominoes, position, gameBoardElement, gameState)
    );
}