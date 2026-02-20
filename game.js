const randomNumberDisplay = document.getElementById("randomNumber");

// Generates a random target number between 3 and 9
const randomNumber = Math.floor(Math.random() * (9 - 3 + 1)) + 3;
randomNumberDisplay.textContent = randomNumber;

let totalScore = 0;
let correctAnswer = 0;       // Tracks successful clicks on multiples
let totalCorrectAnswers = 0; // Tracks total possible multiples in the grid
let wrongAnswers = 0;        // Tracks incorrect clicks


// Create a 5x5 game board
const table = document.getElementById("tableGame");
for (let rows = 0; rows < 5; rows++) {
    const row = document.createElement("tr");
    for (let col = 0; col < 5; col++) {
        const cell = document.createElement("td");
        // Generate a random number between 1 and 100 for each cell
        const randomNumberCell = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
        // Check if the cell value is a multiple of the target number
        if (randomNumberCell % randomNumber === 0) {
            totalCorrectAnswers++;
        }
        cell.textContent = randomNumberCell;
        // --- Click Event Listener ---
        cell.addEventListener("click", function() {
            // Validation: logic to check if user clicked a correct multiple
            if (randomNumberCell % randomNumber === 0) {
                cell.style.backgroundColor = "green";
                correctAnswer++;
            } else {
                cell.style.backgroundColor = "red";
                wrongAnswers++;
            }
        });
        
        row.appendChild(cell);
    }
    table.appendChild(row);
}

// --- Timer and Scoring Logic ---
const scoreDisplay = document.getElementById("scoreDisplay");
let totalTime = 30; 
const timeDisplay = document.getElementById("timeDisplay");
timeDisplay.style.color = "green";
timeDisplay.style.fontFamily = "Orbitron";

startTimer();

/**
 * Starts the countdown timer and handles color changes 
 * as the time runs out.
 */
function startTimer() {
    const timerInterval = setInterval(() => {
        totalTime--; 
        timeDisplay.textContent = totalTime;

        // Visual feedback based on remaining time
        if (totalTime <= 15) {
            timeDisplay.style.color = "orange";
        }
        if (totalTime <= 5) {
            timeDisplay.style.color = "red";
        }

        // Handle Game Over
        if (totalTime <= 0) {
            clearInterval(timerInterval);
            timeDisplay.textContent = "YOUR TIME HAS ENDED";
            timeDisplay.style.color = "red";
            
            // Score Calculation: (Ratio of correct hits) - (Ratio of wrong hits)
            totalScore = (correctAnswer / totalCorrectAnswers) - (wrongAnswers / (5 * 5 - totalCorrectAnswers));
            
            // Formatting the score display
            scoreDisplay.textContent = `YOUR SCORE IS ${totalScore.toFixed(2)}`;
        }
    }, 1000); 
}