export const position = {row: 0, col: 3}; // starting position of the tetromino
export const gameState = { activeTetromino: null, isGameOver: false, isGamePaused: false, isTimerRunning: false, gameScore: 0, gameOverPending: false }; 
const url = window.location.href.split("/")
console.log("window.location.href.split(), url: ", window.location.href.split("/"), url)
export const roomId = url[url.length-1]
export const users = JSON.parse(sessionStorage.getItem("users"))
export const userName = sessionStorage.getItem("userName")
