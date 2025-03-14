import { drop, left } from "../methods/inputs";
import getTetrominoProfiles from "./getTetrominoProfiles";
import { botMostOptimalPlacement } from "./botOptimalPlacement";

export default function makeBotMove(deltaTime, botGameloopObject, gameLoopObjectArray) {
    botGameloopObject.timeSinceLastBotMove += deltaTime
    if (botGameloopObject.timeSinceLastBotMove >= botGameloopObject.botMoveTimeInterval) {
        console.log("makeBotMove:", botGameloopObject, gameLoopObjectArray)
        const tetrominoProfiles = getTetrominoProfiles(botGameloopObject.gameState.activeTetromino, botGameloopObject.profileDepth)
        console.log(tetrominoProfiles)
        left(botGameloopObject)

        // botMostOptimalPlacement(botGameloopObject,gameLoopObjectArray)

        // left(botGameloopObject, gameLoopObjectArray)
        botGameloopObject.timeSinceLastBotMove = 0
    }
}