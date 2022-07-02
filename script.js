const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
let timeStarted = false;


quoteInputElement.addEventListener('input', () => {
    //Array that stores if the characters are correct or not
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    console.log("arrayQuote = " + arrayQuote)
    //Store the input in an array
    const arrayValue = quoteInputElement.value.split('')
    console.log("arrayValue =" + arrayValue)
    if(!timeStarted) startTimer()
    timeStarted = true
    let correct = true
    //Arry that stores the input WORDS
    let wordArray = quoteInputElement.value.split(' ')
    console.log(word)
    arrayQuote.forEach((characterSpan, index) => {
        //Array that stores the input characters
        const character = arrayValue[index]
        //console.log(characterSpan.innerText)
        console.log("character = " +character)
        //Compares the input characters with the quote characters
        if (character == null){
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false;
        } else if (character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })
    //If all the characters are correct, the user wins
    if(correct) {
        renderNewQuote()
        timeStarted = false
    }
})
function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote(){
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        //characterSpan.classList.add("correct")
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan)
    })
    quoteInputElement.value = null;
    //startTimer()
}

let startTime
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()