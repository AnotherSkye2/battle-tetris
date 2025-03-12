import { gameState, roomId, userName, userNames } from "./gameDefaultValues.js";
import { socket } from "../socket.js";

export function checkGameOver(gameGridArray) {
    for (let col = 0; col < gameGridArray[0].length; col++) {
        if (gameGridArray[0][col] !== "") {
            return true; 
        }
    }
    return false; 
}

export function checkGameWin() {
    if (gameState.playersLost >= userNames.length - 1 && !gameState.isGameOver) {
        gameState.isGameWon = true
        return true; 
    }
    return false;
}

export function gameOver() {
    const gameOverScreen = createGameOverScreen()
    document.body.appendChild(gameOverScreen);
    socket.emit('game over', roomId, userName)
    gameState.isGameOver = true; 
}

function createGameOverScreen() {
    const gameOverScreen = document.createElement("div");
    gameOverScreen.id = "gameOverScreen";
    gameOverScreen.classList.add("game-menu", "game-over-screen");
    
    const menuText = document.createElement("h2");
    menuText.innerText = gameState.isGameWon ? "You won!" : "You lost...";
    gameOverScreen.appendChild(menuText);

    const leaderboard = document.getElementById("leaderboard")
    gameOverScreen.appendChild(leaderboard);

    const restartButton = document.createElement("button");
    restartButton.innerText = "Restart";
    //needs restart functionality
    gameOverScreen.appendChild(restartButton);

    const quitButton = document.createElement("button")
    quitButton.innerText = "Quit";
    gameOverScreen.appendChild(quitButton);
    quitButton.addEventListener("click", () =>{  // liigutan selle createGameMenusse
        const path = window.location.pathname; 
        const gameId = path.split("/").pop(); 
        const baseUrl = window.location.origin; 
        window.location.href = `${baseUrl}/lobby/${gameId}`
        if(socket){
            socket.emit("disconnectUser",userName)
        }
    })
    return gameOverScreen
}