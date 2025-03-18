export default function getBumpiness(tetrominoProfiles, i, height, heightArray) {
    heightArray = getModifiedHeightArray(tetrominoProfiles, i, height, heightArray)
    let bumpiness = 0
    for(let i = 0; i < heightArray.length - 1; i++) {
        bumpiness += Math.abs(heightArray[i] - heightArray[i+1])
    }
    return bumpiness
}

function getModifiedHeightArray(tetrominoProfiles, position, height, heightArray) {
    const tetrominoProfilesSum = getTetrominoProfilesSum(tetrominoProfiles)
    console.log("bumpiness: tetrominoProfilesSum, position, height, heightArray ", tetrominoProfilesSum, position, height, heightArray)
    for(let i = 0; i < heightArray.length; i++) {
        if (i >= position &&i - position < tetrominoProfilesSum.length) {
            heightArray[i] = tetrominoProfilesSum[i-position] + height
        }
    }
    console.log("bumpiness:  heightArray ", heightArray)
    return heightArray
}

function getTetrominoProfilesSum(tetrominoProfiles) {
    let profileSum = new Array(tetrominoProfiles[0].length).fill(0)
    for(let i = 0; i < tetrominoProfiles.length; i++) {
        for(let j = 0; j < tetrominoProfiles[i].length; j++) {
            if (tetrominoProfiles[i][j] == 0 || profileSum[j] != 0) {
                profileSum[j] += 1
            }
        }
    }
    console.log("bumpiness: tetrominoProfilesSum, tetrominoProfiles ", profileSum, tetrominoProfiles)
    return profileSum
}