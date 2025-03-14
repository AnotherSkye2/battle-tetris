import { drop, left } from "../methods/inputs";

export default function makeBotMove(gameloopObject, gameLoopObjectArray) {
    console.log("makeBotMove:", gameloopObject, gameLoopObjectArray)
    left(gameloopObject, gameLoopObjectArray)
}