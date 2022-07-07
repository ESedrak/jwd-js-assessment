/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options). 

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener("DOMContentLoaded", () => {
  const start = document.querySelector("#start");
  const submitBtn = document.querySelector("#btnSubmit");
  const resetBtn = document.querySelector("#btnReset");

  start.addEventListener("click", function (e) {
    document.querySelector("#quizBlock").style.display = "block";
    start.style.display = "none";

    // Start the Timer When Start Button Clicked
    startTimer();
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: "Which is the third planet from the sun?",
      o: ["Saturn", "Earth", "Pluto", "Mars"],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: "Which is the largest ocean on Earth?",
      o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      a: 3,
    },
    {
      q: "What is the capital of Australia",
      o: ["Sydney", "Canberra", "Melbourne", "Perth"],
      a: 1,
    },
    {
      q: "What is 2 + 2?",
      o: ["0", "4", "6", "8"],
      a: 1,
    },
    {
      q: "Which is the best Pod group?",
      o: [
        "Platypod",
        "Don't know the other pod names",
        "Not this one",
        "Go back to the first answer",
      ],
      a: 0,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector("#quizWrap");
    let quizDisplay = "";
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    // Selectors
    const quizHeader = document.querySelector("#quizHeader");
    const submitMsg = document.querySelector("#submitMsg");

    // Variables
    let score = 0;
    let numberOfQuestions = quizArray.length;

    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector("#" + li);
        radioElement = document.querySelector("#" + r);

        if (radioElement.checked && quizItem.a == i) {
          liElement.style.backgroundColor = "lightgreen";
          score++;
          // console.log("I got checked and is corret!");
        } else if (quizItem.a == i) {
          liElement.style.backgroundColor = "lightcoral";
          // console.log("This is checking what the quiz answer is!");
          // console.log(quizItem.a);
          //change background color of li element here
        }
      }
    });
    {
      score > 3
        ? (submitMsg.innerHTML = "Good Job!")
        : (submitMsg.innerHTML = "You can do better than that!");
    }
    quizHeader.innerHTML = `Your score is ${score}/${numberOfQuestions}`;
    // console.log(`Hello there! Your score number is ${score}`);
  };

  // call the displayQuiz function
  displayQuiz();

  // For The Timer
  let timer;

  const startTimer = () => {
    const displayTime = document.querySelector("#time");
    // 1 minute timer
    let seconds = 60;
    timer = setInterval(function () {
      displayTime.innerHTML = `${seconds} seconds`;
      // console.log(seconds);
      seconds--;
      if (seconds <= 0) {
        calculateScore();
        disableAnswers();
        clearInterval(timer);
        const noTime = document.createElement("p");
        noTime.innerHTML = "Time is up!";
        noTime.style.color = "red";
        submitMsg.appendChild(noTime);
      }
    }, 1000);
  };

  const stopTimer = (timer) => {
    clearInterval(timer);
  };

  function disableAnswers() {
    let radioButtons = document.querySelectorAll('input[type="radio"]');
    for (let radioBtn of radioButtons) {
      radioBtn.setAttribute("disabled", "");
    }
  }

  submitBtn.onclick = () => {
    disableAnswers();
    calculateScore();
    stopTimer(timer);
    submitBtn.style.display = "none";
  };

  resetBtn.onclick = () => {
    window.location.reload();
  };
});
