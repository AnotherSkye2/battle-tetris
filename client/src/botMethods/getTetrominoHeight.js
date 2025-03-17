export default function getTetrominoHeight(profiles) {
    let height = 0
    let nonZeroCoordinate = -1;
    for (let p = profiles.length - 1; p >= 0; p--) {
        height++
        for(let i =0; i < profiles[p].length; i++){
            if (profiles[p][i] != 0 && nonZeroCoordinate == -1) {nonZeroCoordinate = i}
            if (nonZeroCoordinate != -1 && profiles[p][nonZeroCoordinate] == 0) {return height}
        }
    }
    return height
}
