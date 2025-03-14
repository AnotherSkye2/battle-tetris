export function selectRandomTetromino(gameState, tetrominoes) {
    console.log("bag", gameState.bag, tetrominoes, Object.keys(tetrominoes))
    if (gameState.bag.length === 0) {
        gameState.bag = Object.keys(tetrominoes);  
        shuffleBag(gameState);  
    }
    const randomKey = gameState.bag.pop(); 
    if(!randomKey){
        return
    } 
    console.log("selected tetetrroomino", tetrominoes[randomKey])
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

function shuffleBag(gameState) {
    const { bag } = gameState;  
    for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]]; 
    }
}

