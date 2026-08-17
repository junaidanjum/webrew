import { useEffect, useMemo, useReducer } from "react"
import { ArrowRight, Pause, Play, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { createBrewSession, updateBrewSession, type BrewSessionEvent, type BrewSessionState } from "@/lib/brew-session"
import type { BrewingTechnique } from "@/lib/coffee-methods"

type BrewingGuideProps = {
	technique: BrewingTechnique
	coffeeAmount: number
}

const formatTime = (milliseconds: number) => {
	const seconds = Math.ceil(milliseconds / 1000)
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = seconds % 60

	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export const BrewingGuide = ({ technique, coffeeAmount }: BrewingGuideProps) => {
	const waterAmount = Math.round(coffeeAmount * technique.ratio)
	const steps = useMemo(() => technique.steps(coffeeAmount, waterAmount), [coffeeAmount, technique, waterAmount])
	const [session, dispatch] = useReducer((state: BrewSessionState, event: BrewSessionEvent) => updateBrewSession(state, steps, event), steps, createBrewSession)

	useEffect(() => {
		dispatch({ type: "reset" })
	}, [steps])

	useEffect(() => {
		if (session.status !== "running") {
			return
		}

		const updateRemainingTime = () => dispatch({ type: "tick", now: Date.now() })
		const intervalId = window.setInterval(updateRemainingTime, 250)
		const handleVisibilityChange = () => {
			if (document.visibilityState === "visible") {
				updateRemainingTime()
			}
		}

		document.addEventListener("visibilitychange", handleVisibilityChange)

		return () => {
			window.clearInterval(intervalId)
			document.removeEventListener("visibilitychange", handleVisibilityChange)
		}
	}, [session.status])

	const currentStep = steps[session.currentStepIndex]
	const currentStepDurationMilliseconds = (currentStep?.duration ?? 0) * 1000
	const isCompleted = session.status === "completed"
	const isManualStep = !isCompleted && currentStepDurationMilliseconds === 0
	const isLastStep = session.currentStepIndex === steps.length - 1
	const progress = isCompleted
		? 100
		: currentStepDurationMilliseconds === 0
			? 0
			: Math.min(100, Math.max(0, ((currentStepDurationMilliseconds - session.remainingMilliseconds) / currentStepDurationMilliseconds) * 100))

	const handlePrimaryAction = () => {
		if (isCompleted) {
			dispatch({ type: "reset" })
			return
		}

		if (isManualStep) {
			dispatch({ type: "advance", now: Date.now() })
			return
		}

		if (session.status === "running") {
			dispatch({ type: "pause", now: Date.now() })
			return
		}

		dispatch({ type: "start", now: Date.now() })
	}

	const primaryLabel = isCompleted ? "Restart" : isManualStep ? (isLastStep ? "Finish" : "Next") : session.status === "running" ? "Pause" : session.status === "paused" ? "Resume" : "Start"

	return (
		<div className="space-y-8 slide-up">
			<div className="space-y-4">
				<h2 className="text-sm font-medium">{technique.name}</h2>
				<Progress value={progress} aria-label="Current step progress" className="h-1 bg-muted" />
			</div>
			<div className="space-y-6">
				<div className="text-6xl tabular-nums tracking-tight text-center transition-all">{isCompleted ? "Done" : isManualStep ? "Manual" : formatTime(session.remainingMilliseconds)}</div>
				<div className="space-y-2">
					<p className="text-xs text-muted-foreground uppercase tracking-wider">
						{isCompleted ? "Brew complete" : `${isManualStep ? "Manual Step" : "Current Step"} (${session.currentStepIndex + 1} of ${steps.length})`}
					</p>
					<p className="text-sm">{isCompleted ? "Enjoy your coffee." : currentStep?.instruction || "No steps available"}</p>
				</div>
			</div>
			<div className="flex justify-center gap-2">
				<Button onClick={() => dispatch({ type: "reset" })} variant="link" className="text-xs">
					<RotateCw />
					Reset
				</Button>
				<Button onClick={handlePrimaryAction} variant="default" className="text-xs">
					{isCompleted ? <RotateCw /> : isManualStep ? <ArrowRight /> : session.status === "running" ? <Pause /> : <Play />}
					{primaryLabel}
				</Button>
				{!isCompleted && !isManualStep && !isLastStep ? (
					<Button onClick={() => dispatch({ type: "advance", now: Date.now() })} variant="link" className="text-xs">
						<ArrowRight />
						Skip
					</Button>
				) : null}
			</div>
		</div>
	)
}
