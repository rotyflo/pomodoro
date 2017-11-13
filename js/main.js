let timeDisplay = document.getElementById("time-display");
let seconds = 10;
let countDown = setInterval(timer, 1000);

function timer() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60 < 10 ? "0" + seconds % 60 : seconds % 60;
  let time = `${m}:${s}`;

  if (seconds === 0) {
    clearInterval(countDown);
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

