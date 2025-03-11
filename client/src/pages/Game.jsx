import { renderGameBoard,InitializeGameBoard } from '../methods/gameBoard.js';
import { placeTetromino,rotateTetromino,clearTetromino } from '../methods/tetrominoManipulation.js';
import { moveTetrominoDown,moveTetrominoLeft,moveTetrominoRight,moveTetrominoLowestPoint } from '../methods/tetrominoMoves.js';
import { checkCollisions } from '../methods/collisionCheck.js';
import { gameLoop } from '../methods/gameLoop.js';
import { TETROMINOES } from '../methods/tetrominoes.js';
import { arrowDown$,arrowLeft$,arrowRight$,arrowUp$,spaceBar$,escKey$ } from '../methods/observables.js';
import { position,gameState,roomId, users, userName } from '../methods/gameDefaultValues.js';
import { pauseGame,resumeGame } from '../methods/pauseGame.js';
import { socket } from '../socket.js';
import { startTimer } from '../methods/createTimer.js';
import { createLeaderBoard } from '../methods/leaderboard.js';
import { updateLeaderboard } from '../methods/gameScore.js';

export default function Game() {


    const { gameElement, gameBoardElement, gameBoardGrid, gameGridArray, opponentGridDataArray} = InitializeGameBoard(users, userName);

    const userScoreElementArray = createLeaderBoard(gameElement)

    const gameloopObject = {
        timestamp: 0,
        gameGridArray: gameGridArray,
        tetrominoes: TETROMINOES,
        position: position,
        gameBoardGrid: gameBoardGrid,
        gameState: gameState,
        opponentGridDataArray: opponentGridDataArray,
        userScoreElementArray: userScoreElementArray,
        socket: socket
    } 

    console.log(gameBoardElement, gameBoardGrid, gameGridArray, opponentGridDataArray)

    if (socket) {
        console.log(socket)
        socket.connect();
        socket.emit('join', roomId, userName, (roomUsers) => {
            console.log("roomUsers, socket.id", roomUsers, socket.id)
        });
        socket.on('board state', (opponentGameGridArray, name) => {
            for (let i = 0; i < opponentGridDataArray.length; i++) {
                if (opponentGridDataArray[i].name == name) {
                    opponentGridDataArray[i].gameGridArray = opponentGameGridArray 
                }
            }
        })
        socket.on('score', (score, name) => {
            updateLeaderboard(score, name, gameloopObject)
        })
        const listener = () => {
            socket.emit('leave', roomId)
            socket.disconnect();
          }
        window.addEventListener("pagehide", listener);
    }

    console.log(gameBoardElement, gameBoardGrid, gameGridArray)

    renderGameBoard(gameBoardGrid, gameGridArray);

    gameLoop(gameloopObject)


startTimer()


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
        if(!gameState.activeTetromino){
            return
        }
        
        clearTetromino(gameGridArray, gameState.activeTetromino, position);

        const collision = checkCollisions(gameState.activeTetromino,position,"down",gameGridArray)
        if(!collision){
            moveTetrominoDown(gameGridArray,gameState.activeTetromino,position)
        }
        placeTetromino(gameGridArray, gameState.activeTetromino, position);
    })

    arrowLeft$.subscribe(() => {
        console.log("arrowLeft")
        if (gameState.isGamePaused || gameState.isGameOver) return;
        if(!gameState.activeTetromino){
            return
        }
        
        clearTetromino(gameGridArray, gameState.activeTetromino, position);

        const collision = checkCollisions(gameState.activeTetromino,position,"left",gameGridArray)
        if(!collision){
            moveTetrominoLeft(gameGridArray,gameState.activeTetromino,position);
        }

        placeTetromino(gameGridArray, gameState.activeTetromino, position);
    
    });

    arrowRight$.subscribe(() =>{
        console.log("arrowRight")
        if (gameState.isGamePaused || gameState.isGameOver) return;
        if(!gameState.activeTetromino){
            return
        }
        

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

        moveTetrominoLowestPoint(gameGridArray, gameState.activeTetromino, position,gameState, gameloopObject);

        renderGameBoard(gameBoardGrid, gameGridArray);
        
    })

    escKey$.subscribe(() =>{
        if(gameState.isGamePaused){
            resumeGame(gameloopObject)
        startTimer()
        }else{
            pauseGame(gameState)
        }
    })

}



// ngrok url, origin index js serveri