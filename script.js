"use strict";

//selecting comments
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");

//setting the score to 0 and hiding the dice
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
}

function resetGame() {
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add("hidden");
    scores = [0, 0];
    currentScore = 0;
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player1El.classList.remove("player--active");
    player0El.classList.add("player--active");
    activePlayer = 0;
    btnHold.disabled = false;
    btnRoll.disabled = false;
}

//rolling the dice
btnRoll.addEventListener("click", function () {
    //generating random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    //display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1 and switch to next player
    if (dice !== 1) {
        //add dice to the current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent =
            currentScore;
    } else {
        switchPlayer();
    }
});

btnHold.addEventListener("click", function () {
    //add current score to the active player's score
    scores[activePlayer] += currentScore;
    currentScore = 0;

    document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];

    //check if score is >=100

    if (scores[activePlayer] >= 50) {
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add("player--winner");

        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove("player--active");

        btnHold.disabled = true;
        btnRoll.disabled = true;
        diceEl.classList.add("hidden");
    } else {
        switchPlayer();
    }
});

btnNew.addEventListener("click", resetGame);
