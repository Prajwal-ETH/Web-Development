// Import the 'prompt-sync' library for user input
const prompt = require("prompt-sync")();

// Constants defining the dimensions of the slot machine
const ROWS = 3;
const COLS = 3;

// Constants defining the count and values of symbols
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const SYMBOL_VALUE = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
}

// Function to handle depositing money into the game
const deposit = () => {
    while(true){
        // Prompt the user to enter a deposit amount
        const depositAmount = prompt("Enter a Deposit Amount: ");
        const numberDepositAmount = parseFloat(depositAmount);

        // Check if the input is valid, if not, prompt the user to try again
        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0 ){
            console.log("Invalid deposit amount, Try again");
        } else{
            return numberDepositAmount; // Return the valid deposit amount
        }
    }
};

// Function to get the number of lines to bet on
const getNumberOfLines = () => {
    while(true){
        // Prompt the user to enter the number of lines
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        // Check if the input is valid, if not, prompt the user to try again
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of lines, Try again");
        } else{
            return numberOfLines; // Return the valid number of lines
        }
    }
};

// Function to get the bet amount per line
const getBet = (balance, lines) => {
    while(true){
        // Prompt the user to enter the bet amount per line
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);

        // Check if the input is valid, if not, prompt the user to try again
        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){
            console.log("Invalid bet, Try again");
        } else{
            return numberBet; // Return the valid bet amount
        }
    }
};

// Function to simulate spinning the slot machine
const spin = () => {
    // Create an array 'symbols' containing symbols based on their counts
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    // Create an array 'reels' representing the slot machine reels
    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            // Randomly select a symbol and add it to the current reel
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels; // Return the resulting reels
};

// Function to transpose the reels (swap rows and columns)
const transpose = (reels) => {
    const rows = [];

    // Iterate over the rows and columns, swapping them
    for (let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows; // Return the transposed reels
}

// Function to print the symbols in each row
const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for (const[i, symbol] of row.entries()){
            rowString += symbol
            if (i != rows.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString); // Print the symbols in the current row
    }
}

// Function to calculate the winnings based on the symbols in each row
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    // Iterate over each row and check if all symbols are the same
    for (let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        // If all symbols in the row are the same, calculate and add winnings
        if (allSame) {
            winnings += bet * SYMBOL_VALUE[symbols[0]]
        }
    }
    return winnings; // Return the total winnings
}

// Main game function
const game = () => {
    let balance = deposit(); // Initialize the game balance

    // Main game loop
    while (true){
        console.log("You have a balance of $" + balance);

        // Get the number of lines to bet on
        const numberOfLines = getNumberOfLines();
        
        // Get the bet amount per line
        const bet = getBet(balance, numberOfLines);

        // Deduct the total bet amount from the balance
        balance -= bet * numberOfLines;

        // Spin the slot machine and get the resulting reels
        const reels = spin();

        // Transpose the reels to represent the symbols in each row
        const rows = transpose(reels);

        // Print the symbols in each row
        printRows(rows);

        // Calculate and add winnings based on the symbols in each row
        const winnings = getWinnings(rows, bet, numberOfLines)

        // Add the winnings to the balance
        balance += winnings;

        // Display the winnings to the user
        console.log("You Won, $" + winnings.toString());

        // Check if the balance is zero, if so, end the game
        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        }

        // Ask the user if they want to play again
        const playAgain = prompt("Do you want to play again? (y/n)")

        // If the user chooses not to play again, end the game
        if (playAgain != "y") break;
    }
}

// Start the game by calling the main game function
game();
