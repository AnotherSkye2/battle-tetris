import { checkCollisions } from "./collisionCheck.js";
import { gameState } from "./gameDefaultValues.js";


export function checkGameOver(gameGridArray, tetromino, position) {
    return checkCollisions(tetromino, position, "down", gameGridArray);
}


export function gameOver() {
    alert("Game Over!");
    gameState.isGameOver = true; 

}