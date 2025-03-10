
export function addScore(clearedLines,gameState){

    if (clearedLines >= 4) {

        gameState.gameScore += 1200;

    } else if (clearedLines === 3) {

        gameState.gameScore += 300;

    } else if (clearedLines === 2) {

        gameState.gameScore += 100; 

    } else if (clearedLines === 1) {

        gameState.gameScore += 40;
    }
}