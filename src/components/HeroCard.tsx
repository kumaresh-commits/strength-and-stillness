import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../lib/themes';
import { getDailyQuote, dailyQuotes } from '../data/dailyQuotes';
import { parseDateStr, getTodayDateStr } from '../lib/dateUtils';
import ProgressRing from './ProgressRing';
import { Sparkles, Utensils, Dumbbell, Droplets, Leaf, Shuffle, RotateCcw } from 'lucide-react';
import { sound } from '../lib/sound';

export const HeroCard: React.FC = () => {
  const { theme, isVegetarian, toggleVegetarian, currentDate, syncTodayDate, getDayLog, dailyGoals } = useStore();
  const t = themes[theme];

  // Daily dynamic quote based on calendar date
  const defaultDailyQuote = useMemo(() => getDailyQuote(new Date()), []);
  const [currentQuote, setCurrentQuote] = useState(defaultDailyQuote);
  const [isCustomShuffled, setIsCustomShuffled] = useState(false);

  const dayLog = getDayLog(currentDate);

  // Compute progress stats
  const completedMealsCount = dayLog.completedMeals.length;
  const targetMeals = dailyGoals.meals || 5;
  const mealsProgress = completedMealsCount / targetMeals;

  // Workouts
  const totalCompletedSets = Object.values(dayLog.completedSets).reduce(
    (acc, sets) => acc + sets.length,
    0
  );
  const workoutTargetSets = 14; // Average daily sets
  const workoutProgress = dayLog.workoutDone ? 1 : Math.min(totalCompletedSets / workoutTargetSets, 1);

  // Water
  const waterProgress = (dayLog.waterGlasses || 0) / (dailyGoals.waterGlasses || 8);

  // Dynamic Date parsing based on selected currentDate
  const selectedDateObj = parseDateStr(currentDate);
  const dayName = selectedDateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = selectedDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const todayStr = getTodayDateStr();
  const isViewingToday = currentDate === todayStr;

  const getGreeting = () => {
    if (!isViewingToday) {
      if (currentDate < todayStr) return `${dayName} History`;
      return `${dayName} Routine`;
    }
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const nextQuote = () => {
    sound.triggerHaptic('light');
    setIsCustomShuffled(true);
    const randomIndex = Math.floor(Math.random() * dailyQuotes.length);
    setCurrentQuote(dailyQuotes[randomIndex]);
  };

  return (
    <div className="glass-panel rounded-3xl p-5 mb-5 transition-all duration-300 relative overflow-hidden">
      {/* Background subtle glow */}
      <div
        className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: t.primary }}
      />

      {/* Header with Greeting & Veg Toggle */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase opacity-75">
            <span>{dayName}, {formattedDate}</span>
            {!isViewingToday && (
              <button
                onClick={() => {
                  sound.triggerHaptic('light');
                  syncTodayDate();
                }}
                className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold glass-btn-primary text-white hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                title="Tap to jump back to today"
              >
                <RotateCcw size={9} />
                <span>Today</span>
              </button>
            )}
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">
            {getGreeting()} {isViewingToday ? '🌅' : '📋'}
          </h1>
        </div>

        {/* Veg / Non-Veg Toggle Pill with Glossy Styling */}
        <button
          onClick={() => {
            sound.triggerHaptic('medium');
            toggleVegetarian();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black transition-all glass-btn-primary text-white cursor-pointer active:scale-95 shadow-sm"
          title="Toggle Vegetarian / Non-Vegetarian diet options"
        >
          {isVegetarian ? (
            <>
              <Leaf size={13} className="text-[#74C69D]" />
              <span>Veg (Paneer)</span>
            </>
          ) : (
            <>
              <Utensils size={13} className="text-[#D4AF37]" />
              <span>Non-Veg (Chicken/Eggs)</span>
            </>
          )}
        </button>
      </div>

      {/* Daily Rotating Wisdom Banner */}
      <div
        onClick={nextQuote}
        className="glass-panel-subtle rounded-2xl p-3.5 mb-4 cursor-pointer transition-all active:scale-[0.99] relative"
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <Sparkles size={13} className="text-amber-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
              {isCustomShuffled ? 'Refreshed Quote' : "Today's Daily Wisdom"} • {currentQuote.theme}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] opacity-50 font-semibold">
            <Shuffle size={10} />
            <span>Tap to cycle</span>
          </div>
        </div>

        <p className="text-xs italic leading-relaxed opacity-95 font-medium">
          "{currentQuote.text}"
        </p>
      </div>

      {/* Daily Progress Rings Bar */}
      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-100 dark:border-gray-800">
        <ProgressRing
          progress={mealsProgress}
          color={t.ring1}
          size={64}
          strokeWidth={6}
          label="Diet"
          sublabel={`${completedMealsCount}/${targetMeals}`}
          icon={<Utensils size={14} style={{ color: t.ring1 }} />}
        />

        <ProgressRing
          progress={workoutProgress}
          color={t.ring2}
          size={64}
          strokeWidth={6}
          label="Gym"
          sublabel={dayLog.workoutDone ? 'Done' : `${totalCompletedSets} sets`}
          icon={<Dumbbell size={14} style={{ color: t.ring2 }} />}
        />

        <ProgressRing
          progress={waterProgress}
          color={t.ring3}
          size={64}
          strokeWidth={6}
          label="Water"
          sublabel={`${dayLog.waterGlasses || 0}/${dailyGoals.waterGlasses || 8}`}
          icon={<Droplets size={14} style={{ color: t.ring3 }} />}
        />
      </div>
    </div>
  );
};

export default HeroCard;
