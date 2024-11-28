import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CoffeeAmountInputProps {
  coffeeAmount: number;
  setCoffeeAmount: (amount: number) => void;
  waterAmount: number;
  setWaterAmount: (amount: number) => void;
  ratio: number;
}

export default function CoffeeAmountInput({
  coffeeAmount,
  setCoffeeAmount,
  waterAmount,
  setWaterAmount,
  ratio,
}: CoffeeAmountInputProps) {
  useEffect(() => {
    setWaterAmount(coffeeAmount * ratio);
  }, [coffeeAmount, ratio, setWaterAmount]);

  const handleCoffeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCoffeeAmount = Number(e.target.value);
    setCoffeeAmount(newCoffeeAmount);
  };

  const handleWaterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWaterAmount = Number(e.target.value);
    setWaterAmount(newWaterAmount);
    setCoffeeAmount(newWaterAmount / ratio);
  };

  return (
    <div className="space-y-2">
      <div className="fade-in grid grid-cols-2 gap-4 w-full">
        <div>
          <Label
            htmlFor="coffee-amount"
            className="text-xs text-muted-foreground uppercase tracking-wider"
          >
            Coffee Amount (g)
          </Label>
          <Input
            id="coffee-amount"
            type="number"
            value={Math.round(coffeeAmount)}
            onChange={handleCoffeeChange}
            min={1}
            className="text-sm border-0 bg-muted"
          />
        </div>
        <div>
          <Label
            htmlFor="water-amount"
            className="text-xs text-muted-foreground uppercase tracking-wider"
          >
            Water Amount (ml)
          </Label>
          <Input
            id="water-amount"
            type="number"
            value={Math.round(waterAmount)}
            onChange={handleWaterChange}
            min={1}
            className="text-sm border-0 bg-muted"
          />
        </div>
      </div>
    </div>
  );
}
