import { roomId } from "./gameDefaultValues";

export function addScore(clearedLines,gameloopObject){
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
    gameloopObject.gameState.gameScore = score
    gameloopObject.socket.emit("score", roomId, score)

    return score
}

export function updateLeaderboard(score, name, gameloopObject) {
    if (score > 0) {
        //console.log("score: ", score)
        const scoreElementArray = gameloopObject.userScoreElementArray
        const leaderboard = scoreElementArray[0].userScoreElement.parentNode.parentNode.parentNode
        console.log(leaderboard)
        for (let i = 0; i < scoreElementArray.length; i++) {
            if (scoreElementArray[i].name == name) {
                scoreElementArray[i].userScoreElement.innerHTML = score + Number(scoreElementArray[i].userScoreElement.innerHTML)
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
    } else {
        //console.log("score is:", score)
    }
}