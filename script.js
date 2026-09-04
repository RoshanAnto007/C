const countries = [

    { name: "Afghanistan", continent: "Asia" },
    { name: "Armenia", continent: "Asia" },
    { name: "Azerbaijan", continent: "Asia" },
    { name: "Bangladesh", continent: "Asia" },
    { name: "Bhutan", continent: "Asia" },
    { name: "Brunei", continent: "Asia" },
    { name: "China", continent: "Asia" },
    { name: "India", continent: "Asia" },
    { name: "Japan", continent: "Asia" },
    { name: "South Korea", continent: "Asia" },
    { name: "Nepal", continent: "Asia" },
    { name: "Pakistan", continent: "Asia" },

    { name: "France", continent: "Europe" },
    { name: "Germany", continent: "Europe" },
    { name: "Italy", continent: "Europe" },
    { name: "Spain", continent: "Europe" },
    { name: "United Kingdom", continent: "Europe" },
    { name: "Ukraine", continent: "Europe" },
    { name: "Poland", continent: "Europe" },
    { name: "Sweden", continent: "Europe" },
    { name: "Norway", continent: "Europe" },
    { name: "Switzerland", continent: "Europe" },
    { name: "Greece", continent: "Europe" },
    { name: "Portugal", continent: "Europe" }

];


let secretCountry;
let attempts;
const maxAttempts = 5;


function newGame() {

    // Random country
    secretCountry =
        countries[Math.floor(Math.random() * countries.length)];

    attempts = 0;

    document.getElementById("continent").innerText =
        "🌎 Hint: The country is in " +
        secretCountry.continent;

    document.getElementById("letterHint").innerText =
        "💡 First letter: ?";

    document.getElementById("attempts").innerText =
        "❤️ Attempts Left: " + maxAttempts;

    document.getElementById("message").innerText = "";

    document.getElementById("guessInput").value = "";

    document.getElementById("guessInput").disabled = false;
}


function checkGuess() {

    const input = document.getElementById("guessInput");

    const guess = input.value.trim();

    if (guess === "") {

        document.getElementById("message").innerText =
            "⚠️ Please enter a country!";

        return;
    }


    attempts++;


    if (
        guess.toLowerCase() ===
        secretCountry.name.toLowerCase()
    ) {

        document.getElementById("message").innerText =
            "🎉 Correct! The country was " +
            secretCountry.name +
            "! You got it in " +
            attempts +
            " attempt(s).";

        input.disabled = true;

        return;
    }


    const remaining = maxAttempts - attempts;


    if (remaining > 0) {

        document.getElementById("message").innerText =
            "❌ Wrong guess!";

        document.getElementById("letterHint").innerText =
            "💡 Hint: The country starts with '" +
            secretCountry.name[0] +
            "'";

        document.getElementById("attempts").innerText =
            "❤️ Attempts Left: " + remaining;

    }

    else {

        document.getElementById("message").innerText =
            "💡 Game Over! The country was " +
            secretCountry.name;

        document.getElementById("attempts").innerText =
            "❤️ Attempts Left: 0";

        input.disabled = true;
    }

}


newGame();