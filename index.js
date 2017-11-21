var isPlaying = false;
const startTitle = "Start Game";
const resetTitle = "Reset Game";
var timeCounter = 0;

var startResetBtn = document.getElementById('startreset');
var timeDiv = document.getElementById('timeremaining');
var time = document.getElementById('time');
var score = document.getElementById('scorevalue');
var timeInterval;
startResetBtn.onclick = function hello(){
    if (isPlaying) {
         // reload the game
         window.location.reload();
    } else {
        // -- methods setup the game ---
        isPlaying = !isPlaying;                 // flip the isPlaying bool
        startResetBtn.innerHTML = resetTitle;
        setScore();
        startTimer();
        // -- checks the state of the game for 60 seconds
        gameState();
    }
}


function startTimer() {
    timeDiv.style.display = 'block';
    var t = 5;
    timeInterval = setInterval(function() {
        t--;
        time.innerHTML = t;
    }, 1000);
}

function setScore() {
    score.innerHTML = 0;
}

function gameState() {
    alert(timeInterval);
}
// if clicked on start or reset
    // if playing
        // reload page - aka reset the game
    // if not playing - start the game
        // set score to 0
        // show countdown box
        // reduce time by 1 every second
            // if time left 
                // continue
            // if no time left
                // game over
                // change button text to reset
                // generate new questions

// if clicked on answer box
    // if playing
        // validate answer
            // yes
                // increment score + 1
                // show correct box for 1 sec
                // generate new question
            // no
                // decrement score - 1 (or do nothing)
                // show try again box for 1 sec