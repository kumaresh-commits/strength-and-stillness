import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../lib/themes';
import { getDailyAffirmation, dailyAffirmations, type PrayerAffirmation } from '../data/dailyAffirmations';
import { parseDateStr, getTodayDateStr } from '../lib/dateUtils';
import ProgressRing from './ProgressRing';
import { Sparkles, Utensils, Dumbbell, Droplets, Leaf, Shuffle, RotateCcw, Bell, Copy, Check } from 'lucide-react';
import { sound } from '../lib/sound';
import { toast } from 'sonner';

export const HeroCard: React.FC = () => {
  const {
    theme,
    isVegetarian,
    toggleVegetarian,
    currentDate,
    syncTodayDate,
    getDayLog,
    dailyGoals,
    dailyAffirmationsPrayed,
    toggleAffirmationPrayed,
  } = useStore();
  const t = themes[theme];

  // Dynamic Date parsing based on selected currentDate
  const selectedDateObj = useMemo(() => parseDateStr(currentDate), [currentDate]);
  const dayName = selectedDateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = selectedDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const todayStr = getTodayDateStr();
  const isViewingToday = currentDate === todayStr;

  // Daily dynamic prayer affirmation tied deterministically to the selected date
  const defaultAffirmation = useMemo(() => getDailyAffirmation(selectedDateObj), [selectedDateObj]);
  const [customAffirmation, setCustomAffirmation] = useState<{ date: string; item: PrayerAffirmation } | null>(null);
  const [copied, setCopied] = useState(false);

  const currentAffirmation =
    customAffirmation && customAffirmation.date === currentDate
      ? customAffirmation.item
      : defaultAffirmation;
  const isCustomShuffled = Boolean(customAffirmation && customAffirmation.date === currentDate);

  const isPrayed = !!dailyAffirmationsPrayed[currentDate];
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

  const nextAffirmation = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.triggerHaptic('light');
    const randomIndex = Math.floor(Math.random() * dailyAffirmations.length);
    setCustomAffirmation({ date: currentDate, item: dailyAffirmations[randomIndex] });
  };

  const handlePlayBell = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.triggerHaptic('medium');
    sound.playBell();
    toast.info('Sacred Temple Chime 🔔', {
      description: 'Take a gentle, quiet breath for your prayer.',
    });
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.triggerHaptic('light');
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(currentAffirmation.text);
      setCopied(true);
      toast.success('Affirmation copied! 🙏', {
        description: 'Saved to clipboard for your daily prayers.',
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTogglePrayed = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.triggerHaptic('heavy');
    toggleAffirmationPrayed(currentDate);
    if (!isPrayed) {
      sound.playBell();
      toast.success('Prayer Affirmation Completed! 🙏✨', {
        description: 'May divine strength and stillness guide your day.',
      });
    }
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
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-slate-600">
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
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
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

      {/* DEDICATED DAILY PRAYER AFFIRMATION CARD */}
      <div className="glass-panel-subtle rounded-2xl p-4 mb-4 relative shadow-2xs border border-amber-200/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-base">🙏</span>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#1B4332]">
              {isCustomShuffled ? 'Prayer Reflection' : 'Daily Prayer Affirmation'}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              {currentAffirmation.focus}
            </span>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={handlePlayBell}
              className="p-1 rounded-lg text-[#1B4332] hover:bg-emerald-100/50 active:scale-90 transition-all cursor-pointer"
              title="Ring peaceful temple prayer bell"
            >
              <Bell size={13} />
            </button>
            <button
              onClick={handleCopy}
              className="p-1 rounded-lg text-slate-600 hover:bg-slate-200/60 active:scale-90 transition-all cursor-pointer"
              title="Copy prayer affirmation"
            >
              {copied ? <Check size={13} className="text-emerald-700" /> : <Copy size={13} />}
            </button>
            <button
              onClick={nextAffirmation}
              className="p-1 rounded-lg text-slate-600 hover:bg-slate-200/60 active:scale-90 transition-all cursor-pointer"
              title="Cycle to next prayer affirmation"
            >
              <Shuffle size={13} />
            </button>
          </div>
        </div>

        {/* Prayer Affirmation Text */}
        <blockquote className="text-xs italic leading-relaxed text-slate-900 font-bold border-l-2 border-[#1B4332] pl-2.5 my-1.5">
          "{currentAffirmation.text}"
        </blockquote>

        {/* Prayer Completion Status Pill */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/60 text-[10px]">
          <span className="text-slate-500 font-semibold">
            Theme: <strong className="text-slate-800">{currentAffirmation.theme}</strong>
          </span>

          <button
            onClick={handleTogglePrayed}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold transition-all active:scale-95 cursor-pointer shadow-2xs ${
              isPrayed
                ? 'glass-btn-primary text-white'
                : 'glass-btn-secondary text-slate-800'
            }`}
          >
            {isPrayed ? (
              <>
                <Check size={11} className="text-[#D4AF37]" />
                <span>Prayed Today ✓</span>
              </>
            ) : (
              <>
                <Sparkles size={11} className="text-amber-600" />
                <span>Mark Prayed</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Daily Progress Rings Bar */}
      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200/80">
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
