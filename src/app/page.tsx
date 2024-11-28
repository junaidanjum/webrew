"use client";

import { useState } from "react";
import {
  brewingMethods,
  BrewingMethod,
  BrewingTechnique,
} from "@/lib/coffee-methods";
import MethodSelection from "@/components/method-selection";
import BrewingGuide from "@/components/brewing-guide";
import CoffeeAmountInput from "@/components/coffee-amount-input";

export default function CoffeeBrewingApp() {
  const [selectedMethod, setSelectedMethod] = useState<BrewingMethod>(
    brewingMethods[0]
  );
  const [selectedTechnique, setSelectedTechnique] = useState<BrewingTechnique>(
    brewingMethods[0].techniques[0]
  );
  const [coffeeAmount, setCoffeeAmount] = useState(
    selectedTechnique.defaultCoffeeAmount
  );
  const [waterAmount, setWaterAmount] = useState(
    selectedTechnique.ratio * selectedTechnique.defaultCoffeeAmount
  );

  const handleMethodChange = (method: BrewingMethod) => {
    setSelectedMethod(method);
    const newTechnique = method.techniques[0];
    setSelectedTechnique(newTechnique);
    setCoffeeAmount(newTechnique.defaultCoffeeAmount);
    setWaterAmount(newTechnique.ratio * newTechnique.defaultCoffeeAmount);
  };

  const handleTechniqueChange = (technique: BrewingTechnique) => {
    setSelectedTechnique(technique);
    setCoffeeAmount(technique.defaultCoffeeAmount);
    setWaterAmount(technique.ratio * technique.defaultCoffeeAmount);
  };

  return (
    <div className="min-h-screen bg-background p-8 antialiased">
      <h1 className="text-2xl font-mono mb-16 text-center tracking-tight font-semibold">
        Coffee Brewing Guide
      </h1>
      <div className="max-w-xl mx-auto space-y-8">
        <MethodSelection
          methods={brewingMethods}
          selectedMethod={selectedMethod}
          selectedTechnique={selectedTechnique}
          onSelectMethod={handleMethodChange}
          onSelectTechnique={handleTechniqueChange}
        />
        <CoffeeAmountInput
          coffeeAmount={coffeeAmount}
          setCoffeeAmount={setCoffeeAmount}
          waterAmount={waterAmount}
          setWaterAmount={setWaterAmount}
          ratio={selectedTechnique.ratio}
        />
        <BrewingGuide
          technique={selectedTechnique}
          coffeeAmount={coffeeAmount}
        />
      </div>
    </div>
  );
}
