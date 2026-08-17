export type BrewSessionStatus = "idle" | "running" | "paused" | "completed"

export type BrewSessionState = {
	status: BrewSessionStatus
	currentStepIndex: number
	remainingMilliseconds: number
	deadline: number | null
}

type BrewStepTiming = {
	duration: number
}

export type BrewSessionEvent = { type: "start"; now: number } | { type: "pause"; now: number } | { type: "tick"; now: number } | { type: "advance"; now: number } | { type: "reset" }

export const createBrewSession = (steps: readonly BrewStepTiming[]): BrewSessionState => ({
	status: steps.length === 0 ? "completed" : "idle",
	currentStepIndex: 0,
	remainingMilliseconds: (steps[0]?.duration ?? 0) * 1000,
	deadline: null
})

const synchronizeBrewSession = (state: BrewSessionState, steps: readonly BrewStepTiming[], now: number): BrewSessionState => {
	if (state.status !== "running" || state.deadline === null) {
		return state
	}

	let currentStepIndex = state.currentStepIndex
	let deadline = state.deadline

	while (deadline <= now) {
		const nextStepIndex = currentStepIndex + 1
		const nextStep = steps[nextStepIndex]

		if (!nextStep) {
			return {
				status: "completed",
				currentStepIndex,
				remainingMilliseconds: 0,
				deadline: null
			}
		}

		currentStepIndex = nextStepIndex

		if (nextStep.duration === 0) {
			return {
				status: "idle",
				currentStepIndex,
				remainingMilliseconds: 0,
				deadline: null
			}
		}

		deadline += nextStep.duration * 1000
	}

	return {
		status: "running",
		currentStepIndex,
		remainingMilliseconds: deadline - now,
		deadline
	}
}

export const updateBrewSession = (state: BrewSessionState, steps: readonly BrewStepTiming[], event: BrewSessionEvent): BrewSessionState => {
	if (event.type === "reset") {
		return createBrewSession(steps)
	}

	if (event.type === "pause" && state.status === "running" && state.deadline !== null) {
		const synchronizedState = synchronizeBrewSession(state, steps, event.now)

		if (synchronizedState.status !== "running") {
			return synchronizedState
		}

		return {
			...synchronizedState,
			status: "paused",
			deadline: null
		}
	}

	if (event.type === "advance") {
		const nextStepIndex = state.currentStepIndex + 1
		const nextStep = steps[nextStepIndex]

		if (nextStep) {
			const remainingMilliseconds = nextStep.duration * 1000
			const isRunning = state.status === "running" && remainingMilliseconds > 0

			return {
				status: isRunning ? "running" : "idle",
				currentStepIndex: nextStepIndex,
				remainingMilliseconds,
				deadline: isRunning ? event.now + remainingMilliseconds : null
			}
		}

		return {
			status: "completed",
			currentStepIndex: state.currentStepIndex,
			remainingMilliseconds: 0,
			deadline: null
		}
	}

	if (event.type === "tick") {
		return synchronizeBrewSession(state, steps, event.now)
	}

	if (event.type !== "start" || state.status === "completed" || state.remainingMilliseconds === 0) {
		return state
	}

	return {
		...state,
		status: "running",
		deadline: event.now + state.remainingMilliseconds
	}
}
