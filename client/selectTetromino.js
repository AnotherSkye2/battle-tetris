export function selectRandomTetromino(tetrominoes) {
    console.log("random tetri ", tetrominoes)
    const keys = Object.keys(tetrominoes);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    console.log("chose: ", tetrominoes[randomKey])
    return tetrominoes[randomKey];
}