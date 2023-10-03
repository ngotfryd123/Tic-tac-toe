function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
  
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }

    const dropToken = (row, column, player) => {
        board[row][column].addToken(player);
      };
    
  
    const getBoard = () => board;
  
    return { getBoard, dropToken};
  }
  
  function Cell() {
    let value = "";
  
    const addToken = (player) => {
        value = player;
        getValue(value);
    };
  
    const getValue = () =>value;
  
    return {
      addToken,
      getValue
    };
  }
  
  function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
  ) {
    const board = Gameboard();
    
    const players = [
      {
        name: playerOneName,
        token: "X"
      },
      {
        name: playerTwoName,
        token: "O"
      }
    ];
  
    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;
  
    const playRound = (row,col) => {
      
         board.dropToken(row, col, activePlayer.token);
      /*  This is where we would check for a winner and handle that logic,
          such as a win message. */
  
      switchPlayerTurn();
    };
  
    return {
      playRound,
      getActivePlayer,
      getBoard: board.getBoard
    };
  }
  
  function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    
  
    const updateScreen = () => {
      // clear the board
      boardDiv.textContent = "";
  
      // get the newest version of the board and player turn
      const board = game.getBoard();
      const activePlayer = game.getActivePlayer();
  
      // Display player's turn
      playerTurnDiv.textContent = `${activePlayer.name}'s turn...`
  
      // Function to handle square clicks
    function handleSquareClick(row, col) {
        game.playRound(row, col);
        updateScreen();
      }
  
      // Create the grid of squares and add click event listeners
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const square = document.createElement("button");
          square.className = "square";
          square.textContent = board[row][col].getValue();
          square.addEventListener("click", () => {
            handleSquareClick(row, col);
          });
          boardDiv.appendChild(square);
        }
      }
    }
  
    // Initial render
    updateScreen();
  
    // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
  }
  
  ScreenController();