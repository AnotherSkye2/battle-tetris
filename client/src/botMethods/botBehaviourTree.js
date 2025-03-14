import { drop, left, right, rotate } from "../methods/inputs";

export default function botBehaviourTree(currentPosition, nextPosition, botGameloopObject, gameLoopObjectArray, bestRotation) {
    console.log("bestRotation: ", bestRotation)
    if (bestRotation > 0 ) {
        rotate(botGameloopObject)
    } else if (nextPosition.col < currentPosition.col) {
        left(botGameloopObject)
    } else if (nextPosition.col > currentPosition.col) {
        right(botGameloopObject)
    } else {
        drop(botGameloopObject, gameLoopObjectArray)
        botGameloopObject.nextPosition = null
    }
    console.log("nextPosition, currentPosition", nextPosition, currentPosition)

}