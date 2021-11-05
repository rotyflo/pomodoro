import {
	START_TIMER,
	PAUSE_TIMER,
	RESET_TIMER,
	INCREMENT_WORK_INTERVAL,
	DECREMENT_WORK_INTERVAL,
	INCREMENT_BREAK_INTERVAL,
	DECREMENT_BREAK_INTERVAL,
	DECREMENT_TIMER
} from '../actions';

let initializedState = {
	isWorking: true,
	status: 'Stopped',
	timer: 25 * 60,
	isPaused: true,
	workInterval: 25,
	breakInterval: 5,
	isInitiated: false
}

export default function appReducer(state = initializedState, action) {
	let updatedTimer = null;
	let updatedWorkInterval = null;

	switch (action.type) {
		case START_TIMER:
			return Object.assign({}, state, {
				status: state.isWorking ? 'Work' : 'Break',
				isPaused: false,
				isInitiated: true
			});
		case PAUSE_TIMER:
			return Object.assign({}, state, {
				status: 'Paused',
				isPaused: true
			});
		case RESET_TIMER:
			return Object.assign({}, state, initializedState);

		case INCREMENT_WORK_INTERVAL:
			if (state.workInterval > 59) return state;

			updatedTimer = state.timer;
			updatedWorkInterval = state.workInterval + 1;
			if (!state.isInitiated) updatedTimer = updatedWorkInterval * 60;
			return Object.assign({}, state, {
				workInterval: updatedWorkInterval,
				timer: updatedTimer
			});
		case DECREMENT_WORK_INTERVAL:
			if (state.workInterval < 2) return state;

			updatedTimer = state.timer;
			updatedWorkInterval = state.workInterval - 1;
			if (!state.isInitiated) updatedTimer = updatedWorkInterval * 60;
			return Object.assign({}, state, {
				workInterval: updatedWorkInterval,
				timer: updatedTimer
			});
		case INCREMENT_BREAK_INTERVAL:
			if (state.breakInterval > 59) return state;
			return Object.assign({}, state, {
				breakInterval: state.breakInterval + 1
			});
		case DECREMENT_BREAK_INTERVAL:
			if (state.breakInterval < 2) return state;
			return Object.assign({}, state, {
				breakInterval: state.breakInterval - 1
			});
		case DECREMENT_TIMER:
			let updatedStatus = state.status;
			let updatedIsWorking = state.isWorking;

			if (state.timer === 0) {
				if (state.status === 'Work') {
					updatedStatus = 'Break';
					updatedIsWorking = false;
					updatedTimer = state.breakInterval * 60;
				}
				else {
					updatedStatus = 'Work';
					updatedIsWorking = true;
					updatedTimer = state.workInterval * 60;
				}
			}

			return Object.assign({}, state, {
				isWorking: updatedIsWorking,
				status: updatedStatus,
				timer: updatedTimer ? updatedTimer : state.timer - 1
			});
		default:
			return state;
	}
}