export type Technique = {
  id: number;
  name: string;
  brewing_method_id: string;
  brewing_method: string;
  coffee_amount: number;
  water_amount: number;
  water_temp: number;
  grind_size: string;
  brew_time: string;
  short_description: string;
  last_used: string;
  is_favorite: boolean;
  steps: {
    order: number;
    description: string;
    time: number;
  }[];
};
