function setRandomTileOrder(numberOfTiles) {
    let randomOrderArray = [];
    while (randomOrderArray.length < numberOfTiles) {
        let randomNum = Math.random();
        randomNum = randomNum * (numberOfTiles - 1);
        randomNum = Math.round(randomNum) + 1;

        // POS - instead of having two if statements here, where one does nothing, we can just have a single one
        // and use the `!` operator
        if (!randomOrderArray.includes(randomNum)) {
            randomOrderArray.push(randomNum);
        }
    }

    setTiles(randomOrderArray);
}

function setTiles(randomOrderArray) {
    // POS - There was a bit of duplication in this function so most of that is abstracted out to `setIconProps` function
    // Previously, we were looping over tiles then setting innerHTML and innerText of tile from randomOrderArray, it was a bit more complex than it needed to be
    // What we need to do is to loop over the array of random numbers (we already have access to the count of numbers in iteration counter `i`)
    // Then just set the icon props using the number at `i` in randomOrderArray

    let bgColors = buildColorSelection();
    const iconNames = ["rocket", "bacterium", "cocktail", "football-ball", "pizza-slice", "kiwi-bird", "fire-alt", "anchor"]

    function setIconProps(tileCount, iconCount) {
        const name = iconNames[iconCount]

        tiles[tileCount].innerHTML = `<i class="fas fa-${name}"></i>`;
        tiles[tileCount].setAttribute("icon", name)
        tiles[tileCount].addEventListener("click", function(){
            this.style.backgroundColor = bgColors[iconCount];
        });
    }

    // POS - Note that in most cases, as `randomOrderArray` is an array, we would not use a `for` loop but a `forEach` loop here, which is 
    // a type of loop you can use on arrays, but I don't think you have covered this yet - you will in the future
    for (let i = 0; i < randomOrderArray.length; i++) {
        if (i < 8) {
            setIconProps(randomOrderArray[i] - 1, i)
        } else {
            // POS - We only have 8 icons so need to go back to start of array of `iconNames`
            setIconProps(randomOrderArray[i] - 1, i - 8)
        }
    }
}

function displayTile(e) {
    //reveal tile by changing bg color and changing font-size from 0 to 3em;
    this.classList.remove("hideTile");
    this.classList.add("displayTile");

    // logs the value of the tile's icon and Id
    tileIcon = e.target.getAttribute("icon");
    tileIcons.push(tileIcon);
    let tileId = e.target.getAttribute("id");
    //disable each guess from being reclicked
    document.getElementById(tileId).removeEventListener("click", displayTile);
    tileIds.push(tileId);
    
    if (tileIcons.length % 2 == 0) {
        checkMatch(tileIcons, tileIds, n)
        
        n = n + 2; 
        // this counts number of clicks
        countMoves()
    }
};

function resetTiles() {
    for (tile of tiles) {
        tile.removeAttribute("style");
        tile.removeAttribute("guess");
        tile.classList.remove("hideTile");
        tile.classList.remove("displayTile");
    }
    clicks = 0;
    correctMatches = 0;
    document.getElementById("timer").firstChild.innerText ="";
    document.getElementById("clicks").firstChild.innerText ="";
    document.getElementById("score").firstChild.innerText ="";
    setRandomTileOrder(16);
}