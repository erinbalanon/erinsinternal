//Possible learning types
// 9 = Reading/writing
// 10 - 18 = Aural
// 19 - 27 = Visual 
// 28 - 36 = Kinesthetic 

//declares variables 
let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;

//defines constant reference to value - value will be refrenced throughout the entire quiz 
const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const option4 = document.querySelector('.option4');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question 
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
	const option4Total = questions[index].answer4Total;
    //Populate html elements 
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
	option4.setAttribute('data-total', `${option4Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
	option4.innerHTML = `${question.answer4}`
}

//Function to load next question when user clicks on the "next" button 
function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked - if the user selected an option 
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    //If user does not select an option and clicks "next" message will appear on screen telling them to slect an option before they can move on 
    }


    //Get value of selected radio - get the total of the option selected by the user 
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    ////Add the answer score to the score array - add the total from the user's selected option to the score 
    score.push(answerScore);

    selectedAnswersData.push()
    

    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    //Incement the current question number ( to be used as the index for each array) 
    currentQuestion++;

        //Once finished clear checked
        selectedOption.checked = false;
    //If quiz is on the final question - when user is on the final question, they will have a "show results" button instead of "previous" or "next"
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //If the quiz is finished then we hide the questions container and show the results - once the quiz is completed, the questions will be hidden and the user will see their result and a summary
    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
        result.innerHTML =
         `<h1 class="final-score">Your score: ${totalScore}</h1>
         <div class="summary">
            <h1>Summary</h1>
            <p>See results below for your possible learning style:</p>
            <p>9 = Reading/Writing</p>
            <p>10 - 18 = Aural</p>
            <p>19 - 27 = Visual</p>
            <p>28 - 36 = Kinesthetic </p>
        </div>
        <button class="restart">Restart Quiz</button>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}

//Function to load previous question  
function loadPreviousQuestion() {
    //Decrement quentions index 
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}
//If user clicks "previous" button, they will be lead back to the previous question - any selected options from the question they answered will be reset/the total will be reducted and current score will be reduced 

//Fuction to reset and restart the quiz - when "restart quiz" button is selected, user will be taken back to the first question and all data of their result/scores will be reset back to 0
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score - score and total goes back to being 0
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start - restarts entire quiz and user will be taken back to the first question
    location.reload();
    }

}

///"addEventListener" attaches an event handler to the elements i've specified below 
generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);
