import { fromEvent,filter,throttleTime } from 'https://cdn.jsdelivr.net/npm/rxjs@7.8.1/+esm';
import { renderGameBoard, InitializeGameBoard } from './gameBoard.js';
import { placeTetromino,rotateTetromino,clearTetromino} from './tetrominoManipulation.js';
import { moveTetrominoDown,moveTetrominoLeft,moveTetrominoRight, moveTetrominoLowestPoint } from './tetrominoMoves.js';
import { checkCollisions, wallCollisionCheck } from './collisionCheck.js';
import { gameLoop } from './gameLoop.js';
import { TETROMINOES } from './tetrominoes.js';



const position = {row: 0, col: 3}; 
const gameState = { activeTetromino: null };

const { gameBoardElement, gameBoard } = InitializeGameBoard();

// placeTetromino(gameBoard,TETROMINOES.L_PIECE,position)

renderGameBoard(gameBoardElement, gameBoard);

gameLoop(0,gameBoard,TETROMINOES,position,gameBoardElement,gameState)

const arrowUp$ = fromEvent(document, "keydown").pipe(
    filter((event) => event.key === "ArrowUp"),
    throttleTime(100)  
);
const arrowDown$ = fromEvent(document, "keydown").pipe(
    filter((event) => event.key === "ArrowDown"),
    throttleTime(100)  
);
const arrowLeft$ = fromEvent(document, "keydown").pipe(
    filter((event) => event.key === "ArrowLeft"),
    throttleTime(100)  
);
const arrowRight$ = fromEvent(document, "keydown").pipe(
    filter((event) => event.key === "ArrowRight"),
    throttleTime(100)  
);
const spaceBar$ = fromEvent(document, "keydown").pipe(
    filter((event) => event.key === " "),
    throttleTime(100)  
);

arrowUp$.subscribe(() => {
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
    clearTetromino(gameBoard, gameState.activeTetromino, position);

    const collision = checkCollisions(gameState.activeTetromino,position,"down",gameBoard)
    if(!collision){
        moveTetrominoDown(gameBoard,gameState.activeTetromino,position)
    }
})

arrowLeft$.subscribe(() => {
     clearTetromino(gameBoard, gameState.activeTetromino, position);
    const collision = checkCollisions(gameState.activeTetromino,position,"left",gameBoard)
    if(!collision){
        clearTetromino(gameBoard, gameState.activeTetromino, position);
        moveTetrominoLeft(gameBoard,gameState.activeTetromino,position);
    }
});

arrowRight$.subscribe(() =>{
    clearTetromino(gameBoard, gameState.activeTetromino, position);
    
    const collision = checkCollisions(gameState.activeTetromino,position,"right",gameBoard)
    if(!collision){
        moveTetrominoRight(gameBoard,gameState.activeTetromino,position);
    }
})

spaceBar$.subscribe(() =>{
    if (!gameState.activeTetromino) return;

    clearTetromino(gameBoard, gameState.activeTetromino, position);

    moveTetrominoLowestPoint(gameBoard, gameState.activeTetromino, position);

    renderGameBoard(gameBoardElement, gameBoard);
    
})

// TODO: exclude activeTetro blocks, spacebar for instant bottom row, main.js kõik mis ei ole loogika importiks, gamepause = koik functionid loppevad




