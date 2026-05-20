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

    function checkWinner(marker){
        let hasWinner = false
        winningConditions.forEach((item) => {
            if (gameSetup.board[item[0][0]][item[0][1]] === marker && gameSetup.board[item[1][0]][item[1][1]] === marker && gameSetup.board[item[2][0]][item[2][1]] === marker){
                hasWinner = true
            }
        });
        return hasWinner
    }

    function setFirstTurn(){
        return Math.floor((Math.random() * 2)) === 0
    }

    function initGame(){
        isPlayerOneTurn = setFirstTurn()
    }

    function switchTurn(){
        isPlayerOneTurn = !isPlayerOneTurn
    }

    function afterMove(marker){
        if (checkWinner(marker)){
            console.log('reset game')
        } else {
            console.log('switching turn')
            switchTurn()
        }
    }

    return {
        startGame: initGame,
        currentTurn: function(){ return isPlayerOneTurn },
        changePlayerTurn: switchTurn,
        verifyWinner: afterMove
    }
}

const player1 = createPlayer('Emanuel', 'X')
const player2 = createPlayer('Test', 'O')

const game = gameManagement(player1, player2)
const board = boardManagement()
game.startGame()
// simulate player 1 winning top row
console.log(game.currentTurn())
board.selectPosition('X', 0, 0)
board.selectPosition('X', 0, 1)
board.selectPosition('X', 0, 1)

game.verifyWinner(player1.marker)
console.log(game.currentTurn())
