import Move from './move.js';

var soundsdir = '../sounds/';

var arrPunches = [
  "left-hook",
  "jab",
  "left-uppercut",

  "right-hook",
  "right-straight",
  "right-uppercut",

  "1-2",
  "1-2-3"
]

var trainerSettings = {
  name: "default",
  voice: "robot",
  moveIntervalSeconds: 2,
  roundTimeSeconds: 60,
  breakTimeSeconds: 15,
  countdownSeconds: 4,
  roundCount: 5,
  currentRound: 0,
  paused: false,
  speed: 1.5
};

var dictPunches = {};
var trainerStarted = 0;
var unpausedText = "";

//controls
var startButton = document.getElementById("StartTrainer");
var trainerStageText = document.getElementById("trainerStageText");
var trainerTimerText = document.getElementById("trainerTimer");
var moveOptions = document.getElementsByClassName("trainer-option");

//timers
var trainerTimer = new easytimer.Timer();
var countdownTimer = new easytimer.Timer();
var roundTimer = new easytimer.Timer();
var breakTimer = new easytimer.Timer();

var trainerStages = {
  Stopped: "Stopped",
  Countdown: "Countdown",
  Round: "Round",
  Break: "Break"
};

var trainerStage = trainerStages.Stopped;

trainerTimer.addEventListener('targetAchieved', timerEnded);
trainerTimer.addEventListener('secondsUpdated', timerSecondsUpdate);
trainerTimer.addEventListener('started', timerStarted);
startButton.addEventListener("click", startTrainer, false);

//----------
//Event Listeners for updating the boxing trainer settings
//----------

var roundCount = document.getElementById("input-roundCount");
roundCount.value = trainerSettings.roundCount;
roundCount.addEventListener("change", (e) =>{
  trainerSettings.roundCount = e.target.value;
})

var roundTime = document.getElementById("input-roundTime");
roundTime.value = trainerSettings.roundTimeSeconds;
roundTime.addEventListener("change", (e) =>{
  trainerSettings.roundTimeSeconds = e.target.value;
})

var breakTime = document.getElementById("input-breakTime");
breakTime = trainerSettings.breakTimeSeconds;
breakTime.addEventListener("change", (e) =>{
  trainerSettings.breakTimeSeconds = e.target.value;
})

for(let option of moveOptions){
  option.addEventListener("click", clickMoveOptions, false);
}

setupDictionaries();
console.log(dictPunches);

function startTrainer() {
  var getReady = new Howl({
    src: soundsdir + trainerSettings.voice + "/get-ready.mp3",
    rate: trainerSettings.speed,
    html5: true
  });
  if (trainerStage == trainerStages.Stopped) {

    trainerStageText.innerHTML = "Get Ready!";
    getReady.play();


    trainerTimer.start({
      countdown: true,
      startValues: { seconds: trainerSettings.countdownSeconds }
    });
    trainerStage = trainerStages.Countdown;
  } else {

    if (trainerSettings.paused) {
      trainerTimer.start();
      trainerStageText.innerHTML = unpausedText;
      trainerSettings.paused = false;

    } else {
      unpausedText = trainerStageText.innerHTML;
      trainerStageText.innerHTML = "Paused";
      trainerSettings.paused = true;
      trainerTimer.pause();
    }

  }  

  trainerStarted ^= 1;
  startButton.children[0].classList.toggle('fa-play');
  startButton.children[0].classList.toggle('fa-pause');
  startButton.classList.toggle("bg-success");
  startButton.classList.toggle("bg-danger");

  if (trainerStarted) {
    startButton.children[1].innerHTML = "Stop";
  } else {
    startButton.children[1].innerHTML = "Start";
    roundTimer.pause();
  }

}

function clickMoveOptions(){
  this.classList.toggle("option-selected");
}

function announceRandomMove() {
  var item = arrPunches[Math.floor(Math.random() * arrPunches.length)];
  dictPunches[item].announce();
}

function announceRandomCombo(){

}

function setupDictionaries() {
  arrPunches.forEach(function (item) {
    dictPunches[item] = new Move(item, soundsdir + trainerSettings.voice + "/" + item + ".mp3", trainerSettings.speed);
  });
}

//NEW

function timerStarted()
{

  switch (trainerStage) {
    case trainerStages.Countdown:
      // code block
      break;
    case trainerStages.Round:
      // code block
      break;
    case trainerStages.Break:
      // code block
      break;
  }
}

function timerSecondsUpdate() {
  trainerTimerText.innerHTML = trainerTimer.getTimeValues().toString();

  if (trainerStage == trainerStages.Round) {
    if (Number.isSafeInteger(trainerTimer.getTimeValues().seconds / trainerSettings.moveIntervalSeconds)) {
      announceRandomMove();
    }
  }

}

function timerEnded() {

  switch (trainerStage) {

    //When countdown ends, start round timer
    case trainerStages.Countdown:

      trainerStage = trainerStages.Round;
      trainerSettings.currentRound++;
      trainerStageText.innerHTML = "Round " + trainerSettings.currentRound;
      trainerTimer.start({
        countdown: true,
        startValues: { seconds: trainerSettings.roundTimeSeconds }
      });
      break;

    case trainerStages.Round:
      if (trainerSettings.currentRound != trainerSettings.roundCount) {

        trainerStage = trainerStages.Break;
        trainerStageText.innerHTML = "Break!";
        trainerTimer.start({
          countdown: true,
          startValues: { seconds: trainerSettings.breakTimeSeconds }
        });
      }
      break;

    case trainerStages.Break:

      trainerStage = trainerStages.Countdown;
      trainerStageText.innerHTML = "Get Ready!";
      trainerTimer.start({
        countdown: true,
        startValues: { seconds: trainerSettings.countdownSeconds }
      });
      break;
  }
}