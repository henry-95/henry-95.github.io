
let mainContainer = document.getElementById("main");
const board = document.getElementById("chessboard");

let ranks = [8,7,6,5,4,3,2,1];
let files = ["a","b","c","d","e","f","g","h"];

let lightSquare = document.createElement("div");
let darkSquare = document.createElement("div");
let startButton = document.getElementById("startGame");
let boardText = document.getElementById("boardText");
let boardTopText = document.getElementById("boardTopText");

//Game vars
let score = 0;
let highscore = 0;
let lives = 3;
let gameTimer = new easytimer.Timer();
let countdownTimer = new easytimer.Timer();
let gameType = "rank";
let gameActive = false;
let question = null;
let answer = null;

//Sounds
let correctSound = new Howl({
    src: ['../sounds/chess/correct.wav'],
    rate: 1,
})

let wrongSound = new Howl({
    src: ['../sounds/chess/wrong.wav'],
    rate: 1,
})


//Event Listeners
startButton.addEventListener("click", startGame);
lightSquare.classList.add("square", "light");
darkSquare.classList.add("square", "dark");

createBoard(board);

function createBoard(board){
    for(let x = 0; x < ranks.length; x++)
    {
        for(let y = 0; y < files.length; y++)
        {
            const square = document.createElement("div");
            square.classList.add("square", "file-" + files[y], "rank-" + ranks[x]);
            if((x+y) % 2 == 0)
            {
                square.classList.add("light");
            }else{
                square.classList.add("dark");
            }
            //square.addEventListener("mouseover", hoverSquare);
            //square.addEventListener("mouseout", onMouseOutSquare);
            square.addEventListener("click", onSquareClick);
            
            board.append(square);
        }
    }
}

function hoverSquare(e)
{
    let square = e.srcElement;
    let classes = square.classList;
    let fileClass = classes[1];
    let rankClass = classes[2];

    let file = document.getElementsByClassName(fileClass);
    let rank = document.getElementsByClassName(rankClass);
    Array.from(rank).forEach((x) => {
        x.classList.add("hover");
    });

    Array.from(file).forEach((x) => {
        x.classList.add("hover");
    });
}

function onMouseOutSquare(e)
{
    let square = e.srcElement;
    let classes = square.classList;
    let fileClass = classes[1];
    let rankClass = classes[2];
    
    let file = document.getElementsByClassName(fileClass);
    let rank = document.getElementsByClassName(rankClass);
    Array.from(rank).forEach((x) => {
        x.classList.remove("hover");
    });
    Array.from(file).forEach((x) => {
        x.classList.remove("hover");
    });
}

function onSquareClick(e)
{
    let square = e.srcElement;
    let classes = square.classList;
    let fileClass = classes[1];
    let rankClass = classes[2];

    if(gameActive)
    {
        if(gameType == "both"){
            if(square.classList.contains("file-" + question[0]) && square.classList.contains("rank-" + question[1]))
            {
                score++;
                correctSound.play();
            }else
            {
                lives--;
                wrongSound.play();
            }
        }else{
            if(square.classList.contains(gameType + "-" + question))
            {
                score++;
                correctSound.play();
            }else{
                lives--;
                wrongSound.play();
            }
        }
        if(lives <= 0)
        {
            gameOver();
        }else{
            setQuestion();
            boardTopText.innerHTML = "Lives : " + lives + ", Score: " + score;
        }
    }
}

function startGame()
{
    let gameLoopTimer = new easytimer.Timer();
    gameType = document.querySelector("input[name='ranks-or-files']:checked").value;
    
    console.log("starting with gametype " + gameType);
    countdownTimer.addEventListener('secondsUpdated', function (e) {
        boardText.innerHTML = countdownTimer.getTimeValues().seconds;
    });

    countdownTimer.start({
        precision: 'seconds',
        countdown: true,
        startValues:{
            seconds: 4
        }
    });

    countdownTimer.addEventListener('targetAchieved', function (e) {
        gameLoopTimer.start({
            precision: 'seconds',
            countdown: true,
            startValues:{
                seconds: 30
            }
        });
        gameActive = true;
        setQuestion();
    });

    gameLoopTimer.addEventListener('targetAchieved', function (e) {
        gameActive = false;
        boardText.innerHTML = "Total Score: " + score;
        if(score > highscore)
        {
            highscore = score;
            boardTopText += " High Score: " + highscore;
        }
    });


    console.log("Starting a game with " + gameType);
}

function randomRankOrFile(array)
{
    let randomRankNumber = Math.floor(Math.random() * ranks.length);
    let randomFileNumber = Math.floor(Math.random() * ranks.length);
    console.log(randomRankNumber + " " + randomFileNumber);

    let newQuestion = array[randomFileNumber];
    if(newQuestion == question)
    {
        randomRankOrFile(array)
    }else
    {
        return newQuestion;
    }
}

function randomCoordinate(ranks, files)
{
    let newRank = ranks[Math.floor(Math.random() * ranks.length)];
    let newFile = files[Math.floor(Math.random() * files.length)];
    if(question == newFile + newRank)
    {
        randomCoordinate(ranks, files);
    }else{
        return newFile + newRank;
    }

}

function setQuestion(){
    if(gameType == "rank"){
        question = randomRankOrFile(ranks);
    }else if(gameType == "file"){
        question = randomRankOrFile(files);
    }else{
        question = randomCoordinate(ranks, files);
    }

    boardText.innerHTML = question;
}

function gameOver()
{
    gameActive = false;
    if(score > highscore)
    {
        highscore = score;
        boardText.innerHTML = "New High Score! <br /> Score: " + score;
    }else{
        boardText.innerHTML = "Score: " + score;
    }
}