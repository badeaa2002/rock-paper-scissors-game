
// Elements

//players movies options 
const player2Moves = document.getElementById("handMoves2");
const player1Moves = document.getElementById("handMoves1");
//localstorage
const gameData = JSON.parse(localStorage.getItem("gameData"));
//players name display
const player1Name = document.getElementById("player1");
const player2Name = document.getElementById("player2");
const player1Final=document.getElementById("player1Final");
const player2Final=document.getElementById("player2Final");
//rock paper scissor
const moves1 = document.querySelectorAll("#handMoves1 .move");
const moves2 = document.querySelectorAll("#handMoves2 .move");
//players score display
const player1ScoreEl = document.getElementById("player1score");
const player2ScoreEl = document.getElementById("player2score");
const player1scoreFinal=document.getElementById("player1scoreFinal");
const player2scoreFinal=document.getElementById("player2scoreFinal");
//display winner
const Winner=document.getElementById("winner");
const roundWinner=document.getElementById("roundWinner");
//buttons
const startBtn = document.getElementById("start");
const endgameBtn=document.getElementById("endBtn");
//round number display
const roundNum = document.getElementById("roundNum");
//players hands display
const player1Hand = document.getElementById("player1-hand");
const player2Hand = document.getElementById("player2-hand");
//final winner display
const winnerBox = document.getElementById("winner-box");
const finalWinner = document.getElementById("finalWinner");

// Player Names
player1Name.textContent = gameData.player1;
player2Name.textContent = gameData.player2;

//dont show mones before start
player1Moves.style.display="none";
player2Moves.style.display="none";


// Variables
let player1Choice = "";
let player2Choice = "";
let player1Score = 0;
let player2Score = 0;
let roundNumber = 0;
let roundStarted = false;
let gameFinished = false;

//players move
const movesImages = {
    rock: "Rock.png",
    paper: "Paper.png",
    scissors: "Scissors.png"
};

//computer moves
const randomMove = ["rock", "paper", "scissors"];

// dont show final winner box
winnerBox.style.display = "none";

// Start Game
startBtn.addEventListener("click", () => {
    if (gameFinished || roundStarted) return;
    // Reset Choices
    player1Choice = "";
    player2Choice = "";
    //remove animation 
    roundWinner.classList.remove("show");
    // Reset Hands
    player1Hand.src = "Rock.png";
    player2Hand.src = "Rock.png";
    // Show Moves
    player1Moves.style.display = "flex";
    if (gameData.gameMode === "single") {
        player2Moves.style.display = "none";
    } else {
        player2Moves.style.display = "flex";
    }
    startBtn.disabled = true;

});

 // Player 1 Choice
function player1choose(move){
        if ( roundStarted || gameFinished) return;
        // Save Player 1 Choice
        player1Choice = move;
        //hide moves
        player1Moves.style.display = "none";
        // Single Mode computer 
        if (gameData.gameMode === "single") {
            const randomIndex = Math.floor(Math.random() * randomMove.length);
            player2Choice = randomMove[randomIndex];
            startAnimation();
        }
           // Multi Mode
          else {
            player2Moves.style.display = "flex";
          }
        };

  //player 2 choice
 function player2choose(move){
     if ( roundStarted || gameFinished ) return;
      // Save Player 2 Choice
         player2Choice = move;
         player2Moves.style.display = "none";
         startAnimation();
           };
           
// Animation
function startAnimation() {
    roundStarted = true;
    startBtn.disabled = true;
    player1Hand.classList.add("shake1");
    player2Hand.classList.add("shake2");
    setTimeout(() => {
        // Stop Animation
        player1Hand.classList.remove("shake1");
        player2Hand.classList.remove("shake2");
        // Display Selected Moves
        player1Hand.src = movesImages[player1Choice];
        player2Hand.src = movesImages[player2Choice];
        // Calculate Score
           calculateScore();
        // Increase Round
        roundNumber++;
        roundNum.textContent = roundNumber;
        // Check Winner
        if (player1Score === 3 || player2Score === 3) {
           showFinalWinner();
        }
        // Finish Round
        roundStarted = false;
        startBtn.disabled = false;

    }, 3000);

};

// Calculate Score
function calculateScore() {
    if (player1Choice === player2Choice) {
          roundWinner.classList.add("show");
        Winner.innerText="DRAW";
    }
    else if (
        (player1Choice === "rock" && player2Choice === "scissors") ||
        (player1Choice === "paper" && player2Choice === "rock") ||
        (player1Choice === "scissors" && player2Choice === "paper")
    ) {
        player1Score++;
        roundWinner.classList.add("show");
        confetti({
            particleCount: 150,
            spread: 100,
            startVelocity: 45,
            origin: {
                x: 0.5,
                y: 0.6
            }
        });
        Winner.innerText=gameData.player1+" wins!";
    }
    else {
        player2Score++;
         roundWinner.classList.add("show");
        confetti({
            particleCount: 150,
            spread: 50,
            startVelocity: 45,
            origin: {
                x: 0.5,
                y: 0.6
            }
        });
        Winner.innerText=gameData.player2+ " wins!";
    }
    // Update Score
    player1ScoreEl.textContent = player1Score;
    player2ScoreEl.textContent = player2Score;
};
// Final Winner
function showFinalWinner() {
    gameFinished = true;
    winnerBox.style.display = "block";
    player1Moves.style.display = "none";
    player2Moves.style.display = "none";
    startBtn.disabled = true;
    if (player1Score === 3) {
        finalWinner.textContent = gameData.player1;
    }
    else if (gameData.gameMode === "single mode") {
        finalWinner.textContent = "Computer";
    }
    else {
        finalWinner.textContent = gameData.player2;
    };
    player1Final.textContent = gameData.player1;
    player2Final.textContent = gameData.player2;
    player1scoreFinal.textContent = player1Score;
    player2scoreFinal.textContent = player2Score;
    //save game history
    savegame();
};


//restrat new game
function restart(){
    roundWinner.classList.remove("show");
     // Reset Scores
     player1Score = 0;
     player2Score = 0;
     player1ScoreEl.textContent = "";
     player2ScoreEl.textContent = "";
     // Reset Round
     roundNumber = 0;
    roundNum.textContent = roundNumber;
     // Reset Choices
    player1Choice = "";
    player2Choice = "";
    // Reset Game Status
    roundStarted = false;
    gameFinished = false;
    // Reset Hands
    player1Hand.src = "Rock.png";
    player2Hand.src = "Rock.png";
    // Hide Winner
    winnerBox.style.display = "none";
    finalWinner.textContent = "";
    // Enable Start
    startBtn.disabled = false;
};

function savegame (){
    const gameHistory=JSON.parse(localStorage.getItem("gameHistory"))||[];
    game={
        player1:gameData.player1,
        player2:gameData.player2,
        rounds:roundNumber,
        player1score:player1Score,
        player2score:player2Score,
        Winner:finalWinner.textContent
    }
    gameHistory.push(game);
    localStorage.setItem("gameHistory",JSON.stringify(gameHistory));
};

//end game 
function endGame(){
    window.location.href="end.html"
};