import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../lib/themes';
import { getDailyAffirmation, dailyAffirmations, type PrayerAffirmation } from '../data/dailyAffirmations';
import { parseDateStr, getTodayDateStr } from '../lib/dateUtils';
import ProgressRing from './ProgressRing';
import {
  Sparkles,
  Utensils,
  Dumbbell,
  Droplets,
  Leaf,
  Shuffle,
  RotateCcw,
  Bell,
  Copy,
  Check,
  Sunrise,
  Sun,
  Sunset,
  MoonStar,
  Calendar,
} from 'lucide-react';
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
    affirmationLanguage,
    setAffirmationLanguage,
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

  // Dynamic time-of-day climate & sky icon in a dedicated round shape
  const timePeriodInfo = useMemo(() => {
    if (!isViewingToday) {
      const isPast = currentDate < todayStr;
      return {
        label: isPast ? `${dayName} History` : `${dayName} Routine`,
        Icon: Calendar,
        bgClass: 'bg-emerald-100 text-[#1B4332] border-emerald-300',
        glowColor: 'rgba(27, 67, 50, 0.25)',
      };
    }
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return {
        label: 'Good morning',
        Icon: Sunrise,
        bgClass: 'bg-amber-100 text-amber-700 border-amber-300',
        glowColor: 'rgba(245, 158, 11, 0.35)',
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        label: 'Good afternoon',
        Icon: Sun,
        bgClass: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        glowColor: 'rgba(234, 179, 8, 0.35)',
      };
    } else if (hour >= 17 && hour < 21) {
      return {
        label: 'Good evening',
        Icon: Sunset,
        bgClass: 'bg-orange-100 text-orange-700 border-orange-300',
        glowColor: 'rgba(249, 115, 22, 0.35)',
      };
    } else {
      return {
        label: 'Good night',
        Icon: MoonStar,
        bgClass: 'bg-indigo-100 text-indigo-700 border-indigo-300',
        glowColor: 'rgba(99, 102, 241, 0.35)',
      };
    }
  }, [isViewingToday, currentDate, todayStr, dayName]);

  const TimeIcon = timePeriodInfo.Icon;

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
      description:
        affirmationLanguage === 'ta'
          ? 'தியானத்துடன் அமைதியாக பிரார்த்தனை செய்யுங்கள்.'
          : 'Take a gentle, quiet breath for your prayer.',
    });
  };

  const activeText = affirmationLanguage === 'ta' ? currentAffirmation.textTa : currentAffirmation.text;
  const activeTheme = affirmationLanguage === 'ta' ? currentAffirmation.themeTa : currentAffirmation.theme;
  const activeFocus = affirmationLanguage === 'ta' ? currentAffirmation.focusTa : currentAffirmation.focus;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.triggerHaptic('light');
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(activeText);
      setCopied(true);
      toast.success(
        affirmationLanguage === 'ta' ? 'பிரார்த்தனை நகலெடுக்கப்பட்டது! 🙏' : 'Affirmation copied! 🙏',
        {
          description:
            affirmationLanguage === 'ta'
              ? 'உங்கள் தினசரி பிரார்த்தனைக்காக நினைவகத்தில் சேமிக்கப்பட்டது.'
              : 'Saved to clipboard for your daily prayers.',
        }
      );
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTogglePrayed = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.triggerHaptic('heavy');
    toggleAffirmationPrayed(currentDate);
    if (!isPrayed) {
      sound.playBell();
      toast.success(
        affirmationLanguage === 'ta'
          ? 'பிரார்த்தனை நிறைவு பெற்றது! 🙏✨'
          : 'Prayer Affirmation Completed! 🙏✨',
        {
          description:
            affirmationLanguage === 'ta'
              ? 'இறையருளும் சாந்தியும் உங்கள் நாளை வழிநடத்தட்டும்.'
              : 'May divine strength and stillness guide your day.',
        }
      );
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
          <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-slate-600 mb-1">
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

          {/* Time-of-day greeting with ROUND SHAPED climate / sky icon */}
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-xs transition-transform active:scale-95 ${timePeriodInfo.bgClass}`}
              style={{
                boxShadow: `0 0 14px ${timePeriodInfo.glowColor}`,
              }}
              title={timePeriodInfo.label}
            >
              <TimeIcon size={18} strokeWidth={2.4} />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              {timePeriodInfo.label}
            </h1>
          </div>
        </div>

        {/* Veg / Non-Veg Toggle Pill with Glossy Styling */}
        <button
          onClick={() => {
            sound.triggerHaptic('medium');
            toggleVegetarian();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black transition-all glass-btn-primary text-white cursor-pointer active:scale-95 shadow-sm self-start mt-1"
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
        <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-base">🙏</span>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#1B4332]">
              {affirmationLanguage === 'ta'
                ? isCustomShuffled
                  ? 'பிரார்த்தனை சிந்தனை'
                  : 'தினசரி பிரார்த்தனை'
                : isCustomShuffled
                ? 'Prayer Reflection'
                : 'Daily Prayer Affirmation'}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
              {activeFocus}
            </span>
          </div>

          {/* Action Icons & Language Switcher */}
          <div className="flex items-center gap-1.5">
            {/* Language Switcher: EN | தமிழ் */}
            <div className="flex items-center p-0.5 rounded-xl bg-slate-200/80 border border-slate-300/80 text-[10px] font-black shadow-2xs">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sound.triggerHaptic('light');
                  setAffirmationLanguage('en');
                }}
                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                  affirmationLanguage === 'en'
                    ? 'bg-[#1B4332] text-white shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900 font-bold'
                }`}
                title="Switch prayer affirmation to English"
              >
                EN
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  sound.triggerHaptic('light');
                  setAffirmationLanguage('ta');
                }}
                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                  affirmationLanguage === 'ta'
                    ? 'bg-[#1B4332] text-white shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900 font-bold'
                }`}
                title="தமிழ் மொழிக்கு மாற்றுக (Switch to Tamil)"
              >
                தமிழ்
              </button>
            </div>

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

        {/* Prayer Affirmation Text in Selected Language */}
        <blockquote className="text-xs italic leading-relaxed text-slate-900 font-bold border-l-2 border-[#1B4332] pl-2.5 my-2">
          "{activeText}"
        </blockquote>

        {/* Prayer Completion Status Pill */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/60 text-[10px]">
          <span className="text-slate-500 font-semibold">
            {affirmationLanguage === 'ta' ? 'கருப்பொருள்' : 'Theme'}:{' '}
            <strong className="text-slate-800">{activeTheme}</strong>
          </span>

          <button
            onClick={handleTogglePrayed}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold transition-all active:scale-95 cursor-pointer shadow-2xs ${
              isPrayed ? 'glass-btn-primary text-white' : 'glass-btn-secondary text-slate-800'
            }`}
          >
            {isPrayed ? (
              <>
                <Check size={11} className="text-[#D4AF37]" />
                <span>{affirmationLanguage === 'ta' ? 'பிரார்த்தனை முடிந்தது ✓' : 'Prayed Today ✓'}</span>
              </>
            ) : (
              <>
                <Sparkles size={11} className="text-amber-600" />
                <span>{affirmationLanguage === 'ta' ? 'பிரார்த்தனை செய்' : 'Mark Prayed'}</span>
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
          icon={<Utensils size={14} className="text-[#1B4332]" />}
        />
        <ProgressRing
          progress={workoutProgress}
          color={t.ring2}
          size={64}
          strokeWidth={6}
          label="Gym"
          sublabel={dayLog.workoutDone ? 'Done ✓' : `${totalCompletedSets}/${workoutTargetSets}`}
          icon={<Dumbbell size={14} className="text-[#D4AF37]" />}
        />
        <ProgressRing
          progress={waterProgress}
          color={t.ring3}
          size={64}
          strokeWidth={6}
          label="Water"
          sublabel={`${dayLog.waterGlasses || 0}/${dailyGoals.waterGlasses || 8}`}
          icon={<Droplets size={14} className="text-teal-700" />}
        />
      </div>
    </div>
  );
};

export default HeroCard;
