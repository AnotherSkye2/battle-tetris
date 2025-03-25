
export default function getEmptyTetrominoColumns(tetromino) {
    const colLength = 3
    let hasSeenBlock = false;
    let rightCol = 0
    let leftCol = 0;

    for(let c = 0; c < tetromino[0].length; c++) {
        let emptyColLength = 0;
        for(let r =0; r < tetromino.length; r++){
            if (tetromino[r][c] == "") {
                emptyColLength++
            } else {
                hasSeenBlock = true
            }
            if (emptyColLength == colLength) {
                hasSeenBlock ? rightCol++ : leftCol++
            }
        }

    }
    // console.log("leftCol, rightCol, tetromino: ", leftCol, rightCol, tetromino)
    return [leftCol, rightCol]
}