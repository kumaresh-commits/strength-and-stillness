import React, { useState } from 'react';
import { dailyShakeRecipes, getShakeRecipeForDay } from '../data/shakeRecipes';
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
        <div className="px-3 py-2 bg-slate-100/80 border-b border-slate-200/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
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
                  backgroundColor: isSelected ? '#1B4332' : 'rgba(255, 255, 255, 0.85)',
                  color: isSelected ? '#FFFFFF' : '#0F172A',
                  borderColor: isSelected ? '#1B4332' : 'rgba(255, 255, 255, 0.9)',
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
          <p className="text-xs text-slate-800 font-medium leading-relaxed italic border-l-2 border-[#1B4332] pl-2.5">
            "{currentRecipe.tagline}"
          </p>

          {/* Real-Time Nutrition Grid Badges */}
          <div className="grid grid-cols-4 gap-1.5 text-center">
            <div className="p-2 rounded-xl bg-orange-50 border border-orange-200/60">
              <span className="text-[9px] font-black uppercase text-orange-800 block">Energy</span>
              <span className="text-sm font-black text-orange-950">{currentRecipe.calories}</span>
              <span className="text-[9px] text-orange-800/80 block font-bold">kcal</span>
            </div>

            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200/60">
              <span className="text-[9px] font-black uppercase text-emerald-800 block">Protein</span>
              <span className="text-sm font-black text-[#1B4332]">{currentRecipe.protein}g</span>
              <span className="text-[9px] text-emerald-800/80 block font-bold">muscle fuel</span>
            </div>

            <div className="p-2 rounded-xl bg-blue-50 border border-blue-200/60">
              <span className="text-[9px] font-black uppercase text-blue-800 block">Carbs</span>
              <span className="text-sm font-black text-blue-950">{currentRecipe.carbs}g</span>
              <span className="text-[9px] text-blue-800/80 block font-bold">glycogen</span>
            </div>

            <div className="p-2 rounded-xl bg-amber-50 border border-amber-200/60">
              <span className="text-[9px] font-black uppercase text-amber-800 block">Healthy Fat</span>
              <span className="text-sm font-black text-amber-950">{currentRecipe.fats}g</span>
              <span className="text-[9px] text-amber-800/80 block font-bold">hormones</span>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="p-3.5 rounded-2xl glass-panel-subtle shadow-xs">
            <div className="flex items-center gap-1.5 font-black text-xs text-[#1B4332] mb-2 uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Exact Ingredients</span>
            </div>

            <div className="space-y-1.5">
              {currentRecipe.ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-1 border-b border-gray-200/70 last:border-none"
                >
                  <span className="font-bold text-xs flex items-center gap-1.5 text-slate-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332]" />
                    {ing.name}
                  </span>
                  <span className="font-black text-[11px] px-2 py-0.5 rounded-md bg-white text-slate-900 border border-slate-200 shadow-2xs">
                    {ing.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions Step-by-Step */}
          <div className="p-3.5 rounded-2xl glass-panel-subtle shadow-xs">
            <div className="flex items-center gap-1.5 font-black text-xs text-[#1B4332] mb-2 uppercase tracking-wider">
              <Flame size={14} />
              <span>How To Blend</span>
            </div>

            <ol className="space-y-1.5 pl-1">
              {currentRecipe.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center bg-[#1B4332] text-white font-black text-[10px] mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-xs text-slate-900">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Coach's Pro Tip */}
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-950 border border-amber-200/70 flex items-start gap-2">
            <Lightbulb size={16} className="text-[#B8860B] flex-shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed text-slate-900">
              <strong className="font-bold text-[#B8860B] block">Coach's Absorption Tip:</strong>
              {currentRecipe.coachTip}
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-3 bg-slate-100/90 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-600">
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
