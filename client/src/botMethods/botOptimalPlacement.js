import { rotateTetromino } from "../methods/tetrominoManipulation";
import getAggregateHeight from "./getAggregateHeight";
import getBumpiness from "./getBumpiness";
import getEmptyTetrominoColumns from "./getEmptyTetrominoColumns";
import getTetrominoHeight from "./getTetrominoHeight";
import getTetrominoProfiles from "./getTetrominoProfiles";

export function botMostOptimalPlacement(botLoopObject) {
    const gameGridArray = botLoopObject.gameGridArray;
    let tetromino = botLoopObject.gameState.activeTetromino;

    if (!tetromino) return null; 

    let leftCol, rightCol
    let bestPosition = null;
    let bestValue = 0;
    let bestProfileLength = 0;
    let bestHeight = 0;
    let bestHoles = 0;
    let bestRotation = 0;
    let bestBumpiness = 99999;

    console.log("NEW TETROMINO FOR MATCH -------------------------------------------------------\n", botLoopObject.gameState.tetrominoType)
    const heightArray = getAggregateHeight(botLoopObject)
    console.log("heightArray: ", heightArray)
    
    for (let rotation = 0; rotation <= 3; rotation++) {
        if (rotation > 0) {tetromino = rotateTetromino(tetromino)}
        const tetrominoProfiles = getTetrominoProfiles(tetromino, botLoopObject.profileDepth);
        let height = null;
        let position = null;
        let matchValue = 0;
        let holes = 0;
        let maxHeight = gameGridArray.length;
        let loopCounter = 0;
        const profile = tetrominoProfiles[tetrominoProfiles.length-1]
        const tetrominoHeight = getTetrominoHeight(tetrominoProfiles)
        for (let i = profile.length - 1; i < heightArray.length; i++) {
            loopCounter++
            if (loopCounter >= 30) {
                console.error(`Placement search of ${botLoopObject.gameState.tetrominoType} looped too many times!`)
                break
            }
            const currentHeightArray = heightArray.slice(i - (profile.length - 1), i+1)
            maxHeight = Math.max(...currentHeightArray)
            height = maxHeight - (tetrominoHeight - 1)
            if (profile.every(h => h == profile[0]) || currentHeightArray.every(h => h == currentHeightArray[0]) ) {
                height = maxHeight
            }
            if (height < Math.min(...currentHeightArray)) {height = Math.min(...currentHeightArray)}
            position = { row: gameGridArray.length - 1 - height, col: i - (profile.length - 1)}
            // console.log("match: initial:", botLoopObject.gameState.tetrominoType, "height", height,"pos", pos)
            // console.log(heightArray.slice(i - (profile.length - 1), i+1), i)
            for (let j = profile.length - 1; j >= 0; j--) {
                const checkHeight = heightArray[i - ((profile.length - 1) - j)]
                if (checkHeight > height && profile[j] == 0) {
                    height = checkHeight
                }
                if (checkHeight == height+profile[j]) {
                    // console.log(botLoopObject.gameState.tetrominoType, "maxHeight:", maxHeight)
                    matchValue++

                } else if (profile[j] != 0) {
                    holes++
                } else if (profile[j] == 0) {
                    holes += height - checkHeight
                }
            }
            const bumpiness = getBumpiness(tetrominoProfiles, i - (profile.length - 1), height, JSON.parse(JSON.stringify(heightArray)))
            console.log("bumpiness: (bumpiness < bestBumpiness", bumpiness, bestBumpiness)
            if (!bestPosition || holes < bestHoles || holes == bestHoles && (height < bestHeight || height == bestHeight && (bumpiness < bestBumpiness || bumpiness >= bestBumpiness && ( (matchValue > bestValue ||(matchValue == bestValue && profile.length < bestProfileLength)))))) {
                console.log(botLoopObject.gameState.tetrominoType, "\nmatch: set pos", "matchValue:", matchValue, " height:", height, "bestHoles", bestHoles, "holes", holes, " maxHeight:", maxHeight,`\npos: ${JSON.stringify(position)}`);                [leftCol, rightCol] = getEmptyTetrominoColumns(tetromino);
                bestPosition = position;
                bestValue = matchValue
                bestProfileLength = profile.length
                bestHeight = height
                bestHoles = holes
                bestRotation = rotation
                bestBumpiness = bumpiness
                if (bestValue == profile.length && bestHeight == Math.min(...heightArray)) {
                    break
                }
            }
            matchValue = 0
            maxHeight = gameGridArray.length
            height = null
            holes = 0
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
