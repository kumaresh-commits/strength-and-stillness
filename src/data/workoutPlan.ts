export interface Exercise {
  name: string;
  sets: number;
  reps: string;
}

export interface WorkoutDay {
  id: string;
  dayIndex: number; // 0=Sunday, 1=Mon ... 6=Sat
  day: string;
  muscleGroup: string;
  emoji: string;
  exercises: Exercise[];
  isRestDay?: boolean;
}

export const workoutDays: WorkoutDay[] = [
  {
    id: 'monday',
    dayIndex: 1,
    day: 'Monday',
    muscleGroup: 'Chest + Triceps',
    emoji: '💪',
    exercises: [
      { name: 'Bench Press', sets: 3, reps: '8-12' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10' },
      { name: 'Chest Fly', sets: 3, reps: '12' },
      { name: 'Triceps Pushdown', sets: 3, reps: '12' },
      { name: 'Overhead Triceps Extension', sets: 2, reps: '12' },
    ],
  },
  {
    id: 'tuesday',
    dayIndex: 2,
    day: 'Tuesday',
    muscleGroup: 'Back + Biceps',
    emoji: '🏋️',
    exercises: [
      { name: 'Lat Pulldown', sets: 3, reps: '10' },
      { name: 'Seated Cable Row', sets: 3, reps: '10' },
      { name: 'One-Arm Dumbbell Row', sets: 3, reps: '10' },
      { name: 'Dumbbell Curls', sets: 3, reps: '12' },
      { name: 'Hammer Curls', sets: 2, reps: '12' },
    ],
  },
  {
    id: 'wednesday',
    dayIndex: 3,
    day: 'Wednesday',
    muscleGroup: 'Legs',
    emoji: '🦵',
    exercises: [
      { name: 'Squats', sets: 3, reps: '10' },
      { name: 'Leg Press', sets: 3, reps: '12' },
      { name: 'Leg Curls', sets: 3, reps: '12' },
      { name: 'Leg Extensions', sets: 2, reps: '12' },
      { name: 'Calf Raises', sets: 3, reps: '15' },
    ],
  },
  {
    id: 'thursday',
    dayIndex: 4,
    day: 'Thursday',
    muscleGroup: 'Shoulders + Abs',
    emoji: '🤸',
    exercises: [
      { name: 'Shoulder Press', sets: 3, reps: '10' },
      { name: 'Lateral Raises', sets: 3, reps: '12' },
      { name: 'Rear Delt Fly', sets: 3, reps: '12' },
      { name: 'Plank', sets: 3, reps: 'hold' },
      { name: 'Cable Crunch', sets: 3, reps: '12' },
    ],
  },
  {
    id: 'friday',
    dayIndex: 5,
    day: 'Friday',
    muscleGroup: 'Upper Body',
    emoji: '🔥',
    exercises: [
      { name: 'Incline Press', sets: 3, reps: '10' },
      { name: 'Cable Row', sets: 3, reps: '10' },
      { name: 'Lat Pulldown', sets: 3, reps: '10' },
      { name: 'Biceps Curls', sets: 2, reps: '12' },
      { name: 'Triceps Pushdown', sets: 2, reps: '12' },
    ],
  },
  {
    id: 'saturday',
    dayIndex: 6,
    day: 'Saturday',
    muscleGroup: 'Recovery',
    emoji: '🧘',
    exercises: [],
    isRestDay: true,
  },
  {
    id: 'sunday',
    dayIndex: 0,
    day: 'Sunday',
    muscleGroup: 'Recovery',
    emoji: '😴',
    exercises: [],
    isRestDay: true,
  },
];

export const trainingNotes = [
  "Start with manageable weights and don't train to failure on every set.",
  'Since your weight is dropping, avoid excessive cardio.',
  "Don't increase training volume until your recovery and weight trend improve.",
];

export const motivationalQuotes = [
  'Discipline is choosing between what you want now and what you want most.',
  'Eat well. Train steady. Rest deeply. Repeat.',
  'Small steps, taken daily, build an unshakable body and mind.',
  'Nourish the body. Train with patience. Grow every day.',
  'The body achieves what the mind believes.',
  'Success is the sum of small efforts, repeated day in and day out.',
  'Your only limit is you.',
  "Don't stop when you're tired. Stop when you're done.",
  'The pain you feel today will be the strength you feel tomorrow.',
  'Push yourself, because no one else is going to do it for you.',
];
