let roundResult;
let i = 0;
const roundNumber = document.querySelector("#roundH2");
const roundFeedback = document.querySelector("#roundResult");
const playerWeaponImg = document.querySelector("#playerSelection img");
const computerWeaponImg = document.querySelector("#computerSelection img");
const playerScore = document.querySelector("#playerScore").childNodes[0];
const computerScore = document.querySelector("#computerScore").childNodes[0];
const weaponButtons = document.querySelectorAll(".weaponButton");
const gameResult = document.querySelector("#gameResultH2");
const noDisplay1 = document.querySelector("#gameContainer").style;
const noDisplay2 = document.querySelector("#resultsContainer").style;
const playAgain = document.querySelector("#playAgain");
const playAgainBtn = document.querySelector("#playAgainBtn");
const summaryData = document.querySelector("#summaryData");
noDisplay2.display = "none";

weaponButtons.forEach((button) => {
    button.addEventListener("click", _ => {
        button.classList.add("weaponClick");
        transitionClick(button);
        playerPlay(button);
        game(playerPlay(button));
    });
});  

function transitionClick(button) {
    button.addEventListener("transitionend", (e) => {
    if (e.propertyName !== 'transform') return;
    button.classList.remove("weaponClick");
    });
  }

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

    logRound(playerSelection, computerSelection, roundFeedback.textContent, roundNumber.textContent);
    if (playerScore.textContent == 5 || computerScore.textContent == 5) loadResults(roundFeedback.textContent);
}

function playRound(playerSelection, computerSelection) {

    switch (playerSelection + computerSelection) {
        case "rockscissors":
        case "paperrock":   
        case "scissorspaper":
            roundResult = "You Win!";
            playerScore.textContent = `${+playerScore.textContent + 1}`;
            break;
            
        case "scissorsrock":
        case "rockpaper":
        case "paperscissors":
            roundResult = "You Lose!";
            computerScore.textContent = `${+computerScore.textContent + 1}`;
            break;

        default:
            roundResult = "It's a tie!";
    }
    return roundResult;
}

function loadResults(winner){
    noDisplay1.display = "none";
    playerScore.textContent = 0;
    computerScore.textContent = 0;
    roundNumber.textContent = "Round";
    i = 0;
    roundResult = "";
    const trophyAttribution = document.querySelector(".imgAttribution2");
    if (winner == "You Win!") {
        const trophyDiv = document.createElement("div");
        trophyDiv.setAttribute("id", "trophyDiv");
        const trophyImg = document.createElement("img");
        trophyImg.setAttribute("id", "trophyImg");
        trophyImg.setAttribute("src", "images/trophy.png");
        trophyDiv.appendChild(trophyImg);
        const gameResultDiv = document.querySelector("#gameResultDiv");
        gameResultDiv.insertBefore(trophyDiv, playAgain);
        trophyAttribution.style.display ="block";
        gameResult.textContent = "You Won!";
    }
    else {
        trophyAttribution.style.display ="none";
        gameResult.textContent = `You Lost! Try Again!`;
    }
    noDisplay2.display = "block";
    weaponButtons.forEach((button) => {
        button.classList.remove("weaponClick");
    });
}

playAgainBtn.addEventListener("click", _ => {
    const playerRound = document.querySelectorAll(".playerRound");
    noDisplay2.display = "none";
    playerRound.forEach((childNode) => {
        summaryData.removeChild(childNode);
    });
    if (gameResult.textContent == "You Won!" && trophyDiv) gameResultDiv.removeChild(trophyDiv);
    playerWeaponImg.setAttribute("src", "images/480px-Question_mark_white_icon.svg.png");
    computerWeaponImg.setAttribute("src", "images/480px-Question_mark_white_icon.svg.png");
    roundFeedback.textContent = "";
    noDisplay1.display = "block";
});

function logRound(playerSelection, computerSelection, roundFeedback, roundCounter) {
    const newRoundLog = document.createElement("div");
    newRoundLog.setAttribute("class", "playerRound");
    const summaryPlayer = document.createElement("div");
    summaryPlayer.setAttribute("class", "summaryPlayer");
    newRoundLog.appendChild(summaryPlayer);
    const roundNumberLog = document.createElement("h2");
    roundNumberLog.setAttribute("class", "roundNumber");
    roundNumberLog.textContent = roundCounter.slice(6);
    newRoundLog.appendChild(roundNumberLog);
    const summaryComputer = document.createElement("div");
    summaryComputer.setAttribute("class", "summaryComputer");
    newRoundLog.appendChild(summaryComputer);
    const roundImgContainerPlayer = document.createElement("div");
    roundImgContainerPlayer.setAttribute("class", "roundImgContainer");
    summaryPlayer.appendChild(roundImgContainerPlayer);
    const roundImgContainerComputer = document.createElement("div");
    roundImgContainerComputer.setAttribute("class", "roundImgContainer");
    summaryComputer.appendChild(roundImgContainerComputer);
    const roundImgPlayer = document.createElement("img");
    roundImgPlayer.setAttribute("class", "roundImgPlayer");
    roundImgPlayer.setAttribute("src", `${document.querySelector(`#${playerSelection} img`).getAttribute("src")}`);
    roundImgContainerPlayer.appendChild(roundImgPlayer);
    const roundImgComputer = document.createElement("img");
    roundImgComputer.setAttribute("class", "roundImgComputer");
    roundImgComputer.setAttribute("src", `${document.querySelector(`#${computerSelection} img`).getAttribute("src")}`);
    roundImgContainerComputer.appendChild(roundImgComputer);
    const winnerMarkPlayer = document.createElement("img");
    winnerMarkPlayer.setAttribute("class", "winnerMarkPlayer");
    summaryPlayer.appendChild(winnerMarkPlayer);
    const winnerMarkComputer = document.createElement("img");
    winnerMarkComputer.setAttribute("class", "winnerMarkComputer");
    summaryComputer.appendChild(winnerMarkComputer);
    if (roundFeedback == "You Win!") {
        winnerMarkPlayer.setAttribute("src", "images/checkmark-png-25969.png");
        winnerMarkComputer.setAttribute("src", "images/Red-Cross-Mark-PNG-File.png");
    }
    else if (roundFeedback == "You Lose!") {
        winnerMarkPlayer.setAttribute("src", "images/Red-Cross-Mark-PNG-File.png");
        winnerMarkComputer.setAttribute("src", "images/checkmark-png-25969.png");
    }
    else {
        winnerMarkPlayer.setAttribute("src", "");
        winnerMarkComputer.setAttribute("src", "");
    }
    summaryData.appendChild(newRoundLog);
}


