import v60Techniques from "./v60.json"
import frenchPressTechniques from "./french-press.json"
import chemexTechniques from "./chemex.json"
import origamiTechniques from "./origami.json"
export interface BrewingStep {
	instruction: string
	duration: number // in seconds
}

export interface BrewingTechnique {
	id: string
	name: string
	description: string
	ratio: number // coffee to water ratio (1:x)
	defaultCoffeeAmount: number // in grams
	steps: (coffeeAmount: number, waterAmount: number) => BrewingStep[]
}

export interface BrewingMethod {
	id: string
	name: string
	description: string
	techniques: BrewingTechnique[]
}

const renderInstruction = (instruction: string, variables: Record<string, number>): string => {
	return instruction.replace(/{(.*?)}/g, (_, expression) => {
		return eval(
			expression.replace(/\b(\w+)\b/g, (a: number, v: string) => {
				if (v === "coffeeAmount") {
					return variables["coffeeAmount"]
				}
				if (v === "waterAmount") {
					return variables["waterAmount"]
				}
				return v
			})
		)
	})
}

export const brewingMethods: BrewingMethod[] = [
	{
		id: "v60",
		name: "V60",
		description: "A pour-over method known for its clean, bright cup profile.",
		techniques: v60Techniques.map(technique => ({
			...technique,
			steps: (coffeeAmount: number, waterAmount: number) => {
				return technique.steps.map(step => ({
					...step,
					instruction: renderInstruction(step.instruction, {
						coffeeAmount,
						waterAmount
					})
				}))
			}
		}))
	},
	{
		id: "french-press",
		name: "French Press",
		description: "An immersion brewing method known for its full-bodied, rich flavor.",
		techniques: frenchPressTechniques.map(technique => ({
			...technique,
			steps: (coffeeAmount: number, waterAmount: number) => {
				return technique.steps.map(step => ({
					...step,
					instruction: renderInstruction(step.instruction, {
						coffeeAmount,
						waterAmount
					})
				}))
			}
		}))
	},
	{
		id: "chemex",
		name: "Chemex",
		description: "A pour-over style glass coffeemaker.",
		techniques: chemexTechniques.map(technique => ({
			...technique,
			steps: (coffeeAmount: number, waterAmount: number) => {
				return technique.steps.map(step => ({
					...step,
					instruction: renderInstruction(step.instruction, {
						coffeeAmount,
						waterAmount
					})
				}))
			}
		}))
	},
	{
		id: "origami",
		name: "Origami",
		description: "A dripper that folds like an origami crane.",
		techniques: origamiTechniques.map(technique => ({
			...technique,
			steps: (coffeeAmount: number, waterAmount: number) => {
				return technique.steps.map(step => ({
					...step,
					instruction: renderInstruction(step.instruction, {
						coffeeAmount,
						waterAmount
					})
				}))
			}
		}))
	}
]
