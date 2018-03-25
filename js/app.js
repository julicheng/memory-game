// Array to hold cards
let cardSymbols = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb"
];

// Cards
let cards = document.querySelectorAll(".card");

// Restart variables
let restart = document.querySelector(".fa-repeat");

// Card matching variables
let movesDisplay = document.querySelector(".moves");
let openCards = [];
let moves = 0;
let matches = 0;

// Star rating variables
let star_0 = document.querySelectorAll(".fa-star")[0];
let star_1 = document.querySelectorAll(".fa-star")[1];
let star_2 = document.querySelectorAll(".fa-star")[2];

// Timer variables
let timer = document.querySelector(".timer");
let seconds = 0;
let minutes = 0;
let interval = "";

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Shuffle and display the cards
function updateCards() {
    shuffle(cardSymbols);
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList = "card";
        cards[i].firstElementChild.classList = "";
        cards[i].firstElementChild.classList+= cardSymbols[i] + " fa";
    }
}

// Set up event listener for a card when it is clicked
function addEventListeners() {
    restart.addEventListener("click", restartGame);
    for (let i = 0; i < cards.length; i++) {
        // Display the card's symbol
        cards[i].addEventListener("click", showSymbol);
        // Add card to arry of open cards
        cards[i].addEventListener("click", addOpenCard);
    }
}

// Display the card's symbol
function showSymbol() {
    this.classList += " open show";
}

// Add card to array of open cards
function addOpenCard() {
    addMoves();
    openCards.push(this.firstElementChild.classList
        .toString()
        .slice(0, -3));
    // Check if there are 2 cards in array
    if (openCards.length == 2) {
        checkCards();
    }
}

// Check if cards match
function checkCards() {
    if (openCards[0] === openCards[1]) {
        lockCards();
    } else {
        setTimeout(removeOpenCards, 500);
    }
}

// Lock cards if they match
function lockCards() {
    let lock = document.querySelectorAll("." + openCards[0]);
    lock[0].parentElement.classList += " match";
    lock[1].parentElement.classList += " match";

    openCards = [];
    checkMatches();
}

// Remove cards from array if no match
function removeOpenCards() {
    let unlock_0 = document.querySelectorAll("." + openCards[0]);
    let unlock_1 = document.querySelectorAll("." + openCards[1]);

    unlock_0[0].parentElement.classList.remove("open", "show");
    unlock_0[1].parentElement.classList.remove("open", "show");
    unlock_1[0].parentElement.classList.remove("open", "show");
    unlock_1[1].parentElement.classList.remove("open", "show");

    openCards = [];
}

// Count moves made
function addMoves() {
    moves++;
    movesDisplay.innerHTML = moves;
    console.log(moves);
    starRatingUpdate();
}

function starRatingUpdate() {
    if (moves <= 20){
        star_0.classList = "fa fa-star";
        star_1.classList = "fa fa-star";
        star_2.classList = "fa fa-star";
    } else if (moves <= 30) {
        star_2.classList.remove("fa-star");
    } else {
        star_1.classList.remove("fa-star");
    }
}

// Check matches
function checkMatches() {
    matches++;
    if (matches === 8) {
      winnersScreen();
    }
}

// Display modal if all matches found
function winnersScreen() {
    console.log("winner!")
}

// New game
function restartGame() {
    openCards = [];
    moves = 0;
    movesDisplay.innerHTML = 0;
    matches = 0;

    clearInterval(interval);
    starRatingUpdate();
    updateCards();
    startTimer();
}

// Run timer
function startTimer() {
    seconds = 0;
    minutes = 0;

    function tick() {
        timer.innerHTML = minutes + ":" + seconds;
        seconds += 1;
        if (seconds === 60) {
        minutes += 1;
        seconds = 0;
        }
    }
        
    interval = setInterval(tick, 1000);
}

// when the page loads
function init() {
    updateCards();
    addEventListeners();
    startTimer();
}

init();
