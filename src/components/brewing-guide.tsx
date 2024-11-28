import { useState, useEffect } from "react";
import { BrewingTechnique } from "@/lib/coffee-methods";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Pause, Play, RotateCw } from "lucide-react";

interface BrewingGuideProps {
  technique: BrewingTechnique;
  coffeeAmount: number;
}

export default function BrewingGuide({
  technique,
  coffeeAmount,
}: BrewingGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const waterAmount = Math.round(coffeeAmount * technique.ratio);
  const steps = technique.steps(coffeeAmount, waterAmount);
  const currentStepDuration = steps[currentStep]?.duration || 0;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && remainingTime > 0) {
      interval = setInterval(() => {
        if (remainingTime <= 1) {
          clearInterval(interval!);
          setCurrentStep((prevStep) => {
            const nextStep = prevStep + 1;
            if (nextStep < steps.length) {
              setRemainingTime(steps[nextStep].duration);
              return nextStep;
            } else {
              setIsRunning(false);
              return prevStep;
            }
          });
        }
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, remainingTime, currentStep, steps]);

  useEffect(() => {
    setCurrentStep(0);
    setRemainingTime(steps[0]?.duration || 0);
    setIsRunning(false);
  }, [technique, coffeeAmount]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    if (remainingTime === 0 && steps.length > 0) {
      setRemainingTime(currentStepDuration);
    }
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setRemainingTime(steps[0]?.duration || 0);
  };

  const handleSkip = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
      setRemainingTime(steps[currentStep + 1].duration);
    } else {
      setIsRunning(false);
      setRemainingTime(0);
    }
  };

  return (
    <div className="space-y-8 slide-up">
      <div className="space-y-4">
        <h2 className="text-sm font-medium">{technique.name}</h2>
        <Progress
          value={
            ((currentStepDuration - remainingTime) / currentStepDuration) * 100
          }
          className="h-1 bg-muted"
        />
      </div>
      <div className="space-y-6">
        <div className="text-6xl tabular-nums tracking-tight text-center transition-all">
          {formatTime(remainingTime)}
        </div>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {currentStep === steps.length - 1
              ? "Done"
              : `Current Step (${currentStep + 1} of ${steps.length})`}
          </p>
          <p className="text-sm">
            {steps[currentStep]?.instruction || "No steps available"}
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <Button onClick={handleReset} variant="link" className="text-xs">
          <RotateCw />
          Reset
        </Button>
        <Button
          onClick={!isRunning ? handleStart : handlePause}
          variant="default"
          className="text-xs"
        >
          {!isRunning ? <Play /> : <Pause />}
          {!isRunning ? "Start" : "Pause"}
        </Button>

        <Button
          onClick={handleSkip}
          disabled={currentStep === steps.length - 1}
          variant="link"
          className="text-xs"
        >
          <ArrowRight />
          Next
        </Button>
      </div>
    </div>
  );
}
