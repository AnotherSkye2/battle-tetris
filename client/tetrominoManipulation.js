
export function placeTetromino(gameBoard,tetromino,position){
    const {row,col} = position
    
    for(let r = 0; r < tetromino.length; r++){
        for(let c = 0; c < tetromino[r].length; c++){
            if(tetromino[r][c] === 1){
                gameBoard[row + r][col + c] = 1
            }

        }
    }
}

export function rotateTetromino(matrix){
    const rowsNr = matrix.length
    let rotatedMatrix = Array.from({length: rowsNr}, () => Array(rowsNr).fill(0))


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


export function clearTetromino(gameBoard, tetromino, position) {
    const { row, col } = position;
    for (let r = 0; r < tetromino.length; r++) {
        for (let c = 0; c < tetromino[r].length; c++) {
            if (tetromino[r][c] === 1) {
                gameBoard[row + r][col + c] = 0; 
            }
        }
    }
}