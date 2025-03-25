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
    if (userNames.length > 1 && gameState.playersLost.length >= userNames.length - 1 && !gameState.isGameOver) {
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
    gameOverScreen.classList.add("game-menu", "game-over-screen", "pixel-corners");
    
    const menuText = document.createElement("h2");
    menuText.innerText = gameState.isGameWon ? "You won!" : `You lost...\nYou were KO'd by ${gameState.garbageSender}`;
    gameOverScreen.appendChild(menuText);

    const leaderboard = document.getElementById("leaderboard")
    gameOverScreen.appendChild(leaderboard);

    const restartButton = document.createElement("button");
    restartButton.innerText = "Restart";
    restartButton.classList.add("pixel-corners")
    restartButton.addEventListener("click", () =>{
        if(socket){
            socket.emit("restart",{roomId,userName})
        }
    })

    gameOverScreen.appendChild(restartButton);

    const quitButton = document.createElement("button")
    quitButton.innerText = "Quit";
    quitButton.classList.add("pixel-corners")
    quitButton.addEventListener("click", () =>{ 
        const path = window.location.pathname; 
        const pathLength = path.length
        const gameId = path.split("/").pop(); 
        const baseUrl = window.location.origin; 

        window.location.href = `${baseUrl}/${pathLength == 2 ? "lobby" : "single/lobby"}/${gameId}`
        if(socket){
            socket.emit("disconnectUser",{roomId,userName})
        }
    })
    gameOverScreen.appendChild(quitButton);
    return gameOverScreen
}