import { describe, expect, it } from "vitest"
import { createBrewSession, updateBrewSession } from "./brew-session"

describe("brew session", () => {
	it("starts the first timed step from the current time", () => {
		const steps = [{ duration: 10 }]
		const session = updateBrewSession(createBrewSession(steps), steps, { type: "start", now: 1_000 })

		expect(session).toEqual({
			status: "running",
			currentStepIndex: 0,
			remainingMilliseconds: 10_000,
			deadline: 11_000
		})
	})

	it("derives remaining time from the deadline", () => {
		const steps = [{ duration: 10 }]
		const runningSession = updateBrewSession(createBrewSession(steps), steps, { type: "start", now: 1_000 })
		const session = updateBrewSession(runningSession, steps, { type: "tick", now: 4_500 })

		expect(session.remainingMilliseconds).toBe(6_500)
	})

	it("carries delayed ticks into the next timed step without drift", () => {
		const steps = [{ duration: 10 }, { duration: 5 }]
		const runningSession = updateBrewSession(createBrewSession(steps), steps, { type: "start", now: 1_000 })
		const session = updateBrewSession(runningSession, steps, { type: "tick", now: 12_000 })

		expect(session).toEqual({
			status: "running",
			currentStepIndex: 1,
			remainingMilliseconds: 4_000,
			deadline: 16_000
		})
	})

	it("keeps the final step active until its deadline, then completes", () => {
		const steps = [{ duration: 10 }]
		const runningSession = updateBrewSession(createBrewSession(steps), steps, { type: "start", now: 1_000 })
		const activeSession = updateBrewSession(runningSession, steps, { type: "tick", now: 10_999 })
		const completedSession = updateBrewSession(activeSession, steps, { type: "tick", now: 11_000 })

		expect(activeSession.status).toBe("running")
		expect(completedSession).toEqual({
			status: "completed",
			currentStepIndex: 0,
			remainingMilliseconds: 0,
			deadline: null
		})
	})

	it("keeps zero-duration steps manual until the user advances", () => {
		const steps = [{ duration: 0 }, { duration: 10 }]
		const manualSession = createBrewSession(steps)
		const unchangedSession = updateBrewSession(manualSession, steps, { type: "start", now: 1_000 })
		const nextSession = updateBrewSession(unchangedSession, steps, { type: "advance", now: 1_000 })

		expect(unchangedSession).toEqual(manualSession)
		expect(nextSession).toEqual({
			status: "idle",
			currentStepIndex: 1,
			remainingMilliseconds: 10_000,
			deadline: null
		})
	})

	it("stops automatic timing when the next step is manual", () => {
		const steps = [{ duration: 1 }, { duration: 0 }, { duration: 1 }]
		const runningSession = updateBrewSession(createBrewSession(steps), steps, { type: "start", now: 0 })
		const session = updateBrewSession(runningSession, steps, { type: "tick", now: 1_000 })

		expect(session).toEqual({
			status: "idle",
			currentStepIndex: 1,
			remainingMilliseconds: 0,
			deadline: null
		})
	})

	it("preserves exact remaining time across pause and resume", () => {
		const steps = [{ duration: 10 }]
		const runningSession = updateBrewSession(createBrewSession(steps), steps, { type: "start", now: 1_000 })
		const pausedSession = updateBrewSession(runningSession, steps, { type: "pause", now: 4_500 })
		const resumedSession = updateBrewSession(pausedSession, steps, { type: "start", now: 7_000 })

		expect(pausedSession).toEqual({
			status: "paused",
			currentStepIndex: 0,
			remainingMilliseconds: 6_500,
			deadline: null
		})
		expect(resumedSession).toEqual({
			status: "running",
			currentStepIndex: 0,
			remainingMilliseconds: 6_500,
			deadline: 13_500
		})
	})

	it("skips to a fresh next step while the timer is running", () => {
		const steps = [{ duration: 10 }, { duration: 5 }]
		const runningSession = updateBrewSession(createBrewSession(steps), steps, { type: "start", now: 1_000 })
		const session = updateBrewSession(runningSession, steps, { type: "advance", now: 4_000 })

		expect(session).toEqual({
			status: "running",
			currentStepIndex: 1,
			remainingMilliseconds: 5_000,
			deadline: 9_000
		})
	})

	it("resets to the first step", () => {
		const steps = [{ duration: 10 }, { duration: 5 }]
		const runningSession = updateBrewSession(createBrewSession(steps), steps, { type: "start", now: 1_000 })
		const secondStepSession = updateBrewSession(runningSession, steps, { type: "advance", now: 4_000 })
		const session = updateBrewSession(secondStepSession, steps, { type: "reset" })

		expect(session).toEqual(createBrewSession(steps))
	})

	it("completes when the user finishes the final manual step", () => {
		const steps = [{ duration: 0 }]
		const session = updateBrewSession(createBrewSession(steps), steps, { type: "advance", now: 1_000 })

		expect(session).toEqual({
			status: "completed",
			currentStepIndex: 0,
			remainingMilliseconds: 0,
			deadline: null
		})
	})

	it("catches up across multiple timed steps after a delayed browser tick", () => {
		const steps = [{ duration: 2 }, { duration: 3 }, { duration: 5 }]
		const runningSession = updateBrewSession(createBrewSession(steps), steps, { type: "start", now: 0 })
		const session = updateBrewSession(runningSession, steps, { type: "tick", now: 6_000 })

		expect(session).toEqual({
			status: "running",
			currentStepIndex: 2,
			remainingMilliseconds: 4_000,
			deadline: 10_000
		})
	})

	it("catches up before pausing after a step deadline", () => {
		const steps = [{ duration: 2 }, { duration: 3 }]
		const runningSession = updateBrewSession(createBrewSession(steps), steps, { type: "start", now: 0 })
		const session = updateBrewSession(runningSession, steps, { type: "pause", now: 2_500 })

		expect(session).toEqual({
			status: "paused",
			currentStepIndex: 1,
			remainingMilliseconds: 2_500,
			deadline: null
		})
	})
})
