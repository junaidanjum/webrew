import { BrewingMethod, BrewingTechnique } from "@/lib/coffee-methods";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MethodSelectionProps {
  methods: BrewingMethod[];
  selectedMethod: BrewingMethod;
  selectedTechnique: BrewingTechnique;
  onSelectMethod: (method: BrewingMethod) => void;
  onSelectTechnique: (technique: BrewingTechnique) => void;
}

export default function MethodSelection({
  methods,
  selectedMethod,
  selectedTechnique,
  onSelectMethod,
  onSelectTechnique,
}: MethodSelectionProps) {
  return (
    <div className="space-y-6 fade-in">
      <div className="space-y-2">
        <Select
          value={selectedMethod.id}
          onValueChange={(value) =>
            onSelectMethod(methods.find((m) => m.id === value) || methods[0])
          }
        >
          <SelectTrigger className="w-full font-mono text-sm border-0 bg-muted">
            <SelectValue placeholder="Select a brewing method" />
          </SelectTrigger>
          <SelectContent>
            {methods.map((method) => (
              <SelectItem
                key={method.id}
                value={method.id}
                className="font-mono"
              >
                {method.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          {selectedMethod.description}
        </p>
      </div>
      <div className="space-y-2">
        <Select
          value={selectedTechnique.id}
          onValueChange={(value) => {
            const technique = selectedMethod.techniques.find(
              (t) => t.id === value
            );
            if (technique) onSelectTechnique(technique);
          }}
        >
          <SelectTrigger className="w-full font-mono text-sm border-0 bg-muted">
            <SelectValue placeholder="Select a technique" />
          </SelectTrigger>
          <SelectContent>
            {selectedMethod.techniques.map((technique) => (
              <SelectItem
                key={technique.id}
                value={technique.id}
                className="font-mono"
              >
                {technique.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          {selectedTechnique.description}
        </p>
      </div>
    </div>
  );
}
