import { botMostOptimalPlacement } from "./botOptimalPlacement";
import botBehaviourTree from "./botBehaviourTree";
 
export default function makeBotMove(deltaTime, botGameloopObject, gameLoopObjectArray) {
    botGameloopObject.timeSinceLastBotMove += deltaTime
    let nextPosition = botGameloopObject.nextPosition
    let bestPosition, bestRotation;
    if (botGameloopObject.timeSinceLastBotMove >= botGameloopObject.botMoveTimeInterval) {
        console.log("makeBotMove:", botGameloopObject, gameLoopObjectArray)
        if (!nextPosition) {
            [bestPosition, bestRotation] = botMostOptimalPlacement(botGameloopObject)
            botGameloopObject.nextPosition = bestPosition
            botGameloopObject.nextRotation = bestRotation
            nextPosition = bestPosition
        }
        if (botGameloopObject.position != nextPosition) {
            // console.log("botGameloopObject.position, nextPosition: ", botGameloopObject.position, nextPosition)
            botBehaviourTree(botGameloopObject.position, nextPosition, botGameloopObject, gameLoopObjectArray)
        }

        // left(botGameloopObject, gameLoopObjectArray)
        botGameloopObject.timeSinceLastBotMove = 0
    }
}