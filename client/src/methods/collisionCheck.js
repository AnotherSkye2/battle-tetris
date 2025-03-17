export function wallCollisionCheck(tetromino,position){
    const { row, col } = position;
    
    const COLS = 10
    const ROWS = 20
   
    for(let r =0; r < tetromino.length; r++){
        for(let c =0; c < tetromino[r].length; c++){
            if(tetromino[r][c] !== ""){
                const boardX = col + c;
                const boardY = row + r;
                // console.log("boardX, boardY: ", boardX, boardY)
                if(boardX < 0 || boardX >= COLS || boardY >= ROWS){
                    return true
                }
            
            }
        }
    }
    return false
}

export function tetrominoCollisionCheck(tetromino, position, board) {
    const { row, col } = position;

    for (let r = 0; r < tetromino.length; r++) {
        for (let c = 0; c < tetromino[r].length; c++) {
            if (tetromino[r][c] !== "") {
                
                const boardX = col + c;
                const boardY = row + r;

               
                if (boardY >= 0 && boardY < board.length && boardX >= 0 && boardX < board[0].length) {
                    if (board[boardY][boardX] !== "") {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        }
    }

    return false;
}

export function checkCollisions(tetromino,position,direction,board){

    
    if(!tetromino){
        return
    }
    
    let newPosition = { ...position }; 
    

    switch (direction) {
        case "left":
            newPosition.col -= 1; 
            break;
        case "right":
            newPosition.col += 1; 
            break;
        case "down":
            newPosition.row += 1; 
            break;
        case "rotate":
            break;
        default:
            console.error("Invalid direction:", direction);
            return true; 
    }
    if (wallCollisionCheck(tetromino, newPosition)) {
        return true; 
    }

    if (tetrominoCollisionCheck(tetromino, newPosition, board)) {
       return true; 
   }

    return false; 
}