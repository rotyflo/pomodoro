let timeDisplay = document.getElementById("time-display");
let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let resetButton = document.getElementById("reset");
let workTime = 8;
let breakTime = 2;
let status = "work";
let seconds = workTime;
let countDown = null;

startButton.addEventListener("click", function() {
  countDown = setInterval(timer, 1000);
  startButton.style.display = "none";
  pauseButton.style.display = "inline";
});

pauseButton.addEventListener("click", function() {
  clearInterval(countDown);
  pauseButton.style.display = "none";
  startButton.style.display = "inline";
});

resetButton.addEventListener("click", function() {
  clearInterval(countDown);
  timeDisplay.innerText = "25:00";
  seconds = 1500;
  pauseButton.style.display = "none";
  startButton.style.display = "inline";
});

function timer() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60 < 10 ? "0" + seconds % 60 : seconds % 60;
  let time = `${m}:${s}`;

  if (seconds === 0) {
    if (status === "work") {
      status = "break";
      seconds = breakTime;
    }
    else {
      status = "work";
      seconds = workTime;
    }
    beep();
  }

  timeDisplay.innerText = time;
  seconds--;
}

function beep() {
  let context = new AudioContext();
  let o = context.createOscillator();
  o.type = "sine";
  o.connect(context.destination);
  o.start();
  o.stop(1);
}

