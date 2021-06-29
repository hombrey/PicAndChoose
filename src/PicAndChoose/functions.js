//{{{variable declarations
"use strict";
let bgX;
let scaleX, scaleY;
let promptSet;
let choices;
let imgIndex=0;
let assetDir, sourceDir;
let mainImg;
let pickSound;
let tingSound;
let errSound;
let activeNum=1;
//}}}variable declarations


//{{{class declarations
class PromptString  {
    constructor(text,ans){
        this.txt = text;
        this.ans = ans;
    } //constructor
} //class SmartString
//}}}class declarations

//{{{event listeners
window.onload = initWin();
window.addEventListener("resize", initWin);
window.addEventListener("keydown", evalKeyDown, false); //capture keypress on bubbling (false) phase
function evalKeyDown(evnt) {
    let keyPressed = evnt.keyCode;
    //console.log ("keyDn: ",keyPressed);
    switch (keyPressed) {
        case 49 : evalChosen(1); break; //key: 1
        case 50 : evalChosen(2); break; //key: 2
        case 51 : evalChosen(3); break; //key: 3
        case 52 : evalChosen(4); break; //key: 4
        case 38 : viewNextImg(-1); 
                  break; //key: <up>
        case 40 : viewNextImg(1); 
                  break; //key: <down>
        case 27 : parent.focus(); break; //key: Escape --This gives control back to reveal.js when in an iframe 
        default : return;
    } //switch (keyPressed)
} //evalKey(event)
//}}}event listeners

//{{{initializations

//make sure elements are loaded before proceeding
function initWin() {
document.getElementById('backgroundX').onload = function () { //wait for element before loading
setTimeout (function() { //set delay before calculating drawable parameters
    //Get a reference to the canvas
    bgX = document.getElementById('backgroundX');


    //Get project source
    sourceDir = document.getElementById("srcDir").innerHTML;
    //Get project source
    assetDir = document.getElementById("assetDir").innerHTML;

    //Get centered image 
    mainImg = document.getElementById("mainImg");

    scaleX = bgX.clientWidth/bgX.naturalWidth;
    scaleY = bgX.clientHeight/bgX.naturalHeight;

    choices = [
            document.getElementById('choice1'),
            document.getElementById('choice2'),
            document.getElementById('choice3'),
            document.getElementById('choice4')
    ]; //choices

    choices[1-1].resetY = "1vh";
    choices[1-1].resetX = "1vw";
    choices[2-1].resetY = "1vh";
    choices[2-1].resetX = "84vw";

    choices[3-1].resetY = "84vh";
    choices[3-1].resetX = "1vw";
    choices[4-1].resetY = "84vh";
    choices[4-1].resetX = "84vw";


    pickSound = new sound(sourceDir+"wav/pick.mp3");
    tingSound = new sound(sourceDir+"wav/ting.mp3");
    errSound = new sound(sourceDir+"wav/err.mp3");

    document.getElementById("dummy").focus(); //dummy select element that grabs the focus of the iframe
}, 10);//setTimeOut (function()
};//document.getElementById ... wait for element before loading
} //function initWin()

//}}}initializations

//{{{handler functions
function viewNextImg(inc) {
    imgIndex=imgIndex+inc;
   
    resetPosition(); 
    if (imgIndex<0) imgIndex = promptSet.length-2;
    else if (promptSet[imgIndex].txt=="") imgIndex = 0;

    let imgSrc =(assetDir+promptSet[imgIndex].txt);
    //console.log("index: "+imgIndex);
    //console.log("image: "+imgSrc);

    pickSound.start();
    mainImg.src = imgSrc;
} //function vewNextImg(inc)
function evalClick(clicked_id) {
    let extractIdNum = (clicked_id.replace("choice",""));
    let clickedNum = parseInt(extractIdNum);
    //console.log ("clicked:"+clickedNum); 
    evalChosen(clickedNum);
} //function evalClick(clicked_id)

function evalChosen(numChosen) {
    resetPosition(); //reset previous active number before switching
    activeNum = numChosen;
    choices[numChosen-1].style.top= '43vh';
    choices[numChosen-1].style.left= '43vw';

    if (numChosen == promptSet[imgIndex].ans) {
        tingSound.start();
    }// if (numChosen == promptSet)
    else {
        errSound.start();
        setTimeout (function () {
            resetPosition(); 
        }, 400); //setTimeOut
    } // else [of if numChosen == promptSet]

} //function evalChosen(numChosen)

//}}}handler functions

//{{{helper functions
function resetPosition() {
            choices[activeNum-1].style.top= choices[activeNum-1].resetY;
            choices[activeNum-1].style.left= choices[activeNum-1].resetX; 
} //function resetPosition()
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.start = function(){
        this.sound.pause();
        this.sound.currentTime = 0;
        this.sound.play();
    } //this.start = function(){
    this.play = function(){
        this.sound.play();
    } //this.play = function(){
    this.stop = function(){
        this.sound.pause();
        this.sound.currentTime = 0;
    }//this.stop = function(){    
}//function sound(src)

function insertCss( code ) {
    var style = document.createElement('style');
    style.innerHTML = code;

    document.getElementsByTagName("head")[0].appendChild( style );
} //function insertCss( code)

//}}}helper functions
