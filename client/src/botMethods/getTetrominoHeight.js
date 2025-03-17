export default function getTetrominoHeight(profiles) {
    let height = 0
    let zeroCoordinate = -1;
    for (let p = profiles.length - 1; p >= 0; p--) {
        height++
        for(let i =0; i < profiles[p].length; i++){
            if (profiles[p][i] == 0 && zeroCoordinate == -1) {zeroCoordinate = i}
            if (zeroCoordinate != -1 && profiles[p][zeroCoordinate] != 0) {return height}
        }
    }
    return height
}
