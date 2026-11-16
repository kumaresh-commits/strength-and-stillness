import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../lib/themes';
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
  const { theme, currentDate, getDayLog, setSleepHours, setSteps, dailyGoals } = useStore();
  const t = themes[theme];
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
        <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
          <span>Mindful Recovery</span>
          <span
            className="text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white shadow-xs"
            style={{ backgroundColor: '#1B4332' }}
          >
            Stillness
          </span>
        </h2>
        <p className="text-xs opacity-75 mt-0.5">
          "Rest deeply. Small steps, taken daily, build an unshakable body and mind."
        </p>
      </div>

      {/* Hero Quote Card from PDF */}
      <div
        className="rounded-3xl p-5 border text-center relative overflow-hidden shadow-xs"
        style={{
          backgroundColor: t.card,
          borderColor: theme === 'cyber' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        }}
      >
        <span className="text-2xl mb-1 block">🧘‍♂️</span>
        <blockquote className="text-sm font-extrabold italic leading-snug">
          “Discipline is choosing between what you want now and what you want most.”
        </blockquote>
        <p className="text-xs font-semibold opacity-70 mt-2">
          Eat well. Train steady. Rest deeply. Repeat.
        </p>
      </div>

      {/* Sleep Tracker Card */}
      <div
        className="rounded-2xl p-4 border"
        style={{
          backgroundColor: t.card,
          borderColor: theme === 'cyber' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bed size={18} className="text-indigo-500" />
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider">Sleep Duration</h3>
              <p className="text-[11px] opacity-70">
                Target: {dailyGoals.sleepHours || 8} hours of deep restorative sleep
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-indigo-500">
              {dayLog.sleepHours || 0}
            </span>
            <span className="text-xs opacity-60 font-medium">/{dailyGoals.sleepHours || 8} hrs</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => updateSleep(-0.5)}
            className="flex-1 py-2 rounded-xl flex items-center justify-center font-bold text-xs bg-gray-100 dark:bg-gray-800 active:scale-95 cursor-pointer"
          >
            <Minus size={14} className="mr-1" /> -30 min
          </button>
          <button
            onClick={() => updateSleep(0.5)}
            className="flex-1 py-2 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-sm active:scale-95 cursor-pointer"
            style={{ backgroundColor: '#6366F1' }}
          >
            <Plus size={14} className="mr-1" /> +30 min
          </button>
        </div>
      </div>

      {/* Light Walking / Step Log Card */}
      <div
        className="rounded-2xl p-4 border"
        style={{
          backgroundColor: t.card,
          borderColor: theme === 'cyber' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Footprints size={18} className="text-emerald-500" />
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider">Active Walking</h3>
              <p className="text-[11px] opacity-70">
                Target: {dailyGoals.steps?.toLocaleString() || '6,000'} steps (light blood flow)
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-base font-black text-emerald-500">
              {(dayLog.steps || 0).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => updateSteps(-500)}
            disabled={(dayLog.steps || 0) <= 0}
            className="flex-1 py-2 rounded-xl flex items-center justify-center font-bold text-xs bg-gray-100 dark:bg-gray-800 disabled:opacity-30 active:scale-95 cursor-pointer"
          >
            -500 steps
          </button>
          <button
            onClick={() => updateSteps(1000)}
            className="flex-1 py-2 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-sm active:scale-95 cursor-pointer"
            style={{ backgroundColor: '#10B981' }}
          >
            +1,000 steps
          </button>
        </div>
      </div>

      {/* Gentle Stretching Routine Checklist */}
      <div
        className="rounded-3xl p-4 border"
        style={{
          backgroundColor: t.card,
          borderColor: theme === 'cyber' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-amber-500" />
            <h3 className="text-xs font-black uppercase tracking-wider">5-Minute Gentle Stretch Guide</h3>
          </div>
          <span className="text-[11px] font-bold opacity-70">
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
                className="p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between"
                style={{
                  backgroundColor: isDone
                    ? theme === 'cyber'
                      ? 'rgba(16,185,129,0.1)'
                      : 'rgba(82,183,136,0.1)'
                    : theme === 'cyber'
                    ? 'rgba(255,255,255,0.02)'
                    : 'rgba(0,0,0,0.02)',
                  borderColor: isDone ? t.success : 'transparent',
                }}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className={`text-xs font-bold ${isDone ? 'line-through opacity-70' : ''}`}>
                      {item.name}
                    </h4>
                    <span className="text-[10px] font-semibold opacity-60">({item.duration})</span>
                  </div>
                  <p className="text-[10px] opacity-65 mt-0.5">{item.benefit}</p>
                </div>

                <div>
                  {isDone ? (
                    <CheckCircle2 size={18} style={{ color: t.success }} />
                  ) : (
                    <Circle size={18} className="opacity-30" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety & Weight Guardrails from PDF */}
      <div
        className="rounded-2xl p-4 border text-xs space-y-2"
        style={{
          backgroundColor: t.card,
          borderColor: theme === 'cyber' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        }}
      >
        <div className="flex items-center gap-2 text-rose-500 font-bold uppercase tracking-wider text-[11px]">
          <ShieldCheck size={16} />
          <span>Weight & Recovery Guardrails</span>
        </div>
        <p className="opacity-80 leading-relaxed text-[11px]">
          • <strong>Avoid excessive cardio:</strong> Since your weight is dropping, high-intensity cardio burns critical surplus calories needed for muscular hypertrophy.
        </p>
        <p className="opacity-80 leading-relaxed text-[11px]">
          • <strong>Don't increase training volume</strong> until your recovery, sleep trend, and body weight begin consistently trending upwards.
        </p>
      </div>
    </div>
  );
};

export default RecoveryTab;
