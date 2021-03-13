// POS - NOTE: All game function related logic and global variables, this is the primary file for the project,
// and is supported by tileActions.js, timers.js and colorUtils.js


// POS - global variables. Generally it is best to limit use of global variables as it can be easy to overwrite them and it eats up a bit more
// memory, see below link if interested, but we do need them in some cases (such as here):
// https://stackoverflow.com/questions/31616608/global-variable-and-local-variable-memory-consumption-javascript#:~:text=1%20Answer&text=In%20JavaScript%2C%20variables%20are%20kept,re%20always%20kept%20in%20memory.
let clicks = 0;
const tiles = document.querySelectorAll(".gametile");
let tileIcon;
let tileIcons = [];
let tileIds = [];
// POS - I'm not entirely clear on what variable `n` is, I think it's number of clicks. It's best to avoid using single letter
// variable names as it's not clear to other developers when working on shared projects. Also each variable should have a single purpose
let n = 0;
let correctMatches = 0;

/*start button initiates game and starts counter
initiates game start on button press*/
let startButton = document.getElementById("startGame")
startButton.addEventListener("click", startGame);
const endButton = document.getElementById('endGame')
endButton.addEventListener("click", endGame);

function startGame() {
    endButton.disabled = false;
    startButton.disabled = true;
    resetTiles();
    startTimer();
    //displayTile -> function which listens for click event and displays tile value on click
    tiles.forEach(tile => tile.addEventListener("click", displayTile));
}

function endGame() {
    endButton.disabled = true;
    startButton.innerText = "New Game";
    startButton.disabled = false;
    calculateScore();
}

function checkMatch(tileIcons, tileIds, n) {

    // POS - there was duplication here when we had the same code running for n and n + 1. Abstracted out logic to two 
    // functions `resetSelectedTiles` and `setCorrectMatch` to remove duplication. We can nest these instead the parent function
    // `checkMatch` as they do not need to be available in global scope, they are only used in this function
    function resetSelectedTiles(count) {
        document.getElementById(tileIds[count]).style.backgroundColor = "red";
        document.getElementById(tileIds[count]).addEventListener("click", displayTile);

        setTimeout(function () {
            document.getElementById(tileIds[count]).classList.remove("displayTile");
            document.getElementById(tileIds[count]).removeAttribute("style");
        }, 1000);
    }

    function setCorrectMatch(count) {
        document.getElementById(tileIds[count]).style.backgroundColor = "green";
        document.getElementById(tileIds[count]).setAttribute("guess", "correct")
        document.getElementById(tileIds[count]).removeEventListener("click", displayTile);

        setTimeout(function () {
            let correctBg = generateRandomColor();
            document.getElementById(tileIds[count]).style.backgroundColor = correctBg;
        }, 1000);
    }

    if (tileIcons[n] !== tileIcons[n + 1]) {
        resetSelectedTiles(n)
        resetSelectedTiles(n + 1)
        // POS - we can remove double `if` condition here by using return at the end of this single `if` statement
        // This return will exit the function so we will not execute any code remaining in the function after
        // the return statement. This makes things a bit easier to read and to follow logic flow
        return
    }

    setCorrectMatch(n)
    setCorrectMatch(n + 1)
    correctAnswer()
}

// POS - It's generally best practice to name your functions as verbs (as you have done in most cases - below with `countMoves` or `calculateScore`). 
// This makes clearer what the purpose of the function is. In this case, it could be something like `incrementCorrectAnswers` 
function correctAnswer() {
    correctMatches++;
    console.log(correctMatches);
    if (correctMatches === 8) {
        endGame();
    }
}

//countClicks -> calculates number of user clicks -> needed to calculate score
function countMoves() {
    clicks++;
    document.getElementById("clicks").firstChild.innerHTML = clicks;
}

//calculateScore -> adds number of clicks and elapsed time to calculate score & displays score upon game completion. 
function calculateScore() {
    let timeAtEnd = endTimer();
    timeScore = parseInt(timeAtEnd);
    let calculatedScore = (timeScore + (clicks + 1));
    let resultType = isNaN(calculatedScore);
    
    if(resultType){
        document.querySelector("#score").firstChild.innerHTML = "Game Over";
        document.querySelector("#score").firstChild.style.color = "red";
        // POS - as above, we can remove double `if` condition by simply using a return statement
        return
    }

    document.querySelector("#score").firstChild.innerHTML = calculatedScore;
    document.querySelector("#score").firstChild.style.color = "green";
}




// POS - there is a lot of `document.getElementById...` in this file and others, so if you wanted, you could abstract that
// out to a helper function such as below. This is more a matter of style, but in some cases you may want to do it, if you
// think it might be more readable
//
// function setText(element, text) {
//     document.getElementById(element).firstChild.innerHTML = text
// }