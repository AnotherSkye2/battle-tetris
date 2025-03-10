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
    const test = gameloopObject.userScoreElementArray
    console.log(test)
    if (gameloopObject.gameState.gameScore > 0) {
        console.log("gameloopObject.gameState.gameScore: ", gameloopObject.gameState.gameScore, gameloopObject.gameState.gameScore)
        const scoreElementArray = gameloopObject.userScoreElementArray
        const leaderboard = scoreElementArray[0].userScoreElement.parentNode.parentNode.parentNode
        console.log(leaderboard)
        for (let i = 0; i < scoreElementArray.length; i++) {
            if (scoreElementArray[i].name == userName) {
                scoreElementArray[i].userScoreElement.innerHTML = gameloopObject.gameState.gameScore + Number(scoreElementArray[i].userScoreElement.innerHTML)
            }
        }
        console.log("before", scoreElementArray)
        scoreElementArray.sort((a, b) => {
            return a.userScoreElement.innerHTML == b.userScoreElement.innerHTML
            ? 0
            : (Number(a.userScoreElement.innerHTML) > Number(b.userScoreElement.innerHTML) ? -1 : 1);
        })
        console.log("after", scoreElementArray)
        let scoreContainerArray = scoreElementArray.map((scoreElement) => scoreElement.userScoreElement.parentNode.parentNode)
    
        leaderboard.innerHTML = ""
        for (let i = 0; i < scoreContainerArray.length; i++) {
            leaderboard.appendChild(scoreContainerArray[i])
        }
        // gameloopObject.socket.emit("score", roomId, score)
    } else {
        console.log("score is:", gameloopObject.gameState.gameScore)
    }
}