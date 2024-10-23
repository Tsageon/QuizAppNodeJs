const readline = require("readline");

const questions = [
  {
    question: "What is the largest planet in our solar system?",
    options: ["1. Earth", "2. Mars", "3. Jupiter", "4. Saturn"],
    answer: 3,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "1. Charles Dickens",
      "2. William Shakespeare",
      "3. Mark Twain",
      "4. Leo Tolstoy",
    ],
    answer: 2,
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["1. Oxygen", "2. Gold", "3. Osmium", "4. Helium"],
    answer: 1,
  },
  {
    question: "What is the longest river in the world?",
    options: ["1. Amazon", "2. Nile", "3. Yangtze", "4. Mississippi"],
    answer: 2,
  },
  {
    question: "What is Jacob Zuma known for?",
    options: [
      "1. Being President",
      "2. Being part of a terrorist group",
      "3. That billboard people say is a normal head",
      "4. Brisbane",
    ],
    answer: 3,
  },
  {
    question: "What is the capital of France?",
    options: ["1. Berlin", "2. Madrid", "3. Paris", "4. Rome"],
    answer: 3,
  },
  {
    question: "What is the capital of South Africa?",
    options: ["1. Mabena", "2. Cape Town", "3. Bloemfontein", "4. Pretoria"],
    answer: 3,
  },
  {
    question: "What is 2 + 2 + 2/2?",
    options: ["1. 3", "2. 3", "3. 5", "4. 6"],
    answer: 2,
  },
  {
    question: "What is the capital of Japan?",
    options: ["1. Seoul", "2. Tokyo", "3. Beijing", "4. Bangkok"],
    answer: 2,
  },
];

let score = 0;
let currentQuestionIndex = 0;
const questionTimeLimit = 10;
const totalQuizTimeLimit = 60;
let remainingQuizTime = totalQuizTimeLimit;
let questionTimer, quizTimer;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endQuiz();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  console.log(`\n${currentQuestion.question}`);

  currentQuestion.options.forEach((option) => console.log(option));
  let timeLeft = questionTimeLimit;
  questionTimer = setInterval(() => {
    timeLeft--;
    console.log(`Time left for this question: ${timeLeft}s`);
    if (timeLeft === 0) {
      clearInterval(questionTimer);
      console.log("\nToo Slow! Moving on to the next question...");
      currentQuestionIndex++;
      askQuestion();
    }
  }, 1000);
  rl.question("\nYour answer: ", (answer) => {
    clearInterval(questionTimer);
    if (parseInt(answer) === currentQuestion.answer) {
      console.log("Good, that is correct!");
      score++;
    } else {
      console.log("Nope!");
    }
    currentQuestionIndex++;
    askQuestion();
  });
}

function startQuiz() {
  console.log("Begin! You are under attack, you need to push.\n");
  quizTimer = setInterval(() => {
    remainingQuizTime--;
    console.log(`Time left: ${remainingQuizTime}s`);
    if (remainingQuizTime <= 0) {
      clearInterval(quizTimer);
      console.log("\nTime's up for the quiz!");
      endQuiz();
    }
  }, 1000);
  askQuestion();
}

function endQuiz() {
  clearInterval(quizTimer);
  rl.close();
  console.log(`\nQuiz over! Your score is: ${score}/${questions.length}`);
}
startQuiz();