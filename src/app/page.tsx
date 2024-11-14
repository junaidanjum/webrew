"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Coffee, Pause, Play, RefreshCcw } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import brewingMethods from "@/data/brewing_methods.json";
import { Technique } from "@/definitions/technique";

export default function Home() {
  const [method, setMethod] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [technique, setTechnique] = useState<Technique | null>(null);

  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Add this state to track current step
  const [currentStep, setCurrentStep] = useState(1);

  // Add these state variables at the top with other states
  const [isPaused, setIsPaused] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    if (isPaused) {
      setIsRunning(true);
      setIsPaused(false);
    } else {
      setIsRunning(true);
      setCurrentStep(1);
      // @ts-expect-error currentStep is a number
      setTimeLeft(technique.steps[1].time);
    }

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          setCurrentStep((currentStep) => {
            const nextStep = currentStep + 1;
            // @ts-expect-error currentStep is a number
            if (technique.steps[nextStep]) {
              // @ts-expect-error currentStep is a number
              setTimeLeft(technique.steps[nextStep].time);
              return nextStep;
            } else {
              if (intervalId) clearInterval(intervalId);
              setIsRunning(false);
              return currentStep;
            }
          });
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    setIntervalId(timerInterval);
  };

  const handlePause = () => {
    if (!isPaused) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      setIsPaused(true);
    } else {
      handleStart();
    }
  };

  const handleReset = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
    setCurrentStep(1);
  };

  const loadRecipe = async (recipeFile: string) => {
    try {
      const w = await import(`@/data/${recipeFile}`);
      setRecipe(w.default); // Assuming we want the first recipe
    } catch (error) {
      console.error("Error loading recipe:", error);
      setRecipe(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-10">
      <h1 className="text-xl font-semibold flex items-center gap-2">
        <Coffee strokeWidth={1.5} />
        Brew
      </h1>
      <p className="text-base text-gray-500">
        A simple timer for brewing coffee.
      </p>
      <div className="my-4 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <Select
            onValueChange={(value) => {
              setMethod(value);
              const selectedMethod = brewingMethods.find((m) => m.id === value);
              if (selectedMethod?.recipe_file) {
                loadRecipe(selectedMethod.recipe_file);
              }
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Brew Method" />
            </SelectTrigger>
            <SelectContent>
              {brewingMethods.map((method) => (
                <SelectItem key={method.id} value={method.id}>
                  {method.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            disabled={!method}
            onValueChange={(value) =>
              // @ts-expect-error recipe is an array of objects
              setTechnique(recipe?.find((r) => r.id === value))
            }
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select Recipe" />
            </SelectTrigger>
            <SelectContent>
              {/* @ts-expect-error recipe is an array of objects */}
              {recipe?.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {technique && (
        <section className="flex flex-col gap-2 items-center mt-4">
          <Separator />
          <div className="font-medium mt-2"> {technique.name}</div>
          <div className="text-sm text-gray-500">
            {technique.short_description}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="relative w-24">
              <Input
                type="number"
                placeholder="Coffee"
                defaultValue={technique?.coffee_amount}
                className="pr-6 w-24"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                g
              </span>
            </div>
            <div className="relative w-24">
              <Input
                type="number"
                placeholder="Water"
                defaultValue={technique?.water_amount}
                className="pr-6 w-24"
                // onChange={(e) => setWaterAmount(Number(e.target.value))}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                ml
              </span>
            </div>
          </div>
          <div className="text-sm mt-2">
            You would need{" "}
            <span className="font-medium ">
              {" "}
              {technique?.coffee_amount} grams{" "}
            </span>{" "}
            of <span className="font-medium">{technique?.grind_size}</span>{" "}
            coffee and{" "}
            <span className="font-medium">{technique?.water_amount} ml</span> of
            water boiled at{" "}
            <span className="font-medium">{technique.water_temp} °C</span>. The
            brew time is approximately{" "}
            <span className="font-medium">{technique?.brew_time}</span>.
          </div>

          <div className="mt-4">
            {isRunning ? (
              <div className="flex flex-col items-center gap-2">
                <Alert className="w-[500px]">
                  <Coffee className="h-4 w-4" />
                  {/* @ts-expect-error  currentStep is a number */}
                  <AlertTitle>{technique.steps[currentStep].title}</AlertTitle>
                  <AlertDescription>
                    {/* @ts-expect-error  currentStep is a number */}
                    {technique.steps[currentStep].description}
                    <div className="text-3xl font-semibold text-center mt-2">
                      {timeLeft >= 60
                        ? `${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
                            .toString()
                            .padStart(2, "0")}`
                        : `00:${timeLeft.toString().padStart(2, "0")}`}
                    </div>
                    {currentStep < technique.steps.length - 1 && (
                      <div className="text-sm text-gray-400 mt-4">
                        {/* @ts-expect-error  currentStep is a number */}
                        Next: {technique.steps[currentStep + 1].description}
                      </div>
                    )}
                  </AlertDescription>
                </Alert>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={handlePause}
                    className="mt-4"
                    variant="outline"
                  >
                    {isPaused ? <Play /> : <Pause />}{" "}
                    {isPaused ? "Resume" : "Pause"} Timer
                  </Button>
                  <Button
                    onClick={handleReset}
                    className="mt-4"
                    variant="ghost"
                  >
                    <RefreshCcw /> Reset Timer
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button onClick={handleStart}>
                  <Coffee /> Start Brewing
                </Button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
