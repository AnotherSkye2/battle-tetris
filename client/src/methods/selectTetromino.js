export function selectRandomTetromino(tetrominoes) {
    const keys = Object.keys(tetrominoes);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const tetromino = tetrominoes[randomKey]
    const tetrominoType = getTetrominoType(tetromino)
    return [tetromino, tetrominoType];
}

function getTetrominoType(tetromino) {
    for (let r = 0; r < tetromino.length; r++) {
        for (let c = 0; c < tetromino[r].length; c++) {
            console.log(tetromino[r][c])
            if (tetromino[r][c] !== "") { 
                return tetromino[r][c]
            }
        }
    }
    
}