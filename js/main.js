let tab = document.getElementById("tab");
let statusDisplay = document.getElementById("status-display");
let timeDisplay = document.getElementById("time-display");
let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let resetButton = document.getElementById("reset");
let status = "work";
let seconds = null;
let countDown = null;

startButton.addEventListener("click", function () {
  countDown = setInterval(timer, 1000);
  startButton.style.display = "none";
  pauseButton.style.display = "inline";
  statusDisplay.innerText = (status === "work") ? "working" : "resting";
});

pauseButton.addEventListener("click", function () {
  clearInterval(countDown);
  pauseButton.style.display = "none";
  startButton.style.display = "inline";
  statusDisplay.innerText = "paused";
});

resetButton.addEventListener("click", function () {
  clearInterval(countDown);
  seconds = null;
  status = "work";
  tab.innerText = `(w) ${formatTime(seconds)}`;
  statusDisplay.innerText = "stopped";
  timeDisplay.innerText = "00:00";
  pauseButton.style.display = "none";
  startButton.style.display = "inline";
});

function timer() {
  if (seconds === null) seconds = getWorkTime();
  if (seconds === 0) {
    if (status === "work") {
      status = "break";
      statusDisplay.innerText = "resting";
      seconds = getBreakTime();
    }
    else {
      status = "work";
      statusDisplay.innerText = "working";
      seconds = getWorkTime();
    }

    beep();
  }

  tab.innerText = status === "work" ? `(w) ${formatTime(seconds)}` : `(b) ${formatTime(seconds)}`;
  timeDisplay.innerText = formatTime(seconds);
  seconds--;
}

function formatTime(seconds) {
  let m = Math.floor(seconds / 60) < 10 ? "0" + Math.floor(seconds / 60) : Math.floor(seconds / 60);
  let s = seconds % 60 < 10 ? "0" + seconds % 60 : seconds % 60;
  return `${m}:${s}`;
}

function beep() {
  let context = new AudioContext();
  let o = context.createOscillator();
  o.type = "sine";
  o.connect(context.destination);
  o.start();
  o.stop(1);
}

function getWorkTime() {
  return document.getElementById("work-setting").value * 60;
}

function getBreakTime() {
  return document.getElementById("break-setting").value * 60;
}