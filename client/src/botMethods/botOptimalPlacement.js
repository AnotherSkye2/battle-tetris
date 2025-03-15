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
    const heightArray = getAggregateHeight(botLoopObject)
    console.log("heightArray: ", heightArray)






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
    let bestMatchValue = 0;
    const profile = tetrominoProfiles[0]

    for (let i = 0; i < heightArray.length; i++) {
        if (height == -1) {
            console.log("match: height", height)
            height = heightArray[i]
            pos = { row: gameGridArray.length - 1 - height, col: i}
        }
        if (!bestPosition || matchValue > bestMatchValue) {
            console.log("full match", botLoopObject.gameState.tetrominoType, "matchValue: ", matchValue,  `\npos: ${JSON.stringify(pos)}`, `bestPosition: ${JSON.stringify(bestPosition)}`)
            bestPosition = pos;
            bestMatchValue = matchValue
            if (matchValue == profile.length) {
                break
            }
        }
        if (heightArray[i] == height && profile[matchValue] == 1 || heightArray[i] == height+1 && profile[matchValue] == 0) {
            console.log("match!: heightArray[i], height, profile[matchValue], matchValue", heightArray[i], height, profile[matchValue], matchValue)
            console.log("pos: ", pos)
            matchValue++
        } else {
            height = -1
            matchValue = 0
            pos = null
        }
    }
    
    if (leftCol && bestPosition.col <= 0) {
        bestPosition.col -= leftCol
    }
    if (rightCol && bestPosition.col >= 9) {
        bestPosition.col -= rightCol
    }

    const bestRotation = 0
    
    console.log("leftCol, rightCol, bestPosition, bestRotation: ", leftCol, rightCol, bestPosition, bestRotation, botLoopObject.gameState.tetrominoType)

    return [bestPosition, bestRotation]
}
