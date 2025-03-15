import { drop, left, right, rotate } from "../methods/inputs";

export default function botBehaviourTree(currentPosition, nextPosition, botGameloopObject, gameLoopObjectArray) {
    if (botGameloopObject.nextRotation > 0 ) {
        botGameloopObject.nextRotation -= 1
        rotate(botGameloopObject)
    } else if (nextPosition.col < currentPosition.col) {
        left(botGameloopObject)
    } else if (nextPosition.col > currentPosition.col) {
        right(botGameloopObject)
    } else {
        drop(botGameloopObject, gameLoopObjectArray)
        botGameloopObject.nextPosition = null
        botGameloopObject.nextRotation = null
    }

}