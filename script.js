const textChoiceFirst = document.querySelector("#player1");
const textChoiceSecond = document.querySelector("#player2");
const buttonsPlayField = document.querySelectorAll(".buttonContainer button");
const player1Wins = document.querySelector(".name1");
const player2Wins = document.querySelector(".name2");
const player1count = document.querySelector(".player1counter");
const player2count = document.querySelector(".player2counter");

let player1 = playerCreator(textChoiceFirst.value, "X");
let player2 = playerCreator(textChoiceSecond.value, "O");

let i = 0;
const playerArray = [player1, player2];
let playerTurn = playerArray[i];

const displayController = (function() {
    
    const gameEnd = () => {

        const allDisabled = Array.from(buttonsPlayField).every(item => item.disabled);

        
        for(let i = 0; i < 7; i += 3) {
            if(buttonsPlayField[i].textContent !== "" && (buttonsPlayField[i].textContent === buttonsPlayField[i+1].textContent && buttonsPlayField[i].textContent === buttonsPlayField[i+2].textContent)) {
                playerWon();
                return true;
            }
        }

        for(let i = 0; i <= 2; i++) {
            if(buttonsPlayField[i].textContent !== "" && (buttonsPlayField[i].textContent === buttonsPlayField[i+3].textContent && buttonsPlayField[i].textContent === buttonsPlayField[i+6].textContent)) {
                playerWon();
                return true;
            }
        }

        if((buttonsPlayField[0].textContent !== "" && (buttonsPlayField[0].textContent === buttonsPlayField[4].textContent && buttonsPlayField[0].textContent === buttonsPlayField[8].textContent) 
            || (buttonsPlayField[2].textContent !== "" && (buttonsPlayField[2].textContent === buttonsPlayField[4].textContent && buttonsPlayField[2].textContent === buttonsPlayField[6].textContent)))) {
                playerWon();
                return true;
        }

        if(allDisabled) {
            alert("Draw!");
            return true;
        }

        return false;


    }

    const changeName = () => {        
        player1.setPlayer(textChoiceFirst.value);
        player2.setPlayer(textChoiceSecond.value);
        player1Wins.style.setProperty('--after-content', `"${player1Text.value}"`);
        player2Wins.style.setProperty('--after-content', `"${player2Text.value}"`);
    }

    const playerWon = () => {
        playerTurn.addWin();
        player1count.textContent = player1.getWins();
        player2count.textContent = player2.getWins();
    }

    const resetScreen = () => {
        buttonsPlayField.forEach(item => {
            item.textContent = ""; 
            item.disabled = false;
        });
        playerTurn = player1;
        i = 0;
        return;
    
    }

    return {gameEnd, changeName, resetScreen, playerWon};

})();


const gameboard = (function() {
    buttonsPlayField.forEach((item) => {
        item.addEventListener("click", () => {
            item.disabled = true;
            item.textContent = playerTurn.getSign();
            if(displayController.gameEnd()) {
                displayController.resetScreen();
            } else {
                i = +!i;
                playerTurn = playerArray[i];
            }
        })
    });

    textChoiceFirst.addEventListener("keydown", (event) => displayController.changeName());
    textChoiceSecond.addEventListener("keydown", (event) => displayController.changeName());


})();


function playerCreator(player, sign) {
    let wins = 0;

    function getSign() {
        return sign;
    }

    function getPlayer() {
        return player;
    }

    function setPlayer(playerNew) {
        player = playerNew;
    }

    function addWin() {
        wins++;
    }

    function getWins() {
        return wins;
    }

    return {setPlayer, getSign, getPlayer, addWin, getWins}

}

