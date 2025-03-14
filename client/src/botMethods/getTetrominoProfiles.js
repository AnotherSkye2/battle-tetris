export default function getTetrominoProfiles(tetromino, depth) {
    console.log("before filter", tetromino)
    tetromino = tetromino.filter(row => row.some(cell => cell !== ""))
    console.log("after filter",tetromino)
    let tetrominoProfiles = [];
    for(let r = tetromino.length - 1; r >= tetromino.length - depth; r--){
        console.log("tetromino row", tetromino[r])
        tetrominoProfiles.push(tetromino[r])
    }
    return tetrominoProfiles
}