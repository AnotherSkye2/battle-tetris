import getAggregateHeight from "./getAggregateHeight";
import getEmptyTetrominoColumns from "./getEmptyTetrominoColumns";
import getTetrominoProfiles from "./getTetrominoProfiles";

export function botMostOptimalPlacement(botLoopObject) {
    const gameGridArray = botLoopObject.gameGridArray;
    let tetromino = botLoopObject.gameState.activeTetromino;

    if (!tetromino) return null; 

    let leftCol, rightCol
    [leftCol, rightCol] = getEmptyTetrominoColumns(tetromino);
    const tetrominoProfiles = getTetrominoProfiles(tetromino, botLoopObject.profileDepth);
    let bestPosition = null;
    let height = -1;
    let pos = null;
    let matchValue = 0;
    let maxHeight = gameGridArray.length;
    let bestMatchValue = 0;
    let bestMatchHeight = 0;
    let loopCounter = 0;
    const profile = tetrominoProfiles[tetrominoProfiles.length-1]
    console.log("profile: ", profile)
    const tetrominoHeight = tetrominoProfiles.length
    console.log("tetrominoHeight: ", tetrominoHeight)
    console.log("NEW TETROMINO FOR MATCH -------------------------------------------------------\n", botLoopObject.gameState.tetrominoType, profile)
    const heightArray = getAggregateHeight(botLoopObject)
    console.log("heightArray: ", heightArray)

    for (let i = profile.length - 1; i < heightArray.length; i++) {
        loopCounter++
        if (loopCounter >= 30) {
            console.error(`Placement search of ${botLoopObject.gameState.tetrominoType} looped too many times!`)
            break
        }
        maxHeight = Math.max(...heightArray.slice(i - (profile.length - 1), i+1))
        if (height == -1) {
            height = maxHeight - (tetrominoHeight - 1)
            if (height < 0) {height = 0}
            console.log("height: ", height)
            pos = { row: gameGridArray.length - 1 - height, col: i - (profile.length - 1)}
            console.log("match: initial:", botLoopObject.gameState.tetrominoType, "height", height,"pos", pos)
        }
        console.log("maxHeight: ", maxHeight, heightArray.slice(i - (profile.length - 1), i+1), i)
        for (let j = profile.length - 1; j >= 0; j--) {
            const checkHeight = heightArray[i - ((profile.length - 1) - j)]
            if (checkHeight > height && profile[j] == 1) {
                height = checkHeight
            }
            console.log("check placement: height, i, matchValue, checkHeight", height, i, matchValue, checkHeight)
            console.log(checkHeight == height+1 && profile[j] == 0 || (checkHeight == height && profile[j] == 1 ))
            if (checkHeight == height+1 && profile[j] == 0 || ((checkHeight == height) && profile[j] == 1 )) {
                // console.log("pos: ", pos)
                // console.log(botLoopObject.gameState.tetrominoType, "maxHeight:", maxHeight)
                matchValue++
            } else if (profile[j] == 0 && checkHeight == maxHeight && height != maxHeight) {
                height = maxHeight - (tetrominoHeight - 1)
                if (height < 0) {height = 0}
                console.log("height: ", height)
            }
        }

        if (!bestPosition || height < bestMatchHeight || (height == bestMatchHeight && matchValue > bestMatchValue) ) {
            console.log("match: set pos", botLoopObject.gameState.tetrominoType, "matchValue:", matchValue, " height:", height,  " maxHeight:", maxHeight,`\npos: ${JSON.stringify(pos)}`)
            bestPosition = pos;
            bestMatchValue = matchValue
            bestMatchHeight = height
            if (bestMatchValue == profile.length && bestMatchHeight == Math.min(...heightArray)) {
                break
            }
        }
        matchValue = 0
        maxHeight = gameGridArray.length
        height = -1
    }
    
    if (leftCol) {
        bestPosition.col -= leftCol
    }
    if (rightCol && bestPosition.col >= heightArray - profile.length) {
        bestPosition.col -= rightCol
    }


    const bestRotation = 0
    
    console.log("leftCol, rightCol, bestPosition, bestRotation: ", leftCol, rightCol, bestPosition, bestRotation, botLoopObject.gameState.tetrominoType)

    return [bestPosition, bestRotation]
}
