export interface ShakeRecipe {
  dayId: string;
  dayIndex: number; // 0=Sunday, 1=Monday ... 6=Saturday
  dayName: string;
  name: string;
  emoji: string;
  tagline: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  prepTime: string;
  ingredients: { name: string; amount: string }[];
  instructions: string[];
  coachTip: string;
}

export const dailyShakeRecipes: ShakeRecipe[] = [
  // 1. MONDAY: Classic Banana-Oats Peanut Butter
  {
    dayId: 'monday',
    dayIndex: 1,
    dayName: 'Monday',
    name: 'Classic Banana-Oats Mass Shake',
    emoji: '🍌',
    tagline: 'The timeless foundation shake for lean bulking and morning energy.',
    calories: 720,
    protein: 32,
    carbs: 95,
    fats: 24,
    prepTime: '2 mins',
    ingredients: [
      { name: 'Ripe Bananas', amount: '2 medium' },
      { name: 'Rolled Oats (Dry or pre-soaked)', amount: '60 grams' },
      { name: 'Natural Peanut Butter', amount: '2 tbsp' },
      { name: 'Whole Cream Milk', amount: '300 ml' },
      { name: 'Soft Dates (Khajoor)', amount: '2 pitted' },
      { name: 'Cardamom (Elaichi) powder', amount: '1 pinch' },
    ],
    instructions: [
      'Add rolled oats to blender first and pulse into fine powder (10 secs).',
      'Add sliced bananas, peanut butter, dates, and chilled milk.',
      'Blend on high for 45–60 seconds until silky smooth.',
      'Pour into a tall glass and drink fresh post-workout or for breakfast.',
    ],
    coachTip: 'Soak the oats in warm water or milk for 10 minutes beforehand for smoother texture and easier digestion.',
  },

  // 2. TUESDAY: Desi Sattu & Almond Protein Shake
  {
    dayId: 'tuesday',
    dayIndex: 2,
    dayName: 'Tuesday',
    name: 'Desi Sattu & Almond Power Shake',
    emoji: '🌾',
    tagline: 'Traditional Indian superfood packed with plant protein and gut-friendly fiber.',
    calories: 660,
    protein: 30,
    carbs: 82,
    fats: 22,
    prepTime: '2 mins',
    ingredients: [
      { name: 'Roasted Chana Sattu (Gram flour)', amount: '4 tbsp (50g)' },
      { name: 'Chilled Whole Milk', amount: '300 ml' },
      { name: 'Raw Almonds (Badam)', amount: '8 crushed' },
      { name: 'Ripe Banana', amount: '1 large' },
      { name: 'Organic Jaggery (Gud) or Honey', amount: '1 tbsp' },
      { name: 'Cinnamon or Elaichi powder', amount: '1/4 tsp' },
    ],
    instructions: [
      'In a blender, add sattu powder, milk, sliced banana, and jaggery.',
      'Blend for 30 seconds until completely lump-free.',
      'Top with crushed almonds for a satisfying crunch.',
    ],
    coachTip: 'Sattu is naturally cooling and has a low glycemic index, providing sustained energy without blood sugar spikes.',
  },

  // 3. WEDNESDAY: Chikoo & Peanut Butter Cream Shake
  {
    dayId: 'wednesday',
    dayIndex: 3,
    dayName: 'Wednesday',
    name: 'Chikoo & Cashew Fuel Shake',
    emoji: '🌰',
    tagline: 'Naturally rich in fructose and minerals for fast glycogen restoration.',
    calories: 740,
    protein: 28,
    carbs: 102,
    fats: 25,
    prepTime: '3 mins',
    ingredients: [
      { name: 'Fresh Ripe Chikoo (Sapota)', amount: '2 peeled & deseeded' },
      { name: 'Rolled Oats', amount: '40 grams' },
      { name: 'Cashews (Kaju)', amount: '6-8 soaked' },
      { name: 'Natural Peanut Butter', amount: '1.5 tbsp' },
      { name: 'Full Cream Milk', amount: '300 ml' },
      { name: 'Honey', amount: '1 tsp' },
    ],
    instructions: [
      'Add soaked cashews and oats into blender and pulse.',
      'Add chikoo pulp, peanut butter, honey, and cold milk.',
      'Blend on high for 60 seconds until creamy and frothy.',
    ],
    coachTip: 'Chikoo is packed with natural electrolytes (potassium, calcium, iron) that prevent muscle cramping during leg days.',
  },

  // 4. THURSDAY: Royal Anjeer & Dry Fruit Elixir
  {
    dayId: 'thursday',
    dayIndex: 4,
    dayName: 'Thursday',
    name: 'Royal Anjeer (Fig) & Date Elixir',
    emoji: '🪷',
    tagline: 'Rich Ayurvedic restorative shake loaded with iron, magnesium, and healthy fats.',
    calories: 710,
    protein: 29,
    carbs: 94,
    fats: 23,
    prepTime: '3 mins',
    ingredients: [
      { name: 'Dried Figs (Anjeer)', amount: '3 soaked in warm water' },
      { name: 'Medjool Dates', amount: '2 pitted' },
      { name: 'Almonds & Pistachios', amount: '6 almonds + 6 pistachios' },
      { name: 'Warm or Chilled Milk', amount: '300 ml' },
      { name: 'Rolled Oats or Sattu', amount: '30 grams' },
      { name: 'Kesar (Saffron)', amount: '2-3 strands' },
    ],
    instructions: [
      'Soak anjeer, almonds, and dates in warm water for 15 minutes to soften.',
      'Transfer soaked dry fruits with soaking water into blender.',
      'Add oats, saffron, and milk. Blend for 60 seconds until rich and thick.',
    ],
    coachTip: 'Anjeer promotes exceptional digestive transit and maximizes nutrient uptake from heavy meals.',
  },

  // 5. FRIDAY: Dark Cocoa & Peanut Butter Gainer
  {
    dayId: 'friday',
    dayIndex: 5,
    dayName: 'Friday',
    name: 'Dark Cocoa & Roasted Peanut Shake',
    emoji: '🍫',
    tagline: 'Antioxidant-dense chocolate treat with maximum healthy calorie density.',
    calories: 780,
    protein: 35,
    carbs: 96,
    fats: 28,
    prepTime: '2 mins',
    ingredients: [
      { name: 'Unsweetened Dark Cocoa Powder', amount: '1.5 tbsp' },
      { name: 'Natural Peanut Butter', amount: '2.5 tbsp' },
      { name: 'Ripe Bananas', amount: '2 medium' },
      { name: 'Rolled Oats', amount: '50 grams' },
      { name: 'Whole Milk', amount: '320 ml' },
      { name: 'Chia Seeds or Flaxseeds', amount: '1 tsp' },
    ],
    instructions: [
      'Grind oats and chia seeds together in blender.',
      'Add cocoa powder, peanut butter, bananas, and chilled milk.',
      'Blend for 60 seconds until thick, chocolatey, and smooth.',
    ],
    coachTip: 'Dark cocoa contains epicatechin, which promotes nitric oxide production for enhanced blood flow and gym pumps.',
  },

  // 6. SATURDAY: Apple-Cinnamon & Walnut Porridge Shake
  {
    dayId: 'saturday',
    dayIndex: 6,
    dayName: 'Saturday',
    name: 'Apple-Cinnamon & Walnut Shake',
    emoji: '🍎',
    tagline: 'Refreshing spiced shake with anti-inflammatory omega-3 fatty acids.',
    calories: 680,
    protein: 27,
    carbs: 92,
    fats: 22,
    prepTime: '3 mins',
    ingredients: [
      { name: 'Crisp Sweet Apple (chopped)', amount: '1 medium' },
      { name: 'Rolled Oats', amount: '50 grams' },
      { name: 'Walnuts (Akhrot)', amount: '4 whole halves' },
      { name: 'Natural Peanut Butter', amount: '1 tbsp' },
      { name: 'Cold Whole Milk', amount: '300 ml' },
      { name: 'Cinnamon (Dalchini) powder', amount: '1/2 tsp' },
      { name: 'Honey', amount: '1 tbsp' },
    ],
    instructions: [
      'Add chopped apple, walnuts, and oats to blender with 100ml milk.',
      'Blend on high until apple pieces are completely liquefied.',
      'Add remaining milk, peanut butter, honey, and cinnamon. Blend 30 seconds.',
    ],
    coachTip: 'Cinnamon enhances insulin sensitivity, directing carbohydrates directly into muscle glycogen instead of fat storage.',
  },

  // 7. SUNDAY: Royal Dry-Fruit Super Shake
  {
    dayId: 'sunday',
    dayIndex: 0,
    dayName: 'Sunday',
    name: 'Sunday Royal Dry-Fruit Super Shake',
    emoji: '👑',
    tagline: 'The ultimate weekend nutrient bomb for deep muscle tissue regeneration.',
    calories: 820,
    protein: 36,
    carbs: 108,
    fats: 28,
    prepTime: '3 mins',
    ingredients: [
      { name: 'Ripe Bananas', amount: '2 medium' },
      { name: 'Almonds + Cashews + Walnuts', amount: '4 of each' },
      { name: 'Golden Raisins (Kishmish)', amount: '1 tbsp' },
      { name: 'Dates (Khajoor)', amount: '2 soft dates' },
      { name: 'Rolled Oats', amount: '40 grams' },
      { name: 'Full Cream Milk', amount: '350 ml' },
      { name: 'Peanut Butter', amount: '1.5 tbsp' },
      { name: 'Saffron & Green Cardamom', amount: 'A pinch' },
    ],
    instructions: [
      'Blend all dry fruits (almonds, cashews, walnuts, raisins, dates) with oats.',
      'Add bananas, peanut butter, milk, and saffron.',
      'Blend for 60–75 seconds on highest speed until luxurious and velvety.',
      'Enjoy as a supreme recovery meal on your rest day.',
    ],
    coachTip: 'The blend of fast-digesting simple sugars from dates/raisins and slow complex carbs from oats ensures sustained recovery across 4 hours.',
  },
];

export function getShakeRecipeForDay(dayIndex: number): ShakeRecipe {
  const match = dailyShakeRecipes.find((r) => r.dayIndex === dayIndex);
  return match || dailyShakeRecipes[0];
}
