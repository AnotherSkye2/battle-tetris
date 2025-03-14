import { renderGameBoard } from './gameBoard.js';
import { placeTetromino,rotateTetromino,clearTetromino } from './tetrominoManipulation.js';
import { moveTetrominoDown,moveTetrominoLeft,moveTetrominoRight,moveTetrominoLowestPoint } from './tetrominoMoves.js';
import { checkCollisions } from './collisionCheck.js';
    
export function rotate(gameloopObject) {
    const gameState = gameloopObject.gameState

    if (gameState.isGamePaused || gameState.isGameOver) return;
    if (!gameState.activeTetromino) return; 

    clearTetromino(gameloopObject) 

    const rotatedTetro = rotateTetromino(gameState.activeTetromino)
    
    const hasCollision = checkCollisions(rotatedTetro,gameloopObject.position, "rotate" ,gameloopObject.gameGridArray)


    if(!hasCollision){
        gameState.activeTetromino = rotatedTetro
    }else{
        console.log("collision detected")
    }
    
    placeTetromino(gameloopObject); 
    renderGameBoard(gameloopObject.gameBoardGrid, gameloopObject.gameGridArray); 
};

export function down(gameloopObject) {
    const gameState = gameloopObject.gameState

    if (gameState.isGamePaused || gameState.isGameOver) return;
    if(!gameState.activeTetromino){
        return
    }
    
    clearTetromino(gameloopObject)

    const collision = checkCollisions(gameState.activeTetromino,gameloopObject.position,"down",gameloopObject.gameGridArray)
    if(!collision){
        moveTetrominoDown(gameloopObject)
    }
    placeTetromino(gameloopObject);
}

export function left(gameloopObject) {
    const gameState = gameloopObject.gameState

    console.log("arrowLeft")
    if (gameState.isGamePaused || gameState.isGameOver) return;
    if(!gameState.activeTetromino){
        return
    }
    
    clearTetromino(gameloopObject)

    const collision = checkCollisions(gameState.activeTetromino,gameloopObject.position,"left",gameloopObject.gameGridArray)
    if(!collision){
        moveTetrominoLeft(gameloopObject);
    }

    placeTetromino(gameloopObject);

};

export function right(gameloopObject) {
    const gameState = gameloopObject.gameState

    console.log("arrowRight")
    if (gameState.isGamePaused || gameState.isGameOver) return;
    if(!gameState.activeTetromino){
        return
    }
    

    clearTetromino(gameloopObject)
    
    const collision = checkCollisions(gameState.activeTetromino,gameloopObject.position,"right",gameloopObject.gameGridArray)
    if(!collision){
        moveTetrominoRight(gameloopObject);
    }
    placeTetromino(gameloopObject);
}

export function drop(gameloopObject, gameLoopObjectArray) {
    const gameState = gameloopObject.gameState

    if (gameState.isGamePaused || gameState.isGameOver) return;
    if (!gameState.activeTetromino) return;

    clearTetromino(gameloopObject)

    moveTetrominoLowestPoint(gameloopObject, gameLoopObjectArray);

    renderGameBoard(gameloopObject.gameBoardGrid, gameloopObject.gameGridArray);
    
}