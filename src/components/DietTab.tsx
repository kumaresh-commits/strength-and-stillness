import React, { useState } from 'react';
import { useStore } from '../store/useStore';
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
    isVegetarian,
    currentDate,
    getDayLog,
    toggleMeal,
    setWaterGlasses,
    dailyGoals,
  } = useStore();
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
            <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white shadow-xs glass-btn-primary">
              Rotating Indian Menu
            </span>

            {/* Clickable Kirana & Mandi Button */}
            <button
              onClick={() => {
                sound.triggerHaptic('light');
                setShowGroceryModal(true);
              }}
              className="text-[11px] font-bold text-slate-800 flex items-center gap-1 px-2.5 py-0.5 rounded-full glass-btn-secondary cursor-pointer active:scale-95 transition-all shadow-2xs"
              title="Tap to open the Kirana & Mandi Grocery Shopping List"
            >
              <ShoppingBag size={12} className="text-[#1B4332]" />
              <span>🛒 Kirana & Mandi List</span>
            </button>
          </div>
          <h2 className="text-lg font-black tracking-tight text-slate-900">Daily Indian Diet Plan</h2>
          <p className="text-xs text-slate-600 font-medium">
            Calories & protein decrease in real-time as you log each meal.
          </p>
        </div>

        {/* Shake Recipe Quick Button */}
        <button
          onClick={() => {
            sound.triggerHaptic('light');
            setShowShakeModal(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer text-white flex-shrink-0 glass-btn-primary"
        >
          <Coffee size={13} className="text-[#D4AF37]" />
          <span>Shake</span>
        </button>
      </div>

      {/* Dynamic 7-Day Week Calendar Switcher with exact dates & completion history */}
      <WeekCalendarBar className="my-1" />

      {/* Active Day Theme Banner */}
      <div className="glass-panel-subtle rounded-2xl p-3.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#1B4332] block">
              {activePlan.dayName} Menu • {activePlan.theme}
            </span>
            <p className="text-xs text-slate-900 font-bold mt-0.5">
              Key Ingredients: <span className="text-slate-800 font-medium">{activePlan.highlightFood}</span>
            </p>
          </div>
        </div>
      </div>

      {/* REAL-TIME DECREASING MACRO SUMMARY CARD */}
      <div className="glass-panel rounded-3xl p-4.5 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#1B4332]">
            Remaining Daily Budget
          </span>
          <span className="text-[10px] font-bold text-slate-600">
            {dayLog.completedMeals.length}/5 Meals Logged
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          {/* Remaining Calories Box */}
          <div className="p-3.5 rounded-2xl glass-panel-subtle border border-orange-200/80">
            <div className="flex items-center gap-1.5 text-xs font-black text-orange-900 mb-0.5">
              <Flame size={15} className="text-orange-600" />
              <span>Energy Left</span>
            </div>
            <div className="text-xl font-black text-orange-800">
              {remainingCalories.toLocaleString()} <span className="text-xs font-semibold">kcal</span>
            </div>
            <div className="text-[10px] font-bold mt-1 text-orange-950">
              {consumedCalories} / {targetCalories} kcal consumed
            </div>
          </div>

          {/* Remaining Protein Box */}
          <div className="p-3.5 rounded-2xl glass-panel-subtle border border-emerald-200/80">
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-900 mb-0.5">
              <Sparkles size={15} className="text-[#1B4332]" />
              <span>Protein Left</span>
            </div>
            <div className="text-xl font-black text-[#1B4332]">
              {remainingProtein} <span className="text-xs font-semibold">g left</span>
            </div>
            <div className="text-[10px] font-bold mt-1 text-emerald-950">
              {consumedProtein} / {targetProtein}g consumed
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3.5 pt-2 border-t border-gray-200/80">
          <div className="flex justify-between text-[10px] font-bold text-slate-600 mb-1">
            <span>Daily Consumption Progress</span>
            <span>{Math.round((consumedCalories / targetCalories) * 100)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out glass-btn-primary"
              style={{
                width: `${Math.min(100, Math.round((consumedCalories / targetCalories) * 100))}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* 5 Meal Schedule Cards for Selected Day */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black text-slate-800">
            {activePlan.dayName} Meals ({dayLog.completedMeals.length}/5 Logged)
          </span>
          {dayLog.completedMeals.length >= 5 ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-black text-pink-700 bg-pink-100/95 px-2.5 py-0.5 rounded-full border border-pink-300 shadow-2xs">
              <CheckCircle2 size={12} className="text-pink-600" /> All 5 Meals Completed ✓
            </span>
          ) : (
            <button
              onClick={() => {
                sound.playSuccess();
                sound.triggerHaptic('medium');
                useStore.getState().markDayAllCompleted(currentDate, activePlan.dayId);
                toast.success(`Marked all 5 meals logged for ${activePlan.dayName}! 🍛✨`);
              }}
              className="text-[10px] font-bold text-[#1B4332] hover:underline cursor-pointer active:scale-95 transition-all"
            >
              + Mark All 5 Done
            </button>
          )}
        </div>
        {activePlan.meals.map((meal) => {
          const isDone = dayLog.completedMeals.includes(meal.id);
          const mealCalories = isVegetarian && meal.vegCalories ? meal.vegCalories : meal.calories;
          const mealProtein = isVegetarian && meal.vegProtein ? meal.vegProtein : meal.protein;

          return (
            <div
              key={meal.id}
              onClick={() => handleToggleMeal(meal.id, meal.title, mealCalories, mealProtein)}
              className={`glass-panel rounded-3xl p-4.5 transition-all duration-200 cursor-pointer select-none relative shadow-xs ${
                isDone ? 'opacity-85 ring-1 ring-[#2D6A4F]/50' : 'active:scale-[0.99]'
              }`}
            >
              {/* Card Header: Prominent Dark Green Timing Badge, Title, and Checkbox */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{meal.emoji}</span>
                  <div>
                    {/* Clear, High-Contrast Dark Green Timing Badge */}
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black text-white glass-btn-primary shadow-xs">
                        <Clock size={11} className="text-[#D4AF37]" />
                        <span className="tracking-wide">{meal.time}</span>
                      </div>

                      {/* Specific Meal Calories & Protein Pill */}
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full glass-panel-subtle text-amber-950 border border-amber-200/80">
                        ⚡ {mealCalories} kcal • 🥩 {mealProtein}g protein
                      </span>
                    </div>

                    <h3 className={`text-sm font-extrabold tracking-tight ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {meal.title}
                    </h3>
                  </div>
                </div>

                {/* Checkbox Icon */}
                <div className="transition-transform active:scale-90">
                  {isDone ? (
                    <CheckCircle2 size={24} className="text-[#1B4332]" />
                  ) : (
                    <Circle size={24} className="text-slate-400 opacity-60" />
                  )}
                </div>
              </div>

              {/* Meal Food Items List */}
              <ul className="space-y-2 ml-1 mt-2 border-t border-gray-200/80 pt-2.5">
                {meal.items.map((item, idx) => {
                  const displayText =
                    isVegetarian && item.vegAlternative ? item.vegAlternative : item.name;

                  return (
                    <li
                      key={idx}
                      className="text-xs flex items-start gap-2 font-medium leading-relaxed text-slate-900"
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                        style={{ backgroundColor: isDone ? '#40916C' : '#1B4332' }}
                      />
                      <div className="flex-1">
                        <span className={isDone ? 'line-through text-slate-400' : 'font-bold text-slate-900'}>
                          {displayText}
                        </span>
                        {isVegetarian && item.vegAlternative && (
                          <span className="ml-1.5 text-[9px] font-black px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-900">
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
                <div className="mt-2.5 pt-2 border-t border-gray-200/50 text-[10px] font-bold text-emerald-900 italic">
                  🌿 {meal.macroTag}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Hydration Tracker Card */}
      <div className="glass-panel rounded-3xl p-4.5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl flex items-center justify-center glass-panel-subtle text-cyan-800 shadow-2xs">
              <Droplets size={18} />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Hydration Tracker</h3>
              <p className="text-[11px] text-slate-600 font-medium">
                Target: {dailyGoals.waterGlasses || 8} glasses (~2.5 Litres)
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-[#1B4332]">
              {dayLog.waterGlasses || 0}
            </span>
            <span className="text-xs font-semibold text-slate-600">/{dailyGoals.waterGlasses || 8}</span>
          </div>
        </div>

        {/* Stepper Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateWater(-1)}
            disabled={(dayLog.waterGlasses || 0) <= 0}
            className="flex-1 py-2 rounded-xl flex items-center justify-center font-bold text-xs glass-btn-secondary text-slate-900 disabled:opacity-30 active:scale-95 cursor-pointer"
          >
            <Minus size={14} className="mr-1" /> -1 Glass
          </button>
          <button
            onClick={() => updateWater(1)}
            className="flex-1 py-2 rounded-xl flex items-center justify-center font-black text-xs text-white glass-btn-primary shadow-xs active:scale-95 cursor-pointer"
          >
            <Plus size={14} className="mr-1" /> +1 Glass (250ml)
          </button>
        </div>
      </div>

      {/* Important Food Rules Accordion */}
      <div className="glass-panel-subtle rounded-2xl p-4 shadow-xs">
        <button
          onClick={() => {
            sound.triggerHaptic('light');
            setShowRules(!showRules);
          }}
          className="w-full flex items-center justify-between text-left cursor-pointer text-slate-900"
        >
          <div className="flex items-center gap-2">
            <Info size={16} className="text-[#1B4332]" />
            <span className="text-xs font-black tracking-wide uppercase text-slate-900">Important Food Rules</span>
          </div>
          {showRules ? <ChevronUp size={16} className="text-slate-800" /> : <ChevronDown size={16} className="text-slate-800" />}
        </button>

        {showRules && (
          <ul className="mt-3 space-y-2.5 border-t border-gray-200 pt-3">
            {foodRules.map((rule, idx) => (
              <li key={idx} className="text-xs flex items-start gap-2 leading-relaxed font-semibold text-slate-900">
                <span className="text-[#1B4332] font-black mt-0.5">•</span>
                <span className="text-slate-900">{rule}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* INTERACTIVE KIRANA & MANDI GROCERY CHECKLIST MODAL */}
      {showGroceryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md max-h-[85vh] flex flex-col rounded-3xl p-5 shadow-2xl glass-panel border border-white/80">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center glass-panel-subtle text-[#1B4332]">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Kirana & Mandi Checklist</h3>
                  <span className="text-[10px] text-slate-600 font-semibold">
                    Everything you need for this week's Indian diet
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowGroceryModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center glass-btn-secondary font-bold text-xs cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Explanation Note */}
            <div className="my-2.5 p-2.5 rounded-xl bg-emerald-50 text-emerald-950 text-[11px] leading-relaxed border border-emerald-200/60">
              🏪 <strong>Kirana</strong> = Local Indian grocery store (Atta, Dal, Oats, Peanut Butter, Dates, Dry fruits).  
              🥬 <strong>Mandi</strong> = Local fresh market (Bananas, Spinach, Tomatoes, Fresh Curd & Paneer).
            </div>

            {/* Checklist items */}
            <div className="overflow-y-auto flex-1 pr-1 space-y-3 my-1">
              {['Dairy & Poultry', 'Grains & Atta', 'Lentils (Dals)', 'Dry Fruits & Fruits', 'Mandi Vegetables'].map((cat) => {
                const categoryItems = weeklyGroceryList.filter((item) => item.category === cat);

                return (
                  <div key={cat} className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#1B4332] block">
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
                              backgroundColor: isChecked ? 'rgba(45, 106, 79, 0.08)' : 'rgba(255, 255, 255, 0.7)',
                              borderColor: isChecked ? '#2D6A4F' : 'rgba(255, 255, 255, 0.9)',
                            }}
                          >
                            <div className="flex items-center gap-2">
                              {isChecked ? (
                                <CheckSquare size={16} className="text-[#2D6A4F]" />
                              ) : (
                                <Square size={16} className="opacity-30" />
                              )}
                              <span className={isChecked ? 'line-through text-slate-400 font-medium' : 'font-bold text-slate-900'}>
                                {item.name}
                              </span>
                            </div>
                            <span className="text-[10px] font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded-md">
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

            <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">
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
