import { drop, left, right } from "../methods/inputs";

export default function botBehaviourTree(currentPosition, nextPosition, botGameloopObject, gameLoopObjectArray) {
    if (nextPosition.col < currentPosition.col) {
        left(botGameloopObject)
    } else if (nextPosition.col > currentPosition.col) {
        right(botGameloopObject)
    } else {
        drop(botGameloopObject, gameLoopObjectArray)
        botGameloopObject.nextPosition = null
    }
    console.log("nextPosition, currentPosition", nextPosition, currentPosition)

}