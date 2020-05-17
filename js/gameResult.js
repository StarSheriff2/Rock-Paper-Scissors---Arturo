let roundResult;
let roundScoreHuman = 0;
let roundScoreComputer = 0;
let i = 0;
const roundNumber = document.querySelector("#roundH2");
const roundFeedback = document.querySelector("#roundResult");
const playerWeaponImg = document.querySelector("#playerSelection img");
const computerWeaponImg = document.querySelector("#computerSelection img");
const playerScore = document.querySelector("#playerScore");
const computerScore = document.querySelector("#computerScore");
const weaponButtons = document.querySelectorAll(".weaponButton");

weaponButtons.forEach((button) => {
    button.addEventListener("click", _ => {
        window.location.href = 'gameresult.html';
        playerPlay(button);
        game(playerPlay(button));
    });
});

function playerPlay(button) {
    return button.getAttribute("id");
}

function game(playerPlay) {

    const playerSelection = playerPlay;
    const computerSelection = computerPlay();

    playerWeaponImg.setAttribute("src", `${document.querySelector(`#${playerSelection} img`).getAttribute("src")}`);
    computerWeaponImg.setAttribute("src", `${document.querySelector(`#${computerSelection} img`).getAttribute("src")}`);

    roundNumber.textContent = `Round ${roundCounter()}`;
    
    roundFeedback.textContent = playRound(playerSelection, computerSelection);

    gameScore();

    if (roundScoreHuman > roundScoreComputer) {
        let gameResult = `You won the game ${roundScoreHuman} to ${roundScoreComputer}! Way to go!`;
        return gameResult;
    } else if (roundScoreHuman < roundScoreComputer) {
        let gameResult = `You lost the game ${roundScoreHuman} to ${roundScoreComputer}! Try again!`;    
        return gameResult;
    }
    else {
        let gameResult = "It's a tie game! Try again!"; 
        return gameResult;
    }

    function computerPlay() {
        let randomNumber = function () {
            min = Math.ceil(1);
            max = Math.floor(3);
            return Math.floor(Math.random() * (max - min + 1)) + 1;
        }
        let result = (randomNumber() == 1) ? "rock" : (randomNumber() == 2) ? "paper" : "scissors";
        return result;
    }
}

function playRound(playerSelection, computerSelection) {

    switch (playerSelection + computerSelection) {
        case "rockscissors":
        case "paperrock":   
        case "scissorspaper":
            roundResult = "You Win!";
            break;
            
        case "scissorsrock":
        case "rockpaper":
        case "paperscissors":
            roundResult = "You Lose!";
            break;

        default:
            roundResult = "It's a tie!";
    }
    return roundResult;
}

function roundCounter() { 
    return i += 1;
}

function gameScore() {
    if (roundResult == "You Win!") {
        roundScoreHuman += 1;
        playerScore.textContent = roundScoreHuman;      
    }
    else if (roundResult == "You Lose!") {
        roundScoreComputer += 1;
        computerScore.textContent = roundScoreComputer;
    }
    else {
        return;
    }
}