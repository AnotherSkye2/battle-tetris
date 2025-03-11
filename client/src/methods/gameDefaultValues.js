export const position = {row: 0, col: 3}; // starting position of the tetromino
export const gameState = { activeTetromino: null, tetrominoType: null, isGameOver: false, isGamePaused: false, isTimerRunning: false, gameScore: 0, gameOverPending: false, bag: [], targetingMethod: "random", target: null }; 
const url = window.location.href.split("/")
console.log("window.location.href.split(), url: ", window.location.href.split("/"), url)
export const roomId = url[url.length-1]
export const userNames = JSON.parse(sessionStorage.getItem("userNames"))
export const userName = sessionStorage.getItem("userName")