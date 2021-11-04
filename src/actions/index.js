export const START_TIMER = 'START_TIMER';
export const PAUSE_TIMER = 'PAUSE_TIMER';
export const RESET_TIMER = 'RESET_TIMER';
export const INCREMENT_WORK_INTERVAL = 'INCREMENT_WORK_INTERVAL';
export const DECREMENT_WORK_INTERVAL = 'DECREMENT_WORK_INTERVAL';
export const INCREMENT_BREAK_INTERVAL = 'INCREMENT_BREAK_INTERVAL';
export const DECREMENT_BREAK_INTERVAL = 'DECREMENT_BREAK_INTERVAL';
export const DECREMENT_TIMER = 'DECREMENT_TIMER';

export function startTimer() {
	return {
		type: START_TIMER
	}
}

export function pauseTimer() {
	return {
		type: PAUSE_TIMER
	}
}

export function resetTimer() {
	return {
		type: RESET_TIMER
	}
}

export function incrementWorkInterval() {
	return {
		type: INCREMENT_WORK_INTERVAL
	}
}

export function decrementWorkInterval() {
	return {
		type: DECREMENT_WORK_INTERVAL
	}
}

export function incrementBreakInterval() {
	return {
		type: INCREMENT_BREAK_INTERVAL
	}
}

export function decrementBreakInterval() {
	return {
		type: DECREMENT_BREAK_INTERVAL
	}
}

export function decrementTimer() {
	return {
		type: DECREMENT_TIMER
	}
}