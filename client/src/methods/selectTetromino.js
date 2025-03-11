function shuffleBag(gameState) {
    const { bag } = gameState;  
    for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]]; 
    }
}

export function selectRandomTetromino(gameState,tetrominoes) {
    const { bag } = gameState;  


    if (bag.length === 0) {
        gameState.bag = Object.keys(tetrominoes);  
        shuffleBag(gameState);  
    }

    
    const randomKey = bag.pop();  
    return tetrominoes[randomKey]; 
}