export interface BrewingStep {
  instruction: string;
  duration: number; // in seconds
}

export interface BrewingTechnique {
  id: string;
  name: string;
  description: string;
  ratio: number; // coffee to water ratio (1:x)
  defaultCoffeeAmount: number; // in grams
  steps: (coffeeAmount: number, waterAmount: number) => BrewingStep[];
}

export interface BrewingMethod {
  id: string;
  name: string;
  description: string;
  techniques: BrewingTechnique[];
}

export const brewingMethods: BrewingMethod[] = [
  {
    id: "v60",
    name: "V60",
    description: "A pour-over method known for its clean, bright cup profile.",
    techniques: [
      {
        id: "v60-hoffman",
        name: "James Hoffmann's Ultimate V60",
        description:
          "A meticulously crafted pour-over method by coffee expert James Hoffmann.",
        ratio: 16.67, // 1:16.67 ratio
        defaultCoffeeAmount: 30,
        steps: (coffeeAmount: number, waterAmount: number) => [
          {
            instruction: `Add ${coffeeAmount}g of coffee to the filter`,
            duration: 10,
          },
          {
            instruction: `Add ${Math.round(
              coffeeAmount * 2
            )}g of water to bloom`,
            duration: 45,
          },
          { instruction: "Gently swirl the coffee slurry", duration: 15 },
          {
            instruction: `Pour water up to ${Math.round(
              waterAmount * 0.6
            )}g total`,
            duration: 30,
          },
          {
            instruction: `Pour water up to ${waterAmount}g total`,
            duration: 30,
          },
          { instruction: "Gently swirl the V60", duration: 15 },
          { instruction: "Allow coffee to drawdown", duration: 10 },
        ],
      },
      {
        id: "v60-4-6",
        name: "4:6 Method",
        description:
          "A technique developed by Tetsu Kasuya, winner of the 2016 World Brewers Cup.",
        ratio: 15, // 1:15 ratio
        defaultCoffeeAmount: 20,
        steps: (coffeeAmount: number, waterAmount: number) => {
          const pourAmount = Math.round(waterAmount / 5);
          return [
            {
              instruction: `Add ${coffeeAmount}g of coffee to the filter`,
              duration: 10,
            },
            { instruction: `Pour ${pourAmount}g of water`, duration: 45 },
            { instruction: `Pour ${pourAmount}g of water`, duration: 45 },
            { instruction: `Pour ${pourAmount}g of water`, duration: 45 },
            { instruction: `Pour ${pourAmount}g of water`, duration: 45 },
            {
              instruction: `Final pour of ${pourAmount}g of water`,
              duration: 45,
            },
            { instruction: "Allow to drawdown", duration: 60 },
          ];
        },
      },
    ],
  },
  {
    id: "french-press",
    name: "French Press",
    description:
      "An immersion brewing method known for its full-bodied, rich flavor.",
    techniques: [
      {
        id: "french-press-classic",
        name: "Classic French Press",
        description: "A simple and robust method for full-bodied coffee.",
        ratio: 15, // 1:15 ratio
        defaultCoffeeAmount: 30,
        steps: (coffeeAmount: number, waterAmount: number) => [
          {
            instruction: `Add ${coffeeAmount}g of coarse ground coffee to the French Press`,
            duration: 10,
          },
          { instruction: `Add ${waterAmount}g of water`, duration: 30 },
          { instruction: "Stir gently", duration: 15 },
          { instruction: "Place the lid on and wait", duration: 225 },
          { instruction: "Slowly press the plunger down", duration: 30 },
          { instruction: "Pour and enjoy!", duration: 0 },
        ],
      },
      {
        id: "french-press-hoffman",
        name: "James Hoffmann's French Press Technique",
        description:
          "A refined method that aims to reduce sediment in the final cup.",
        ratio: 16.67, // 1:16.67 ratio
        defaultCoffeeAmount: 30,
        steps: (coffeeAmount: number, waterAmount: number) => [
          {
            instruction: `Add ${coffeeAmount}g of medium-fine ground coffee to the French Press`,
            duration: 10,
          },
          { instruction: `Add ${waterAmount}g of water`, duration: 30 },
          { instruction: "Wait for 4 minutes", duration: 240 },
          { instruction: "Stir the crust gently", duration: 15 },
          { instruction: "Scoop out the foam", duration: 30 },
          { instruction: "Wait for 5-8 minutes", duration: 480 },
          {
            instruction: "Slowly press the plunger just below the surface",
            duration: 15,
          },
          { instruction: "Pour carefully and enjoy!", duration: 0 },
        ],
      },
    ],
  },
];
