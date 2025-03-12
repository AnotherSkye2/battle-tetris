import { gameLoop } from "./gameLoop.js";

export function pauseGame(gameState){
    if (!gameState.isGameOver) {
        gameState.isGamePaused = true
        gameState.isTimerRunning = false;
    }
}



export function resumeGame(gameloopObject) {
    if (!gameloopObject.gameState.isGamePaused && !gameloopObject.gameState.isGameOver) return; 
    gameloopObject.gameState.isGamePaused = false;
    requestAnimationFrame((timestamp) => {
        gameloopObject.timestamp = timestamp
        gameLoop(gameloopObject)
    });
}