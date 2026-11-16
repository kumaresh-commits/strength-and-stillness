export interface Quote {
  text: string;
  theme: 'Discipline' | 'Stillness' | 'Nourishment' | 'Strength' | 'Consistency' | 'Recovery';
  author?: string;
}

export const dailyQuotes: Quote[] = [
  { text: "Discipline is choosing between what you want now and what you want most.", theme: "Discipline" },
  { text: "Nourish the body. Train with patience. Grow every day.", theme: "Strength" },
  { text: "Small steps, taken daily, build an unshakable body and mind.", theme: "Consistency" },
  { text: "Eat well. Train steady. Rest deeply. Repeat.", theme: "Stillness" },
  { text: "Progressive overload applies to your character as much as the barbell.", theme: "Strength" },
  { text: "The weight doesn't get lighter; your mind gets stronger.", theme: "Discipline" },
  { text: "Muscles grow during stillness and sleep, not during the frenzy of the gym.", theme: "Recovery" },
  { text: "Consistency is quiet. It doesn't shout; it shows up every single day.", theme: "Consistency" },
  { text: "Fuel your body with intention. Food is either medicine or hindrance.", theme: "Nourishment" },
  { text: "When motivation fades, ritual and habit carry the torch.", theme: "Discipline" },
  { text: "Patience is not passive waiting; it is working daily while trusting the harvest.", theme: "Stillness" },
  { text: "Do not negotiate with weakness. Honour your commitments to yourself.", theme: "Discipline" },
  { text: "Heavy lifting builds the frame; quiet recovery builds the longevity.", theme: "Recovery" },
  { text: "Your future physique is forged in today's ordinary, unglamorous reps.", theme: "Strength" },
  { text: "Calm water runs deep. Train with quiet focus, not chaotic ego.", theme: "Stillness" },
  { text: "Every meal logged and every set completed is a vote for who you are becoming.", theme: "Consistency" },
  { text: "Respect the rest days. An overtrained body cannot build new tissue.", theme: "Recovery" },
  { text: "Strength is not just moving weight; it is the poise to remain still under pressure.", theme: "Strength" },
  { text: "Never trade a lifetime of lasting health for a moment of fleeting comfort.", theme: "Discipline" },
  { text: "Eat to grow. Train to challenge. Sleep to restore.", theme: "Nourishment" },
  { text: "You don't have to be extreme; you just have to be relentless.", theme: "Consistency" },
  { text: "Stillness is the root of all movement. Center your mind before you lift.", theme: "Stillness" },
  { text: "A missed meal or a skipped workout is a choice. Choose your highest self.", theme: "Discipline" },
  { text: "The master has failed more times than the beginner has even tried.", theme: "Strength" },
  { text: "Hydrate your cells, nourish your muscles, and let deep rest do its work.", theme: "Recovery" },
  { text: "True toughness is silent. It endures the routine without needing applause.", theme: "Stillness" },
  { text: "One clean meal won't make you fit; one skipped set won't break you. Consistency decides.", theme: "Consistency" },
  { text: "The barbell is an honest mirror. It returns exactly what effort you invest.", theme: "Strength" },
  { text: "Feed the muscle, not the craving. Fuel the mission, not the distraction.", theme: "Nourishment" },
  { text: "Master the basics: wholesome food, heavy compounds, 8 hours of sleep.", theme: "Consistency" },
  { text: "Be proud of every rep, but stay hungry for tomorrow's growth.", theme: "Strength" },
];

/**
 * Returns a deterministic quote for any calendar date so it automatically updates daily!
 */
export function getDailyQuote(date: Date = new Date()): Quote {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
  const index = Math.abs(dayOfYear) % dailyQuotes.length;
  return dailyQuotes[index];
}
