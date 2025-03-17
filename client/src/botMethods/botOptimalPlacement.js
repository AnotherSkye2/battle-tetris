import { rotateTetromino } from "../methods/tetrominoManipulation";
import getAggregateHeight from "./getAggregateHeight";
import getEmptyTetrominoColumns from "./getEmptyTetrominoColumns";
import getTetrominoProfiles from "./getTetrominoProfiles";

export function botMostOptimalPlacement(botLoopObject) {
    const gameGridArray = botLoopObject.gameGridArray;
    let tetromino = botLoopObject.gameState.activeTetromino;

    if (!tetromino) return null; 

    let leftCol, rightCol
    let bestPosition = null;
    let bestValue = 0;
    let bestHeight = 0;
    let bestRotation = 0;

    console.log("NEW TETROMINO FOR MATCH -------------------------------------------------------\n", botLoopObject.gameState.tetrominoType)
    const heightArray = getAggregateHeight(botLoopObject)
    console.log("heightArray: ", heightArray)
    
    for (let rotation = 0; rotation <= 3; rotation++) {
        if (rotation > 0) {tetromino = rotateTetromino(tetromino)}
        const tetrominoProfiles = getTetrominoProfiles(tetromino, botLoopObject.profileDepth);
        console.log("tetrominoProfiles: ", tetrominoProfiles)
        let height = -1;
        let pos = null;
        let matchValue = 0;
        let maxHeight = gameGridArray.length;
        let loopCounter = 0;
        const profile = tetrominoProfiles[tetrominoProfiles.length-1]
        const tetrominoHeight = tetrominoProfiles.length
        console.log("profile , leftCol, rightCol", profile, leftCol, rightCol, botLoopObject.gameState.tetrominoType)
        console.log("tetrominoHeight: ", tetrominoHeight)
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

            if (!bestPosition || height < bestHeight || (height == bestHeight && matchValue > bestValue) ) {
                console.log(botLoopObject.gameState.tetrominoType, "\nmatch: set pos", "matchValue:", matchValue, " height:", height,  " maxHeight:", maxHeight,`\npos: ${JSON.stringify(pos)}`);                [leftCol, rightCol] = getEmptyTetrominoColumns(tetromino);
                bestPosition = pos;
                bestValue = matchValue
                bestHeight = height
                bestRotation = rotation
                if (bestValue == profile.length && bestHeight == Math.min(...heightArray)) {
                    break
                }
            }
            matchValue = 0
            maxHeight = gameGridArray.length
            height = -1
        }
    }
    const tetrominoProfiles = getTetrominoProfiles(tetromino, botLoopObject.profileDepth);
    const profile = tetrominoProfiles[tetrominoProfiles.length-1];
    
    if (leftCol) {
        bestPosition.col -= leftCol
    }
    if (rightCol && bestPosition.col >= heightArray - profile.length) {

        bestPosition.col -= rightCol
    }


    
    console.log("leftCol, rightCol, bestPosition, bestRotation: ", leftCol, rightCol, bestPosition, bestRotation, botLoopObject.gameState.tetrominoType)

    return [bestPosition, bestRotation]
}
