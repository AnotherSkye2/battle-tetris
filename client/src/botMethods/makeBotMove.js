import { drop, left } from "../methods/inputs";
import getTetrominoProfiles from "./getTetrominoProfiles";
import { botMostOptimalPlacement } from "./botOptimalPlacement";
import botBehaviourTree from "./botBehaviourTree";
 
export default function makeBotMove(deltaTime, botGameloopObject, gameLoopObjectArray) {
    botGameloopObject.timeSinceLastBotMove += deltaTime
    let nextPosition = botGameloopObject.nextPosition
    let bestPosition, bestRotation;
    if (botGameloopObject.timeSinceLastBotMove >= botGameloopObject.botMoveTimeInterval) {
        // console.log("makeBotMove:", botGameloopObject, gameLoopObjectArray)
        const tetrominoProfiles = getTetrominoProfiles(botGameloopObject.gameState.activeTetromino, botGameloopObject.profileDepth)
        console.log(tetrominoProfiles)
        if (!nextPosition) {
            [bestPosition, bestRotation] = botMostOptimalPlacement(botGameloopObject,gameLoopObjectArray)
            botGameloopObject.nextPosition = bestPosition
            nextPosition = bestPosition
        }
        if (botGameloopObject.position != nextPosition) {
            // console.log("botGameloopObject.position, nextPosition: ", botGameloopObject.position, nextPosition)
            botBehaviourTree(botGameloopObject.position, nextPosition, botGameloopObject, gameLoopObjectArray, bestRotation)
        }

        // left(botGameloopObject, gameLoopObjectArray)
        botGameloopObject.timeSinceLastBotMove = 0
    }
}