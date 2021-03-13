function startTimer() {
    clearInterval(timer); //clears timer before timer starts. This fixes issue if timer is triggered again, when already running. 
    count = 1, timer = setInterval(function () {
        // POS - I'm not sure if this might be a bug, I'm not sure why we are incremeneting count twice here, I think below might be more correct
        // count = count++
        // document.getElementById("timer").firstChild.innerText = count
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