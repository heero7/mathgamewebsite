// variables that are initialized
var isPlaying = false;
var resetTitle = "Reset Game";
var timeCounter = 0;
var timeRemaining = 60;
var score = 0;

// variables not yet initialized
var timeInterval;
var currentTime;
var questionsForGame;
var answersForGame = [];
var currentAnswer;

// variables linked to document elements
var startResetBtn = document.getElementById('startreset');
var timeDiv = document.getElementById('timeremaining');
var time = document.getElementById('time');
var scoreElement = document.getElementById('scorevalue');
var question = document.getElementById('question');

var choice1 = document.getElementById('box1');
var choice2 = document.getElementById('box2');
var choice3 = document.getElementById('box3');
var choice4 = document.getElementById('box4');


choice1.addEventListener("click", function(){
    if (isPlaying){
        validate(choice1.innerHTML);
    }
});
choice2.addEventListener("click", function(){
    if (isPlaying){
        validate(choice2.innerHTML);
    }
});
choice3.addEventListener("click", function(){
    if (isPlaying){
        validate(choice3.innerHTML);
    }
});
choice4.addEventListener("click", function(){
    if (isPlaying){
        validate(choice4.innerHTML);
    }
});
startResetBtn.addEventListener("click", function beginGame(){
    if (isPlaying) {
         // reload the game
         window.location.reload();
    } else {
        // -- methods setup the game ---
        isPlaying = !isPlaying;                 
        startResetBtn.innerHTML = resetTitle;
        setScore();
        questionsForGame = generateQuestions();
        // choice1.onclick = validate(choice1);
        // choice2.onclick = validate(choice2);
        // choice3.onclick = validate(choice3);
        // choice4.onclick = validate(choice4);
        startTimer();
        displayQuestion();
    }
});


function startTimer() {
    timeDiv.style.display = 'block';
    
    timeInterval = setInterval(function() {
        timeRemaining--;
        time.innerHTML = timeRemaining;
        if (timeRemaining == 0){
            stopCountDown();
            gameOver();
        }
    }, 1000);
}

function setScore() {
    score = 0;
    scoreElement.innerHTML = score;
}

function stopCountDown() {
    clearInterval(timeInterval);
}

function displayQuestion() {
    question.innerHTML = questionsForGame.pop();
    displayChoices();
}

function validate(choice) {
    if (choice == currentAnswer) {
        console.log('Correct!');
        incrementScoreDisplayCorrect();
        displayQuestion();
    } else {
        console.log('Wrong');
    }
}

function incrementScoreDisplayCorrect(){
    score += 1;
    scoreElement.innerHTML = score;
}

function displayChoices() {
    var ansLoc = Math.floor((Math.random() * 4) + 1);
    var b = Math.floor((Math.random() * 100) + 1);
    var c = Math.floor((Math.random() * 100) + 1);
    var d = Math.floor((Math.random() * 100) + 1);
    currentAnswer = answersForGame.pop();
    if (ansLoc == 1) {
        choice1.innerHTML = currentAnswer;
        choice2.innerHTML = b;
        choice3.innerHTML = c;
        choice4.innerHTML = d;
    } else if (ansLoc == 2) {
        choice2.innerHTML = currentAnswer;
        choice1.innerHTML = b;
        choice3.innerHTML = c;
        choice4.innerHTML = d;
    } else if (ansLoc == 3) {
        choice3.innerHTML = currentAnswer;
        choice1.innerHTML = b;
        choice2.innerHTML = c;
        choice4.innerHTML = d;
    } else {
        choice4.innerHTML = currentAnswer;
        choice1.innerHTML = b;
        choice3.innerHTML = c;
        choice2.innerHTML = d;
    }
}

function generateQuestions() {
    var operators = ['+','x','-','/'];
    var questions = [];
    
    for (var i = 0; i < 100; i++) {
        var op = operators[Math.floor((Math.random() * operators.length))];
        var x = Math.floor((Math.random() * 10) + 1);
        var y = Math.floor((Math.random() * 10) + 1);
        generateAnswer(x,y,op);
        var equation = x.toString() + op.toString() + y.toString();
        questions.push(equation);
    }
    return questions;
}

function generateAnswer(num1, num2, operator) {
    var solution;
    var divided = false;
    switch(operator) {
        case '+':
            solution = num1 + num2;
            break;
        case '-':
            solution = num1 - num2;
            break;
        case 'x':
            solution = num1 * num2;
            break;
        case '/':
            solution = num1 / num2;
            divided = true;
            break;
    }
    if (!divided)
        answersForGame.push(Math.round(solution));
    else
        answersForGame.push(Math.round(solution * 100) / 100);
}

function gameOver() {
    var gameOverDiv = document.getElementById('gameover');
        gameOverDiv.style.display = 'block';
        gameOverDiv.innerHTML = 'Game over, Score: ' + 
            scoreElement.innerHTML +'\nPress Reset Game to try again';
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