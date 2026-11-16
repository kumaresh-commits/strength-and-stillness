import React, { useState } from 'react';
import { dailyShakeRecipes, getShakeRecipeForDay } from '../data/shakeRecipes';
import { themes } from '../lib/themes';
import { useStore } from '../store/useStore';
import { sound } from '../lib/sound';
import { X, Flame, Sparkles, Clock, Lightbulb } from 'lucide-react';

interface ShakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDayIndex?: number;
}

export const ShakeModal: React.FC<ShakeModalProps> = ({
  isOpen,
  onClose,
  initialDayIndex = new Date().getDay(),
}) => {
  const { theme } = useStore();
  const t = themes[theme];

  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(initialDayIndex);

  if (!isOpen) return null;

  const currentRecipe = getShakeRecipeForDay(selectedDayIndex);
  const todayDayIndex = new Date().getDay();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md max-h-[90vh] flex flex-col rounded-3xl shadow-2xl glass-panel border border-white/80 overflow-hidden">
        {/* Header - Premium Glossy Banner */}
        <div className="p-4 glass-btn-primary text-white flex items-center justify-between relative">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">{currentRecipe.emoji}</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#1B4332] shadow-xs">
                  Daily Bulking Shake
                </span>
                <span className="text-[10px] font-bold opacity-80 flex items-center gap-1">
                  <Clock size={11} /> {currentRecipe.prepTime}
                </span>
              </div>
              <h3 className="text-base font-black tracking-tight mt-0.5">{currentRecipe.name}</h3>
            </div>
          </div>

          <button
            onClick={() => {
              sound.triggerHaptic('light');
              onClose();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 text-white font-bold text-sm cursor-pointer transition-all shadow-xs"
          >
            <X size={16} />
          </button>
        </div>

        {/* 7-Day Day Selector Bar */}
        <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {dailyShakeRecipes.map((r) => {
            const isSelected = r.dayIndex === selectedDayIndex;
            const isToday = r.dayIndex === todayDayIndex;

            return (
              <button
                key={r.dayId}
                onClick={() => {
                  sound.triggerHaptic('light');
                  setSelectedDayIndex(r.dayIndex);
                }}
                className="flex-shrink-0 px-2.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer border shadow-2xs relative"
                style={{
                  backgroundColor: isSelected ? '#1B4332' : t.card,
                  color: isSelected ? '#FFFFFF' : t.text,
                  borderColor: isSelected ? '#1B4332' : t.border,
                }}
              >
                {isToday && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" title="Today's Recipe" />
                )}
                <span>{r.emoji}</span>
                <span>{r.dayName.slice(0, 3)}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 overflow-y-auto space-y-3.5 flex-1 text-xs">
          {/* Tagline */}
          <p className="text-xs opacity-85 font-medium leading-relaxed italic border-l-2 border-[#1B4332] pl-2.5">
            "{currentRecipe.tagline}"
          </p>

          {/* Real-Time Nutrition Grid Badges */}
          <div className="grid grid-cols-4 gap-1.5 text-center">
            <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/50">
              <span className="text-[9px] font-black uppercase text-orange-700 dark:text-orange-300 block">Energy</span>
              <span className="text-sm font-black text-orange-800 dark:text-orange-400">{currentRecipe.calories}</span>
              <span className="text-[9px] opacity-70 block font-bold">kcal</span>
            </div>

            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50">
              <span className="text-[9px] font-black uppercase text-emerald-700 dark:text-emerald-300 block">Protein</span>
              <span className="text-sm font-black text-[#1B4332] dark:text-emerald-400">{currentRecipe.protein}g</span>
              <span className="text-[9px] opacity-70 block font-bold">muscle fuel</span>
            </div>

            <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50">
              <span className="text-[9px] font-black uppercase text-blue-700 dark:text-blue-300 block">Carbs</span>
              <span className="text-sm font-black text-blue-800 dark:text-blue-400">{currentRecipe.carbs}g</span>
              <span className="text-[9px] opacity-70 block font-bold">glycogen</span>
            </div>

            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50">
              <span className="text-[9px] font-black uppercase text-amber-700 dark:text-amber-300 block">Healthy Fat</span>
              <span className="text-sm font-black text-amber-800 dark:text-amber-400">{currentRecipe.fats}g</span>
              <span className="text-[9px] opacity-70 block font-bold">hormones</span>
            </div>
          </div>

          {/* Ingredients Section */}
          <div
            className="p-3.5 rounded-2xl border"
            style={{ backgroundColor: t.bg, borderColor: t.border }}
          >
            <div className="flex items-center gap-1.5 font-black text-xs text-[#1B4332] dark:text-[#74C69D] mb-2 uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Exact Ingredients</span>
            </div>

            <div className="space-y-1.5">
              {currentRecipe.ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-gray-800 last:border-none"
                >
                  <span className="font-semibold text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332]" />
                    {ing.name}
                  </span>
                  <span className="font-black text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    {ing.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions Step-by-Step */}
          <div
            className="p-3.5 rounded-2xl border"
            style={{ backgroundColor: t.bg, borderColor: t.border }}
          >
            <div className="flex items-center gap-1.5 font-black text-xs text-[#1B4332] dark:text-[#74C69D] mb-2 uppercase tracking-wider">
              <Flame size={14} />
              <span>How To Blend</span>
            </div>

            <ol className="space-y-1.5 pl-1">
              {currentRecipe.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center bg-[#1B4332] text-white font-black text-[10px] mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-xs">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Coach's Pro Tip */}
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-200/60 flex items-start gap-2">
            <Lightbulb size={16} className="text-[#B8860B] flex-shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong className="font-bold text-[#B8860B] block">Coach's Absorption Tip:</strong>
              {currentRecipe.coachTip}
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <span className="text-[10px] font-bold opacity-60">
            {currentRecipe.dayName}'s Recipe Selected
          </span>
          <button
            onClick={() => {
              sound.triggerHaptic('medium');
              sound.playSuccess();
              onClose();
            }}
            className="px-5 py-2 rounded-xl font-black text-xs text-white shadow-xs active:scale-95 cursor-pointer"
            style={{ backgroundColor: '#1B4332' }}
          >
            Got It, Blend Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShakeModal;
