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

// Select all cards
let cards = document.querySelectorAll(".card");

let openCards = [];
let moves = 0;
let matches = 0;

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
        cards[i].firstElementChild.classList = "";
        cards[i].firstElementChild.classList+= cardSymbols[i] + " fa";
    }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Set up event listener for a card when it is clicked
function addEventListeners() {
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

function lockCards() {
    let lock = document.querySelectorAll("." + openCards[0]);
    lock[0].parentElement.classList += " match";
    lock[1].parentElement.classList += " match";

    openCards = [];
    checkMatches();
}

function removeOpenCards() {
    let unlock_0 = document.querySelectorAll("." + openCards[0]);
    let unlock_1 = document.querySelectorAll("." + openCards[1]);

    unlock_0[0].parentElement.classList.remove("open", "show");
    unlock_0[1].parentElement.classList.remove("open", "show");
    unlock_1[0].parentElement.classList.remove("open", "show");
    unlock_1[1].parentElement.classList.remove("open", "show");

    openCards = [];
}

function checkMatches() {
    matches++;
    if (matches === 8) {
      console.log("you have won!");
    }
}

// Count moves made
function addMoves() {
    moves++;
    console.log(moves);
}

// when the page loads
updateCards();
addEventListeners();
