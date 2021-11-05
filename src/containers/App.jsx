import React from 'react';
import {
  startTimer,
  pauseTimer,
  resetTimer,
  incrementWorkInterval,
  decrementWorkInterval,
  incrementBreakInterval,
  decrementBreakInterval,
  decrementTimer
} from '../actions';
import { connect } from 'react-redux';
import beepAudio from '../assets/beep.m4a';

class App extends React.Component {
  startPause(isPaused, startTimer, pauseTimer) {
    isPaused ? startTimer() : pauseTimer();
    document.getElementById('beep').play();
  }

  reset(resetTimer) {
    resetTimer();
    document.getElementById('beep').currentTime = 0;
    document.getElementById('beep').pause();
  }

  beep() {
    setTimeout(() => {
      document.getElementById('beep').muted = true
    }, 5000);
    document.getElementById('beep').muted = false;
  }

  render() {
    if (this.props.timer === 0) this.beep();

    return (
      <div className="container">
        <header><h3 className="logo">Pomodoro Timer</h3></header>
        <main>
          <section>
            <div class="terminal-card">
              <header id="timer-label">{this.props.status}</header>
              <div id="time-left">{this.props.displayMinutes}:{this.props.displaySeconds}</div>
              <audio id="beep" src={beepAudio} loop muted/>
            </div>
            <div class="btn-group controls">
              <button id="start_stop" class="btn btn-ghost" onClick={() => this.startPause(this.props.isPaused, this.props.startTimer, this.props.pauseTimer)}>{this.props.isPaused ? 'Start' : 'Pause'}</button>
              <button id="reset" class="btn btn-ghost" onClick={() => this.reset(this.props.resetTimer)}>Reset</button>
            </div>
          </section>
          <br />
          <br />
          <section>
            <fieldset>
              <legend>Settings</legend>
              <div className="controls-container">
                <p id="session-label">Session Length</p>
                <div class="btn-group settings">
                  <button id="session-decrement" class="btn btn-default btn-ghost" onClick={this.props.decrementWorkInterval}>-</button>
                  <button id="session-length" class="btn btn-ghost">{this.props.workInterval}</button>
                  <button id="session-increment" class="btn btn-default btn-ghost" onClick={this.props.incrementWorkInterval}>+</button>
                </div>
                <br /><br />
                <p id="break-label">Break Length</p>
                <div class="btn-group settings">
                  <button id="break-decrement" class="btn btn-default btn-ghost" onClick={this.props.decrementBreakInterval}>-</button>
                  <button id="break-length" class="btn btn-ghost">{this.props.breakInterval}</button>
                  <button id="break-increment" class="btn btn-default btn-ghost" onClick={this.props.incrementBreakInterval}>+</button>
                </div>
              </div>
            </fieldset>
          </section>
        </main>
      </div>
    );
  }
}

// connect to store
function mapStateToProps(state) {
  return {
    status: state.status,
    isPaused: state.isPaused,
    workInterval: state.workInterval,
    breakInterval: state.breakInterval,
    displaySeconds: state.timer % 60 < 10 ? "0" + state.timer % 60 : state.timer % 60,
    displayMinutes: Math.floor(state.timer / 60) < 10 ? "0" + Math.floor(state.timer / 60) : Math.floor(state.timer / 60),
    timer: state.timer
  }
}

function mapDispatchToProps(dispatch) {
  let countdown = null;

  return {
    startTimer: () => {
      countdown = setInterval(() => dispatch(decrementTimer()), 1000);
      dispatch(startTimer());
    },
    pauseTimer: () => {
      clearInterval(countdown);
      dispatch(pauseTimer());
    },
    resetTimer: () => {
      clearInterval(countdown);
      dispatch(resetTimer());
    },
    incrementWorkInterval: () => {
      dispatch(incrementWorkInterval());
    },
    decrementWorkInterval: () => {
      dispatch(decrementWorkInterval());
    },
    incrementBreakInterval: () => {
      dispatch(incrementBreakInterval());
    },
    decrementBreakInterval: () => {
      dispatch(decrementBreakInterval());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);