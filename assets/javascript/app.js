$(document).ready(function () {
    $(".quiz-container").hide();
    $("#previous").hide();
    $("#next").hide();
    $("#submit").hide();
    $("#timeleft").hide();
});
///////CLICK START, THEN SHOW//////
$("#startbtn").click(function () {
    $("#welcomeScreen").hide();
    $(".quiz-container").show();
    $("#timeLeft").show();
    $("#previous").show();
    $("#next").show();
    $("#submit").show();
});

const triviaQuestions = [
    {
        question: "What is the name of Joyce Byers' ex-husband, father of Will and Jonathan Byers?",
        answers: {
            a: "Lonnie",
            b: "Donny",
            c: "Johnny",
            D: "Tommy"
        },
        correctAnswer: "a"
    }, {
        question: "Which table top role playing game were the children playing when Mike's mum Karen said they all needed to go home, leading to Will's disappearance?",
        answers: {
            a: "World of Warcraft",
            b: "Risk",
            c: "Candy Land",
            d: "Dungeons and Dragons",
        },
        correctAnswer: "d"
    }, {
        question: "What is the name of the fictional town where the show is set?",
        answer: {
            a: "Kittitas",
            b: "Hoh",
            c: "Hawkins",
            d: "Smallville",
        },
        correctAnswer: "c"
    }, {
        question: "Which Clash song is played multiple times during the show, as it is said to be one of Will's favourites?",
        answer: {
            a: "Hit me baby one more time",
            b: "Should I Stay or Should I Go?",
            c: "cuts like a knife",
            d: "zombie",
        },
        correctAnswer: "b"
    }, {
        question: "Which character memorably shouts 'Mike! I found the chocolate pudding!'?",
        answer: {
            a: "Will",
            b: "PaPa",
            c: "Dustin",
            d: "11",
        },
        correctAnswer: "c"
    }, {
        question: "In episode three of season one, Eleven is switching TV channels and a commercial for which product triggers a flashback to Hawkins Laboratory where she is forced to use her telekenesis abilities?",
        answer: {
            a: "Hubba-Bubba",
            b: "Coca-Cola",
            c: "Chia-Pets",
            d: "Whirl-Pool",
        },
        correctAnswer: "b"
    }, {
        question: "Which character memorably said 'Mornings are for coffee and contemplation.'?",
        answer: {
            a: "Molly",
            b: "Fred",
            c: "Will's mom",
            d: "Police Chief Hopper",
        },
        correctAnswer: "d"
    }, {
        question: "During episode one of season one, which TV show is playing whilst Mike's father attempts to fix the TV aerial?",
        answer: {
            a: "Danger",
            b: "Knight Rider",
            c: "That 70's show",
            d: "Stranger Things",
        },
        correctAnswer: "b"
    }, {
        question: "A poster for which 1982 horror movie hangs in the Wheeler's basement?",
        answer: {
            a: "The purge",
            b: "The Thing",
            c: "Halloween",
            d: "it",
        },
        correctAnswer: "b"
    }, {
        question: "What was the first word 11 spoke?",
        answer: {
            a: "Pretty",
            b: "Help",
            c: "No.",
            d: "PaPa",
        },
        correctAnswer: "c"
    },

];

//////QUIZ//////
function buildQuiz() {
    const output = [];
    //////FOR QUESTIONS//////
    triviaQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        for (letter in currentQuestion.answers) {
            answers.push(
                `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${currentQuestion.answers[letter]}
                </label>`
        );
    }

    output.push(
        `<div class="slide">
        <div class="question"> ${currentQuestion.question}</div>
        <div class="answers"> ${answers.join("")} </div>
        </div>`

    
    );


    });
    //////Make the outcome list a string//////
    quizContainer.innerHTML = output.join("");
}

////////////////TIMER/////////////////////////

//TIME VAR
var count = 60;
var intervalId;

$("#timeLeft").on("click", runTimer);

function runTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}
function decrement() {
    count--;
    $("#timerLeft").html("<h1>Time Remaining:</h1><br><h2>" + count + "</h2>");

    //////WHEN TIMER TIMES OUT//////
    if (count === 0) {
        stop();
        alert("Times Up!");
        $("#timeLeft").hide();
        showResults();
    }

}
function stop() {
    clearInterval(intervalId);
}
//////////END OF TIMER//////////////

/////////////////////SHOW RESULTS////////////////////////
function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");
    let numCorrect = 0;
    let quesSkipped = 0;

    triviaQuestions.forEach((currentQuestion, questionNumber) => {
        //find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        
        //if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            //add to the number of correct answers
            numCorrect++;

            //color the answers green
            answerContainers[questionNumber].style.color = '#009DA7';
        }
        else {
            answerContainers[questionNumber].style.color = '#de3607';
        }  
    });
    var quesLength = triviaQuestions.length;
    var quesLength = parseInt(quesLength);
    var correctLength = parseInt(numCorrect);
    var amountMissed = quesLength - correctLength;

    $("#pageBreak").html("<hr size='5' color='white'>")
    $("#numberRight").html("<h1 id='mylanta'>I'm stealthy, like a ninja.</h1> <br> <h1 class='score'>You got " + correctLength + " questions correct!</h1><br><br>");
    $("#numberWrong").html("<h1 id='chalupas'>!</h1> <br> <h1 class='score'>Science is neat, but not very forgiving. " + amountMissed + " questions wrong.</h1><br><br>");
    $('#timeLeft').hide();
} ///</show results>

//////////////QUESTION SLIDES///////////////////////////


const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

/////////////MUSIC///////////////


///////////////////DISPLAY TIMER- QUIZ////////////////////
runTimer();
buildQuiz();
setHalfVolume();

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(0);

submitButton.addEventListener("click", endTrivia);
    function endTrivia () {
        showResults();
        stop();
        $("#timeLeft").hide();
        musicEnds();

    }
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);


