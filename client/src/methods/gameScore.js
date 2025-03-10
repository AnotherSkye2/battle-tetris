import { userName } from "./gameDefaultValues";

export function addScore(clearedLines,gameState){
    let score = 0;
    switch (clearedLines)  {
        case 0:
            score = 0
            break;
        case 1:
            score = 40
            break;
        case 2:
            score = 100
            break;
        case 3:
            score = 300
            break;
        case 4:
            score = 1200
            break;
        default:
            score = 999999
            break;
    }
    gameState.gameScore = score
    console.log(clearedLines, gameState, score)
    return score
}

export function updateScore(gameloopObject) {
    if (gameloopObject.gameState.gameScore > 0) {
        console.log("gameloopObject.gameState.gameScore: ", gameloopObject.gameState.gameScore, gameloopObject.gameState.gameScore)
        const scoreElementArray = gameloopObject.userScoreElementArray
        for (let i = 0; i < scoreElementArray.length; i++) {
            if (scoreElementArray[i].name == userName) {
                scoreElementArray[i].userScoreElement.innerHTML = gameloopObject.gameState.gameScore + Number(scoreElementArray[i].userScoreElement.innerHTML)
            }
        }
        // gameloopObject.socket.emit("score", roomId, score)
    } else {
        console.log("score is:", gameloopObject.gameState.gameScore)
    }
}