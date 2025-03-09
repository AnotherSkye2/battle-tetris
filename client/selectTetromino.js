export function selectRandomTetromino(tetrominoes) {
    const keys = Object.keys(tetrominoes);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return tetrominoes[randomKey];
}