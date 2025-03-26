export function addLines(gameGridArray, lines){
    let newBoard = gameGridArray.concat(generateGarbageLines(gameGridArray, lines))
    console.log(newBoard)

    while (newBoard.length > gameGridArray.length) {
        newBoard.shift();
    }
    const garbageProgressBar = document.getElementsByClassName("game-grid-bar-progress")[0]
    garbageProgressBar.style.height = "0%"
    return newBoard ;
}

function generateGarbageLines(gameGridArray, lines) {
    let garbageLines = [];
    for (let i = 0; i < lines; i++) {
        const garbageLine = new Array(gameGridArray[0].length).fill("g")
        garbageLine[Math.floor(Math.random() * (gameGridArray[0].length))] = ""
        garbageLines.push(garbageLine)
    }
    return garbageLines
}