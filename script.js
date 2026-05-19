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

    const winningConditions = [
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]],
    ]

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
test.selectPosition('X', 2, 0)
console.log(gameSetup.board)

console.log(gameSetup.board[0][0])