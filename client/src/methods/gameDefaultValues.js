export const position = {row: 0, col: 3}; // starting position of the tetromino
export const gameState = { activeTetromino: null, tetrominoType: null, isGameOver: false, isGamePaused: false, isTimerRunning: false, gameScore: 0, gameOverPending: false, bag: [], targetingMethod: "random", target: null, garbageLines: 0, playersLost: 0, isGameWon: false, level: 1, timeSinceLastLevel: 0}; 
const url = window.location.href.split("/")
console.log("window.location.href.split(), url: ", window.location.href.split("/"), url)
export const roomId = url[url.length-1]
export const userNames = JSON.parse(sessionStorage.getItem("userNames"))
export const userName = sessionStorage.getItem("userName")
export const timeToLevelUp = 20000
export const levelMoveIntervals = {
    1:	1000,
    2:	833,
    3:	666,
    4:	500,
    5:	333,
    6:	166,
    7:	133,
    8:	100,
    9:	66,
    10:	33,
    11:	16,
};