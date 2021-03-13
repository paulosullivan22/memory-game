function startTimer() {
    clearInterval(timer); //clears timer before timer starts. This fixes issue if timer is triggered again, when already running. 
    count = 1, timer = setInterval(function () {
        count = count++;
        document.getElementById("timer").firstChild.innerText = count++;

        //If time runs out, game is ended
        if (count === 60) {
            clearInterval(timer);
            document.getElementById("timer").firstChild.innerText = "Time Up";
            endGame();
        }
    }, 1000);
}

function endTimer() {
        let timeScore = document.getElementById("timer").innerText;
        clearInterval(timer);
        return timeScore
    }