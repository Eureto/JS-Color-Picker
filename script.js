let lockPosition = 0;
let redLocked, greenLocked, blueLocked;
let red, green, blue;

function main(e) {
    //pozycja kursora względem viewportu podana w px   
    let cursorWidth = e.clientX;
    let cursorHeight = e.clientY;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    //(question)?(result if true):(result is false)
    let smallerDimension = (windowHeight < windowWidth) ? windowHeight : windowWidth;
    let biggerDimension = (windowHeight > windowWidth) ? windowHeight : windowWidth;
    // console.log("w: " + cursorWidth + "  h:" + cursorHeight);

    document.getElementById("brush").style.top = cursorHeight + "px";
    document.getElementById("brush").style.left = cursorWidth + "px";


    //Obliczanie dystansu od rogu 
    //Red = lewy bok 
    //Green = prawa gora 
    //Blue = prawy doł
    let redDistance = cursorWidth;
    // console.log("rD "+redDistance);

    let greenDistance = parseInt(Math.sqrt(Math.pow(cursorHeight, 2) + Math.pow(windowWidth - cursorWidth, 2)));
    // console.log("gD "+greenDistance);

    let blueDistance = parseInt(Math.sqrt(Math.pow(windowHeight - cursorHeight, 2) + Math.pow(windowWidth - cursorWidth, 2)));
    // console.log("bD "+blueDistance);

    let redColor = 255 - parseInt((redDistance * 255) / biggerDimension);
    let greenColor = 255 - parseInt((greenDistance * 255) / smallerDimension);
    let blueColor = 255 - parseInt((blueDistance * 255) / smallerDimension);

//zablokowanie koloru po naciśnięciu prawym przyciskiem myszy
    if (lockPosition == 0) {
        red = (redColor > 0) ? redColor : 0;
        green = (greenColor > 0) ? greenColor : 0;
        blue = (blueColor > 0) ? blueColor : 0;
    } else if (lockPosition == 1) {
        red = redLocked;
        green = (greenColor > 0) ? greenColor : 0;
        blue = (blueColor > 0) ? blueColor : 0;
    } else if (lockPosition == 2) {
        red = redLocked;
        green = greenLocked;
        blue = (blueColor > 0) ? blueColor : 0;

    } else if (lockPosition == 3) {
        red = redLocked;
        green = greenLocked;
        blue = blueLocked;
    }

    // console.log(`redP ${red} greenP ${green} blueP ${blue}`);

    document.body.style.backgroundColor = `rgb(${red},${green},${blue})`;

    document.getElementById("rgbaText").style.color = `rgb(${255-red},${255-green},${255-blue})`;
    document.getElementById("rgbaText").innerHTML = `rgb(${red}, ${green}, ${blue})`;
}

function copied() {
    let rgbtext = document.getElementById("rgbaText").innerHTML;
    //kopiowanie tekstu do schowka 
    navigator.clipboard.writeText(rgbtext);
    document.getElementById("copiedDiv").style.top = "5%";
    setTimeout(function () {
        document.getElementById("copiedDiv").style.top = "-20%";
    }, 2000);
}

function rightClick(e) {
    //zapobiega otwieraniu się menu kontekstowego tak jak to jest standardowo
    e.preventDefault();
    redLocked = red;
    blueLocked = blue;
    greenLocked = green;

    lockPosition++;
    if (lockPosition > 3) {
        lockPosition = 0;
    }
}