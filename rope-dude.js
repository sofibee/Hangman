// What is ASCIIART? Check the README.md or Workshop to see why ASCIIART is defined in your file.
const ASCIIART = [
  `
  +---+
  |   |
  O   |
 /|\\\  |
 / \\\  |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|\\\  |
 /    |
      |
      
=========`,
  `
  +---+
  |   |
  O   |
 /|\\\  |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
  `
  +---+
  |   |
      |
      |
      |
      |
=========`,
];

class RopeDude {
  constructor(secretWord) {
    this.secretWord = secretWord.toLowerCase().split('');
    this.remainingGuesses = 6;
    this.lettersGuessed = [];
    this.gameState = `playing`;
  }
  computeGameState() {
    if (this.remainingGuesses === 0) {
      this.gameState = `lost`;
    }
    else if (this.secretWord.every(letter => this.lettersGuessed.includes(letter))) {
      this.gameState = `won`;
    }
    else {
      this.gameState = `playing`;
    }
  }
  submitGuess(letterGuess) {
    let guess = letterGuess.toLowerCase();
    if (this.gameState !== `playing`) {
      return
    }
    if (!this.secretWord.includes(guess)) {
        this.remainingGuesses -= 1;
      }
    if (!this.lettersGuessed.includes(guess)) {
      this.lettersGuessed.push(guess);
    }    
  }
  getSecretWordPuzzle() {
    return this.secretWord.map(element => {
      if (!this.lettersGuessed.includes(element) && element !== ' ') {
          return `#`
      } else {
          return element
      }
    }).join('')
  }
  getGameStateMessage() {
    if (this.gameState === 'playing') {
      return `There is a total of ${this.remainingGuesses} guesses remaining:\n${ASCIIART[this.remainingGuesses]}`
      }
    else if (this.gameState === 'lost') {
      return `Game Over, the word was "${this.secretWord.join('')}":\n${ASCIIART[this.remainingGuesses]}`
    } else {
      return 'Winner Winner Chicken Dinner, you won!'
    }
  }
}

const game = new RopeDude('Hello World');

function simulateRopeDude() {
  let allLetters = `abcdefghijklmnopqrstuvwxyz`;
  const possible = allLetters.split(''); 
  function playRopeDude() {
  if (game.gameState === `playing`) {
      let letterGuess = possible[Math.floor(Math.random() * 26)];
      game.submitGuess(letterGuess);
      console.log(`letter guessed: ${game.lettersGuessed}`)
      game.computeGameState();
      game.getGameStateMessage();
      return playRopeDude()
  }
  else {
      return game.getGameStateMessage()
  }
  }

  return playRopeDude()
}
