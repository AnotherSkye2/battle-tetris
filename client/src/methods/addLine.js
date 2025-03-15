export function addLines(gameGridArray, lines){
    let newBoard = gameGridArray.concat(generateGarbageLines(gameGridArray, lines))
    console.log(newBoard)

    while (newBoard.length > gameGridArray.length) {
        newBoard.shift();
    }
    return newBoard ;
}

function generateGarbageLines(gameGridArray, lines) {
    let garbageLines = [];
    let linesToGenerate;
    switch (lines) {
        case 2:
            linesToGenerate = 1;
            break;
        case 3:
            linesToGenerate = 2;
            break;
        case 4:
            linesToGenerate = 4;
            break;
        default:
            console.error("generateGarbageLines: Not enough lines!", lines)
            linesToGenerate = 0;
            break;
    }
    for (let i = 0; i < linesToGenerate; i++) {
        const garbageLine = new Array(gameGridArray[0].length).fill("g")
        garbageLine[Math.floor(Math.random() * (gameGridArray[0].length))] = ""
        garbageLines.push(garbageLine)
    }
    return garbageLines
}