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

function createPlayer (name, marker){
        return {
            name,
            marker
        }
    }

function gameManagement(player1, player2){
    let isPlayerOneTurn

    function setFirstTurn(){
        return Math.floor((Math.random() * 2)) === 0
    }

    function initGame(){
        isPlayerOneTurn = setFirstTurn()
    }

    function switchTurn(){
        isPlayerOneTurn = !isPlayerOneTurn
    }

    return {
        startGame: initGame,
        currentTurn: function(){ return isPlayerOneTurn },
        changePlayerTurn: switchTurn
    }
}


const player1 = createPlayer('Emanuel', 'X')
const player2 = createPlayer('Test', 'O')

const game = gameManagement(player1, player2)
game.startGame()
console.log(game.currentTurn())
game.changePlayerTurn()
console.log(game.currentTurn())


const test = boardManagement();
test.selectPosition('X', 0, 0)
console.log(gameSetup.board)

