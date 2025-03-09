import { renderGameBoard,InitializeGameBoard } from '../methods/gameBoard.js';
import { placeTetromino,rotateTetromino,clearTetromino } from '../methods/tetrominoManipulation.js';
import { moveTetrominoDown,moveTetrominoLeft,moveTetrominoRight,moveTetrominoLowestPoint } from '../methods/tetrominoMoves.js';
import { checkCollisions } from '../methods/collisionCheck.js';
import { gameLoop } from '../methods/gameLoop.js';
import { TETROMINOES } from '../methods/tetrominoes.js';
import { arrowDown$,arrowLeft$,arrowRight$,arrowUp$,spaceBar$,escKey$ } from '../methods/observables.js';
import { position,gameState } from '../methods/gameDefaultValues.js';
import { pauseGame,resumeGame } from '../methods/pauseGame.js';


export default function Game() {
    const users = JSON.parse(sessionStorage.getItem("users"))

    const { gameBoardElement, gameBoardGrid, gameGridArray, opponentGridDataArray} = InitializeGameBoard(users);

    console.log(gameBoardElement, gameBoardGrid, gameGridArray)

    renderGameBoard(gameBoardGrid, gameGridArray);

    gameLoop(0,gameGridArray,TETROMINOES,position,gameBoardGrid,gameState,opponentGridDataArray)

    arrowUp$.subscribe(() => {
        if (gameState.isGamePaused || gameState.isGameOver) return;
        if (!gameState.activeTetromino) return; 

        clearTetromino(gameGridArray, gameState.activeTetromino, position); 

        const rotatedTetro = rotateTetromino(gameState.activeTetromino)
        
        const hasCollision = checkCollisions(rotatedTetro,position, "rotate" ,gameGridArray)


        if(!hasCollision){
            gameState.activeTetromino = rotatedTetro
        }else{
            console.log("collision detected")
        }
        
        placeTetromino(gameGridArray, gameState.activeTetromino, position); 
        renderGameBoard(gameBoardGrid, gameGridArray); 
    });

    arrowDown$.subscribe(() =>{
        if (gameState.isGamePaused || gameState.isGameOver) return;
        clearTetromino(gameGridArray, gameState.activeTetromino, position);

        const collision = checkCollisions(gameState.activeTetromino,position,"down",gameGridArray)
        if(!collision){
            moveTetrominoDown(gameGridArray,gameState.activeTetromino,position)
        }
        placeTetromino(gameGridArray, gameState.activeTetromino, position);
    })

    arrowLeft$.subscribe(() => {
        if (gameState.isGamePaused || gameState.isGameOver) return;;
        clearTetromino(gameGridArray, gameState.activeTetromino, position);

        const collision = checkCollisions(gameState.activeTetromino,position,"left",gameGridArray)
        if(!collision){
            moveTetrominoLeft(gameGridArray,gameState.activeTetromino,position);
        }

        placeTetromino(gameGridArray, gameState.activeTetromino, position);
    
    });

    arrowRight$.subscribe(() =>{
        if (gameState.isGamePaused || gameState.isGameOver) return;

        clearTetromino(gameGridArray, gameState.activeTetromino, position);
        
        const collision = checkCollisions(gameState.activeTetromino,position,"right",gameGridArray)
        if(!collision){
            moveTetrominoRight(gameGridArray,gameState.activeTetromino,position);
        }
        placeTetromino(gameGridArray, gameState.activeTetromino, position);
    })

    spaceBar$.subscribe(() =>{
        if (gameState.isGamePaused || gameState.isGameOver) return;
        if (!gameState.activeTetromino) return;

        clearTetromino(gameGridArray, gameState.activeTetromino, position);

        moveTetrominoLowestPoint(gameGridArray, gameState.activeTetromino, position,gameState);

        renderGameBoard(gameBoardGrid, gameGridArray);
        
    })

    escKey$.subscribe(() =>{
        if(gameState.isGamePaused){
            resumeGame(gameGridArray,TETROMINOES,position,gameBoardGrid,gameState)
        }else{
            pauseGame(gameState)
        }
    })
}







