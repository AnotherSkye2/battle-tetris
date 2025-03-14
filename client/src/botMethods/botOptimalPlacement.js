import { wallCollisionCheck } from "../methods/collisionCheck";
import { tetrominoCollisionCheck } from "../methods/collisionCheck";
import { rotateTetromino } from "../methods/tetrominoManipulation";
import { moveTetrominoLowestPoint } from "../methods/tetrominoMoves";

export function botMostOptimalPlacement(botLoopObject, gameLoopObjectArray) {
    const gameGridArray = botLoopObject.gameGridArray;
    let tetromino = botLoopObject.gameState.activeTetromino;
    const position = botLoopObject.position;

    if (!tetromino) return;

    let bestPosition = null;
    let bestRotation = 0;
    let profile = [1, 1, 1]; 

    for (let row = gameGridArray.length - 1; row >= 0; row--) {
        for (let col = 0; col <= gameGridArray[0].length - profile.length; col++) {
            let testPosition = { row: row - 1, col: col }; 

            if (!wallCollisionCheck(profile, testPosition) &&
                !tetrominoCollisionCheck(profile, testPosition, gameGridArray)) {

                if (!bestPosition || testPosition.row > bestPosition.row) {
                    bestPosition = testPosition;
                    bestRotation = 0; 
                }
            }
        }
    }

    let rotations = 0;
    for (let i = 0; i < 3; i++) {
        tetromino = rotateTetromino(tetromino);
        rotations++;

        for (let row = gameGridArray.length - 1; row >= 0; row--) {
            for (let col = 0; col <= gameGridArray[0].length - profile.length; col++) {
                let testPosition = { row: row - 1, col: col };

                if (!wallCollisionCheck(profile, testPosition) &&
                    !tetrominoCollisionCheck(profile, testPosition, gameGridArray)) {

                    if (!bestPosition || testPosition.row > bestPosition.row) {
                        bestPosition = testPosition;
                        bestRotation = rotations;
                    }
                }
            }
        }
    }

    if (bestPosition) {
        botLoopObject.position.row = bestPosition.row;
        botLoopObject.position.col = bestPosition.col;

        for (let i = 0; i < bestRotation; i++) {
            tetromino = rotateTetromino(botLoopObject);
        }


        botLoopObject.gameState.activeTetromino = tetromino;

        moveTetrominoLowestPoint(botLoopObject, gameLoopObjectArray);
    }
}
