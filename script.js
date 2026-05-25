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
        if (typeof gameSetup.board[rowIndex][columnIndex] === 'number'){
            placeMarker(player.marker, rowIndex, columnIndex)
            game.verifyWinner(player)
        } else {
            alert(`This slot is already taken!`)
        } 

        renderGame.getTurnInfo()
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

let player1
let player2

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

    function setLoserFirst(winner){ isPlayerOneTurn = winner === player1 ? false : true}

    function afterMove(player){
        if (checkWinner(player.marker)){
            player.playerScore++
            renderGame.showGameResult(`${player.name} won!`)
            board.resetGame()
            renderGame.playerScoresRendering(player1, player2)
            setLoserFirst(player)

        } else if (!checkDraw()){
            renderGame.showGameResult(`It's a draw!`)
            board.resetGame()
            switchTurn()

        } else {
            switchTurn()
        }
        renderGame.gameRendering(gameSetup.board)
    }

    return {
        startGame: initGame,
        currentTurn: function(){ return isPlayerOneTurn },
        verifyWinner: afterMove,
        getActivePlayer: function(){ return isPlayerOneTurn ? player1 : player2 }
    }
}

const gameContainer = document.querySelector('.gameBoard')

function displayManagement(){
    const dialog = document.getElementById("gameMessage")
    const closeButton = document.getElementById("closeMessage")
    const startButton = document.getElementById("startGame")
    const resetButton = document.getElementById("resetGame")

    closeButton.addEventListener("click", () => {
        dialog.close()
        renderGame.gameRendering(gameSetup.board)
        renderGame.getTurnInfo()
    })

    const player1Input = document.getElementById("player1Name")
    const player2Input = document.getElementById("player2Name")

    function checkInputs(){
        if(player1Input.value !== '' && player2Input.value !== ''){
            startButton.disabled = false
        } else {
            startButton.disabled = true
        }
    }

    player1Input.addEventListener("input", checkInputs)
    player2Input.addEventListener("input", checkInputs)
    

    startButton.addEventListener("click", () => {
        const player1name = document.getElementById("player1Name").value
        const player2name = document.getElementById("player2Name").value
        player1 = createPlayer(player1name, 'X')
        player2 = createPlayer(player2name, 'O')
        game = gameManagement(player1, player2)
        game.startGame()
        renderGame.gameRendering(gameSetup.board)
        renderGame.getTurnInfo()
        renderGame.playerScoresRendering(player1, player2)
        startButton.classList.add("hidden");
        resetButton.classList.remove("hidden")
        document.querySelector('.results').classList.remove('hidden')
    })

    resetButton.addEventListener("click", () => {
        board.resetGame()
        firstTurnText.textContent = ''
        document.getElementById("player1Score").textContent = ''
        document.getElementById("player2Score").textContent = ''
        player1 = undefined
        player2 = undefined
        game = undefined
        document.getElementById("player1Name").value = ''
        document.getElementById("player2Name").value = ''
        resetButton.classList.add("hidden");
        startButton.classList.remove("hidden")
        document.querySelector('.results').classList.add('hidden')
        renderGame.gameRendering(gameSetup.board)
        checkInputs()
    })

    function showGameResult(message){
        const dialog = document.getElementById("gameMessage");
        const statement = document.getElementById("messageText");
        statement.textContent = message
        dialog.showModal();
    }

    function gameRendering(currentBoard) {
        gameContainer.innerHTML = ''
        if(!game) return
        for (let i = 0; i < currentBoard.length; i++) {
            for (let j = 0; j < currentBoard[i].length; j++) {
                const gamePositions = document.createElement("div");
                gamePositions.textContent = currentBoard[i][j]
                gameContainer.appendChild(gamePositions)

                const activePlayer = game.currentTurn() ? player1 : player2

                gamePositions.addEventListener("click", function() {
                    board.makeMove(activePlayer, i, j)
                });
            }
        }
    }

    function playerScoresRendering(player1, player2){
        const playerOneScore = document.getElementById("player1Score")
        const playerTwoScore = document.getElementById("player2Score")

        playerOneScore.textContent = `${player1.name}: ${player1.playerScore}`
        playerTwoScore.textContent = `${player2.name}: ${player2.playerScore}`
    }


    const firstTurnText = document.getElementById("firstTurnText")

    function getTurnInfo(){
        if(!game) return
        let currentPlayer = game.getActivePlayer()
        firstTurnText.textContent = `Currently Playing: ${currentPlayer.name}`
    }

    return {
        gameRendering,
        playerScoresRendering,
        getTurnInfo,
        showGameResult
    }
}

let game
const board = boardManagement()
const renderGame = displayManagement()
