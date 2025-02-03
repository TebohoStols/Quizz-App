const questions = [
    {
        question: "What is JavaScript used for?",
        answers: [
            {text: "Styling web pages.", correct: false},
            {text: "Making web pages interactive.", correct: true},
            {text: "Managing databases.", correct: false},
            {text: "Creating operating systems.", correct: false},
        ]
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        answers: [
            { text: "var", correct: true },
            { text: "def", correct: false },
            { text: "const", correct: false },
            { text: "new", correct: false },
        ]
    },
    {
        question: "What does 'DOM' stand for in JavaScript?",
        answers: [
            { text: "Document Object Model", correct: true },
            { text: "Data Oriented Model", correct: false },
            { text: "Digital Object Method", correct: false },
            { text: "Dynamic Output Management", correct: false },
        ]
    },
    {
        question: "Which type of language is JavaScript?",
        answers: [
            { text: "Compiled", correct: false },
            { text: "Interpreted", correct: true },
            { text: "Assembly", correct: false },
            { text: "Machine", correct: false },
        ]
    },
    {
        question: "Which operator is used for strict equality in JavaScript?",
        answers: [
            { text: "==", correct: false },
            { text: "===", correct: true },
            { text: "!=", correct: false },
            { text: "=", correct: false },
        ]
    },
    {
        question: "Which function is used to print something in JavaScript?",
        answers: [
            { text: "console.log()", correct: true },
            { text: "print()", correct: false },
            { text: "write()", correct: false },
            { text: "display()", correct: false },
        ]
    },
    {
        question: "Which of these is a JavaScript framework?",
        answers: [
            { text: "Django", correct: false },
            { text: "React", correct: true },
            { text: "Laravel", correct: false },
            { text: "Flask", correct: false },
        ]
    },
    {
        question: "What keyword is used to define a function in JavaScript?",
        answers: [
            { text: "define", correct: false },
            { text: "func", correct: false },
            { text: "function", correct: true },
            { text: "def", correct: false },
        ]
    },
    {
        question: "Which data type is NOT available in JavaScript?",
        answers: [
            { text: "Boolean", correct: false },
            { text: "Integer", correct: true },
            { text: "String", correct: false },
            { text: "Object", correct: false },
        ]
    },
    {
        question: "Which symbol is used to indicate an array in JavaScript?",
        answers: [
            { text: "{}", correct: false },
            { text: "[]", correct: true },
            { text: "()", correct: false },
            { text: "<>", correct: false },
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

/*Initialisize components of the quiz */
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    /*get that question */
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
/*3 go to 1*/

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} points out of ${questions.length}!`
    nextButton.innerHTML = "Play Again 🔄";
    nextButton.style.display="block";
}
/*2 */
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

/*1 */
nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();