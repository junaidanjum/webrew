"use client"

import { useState } from "react"
import { brewingMethods, BrewingMethod, BrewingTechnique } from "@/lib/coffee-methods"
import MethodSelection from "@/components/method-selection"
import BrewingGuide from "@/components/brewing-guide"
import CoffeeAmountInput from "@/components/coffee-amount-input"
import { Coffee } from "lucide-react"
import Footer from "@/components/footer"

export default function CoffeeBrewingApp() {
	const initialMethod = localStorage && localStorage.getItem("selectedMethod") ? brewingMethods.find(m => m.id === localStorage.getItem("selectedMethod")) : brewingMethods[0]
	const [selectedMethod, setSelectedMethod] = useState<BrewingMethod>(initialMethod || brewingMethods[0])
	const initialTechnique =
		localStorage && localStorage.getItem("selectedTechnique") ? selectedMethod.techniques.find(t => t.id === localStorage.getItem("selectedTechnique")) : selectedMethod.techniques[0]
	const [selectedTechnique, setSelectedTechnique] = useState<BrewingTechnique>(initialTechnique || selectedMethod.techniques[0])
	const [coffeeAmount, setCoffeeAmount] = useState(selectedTechnique.defaultCoffeeAmount)
	const [waterAmount, setWaterAmount] = useState(selectedTechnique.ratio * selectedTechnique.defaultCoffeeAmount)

	const handleMethodChange = (method: BrewingMethod) => {
		setSelectedMethod(method)
		localStorage.setItem("selectedMethod", method.id)
		const newTechnique = method.techniques[0]
		localStorage.setItem("selectedTechnique", newTechnique.id)
		setSelectedTechnique(newTechnique)
		setCoffeeAmount(newTechnique.defaultCoffeeAmount)
		setWaterAmount(newTechnique.ratio * newTechnique.defaultCoffeeAmount)
	}

	const handleTechniqueChange = (technique: BrewingTechnique) => {
		localStorage.setItem("selectedTechnique", technique.id)
		setSelectedTechnique(technique)
		setCoffeeAmount(technique.defaultCoffeeAmount)
		setWaterAmount(technique.ratio * technique.defaultCoffeeAmount)
	}

	return (
		<div className="min-h-screen bg-background p-8 pb-2 antialiased flex flex-col justify-between">
			<div>
				<h1 className="text-2xl mb-16 text-center tracking-tight items-center flex justify-center gap-2">
					<Coffee strokeWidth={1.5} /> webrew
				</h1>
				<div className="max-w-xl mx-auto space-y-8">
					<MethodSelection
						methods={brewingMethods}
						selectedMethod={selectedMethod}
						selectedTechnique={selectedTechnique}
						onSelectMethod={handleMethodChange}
						onSelectTechnique={handleTechniqueChange}
					/>
					<CoffeeAmountInput coffeeAmount={coffeeAmount} setCoffeeAmount={setCoffeeAmount} waterAmount={waterAmount} setWaterAmount={setWaterAmount} ratio={selectedTechnique.ratio} />
					<BrewingGuide technique={selectedTechnique} coffeeAmount={coffeeAmount} />
				</div>
			</div>
			<Footer />
		</div>
	)
}
