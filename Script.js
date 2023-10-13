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
    if (combinationFound)return activePlayer.name;
    else {
    
    // You can add your code for when no combination is found here.
    }

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
         console.log(checkWin());
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
      checkWin
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
      if(game.checkWin() !== undefined){
        playerTurnDiv.textContent = `${activePlayer.name} Won!`}
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