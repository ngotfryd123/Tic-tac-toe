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
    
    const reset = () => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          board[i][j].addToken(""); // Set the token value to an empty string
        }
      }
    };

    const getBoard = () => board;
  
    return { getBoard, dropToken, reset};
  }
  
  function Cell() {
    let value = "";
  
    const addToken = (player) => {
        value = player;
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
        token: "X",
        choices:[]
      },
      {
        name: playerTwoName,
        token: "O",
        choices:[]
      }
    ];

    function updatePlayerNames(name1, name2) {
      players[0].name = name1;
      players[1].name = name2;
    };

    function resetGame(){
      players[0].choices=[];
      players[1].choices=[];
      board.reset();
      activePlayer = players[0];
    }

    const setsToCompare = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
    ];


    function checkWin(){

      // Function to generate all combinations of 3 choices from an array.
    function generateCombinations(choices) {
    const combinations = [];
    const len = choices.length;

    for (let i = 0; i < len - 2; i++) {
      for (let j = i + 1; j < len - 1; j++) {
        for (let k = j + 1; k < len; k++) {
          combinations.push([choices[i], choices[j], choices[k]]);
        }
      }
    }

    return combinations;
    }


    // Generate all combinations of 3 choices from the player's choices.
    const choiceCombinations = generateCombinations(activePlayer.choices);

    // Initialize a flag to check if any combination is found in the sets.
    let combinationFound = false;

    // Loop through each combination and check if it exists in setsToCompare.
    for (const combination of choiceCombinations) {
    if (setsToCompare.some((set) => set.every((value) => combination.includes(value)))) {
      combinationFound = true;
      break;
    }
    }

    // Check if any combination was found in the sets.
    if (combinationFound)return "win";
    else if(players[0].choices.length === 5 && players[1].choices.length === 4 ){
     return "tie";}
    else if(players[1].choices.length === 5 && players[0].choices.length === 4 ){
      return "tie";}
    else {}

  }

    function playerSelection(row,col){
      let selection;
      switch(true){
      case row===0 && col===0:
        selection=1;
        break;
      case row===0 && col===1:
        selection=2;
        break;
        case row===0 && col===2:
        selection=3;
        break;
      case row===1 && col===0:
        selection=4;
        break;
        case row===1 && col===1:
        selection=5;
        break;
      case row===1 && col===2:
        selection=6;
        break;
        case row===2 && col===0:
        selection=7;
        break;
      case row===2 && col===1:
        selection=8;
        break;
      case row===2 && col===2:
        selection=9;
        break;}

      return activePlayer.choices.push(selection);
    }

  
    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;
  
    const playRound = (row,col) => {
      
         board.dropToken(row, col, activePlayer.token);
         playerSelection(row,col);
         checkWin();

         if(checkWin() !== undefined){
          return;
         }
         else switchPlayerTurn();
    };
  
    return {
      playRound,
      getActivePlayer,
      getBoard: board.getBoard,
      playerSelection,
      checkWin,
      updatePlayerNames,
      resetGame
    };
  }
  
  function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    document.getElementById("nameForm").addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent the default form submission behavior
      // Get the values from the input fields
      var name1 = document.getElementById("Player1").value;
      var name2 = document.getElementById("Player2").value;
      game.updatePlayerNames(name1, name2);
      updateScreen();
      document.getElementById("nameForm").reset();
    });
    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", () => {
      console.log("hello");
      game.resetGame(); // Call the reset function in GameController
      updateScreen(); // Update the screen after resetting
    });
  
    const updateScreen = () => {
      // clear the board
      boardDiv.textContent = "";
  
      // get the newest version of the board and player turn
      const board = game.getBoard();
      const activePlayer = game.getActivePlayer();
  
      // Display player's turn
      if(game.checkWin() === "win"){
        playerTurnDiv.textContent = `${activePlayer.name} Won!`}
      else if (game.checkWin() === "tie"){
        playerTurnDiv.textContent = `It's a Tie!`}
      else playerTurnDiv.textContent = `${activePlayer.name}'s turn...`
  
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
            if (square.textContent !== ""){}
            else{
            handleSquareClick(row, col);}
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