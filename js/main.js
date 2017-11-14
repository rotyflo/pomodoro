let tab = document.getElementById("tab");
let statusDisplay = document.getElementById("status-display");
let timeDisplay = document.getElementById("time-display");
let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let resetButton = document.getElementById("reset");
let decreaseWork = document.getElementById("decrease-work");
let increaseWork = document.getElementById("increase-work");
let decreaseBreak = document.getElementById("decrease-break");
let increaseBreak = document.getElementById("increase-break");
let workSetting = document.getElementById("work-setting");
let breakSetting = document.getElementById("break-setting");
let workTime = 1500;
let breakTime = 300;
let status = "work";
let seconds = workTime;
let countDown = null;

startButton.addEventListener("click", function () {
  countDown = setInterval(timer, 1000);
  startButton.style.display = "none";
  pauseButton.style.display = "inline";
});

pauseButton.addEventListener("click", function () {
  clearInterval(countDown);
  pauseButton.style.display = "none";
  startButton.style.display = "inline";
});

resetButton.addEventListener("click", function () {
  clearInterval(countDown);
  seconds = workTime;
  status = "work";
  tab.innerText = `[W] ${formatTime(seconds)}`;
  statusDisplay.innerText = "WORK";
  timeDisplay.innerText = formatTime(workTime);
  pauseButton.style.display = "none";
  startButton.style.display = "inline";
});

decreaseWork.addEventListener("click", function() {
  if (workSetting.innerText !== "01:00") {
    workTime -= 60;
    workSetting.innerText = formatTime(workTime);
    
    if (status === "work") {
      seconds -= 60;
      tab.innerText = `[W] ${formatTime(seconds)}`;
      timeDisplay.innerText = formatTime(seconds); 
    }
  }
});

increaseWork.addEventListener("click", function() {
  if (workSetting.innerText !== "99:00") {
    workTime += 60;
    workSetting.innerText = formatTime(workTime);
    
    if (status === "work") {
      seconds += 60;
      tab.innerText = `[W] ${formatTime(seconds)}`;
      timeDisplay.innerText = formatTime(seconds);
    }
  }
});

decreaseBreak.addEventListener("click", function() {
  if (breakSetting.innerText !== "01:00") {
    breakTime -= 60;
    breakSetting.innerText = formatTime(breakTime);
    
    if (status === "break") {
      seconds -= 60;
      tab.innerText = `[B] ${formatTime(seconds)}`;
      timeDisplay.innerText = formatTime(seconds);
    }
  }
});

increaseBreak.addEventListener("click", function() {
  if (breakSetting.innerText !== "99:00") {
    breakTime += 60;
    breakSetting.innerText = formatTime(breakTime);
  
    if (status === "break") {
      seconds += 60;
      tab.innerText = `[B] ${formatTime(seconds)}`;
      timeDisplay.innerText = formatTime(seconds);
    }
  }
});

function timer() {
  if (seconds === 0) {
    if (status === "work") {
      status = "break";
      statusDisplay.innerText = "BREAK";
      seconds = breakTime;
    }
    else {
      status = "work";
      statusDisplay.innerText = "WORK";
      seconds = workTime;
    }

    beep();
  }

  tab.innerText = status === "work" ? `[W] ${formatTime(seconds)}` : `[B] ${formatTime(seconds)}`;
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

