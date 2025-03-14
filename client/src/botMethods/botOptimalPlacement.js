import { wallCollisionCheck } from "../methods/collisionCheck";
import { tetrominoCollisionCheck } from "../methods/collisionCheck";
import { rotateTetromino } from "../methods/tetrominoManipulation";
import getEmptyTetrominoColumns from "./getEmptyTetrominoColumns";

export function botMostOptimalPlacement(botLoopObject) {
    const gameGridArray = botLoopObject.gameGridArray;
    let tetromino = botLoopObject.gameState.activeTetromino;

    if (!tetromino) return null; 

    const {leftCol, rightCol} = getEmptyTetrominoColumns(tetromino)
    console.log("leftCol, rightCol: ", leftCol, rightCol)
    const profile = [1, 1, 1];

    let bestPosition = null;
    
    for (let row = gameGridArray.length - 1; row >= 0; row--) {
        for (let col = 0; col <= gameGridArray[0].length - profile.length; col++) {
            let testPosition = { row: row, col: col };

            if (!wallCollisionCheck(tetromino, testPosition) && !tetrominoCollisionCheck(tetromino, testPosition, gameGridArray)) {
                if (!bestPosition || testPosition.row > bestPosition.row) {
                    bestPosition = testPosition;
                }
            }
        }
    }

    let rotatedTetromino = tetromino;
    let bestRotation = 0;

    for (let rotation = 1; rotation <= 3; rotation++) {  
        rotatedTetromino = rotateTetromino(rotatedTetromino);

        for (let row = gameGridArray.length - 1; row >= 0; row--) {
            for (let col = 0; col <= gameGridArray[0].length - profile.length; col++) {
                let testPosition = { row: row, col: col };

                if (!wallCollisionCheck(rotatedTetromino, testPosition) && !tetrominoCollisionCheck(rotatedTetromino, testPosition, gameGridArray)) {

                    testPosition.row += 1;  
                    if (!bestPosition || testPosition.row > bestPosition.row) {
                        bestPosition = testPosition;
                        bestRotation = rotation;  
                    }
                }
            }
        }
    }
    // botLoopObject.position = bestPosition;

    if (leftCol > 0 && bestPosition.col == 0) {
        bestPosition.col -= 1
    }
    if (rightCol > 0 && bestPosition.col == 19) {
        bestPosition.col += 1
    }

    return [bestPosition, bestRotation]
}
