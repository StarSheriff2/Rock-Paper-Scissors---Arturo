let roundResult;
let i = 0;
const roundNumber = document.querySelector("#roundH2");
const roundFeedback = document.querySelector("#roundResult");
const playerWeaponImg = document.querySelector("#playerSelection img");
const computerWeaponImg = document.querySelector("#computerSelection img");
const playerScore = document.querySelector("#playerScore").childNodes[0];
const computerScore = document.querySelector("#computerScore").childNodes[0];
const weaponButtons = document.querySelectorAll(".weaponButton");

const noDisplay = document.querySelector("#container").style;
//noDisplay.display = "none";

weaponButtons.forEach((button) => {
    button.addEventListener("click", _ => {
        playerPlay(button);
        game(playerPlay(button));
    });
});  

/*if (playerScore.textContent == 5) {
    let gameResult = "You won!";
    window.location.href = 'gameresult.html'; 
}
else if (computerScore.textContent == 5) {
    let gameResult = "You lost!\nTry again!";
    window.location.href = 'gameresult.html'; 
}*/

function playerPlay(button) {
    return button.getAttribute("id");
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

function game(playerPlay) {

    const playerSelection = playerPlay;
    const computerSelection = computerPlay();

    playerWeaponImg.setAttribute("src", `${document.querySelector(`#${playerSelection} img`).getAttribute("src")}`);
    computerWeaponImg.setAttribute("src", `${document.querySelector(`#${computerSelection} img`).getAttribute("src")}`);

    roundNumber.textContent = `Round ${i+=1}`;
    
    roundFeedback.textContent = playRound(playerSelection, computerSelection);

}

function playRound(playerSelection, computerSelection) {

    switch (playerSelection + computerSelection) {
        case "rockscissors":
        case "paperrock":   
        case "scissorspaper":
            roundResult = "You Win!";
            playerScore.textContent = `${playerScore.textContent * 1 + 1}`;
            break;
            
        case "scissorsrock":
        case "rockpaper":
        case "paperscissors":
            roundResult = "You Lose!";
            computerScore.textContent = `${computerScore.textContent * 1 + 1}`;
            break;

        default:
            roundResult = "It's a tie!";
    }
    return roundResult;
}

/*function gameScore() {
    if (roundResult == "You Win!") {
        roundScoreHuman += 1;
        playerScore.textContent = roundScoreHuman;
        if (playerScore.textContent == 5) {
            let gameResult = "You won!";
            window.location.href = 'gameresult.html'; 
        }      
    }
    else if (roundResult == "You Lose!") {
        roundScoreComputer += 1;
        computerScore.textContent = roundScoreComputer;
    }
    else {
        return;
    }
}*/