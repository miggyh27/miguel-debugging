// DOM Elements
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

// Game State
let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Helper bounds inclusive-exclusive randomizer
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Helper to reset all message displays
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

// Main logic for processing game guess
function checkGuess() {
  const guess = parseInt(guessInput.value, 10);

  // Bounds checking
  if (isNaN(guess) || guess < 1 || guess > 99) {
    return;
  }

  attempts = attempts + 1;
  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} ${attempts === 1 ? 'guess' : 'guesses'}`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  } else {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    if (remainingAttempts === 0) {
      numberOfGuessesMessage.innerHTML = '0 guesses remaining';
      submitButton.disabled = true;
      guessInput.disabled = true;
    } else {
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${remainingAttempts === 1 ? 'guess' : 'guesses'} remaining`;
    }
  }

  guessInput.value = '';
  resetButton.style.display = '';
}

// Init game session
function setup() {
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  attempts = 0;
  
  submitButton.disabled = false;
  guessInput.disabled = false;
  guessInput.value = '';

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
