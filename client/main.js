import { renderGameBoard, InitializeGameBoard } from './gameBoard.js';
import { placeTetromino,rotateTetromino,clearTetromino} from './tetrominoManipulation.js';
import { moveTetrominoDown,moveTetrominoLeft,moveTetrominoRight, moveTetrominoLowestPoint } from './tetrominoMoves.js';
import { checkCollisions, wallCollisionCheck } from './collisionCheck.js';
import { gameLoop } from './gameLoop.js';
import { TETROMINOES } from './tetrominoes.js';
import { arrowDown$,arrowLeft$,arrowRight$,arrowUp$,spaceBar$,escKey$ } from './observables.js';
import { position, gameState } from './gameDefaultValues.js';
import { pauseGame, resumeGame } from './pauseGame.js';

const { gameBoardElement, gameBoard } = InitializeGameBoard();

renderGameBoard(gameBoardElement, gameBoard);

gameLoop(0,gameBoard,TETROMINOES,position,gameBoardElement,gameState)

arrowUp$.subscribe(() => {
    if (gameState.isGamePaused) return;
    if (!gameState.activeTetromino) return; 

    clearTetromino(gameBoard, gameState.activeTetromino, position); 

    const rotatedTetro = rotateTetromino(gameState.activeTetromino)
    
    const hasCollision = checkCollisions(rotatedTetro,position, "rotate" ,gameBoard)


    if(!hasCollision){
        gameState.activeTetromino = rotatedTetro
    }else{
        console.log("collision detected")
    }
    
    placeTetromino(gameBoard, gameState.activeTetromino, position); 
    renderGameBoard(gameBoardElement, gameBoard); 
});

arrowDown$.subscribe(() =>{
    if (gameState.isGamePaused) return;
    clearTetromino(gameBoard, gameState.activeTetromino, position);

    const collision = checkCollisions(gameState.activeTetromino,position,"down",gameBoard)
    if(!collision){
        moveTetrominoDown(gameBoard,gameState.activeTetromino,position)
    }
    placeTetromino(gameBoard, gameState.activeTetromino, position);
})

arrowLeft$.subscribe(() => {
    if (gameState.isGamePaused) return;
     clearTetromino(gameBoard, gameState.activeTetromino, position);

    const collision = checkCollisions(gameState.activeTetromino,position,"left",gameBoard)
    if(!collision){
        moveTetrominoLeft(gameBoard,gameState.activeTetromino,position);
    }

    placeTetromino(gameBoard, gameState.activeTetromino, position);
   
});

arrowRight$.subscribe(() =>{
    if (gameState.isGamePaused) return;

    clearTetromino(gameBoard, gameState.activeTetromino, position);
    
    const collision = checkCollisions(gameState.activeTetromino,position,"right",gameBoard)
    if(!collision){
        moveTetrominoRight(gameBoard,gameState.activeTetromino,position);
    }
    placeTetromino(gameBoard, gameState.activeTetromino, position);
})

spaceBar$.subscribe(() =>{
    if (gameState.isGamePaused) return;
    if (!gameState.activeTetromino) return;

    clearTetromino(gameBoard, gameState.activeTetromino, position);

    moveTetrominoLowestPoint(gameBoard, gameState.activeTetromino, position);

    renderGameBoard(gameBoardElement, gameBoard);
    
})

escKey$.subscribe(() =>{
    if(gameState.isGamePaused){
        resumeGame(gameBoard,TETROMINOES,position,gameBoardElement,gameState)
    }else{
        pauseGame(gameState)
    }
})






