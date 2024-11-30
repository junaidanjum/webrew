"use client"

import { useState, useEffect } from "react"
import { brewingMethods, BrewingMethod, BrewingTechnique } from "@/lib/coffee-methods"
import MethodSelection from "@/components/method-selection"
import BrewingGuide from "@/components/brewing-guide"
import CoffeeAmountInput from "@/components/coffee-amount-input"
import { Coffee, Loader } from "lucide-react"
import Footer from "@/components/footer"
import MenuBar from "@/components/menu-bar"

export default function CoffeeBrewingApp() {
	const [selectedMethod, setSelectedMethod] = useState<BrewingMethod>(brewingMethods[0])
	const [selectedTechnique, setSelectedTechnique] = useState<BrewingTechnique>(brewingMethods[0].techniques[0])
	const [coffeeAmount, setCoffeeAmount] = useState(selectedTechnique.defaultCoffeeAmount)
	const [waterAmount, setWaterAmount] = useState(selectedTechnique.ratio * selectedTechnique.defaultCoffeeAmount)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		if (typeof window !== "undefined") {
			const storedMethod = localStorage.getItem("selectedMethod")
			const storedTechnique = localStorage.getItem("selectedTechnique")
			if (storedMethod) {
				const method = brewingMethods.find(m => m.id === storedMethod)
				if (method) {
					setSelectedMethod(method)
					const technique = method.techniques.find(t => t.id === storedTechnique)
					setSelectedTechnique(technique || method.techniques[0])
					setCoffeeAmount(technique ? technique.defaultCoffeeAmount : method.techniques[0].defaultCoffeeAmount)
					setWaterAmount(technique ? technique.ratio * technique.defaultCoffeeAmount : method.techniques[0].ratio * method.techniques[0].defaultCoffeeAmount)
				}
			}
		}
		setLoading(false)
	}, [])

	useEffect(() => {
		localStorage.setItem("selectedMethod", selectedMethod.id)
	}, [selectedMethod])

	useEffect(() => {
		localStorage.setItem("selectedTechnique", selectedTechnique.id)
	}, [selectedTechnique])

	const handleMethodChange = (method: BrewingMethod) => {
		setSelectedMethod(method)
		const newTechnique = method.techniques[0]
		setSelectedTechnique(newTechnique)
		setCoffeeAmount(newTechnique.defaultCoffeeAmount)
		setWaterAmount(newTechnique.ratio * newTechnique.defaultCoffeeAmount)
	}

	const handleTechniqueChange = (technique: BrewingTechnique) => {
		setSelectedTechnique(technique)
		setCoffeeAmount(technique.defaultCoffeeAmount)
		setWaterAmount(technique.ratio * technique.defaultCoffeeAmount)
	}

	return (
		<div className="min-h-screen bg-background p-8 pb-2 antialiased flex flex-col justify-between">
			{loading ? (
				<div className="flex flex-col items-center justify-center my-40 text-muted-foreground text-xs gap-2">
					<Loader className="animate-spin" /> Loading..
				</div>
			) : (
				<div>
					<h1 className="text-2xl mb-16 text-center tracking-tight items-center flex justify-center gap-2">
						<Coffee strokeWidth={1.5} /> webrew
					</h1>
					<div className="max-w-xl mx-auto flex">
						<MenuBar />
						<div className="w-full space-y-8">
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
				</div>
			)}
			<Footer />
		</div>
	)
}
