import { checkCollisions } from "./collisionCheck.js";
import { gameState } from "./gameDefaultValues.js";


export function checkGameOver(gameGridArray) {
    for (let col = 0; col < gameGridArray[0].length; col++) {
        if (gameGridArray[0][col] !== 0) {
            return true; 
        }
    }
    return false; 
}

export function gameOver() {
    alert("Game Over!");
    gameState.isGameOver = true; 

}