import { wallCollisionCheck } from "../methods/collisionCheck";
import { tetrominoCollisionCheck } from "../methods/collisionCheck";
import { rotateTetromino } from "../methods/tetrominoManipulation";
import getAggregateHeight from "./getAggregateHeight";
import getEmptyTetrominoColumns from "./getEmptyTetrominoColumns";
import getTetrominoProfiles from "./getTetrominoProfiles";

export function botMostOptimalPlacement(botLoopObject) {
    const gameGridArray = botLoopObject.gameGridArray;
    let tetromino = botLoopObject.gameState.activeTetromino;

    if (!tetromino) return null; 

    let leftCol, rightCol
    const tetrominoProfiles = getTetrominoProfiles(tetromino, botLoopObject.profileDepth)






    // for (let row = gameGridArray.length - 1; row >= 0; row--) {
    //     for (let col = 0; col < gameGridArray[0].length - 1; col++) {
    //         let testPosition = { row: row, col: col };
    //         if (!wallCollisionCheck(tetromino, testPosition) && !tetrominoCollisionCheck(tetromino, testPosition, gameGridArray)) {
    //             if (!bestPosition || testPosition.row > bestPosition.row) {
    //                 bestPosition = testPosition;
    //                 [leftCol, rightCol] = getEmptyTetrominoColumns(tetromino)
    //             }
    //         }
    //     }
    // }

    // let rotatedTetromino = tetromino;
    // let bestRotation = 0;

    // for (let rotation = 1; rotation <= 3; rotation++) {  
    //     rotatedTetromino = rotateTetromino(rotatedTetromino);
    //     for (let row = gameGridArray.length - 1; row >= 0; row--) {
    //         for (let col = 0; col < gameGridArray[0].length - 1; col++) {
    //             let testPosition = { row: row, col: col };
    //             if (!wallCollisionCheck(rotatedTetromino, testPosition) && !tetrominoCollisionCheck(rotatedTetromino, testPosition, gameGridArray)) {

    //                 testPosition.row += 1;  
    //                 if (!bestPosition || testPosition.row > bestPosition.row) {
    //                     bestPosition = testPosition;
    //                     bestRotation = rotation;  
    //                     [leftCol, rightCol] = getEmptyTetrominoColumns(rotatedTetromino)
    //                 }
    //             }
    //         }
    //     }
    // }
;
    [leftCol, rightCol] = getEmptyTetrominoColumns(tetromino);
    let bestPosition = null;
    let height = -1;
    let pos = null;
    let matchValue = 0;
    let heightValue = gameGridArray.length;
    let bestMatchValue = 0;
    let bestMatchHeight = 0;
    let loopCounter = 0;
    const profile = tetrominoProfiles[tetrominoProfiles.length-1]
    console.log("NEW TETROMINO FOR MATCH -------------------------------------------------------\n", botLoopObject.gameState.tetrominoType, profile)
    const heightArray = getAggregateHeight(botLoopObject)
    console.log("heightArray: ", heightArray)

    for (let i = profile.length - 1; i < heightArray.length; i++) {
        loopCounter++
        if (loopCounter >= 30) {
            console.error(`Placement search of ${botLoopObject.gameState.tetrominoType} looped too many times!`)
            break
        }
        if (height == -1) {
            height = heightArray[i]
            pos = { row: gameGridArray.length - 1 - height, col: i - (profile.length - 1)}
            console.log("match: set initial:", botLoopObject.gameState.tetrominoType, "height", height,"pos", pos)
        }
        heightValue = Math.max(...heightArray.slice(i - (profile.length - 1), i))
        for (let j = profile.length - 1; j >= 0; j--) {
            const checkHeight = heightArray[i - ((profile.length - 1) - j)]
            console.log("check placement: height, i, matchValue, checkHeight", height, i, matchValue, checkHeight)
            console.log(checkHeight == height+1 && profile[j] == 0 || (checkHeight == height && profile[j] == 1 ))
            if (checkHeight == height+1 && profile[j] == 0 || (checkHeight == height && profile[j] == 1 )) {
                if (checkHeight < height && profile[j] == 1) {
                    height = heightValue
                }
                console.log("pos: ", pos)
                console.log(botLoopObject.gameState.tetrominoType, "heightValue:", heightValue)
                matchValue++
            } else {
                height = heightValue
            }
        }
        
        if (!bestPosition || matchValue > bestMatchValue || (heightValue < bestMatchHeight && matchValue == bestMatchValue) ) {
            console.log("match: set pos", botLoopObject.gameState.tetrominoType, "matchValue: ", matchValue, "heightValue: ", heightValue,  `\npos: ${JSON.stringify(pos)}`)
            bestPosition = pos;
            bestMatchValue = matchValue
            bestMatchHeight = heightValue
            if (bestMatchValue == profile.length && bestMatchHeight == Math.min(...heightArray)) {
                break
            }
        }
        matchValue = 0
        heightValue = gameGridArray.length
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
