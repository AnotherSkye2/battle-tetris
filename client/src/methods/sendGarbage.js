import { userNames } from "./gameDefaultValues"
import { socket } from "../socket"

export default function sendGarbage(clearedLines, gameloopObject, gameLoopObjectArray) {
    if (gameloopObject.isBotGame) {
        console.log("gameInit: users, userNames", gameloopObject.users, userNames)
        gameloopObject.users = userNames
    }
    console.log("garbage: clearedLines: ", clearedLines)
    const users = gameloopObject.users
    let target = gameloopObject.gameState.target
    console.log("garbage: users, target: ", users, target)
    for (let i = 0; i < users.length; i++) {
        // TESTING ONLY
        if (!target && users[i].name != gameloopObject.name) {target = users[i].name}
        // TESTING ONLY
        console.log("garbage: users, target: ", users, target)
        if (users[i].name === target) {
            if (gameloopObject.isBotGame) {
                console.log("garbage: bot game send", gameLoopObjectArray, target)
                for (let i = 0; i < gameLoopObjectArray.length; i++) {
                    console.log("garbage: gameLoopObjectArray, target", gameLoopObjectArray, target, gameLoopObjectArray[i].name)
                    if ( gameLoopObjectArray[i].name == target) {
                        console.log(`garbage: ${clearedLines} sent to ${target} by ${gameloopObject.name}`)
                        gameLoopObjectArray[i].gameState.garbageLines += clearedLines
                    }
                }
            } else {
                console.log("garbage: player send", users, target)
                socket.emit('garbage', users[i].socketId, clearedLines)
            }
        }
    }
}