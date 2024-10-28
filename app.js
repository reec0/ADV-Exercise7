const quizContainer = document.getElementById('quiz-container');
const submitBtn = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result');
const retakeBtn = document.getElementById('retake-btn');
const timerElement = document.getElementById('time');

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: ["Charles Dickens", "Mark Twain", "William Shakespeare", "J.K. Rowling"],
        correct: 2
    },
    {
        question: "What is the largest mammal in the world?",
        answers: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
        correct: 1
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
const timeLimit = 15; 
let selectedAnswerIndex = null;

function loadQuestion() {
    quizContainer.innerHTML = '';
    const q = quizQuestions[currentQuestionIndex];

    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `<h2>${currentQuestionIndex + 1}. ${q.question}</h2>`;
    
    q.answers.forEach((answer, i) => {
        questionElement.innerHTML += `
            <div class="answer" onclick="selectAnswer(${i})">
                ${answer}
            </div>`;
    });

    quizContainer.appendChild(questionElement);
    startTimer();
}

function selectAnswer(index) {
    const previousAnswer = document.querySelector('.answer.selected');
    if (previousAnswer) {
        previousAnswer.classList.remove('selected');
    }
    
    selectedAnswerIndex = index;
    const currentAnswer = document.querySelectorAll('.answer')[index];
    currentAnswer.classList.add('selected');
}

function startTimer() {
    let timeLeft = timeLimit;
    timerElement.innerText = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time is up! Please submit your answer.');
            submitAnswer();
        }
    }, 1000);
}

function submitAnswer() {
    if (selectedAnswerIndex !== null) {
        if (selectedAnswerIndex === quizQuestions[currentQuestionIndex].correct) {
            score++;
        }
    }
    
    currentQuestionIndex++;
    selectedAnswerIndex = null;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

submitBtn.addEventListener('click', () => {
    submitAnswer();
});

retakeBtn.addEventListener('click', () => {
    score = 0;
    currentQuestionIndex = 0;
    resultContainer.innerHTML = '';
    submitBtn.style.display = 'block';
    retakeBtn.style.display = 'none';
    loadQuestion();
});

function showResult() {
    quizContainer.innerHTML = '';
    clearInterval(timer);
    resultContainer.innerHTML = `Your score: ${score} out of ${quizQuestions.length}`;
    submitBtn.style.display = 'none';
    retakeBtn.style.display = 'block';
}

loadQuestion();
submitBtn.style.display = 'block';
