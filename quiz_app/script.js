const questions=[
    {
        question:"What is the capital city of Australia?",
        answers:[
            { text: "A) Sydney", correct: false},
            { text: "B) Melbourne", correct: false},
            { text: "C) Canberra", correct: true},
            { text:"D) Brisbane", correct: false},
        ]
    }
,
{
    question:"Who wrote the famous play Romeo and Juliet?",
    answers:[
        { text: "A) William Shakespeare", correct: true},
        { text: "B) Charles Dickens", correct: false},
        { text: "C) J.K. Rowling", correct: false},
        { text:"D) Jane Austen", correct: false},
    ]
}
,
{
    question:"Which planet is known as the Red Planet?",
    answers:[
        { text: "A) Venus", correct: false},
        { text: "B) Mars", correct: true},
        { text: "C) Jupiter", correct: false},
        { text:"D) Saturn", correct: false},
    ]
}
,


];

const questionElement=document.getElementById("question");
const answerButtons =document.getElementById("answer-buttons");
const nextButton= document.getElementById("next");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="next";
    showQuestions();
}

 function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
 }

 function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
 }
function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=> {
        if(button.dataset.correct=== "true"){
            button.classList.add("correct");
        }
        button.disabled= true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}



function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();
    }else{
        showScore();
    }
}










nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn()
    }
    else{
        startQuiz();
    }
})




 startQuiz();

