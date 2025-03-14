export default function getTetrominoProfiles(tetromino, depth) {
    tetromino = tetromino.filter(row => row.some(cell => cell !== ""))
    let tetrominoProfiles = [];
    for(let r = tetromino.length - 1; r >= tetromino.length - depth; r--){
        const profile = [];
        for(let c =0; c < tetromino[r].length; c++) {
            if (tetromino[r][c] !== "") {profile.push(1)}
            if (r > 0) {
                if (tetromino[r][c] === "" && tetromino[r - 1][c] !== "") {profile.push(0)}
            }
        }
        console.log("profile", profile)
        tetrominoProfiles.unshift(profile)
    }
    return tetrominoProfiles
}