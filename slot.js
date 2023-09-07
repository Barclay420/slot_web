    const symbols = [
        { symbol: "🍒", probability: 1.45 / 9, payout: 10 },
        { symbol: "🍊", probability: 1.45 / 9, payout: 10 },
        { symbol: "🍋", probability: 1.45/ 9, payout: 10 },
        { symbol: "🍇", probability: 1.45 / 9, payout: 10 },
        { symbol: "🍉", probability: 1.45 / 9, payout: 10 },
        { symbol: "🍓", probability: 1 / 18, payout: 15 },
        { symbol: "🍍", probability: 1 / 18, payout: 15 },
        { symbol: "🥝", probability: 1 / 18, payout: 15 },
        { symbol: "🐯", probability: 1/36, payout: 40}
    ];
    
    


let lastSymbol = null; // To track the last symbol displayed.


let currentUser = null; // Aktuell användare





function updateBalance() {
    if (currentUser) {
        const balanceElement = document.getElementById("balance");
        balanceElement.textContent = `Balance: $${currentUser.balance}`;
    }
}


function spin() {
    if (balance <= 0) {
        showMessage("You're out of balance. Please add more fake currency.");
        return;
    }

    // Kolla om användaren har tillräckligt med balans för att göra insatsen
    if (balance < betAmount) {
        showMessage("Insufficient balance. Please lower your bet.");
        return;
    }

    // Ta bort tidigare animationer om de finns
    document.querySelectorAll(".reel").forEach(reel => reel.classList.remove("spin-animation"));

    // Kör animation för varje hjul
    document.querySelectorAll(".reel").forEach(reel => {
        reel.style.animationDuration = (Math.random() * 2 + 2) + "s";
        reel.style.animationTimingFunction = "cubic-bezier(0.645, 0.045, 0.355, 1)";
        reel.style.animationIterationCount = "1";
        reel.style.animationName = "none"; // Återställ tidigare animation
        reel.offsetHeight; // Kör reflow för att återställa animationen direkt
        reel.style.animationName = "spin-animation"; // Lägg till ny animation
    });

    // Uppdatera balans efter insats
    balance -= betAmount;
    updateBalance();
}


function getRandomSymbol() {
    let availableSymbols = symbols.filter(symbolData => symbolData.symbol !== lastSymbol);

    if (availableSymbols.length === 0) {
        // If there are no symbols available (all the same), reset the last symbol.
        lastSymbol = null;
        availableSymbols = symbols.slice();
    }

    return ( availableSymbols[getRandomInt(0, availableSymbols.length)]);
    const randomValue = Math.random();
    let cumulativeProbability = 0;

    for (const symbolData of availableSymbols) {
        cumulativeProbability += symbolData.probability;
        if (randomValue <= cumulativeProbability) {
            lastSymbol = symbolData.symbol;
            return symbolData.symbol;
        }
    }

    return availableSymbols[availableSymbols.length - 1].symbol;
}


let balance = 100000;
const messageElement = document.getElementById("message");
const balanceElement = document.getElementById("balance");

function showMessage(message) {
    messageElement.textContent = message;
}

function updateBalance() {
    balanceElement.textContent = `Balance: ${balance}`;
}

function spin() {
    if (balance <= 0) {
        showMessage("You're out of balance. Please add more fake currency.");
        return;
    }

    const betAmount = prompt("Enter your bet amount:", "10000");
    const parsedBet = parseInt(betAmount);

    if (isNaN(parsedBet) || parsedBet <= 0 || parsedBet > balance) {
        showMessage("Invalid bet amount. Please enter a valid amount.");
        return;
    }

    const reel1 = document.getElementById("reel1");
    const reel2 = document.getElementById("reel2");
    const reel3 = document.getElementById("reel3");

    const result1 = getRandomSymbol();
    const result2 = getRandomSymbol();
    const result3 = getRandomSymbol();

    reel1.textContent = result1;
    reel2.textContent = result2;
    reel3.textContent = result3;

    let payoutMultiplier = 0;

    if (result1 === result2 && result2 === result3) {
        // Three of a kind
        payoutMultiplier = symbols.find(symbolData => symbolData.symbol === result1).payout;
    } else if (result1 === result2 || result2 === result3 || result1 === result3) {
        // Two of a kind
        payoutMultiplier = 1.5; // You can adjust this multiplier for two of a kind.
    }

    if (payoutMultiplier > 0) {
        const winnings = parsedBet * payoutMultiplier;
        balance += winnings;
        showMessage(`Congratulations! You win ${winnings} fake currency.`);
    } else {
        balance -= parsedBet;
        showMessage(`Sorry, you lose ${parsedBet} fake currency.`);
    }

    updateBalance();
}

function getRandomSymbol() {
    const randomValue = Math.random();
    let cumulativeProbability = 0;

    for (const symbolData of symbols) {
        cumulativeProbability += symbolData.probability;
        if (randomValue <= cumulativeProbability) {
            return symbolData.symbol;
        }
    }

    return symbols[symbols.length - 1].symbol;
}




