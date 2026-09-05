// ==========================================
// GUESS THE COUNTRY
// ==========================================


// COUNTRY DATABASE
const countries = [

    // ASIA
    { name: "India", continent: "Asia", flag: "🇮🇳", fact: "It is the world's most populous country." },
    { name: "Japan", continent: "Asia", flag: "🇯🇵", fact: "It is known as the Land of the Rising Sun." },
    { name: "China", continent: "Asia", flag: "🇨🇳", fact: "It is home to the Great Wall." },
    { name: "South Korea", continent: "Asia", flag: "🇰🇷", fact: "Its capital is Seoul." },
    { name: "North Korea", continent: "Asia", flag: "🇰🇵", fact: "Its capital is Pyongyang." },
    { name: "Nepal", continent: "Asia", flag: "🇳🇵", fact: "Mount Everest is located here." },
    { name: "Bhutan", continent: "Asia", flag: "🇧🇹", fact: "It is famous for measuring Gross National Happiness." },
    { name: "Bangladesh", continent: "Asia", flag: "🇧🇩", fact: "Its capital is Dhaka." },
    { name: "Pakistan", continent: "Asia", flag: "🇵🇰", fact: "Its capital is Islamabad." },
    { name: "Sri Lanka", continent: "Asia", flag: "🇱🇰", fact: "It is an island country south of India." },
    { name: "Thailand", continent: "Asia", flag: "🇹🇭", fact: "Its capital is Bangkok." },
    { name: "Vietnam", continent: "Asia", flag: "🇻🇳", fact: "Its capital is Hanoi." },
    { name: "Indonesia", continent: "Asia", flag: "🇮🇩", fact: "It is the world's largest archipelago." },
    { name: "Malaysia", continent: "Asia", flag: "🇲🇾", fact: "Its capital is Kuala Lumpur." },
    { name: "Singapore", continent: "Asia", flag: "🇸🇬", fact: "It is a city-state in Southeast Asia." },
    { name: "Philippines", continent: "Asia", flag: "🇵🇭", fact: "It is an archipelago of thousands of islands." },
    { name: "Mongolia", continent: "Asia", flag: "🇲🇳", fact: "It is known for its vast steppes." },
    { name: "Kazakhstan", continent: "Asia", flag: "🇰🇿", fact: "It is the world's largest landlocked country." },
    { name: "Saudi Arabia", continent: "Asia", flag: "🇸🇦", fact: "It is home to Mecca and Medina." },
    { name: "United Arab Emirates", continent: "Asia", flag: "🇦🇪", fact: "Its largest city is Dubai." },
    { name: "Israel", continent: "Asia", flag: "🇮🇱", fact: "Its capital is Jerusalem." },


    // EUROPE
    { name: "France", continent: "Europe", flag: "🇫🇷", fact: "The Eiffel Tower is located here." },
    { name: "Germany", continent: "Europe", flag: "🇩🇪", fact: "Its capital is Berlin." },
    { name: "Italy", continent: "Europe", flag: "🇮🇹", fact: "Rome is its capital." },
    { name: "Spain", continent: "Europe", flag: "🇪🇸", fact: "Madrid is its capital." },
    { name: "Portugal", continent: "Europe", flag: "🇵🇹", fact: "It is located on the Iberian Peninsula." },
    { name: "United Kingdom", continent: "Europe", flag: "🇬🇧", fact: "London is its capital." },
    { name: "Ireland", continent: "Europe", flag: "🇮🇪", fact: "It is known as the Emerald Isle." },
    { name: "Norway", continent: "Europe", flag: "🇳🇴", fact: "It is famous for its fjords." },
    { name: "Sweden", continent: "Europe", flag: "🇸🇪", fact: "Stockholm is its capital." },
    { name: "Finland", continent: "Europe", flag: "🇫🇮", fact: "It is known as the Land of a Thousand Lakes." },
    { name: "Denmark", continent: "Europe", flag: "🇩🇰", fact: "Copenhagen is its capital." },
    { name: "Iceland", continent: "Europe", flag: "🇮🇸", fact: "It is famous for volcanoes and glaciers." },
    { name: "Switzerland", continent: "Europe", flag: "🇨🇭", fact: "It is famous for the Alps." },
    { name: "Austria", continent: "Europe", flag: "🇦🇹", fact: "Vienna is its capital." },
    { name: "Poland", continent: "Europe", flag: "🇵🇱", fact: "Warsaw is its capital." },
    { name: "Greece", continent: "Europe", flag: "🇬🇷", fact: "It is considered the birthplace of democracy." },
    { name: "Ukraine", continent: "Europe", flag: "🇺🇦", fact: "Kyiv is its capital." },
    { name: "Romania", continent: "Europe", flag: "🇷🇴", fact: "Bucharest is its capital." },
    { name: "Netherlands", continent: "Europe", flag: "🇳🇱", fact: "It is famous for canals and tulips." },
    { name: "Belgium", continent: "Europe", flag: "🇧🇪", fact: "Brussels is its capital." }

];


// GAME VARIABLES

let secretCountry;

let attempts = 0;

let score = 0;

let streak = 0;

let round = 1;

let timeLeft = 30;

let timer;

let gameOver = false;


// MAX ATTEMPTS

const MAX_ATTEMPTS = 5;


// ==========================================
// DOM ELEMENTS
// ==========================================

const playerNameInput =
    document.getElementById("playerName");

const guessInput =
    document.getElementById("guessInput");

const guessButton =
    document.getElementById("guessButton");

const newGameButton =
    document.getElementById("newGameButton");

const continentElement =
    document.getElementById("continent");

const hintElement =
    document.getElementById("hint");

const messageElement =
    document.getElementById("message");

const heartsElement =
    document.getElementById("hearts");

const scoreElement =
    document.getElementById("score");

const streakElement =
    document.getElementById("streak");

const timerElement =
    document.getElementById("timer");

const timerBar =
    document.getElementById("timerBar");

const roundElement =
    document.getElementById("round");

const leaderboardList =
    document.getElementById("leaderboardList");

const clearLeaderboard =
    document.getElementById("clearLeaderboard");


// ==========================================
// START NEW GAME
// ==========================================

function newGame() {

    clearInterval(timer);

    gameOver = false;

    attempts = 0;

    timeLeft = 30;


    // RANDOM COUNTRY

    secretCountry =
        countries[
            Math.floor(
                Math.random() * countries.length
            )
        ];


    // UPDATE UI

    continentElement.innerText =
        `🌎 ${secretCountry.continent}`;

    hintElement.innerText =
        "Start guessing to reveal hints.";

    messageElement.innerText = "";

    guessInput.value = "";

    guessInput.disabled = false;

    guessButton.disabled = false;


    updateAttempts();

    updateTimer();

    roundElement.innerText =
        `Round ${round}`;


    // START TIMER

    timer = setInterval(
        countdown,
        1000
    );


    guessInput.focus();
}


// ==========================================
// TIMER
// ==========================================

function countdown() {

    timeLeft--;

    updateTimer();


    if (timeLeft <= 0) {

        clearInterval(timer);

        gameOver = true;

        messageElement.innerText =
            `⏰ Time's up! The country was ${secretCountry.flag} ${secretCountry.name}`;

        guessInput.disabled = true;

        guessButton.disabled = true;

        streak = 0;

        updateStats();
    }
}


function updateTimer() {

    timerElement.innerText =
        timeLeft;

    const percentage =
        (timeLeft / 30) * 100;

    timerBar.style.width =
        percentage + "%";
}


// ==========================================
// CHECK GUESS
// ==========================================

function checkGuess() {

    if (gameOver) {
        return;
    }


    const guess =
        guessInput.value.trim();


    if (guess === "") {

        messageElement.innerText =
            "⚠️ Please enter a country.";

        return;
    }


    attempts++;


    // CORRECT

    if (
        guess.toLowerCase() ===
        secretCountry.name.toLowerCase()
    ) {

        clearInterval(timer);

        gameOver = true;


        // SCORE

        const baseScore =
            (MAX_ATTEMPTS - attempts + 1) * 100;

        const timeBonus =
            timeLeft * 5;

        const streakBonus =
            streak * 50;

        const roundScore =
            baseScore +
            timeBonus +
            streakBonus;


        score += roundScore;

        streak++;


        messageElement.innerText =
            `🎉 Correct! ${secretCountry.flag} ${secretCountry.name}
            
            +${roundScore} points`;


        hintElement.innerText =
            `📚 ${secretCountry.fact}`;


        guessInput.disabled = true;

        guessButton.disabled = true;


        // ANIMATION

        document
            .querySelector(".game-card")
            .classList.add("correct");


        setTimeout(() => {

            document
                .querySelector(".game-card")
                .classList.remove("correct");

        }, 600);


        updateStats();

        saveScore();

        return;
    }


    // WRONG

    if (attempts < MAX_ATTEMPTS) {

        const remaining =
            MAX_ATTEMPTS - attempts;


        messageElement.innerText =
            "❌ Wrong guess! Try again.";


        // HINT 1

        if (attempts === 1) {

            hintElement.innerText =
                `💡 First letter: "${secretCountry.name[0]}"`;
        }


        // HINT 2

        else if (attempts === 2) {

            hintElement.innerText =
                `💡 First letter: "${secretCountry.name[0]}" • ${secretCountry.name.length} letters`;
        }


        // HINT 3

        else if (attempts === 3) {

            hintElement.innerText =
                `💡 ${secretCountry.name.length} letters • Starts with "${secretCountry.name[0]}" • ${secretCountry.continent}`;
        }


        // HINT 4

        else {

            hintElement.innerText =
                `💡 Fact: ${secretCountry.fact}`;
        }


        updateAttempts();


        // WRONG ANIMATION

        document
            .querySelector(".game-card")
            .classList.add("wrong");


        setTimeout(() => {

            document
                .querySelector(".game-card")
                .classList.remove("wrong");

        }, 400);

    }


    // GAME OVER

    else {

        clearInterval(timer);

        gameOver = true;

        streak = 0;


        messageElement.innerText =
            `💀 Game Over! The country was ${secretCountry.flag} ${secretCountry.name}`;


        hintElement.innerText =
            `📚 ${secretCountry.fact}`;


        guessInput.disabled = true;

        guessButton.disabled = true;


        updateAttempts();

        updateStats();
    }
}


// ==========================================
// ATTEMPTS
// ==========================================

function updateAttempts() {

    let hearts = "";

    for (
        let i = 0;
        i < MAX_ATTEMPTS;
        i++
    ) {

        if (i < MAX_ATTEMPTS - attempts) {

            hearts += "❤️ ";

        } else {

            hearts += "🖤 ";

        }
    }

    heartsElement.innerText =
        hearts;
}


// ==========================================
// STATS
// ==========================================

function updateStats() {

    scoreElement.innerText =
        score;

    streakElement.innerText =
        streak;
}


// ==========================================
// LEADERBOARD
// ==========================================

function saveScore() {

    const playerName =
        playerNameInput.value.trim();


    if (playerName === "") {

        return;
    }


    let leaderboard =
        JSON.parse(
            localStorage.getItem(
                "countryLeaderboard"
            )
        ) || [];


    leaderboard.push({

        name: playerName,

        score: score,

        date: new Date().toLocaleDateString()

    });


    leaderboard.sort(
        (a, b) => b.score - a.score
    );


    leaderboard =
        leaderboard.slice(0, 10);


    localStorage.setItem(

        "countryLeaderboard",

        JSON.stringify(leaderboard)

    );


    displayLeaderboard();
}


// ==========================================
// DISPLAY LEADERBOARD
// ==========================================

function displayLeaderboard() {

    let leaderboard =
        JSON.parse(
            localStorage.getItem(
                "countryLeaderboard"
            )
        ) || [];


    leaderboardList.innerHTML = "";


    if (leaderboard.length === 0) {

        leaderboardList.innerHTML = `

            <div class="empty-leaderboard">

                🏆 No scores yet.

                <br>

                Be the first player!

            </div>

        `;

        return;
    }


    leaderboard.forEach(
        (player, index) => {

            const row =
                document.createElement("div");


            row.className =
                "leaderboard-row";


            let medal = "";


            if (index === 0) {
                medal = "🥇";
            }

            else if (index === 1) {
                medal = "🥈";
            }

            else if (index === 2) {
                medal = "🥉";
            }

            else {
                medal = `#${index + 1}`;
            }


            row.innerHTML = `

                <div class="rank">

                    ${medal}

                </div>

                <div class="player">

                    ${escapeHTML(player.name)}

                </div>

                <div class="points">

                    ${player.score} pts

                </div>

            `;


            leaderboardList.appendChild(row);

        }
    );
}


// ==========================================
// SECURITY
// ==========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;
}


// ==========================================
// CLEAR LEADERBOARD
// ==========================================

clearLeaderboard.addEventListener(
    "click",
    () => {

        const confirmClear =
            confirm(
                "Are you sure you want to clear the leaderboard?"
            );


        if (confirmClear) {

            localStorage.removeItem(
                "countryLeaderboard"
            );

            displayLeaderboard();

        }

    }
);


// ==========================================
// BUTTON EVENTS
// ==========================================

guessButton.addEventListener(
    "click",
    checkGuess
);


newGameButton.addEventListener(
    "click",
    () => {

        round++;

        newGame();

    }
);


// ENTER KEY

guessInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            checkGuess();

        }

    }
);


// ==========================================
// INITIALIZE
// ==========================================

updateStats();

displayLeaderboard();

newGame();