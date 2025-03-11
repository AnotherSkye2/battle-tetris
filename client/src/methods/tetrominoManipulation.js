
export function placeTetromino(gameGridArray,tetromino,position){
    const {row,col} = position
    
    for(let r = 0; r < tetromino.length; r++){
        for(let c = 0; c < tetromino[r].length; c++){
            if(tetromino[r][c] === "o"){
                gameGridArray[row + r][col + c] = "o"
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


export function clearTetromino(gameGridArray, tetromino, position) {

    const { row, col } = position;
    for (let r = 0; r < tetromino.length; r++) {
        for (let c = 0; c < tetromino[r].length; c++) {
            if (tetromino[r][c] === "o") {
                gameGridArray[row + r][col + c] = ""; 
            }
        }
    }
}