import { drop, left } from "../methods/inputs";
import getTetrominoProfiles from "./getTetrominoProfiles";

export default function makeBotMove(deltaTime, botGameloopObject, gameLoopObjectArray) {
    botGameloopObject.timeSinceLastBotMove += deltaTime
    if (botGameloopObject.timeSinceLastBotMove >= botGameloopObject.botMoveTimeInterval) {
        console.log("makeBotMove:", botGameloopObject, gameLoopObjectArray)
        const tetrominoProfiles = getTetrominoProfiles(botGameloopObject.gameState.activeTetromino, botGameloopObject.profileDepth)
        console.log(tetrominoProfiles)
        left(botGameloopObject)
        botGameloopObject.timeSinceLastBotMove = 0
    }
}