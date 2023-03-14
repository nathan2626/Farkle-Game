// Promise that reads a line of input from the user in the console
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserInput(question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer);
        });
    });
}

// Generating random number between 1 and 6
function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

async function playFarkle(playerName) {

    console.log(`Tour de ${playerName}`);
    console.log('Jouons à Farkle !');
    console.log('------------------');

    let score = 0;
    let round = 1;
    let consecutiveNonScoringRounds = 0;

    // Maximum of 10 rounds for more fun !!
    while (round <= 10) {
        console.log(`Manche ${round}`);
        console.log(`Score actuel: ${score}`);

        // Table for the future result
        let dice = [0, 0, 0, 0, 0];

        let numDice = 5;

        // There are still dice to roll
        while (numDice > 0) {
            let roll = rollDie();
            dice[numDice - 1] = roll; // in the table
            console.log(`Dé ${numDice}: ${roll}`);
            numDice--;
        }

        let roundScore = 0;

        // Research of 1 and 5
        let ones = dice.filter(d => d === 1).length;
        let fives = dice.filter(d => d === 5).length;

        if (ones === 0 && fives === 0) {
            consecutiveNonScoringRounds++;
            console.log('Aucun 1 ni 5, Farkle !');
            roundScore = 0;

            // Adding a rule if 3 Farkle then end of player’s turn
            if (consecutiveNonScoringRounds === 3) {
                console.log(`Trois manches consécutives sans points pour ${playerName}, le tour passe à l'autre joueur.`);
                consecutiveNonScoringRounds = 0;
                break;
            }

        } else {
            consecutiveNonScoringRounds = 0;
            roundScore += ones * 100;
            roundScore += fives * 50;

            // Search for three dice of the same value
            for (let i = 1; i <= 6; i++) {
                let count = dice.filter(d => d === i).length;

                if (count === 3) {
                    // 1000 points awarded if 3 times of 1
                    if (i === 1) {
                        roundScore += 1000;
                    } else {
                        roundScore += i * 100;
                    }

                break;
                }
            }
        }

        console.log(`Score de la manche: ${roundScore}`);

        let response = await getUserInput('Voulez-vous continuer ? (o/n) ');
        // In case player writes in UPPERCASE or simple presses ENTER
        if (response.toLowerCase() === 'o' || response === '') {
            score += roundScore;
            round++;
        } else {
            break;
        }
    }

    console.log('------------------');
    console.log(`Le score de ${playerName} est de ${score} points.`);
    console.log('------------------');
    
    return score;
}

async function main() {
    console.log('Bienvenue à Farkle !');
    console.log('------------------');
  
    let playAgain = true;
  
    // As long as users want to play and so playAgain === TRUE
    while (playAgain) {
      let scores = {};
  
      let player1 = await getUserInput('Nom du premier joueur : ');
      scores[player1] = await playFarkle(player1);
  
      let player2 = await getUserInput('Nom du deuxième joueur : ');
      scores[player2] = await playFarkle(player2);
  
      console.log('------------------');
      console.log('Le jeu est terminé !');
      console.log(`${player1} a marqué ${scores[player1]} points.`);
      console.log(`${player2} a marqué ${scores[player2]} points.`);
      console.log(`${scores[player1] > scores[player2] ? player1 : player2} a gagné !`);
  
      let response = await getUserInput('Voulez-vous jouer à nouveau ? (o/n) ');

      if (response.toLowerCase() === 'n') {
        playAgain = false;
      }
    }
  }
  
  main();