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

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <header><h3 className="logo">Pomodoro Timer</h3></header>
        <main>
          <section>
            <div class="terminal-card">
              <header>{this.props.status}</header>
              <div id="display">{this.props.displayMinutes}:{this.props.displaySeconds}</div>
            </div>
            <div class="btn-group controls">
              <button class="btn btn-ghost" onClick={this.props.startTimer} style={this.props.isPaused ? { display: 'initial' } : { display: 'none' }}>Start</button>
              <button id="pause-button" class="btn btn-ghost" onClick={this.props.pauseTimer} style={this.props.isPaused ? { display: 'none' } : { display: 'initial' }}>Pause</button>
              <button class="btn btn-ghost" onClick={this.props.resetTimer}>Reset</button>
            </div>
          </section>
          <br />
          <br />
          <section>
            <fieldset>
              <legend>Settings</legend>
              <div className="controls-container">
                <p>Work</p>
                <div class="btn-group settings">
                  <button class="btn btn-default btn-ghost" onClick={this.props.decrementWorkInterval}>-</button>
                  <button id="work-value" class="btn btn-ghost">{this.props.workInterval}</button>
                  <button class="btn btn-default btn-ghost" onClick={this.props.incrementWorkInterval}>+</button>
                </div>
                <br /><br />
                <p>Break</p>
                <div class="btn-group settings">
                  <button class="btn btn-default btn-ghost" onClick={this.props.decrementBreakInterval}>-</button>
                  <button id="break-value" class="btn btn-ghost">{this.props.breakInterval}</button>
                  <button class="btn btn-default btn-ghost" onClick={this.props.incrementBreakInterval}>+</button>
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
    displayMinutes: Math.floor(state.timer / 60) < 10 ? "0" + Math.floor(state.timer / 60) : Math.floor(state.timer / 60)
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