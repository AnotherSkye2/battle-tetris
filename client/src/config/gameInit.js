import extractDifficultyFromName from "../botMethods/extractDifficultyFromName";
import createGameMenu from "../methods/createGameMenu";
import { InitializeGameBoard, renderGameBoard } from "../methods/gameBoard";
import { gameState, position, roomId, userName, userNames } from "../methods/gameDefaultValues";
import { updateLeaderboard } from "../methods/gameScore";
import { createLeaderBoard } from "../methods/leaderboard";
import { socket } from "../socket";
import { pauseGame, resumeGame} from "../methods/pauseGame.js"
import { startTimer} from "../methods/createTimer.js"
import deleteBoard from "../methods/deleteBoard.js";
import { checkGameWin } from "../methods/gameOver.js";
import { TETROMINOES } from "../methods/tetrominoes.js";

export default function gameInit() {
    const { gameElement, gameBoardElement, gameBoardGrid, gameGridArray, opponentGridDataArray} = InitializeGameBoard(userNames, userName);

    const userScoreElementArray = createLeaderBoard(gameElement)
    const {gameMenu,menuText,quitButton,restartButton} = createGameMenu()

    quitButton.addEventListener("click", () =>{ 
        const path = window.location.pathname.split("/"); 
        const pathLength = JSON.parse(JSON.stringify(path.length))
        console.info(path, pathLength)
        const gameId = path.pop(); 
        const baseUrl = window.location.origin; 

        window.location.href = `${baseUrl}/${pathLength == 3 ? "lobby" : "single/lobby"}/${gameId}`
        if(socket){
            socket.emit("disconnectUser",{roomId,userName})
        }
    })

    restartButton.addEventListener("click", () =>{
        if(socket){
            socket.emit("restart",{roomId,userName})
        }
    })

    const botGameLoopObjects = [];
    const gameLoopObjectArray = [];
    let botIndex = 0;
    userNames.forEach((username) => {
        if (username.isBot) {
            const difficulty = extractDifficultyFromName(username.name);

            // create botgameLoopObject for each bot 
            const botGameLoopObject = {
                name: username.name,
                timestamp: 0,
                gameGridArray: opponentGridDataArray[botIndex].gameGridArray, 
                position: { row: 0, col: 3 }, 
                gameBoardGrid: gameBoardGrid,
                gameState: {
                    activeTetromino: null, 
                    tetrominoType: null, 
                    isGameOver: false, 
                    isGamePaused: false, 
                    isTimerRunning: false, 
                    gameScore: 0, 
                    gameOverPending: false, 
                    bag: [], 
                    targetingMethod: "random", 
                    target: null, 
                    garbageLines: 0, 
                    level: 1, 
                    timeSinceLastLevel: 0
                },
                userScoreElementArray: userScoreElementArray,
                users: userNames,
                socket: socket,
                isBotGame: true, 
                timeSinceLastMove: 0, 
                timeSinceLastBotMove: 0, 
                botMoveTimeInterval: difficulty == "Easy" ? 600 : difficulty == "Medium" ? 300 : 200, 
                profileDepth: 4, 
                nextPosition: null, 
                nextRotation: null,
                botName: username.name, 
                difficulty: difficulty,
            };
            botIndex++
            botGameLoopObjects.push(botGameLoopObject); 
            gameLoopObjectArray.push(botGameLoopObject)
        }
    });

    
    const gameloopObject = {
        name: userName,
        timestamp: 0,
        gameGridArray: gameGridArray,
        position: position,
        gameBoardGrid: gameBoardGrid,
        gameState: gameState,
        opponentGridDataArray: opponentGridDataArray,
        userScoreElementArray: userScoreElementArray,
        users: [],
        socket: socket,
        isBotGame: botGameLoopObjects.length > 0 ? true : false,
        timeSinceLastMove: 0, 
        botGameLoopObjects: botGameLoopObjects
    } 
    gameLoopObjectArray.push(gameloopObject)
    gameloopObject.botGameLoopObjects = botGameLoopObjects;

    console.log("BOT GAME LOOPS", botGameLoopObjects)
    console.log("gamingLOOP", gameloopObject)

    if (socket) {
        console.log("socket",socket)
        socket.connect();
        socket.emit('join', roomId, userName, (roomUsers) => {
            console.log("roomUsers, socket.id", roomUsers, socket.id)
        });
        socket.emit('users', roomId, (users) => {
            console.log("users emitting: ", users, socket.id)
            gameloopObject.users = users
        })
        socket.on('join', (user) => {
            console.log(user)
            socket.emit('users joining', roomId, (users) => {
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
                gameMenu.style.opacity = "1"
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

       
        socket.on('restartGame', (user) => {
            
            alert(`${user} has restarted the game. The page will now refresh.`);
            window.location.reload();
          });

        socket.on("dcUser", (user) =>{
            deleteBoard(user)
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


    console.log("gameBoardElement, gameBoardGrid, gameGridArray, gameLoopObjectArray",gameBoardElement, gameBoardGrid, gameGridArray, gameLoopObjectArray)

    renderGameBoard(gameBoardGrid, gameGridArray);

    return { gameloopObject, gameLoopObjectArray}
}