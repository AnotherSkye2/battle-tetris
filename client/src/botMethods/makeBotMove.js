import { drop, left } from "../methods/inputs";
import { botMostOptimalPlacement } from "./botOptimalPlacement";

export default function makeBotMove(deltaTime, botGameloopObject, gameLoopObjectArray) {
    botGameloopObject.timeSinceLastBotMove += deltaTime
    if (botGameloopObject.timeSinceLastBotMove >= botGameloopObject.botMoveTimeInterval) {
        console.log("makeBotMove:", botGameloopObject, gameLoopObjectArray)

        const bestPosition = botMostOptimalPlacement(botGameloopObject,gameLoopObjectArray)

        console.log("best position", bestPosition)

        // left(botGameloopObject, gameLoopObjectArray)
        botGameloopObject.timeSinceLastBotMove = 0
    }
}