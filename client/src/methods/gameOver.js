import { checkCollisions } from "./collisionCheck.js";
import { gameState } from "./gameDefaultValues.js";


export function checkGameOver(gameBoard, tetromino, position) {
    return checkCollisions(tetromino, position, "down", gameBoard);
}


export function gameOver() {
    alert("Game Over!");
    gameState.isGameOver = true; 

}