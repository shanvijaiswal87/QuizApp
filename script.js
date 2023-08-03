const questions = [
  {
  
  question: "Which of the following is a server-side Java Script object?",
  
  options: [
    {text:"Function" , answer:"false"},
    {text:"File", answer:"true"},
    {text:"File Upload" , answer:"false"},
    {text:"Date", answer:"false"}
  ]
},
  {
  
  question: "JavaScript ignores extra spaces",
   options: [
    {text:"True" , answer:"false"},
    {text:"False", answer:"true"},
    {text:"Sometimes" , answer:"false"},
    {text:"ejhdc", answer:"false"}
  ]
},
  {
 
  question: "What is the alternate name for Java script?",
 
  options: [
    {text:"ECMAScript",answer: "true"},
    {text:"ECMScript",answer: "false"},
    {text:" Both a and d", answer: "false"},
    {text:"LimeScript"   , answer: "false"}
  ]
},
  {
  
  question: "Which of the following is a client-side Java Script object?",
 
  options: [
    {text:"File",answer: "false"},
    {text:"Function",answer: "false"},
    {text:"Time",answer: "false"},
    {text:"FileUpload",answer: "true"}
  ]
},
  {
 
  question: " Java Script entities start with ____________ and end with ______________",
 
  options: [
    {text:"Semicolon, colon", answer: "false"},
    {text:"Semicolon, Ampersand", answer: "false"},
    {text:"Ampersand, semicolon", answer: "true"},
    {text:"Ampersand, colon" ,answer: "false"},
  ]
},

  {
 
  question: "What does API stand for?",
 
  options: [
    {text:"Applicate Preprogramming Interface",answer: "false"},
    {text:"Application Preprocessor Interface",answer: "false"},
    {text:"Application Programming Interface",answer: "true"},
    {text:"Application Programming Id",answer: "false"}
  ]
},



{
 
  question: "What does SEO stand for?",
    options: [
   { text:"Stylish Engine Object",answer: "false"},
   { text:"Searh Engine Optimization",answer: "true"},
   { text:"Statement Engine Optimization",answer: "false"},
   { text:"Searh Environment Object",answer: "false"}
  ]
},
];

const questionBox= document.getElementById('question');
const optionBox= document.getElementById('option-btn');
const nextBox= document.getElementById('next');

let currentIdx=0;
let scoreCount=0;


function randomizeQuiz(questions) {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
}

function takeQuiz() {
  currentIdx=0;
  scoreCount=0;
  nextBox.innerHTML="Next";

  randomizeQuiz(questions);
  renderQuest();
}

function renderQuest(){
resetState();
    let currQuest=questions[currentIdx];
  let questNumber=currentIdx + 1;
  questionBox.innerHTML = questNumber + ". " + currQuest.question;

  currQuest.options.forEach(option => {
      const button = document.createElement("button");
      button.innerHTML = option.text;
      button.classList.add("btn");
      optionBox.appendChild(button); 
      if(option.answer){
        button.dataset.answer=option.answer;
      }
      button.addEventListener("click",optAns);     
  });
}

function resetState(){
nextBox.style.display="none";
while(optionBox.firstChild){
  optionBox.removeChild(optionBox.firstChild);
}
}


let userAnswers = [];

function optAns(e) {
  const selectedBox = e.target;
  const isTrue = selectedBox.dataset.answer === "true";
  if (isTrue) {
    selectedBox.classList.add("right");
    scoreCount++;
  } else {
    selectedBox.classList.add("wrong");
  }

  Array.from(optionBox.children).forEach((button) => {
    button.disabled = true;
  });

  userAnswers.push(isTrue);
  nextBox.style.display = "block";
}

function renderScore() {
  resetState();
  questionBox.innerHTML = `Your score is ${scoreCount} out of ${questions.length}!`;
  nextBox.innerHTML = "Review";
  nextBox.style.display = "block";
}

function reviewQuiz() {
  resetState();
  questionBox.innerHTML = "Review Your Answers:";

  questions.forEach((question, index) => {
    const questionElem = document.createElement("p");
    questionElem.innerHTML = `${index + 1}. ${question.question}`;
    questionBox.appendChild(questionElem);

    question.options.forEach((option, optionIndex) => {
      const optionElem = document.createElement("p");
      optionElem.innerHTML = `${String.fromCharCode(97 + optionIndex)}. ${option.text}`;
      optionElem.classList.add("review-option");

      if (option.answer === "true") {
        optionElem.classList.add("right");
      } else if (userAnswers[index] === option.answer) {
        optionElem.classList.add("wrong");
      }

      questionBox.appendChild(optionElem);
    });
  });

  nextBox.innerHTML = "Restart";
  nextBox.style.display = "block";

 
  nextBox.addEventListener("click", () => {
        userAnswers = [];
    takeQuiz();
  });
    
    
}

function handleNext() {
  currentIdx++;
  if (currentIdx < questions.length) {
    renderQuest();
  } else {
    renderScore();
  }
}

nextBox.addEventListener("click", () => {
  if (currentIdx < questions.length) {
    handleNext();
  } else {
    reviewQuiz();
  }
});

takeQuiz();
