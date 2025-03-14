
export function placeTetromino(gameloopObject){
    console.log("gameloopObject:", gameloopObject)
    const {row,col} = gameloopObject.position
    const tetromino = gameloopObject.gameState.activeTetromino
    const type = gameloopObject.gameState.tetrominoType

    if(!tetromino){
        return
    }
    for(let r = 0; r < tetromino.length; r++){
        for(let c = 0; c < tetromino[r].length; c++){
            if(tetromino[r][c] === type){
                gameloopObject.gameGridArray[row + r][col + c] = type
            }

        }
    }
}

export function rotateTetromino(matrix){
    const rowsNr = matrix.length
    let rotatedMatrix = Array.from({length: rowsNr}, () => Array(rowsNr).fill(""))


    for(let i = 0; i <rowsNr; i++){
        for(let j =0; j < rowsNr; j++){
            rotatedMatrix[j][i] =matrix[i][j]
        }
    }
    for(let i =0; i < rowsNr; i++){
        rotatedMatrix[i].reverse()
    }
    
    return rotatedMatrix
}


export function clearTetromino(gameloopObject) {
    const tetromino = gameloopObject.gameState.activeTetromino
    const type = gameloopObject.gameState.tetrominoType
    const { row, col } = gameloopObject.position;

    if(!tetromino){
        return
    }
    for (let r = 0; r < tetromino.length; r++) {
        for (let c = 0; c < tetromino[r].length; c++) {
            if (tetromino[r][c] === type) {
                gameloopObject.gameGridArray[row + r][col + c] = ""; 
            }
        }
    }
}