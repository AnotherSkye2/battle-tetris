export default function getTetrominoProfiles(tetromino, depth) {
    tetromino = tetromino.filter(row => row.some(cell => cell !== ""))
    let tetrominoProfiles = [];
    if (tetromino.length < depth) { depth = tetromino.length }
    for(let r = tetromino.length - 1; r >= tetromino.length - depth; r--){
        const profile = [];
        for(let c =0; c < tetromino[r].length; c++) {
            if (tetromino[r][c] !== "") {profile.push(1)}
            if (tetromino[r][c] === "" && tetromino[0][c] !== "") {profile.push(0)}
            
        }
        console.log("getTetrominoProfiles: profile:", profile, r)
        tetrominoProfiles.unshift(profile)
    }
    return tetrominoProfiles
}