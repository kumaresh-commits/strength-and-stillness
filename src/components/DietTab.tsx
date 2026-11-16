import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../lib/themes';
import { foodRules, getDietPlanForDay, weeklyGroceryList } from '../data/dietPlan';
import { ShakeModal } from './ShakeModal';
import { WeekCalendarBar } from './WeekCalendarBar';
import { getDayIndexFromDateStr } from '../lib/dateUtils';
import { sound } from '../lib/sound';
import { toast } from 'sonner';
import {
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Droplets,
  Plus,
  Minus,
  Coffee,
  Flame,
  ShoppingBag,
  CheckSquare,
  Square,
  X,
} from 'lucide-react';

export const DietTab: React.FC = () => {
  const {
    theme,
    isVegetarian,
    currentDate,
    getDayLog,
    toggleMeal,
    setWaterGlasses,
    dailyGoals,
  } = useStore();
  const t = themes[theme];
  const dayLog = getDayLog(currentDate);

  // Derive active day plan dynamically from the selected currentDate
  const selectedDayIndex = getDayIndexFromDateStr(currentDate);
  const activePlan = getDietPlanForDay(selectedDayIndex);

  const [showShakeModal, setShowShakeModal] = useState(false);
  const [showGroceryModal, setShowGroceryModal] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [checkedGroceries, setCheckedGroceries] = useState<string[]>([]);

  // Exact Calorie and Protein Dynamic Decreasing Calculations
  const planTotalCalories = activePlan.meals.reduce(
    (sum, m) => sum + (isVegetarian && m.vegCalories ? m.vegCalories : m.calories),
    0
  );
  const planTotalProtein = activePlan.meals.reduce(
    (sum, m) => sum + (isVegetarian && m.vegProtein ? m.vegProtein : m.protein),
    0
  );

  const targetCalories = dailyGoals.calories || planTotalCalories;
  const targetProtein = dailyGoals.protein || planTotalProtein;

  // Calculate consumed calories & protein from completed meals
  const consumedCalories = activePlan.meals
    .filter((m) => dayLog.completedMeals.includes(m.id))
    .reduce((sum, m) => sum + (isVegetarian && m.vegCalories ? m.vegCalories : m.calories), 0);

  const consumedProtein = activePlan.meals
    .filter((m) => dayLog.completedMeals.includes(m.id))
    .reduce((sum, m) => sum + (isVegetarian && m.vegProtein ? m.vegProtein : m.protein), 0);

  // Remaining calories & protein count down as meals are completed
  const remainingCalories = Math.max(0, targetCalories - consumedCalories);
  const remainingProtein = Math.max(0, targetProtein - consumedProtein);

  const handleToggleMeal = (mealId: string, mealTitle: string, mealCals: number, mealProt: number) => {
    sound.triggerHaptic('medium');
    const wasCompleted = dayLog.completedMeals.includes(mealId);
    toggleMeal(currentDate, mealId);

    if (!wasCompleted) {
      sound.playChime();
      toast.success(`${mealTitle} Logged! (-${mealCals} kcal, -${mealProt}g protein)`, {
        description: `Remaining today: ${Math.max(0, remainingCalories - mealCals)} kcal & ${Math.max(0, remainingProtein - mealProt)}g protein left`,
      });
    } else {
      toast.info(`${mealTitle} unlogged`, {
        description: `Restored ${mealCals} kcal to remaining target`,
      });
    }
  };

  const toggleGroceryItem = (name: string) => {
    sound.triggerHaptic('light');
    setCheckedGroceries((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const updateWater = (delta: number) => {
    sound.triggerHaptic('light');
    const current = dayLog.waterGlasses || 0;
    const nextVal = Math.max(0, current + delta);
    setWaterGlasses(currentDate, nextVal);
    if (delta > 0 && nextVal % 4 === 0) {
      sound.playChime();
      toast.info(`Hydration: ${nextVal} glasses!`, {
        description: 'Muscles are 75% water — keep hydrated 💧',
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Title & Section Tagline with Clickable Grocery Checklist Button */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span
              className="text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white shadow-xs"
              style={{ backgroundColor: '#1B4332' }}
            >
              Rotating Indian Menu
            </span>

            {/* Clickable Kirana & Mandi Button */}
            <button
              onClick={() => {
                sound.triggerHaptic('light');
                setShowGroceryModal(true);
              }}
              className="text-[11px] font-bold text-[#1B4332] dark:text-[#74C69D] flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 cursor-pointer active:scale-95 transition-all"
              title="Tap to open the Kirana & Mandi Grocery Shopping List"
            >
              <ShoppingBag size={12} className="text-[#1B4332] dark:text-[#74C69D]" />
              <span>🛒 Kirana & Mandi List</span>
            </button>
          </div>
          <h2 className="text-lg font-black tracking-tight">Daily Indian Diet Plan</h2>
          <p className="text-xs opacity-80 font-medium">
            Calories & protein decrease in real-time as you log each meal.
          </p>
        </div>

        {/* Shake Recipe Quick Button */}
        <button
          onClick={() => {
            sound.triggerHaptic('light');
            setShowShakeModal(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer text-white flex-shrink-0"
          style={{
            backgroundColor: '#1B4332',
          }}
        >
          <Coffee size={13} className="text-[#D4AF37]" />
          <span>Shake</span>
        </button>
      </div>

      {/* Dynamic 7-Day Week Calendar Switcher with exact dates & completion history */}
      <WeekCalendarBar className="my-1" />

      {/* Active Day Theme Banner */}
      <div
        className="rounded-2xl p-3 border shadow-xs"
        style={{
          backgroundColor: t.card,
          borderColor: t.border,
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#1B4332] dark:text-[#74C69D] block">
              {activePlan.dayName} Menu • {activePlan.theme}
            </span>
            <p className="text-xs opacity-85 font-medium mt-0.5">
              Key Ingredients: {activePlan.highlightFood}
            </p>
          </div>
        </div>
      </div>

      {/* REAL-TIME DECREASING MACRO SUMMARY CARD */}
      <div
        className="rounded-2xl p-4 border shadow-xs"
        style={{
          backgroundColor: t.card,
          borderColor: t.border,
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#1B4332] dark:text-[#74C69D]">
            Remaining Daily Budget
          </span>
          <span className="text-[10px] font-bold opacity-60">
            {dayLog.completedMeals.length}/5 Meals Logged
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* Remaining Calories Box */}
          <div className="p-3 rounded-xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-200/60 dark:border-orange-900/40">
            <div className="flex items-center gap-1.5 text-xs font-black text-orange-800 dark:text-orange-300 mb-0.5">
              <Flame size={15} className="text-orange-600" />
              <span>Energy Left</span>
            </div>
            <div className="text-xl font-black text-orange-700 dark:text-orange-400">
              {remainingCalories.toLocaleString()} <span className="text-xs font-semibold">kcal</span>
            </div>
            <div className="text-[10px] font-bold opacity-75 mt-1 text-orange-900 dark:text-orange-200">
              {consumedCalories} / {targetCalories} kcal consumed
            </div>
          </div>

          {/* Remaining Protein Box */}
          <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40">
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 dark:text-emerald-300 mb-0.5">
              <Sparkles size={15} className="text-[#1B4332] dark:text-emerald-400" />
              <span>Protein Left</span>
            </div>
            <div className="text-xl font-black text-[#1B4332] dark:text-emerald-300">
              {remainingProtein} <span className="text-xs font-semibold">g left</span>
            </div>
            <div className="text-[10px] font-bold opacity-75 mt-1 text-emerald-900 dark:text-emerald-200">
              {consumedProtein} / {targetProtein}g consumed
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800/60">
          <div className="flex justify-between text-[10px] font-bold opacity-70 mb-1">
            <span>Daily Consumption Progress</span>
            <span>{Math.round((consumedCalories / targetCalories) * 100)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${Math.min(100, Math.round((consumedCalories / targetCalories) * 100))}%`,
                backgroundColor: remainingCalories === 0 ? '#2D6A4F' : '#1B4332',
              }}
            />
          </div>
        </div>
      </div>

      {/* 5 Meal Schedule Cards for Selected Day */}
      <div className="space-y-3">
        {activePlan.meals.map((meal) => {
          const isDone = dayLog.completedMeals.includes(meal.id);
          const mealCalories = isVegetarian && meal.vegCalories ? meal.vegCalories : meal.calories;
          const mealProtein = isVegetarian && meal.vegProtein ? meal.vegProtein : meal.protein;

          return (
            <div
              key={meal.id}
              onClick={() => handleToggleMeal(meal.id, meal.title, mealCalories, mealProtein)}
              className={`rounded-2xl p-4 transition-all duration-200 border cursor-pointer select-none relative shadow-xs ${
                isDone ? 'opacity-85' : 'active:scale-[0.99]'
              }`}
              style={{
                backgroundColor: t.card,
                borderColor: isDone ? '#2D6A4F' : t.border,
              }}
            >
              {/* Card Header: Prominent Dark Green Timing Badge, Title, and Checkbox */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{meal.emoji}</span>
                  <div>
                    {/* Clear, High-Contrast Dark Green Timing Badge */}
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black text-white bg-[#1B4332] shadow-xs">
                        <Clock size={11} className="text-[#D4AF37]" />
                        <span className="tracking-wide">{meal.time}</span>
                      </div>

                      {/* Specific Meal Calories & Protein Pill */}
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200/50">
                        ⚡ {mealCalories} kcal • 🥩 {mealProtein}g protein
                      </span>
                    </div>

                    <h3 className={`text-sm font-extrabold tracking-tight ${isDone ? 'line-through opacity-70' : ''}`}>
                      {meal.title}
                    </h3>
                  </div>
                </div>

                {/* Checkbox Icon */}
                <div className="transition-transform active:scale-90">
                  {isDone ? (
                    <CheckCircle2 size={24} style={{ color: '#2D6A4F' }} />
                  ) : (
                    <Circle size={24} className="opacity-25" />
                  )}
                </div>
              </div>

              {/* Meal Food Items List */}
              <ul className="space-y-2 ml-1 mt-2 border-t border-gray-100 dark:border-gray-800/60 pt-2.5">
                {meal.items.map((item, idx) => {
                  const displayText =
                    isVegetarian && item.vegAlternative ? item.vegAlternative : item.name;

                  return (
                    <li
                      key={idx}
                      className="text-xs flex items-start gap-2 font-medium leading-relaxed"
                      style={{ color: t.text }}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                        style={{ backgroundColor: isDone ? '#40916C' : '#1B4332' }}
                      />
                      <div className="flex-1">
                        <span className={isDone ? 'line-through opacity-60' : 'font-semibold'}>
                          {displayText}
                        </span>
                        {isVegetarian && item.vegAlternative && (
                          <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            Veg Choice
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Macro tag if present */}
              {meal.macroTag && (
                <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-800/40 text-[10px] font-bold text-[#4B5E53] dark:text-[#A7C4B5] italic">
                  🌿 {meal.macroTag}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Hydration Tracker Card */}
      <div
        className="rounded-2xl p-4 border shadow-xs"
        style={{
          backgroundColor: t.card,
          borderColor: t.border,
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300">
              <Droplets size={18} />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider">Hydration Tracker</h3>
              <p className="text-[11px] opacity-75 font-medium">
                Target: {dailyGoals.waterGlasses || 8} glasses (~2.5 Litres)
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-[#1B4332] dark:text-cyan-400">
              {dayLog.waterGlasses || 0}
            </span>
            <span className="text-xs opacity-60 font-semibold">/{dailyGoals.waterGlasses || 8}</span>
          </div>
        </div>

        {/* Stepper Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateWater(-1)}
            disabled={(dayLog.waterGlasses || 0) <= 0}
            className="flex-1 py-2 rounded-xl flex items-center justify-center font-bold text-xs bg-gray-100 dark:bg-gray-800 disabled:opacity-30 active:scale-95 cursor-pointer"
          >
            <Minus size={14} className="mr-1" /> -1 Glass
          </button>
          <button
            onClick={() => updateWater(1)}
            className="flex-1 py-2 rounded-xl flex items-center justify-center font-black text-xs text-white shadow-xs active:scale-95 cursor-pointer"
            style={{ backgroundColor: '#1B4332' }}
          >
            <Plus size={14} className="mr-1" /> +1 Glass (250ml)
          </button>
        </div>
      </div>

      {/* Important Food Rules Accordion */}
      <div
        className="rounded-2xl p-4 border shadow-xs"
        style={{
          backgroundColor: t.card,
          borderColor: t.border,
        }}
      >
        <button
          onClick={() => {
            sound.triggerHaptic('light');
            setShowRules(!showRules);
          }}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Info size={16} className="text-[#1B4332] dark:text-[#52B788]" />
            <span className="text-xs font-black tracking-wide uppercase">Important Food Rules</span>
          </div>
          {showRules ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showRules && (
          <ul className="mt-3 space-y-2 border-t border-gray-100 dark:border-gray-800 pt-3">
            {foodRules.map((rule, idx) => (
              <li key={idx} className="text-xs flex items-start gap-2 leading-relaxed font-medium">
                <span className="text-[#2D6A4F] font-bold mt-0.5">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* INTERACTIVE KIRANA & MANDI GROCERY CHECKLIST MODAL */}
      {showGroceryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-md max-h-[85vh] flex flex-col rounded-3xl p-5 shadow-2xl border"
            style={{ backgroundColor: t.card, borderColor: '#1B4332' }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-emerald-100 dark:bg-emerald-950 text-[#1B4332] dark:text-emerald-300">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black">Kirana & Mandi Checklist</h3>
                  <span className="text-[10px] opacity-75 font-semibold">
                    Everything you need for this week's Indian diet
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowGroceryModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 font-bold text-xs"
              >
                <X size={14} />
              </button>
            </div>

            {/* Explanation Note */}
            <div className="my-2.5 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 text-[11px] leading-relaxed">
              🏪 <strong>Kirana</strong> = Local Indian grocery store (Atta, Dal, Oats, Peanut Butter, Dates, Dry fruits).  
              🥬 <strong>Mandi</strong> = Local fresh market (Bananas, Spinach, Tomatoes, Fresh Curd & Paneer).
            </div>

            {/* Checklist items */}
            <div className="overflow-y-auto flex-1 pr-1 space-y-3 my-1">
              {['Dairy & Poultry', 'Grains & Atta', 'Lentils (Dals)', 'Dry Fruits & Fruits', 'Mandi Vegetables'].map((cat) => {
                const categoryItems = weeklyGroceryList.filter((item) => item.category === cat);

                return (
                  <div key={cat} className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#1B4332] dark:text-[#74C69D] block">
                      {cat}
                    </span>
                    <div className="space-y-1">
                      {categoryItems.map((item) => {
                        const isChecked = checkedGroceries.includes(item.name);
                        return (
                          <div
                            key={item.name}
                            onClick={() => toggleGroceryItem(item.name)}
                            className="p-2 rounded-xl border flex items-center justify-between text-xs cursor-pointer active:scale-[0.99] transition-all"
                            style={{
                              backgroundColor: isChecked ? 'rgba(45, 106, 79, 0.08)' : t.bg,
                              borderColor: isChecked ? '#2D6A4F' : t.border,
                            }}
                          >
                            <div className="flex items-center gap-2">
                              {isChecked ? (
                                <CheckSquare size={16} className="text-[#2D6A4F]" />
                              ) : (
                                <Square size={16} className="opacity-30" />
                              )}
                              <span className={isChecked ? 'line-through opacity-60 font-medium' : 'font-bold'}>
                                {item.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold opacity-70 bg-gray-200/60 dark:bg-gray-700/60 px-2 py-0.5 rounded-md">
                              {item.quantity}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-xs font-bold opacity-75">
                {checkedGroceries.length}/{weeklyGroceryList.length} items checked
              </span>
              <button
                onClick={() => {
                  sound.triggerHaptic('medium');
                  setShowGroceryModal(false);
                }}
                className="px-4 py-2 rounded-xl font-black text-xs text-white shadow-xs"
                style={{ backgroundColor: '#1B4332' }}
              >
                Done Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Redesigned 7-Day Daily Shake Recipe Modal */}
      <ShakeModal
        isOpen={showShakeModal}
        onClose={() => setShowShakeModal(false)}
        initialDayIndex={selectedDayIndex}
      />
    </div>
  );
};

export default DietTab;
