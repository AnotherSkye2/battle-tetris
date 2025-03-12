import { renderGameBoard,InitializeGameBoard } from '../methods/gameBoard.js';
import { placeTetromino,rotateTetromino,clearTetromino } from '../methods/tetrominoManipulation.js';
import { moveTetrominoDown,moveTetrominoLeft,moveTetrominoRight,moveTetrominoLowestPoint } from '../methods/tetrominoMoves.js';
import { checkCollisions } from '../methods/collisionCheck.js';
import { gameLoop } from '../methods/gameLoop.js';
import { TETROMINOES } from '../methods/tetrominoes.js';
import { arrowDown$,arrowLeft$,arrowRight$,arrowUp$,spaceBar$,escKey$ } from '../methods/observables.js';
import { position,gameState,roomId, userNames, userName } from '../methods/gameDefaultValues.js';
import { pauseGame,resumeGame } from '../methods/pauseGame.js';
import { socket } from '../socket.js';
import { startTimer } from '../methods/createTimer.js';
import { createLeaderBoard } from '../methods/leaderboard.js';
import { updateLeaderboard } from '../methods/gameScore.js';
import { createGameMenu } from '../methods/createGameMenu.js';
import { deleteBoard } from '../methods/deleteBoard.js';
import { checkGameWin } from '../methods/gameOver.js';

export default function Game() {


    const { gameElement, gameBoardElement, gameBoardGrid, gameGridArray, opponentGridDataArray} = InitializeGameBoard(userNames, userName);

    const userScoreElementArray = createLeaderBoard(gameElement)
    const {gameMenu,menuText,quitButton} = createGameMenu()

    quitButton.addEventListener("click", () =>{  // liigutan selle createGameMenusse
        
    
        const path = window.location.pathname; 
        const gameId = path.split("/").pop(); 
        const baseUrl = window.location.origin; 
       window.location.href = `${baseUrl}/lobby/${gameId}`
        
        if(socket){
            socket.emit("disconnectUser",{roomId,userName})
        }
        
    })
    const gameloopObject = {
        timestamp: 0,
        gameGridArray: gameGridArray,
        tetrominoes: TETROMINOES,
        position: position,
        gameBoardGrid: gameBoardGrid,
        gameState: gameState,
        opponentGridDataArray: opponentGridDataArray,
        userScoreElementArray: userScoreElementArray,
        users: [],
        socket: socket
    } 

    console.log(gameloopObject)

    if (socket) {
        console.log(socket)
        socket.connect();
        socket.emit('join', roomId, userName, (roomUsers) => {
            console.log("roomUsers, socket.id", roomUsers, socket.id)
        });
        socket.emit('users', roomId, (users) => {
            console.log("users: ", users, socket.id)
            gameloopObject.users = users
        })
        socket.on('join', (user) => {
            console.log(user)
            socket.emit('users', roomId, (users) => {
                console.log("users: ", users, socket.id)
                gameloopObject.users = users
            })
        })
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

        socket.on("pauseGame", (name) => {

            pauseGame(gameState)
            if (gameMenu){
                
                gameMenu.style.visibility = "visible"; 
                gameMenu.style.opacity = "1";
                gameMenu.style.pointerEvents = "auto"; 
                if (menuText) {
                    menuText.innerText = `Game Paused by: ${name}`; 
                }
            }
           
        })

        socket.on("resumeGame", () =>{

            resumeGame(gameloopObject)
            startTimer()
            if (gameMenu){
                gameMenu.style.visibility = "hidden"; 
                gameMenu.style.opacity = "0";
                gameMenu.style.pointerEvents = "none"; 
            }
        })

        socket.on("disconnectUser", (userName) =>{
            deleteBoard(userName)
        })
        socket.on('garbage', (lines, userName) => {
            console.log("garbage", lines, userName)
            gameState.garbageLines += lines
        })
        socket.on('game over', (userName) => {
            console.log(userName)
            gameState.playersLost += 1
            checkGameWin()
        })
        
        const listener = () => {
            socket.emit('leave', roomId)
            socket.emit("disconnectUser",userName)
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

        clearTetromino(gameloopObject) 

        const rotatedTetro = rotateTetromino(gameState.activeTetromino)
        
        const hasCollision = checkCollisions(rotatedTetro,position, "rotate" ,gameGridArray)


        if(!hasCollision){
            gameState.activeTetromino = rotatedTetro
        }else{
            console.log("collision detected")
        }
        
        placeTetromino(gameloopObject); 
        renderGameBoard(gameBoardGrid, gameGridArray); 
    });

    arrowDown$.subscribe(() =>{
        if (gameState.isGamePaused || gameState.isGameOver) return;
        if(!gameState.activeTetromino){
            return
        }
        
        clearTetromino(gameloopObject)

        const collision = checkCollisions(gameState.activeTetromino,position,"down",gameGridArray)
        if(!collision){
            moveTetrominoDown(gameloopObject)
        }
        placeTetromino(gameloopObject);
    })

    arrowLeft$.subscribe(() => {
        console.log("arrowLeft")
        if (gameState.isGamePaused || gameState.isGameOver) return;
        if(!gameState.activeTetromino){
            return
        }
        
        clearTetromino(gameloopObject)

        const collision = checkCollisions(gameState.activeTetromino,position,"left",gameGridArray)
        if(!collision){
            moveTetrominoLeft(gameloopObject);
        }

        placeTetromino(gameloopObject);
    
    });

    arrowRight$.subscribe(() =>{
        console.log("arrowRight")
        if (gameState.isGamePaused || gameState.isGameOver) return;
        if(!gameState.activeTetromino){
            return
        }
        

        clearTetromino(gameloopObject)
        
        const collision = checkCollisions(gameState.activeTetromino,position,"right",gameGridArray)
        if(!collision){
            moveTetrominoRight(gameloopObject);
        }
        placeTetromino(gameloopObject);
    })

    spaceBar$.subscribe(() =>{
        if (gameState.isGamePaused || gameState.isGameOver) return;
        if (!gameState.activeTetromino) return;

        clearTetromino(gameloopObject)

        moveTetrominoLowestPoint(gameloopObject);

        renderGameBoard(gameBoardGrid, gameGridArray);
        
    })

    escKey$.subscribe(() =>{
        if (!gameState.isGameOver && socket) {
            socket.emit("resume", {roomId,userName})
        }else{
            socket.emit('pause', { roomId,userName });
        }
    })
}



// leaderboard ilmub game over, garbage lines, levelid