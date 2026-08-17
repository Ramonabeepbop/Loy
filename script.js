/* =========================
   LOY WATER QUIZ
========================= */


/* =========================
   QUESTIONS
========================= */

const questions = [

  {
    question:
      "Which activity usually uses the most water in a household?",

    answers: [
      "Taking a long shower",
      "Brushing your teeth",
      "Turning on a light",
      "Reading a book"
    ],

    correct: 0,

    fact:
      "Long showers can use a surprising amount of water, especially with high-flow showerheads."
  },


  {
    question:
      "What is one simple way to save water while brushing your teeth?",

    answers: [
      "Leave the tap running",
      "Turn the tap off",
      "Use more toothpaste",
      "Brush for less than 10 seconds"
    ],

    correct: 1,

    fact:
      "Turning the tap off while brushing can prevent unnecessary water from going straight down the drain."
  },


  {
    question:
      "Why is clean freshwater important?",

    answers: [
      "Only for drinking",
      "Only for farming",
      "For people, ecosystems and food production",
      "It is not important"
    ],

    correct: 2,

    fact:
      "Freshwater supports people, agriculture, wildlife and ecosystems."
  },


  {
    question:
      "Which choice can help reduce water waste when washing dishes?",

    answers: [
      "Leave the tap running",
      "Use a filled sink or basin",
      "Wash each plate separately under running water",
      "Use extra water"
    ],

    correct: 1,

    fact:
      "Using a filled sink or basin can reduce the amount of running water needed."
  },


  {
    question:
      "What happens when too much water is taken from rivers and lakes?",

    answers: [
      "Nothing changes",
      "Water becomes unlimited",
      "Ecosystems and communities can be affected",
      "Rainfall always increases"
    ],

    correct: 2,

    fact:
      "Rivers and lakes support ecosystems and communities, so taking too much water can have wider effects."
  },


  {
    question:
      "Which habit is more water conscious?",

    answers: [
      "Fixing a leaking tap",
      "Ignoring leaks",
      "Leaving taps running",
      "Taking unnecessarily long showers"
    ],

    correct: 0,

    fact:
      "A small leak can waste water over time, so fixing leaks is an easy way to reduce waste."
  },


  {
    question:
      "Why should we think about water beyond drinking it?",

    answers: [
      "Water is only used for drinking",
      "Water is connected to food, nature and everyday products",
      "Water has no connection to food",
      "Only farmers use water"
    ],

    correct: 1,

    fact:
      "Water is involved in growing food, producing goods, supporting ecosystems and everyday life."
  },


  {
    question:
      "What is a good reason to protect waterways during festivals?",

    answers: [
      "Waterways are places for rubbish",
      "Pollution can harm aquatic life and ecosystems",
      "It makes festivals less colourful",
      "There is no reason"
    ],

    correct: 1,

    fact:
      "Keeping waterways clean protects the plants, animals and communities that depend on them."
  }

];


/* =========================
   GAME STATE
========================= */

let currentQuestion = 0;

let score = 0;

let xp = 0;

let level = 1;


/* =========================
   ELEMENTS
========================= */

const questionNumber =
  document.getElementById(
    "questionNumber"
  );


const question =
  document.getElementById(
    "question"
  );


const answers =
  document.getElementById(
    "answers"
  );


const feedback =
  document.getElementById(
    "feedback"
  );


const nextButton =
  document.getElementById(
    "nextButton"
  );


const xpFill =
  document.getElementById(
    "xpFill"
  );


const xpText =
  document.getElementById(
    "xpText"
  );


const levelText =
  document.getElementById(
    "level"
  );


const speech =
  document.getElementById(
    "speech"
  );


const fact =
  document.getElementById(
    "fact"
  );


const factTitle =
  document.getElementById(
    "factTitle"
  );


const pet =
  document.getElementById(
    "pet"
  );


const resetButton =
  document.getElementById(
    "resetButton"
  );


/* =========================
   LOAD QUESTION
========================= */

function loadQuestion() {

  const current =
    questions[currentQuestion];


  questionNumber.textContent =
    `QUESTION ${currentQuestion + 1}`;


  question.textContent =
    current.question;


  answers.innerHTML =
    "";


  feedback.textContent =
    "";


  feedback.className =
    "feedback";


  nextButton.style.display =
    "none";


  factTitle.textContent =
    "KEEP LEARNING";


  fact.textContent =
    current.fact;


  current.answers.forEach(
    (answer, index) => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "answer";


      button.textContent =
        answer;


      button.addEventListener(
        "click",
        () => {

          checkAnswer(
            index,
            button
          );

        }
      );


      answers.appendChild(
        button
      );

    }
  );

}


/* =========================
   CHECK ANSWER
========================= */

function checkAnswer(
  selected,
  selectedButton
) {

  const current =
    questions[currentQuestion];


  const allButtons =
    document.querySelectorAll(
      ".answer"
    );


  allButtons.forEach(
    button => {

      button.disabled =
        true;

      button.classList.add(
        "disabled"
      );

    }
  );


  if (
    selected ===
    current.correct
  ) {

    selectedButton.classList.add(
      "correct"
    );


    feedback.textContent =
      "Correct. You understand your water footprint a little better.";


    feedback.classList.add(
      "correct-text"
    );


    speech.textContent =
      "Nice work. Keep thinking about water.";


    score++;


    addXP(25);


    bouncePet();

  } else {

    selectedButton.classList.add(
      "wrong"
    );


    allButtons[
      current.correct
    ].classList.add(
      "correct"
    );


    feedback.textContent =
      `Not quite. The better answer is "${current.answers[current.correct]}".`;


    feedback.classList.add(
      "wrong-text"
    );


    speech.textContent =
      "That's okay. Every question is something new to learn.";

  }


  if (
    currentQuestion <
    questions.length - 1
  ) {

    nextButton.style.display =
      "block";

  } else {

    finishQuiz();

  }

}


/* =========================
   NEXT QUESTION
========================= */

nextButton.addEventListener(
  "click",
  () => {

    currentQuestion++;

    loadQuestion();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }
);


/* =========================
   XP
========================= */

function addXP(amount) {

  xp += amount;


  while (
    xp >= 100
  ) {

    xp -= 100;

    level++;

    levelUp();

  }


  updateXP();

}


/* =========================
   UPDATE XP
========================= */

function updateXP() {

  xpFill.style.width =
    `${xp}%`;


  xpText.textContent =
    `${xp} / 100`;


  levelText.textContent =
    level;

}


/* =========================
   LEVEL UP
========================= */

function levelUp() {

  levelText.classList.add(
    "level-up"
  );


  speech.textContent =
    `You reached level ${level}. Keep caring for water.`;


  setTimeout(
    () => {

      levelText.classList.remove(
        "level-up"
      );

    },
    600
  );

}


/* =========================
   PET BOUNCE
========================= */

function bouncePet() {

  pet.style.animation =
    "none";


  pet.offsetHeight;


  pet.style.animation =
    "bounce 0.5s ease";


  setTimeout(
    () => {

      pet.style.animation =
        "float 2.2s ease-in-out infinite";

    },
    500
  );

}


/* =========================
   FINISH QUIZ
========================= */

function finishQuiz() {

  const percentage =
    Math.round(
      (score /
        questions.length) *
        100
    );


  if (
    percentage >= 80
  ) {

    speech.textContent =
      "Great work. You really know your water.";

  } else if (
    percentage >= 50
  ) {

    speech.textContent =
      "Good work. There is still more to discover.";

  } else {

    speech.textContent =
      "Every answer is a chance to learn more about water.";

  }


  questionNumber.textContent =
    "QUIZ COMPLETE";


  question.textContent =
    `You scored ${score} out of ${questions.length}.`;


  answers.innerHTML =
    "";


  feedback.textContent =
    `You finished with ${percentage}% accuracy.`;


  feedback.className =
    "feedback correct-text";


  nextButton.style.display =
    "none";


  factTitle.textContent =
    "YOUR NEXT STEP";


  fact.textContent =
    "Think about one way you can be more mindful of water in your everyday life.";

}


/* =========================
   RESET
========================= */

resetButton.addEventListener(
  "click",
  resetGame
);


function resetGame() {

  currentQuestion = 0;

  score = 0;

  xp = 0;

  level = 1;


  updateXP();


  speech.textContent =
    "Let's learn about water.";


  loadQuestion();


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================
   BOUNCE ANIMATION
========================= */

const bounceStyle =
  document.createElement(
    "style"
  );


bounceStyle.textContent = `

  @keyframes bounce {

    0% {
      transform:
        translateY(0)
        scale(1);
    }

    30% {
      transform:
        translateY(-20px)
        scale(1.05);
    }

    60% {
      transform:
        translateY(5px)
        scale(0.96);
    }

    100% {
      transform:
        translateY(0)
        scale(1);
    }

  }

`;


document.head.appendChild(
  bounceStyle
);


/* =========================
   START
========================= */

updateXP();

loadQuestion();