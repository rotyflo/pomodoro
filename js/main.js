let tab = document.getElementById("tab"),
    statusDisplay = document.getElementById("status-display"),
    timeDisplay = document.getElementById("time-display"),
    startButton = document.getElementById("start"),
    pauseButton = document.getElementById("pause"),
    resetButton = document.getElementById("reset"),
    status = "work",
    seconds = null,
    countDown = null;

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

function getWorkTime() {
  return document.getElementById("work-slider").value * 60;
}

function getBreakTime() {
  return document.getElementById("break-slider").value * 60;
}

["work", "break"].forEach(function(name) {
  document.getElementById(`${name}-slider`).oninput = function() {
    document.getElementById(`${name}-value`).innerText = this.value;
  };
});

