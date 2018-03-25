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
let card1 = "";
let card2 = "";
let openCards = [];

// Moves and matches
let movesDisplay = document.querySelector(".moves");
let moves = 0;
let matches = 0;

// Star rating variables
let star_0 = document.querySelectorAll(".fa-star")[0];
let star_1 = document.querySelectorAll(".fa-star")[1];
let star_2 = document.querySelectorAll(".fa-star")[2];

// Restart variables
let restart = document.querySelector(".fa-repeat");

// Timer variables
let timer = document.querySelector(".timer");
let seconds = 0;
let minutes = 0;
let interval = "";

// Modal
let modal = document.querySelector(".modal");

// Play again button
let replay = document.querySelector('.replay-button');

// Stats paragraph
let stats = document.querySelector(".stats");

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
    replay.addEventListener("click", restartGame);
    replay.addEventListener("click", function() {
        modal.classList += " hide";
    });
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
    if (!this.classList.contains("locked")) {
        if (card1 === "") {
        card1 = this;
        card1.classList+= " locked";
        openCards.push(this.firstElementChild.classList
            .toString()
            .slice(0, -3));
        addMoves();
    } else if (card2 === "") {
        if (this.classList.contains("locked")) {
            card2 = "";
        } else {
            card2 = this;
            card2.classList += " locked";
            openCards.push(this.firstElementChild.classList
                .toString()
                .slice(0, -3));
            addMoves();
        }
    }
}
        
        // Check if there are 2 cards in array
        if (openCards.length == 2) {
                checkCards();
            }
}

// Check if cards match
function checkCards() {
    if (openCards[0] === openCards[1]) {
        lockCards();
        resetOpenCards();
        checkMatches();
    } else {
        nomatch();
        setTimeout(removeOpenCards, 500);
    }
}

// Lock cards if they match
function lockCards() {
    card1.classList += " match enlarge";
    card2.classList += " match enlarge";
}

function nomatch() {
    card1.classList += " nomatch shake";
    card2.classList += " nomatch shake";
}

// Remove cards from array if no match
function removeOpenCards() {
    card1.classList = "card";
    card2.classList = "card";

    resetOpenCards();
}

// Reset open cards 
function resetOpenCards() {
    card1 = "";
    card2 = "";
    openCards = [];
}

// Count moves made
function addMoves() {
    moves++;
    movesDisplay.innerHTML = moves;
    starRatingUpdate();
}

// Update star rating
function starRatingUpdate() {
    if (moves <= 25){
        star_0.classList = "fa fa-star";
        star_1.classList = "fa fa-star";
        star_2.classList = "fa fa-star";
    } else if (moves <= 35) {
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
    clearInterval(interval);
    modal.classList.remove("hide");
    if (moves <= 25) {
        stats.innerHTML = "You made " + moves + " moves in " + minutes + " minutes " + seconds + " seconds! 3 stars for you!"
    } else if (moves <= 35) {
        stats.innerHTML = "You made " + moves + " moves in " + minutes + " minutes " + seconds + " seconds! 2 stars for you!"
    } else {
        stats.innerHTML = "You made " + moves + " moves in " + minutes + " minutes " + seconds + " seconds! 1 star for you!";
    }
}

// New game
function restartGame() {
    moves = 0;
    movesDisplay.innerHTML = 0;
    matches = 0;

    clearInterval(interval);
    resetOpenCards();
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
