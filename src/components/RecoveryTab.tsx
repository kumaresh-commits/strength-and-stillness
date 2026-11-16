import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { sound } from '../lib/sound';
import { toast } from 'sonner';
import {
  Footprints,
  Sparkles,
  CheckCircle2,
  Circle,
  Plus,
  Minus,
  Bed,
  ShieldCheck,
} from 'lucide-react';

interface StretchItem {
  name: string;
  duration: string;
  benefit: string;
}

const stretchRoutine: StretchItem[] = [
  { name: 'Cat-Cow Pose', duration: '60 secs', benefit: 'Spinal mobility & decompress lower back' },
  { name: 'Doorway Chest Opener', duration: '45 secs/side', benefit: 'Relieves tight pecs & anterior delts' },
  { name: 'Kneeling Hip Flexor Stretch', duration: '60 secs/side', benefit: 'Releases hips from squats & sitting' },
  { name: 'Standing Hamstring & Calf Sweep', duration: '45 secs/side', benefit: 'Eases posterior chain tension' },
  { name: 'Child\'s Pose Deep Breathing', duration: '2 mins', benefit: 'Calms nervous system for deep recovery' },
];

export const RecoveryTab: React.FC = () => {
  const { currentDate, getDayLog, setSleepHours, setSteps, dailyGoals } = useStore();
  const dayLog = getDayLog(currentDate);

  const [completedStretches, setCompletedStretches] = useState<string[]>([]);

  const toggleStretch = (name: string) => {
    sound.triggerHaptic('light');
    setCompletedStretches((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const updateSleep = (delta: number) => {
    sound.triggerHaptic('light');
    const current = dayLog.sleepHours || 7;
    const nextVal = Math.max(0, Math.min(14, current + delta));
    setSleepHours(currentDate, nextVal);
    if (delta > 0 && nextVal >= 8) {
      sound.playChime();
      toast.success('Optimal recovery reached! 😴', {
        description: `${nextVal} hours of sleep maximizes testosterone and muscle repair.`,
      });
    }
  };

  const updateSteps = (delta: number) => {
    sound.triggerHaptic('light');
    const current = dayLog.steps || 0;
    const nextVal = Math.max(0, current + delta);
    setSteps(currentDate, nextVal);
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <h2 className="text-lg font-black tracking-tight flex items-center gap-2 text-slate-900">
          <span>Mindful Recovery</span>
          <span
            className="text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white shadow-xs"
            style={{ backgroundColor: '#1B4332' }}
          >
            Stillness
          </span>
        </h2>
        <p className="text-xs text-slate-600 mt-0.5 font-medium">
          "Rest deeply. Small steps, taken daily, build an unshakable body and mind."
        </p>
      </div>

      {/* Hero Quote Card from PDF */}
      <div className="glass-panel rounded-3xl p-5 text-center relative overflow-hidden shadow-xs">
        <span className="text-2xl mb-1 block">🧘‍♂️</span>
        <blockquote className="text-sm font-extrabold italic leading-snug text-slate-900">
          “Discipline is choosing between what you want now and what you want most.”
        </blockquote>
        <p className="text-xs font-bold text-slate-600 mt-2">
          Eat well. Train steady. Rest deeply. Repeat.
        </p>
      </div>

      {/* Sleep Tracker Card */}
      <div className="glass-panel rounded-3xl p-4.5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center glass-panel-subtle text-indigo-700">
              <Bed size={18} />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Sleep Duration</h3>
              <p className="text-[11px] text-slate-600 font-medium">
                Target: {dailyGoals.sleepHours || 8} hours of deep restorative sleep
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-indigo-700">
              {dayLog.sleepHours || 0}
            </span>
            <span className="text-xs text-slate-600 font-bold">/{dailyGoals.sleepHours || 8} hrs</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => updateSleep(-0.5)}
            className="flex-1 py-2 rounded-xl flex items-center justify-center font-bold text-xs glass-btn-secondary text-slate-900 active:scale-95 cursor-pointer"
          >
            <Minus size={14} className="mr-1" /> -30 min
          </button>
          <button
            onClick={() => updateSleep(0.5)}
            className="flex-1 py-2 rounded-xl flex items-center justify-center font-bold text-xs text-white glass-btn-primary active:scale-95 cursor-pointer shadow-xs"
          >
            <Plus size={14} className="mr-1" /> +30 min
          </button>
        </div>
      </div>

      {/* Light Walking / Step Log Card */}
      <div className="glass-panel rounded-3xl p-4.5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center glass-panel-subtle text-emerald-800">
              <Footprints size={18} />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Active Walking</h3>
              <p className="text-[11px] text-slate-600 font-medium">
                Target: {dailyGoals.steps?.toLocaleString() || '6,000'} steps (light blood flow)
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-base font-black text-[#1B4332]">
              {(dayLog.steps || 0).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => updateSteps(-500)}
            disabled={(dayLog.steps || 0) <= 0}
            className="flex-1 py-2 rounded-xl flex items-center justify-center font-bold text-xs glass-btn-secondary text-slate-900 disabled:opacity-30 active:scale-95 cursor-pointer"
          >
            -500 steps
          </button>
          <button
            onClick={() => updateSteps(1000)}
            className="flex-1 py-2 rounded-xl flex items-center justify-center font-bold text-xs text-white glass-btn-primary active:scale-95 cursor-pointer shadow-xs"
          >
            +1,000 steps
          </button>
        </div>
      </div>

      {/* Gentle Stretching Routine Checklist */}
      <div className="glass-panel rounded-3xl p-4.5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-amber-600" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">5-Minute Gentle Stretch Guide</h3>
          </div>
          <span className="text-[11px] font-bold text-slate-600">
            {completedStretches.length}/{stretchRoutine.length}
          </span>
        </div>

        <div className="space-y-2">
          {stretchRoutine.map((item, idx) => {
            const isDone = completedStretches.includes(item.name);

            return (
              <div
                key={idx}
                onClick={() => toggleStretch(item.name)}
                className={`p-3 rounded-2xl transition-all cursor-pointer flex items-center justify-between ${
                  isDone ? 'glass-panel-subtle ring-1 ring-[#2D6A4F]/60' : 'glass-panel-subtle'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className={`text-xs font-bold text-slate-900 ${isDone ? 'line-through text-slate-400' : ''}`}>
                      {item.name}
                    </h4>
                    <span className="text-[10px] font-semibold text-slate-500">({item.duration})</span>
                  </div>
                  <p className="text-[10px] text-slate-600 font-medium mt-0.5">{item.benefit}</p>
                </div>

                <div>
                  {isDone ? (
                    <CheckCircle2 size={18} className="text-[#2D6A4F]" />
                  ) : (
                    <Circle size={18} className="text-slate-400 opacity-40" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety & Weight Guardrails from PDF */}
      <div className="glass-panel-subtle rounded-3xl p-4.5 text-xs space-y-2 shadow-xs">
        <div className="flex items-center gap-2 text-rose-700 font-bold uppercase tracking-wider text-[11px]">
          <ShieldCheck size={16} />
          <span>Weight & Recovery Guardrails</span>
        </div>
        <p className="text-slate-900 leading-relaxed text-[11px] font-medium">
          • <strong>Avoid excessive cardio:</strong> Since your weight is dropping, high-intensity cardio burns critical surplus calories needed for muscular hypertrophy.
        </p>
        <p className="text-slate-900 leading-relaxed text-[11px] font-medium">
          • <strong>Don't increase training volume</strong> until your recovery, sleep trend, and body weight begin consistently trending upwards.
        </p>
      </div>
    </div>
  );
};

export default RecoveryTab;
