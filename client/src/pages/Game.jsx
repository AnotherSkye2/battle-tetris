import { renderGameBoard } from '../methods/gameBoard.js';
import { placeTetromino,rotateTetromino,clearTetromino } from '../methods/tetrominoManipulation.js';
import { moveTetrominoDown,moveTetrominoLeft,moveTetrominoRight,moveTetrominoLowestPoint } from '../methods/tetrominoMoves.js';
import { checkCollisions } from '../methods/collisionCheck.js';
import { gameLoop } from '../methods/gameLoop.js';
import { arrowDown$,arrowLeft$,arrowRight$,arrowUp$,spaceBar$,escKey$ } from '../methods/observables.js';
import { position,gameState,roomId, userName} from '../methods/gameDefaultValues.js';
import { socket } from '../socket.js';
import { startTimer } from '../methods/createTimer.js';
import gameInit from '../config/gameInit.js';


export default function Game() {

    const { gameloopObject, gameLoopObjectArray } = gameInit()
    gameLoop(gameloopObject, gameLoopObjectArray)
    
    startTimer()
    
    arrowUp$.subscribe(() => {
        if (gameState.isGamePaused || gameState.isGameOver) return;
        if (!gameState.activeTetromino) return; 

        clearTetromino(gameloopObject) 

        const rotatedTetro = rotateTetromino(gameState.activeTetromino)
        
        const hasCollision = checkCollisions(rotatedTetro,position, "rotate" ,gameloopObject.gameGridArray)


        if(!hasCollision){
            gameState.activeTetromino = rotatedTetro
        }else{
            console.log("collision detected")
        }
        
        placeTetromino(gameloopObject); 
        renderGameBoard(gameloopObject.gameBoardGrid, gameloopObject.gameGridArray); 
    });

    arrowDown$.subscribe(() =>{
        if (gameState.isGamePaused || gameState.isGameOver) return;
        if(!gameState.activeTetromino){
            return
        }
        
        clearTetromino(gameloopObject)

        const collision = checkCollisions(gameState.activeTetromino,position,"down",gameloopObject.gameGridArray)
        if(!collision){
            moveTetrominoDown(gameloopObject)
        }
        placeTetromino(gameloopObject);
    })

    arrowLeft$.subscribe(() => {
        console.log("arrowLeft", gameloopObject.position)
        if (gameState.isGamePaused || gameState.isGameOver) return;
        if(!gameState.activeTetromino){
            return
        }
        
        clearTetromino(gameloopObject)

        const collision = checkCollisions(gameState.activeTetromino,position,"left",gameloopObject.gameGridArray)
        if(!collision){
            moveTetrominoLeft(gameloopObject);
        }

        placeTetromino(gameloopObject);
    
    });

    arrowRight$.subscribe(() =>{
        console.log("arrowRight", gameloopObject.position)
        if (gameState.isGamePaused || gameState.isGameOver) return;
        if(!gameState.activeTetromino){
            return
        }
        

        clearTetromino(gameloopObject)
        
        const collision = checkCollisions(gameState.activeTetromino,position,"right",gameloopObject.gameGridArray)
        if(!collision){
            moveTetrominoRight(gameloopObject);
        }
        placeTetromino(gameloopObject);
    })

    spaceBar$.subscribe(() =>{
        if (gameState.isGamePaused || gameState.isGameOver) return;
        if (!gameState.activeTetromino) return;

        clearTetromino(gameloopObject)

        moveTetrominoLowestPoint(gameloopObject, gameLoopObjectArray);

        renderGameBoard(gameloopObject.gameBoardGrid, gameloopObject.gameGridArray);
        
    })

    escKey$.subscribe(() =>{
        console.log(gameState, socket)
        if (gameState.isGamePaused && !gameState.isGameOver && socket) {
            socket.emit("resume", {roomId,userName})
        }else{
            socket.emit('pause', { roomId,userName });
        }
    })
}



