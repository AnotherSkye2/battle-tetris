export function clearFullLine(gameGridArray){
    let newBoard = gameGridArray.filter(row => row.some(cell => cell === ""));

    const clearedLines = gameGridArray.length - newBoard.length;
    const garbageLines = gameGridArray.filter(row => !row.some(cell => cell === ""));

    while (newBoard.length < gameGridArray.length) {
        newBoard.unshift(new Array(gameGridArray[0].length).fill(""));
    }
    return { newBoard, clearedLines, garbageLines }; // for scoring, rendering and sending lines later on
}