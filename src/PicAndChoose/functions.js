//{{{variable declarations
"use strict";
let bgX;
let scaleX, scaleY;
let imgSet;
let imgIndex=0;
let assetDir, sourceDir;
let mainImg;
let pickSound;
//}}}variable declarations

//{{{event listeners
window.onload = initWin();
window.addEventListener("resize", initWin);
window.addEventListener("keydown", evalKeyDown, false); //capture keypress on bubbling (false) phase
function evalKeyDown(evnt) {
    let keyPressed = evnt.keyCode;
    console.log ("keyDn: ",keyPressed);
    switch (keyPressed) {
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
    imgSet = [
                "1_bread1.jpg",
                "2_cookie1.jpg",
                "3_bread2.jpg",
                "4_cookie2.jpg",
                "5_cookie3.jpg",
                "6_bread3.jpg",
                "7_bread4.jpg",
                "8_cookie4.jpg",
                "9_bread5.jpg",
                "10_cookie5.jpg",
    ""]; //imgSet

    pickSound = new sound(sourceDir+"wav/pick.mp3");
}, 3);//setTimeOut (function()
};//document.getElementById ... wait for element before loading
} //function initWin()

//}}}window init

//{{{handler functions
function viewNextImg(inc) {
    imgIndex=imgIndex+inc;
    if (imgIndex<0) imgIndex = imgSet.length-2;
    else if (imgSet[imgIndex]=="") imgIndex = 0;

    let imgSrc =(assetDir+imgSet[imgIndex]);
    //console.log("index: "+imgIndex);
    //console.log("image: "+imgSrc);

    pickSound.start();
    mainImg.src = imgSrc;
} //function vewNextImg(inc)

//}}}handler functions

//{{{helper functions
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
