// Zobacz gotowy projekt: https://websamuraj.pl/examples/js/projekt7/

const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: "",
    aiHand: ""
}

const hands = [...document.querySelectorAll(".select img")];

//pierwsza funkcja wyboru reki

function handSelection() {

    //dataset to zbior wszystkich wartosci data.
    game.playerHand = this.dataset.option
    // console.log(game.playerHand)
    hands.forEach(img => img.style.boxShadow = "");
    this.style.boxShadow = '0 0 0 4px green'
}

//funckja wybor kompa
function aiChoice() {
    return hands[Math.floor(Math.random() * 3)].dataset.option;
}

function checkResult(player, ai) {
    // console.log(player, ai)
    if (player === ai) {
        return 'draw'
    } else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) {
        return 'win'
    } else {
        return 'loss'
    }
}
//publikacja wynikow
function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;

    document.querySelector('[data-summary="ai-choice"]').textContent = ai;

    document.querySelector("p.numbers span").textContent = ++gameSummary.numbers;

    if (result === "win") {
        document.querySelector("p.wins span").textContent = ++gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent = "WYGRAŁEŚ!!!";
        document.querySelector('[data-summary="who-win"]').style.color = "red";
    } else if (result === "loss") {
        document.querySelector("p.losses span").textContent = ++gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent = "PRZEGRAŁEŚ!!!";
        document.querySelector('[data-summary="who-win"]').style.color = "green";
    } else {
        document.querySelector("p.draws span").textContent = ++gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = "REMIS!!!";
        document.querySelector('[data-summary="who-win"]').style.color = "blue";
    }
}

function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
    game.playerHand = "";
}
//funkcja guzika LETSPLAY, uruchamia gre.
function startGame() {
    if (!game.playerHand) {
        return alert("WYBIERZ COS")
    }
    game.aiHand = aiChoice()
    const gameResult = checkResult(game.playerHand, game.aiHand)
    console.log(gameResult);
    publishResult(game.playerHand, game.aiHand, gameResult);

    endGame()
}

//klikniecie w obrazek, wybor reki
hands.forEach(img => img.addEventListener('click', handSelection))


document.querySelector(".start").addEventListener('click', startGame)