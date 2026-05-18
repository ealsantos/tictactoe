 const gameSetup = (function (){
    const boardSlots = [[1,2,3],[4,5,6],[7,8,9]];

    return{
        board: boardSlots
    }
})();

function boardManagement(){
    function placeMarker(marker, columnIndex, rowIndex){
        return gameSetup.board[columnIndex][rowIndex] = marker
    }

    return {
        selectPosition: placeMarker
    }
}

// factory function Game

function createPlayer (name, marker){
    return {
        name,
        marker
    }
}

const test = boardManagement();
test.selectPosition('X', 0, 0)
console.log(gameSetup.board)