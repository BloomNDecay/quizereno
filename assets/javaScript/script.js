//create a start game function//
const  startButton = document.getElementById('start-btn')
const  nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer')

let shuffledQuestion, currentQuestionIndex 

//add the clicking function to start/next buttons
startButton.addEventListener('click', startGame)
nextButton.addEventListener("click", () => {
  currentQuestionIndex++
  nextQuestion() 
})


function startGame() {
  startButton.classList.add('hide')
  shuffledQuestion = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  nextQuestion()
}

//function to go to next question//

function nextQuestion() {
  resetState()
  showQuestion(shuffledQuestion[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question 
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
     button.dataset.correct = answer.correct
    } 
     button.addEventListener('click', selectAnswer)    
     answerButtonsElement.appendChild(button)
    })
  }

  function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild
      (answerButtonsElement.firstChild)
    }
  }

//create functions to choose answer//
function selectAnswer(e) {
  const selectedBUtton = e.target
  const correct = selectedBUtton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct) 
  })
  if (shuffledQuestion.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else{
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct') 
      } else {
        element.classList.add('wrong')
      }   
     }

     function clearStatusClass(element) {
      element.classList.remove('correct')
      element.classList.remove('wrong')
    }

const questions = [
  {
    question: 'Which of the following is not a fruit?',
    answers: [
      { text: 'Rhubarb', correct: true },
      { text: 'Tomato', correct: false },
      { text: 'Avocados', correct: false },
      { text: 'Banana', correct: false }
    ]
  },
  {
    question: 'What Apollo mission put a man on the moon the first time?',
    answers: [
      { text: 'Apollo 9', correct: false },
      { text: 'Apollo 13', correct: false },
      { text: 'Apollo 11', correct: true },
      { text: 'Apollo 1', correct: false }
    ]
  },
  {
    question: 'Which horoscope sign is a fish?',
    answers: [
      { text: 'Aquarius', correct: false },
      { text: 'Cancer', correct: false },
      { text: 'Pisces', correct: true },
      { text: 'Gemini', correct: false }
    ]
  },
  {
    question: 'How many infinity stones are there?',
    answers: [
      { text: '3', correct: false },
      { text: '5', correct: false },
      { text: '6', correct: true },
      { text: '7', correct: false }
    ]
  },
  {
    question: 'Whats the name of Hagrids pet spider?',
    answers: [
      { text: 'Aragog', correct: true },
      { text: 'Nigini', correct: false },
      { text: 'Crook Sharks', correct: false },
      { text: 'Mosag', correct: false }
    ]
  },
  {
    question: 'What element does the chemical symbol Ag represent?',
    answers: [
      { text: 'Salt', correct: false },
      { text: 'Silver', correct: true },
      { text: 'Gold', correct: false },
      { text: 'Magnesium', correct: false }
    ]
  },
  {
    question: 'Whats the highest grossing video game franchise to date?',
    answers: [
      { text: 'Pokemon', correct: true },
      { text: 'Call of Duty', correct: false },
      { text: 'Halo', correct: false },
      { text: 'Super Mario Brothers', correct: false }
    ]
  },
  {
    question: 'What is the main ingredient in hummus?',
    answers: [
      { text: 'Split Pea', correct: false },
      { text: 'Lentil', correct: false },
      { text: 'Pinto Bean', correct: false },
      { text: 'Chickpea', correct: true }
    ]
  },
  {
    question: 'Mycology is the scientific study of what?',
    answers: [
      { text: 'Flowers', correct: false },
      { text: 'Fungi', correct: true },
      { text: 'Minerals', correct: false },
      { text: 'Myths', correct: false }
    ]
  },
  {
    question: 'Which sea creature has three hearts?',
    answers: [
      { text: 'Shark', correct: false },
      { text: 'Jellyfish', correct: false },
      { text: 'Stingray', correct: false },
      { text: 'Octopus', correct: true }
    ]
  },
]


let timer;
let timeLeft = 45; // 45 seconds
const timerElement = document.getElementById('timer');

startButton.addEventListener('click', startTimer);

function startTimer() {
  startGame();
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerElement.innerText = `Time remaining: ${timeLeft} seconds`;
    } else {
      clearInterval(timer);
      endGame(); // End the game when the timer runs out
    }
  }, 1000);
}

function endGame() {
  // Disable answer buttons
  const answerButtons = document.querySelectorAll('.btn');
  answerButtons.forEach(button => {
    button.disabled = true;
  });

  // Display a message that the game has ended
  questionElement.innerText = 'Game Over';
  nextButton.classList.add('hide');

  // Create a "Play Again" button
  const playAgainButton = document.createElement('button');
  playAgainButton.innerText = 'Play Again';
  playAgainButton.classList.add('btn', 'start-btn');
  playAgainButton.addEventListener('click', () => {
    restartGame();
  });

  // Append the "Play Again" button to the controls
  const controls = document.querySelector('.controls');
  controls.appendChild(playAgainButton);
}

function restartGame() {
  // Enable answer buttons
  const answerButtons = document.querySelectorAll('.btn');
  answerButtons.forEach(button => {
    button.disabled = false;
  });

  // Remove the "Play Again" button
  const playAgainButton = document.querySelector('.start-btn');
  if (playAgainButton) {
    playAgainButton.remove();
  }

  // Reset the timer and start a new game
  timeLeft = 45;
  timerElement.innerText = `Time remaining: ${timeLeft} seconds`;
  clearInterval(timer);
  startTimer();
  currentQuestionIndex = 0; // Reset the question index
  nextQuestion();
}