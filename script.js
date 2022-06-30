'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //faster
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// const scores = [0, 0];
// let currScore = 0;
// let activePlayer = 0;
// let playing = true;
let scores, currScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player1El.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active'); //toggle add class if it is not there
  player1El.classList.toggle('player--active'); //toggle remove class if it is there
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generatiing random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //Add dice to current score
      currScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;

      //current0El.textContent = currScore; //Change later
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to score of actove players
    scores[activePlayer] += currScore;
    // scores[1]=scores[1]+currScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    // Finish the game
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //  Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener(
  'click',
  init
  // 1. set all scores to 0
);
