export interface MealItem {
  name: string;
  vegAlternative?: string;
  nutritionNote?: string;
}

export interface Meal {
  id: string;
  time: string;
  title: string;
  emoji: string;
  calories: number;
  protein: number;
  vegCalories?: number;
  vegProtein?: number;
  items: MealItem[];
  macroTag?: string;
}

export interface DayDietPlan {
  dayId: string;
  dayIndex: number; // 0=Sunday, 1=Monday ... 6=Saturday
  dayName: string;
  theme: string;
  highlightFood: string;
  meals: Meal[];
}

export interface GroceryItem {
  category: 'Dairy & Poultry' | 'Grains & Atta' | 'Lentils (Dals)' | 'Dry Fruits & Fruits' | 'Mandi Vegetables';
  name: string;
  quantity: string;
}

export const weeklyGroceryList: GroceryItem[] = [
  // Dairy & Poultry
  { category: 'Dairy & Poultry', name: 'Eggs (Poultry or Country)', quantity: '1 to 2 dozen' },
  { category: 'Dairy & Poultry', name: 'Fresh Paneer (Malai / Dairy)', quantity: '1 kg (for veg mode)' },
  { category: 'Dairy & Poultry', name: 'Full Cream or Toned Milk', quantity: '1.5 Litres / day' },
  { category: 'Dairy & Poultry', name: 'Fresh Dahi (Curd)', quantity: '500g daily' },
  { category: 'Dairy & Poultry', name: 'Chicken Breast / Curry Cut', quantity: '1 kg (for non-veg)' },
  
  // Grains & Atta
  { category: 'Grains & Atta', name: 'Rolled Oats', quantity: '1 kg pack' },
  { category: 'Grains & Atta', name: 'Chakki Whole Wheat Atta', quantity: '5 kg' },
  { category: 'Grains & Atta', name: 'Rice (Basmati / Sona Masoori)', quantity: '3 kg' },
  { category: 'Grains & Atta', name: 'Poha (Thick beaten rice)', quantity: '500g' },
  { category: 'Grains & Atta', name: 'Desi Chana Sattu', quantity: '500g' },

  // Lentils (Dals)
  { category: 'Lentils (Dals)', name: 'Yellow Moong Dal', quantity: '1 kg' },
  { category: 'Lentils (Dals)', name: 'Toor / Arhar Dal', quantity: '1 kg' },
  { category: 'Lentils (Dals)', name: 'Rajma (Chitra or Red)', quantity: '500g' },
  { category: 'Lentils (Dals)', name: 'Kala Chana (Bengal Gram)', quantity: '500g' },
  { category: 'Lentils (Dals)', name: 'Soya Chunks', quantity: '200g box' },

  // Dry Fruits & Fruits
  { category: 'Dry Fruits & Fruits', name: 'Fresh Bananas (Robusta / Yelakki)', quantity: '2–3 dozen / week' },
  { category: 'Dry Fruits & Fruits', name: 'Medjool / Kimia Dates (Khajoor)', quantity: '500g' },
  { category: 'Dry Fruits & Fruits', name: 'Natural Peanut Butter', quantity: '1 kg jar' },
  { category: 'Dry Fruits & Fruits', name: 'Raw Almonds (Badam)', quantity: '250g' },
  { category: 'Dry Fruits & Fruits', name: 'Cashews (Kaju)', quantity: '250g' },
  { category: 'Dry Fruits & Fruits', name: 'Makhana (Foxnuts)', quantity: '200g' },

  // Mandi Vegetables
  { category: 'Mandi Vegetables', name: 'Fresh Spinach (Palak)', quantity: '2 bunches' },
  { category: 'Mandi Vegetables', name: 'Green Peas (Matar)', quantity: '500g' },
  { category: 'Mandi Vegetables', name: 'Cucumbers, Tomatoes & Onions', quantity: 'Daily salad staples' },
  { category: 'Mandi Vegetables', name: 'Sweet Potatoes (Shakarkandi)', quantity: '1 kg' },
];

export const weeklyDietPlans: DayDietPlan[] = [
  // 1. MONDAY: The Foundation Bulking Routine
  {
    dayId: 'monday',
    dayIndex: 1,
    dayName: 'Monday',
    theme: 'Oats & High-Protein Foundation',
    highlightFood: 'Eggs / Paneer, Oats, Peanut Butter & Curd',
    meals: [
      {
        id: 'mon-breakfast',
        time: '7:30 AM',
        title: 'Breakfast',
        emoji: '🍳',
        calories: 650,
        protein: 35,
        vegCalories: 640,
        vegProtein: 32,
        macroTag: 'Protein + Complex Carbs + Healthy Fats',
        items: [
          { name: '3 Whole Eggs (Boiled or Omelette)', vegAlternative: '150g Fresh Paneer (Bhurji or Grilled)' },
          { name: '2 Large Bananas' },
          { name: '60g Rolled Oats with 250ml Milk' },
          { name: '1 tbsp Natural Peanut Butter' },
        ],
      },
      {
        id: 'mon-lunch',
        time: '1:00 PM',
        title: 'Lunch',
        emoji: '🍛',
        calories: 800,
        protein: 42,
        vegCalories: 780,
        vegProtein: 38,
        items: [
          { name: '2 cups Cooked Rice (or 3 Phulkas)' },
          { name: '150g Chicken Curry', vegAlternative: '200g Paneer Butter Masala or Paneer Curry' },
          { name: '1 bowl Dal Tadka with seasonal sabzi' },
          { name: '1 bowl Fresh Curd (Dahi)' },
        ],
      },
      {
        id: 'mon-snack',
        time: '4:30 PM',
        title: 'Evening Snack',
        emoji: '🍌',
        calories: 400,
        protein: 18,
        vegCalories: 400,
        vegProtein: 18,
        items: [
          { name: '1 Banana' },
          { name: '250ml Whole / Toned Milk' },
          { name: '1 tbsp Peanut Butter' },
          { name: '6-8 Almonds (Badam)' },
        ],
      },
      {
        id: 'mon-dinner',
        time: '8:00 PM',
        title: 'Dinner',
        emoji: '🥘',
        calories: 650,
        protein: 32,
        vegCalories: 630,
        vegProtein: 28,
        items: [
          { name: '3 Whole Wheat Chapatis (or 1 bowl Rice)' },
          { name: '150g Chicken or Paneer Sabzi', vegAlternative: 'Paneer Bhurji / Matar Paneer' },
          { name: '1 bowl Green Vegetables (Beans/Lauki/Carrots)' },
          { name: '1 small bowl Curd (optional)' },
        ],
      },
      {
        id: 'mon-sleep',
        time: '9:30 PM',
        title: 'Before Sleeping',
        emoji: '🌙',
        calories: 250,
        protein: 13,
        vegCalories: 250,
        vegProtein: 13,
        items: [
          { name: '1 glass Warm Milk' },
          { name: '2 Soft Dates (Khajoor)' },
          { name: '4-5 Cashews (Kaju)' },
        ],
      },
    ],
  },

  // 2. TUESDAY: Soya & Rajma Powerhouse
  {
    dayId: 'tuesday',
    dayIndex: 2,
    dayName: 'Tuesday',
    theme: 'Soya, Rajma & Dal Chilla Day',
    highlightFood: 'Moong Chilla, Rajma & Soya Chunks',
    meals: [
      {
        id: 'tue-breakfast',
        time: '7:30 AM',
        title: 'Breakfast',
        emoji: '🥞',
        calories: 660,
        protein: 36,
        vegCalories: 650,
        vegProtein: 33,
        macroTag: 'Fiber + Dense Plant Protein + Carbs',
        items: [
          { name: '3 Moong Dal / Besan Chillas with Paneer stuffing', vegAlternative: '3 Moong Dal Chillas + 100g Paneer' },
          { name: '3 Boiled Eggs (for non-veg)', vegAlternative: '1 Extra Stuffed Chilla with Curd' },
          { name: '2 Bananas' },
          { name: '1 glass Milk with 1 tsp Honey' },
        ],
      },
      {
        id: 'tue-lunch',
        time: '1:00 PM',
        title: 'Lunch',
        emoji: '🍛',
        calories: 820,
        protein: 43,
        vegCalories: 800,
        vegProtein: 40,
        items: [
          { name: '3 Phulkas + 1 cup Steamed Rice' },
          { name: '150g Chicken Masala', vegAlternative: '1 bowl High-Protein Soya Chunks Curry (50g dry soya)' },
          { name: '1 bowl Rajma (Kidney Beans Curry)' },
          { name: 'Cucumber & Tomato Salad with 1 bowl Curd' },
        ],
      },
      {
        id: 'tue-snack',
        time: '4:30 PM',
        title: 'Evening Snack',
        emoji: '🥣',
        calories: 390,
        protein: 17,
        vegCalories: 390,
        vegProtein: 17,
        items: [
          { name: '1 bowl Ghee-Roasted Makhana (Foxnuts)' },
          { name: '1 Banana with 1 tbsp Peanut Butter' },
          { name: '1 glass Lassi or Fresh Milk' },
          { name: '4 Walnuts (Akhrot)' },
        ],
      },
      {
        id: 'tue-dinner',
        time: '8:00 PM',
        title: 'Dinner',
        emoji: '🥘',
        calories: 640,
        protein: 31,
        vegCalories: 620,
        vegProtein: 27,
        items: [
          { name: '3 Chapatis with a dab of desi ghee' },
          { name: '150g Chicken Breast Stir-Fry', vegAlternative: '200g Palak Paneer or Soya Gravy' },
          { name: '1 bowl Yellow Moong Dal' },
          { name: 'Sauteed Green Beans / Capsicum' },
        ],
      },
      {
        id: 'tue-sleep',
        time: '9:30 PM',
        title: 'Before Sleeping',
        emoji: '🌙',
        calories: 240,
        protein: 13,
        vegCalories: 240,
        vegProtein: 13,
        items: [
          { name: '1 glass Warm Haldi (Turmeric) Milk' },
          { name: '2 Medjool Dates' },
          { name: '4 Soaked Almonds' },
        ],
      },
    ],
  },

  // 3. WEDNESDAY: Fish / Egg & Chana Boost
  {
    dayId: 'wednesday',
    dayIndex: 3,
    dayName: 'Wednesday',
    theme: 'Peanut Poha, Chana & Fish / Egg Boost',
    highlightFood: 'Roasted Peanuts, Kala Chana & Fresh Fish / Eggs',
    meals: [
      {
        id: 'wed-breakfast',
        time: '7:30 AM',
        title: 'Breakfast',
        emoji: '🥗',
        calories: 650,
        protein: 34,
        vegCalories: 640,
        vegProtein: 30,
        macroTag: 'Omega-3s + Wholesome Grains + Clean Protein',
        items: [
          { name: '1 large bowl Poha with roasted peanuts & green peas' },
          { name: '3 Boiled Eggs', vegAlternative: '150g Pan-seared Paneer Cubes' },
          { name: '2 Bananas' },
          { name: '1 glass Fresh Milk' },
        ],
      },
      {
        id: 'wed-lunch',
        time: '1:00 PM',
        title: 'Lunch',
        emoji: '🍲',
        calories: 810,
        protein: 44,
        vegCalories: 790,
        vegProtein: 39,
        items: [
          { name: '2 cups Steamed Rice' },
          { name: '150g Fish Curry or 3 Egg Curry', vegAlternative: '1 large bowl Punjabi Chole / Black Chana Masala with Paneer' },
          { name: 'Palak (Spinach) or Methi Sabzi' },
          { name: '1 bowl Fresh Curd (Dahi)' },
        ],
      },
      {
        id: 'wed-snack',
        time: '4:30 PM',
        title: 'Evening Snack',
        emoji: '🥜',
        calories: 410,
        protein: 19,
        vegCalories: 410,
        vegProtein: 19,
        items: [
          { name: '1 bowl Boiled Sprouted Kala Chana Chaat (with lemon & onion)' },
          { name: '1 Banana' },
          { name: '1 glass Milk' },
          { name: 'A handful of Roasted Peanuts (Mungfali)' },
        ],
      },
      {
        id: 'wed-dinner',
        time: '8:00 PM',
        title: 'Dinner',
        emoji: '🥘',
        calories: 630,
        protein: 30,
        vegCalories: 620,
        vegProtein: 27,
        items: [
          { name: '3 Whole Wheat Chapatis' },
          { name: 'Chicken Keema (150g)', vegAlternative: 'Paneer Bhurji (200g)' },
          { name: '1 bowl Toor Dal with carrots & pumpkin' },
          { name: '1 cup Curd' },
        ],
      },
      {
        id: 'wed-sleep',
        time: '9:30 PM',
        title: 'Before Sleeping',
        emoji: '🌙',
        calories: 250,
        protein: 13,
        vegCalories: 250,
        vegProtein: 13,
        items: [
          { name: '1 glass Warm Milk with Cardamom' },
          { name: '2 Dates' },
          { name: '4 Cashews & 2 Walnuts' },
        ],
      },
    ],
  },

  // 4. THURSDAY: South Indian Fuel & Sprouts
  {
    dayId: 'thursday',
    dayIndex: 4,
    dayName: 'Thursday',
    theme: 'Idli, Sambar, Sprouts & Kadai Paneer',
    highlightFood: 'Fermented Rice/Urad, Lentil Sambar & Kadai Spices',
    meals: [
      {
        id: 'thu-breakfast',
        time: '7:30 AM',
        title: 'Breakfast',
        emoji: '🍛',
        calories: 640,
        protein: 33,
        vegCalories: 630,
        vegProtein: 30,
        macroTag: 'Fermented Gut Health + Clean Carbs + High Protein',
        items: [
          { name: '3-4 Steamed Idlis or 1 Masala Dosa with Drumstick Sambar' },
          { name: '3 Boiled Eggs', vegAlternative: '1 bowl Sprouted Moong Salad with 120g Paneer' },
          { name: '2 Bananas' },
          { name: '1 glass Whole Milk' },
        ],
      },
      {
        id: 'thu-lunch',
        time: '1:00 PM',
        title: 'Lunch',
        emoji: '🍲',
        calories: 820,
        protein: 43,
        vegCalories: 800,
        vegProtein: 39,
        items: [
          { name: '2 cups Cooked Rice (or 3 Phulkas)' },
          { name: '150g Chicken Curry', vegAlternative: '200g Kadai Paneer with Bell Peppers' },
          { name: '1 bowl Thick Dal Sambar / Toor Dal' },
          { name: 'Cabbage & Carrot Poriyal with 1 bowl Curd' },
        ],
      },
      {
        id: 'thu-snack',
        time: '4:30 PM',
        title: 'Evening Snack',
        emoji: '🥪',
        calories: 420,
        protein: 18,
        vegCalories: 420,
        vegProtein: 18,
        items: [
          { name: '2 Whole Wheat Bread Slices with Peanut Butter & Banana Slices' },
          { name: '250ml Milk with a pinch of turmeric' },
          { name: '6 Almonds' },
        ],
      },
      {
        id: 'thu-dinner',
        time: '8:00 PM',
        title: 'Dinner',
        emoji: '🥘',
        calories: 630,
        protein: 31,
        vegCalories: 610,
        vegProtein: 27,
        items: [
          { name: '3 Chapatis' },
          { name: '150g Chicken Tikka Masala', vegAlternative: '200g Paneer Tikka Masala' },
          { name: '1 bowl Yellow Moong Dal' },
          { name: 'Lemon Onion Salad' },
        ],
      },
      {
        id: 'thu-sleep',
        time: '9:30 PM',
        title: 'Before Sleeping',
        emoji: '🌙',
        calories: 240,
        protein: 13,
        vegCalories: 240,
        vegProtein: 13,
        items: [
          { name: '1 glass Warm Milk' },
          { name: '2 Dried Figs (Anjeer) or 2 Dates' },
          { name: '4 Cashews' },
        ],
      },
    ],
  },

  // 5. FRIDAY: Paratha & Desi Sattu Energy
  {
    dayId: 'friday',
    dayIndex: 5,
    dayName: 'Friday',
    theme: 'Paneer Parathas, Pulao & Bihar Sattu',
    highlightFood: 'Stuffed Parathas, Roasted Sattu & Paneer Pulao',
    meals: [
      {
        id: 'fri-breakfast',
        time: '7:30 AM',
        title: 'Breakfast',
        emoji: '🫓',
        calories: 700,
        protein: 36,
        vegCalories: 690,
        vegProtein: 33,
        macroTag: 'Dense Morning Calories + Sustained Gym Energy',
        items: [
          { name: '2 Paneer Stuffed Parathas with 1 bowl Dahi & Desi Ghee', vegAlternative: '2 Paneer Parathas + 1 bowl Dahi' },
          { name: '2 Boiled Eggs (optional for non-veg)' },
          { name: '2 Bananas' },
          { name: '1 glass Milk' },
        ],
      },
      {
        id: 'fri-lunch',
        time: '1:00 PM',
        title: 'Lunch',
        emoji: '🍛',
        calories: 830,
        protein: 43,
        vegCalories: 810,
        vegProtein: 39,
        items: [
          { name: '2 cups Fragrant Chicken Pulao / Biryani', vegAlternative: '2 cups Paneer & Green Peas Pulao (200g Paneer)' },
          { name: '1 bowl Thick Dal Tadka' },
          { name: 'Boondi / Cucumber Raita' },
          { name: 'Carrot & Beetroot Salad' },
        ],
      },
      {
        id: 'fri-snack',
        time: '4:30 PM',
        title: 'Evening Snack',
        emoji: '🥤',
        calories: 410,
        protein: 20,
        vegCalories: 410,
        vegProtein: 20,
        items: [
          { name: 'Desi Sattu Drink (4 tbsp Roasted Chana Powder in 300ml cold water/milk with lemon & jeera)' },
          { name: '1 Banana' },
          { name: '1 tbsp Peanut Butter' },
          { name: 'A few Almonds' },
        ],
      },
      {
        id: 'fri-dinner',
        time: '8:00 PM',
        title: 'Dinner',
        emoji: '🥘',
        calories: 620,
        protein: 30,
        vegCalories: 600,
        vegProtein: 26,
        items: [
          { name: '3 Chapatis' },
          { name: '150g Chicken Curry', vegAlternative: '200g Paneer Do Pyaza' },
          { name: 'Aloo Gobi or Green Peas Sabzi' },
          { name: '1 bowl Fresh Curd' },
        ],
      },
      {
        id: 'fri-sleep',
        time: '9:30 PM',
        title: 'Before Sleeping',
        emoji: '🌙',
        calories: 240,
        protein: 13,
        vegCalories: 240,
        vegProtein: 13,
        items: [
          { name: '1 glass Warm Milk with Elaichi & Nutmeg' },
          { name: '2 Dates' },
          { name: '4 Cashews' },
        ],
      },
    ],
  },

  // 6. SATURDAY: Black Dal & Shakarkandi Recharge
  {
    dayId: 'saturday',
    dayIndex: 6,
    dayName: 'Saturday',
    theme: 'Egg Bhurji, Black Dal & Sweet Potato',
    highlightFood: 'Egg/Paneer Bhurji, Shakarkandi & Urad Dal',
    meals: [
      {
        id: 'sat-breakfast',
        time: '7:30 AM',
        title: 'Breakfast',
        emoji: '🍳',
        calories: 670,
        protein: 35,
        vegCalories: 660,
        vegProtein: 32,
        macroTag: 'Active Recovery Carbohydrates + Protein',
        items: [
          { name: '3 Egg Masala Bhurji with 2 Multi-grain Toasts', vegAlternative: '180g Paneer Masala Bhurji with 2 Toasts' },
          { name: '2 Bananas' },
          { name: '60g Oats Porridge with Milk & Honey' },
          { name: '1 tbsp Peanut Butter' },
        ],
      },
      {
        id: 'sat-lunch',
        time: '1:00 PM',
        title: 'Lunch',
        emoji: '🍲',
        calories: 820,
        protein: 42,
        vegCalories: 800,
        vegProtein: 38,
        items: [
          { name: '2 cups Steamed Rice (or 3 Phulkas)' },
          { name: '150g Chicken Saag (Spinach Chicken)', vegAlternative: 'Palak Paneer (200g fresh paneer)' },
          { name: '1 bowl Black Dal (Maa ki Dal / Urad Dal)' },
          { name: '1 bowl Curd with Roasted Cumin' },
        ],
      },
      {
        id: 'sat-snack',
        time: '4:30 PM',
        title: 'Evening Snack',
        emoji: '🍠',
        calories: 390,
        protein: 16,
        vegCalories: 390,
        vegProtein: 16,
        items: [
          { name: '1 bowl Boiled Sweet Potato (Shakarkandi) Chaat with lemon' },
          { name: '1 Banana' },
          { name: '250ml Milk' },
          { name: 'Handful of Roasted Peanuts' },
        ],
      },
      {
        id: 'sat-dinner',
        time: '8:00 PM',
        title: 'Dinner',
        emoji: '🥘',
        calories: 630,
        protein: 31,
        vegCalories: 610,
        vegProtein: 27,
        items: [
          { name: '3 Chapatis with ghee' },
          { name: '150g Chicken Masala', vegAlternative: 'Shahi Paneer or Paneer Makhani' },
          { name: 'Stir-fried Seasonal Vegetables' },
          { name: '1 cup Curd' },
        ],
      },
      {
        id: 'sat-sleep',
        time: '9:30 PM',
        title: 'Before Sleeping',
        emoji: '🌙',
        calories: 250,
        protein: 13,
        vegCalories: 250,
        vegProtein: 13,
        items: [
          { name: '1 glass Warm Milk' },
          { name: '2 Soft Dates' },
          { name: '4 Cashews & 4 Almonds' },
        ],
      },
    ],
  },

  // 7. SUNDAY: Sunday Indian Feast & Deep Recovery
  {
    dayId: 'sunday',
    dayIndex: 0,
    dayName: 'Sunday',
    theme: 'Jeera Rice, Shahi Paneer & Royal Haldi Milk',
    highlightFood: 'Jeera Rice, Sunday Curry & Royal Dry Fruits',
    meals: [
      {
        id: 'sun-breakfast',
        time: '7:30 AM',
        title: 'Breakfast',
        emoji: '🥞',
        calories: 680,
        protein: 36,
        vegCalories: 670,
        vegProtein: 33,
        macroTag: 'Relaxed Sunday Nourishment + Deep Repair',
        items: [
          { name: '3 Fluffy Cheese & Herb Omelettes with Toast', vegAlternative: '3 Stuffed Paneer Cheelas with Mint Chutney' },
          { name: '2 Bananas' },
          { name: '1 glass Rich Milk Shake with 1 tbsp Peanut Butter' },
        ],
      },
      {
        id: 'sun-lunch',
        time: '1:00 PM',
        title: 'Lunch',
        emoji: '🍛',
        calories: 840,
        protein: 44,
        vegCalories: 820,
        vegProtein: 40,
        items: [
          { name: '2 cups Fragrant Jeera Rice' },
          { name: '150g Sunday Chicken / Mutton Curry', vegAlternative: '200g Shahi Paneer with cashew-tomato gravy' },
          { name: '1 bowl Yellow Dal Fry' },
          { name: 'Cucumber Kachumber Salad with 1 bowl Curd' },
        ],
      },
      {
        id: 'sun-snack',
        time: '4:30 PM',
        title: 'Evening Snack',
        emoji: '🍎',
        calories: 400,
        protein: 17,
        vegCalories: 400,
        vegProtein: 17,
        items: [
          { name: '1 bowl Mixed Fruit Chaat (Papaya, Apple, Banana with Chaat Masala)' },
          { name: '250ml Milk' },
          { name: '1 tbsp Peanut Butter' },
          { name: 'Soaked Almonds & Walnuts' },
        ],
      },
      {
        id: 'sun-dinner',
        time: '8:00 PM',
        title: 'Dinner',
        emoji: '🥘',
        calories: 620,
        protein: 30,
        vegCalories: 610,
        vegProtein: 26,
        items: [
          { name: '3 soft Phulkas' },
          { name: 'Chicken Soup / Stew with veggies (150g)', vegAlternative: 'Matar Paneer with warm Jeera Dal' },
          { name: 'Sauteed Greens & Carrots' },
          { name: '1 cup Curd' },
        ],
      },
      {
        id: 'sun-sleep',
        time: '9:30 PM',
        title: 'Before Sleeping',
        emoji: '🌙',
        calories: 250,
        protein: 13,
        vegCalories: 250,
        vegProtein: 13,
        items: [
          { name: '1 glass Warm Saffron-Cardamom (Kesar-Elaichi) Milk' },
          { name: '2 Medjool Dates' },
          { name: '5 Cashews' },
        ],
      },
    ],
  },
];

// Helper to get diet plan for any day index (0=Sun .. 6=Sat)
export function getDietPlanForDay(dayIndex: number): DayDietPlan {
  const match = weeklyDietPlans.find((p) => p.dayIndex === dayIndex);
  return match || weeklyDietPlans[0];
}

// Default export for compatibility
export const meals = weeklyDietPlans[1].meals; // Monday default

export const foodRules = [
  "Don't skip breakfast or lunch.",
  'Include protein in every main meal.',
  'Eat carbohydrates — rice, potatoes, oats and chapati are useful for gym energy.',
  'If you cannot eat enough, use a homemade banana-milk-oats shake.',
  'Whey protein is optional, not compulsory. You can meet your protein target through food.',
];
