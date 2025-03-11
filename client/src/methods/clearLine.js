export function clearFullLine(gameBoard){
    let newBoard = gameBoard.filter(row => row.some(cell => cell === ""));

    const clearedLines = gameBoard.length - newBoard.length;
    const garbageLines = gameBoard.filter(row => !row.some(cell => cell === ""));

    while (newBoard.length < gameBoard.length) {
        newBoard.unshift(new Array(gameBoard[0].length).fill(""));
    }
    return { newBoard, clearedLines, garbageLines }; // for scoring, rendering and sending lines later on
}