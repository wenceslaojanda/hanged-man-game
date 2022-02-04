let btnStartGame = document.querySelector("#start-game")
let secretsWords = ['ALURA', 'ORACLE', 'PROGRAMADOR', 'CANVAS', 'JAVASCRIPT', 'CSS', 'HTML', 'PERRO', 'GATO', 'ESTATUA', 'ARGENTINA', 'BRASIL', 'COLOMBIA', 'ECUADOR', 'PERU', 'BOLIVIA', 'PARAGUAY', 'URUGUAY', 'MEXICO', 'PANAMA'];
let btnNewWord = document.querySelector("#new-word");
let inputNewWord = document.querySelector("#input-new-word");
let spanErrorMsg = document.querySelector(".message");
let footer = document.querySelector("#footer");
let btnReset = document.querySelector("#reset-game");
let hangedCnv = document.querySelector("#hanged");
let btnModalYes = document.querySelector("#btn-yes");
let btnModalNo = document.querySelector("#btn-no");

const POSIBILITIES = 8;
let round = 0;
let secretWord;
let letterPositions = [];
let lettersCheck = [];
let wrongLetters = [];
let isGameFinished = false;

// Event click btn StartGame
btnStartGame.addEventListener("click", () => {
    startGame();
});

//Event click button. Validate input newWord
btnNewWord.addEventListener("click", () => {
    spanErrorMsg.classList.remove("error");
    let newWord = inputNewWord.value;
    let reg = /^[A-Za-z]+$/;

    if(!newWord.match(reg)){
        spanErrorMsg.classList.add("error");
        return;
    }
    newWord = newWord.toUpperCase();
    secretsWords.push(newWord);
    inputNewWord.value = "";
    $("#myModal").modal('show');
});

//Event click button Reset
btnReset.addEventListener("click", () =>{
    location.reload();
});

//Event click button Modal
btnModalYes.addEventListener('click', () => {
    let chooseWord = secretsWords[secretsWords.length - 1].split("");
    $("#myModal").modal('hide');
    startGame(chooseWord);
});

btnModalNo.addEventListener('click', () =>{
    $("#myModal").modal('hide');
});

//Function to start game
function startGame(selectedWord = null){
    isGameFinished = false;
    resetGame();
    clearCanvas();
    createBaseHanged();
    secretWord = selectedWord ?? chooseRandomWord();
    createLinesWord(secretWord);
    document.addEventListener("keyup", detectKeyPress); 
}

//Function to generate random number
function generateRandomNumber(maxArray){
    return Math.floor(Math.random() * maxArray);
}

//Function to select secret word from array of secretsWords
function chooseRandomWord(){
    let randomIndex = generateRandomNumber(secretsWords.length);
    return secretsWords[randomIndex].split("");
}

//Detect function to detectKeyPress
function detectKeyPress(e){  
    if(!validateKey(e.keyCode)){
        return;
    }
    let letterOk = e.key.toUpperCase();
    
    if(isLetterInArray(letterOk, lettersCheck) || isLetterInArray(letterOk, wrongLetters)){
        return;
    }
    let stateFlag = isLetterInSecretWord(letterOk);
    if(!stateFlag){
        wrongChoose(letterOk);
        showWrongLetter(letterOk);
        drawHangedPart(round);
        checkLoose();
        return;
    } 
    showHitLetter(letterOk, letterPositions);
    checkWin();
}

//Function to detect if key is a letter with keyCode
function validateKey(letterCode){
    if(letterCode >= 65 && letterCode <= 90 || letterCode == 186){
        return true;
    }
}

//Function to check if the letter is in the secret word.
//In case the letter is in the secret word.
//Save the letter and the position in the array.
function isLetterInSecretWord(letter){
    let flag = false;
    letterPositions = [];
    secretWord.forEach((element, index) => {
        if(element == letter){
            flag = true;
            lettersCheck.push(element);
            letterPositions.push(index);  
        }    
    });
    return flag;
} 

//Function to validate if letter is in array
function isLetterInArray(letter, array){
    if(array.indexOf(letter) == -1){
        return false;
    }
        return true;
}

//Function to increment the round and save the wrong letter.
function wrongChoose(letter){
    round++;
    wrongLetters.push(letter);
}

//Function to check that the user has lost.
function checkLoose(){
    if(round > POSIBILITIES){
        isGameFinished = true;
        showLooseMessage(secretWord);
        removeKeyUpListener();
        showBtnReset();
    }
}

//Function to check that the user has won.
function checkWin(){
    if(lettersCheck.length == secretWord.length){
        isGameFinished = true;
        showWinMessage();
        removeKeyUpListener();
        showBtnReset();
    }
}

//Function to remove listener for keyup event.
function removeKeyUpListener(){
    document.removeEventListener('keyup', detectKeyPress);
}

//Function to reset variables
function resetGame(){
    round = 0;
    secretWord = [];
    letterPositions = [];
    lettersCheck = [];
    wrongLetters = [];
    inputNewWord.value = "";
    spanErrorMsg.classList.remove("error"); 
    btnReset.classList.remove("visible");
    isGameFinished = false;
    hangedCnv.classList.add("hanged-visible");
}

//Function to show reset button when the game is finished
function showBtnReset(){
    btnReset.classList.add("visible");  
}

//Function to remove keyup listener on focus in
function inputFocusIn(){
    removeKeyUpListener();
}

//Function to add keyup listener on focus out
function inputFocusOut(){
    if(!isGameFinished ){
    document.addEventListener("keyup", detectKeyPress); 
    };
}

//Set focus on input new word
window.onload = function(){
    inputNewWord.focus();
};







