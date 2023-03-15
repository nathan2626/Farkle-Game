let diceArr = [];
let score = 0;

// Initialization of dice in objects
function initializeDice() {
    for (i = 0; i < 6; i++) {
        diceArr[i] = {};
        diceArr[i].id = "die" + String(i + 1);
        diceArr[i].value = i + 1;
    }
}

// Rolling dice
function rollDice() {
    for (let i = 0; i < 6; i++) {
        diceArr[i].value = Math.floor(Math.random() * 6 + 1);
    }
    updateDiceImg();
    getScore();
}

// Change dice image when rolling dice
function updateDiceImg() {
    let diceImage;
    for (let i = 0; i < 6; i++) {
        diceImage = "img/" + diceArr[i].value + ".png";
        document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
    }
}

/*
[
  { id: 'die1', value: 2 },
  { id: 'die2', value: 5 },
  { id: 'die3', value: 3 },
  { id: 'die4', value: 5 },
  { id: 'die5', value: 2 },
  { id: 'die6', value: 1 }
]

to [1, 2, 2, 0, 0, 2] with getDiceAmounts

*/
function getDiceAmounts() {
    let valueArr = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 6; i++) {
        valueArr[diceArr[i].value - 1]++;
    }
    return valueArr;
}

// if there a Farkle then the turn goes to the next player
function checkForFarkle() {
    let valueArr = getDiceAmounts();
    for (let i = 0; i < 6; i++) {
        if (valueArr[i] >= 3) {
            return;
        } else if (i == 0 && valueArr[i] > 0) {
            return;
        } else if (i == 4 && valueArr[i] > 0) {
            return;
        }
  }

  alert("FARKLE! Votre tour est fini !");
}

function getScore(losingDice) {
    let valueArr = getDiceAmounts();
    let score = 0;

    // Filter out losing dice for future feature !!
    if (losingDice && losingDice.length > 0) {
        valueArr = valueArr.filter((_, index) => !losingDice.includes(index + 1));
    }

    // Calculate score
    for (let i = 0; i < 6; i++) {
        if (i == 0 && valueArr[i] >= 3 && valueArr[i] < 6) {
            score += 1000;
            if (valueArr[i] - 3 == 1) {
                score += 100;
            } else if (valueArr[i] - 3 == 2) {
                score += 200;
            }

        } else if (i == 0 && valueArr[i] >= 6) {
            score += 2000;

        } else if (i == 0) {
            score += valueArr[i] * 100;

        } else if (i == 4 && valueArr[i] >= 3 && valueArr[i] < 6) {
            score += 500;
            if (valueArr[i] - 3 == 1) {
                score += 50;
            } else if (valueArr[i] - 3 == 2) {
                score += 100;
            }

        } else if (i == 4 && valueArr[i] >= 6) {
            score += 1000;
        } else if (i == 4) {
            score += valueArr[i] * 50;
        } else if (i == 1 && valueArr[i] == 3) {
            score += 200;
        } else if (i == 2 && valueArr[i] == 3) {
            score += 300;
        } else if (i == 3 && valueArr[i] == 3) {
            score += 400;
        } else if (i == 5 && valueArr[i] == 3) {
            score += 600;
        } else if (i == 1 && valueArr[i] == 6) {
            score += 400;
        } else if (i == 2 && valueArr[i] == 6) {
            score += 600;
        } else if (i == 3 && valueArr[i] == 6) {
            score += 800;
        } else if (i == 5 && valueArr[i] == 6) {
            score += 1200;
        }
    }

    document.getElementById("row-score").innerHTML = score;

    if (score == 0) {
        alert("FARKLE! Votre tour est fini !");
    }

    return score;
}

// The reset function will be called at the end of the game
function resetGame() {
    diceArr = [];
    score = 0;
    initializeDice();
    updateDiceImg();
    document.getElementById("row-score").innerHTML = score;
    document.getElementById("player1-score").innerHTML = 0;
    document.getElementById("player2-score").innerHTML = 0;
    document.getElementById("turn-number").innerHTML = 1;
}

function bankScore() {

    let currentPlayer = (document.getElementById("turn-number").innerHTML % 2) + 1;
    let currentScore = getScore(); console.log("Player " + currentPlayer + " a " + currentScore + " points");

    let playerScoreElement = document.getElementById("player" + currentPlayer + "-score");
    let playerScore = parseInt(playerScoreElement.innerHTML);
    playerScore += currentScore;
    playerScoreElement.innerHTML = playerScore;

    let turnNumberElement = document.getElementById("turn-number");
    let turnNumber = parseInt(turnNumberElement.innerHTML);
    turnNumber += 1;
    turnNumberElement.innerHTML = turnNumber;

    // Check for winner
    if (playerScore >= 3000) {
        let winner = "Player " + currentPlayer;
        alert(winner + " a gagné ! Voulez-vous rejouer ?");
        resetGame();
    }

}