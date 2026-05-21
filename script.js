 const gameSetup = (function (){
    const boardSlots = [[1,2,3],[4,5,6],[7,8,9]];

    return{
        board: boardSlots,
    }
})();

function boardManagement(){
    function placeMarker(marker, rowIndex, columnIndex){
        return gameSetup.board[rowIndex][columnIndex] = marker
    }

    function makeMove(player, rowIndex, columnIndex){
        placeMarker(player.marker, rowIndex, columnIndex)
        game.verifyWinner(player)
    }

    function resetGame(){
        gameSetup.board = [[1,2,3],[4,5,6],[7,8,9]]
    }

    return {
        makeMove,
        resetGame
    }
}

function createPlayer (name, marker){
    let playerScore = 0
        return {
            name,
            marker,
            playerScore
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

    function checkDraw() {
        let flatBoard = gameSetup.board.flat()
        return flatBoard.some((item) => typeof item === 'number')
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

    function setLoserFirst(winner){ isPlayerOneTurn = winner === player1 ? false : true
        console.log(winner)
    }

    function afterMove(player){
        if (checkWinner(player.marker)){
            player.playerScore++
            board.resetGame()
            setLoserFirst(player)
        } else if (!checkDraw()){
            board.resetGame()
            switchTurn()
        } 
    }

    return {
        startGame: initGame,
        currentTurn: function(){ return isPlayerOneTurn },
        verifyWinner: afterMove
    }
}

const player1 = createPlayer('Emanuel', 'X')
const player2 = createPlayer('Test', 'O')

const game = gameManagement(player1, player2)
const board = boardManagement()

// Setup
game.startGame()
