export default function getTetrominoProfiles(tetromino, depth) {
    tetromino = tetromino.filter(row => row.some(cell => cell !== ""))
    let tetrominoProfiles = [];
    if (tetromino.length < depth) { depth = tetromino.length }
    for(let r = tetromino.length - 1; r >= tetromino.length - depth; r--){
        const profile = [];
        for(let c =0; c < tetromino[r].length; c++) {
            if (tetromino[r][c] !== "") {profile.push(0)}
            if (r == 0) {
                if (tetromino[r][c] === "" && tetromino[r + 1][c] !== "") {
                    profile.push(1)
                    continue
                }
            }
            if (r > 0) {
                if (tetromino[r][c] === "" && tetromino[r - 1][c] !== "") {
                    profile.push(1)
                    continue
                }

            }
            if (tetromino.length == 3 && tetromino[r][c] === "") {
                switch (r) {
                    case 2:
                        if (tetromino[r - 2][c] !== "") {
                            profile.push(2)
                        }
                        break;
                    case 1:
                        if (tetromino[r - 1][c] !== "" || tetromino[r + 1][c] !== "") {
                            profile.push(1)
                        }
                        break;
                    case 0:
                        if (tetromino[r + 2][c] !== "") {
                            profile.push(2)
                        }
                        break;
                }
            }
        }
        // console.log("getTetrominoProfiles: profile:", profile, r)
        tetrominoProfiles.unshift(profile)
    }
    return tetrominoProfiles
}