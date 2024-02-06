const theTimer=document.querySelector(".timer");        // Timer Html  
const theTexter = document.querySelector('#test-area'); // Text Area 
const buttonReset = document.querySelector('#reset');   // Reset button  
const textPettern = document.querySelector('#pattern-text'); // Pettern Text 
const testWrapper = document.querySelector('.test-wrapper'); // border of text area 
var checkTimer = 1;  // For check Timer every Time 
var timer=[0,0,0,0]; // minute / second  / msecond /
var timerBox ;  // interval Timer 
var checkText; // interval compare passages  
theTexter.value = "";
var deleteText = false ; 
var color ; 
var mistake = false ; 
// ---------------------------  Create Timer --------------------------------- 


function leadingZero(time) {

    if (time  < 10 ) {
        time = "0"+time;
    }
    return time ; 

} 

function runTimer(){
    let currentTime= leadingZero(timer[0])+":"+leadingZero(timer[1])+":"+leadingZero(timer[2]);
    theTimer.innerHTML=currentTime;

    // Set Timer 
    timer[3]++;
    timer[0]=Math.floor((timer[3]/100)/60);
    timer[1]=Math.floor(timer[3]/100)-(timer[0]*60);
    timer[2]=Math.floor(timer[3] - (timer[1]*100) - (timer[0]*6000));

}

// Call Runtimer function every 10 millisecond ; 



// ------------------------- sync Timer and Texter ---------------------------
// Function for syncn it   
function StartFunction(run){
    if (checkTimer == 1 ) {
        timerBox = setInterval(runTimer,10) ; 
        checkText = setInterval(CheckText,10);
        checkTimer++; 
    }
}
// if user type somthing in textarea  
theTexter.addEventListener('keypress',StartFunction);


// ------------------------ restart button -----------------------------------
// reset functino for reset Timer  
function resetFunction(deleteText) {
    // clear timer 
    theTexter.disabled = false;
    clearInterval(timerBox);
    clearInterval(checkText);
    if (deleteText == true) {
        checkTimer = 1 ; 
        theTimer.innerHTML = "00:00:00";
        // Clean text area 
        theTexter.value = "";
        changeBorderColor('grey');
        document.querySelector('#type-speed').innerHTML = "0 <span class='detail'>Word/Second</span>";
    }else {
        checkTimer = 1; 
        theTexter.disabled = true;
        SpeedType();
    }
}

buttonReset.addEventListener('click',function () {resetFunction(true)}); 


// ---------------------------- check type speed ---------------------------------
function CheckText() {
    // Check letter by letter typist and text pattern 
    for (let i=0 ; i < theTexter.value.length ; i++ ){;
        if (theTexter.value[i] != textPettern.innerHTML[i]){
            changeBorderColor('red');
            mistake = true ; 
            break ; 
        }
    }
    if (mistake == false ) {
        changeBorderColor('grey');
    }
    mistake = false ; 
    // -------------------------------------------------


    if (textPettern.innerHTML == theTexter.value) {
        resetFunction(false);
        changeBorderColor('green');
    }
}
// function for change color 
function changeBorderColor(color) { 
    testWrapper.style.borderColor = color;
}


// function for calculate speed type 
function SpeedType(){
    // Len / time(s) 
    let lenText = textPettern.innerHTML.length; 
    // Convert to seconds
    let totalSeconds = (timer[0] * 60) + timer[1] + (timer[2] / 1000); 
    let speed = lenText / totalSeconds;
    speed = Math.floor(speed);
    var dateSpan = document.createElement('span');
    dateSpan.innerHTML = "Word/Second";
    dateSpan.style.fontSize = '12px';
    document.querySelector('#type-speed').innerHTML = speed + " " + dateSpan.outerHTML; 
}
