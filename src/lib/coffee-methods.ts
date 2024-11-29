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
            instruction: `Add ${coffeeAmount}g of coffee to v60 filter.`,
            duration: 10,
          },
          {
            instruction: `Add ${Math.round(
              coffeeAmount * 2
            )}g of water to wet the coffee evenly. Wait for 45 seconds for the coffee to bloom.`,
            duration: 45,
          },
          {
            instruction: `Gently swirl the coffee slurry to ensure even saturation.`,
            duration: 15,
          },
          {
            instruction: `Pour water up to ${Math.round(
              waterAmount * 0.6
            )}g of total water.`,
            duration: 30,
          },
          {
            instruction: `Complete pouring water up to ${waterAmount}g.`,
            duration: 30,
          },
          {
            instruction: `Stir with a spoon to remove any remaining coffee grounds of the wall. Give it a gentle swirl.`,
            duration: 15,
          },
          { instruction: "Allow coffee to drawdown and enjoy!", duration: 10 },
        ],
      },
      {
        id: "v60-4-6",
        name: "Tetsu Kasuya's 4:6 Method",
        description:
          "A technique developed by Tetsu Kasuya, winner of the 2016 World Brewers Cup.",
        ratio: 15, // 1:15 ratio
        defaultCoffeeAmount: 20,
        steps: (coffeeAmount: number, waterAmount: number) => {
          const pourAmount = Math.round(waterAmount / 5);
          return [
            {
              instruction: `Add ${coffeeAmount}g of coffee to the filter.`,
              duration: 10,
            },
            {
              instruction: `Pour ${pourAmount}g of water and wait 45 seconds for the coffee to bloom.`,
              duration: 45,
            },
            {
              instruction: `Pour ${pourAmount}g of water and wait 45 seconds.`,
              duration: 45,
            },
            {
              instruction: `Pour ${pourAmount}g of water and wait 45 seconds.`,
              duration: 45,
            },
            {
              instruction: `Final pour of ${pourAmount}g of water and wait 45 seconds for the coffee to drawdown.`,
              duration: 45,
            },
            {
              instruction: "Allow to drawdown and enjoy!",
              duration: 60,
            },
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
          {
            instruction: `Add ${waterAmount}g of water and stir gently.`,
            duration: 30,
          },
          {
            instruction: "Place the lid on and wait 3 minutes 45 seconds.",
            duration: 225,
          },
          {
            instruction: "Slowly press the plunger down and enjoy!",
            duration: 30,
          },
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
            instruction: `Add ${coffeeAmount}g of medium-fine ground coffee to the French Press.`,
            duration: 10,
          },
          {
            instruction: `Add ${waterAmount}g of water in the French Press.`,
            duration: 30,
          },
          {
            instruction: "Wait for 4 minutes  for the coffee to bloom.",
            duration: 240,
          },
          {
            instruction: "Stir the crust gently and scoop out the foam.",
            duration: 15,
          },
          {
            instruction: "Wait for 5-8 minutes for the coffee to drawdown.",
            duration: 480,
          },
          {
            instruction:
              "Slowly press the plunger just below the surface and pour carefully.",
            duration: 15,
          },
        ],
      },
    ],
  },
  {
    id: "chemex",
    name: "Chemex",
    description: "A pour-over style glass coffeemaker.",
    techniques: [
      {
        id: "301",
        name: "James Hoffmann Chemex recipe",
        description:
          "Chemex recipe by James Hoffmann, winner of World Barista Championship, YouTuber, coffee consultant, and author. James recommends almost the same technique as for V60.",
        ratio: 500 / 30,
        defaultCoffeeAmount: 30,
        steps: (coffeeAmount, waterAmount) => [
          {
            instruction:
              "Grind the beans, boil the water, prepare Chemex with rinsed filter, add grounds, zero the scale.",
            duration: 10,
          },
          {
            instruction: `Add ${2 * coffeeAmount}-${
              3 * coffeeAmount
            }g of water.`,
            duration: 10,
          },
          {
            instruction: "Stir to wet all the grounds, let it bloom.",
            duration: 35,
          },
          {
            instruction: `Add water in a circular motion until you reach ${
              0.6 * waterAmount
            }g.`,
            duration: 30,
          },
          {
            instruction: `Continue to add water until you reach ${waterAmount}g.`,
            duration: 30,
          },
          {
            instruction: "Stir clockwise and counter-clockwise with a spoon.",
            duration: 15,
          },
          { instruction: "Give the Chemex a little shake.", duration: 10 },
          { instruction: "Wait until drawdown completes.", duration: 120 },
        ],
      },
      {
        id: "302",
        name: "Chemex recipe by Caffeine Fiend",
        description: "Chemex recipe by Caffeine Fiend.",
        ratio: 480 / 32,
        defaultCoffeeAmount: 32,
        steps: (coffeeAmount, waterAmount) => [
          {
            instruction:
              "Grind coffee, heat water, prepare Chemex with rinsed filter, add grounds.",
            duration: 10,
          },
          {
            instruction: `Pre-wet with ${
              2 * coffeeAmount
            }g of water, pour in spiral pattern.`,
            duration: 15,
          },
          { instruction: "Let the coffee bloom.", duration: 45 },
          {
            instruction:
              "Pour in concentric circles until the water reaches the top of the Chemex.",
            duration: 20,
          },
          {
            instruction: "Wait for grounds to return to original level.",
            duration: 30,
          },
          {
            instruction: `Repeat full immersion pours until you reach ${waterAmount}g. Wait for drawdown.`,
            duration: 130,
          },
        ],
      },
      {
        id: "303",
        name: "Chemex recipe by Epicurious",
        description: "Chemex recipe by Epicurious.",
        ratio: 700 / 42,
        defaultCoffeeAmount: 42,
        steps: (coffeeAmount, waterAmount) => [
          {
            instruction:
              "Grind coffee, heat water, prepare Chemex with rinsed filter, add grounds.",
            duration: 10,
          },
          {
            instruction: `Pre-wet with ${
              2 * coffeeAmount
            }g of water to saturate the grounds.`,
            duration: 15,
          },
          { instruction: "Let the coffee bloom.", duration: 30 },
          {
            instruction: `Add up to ${
              0.33 * waterAmount
            }g of water in circular motion.`,
            duration: 15,
          },
          { instruction: "Wait.", duration: 40 },
          {
            instruction: `Add water until scale reads ${0.64 * waterAmount}g.`,
            duration: 20,
          },
          { instruction: "Wait for 2 minutes.", duration: 120 },
          {
            instruction: `Add water to ${waterAmount}g. Wait for drawdown.`,
            duration: 60,
          },
        ],
      },
      {
        id: "304",
        name: "Scott Rao Chemex recipe",
        description:
          "Chemex recipe by Scott Rao, a coffee expert and author specializing in barista training, coffee roasting, and brewing.",
        ratio: 510 / 30,
        defaultCoffeeAmount: 30,
        steps: (coffeeAmount, waterAmount) => [
          {
            instruction:
              "Grind coffee, heat water, prepare Chemex with rinsed filter, add grounds.",
            duration: 10,
          },
          {
            instruction: `Pre-wet with ${1.5 * coffeeAmount}g of water.`,
            duration: 10,
          },
          {
            instruction: "Gently dig in the coffee bed with a small spoon.",
            duration: 25,
          },
          { instruction: "Wait for bloom.", duration: 5 },
          {
            instruction: `Pour until ${waterAmount}g in circular patterns.`,
            duration: 30,
          },
          { instruction: "Light stir at slurry edge.", duration: 10 },
          { instruction: "Move Chemex in circles.", duration: 10 },
          { instruction: "Wait for drawdown.", duration: 60 },
        ],
      },
    ],
  },
  {
    id: "aeropress",
    name: "Aeropress",
    description:
      "A versatile brewing method that offers various flavor profiles depending on the technique used.",
    techniques: [
      {
        id: "standard",
        name: "Standard Method",
        description:
          "Brewing with the Aeropress in its traditional orientation.",
        ratio: 15,
        defaultCoffeeAmount: 15,
        steps: (coffeeAmount: number, waterAmount: number): BrewingStep[] => [
          {
            instruction: `Add ${coffeeAmount}g of coffee to the Aeropress.`,
            duration: 10,
          },
          {
            instruction: `Pour ${waterAmount}ml of water at 85°C into the Aeropress.`,
            duration: 30,
          },
          {
            instruction: "Stir the mixture for 10 seconds.",
            duration: 10,
          },
          {
            instruction:
              "Place the plunger and press down slowly for about 30 seconds.",
            duration: 30,
          },
        ],
      },
      {
        id: "inverted",
        name: "Inverted Method",
        description:
          "Brewing with the Aeropress flipped upside down, allowing for longer steep times.",
        ratio: 16,
        defaultCoffeeAmount: 18,
        steps: (coffeeAmount: number, waterAmount: number): BrewingStep[] => [
          {
            instruction: `Add ${coffeeAmount}g of coffee to the inverted Aeropress.`,
            duration: 10,
          },
          {
            instruction: `Pour ${waterAmount}ml of water at 90°C into the Aeropress.`,
            duration: 30,
          },
          {
            instruction: "Stir the mixture for 15 seconds.",
            duration: 15,
          },
          {
            instruction: "Let the coffee steep for 1 minute.",
            duration: 60,
          },
          {
            instruction:
              "Flip the Aeropress onto your cup and press down slowly for about 30 seconds.",
            duration: 30,
          },
        ],
      },
    ],
  },
];
