$(document).ready(function () {
    $('.quiz-container').hide();
    $('#previous').hide();
    $('#next').hide();
    $('#submit').hide();
    $('#timeLeft').hide();
});

$("#startbtn").click(function () {
    $('#welcomeScreen').hide();
    $('.quiz-container').show();
    $('#timeLeft').show();
    $('#previous').show();
    $('#next').show();
    $('#submit').show();

    const triviaQuestions = [
        {
            question: "What is the name of Joyce Byers' ex-husband?",
            answers: {
                a: "Lonnie",
                b: "Donny",
                c: "Johnny",
                D: "Tommy"
            },
            correctAnswer: "a"
        }, {
            question: "Which table top role playing game were the children playing 1:1?",
            answers: {
                a: "World of Warcraft",
                b: "Risk",
                c: "Candy Land",
                d: "Dungeons and Dragons",
            },
            correctAnswer: "d"
        }, {
            question: "What is the name of the fictional town where the show is set?",
            answers: {
                a: "Kittitas",
                b: "Hoh",
                c: "Hawkins",
                d: "Smallville",
            },
            correctAnswer: "c"
        }, {
            question: "Which Clash song is played multiple times during the show?",
            answers: {
                a: "Hit me baby one more time",
                b: "Should I Stay or Should I Go?",
                c: "cuts like a knife",
                d: "zombie",
            },
            correctAnswer: "b"
        }, {
            question: "Which character shouts 'Mike! I found the chocolate pudding!'?",
            answers: {
                a: "Will",
                b: "PaPa",
                c: "Dustin",
                d: "11",
            },
            correctAnswer: "c"
        }, {
            question: "What is the first thing 11 says in the show?",
            answers: {
                a: "Pretty",
                b: "Help",
                c: "No.",
                d: "PaPa",
            },
            correctAnswer: "c"
        }, {
            question: "Who said 'Mornings are for coffee and contemplation.'?",
            answers: {
                a: "Molly",
                b: "Fred",
                c: "Will's mom",
                d: "Police Chief Hopper",
            },
            correctAnswer: "d"
        }, {
            question: "which TV show is playing while Mike's dad attempts to fix the TV aerial?",
            answers: {
                a: "Danger",
                b: "Knight Rider",
                c: "That 70's show",
                d: "Stranger Things",
            },
            correctAnswer: "b"
        }, {
            question: "A poster for which 1982 horror movie hangs in the Wheeler's basement?",
            answers: {
                a: "The purge",
                b: "The Thing",
                c: "Halloween",
                d: "it",
            },
            correctAnswer: "d"
        }, {
            question: "Where is Will traped dusring most of the first season?",
            answers: {
                a: "The land down under",
                b: "The Underworld",
                c: "The Upside-Down",
                d: "In the walls of his home"
            },
            correctAnswer: "c"
        }
        
    ]; 

    //////////////////Quiz/////////////////////////////

    function buildQuiz() {
        const output = [];

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

        quizContainer.innerHTML = output.join("");
    }

    /////////////////////////Timer///////////////////////////////////
    var count = 60;
    var intervalId;

    $("#timeLeft").on("click", runTimer);

    function runTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        count--;
        $("#timeLeft").html("<h1>Time Remaining:</h1> <br> <h2>" + count + "</h2>");

        if (count === 0) {
            stop();
            alert("The Mind Flayer! He's Here!");
            $('#timeLeft').hide();
            showResults();
        }
    }
    function stop() {
        clearInterval(intervalId);
    }

    /////////////////////Results//////////////////////////////////
    function showResults() {
        const answerContainers = quizContainer.querySelectorAll(".answers");

        let numCorrect = 0;

        let quesSkipped = 0;

        triviaQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;
            
            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainers[questionNumber].style.color = '#009DA7';
            }
            else {
                answerContainers[questionNumber].style.color = '#de3607';
            }  
        });
        
        var quesLength = triviaQuestions.length;
        var quesLengthA = parseInt(quesLength);
        var correctLength = parseInt(numCorrect);
        var amountMissed = quesLength - correctLength;

        $("#pageBreak").html("<hr size='5' color='white'>")
        $("#numberRight").html("<h1 id='ninja'>YOU'RE STEALTHY, LIKE A NINJA.</h1> <br> <h1 class='score'>You got " + correctLength + " questions correct!</h1><br><br>");
        $("#numberWrong").html("<h1 id='blows'>SOMETIMES, YOUR TOTAL OBLIVIOUSNESS JUST BLOWS MY MIND.</h1> <br> <h1 class='score'>You missed " + amountMissed + " questions.</h1><br><br>");
        $('#timeLeft').hide();
    } 

    //////////////////Slides////////////////////////
    function showSlide(n) {
        slides[currentSlide].classList.remove("active-slide");
        slides[n].classList.add("active-slide");
        currentSlide = n;

        if (currentSlide === 0) {
            previousButton.style.display = "none";
        } else {
            previousButton.style.display = "inline-block";
        }

        if (currentSlide === slides.length - 1) {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        } else {
            nextButton.style.display = "inline-block";
            submitButton.style.display = "none";
        }
    }
    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");

    //music
    var audio = document.getElementById("myAudio");

    function setHalfVolume() {
        audio.play();
        audio.volume = 0.2;
    }

    function musicEnds(p_audio) {
        audio.muted = true;
    };

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
            $('#timeLeft').hide();
            musicEnds();

        } 
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);

});
//end Game
