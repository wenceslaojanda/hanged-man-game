let hanged = document.querySelector("#hanged");
let pincel = hanged.getContext("2d");

let xInicialWrongLetter = 280;
let yInicialWrongLetter = 250;
let indexWrongLetter = 0;

pincel.lineWidth=6;
pincel.fillStyle="black";
pincel.font="bold 18px arial";
pincel.strokeStyle ="black";

//Function to create base of Hanged
function createBaseHanged(){
pincel.fillStyle='black';
pincel.beginPath();
pincel.moveTo(100, 380);
pincel.lineTo(50, 400);
pincel.lineTo(150, 400);
pincel.lineTo(100, 380);
pincel.fill();
}

//Function to create lines of the letters of the secret word
function createLinesWord(word){
    let xInicial = 180;
    let yInicial = 400;


    for(let i=0; i < word.length; i++){
        pincel.moveTo(xInicial, yInicial); 
        pincel.lineTo(xInicial + 20, yInicial);
        pincel.stroke();
        xInicial += 30;
    }
}

//Function to clear Canvas
function clearCanvas(){
    indexWrongLetter = 0;
    pincel.clearRect(0,0,600,400);
    hanged.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
}

//Function to display the correct letter on the screen
function showHitLetter(letter, arrPositions){
    let yInicial = 395;
    arrPositions.forEach((position) => {
        let xInicial = 183;
        console.log(letter, position);
        xInicial += (30 * position);
        pincel.fillText(letter,xInicial,yInicial);
    });
}

//Function to display the wrong letter on the screen
function showWrongLetter(wrongLetter){
    
    xInicialWrongLetter += (20 * indexWrongLetter);
    pincel.fillText(wrongLetter,xInicialWrongLetter,yInicialWrongLetter);
    xInicialWrongLetter = 280;
    indexWrongLetter++;
}

//Function to draw different part of the Hanged
function drawHangedPart(round){
    switch(round){
        case 1: 
            onePart();
            break;
        case 2: 
            twoPart();
            break;
        case 3: 
            threePart();
            break;
        case 4: 
            fourPart();
            break;
        case 5: 
            fivePart();
            break;
        case 6: 
            sixPart();
            break;
        case 7: 
            sevenPart();
            break;
        case 8: 
            eightPart();
            break;
        case 9: 
            ninePart();
            break;
    }
}

//Function to draw part 1 of the Hanged
function onePart(){
    pincel.moveTo(100,80);
    pincel.lineTo(100,380);
    pincel.stroke();
}

//Function to draw part 2 of the Hanged
 function twoPart(){
    pincel.moveTo(97,80);
    pincel.lineTo(200,80);
    pincel.stroke();
 }

//Function to draw part 3 of the Hanged
function threePart(){
    pincel.moveTo(197,80);
    pincel.lineTo(197,120);
    pincel.stroke();
}

//Function to draw part 4 of the Hanged
function fourPart(){
    pincel.beginPath();
    pincel.arc(197,150,30, 0, 2*Math.PI);
    pincel.stroke();
}

//Function to draw part 5 of the Hanged
function fivePart(){
    pincel.moveTo(197,180);
    pincel.lineTo(197,280);
    pincel.stroke();
}

//Function to draw part 6 of the Hanged
function sixPart(){
    pincel.moveTo(140,340);
    pincel.lineTo(197,278);
    pincel.stroke();
}

//Function to draw part 7 of the Hanged
function sevenPart(){
    pincel.moveTo(254,340);
    pincel.lineTo(197,278);
    pincel.stroke();
}

//Function to draw part 8 of the Hanged
function eightPart(){
    pincel.moveTo(140,180);
    pincel.lineTo(197,230);
    pincel.stroke();
}

//Function to draw part 9 of the Hanged
function ninePart(){
    pincel.moveTo(254,180);
    pincel.lineTo(197,230);
    pincel.stroke();
}

//Function to show message if lost
function showLooseMessage(secretWord){
    let msgError = "YOU LOST!!!";
    secretWord = secretWord.join('');
    let word = 'THE WORD WAS: ' + secretWord;
    xInicial = 300;
    yInicial = 210;
    pincel.fillStyle="salmon";
    pincel.fillText(msgError,xInicial,yInicial);
    pincel.fillStyle="salmon";
    pincel.fillText(word,xInicial - 50,yInicial + 80);
}

//Function to show message if won
function showWinMessage(){
    let msgWin = "YOU WON!!!";
    xInicial = 300;
    yInicial = 200;
    pincel.fillStyle="#114B5F";
    pincel.fillText(msgWin,xInicial,yInicial);
}
