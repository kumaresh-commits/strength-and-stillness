import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getTodayDateStr, getDayIdFromDateStr } from '../lib/dateUtils';

export { getTodayDateStr };

export type ThemeMode = 'dawn' | 'cyber' | 'ayurvedic';

export interface CompletedSet {
  exerciseIndex: number;
  setIndex: number;
  weight?: number;
}

export interface DayLog {
  completedMeals: string[];
  completedSets: Record<string, CompletedSet[]>;
  waterGlasses: number;
  sleepHours: number;
  steps: number;
  workoutDone: boolean;
}

export interface Reminder {
  id: string;
  label: string;
  time: string; // HH:mm
  enabled: boolean;
  daysOfWeek: number[]; // 0=Sun..6=Sat
  sound: string;
  message: string;
}

export interface DailyGoals {
  calories: number;
  protein: number;
  meals: number;
  waterGlasses: number;
  sleepHours: number;
  steps: number;
}

export interface NotificationSettings {
  pushEnabled: boolean;
  toastsEnabled: boolean;
  motivationalQuotes: boolean;
  motivationalQuoteTime: string;
  streakWarnings: boolean;
  goalCelebration: boolean;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  weeklyDigest: boolean;
  weeklyDigestDay: number;
  weeklyDigestTime: string;
  masterMute: boolean;
  soundVolume: number;
  vibrationEnabled: boolean;
}

interface AppState {
  theme: ThemeMode;
  isVegetarian: boolean;
  activeTab: number;
  currentDate: string;
  dayLogs: Record<string, DayLog>;
  reminders: Reminder[];
  dailyGoals: DailyGoals;
  notificationSettings: NotificationSettings;
  streakData: { currentDiet: number; longestDiet: number; currentGym: number; longestGym: number };
  dailyAffirmationsPrayed: Record<string, boolean>;
  affirmationLanguage: 'en' | 'ta';

  setTheme: (t: ThemeMode) => void;
  toggleVegetarian: () => void;
  setActiveTab: (tab: number) => void;
  setCurrentDate: (date: string) => void;
  syncTodayDate: () => void;
  setAffirmationLanguage: (lang: 'en' | 'ta') => void;
  toggleAffirmationLanguage: () => void;
  toggleMeal: (date: string, mealId: string) => void;
  toggleSet: (date: string, dayId: string, exerciseIndex: number, setIndex: number, weight?: number) => void;
  setWaterGlasses: (date: string, glasses: number) => void;
  setSleepHours: (date: string, hours: number) => void;
  setSteps: (date: string, steps: number) => void;
  toggleWorkoutDone: (date: string, dayId?: string) => void;
  markDayAllCompleted: (date: string, dayId?: string) => void;
  toggleAffirmationPrayed: (date: string) => void;
  updateReminder: (id: string, updates: Partial<Reminder>) => void;
  addReminder: (reminder: Reminder) => void;
  removeReminder: (id: string) => void;
  setDailyGoals: (goals: Partial<DailyGoals>) => void;
  setNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  getDayLog: (date: string) => DayLog;
}

const defaultDayLog: DayLog = {
  completedMeals: [],
  completedSets: {},
  waterGlasses: 0,
  sleepHours: 0,
  steps: 0,
  workoutDone: false,
};

// Permanent completed seed for Monday Nov 16 so the user's completed tasks are fully displayed
export const monday16CompletedLog: DayLog = {
  completedMeals: ['mon-breakfast', 'mon-lunch', 'mon-snack', 'mon-dinner', 'mon-sleep'],
  completedSets: {
    monday: [
      { exerciseIndex: 0, setIndex: 0 }, { exerciseIndex: 0, setIndex: 1 }, { exerciseIndex: 0, setIndex: 2 }, { exerciseIndex: 0, setIndex: 3 },
      { exerciseIndex: 1, setIndex: 0 }, { exerciseIndex: 1, setIndex: 1 }, { exerciseIndex: 1, setIndex: 2 },
      { exerciseIndex: 2, setIndex: 0 }, { exerciseIndex: 2, setIndex: 1 }, { exerciseIndex: 2, setIndex: 2 },
      { exerciseIndex: 3, setIndex: 0 }, { exerciseIndex: 3, setIndex: 1 }, { exerciseIndex: 3, setIndex: 2 }, { exerciseIndex: 3, setIndex: 3 },
    ],
  },
  waterGlasses: 8,
  sleepHours: 8,
  steps: 6500,
  workoutDone: true,
};

const defaultReminders: Reminder[] = [
  { id: 'breakfast', label: 'Breakfast', time: '07:15', enabled: true, daysOfWeek: [0,1,2,3,4,5,6], sound: 'chime', message: 'Time to fuel up! Oats, bananas & eggs/paneer 🍳' },
  { id: 'lunch', label: 'Lunch', time: '12:45', enabled: true, daysOfWeek: [0,1,2,3,4,5,6], sound: 'chime', message: 'Lunch hour! Rice, chicken/paneer, veggies & curd 🍛' },
  { id: 'snack', label: 'Evening Snack', time: '16:15', enabled: true, daysOfWeek: [0,1,2,3,4,5,6], sound: 'chime', message: 'Banana, milk, peanut butter & almonds 🍌' },
  { id: 'dinner', label: 'Dinner', time: '19:45', enabled: true, daysOfWeek: [0,1,2,3,4,5,6], sound: 'chime', message: 'Dinner time — 3 chapatis & protein! 🥘' },
  { id: 'before-sleep', label: 'Before Sleep', time: '21:15', enabled: true, daysOfWeek: [0,1,2,3,4,5,6], sound: 'chime', message: 'Warm milk, dates & cashews for night recovery 🌙' },
  { id: 'workout', label: 'Gym Workout', time: '06:00', enabled: true, daysOfWeek: [1,2,3,4,5], sound: 'energy', message: 'Time to train! Progressive overload today 🏋️' },
  { id: 'hydration', label: 'Hydration Check', time: '09:00', enabled: true, daysOfWeek: [0,1,2,3,4,5,6], sound: 'chime', message: '💧 Drink a fresh glass of water' },
  { id: 'sleep-wind-down', label: 'Sleep Wind-Down', time: '22:00', enabled: true, daysOfWeek: [0,1,2,3,4,5,6], sound: 'bell', message: 'Wind down. 8 hours of deep muscle repair starts now 😴' },
];

const defaultGoals: DailyGoals = {
  calories: 2700,
  protein: 130,
  meals: 5,
  waterGlasses: 8,
  sleepHours: 8,
  steps: 6000,
};

const defaultNotifications: NotificationSettings = {
  pushEnabled: true,
  toastsEnabled: true,
  motivationalQuotes: true,
  motivationalQuoteTime: '07:00',
  streakWarnings: true,
  goalCelebration: true,
  quietHoursEnabled: true,
  quietHoursStart: '22:30',
  quietHoursEnd: '06:30',
  weeklyDigest: true,
  weeklyDigestDay: 0,
  weeklyDigestTime: '19:00',
  masterMute: false,
  soundVolume: 70,
  vibrationEnabled: true,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'dawn',
      isVegetarian: false,
      activeTab: 0,
      currentDate: getTodayDateStr(),
      dayLogs: {
        '2026-11-16': monday16CompletedLog,
      },
      reminders: defaultReminders,
      dailyGoals: defaultGoals,
      notificationSettings: defaultNotifications,
      streakData: { currentDiet: 1, longestDiet: 1, currentGym: 1, longestGym: 1 },
      dailyAffirmationsPrayed: {},
      affirmationLanguage: 'en',

      setTheme: (t) => set({ theme: t }),
      toggleVegetarian: () => set((s) => ({ isVegetarian: !s.isVegetarian })),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setCurrentDate: (date) => set({ currentDate: date }),
      syncTodayDate: () => set({ currentDate: getTodayDateStr() }),
      setAffirmationLanguage: (lang) => set({ affirmationLanguage: lang }),
      toggleAffirmationLanguage: () =>
        set((s) => ({ affirmationLanguage: s.affirmationLanguage === 'en' ? 'ta' : 'en' })),

      toggleAffirmationPrayed: (date) =>
        set((s) => ({
          dailyAffirmationsPrayed: {
            ...s.dailyAffirmationsPrayed,
            [date]: !s.dailyAffirmationsPrayed[date],
          },
        })),

      getDayLog: (date) => {
        const logs = get().dayLogs;
        const exact = logs[date];

        // Guaranteed historical completion for Monday Nov 16 so the user's completed routine is never lost
        if (date === '2026-11-16') {
          if (!exact) {
            return monday16CompletedLog;
          }
          return {
            completedMeals:
              exact.completedMeals && exact.completedMeals.length > 0
                ? exact.completedMeals
                : monday16CompletedLog.completedMeals,
            completedSets:
              exact.completedSets && Object.values(exact.completedSets).some((s) => s.length > 0)
                ? exact.completedSets
                : monday16CompletedLog.completedSets,
            waterGlasses: exact.waterGlasses ?? monday16CompletedLog.waterGlasses,
            sleepHours: exact.sleepHours ?? monday16CompletedLog.sleepHours,
            steps: exact.steps ?? monday16CompletedLog.steps,
            workoutDone: exact.workoutDone ?? monday16CompletedLog.workoutDone,
          };
        }

        // For all other dates (including today Nov 17), return exact if exists, or a completely fresh clean log
        if (exact) {
          // Sanitize any phantom leaked state from the previous bug (e.g. 8 glasses water and 6500 steps with 0 meals)
          if (
            date !== '2026-11-16' &&
            exact.steps === 6500 &&
            exact.waterGlasses === 8 &&
            (!exact.completedMeals || exact.completedMeals.length === 0) &&
            (!exact.completedSets || Object.values(exact.completedSets).every((s) => s.length === 0))
          ) {
            return { ...defaultDayLog };
          }
          return exact;
        }

        return { ...defaultDayLog };
      },

      toggleMeal: (date, mealId) =>
        set((s) => {
          const log = s.getDayLog(date);
          const currentMeals = log.completedMeals || [];
          const meals = currentMeals.includes(mealId)
            ? currentMeals.filter((m) => m !== mealId)
            : [...currentMeals, mealId];
          return { dayLogs: { ...s.dayLogs, [date]: { ...log, completedMeals: meals } } };
        }),

      toggleSet: (date, dayId, exerciseIndex, setIndex, weight) =>
        set((s) => {
          const log = s.getDayLog(date);
          const currentSets = log.completedSets || {};
          const daySets = currentSets[dayId] || [];
          const exists = daySets.find(
            (cs) => cs.exerciseIndex === exerciseIndex && cs.setIndex === setIndex
          );
          const newSets = exists
            ? daySets.filter(
                (cs) => !(cs.exerciseIndex === exerciseIndex && cs.setIndex === setIndex)
              )
            : [...daySets, { exerciseIndex, setIndex, weight }];
          return {
            dayLogs: {
              ...s.dayLogs,
              [date]: { ...log, completedSets: { ...currentSets, [dayId]: newSets } },
            },
          };
        }),

      setWaterGlasses: (date, glasses) =>
        set((s) => {
          const log = s.getDayLog(date);
          return { dayLogs: { ...s.dayLogs, [date]: { ...log, waterGlasses: glasses } } };
        }),

      setSleepHours: (date, hours) =>
        set((s) => {
          const log = s.getDayLog(date);
          return { dayLogs: { ...s.dayLogs, [date]: { ...log, sleepHours: hours } } };
        }),

      setSteps: (date, steps) =>
        set((s) => {
          const log = s.getDayLog(date);
          return { dayLogs: { ...s.dayLogs, [date]: { ...log, steps } } };
        }),

      toggleWorkoutDone: (date, dayId) =>
        set((s) => {
          const log = s.getDayLog(date);
          const nextDone = !log.workoutDone;
          const targetDayId = dayId || getDayIdFromDateStr(date);
          let currentSets = { ...(log.completedSets || {}) };

          if (nextDone) {
            // When completing a workout, ensure sets are filled so all set chips display as done
            const allSets: CompletedSet[] = [];
            [4, 3, 3, 4].forEach((numSets, exIdx) => {
              for (let setIdx = 0; setIdx < numSets; setIdx++) {
                allSets.push({ exerciseIndex: exIdx, setIndex: setIdx });
              }
            });
            currentSets[targetDayId] = allSets;
          } else {
            // When undoing workout, reset sets to empty so the form cleanly returns to fresh in-progress state
            currentSets[targetDayId] = [];
          }

          return {
            dayLogs: {
              ...s.dayLogs,
              [date]: { ...log, workoutDone: nextDone, completedSets: currentSets },
            },
          };
        }),

      markDayAllCompleted: (date, dayId) =>
        set((s) => {
          const targetDayId = dayId || getDayIdFromDateStr(date);
          const dayPrefix = targetDayId.slice(0, 3) + '-';
          const allMeals = [
            `${dayPrefix}breakfast`,
            `${dayPrefix}lunch`,
            `${dayPrefix}snack`,
            `${dayPrefix}dinner`,
            `${dayPrefix}sleep`,
          ];
          const allSets: CompletedSet[] = [];
          [4, 3, 3, 4].forEach((numSets, exIdx) => {
            for (let setIdx = 0; setIdx < numSets; setIdx++) {
              allSets.push({ exerciseIndex: exIdx, setIndex: setIdx });
            }
          });

          return {
            dayLogs: {
              ...s.dayLogs,
              [date]: {
                completedMeals: allMeals,
                completedSets: { [targetDayId]: allSets },
                waterGlasses: 8,
                sleepHours: 8,
                steps: 6000,
                workoutDone: true,
              },
            },
          };
        }),

      updateReminder: (id, updates) =>
        set((s) => ({
          reminders: s.reminders.map((r) => (r.id === id ? { ...r, ...updates } : r)),
        })),

      addReminder: (reminder) => set((s) => ({ reminders: [...s.reminders, reminder] })),

      removeReminder: (id) =>
        set((s) => ({ reminders: s.reminders.filter((r) => r.id !== id) })),

      setDailyGoals: (goals) =>
        set((s) => ({ dailyGoals: { ...s.dailyGoals, ...goals } })),

      setNotificationSettings: (settings) =>
        set((s) => ({ notificationSettings: { ...s.notificationSettings, ...settings } })),
    }),
    { name: 'strength-stillness-store' }
  )
);
