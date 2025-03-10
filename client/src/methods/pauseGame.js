import { gameLoop } from "./gameLoop.js";

export function pauseGame(gameState){
    gameState.isGamePaused = true
    gameState.isTimerRunning = false;
}



export function resumeGame(gameloopObject) {
    if (!gameloopObject.gameState.isGamePaused) return; 
    gameloopObject.gameState.isGamePaused = false;
    requestAnimationFrame((timestamp) => {
        gameloopObject.timestamp = timestamp
        gameLoop(gameloopObject)
    });
}