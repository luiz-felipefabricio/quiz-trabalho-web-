const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Seu poder de luta é de mais de oito mil!"
      break
    case (performance >= 70):
      message = "Você é um verdadeiro Super Saiyajin!"
      break
    case (performance >= 50):
      message = "Você é um aluno da Escola Tartaruga!"
      break
    default:
      message = "Até o Yamcha venceria de você!"
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Quem é o avô de Son Goku?",
    answers: [
      { text: "Bardock", correct: false },
      { text: "Mestre Kame", correct: false },
      { text: "Vovô Gohan", correct: true },
      { text: "Rei Vegeta", correct: false }
    ]
  },
  {
    question: "Como Son Goku derrota majin boo?",
    answers: [
      { text: "Usando a Genkidama", correct: true },
      { text: "Com um Kamehameha", correct: false },
      { text: "Ele tem uma conversa civilizada com boo", correct: false },
      { text: "Eles nunca lutaram", correct: false }
    ]
  },
  {
    question: 'Como se chama a fusão potara de Son Goku e Vegeta?',
    answers: [
      { text: 'Vegito', correct: true },
      { text: 'Gokoroto', correct: false },
      { text: 'Kefla', correct: false },
      { text: "Gogeta", correct: false }
    ]
  },
  {
    question: 'Como a raça saiyajin foi extinta?',
    answers: [
      { text: "O planeta vegeta foi destruído por uma bola de energia feita por Freeza", correct: true },
      { text: "Um grande meteoro atingiu o planeta Vegeta", correct: false }
    ]
  },
  {
    question: 'Quantos episódios Dragon Ball Z tem?',
    answers: [
      { text: '300', correct: false },
      { text: '291', correct: true },
      { text: '70', correct: false },
      { text: '1075', correct: false }
    ]
  },
  {
    question: 'Quantos episódios durou a luta de Son Goku e Freeza?',
    answers: [
      { text: '4 episódios', correct: false },
      { text: '20 episódios', correct: true },
      { text: '37 episódios', correct: false },
      { text: '10 episódios', correct: false }
    ]
  },
  {
    question: 'Como Vegeta morreu na saga Majin Boo?',
    answers: [
      { text: 'Ele não morre na saga Majin Boo', correct: false },
      { text: 'Causas naturais', correct: false },
      { text: 'Foi morto por Majin Boo', correct: false },
      { text: 'Ele se explodiu', correct: true },
    ]
  },
  {
    question: 'Quem matou o Cell?',
    answers: [
      { text: 'Cell foi morto por Mr. Satan', correct: false },
      { text: 'Cell foi morto por Vegeta', correct: false },
      { text: 'Cell foi morto por Son Gohan', correct: true },
      { text: 'Cell foi morto por Son Goku', correct: false },
    ]
  },
  {
    question: 'Qual é a forma mais poderosa de Majin Boo?',
    answers: [
      { text: 'Good Boo', correct: false },
      { text: 'Super Boo', correct: false },
      { text: 'Evil Boo', correct: false },
      { text: 'Kid Boo', correct: true },
    ]
  },
  {
    question: 'Que fusão derrotou Broly em Dragon Ball Super?',
    answers: [
      { text: 'Vegito', correct: false },
      { text: 'Gogeta', correct: true },
      { text: 'Gotenks', correct: false },
      { text: 'Zamasu Fundido', correct: false },
    ]
  },
]