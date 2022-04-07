const gameContainer = document.getElementById("game");
const counter = document.querySelector('#counter');
const counterText = document.createElement('div');
const resetBtn = document.querySelector('#reset-button');


const COLORS = [
  "red",
  "blue",
  "green",
  "pink",
  "purple",
  "red",
  "blue",
  "green",
  "pink",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
// let gameOver = false;
// let card1 = null;
// let card2 = null;
// let turnedCards = 0;
// let guesses = [];
// // TODO: Implement this function!
// function handleCardClick(event) {
//   // you can use event.target to see which element was clicked
//   // console.log("you just clicked", event.target.className);
//   console.log(event.target);
//   // change card color and make class = 'turned'
//   event.target.style.backgroundColor = event.target.className;
//   event.target.classList.add('turned');
//   // flip cards back over
//   setTimeout(function(){
//     event.target.classList.remove('turned');
//     event.target.style.backgroundColor = '';
//   }, 1000);
//   guesses.push(event.target.className);
//    // check for 2+ clicks
//   if(guesses.length === 3) {
//     guesses = [];
//     event.target.classList.remove('turned');
//     event.target.style.backgroundColor = '';
//   }
//   //check for match
//   card1 = card2;
//   card2 = event.target;
//   card2.style.backgroundColor = event.target.className;

// }

// // TODO: Implement this function!
// let gameOver = false;
// let flippedCards = [];
// const div = document.querySelectorAll('div')
// function handleCardClick(event) {
//   // you can use event.target to see which element was clicked
//   // console.log("you just clicked", event.target.className);
//   console.log(event.target.className);
//   // prevent 2+ flips
//   if(flippedCards.length >= 2){
//     return;
//   }
//   // make class = 'flip'
//   event.target.classList.add('flip');
//   // if flip, show bg color
//   if(event.target.classList[1] === 'flip')  {
//     event.target.style.backgroundColor = event.target.classList[0];
//   }
//   // make array to check for same card
//   flippedCards.push(event.target.classList[0]);
//   console.log(flippedCards, flippedCards.length);
//   // if cards are the same, keep the color
//   // if(flippedCards[0] === flippedCards[1]){
//   //   return;
//   // }
//   // reset cards after 1 sec
//   setTimeout(function() {
//     // event.target.style.backgroundColor = '';
//     event.target.classList.toggle('flip');
//     flippedCards = [];
//     }, 1500)
// }

// TODO: Implement this function!
alert('Press OK to start the game!')
let card1 = null;
let card2 = null;
let flippedCards = 0;
let lockBoard = false;

function handleCardClick(event) {

  if(lockBoard) return;
  if(event.target.classList.contains('flipped')) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add("flipped");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  // prevent 2+ flips
  if (card1 && card2) {
    lockBoard = true;
    let match1 = card1.className;
    let match2 = card2.className


  if(match1 === match2){
    flippedCards += 2;
    card1.removeEventListener("click", handleCardClick);
    card2.removeEventListener("click", handleCardClick);
    card1 = null;
    card2 = null;
    lockBoard = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        lockBoard = false;
      }, 1000);
  }
  // append counter for matches
  counterText.innerText = `You flipped over ${flippedCards} cards`;
  counter.append(counterText);
  // stop the game if you get to 10 turned cards
if(flippedCards === 10){
  alert('You win!');
}
resetBtn.addEventListener('click', reset);
function reset()  {
  window.location.reload();
}
}
}



// when the DOM loads
createDivsForColors(shuffledColors);
