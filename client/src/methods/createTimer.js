import { gameState } from "./gameDefaultValues";

let startTime = null; 
let pausedTime = 0;

export function startTimer() {

    const leaderboardContainer = document.querySelector(".leaderboard-container");

    let timerDiv = document.getElementById("timerDisplay");  // styling in index.css
    if (!timerDiv) {
        timerDiv = document.createElement("div");
        timerDiv.id = "timerDisplay";
        leaderboardContainer.prepend(timerDiv);
    }


    if (gameState.isGamePaused) {
        gameState.isTimerRunning = false; 
    }

    
    if (!gameState.isGamePaused && !gameState.isTimerRunning) {
        gameState.isTimerRunning = true; 
        startTime = performance.now() - pausedTime;
        requestAnimationFrame(updateTimer); 
    }
}

export function updateTimer(timestamp) {
    
    if (gameState.isGamePaused || gameState.isGameOver) {
        pausedTime = timestamp - startTime; 
        gameState.isTimerRunning = false; 
        return; 
    }

    
    if (startTime !== null && gameState.isTimerRunning) {
        const elapsed = (timestamp - startTime) / 1000; 
        const hours = Math.floor(elapsed / 3600); 
        const minutes = Math.floor((elapsed % 3600) / 60); 
        const seconds = Math.floor(elapsed % 60); 

        const timeString = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

        const timerDisplay = document.getElementById("timerDisplay");
        timerDisplay.innerText = timeString;

        requestAnimationFrame(updateTimer); 
    }
}

function padZero(value) {
    return value < 10 ? '0' + value : value;
}