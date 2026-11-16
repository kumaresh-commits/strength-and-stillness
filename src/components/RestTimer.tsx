import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../lib/themes';
import { sound } from '../lib/sound';
import { Play, Pause, RotateCcw, Plus, X, Bell } from 'lucide-react';
import { toast } from 'sonner';

interface RestTimerProps {
  initialSeconds?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const RestTimer: React.FC<RestTimerProps> = ({
  initialSeconds = 60,
  isOpen,
  onClose,
}) => {
  const { theme } = useStore();
  const t = themes[theme];

  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [totalTime, setTotalTime] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setTimeLeft(initialSeconds);
    setTotalTime(initialSeconds);
    setIsActive(true);
  }, [initialSeconds]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      sound.playBell();
      sound.triggerHaptic('heavy');
      toast.success('Rest time complete!', {
        description: 'Time to crush your next set! 💪',
      });
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainderSecs = secs % 60;
    return `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
  };

  const setPreset = (secs: number) => {
    sound.triggerHaptic('light');
    setTotalTime(secs);
    setTimeLeft(secs);
    setIsActive(true);
  };

  const addTime = (secs: number) => {
    sound.triggerHaptic('light');
    setTimeLeft((prev) => prev + secs);
    setTotalTime((prev) => prev + secs);
  };

  const progress = totalTime > 0 ? timeLeft / totalTime : 0;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="fixed bottom-24 right-4 left-4 max-w-sm mx-auto z-40 animate-slide-up">
      <div className="glass-panel rounded-3xl p-5 shadow-2xl relative border border-white/80">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Bell size={16} style={{ color: t.primary }} className={isActive ? 'animate-bounce' : ''} />
            <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white">Rest Countdown</span>
          </div>
          <button
            onClick={() => {
              sound.triggerHaptic('light');
              onClose();
            }}
            className="w-7 h-7 rounded-full flex items-center justify-center glass-btn-secondary text-xs font-bold cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Circular Progress Display */}
        <div className="flex flex-col items-center justify-center my-2">
          <div className="relative flex items-center justify-center" style={{ width: 130, height: 130 }}>
            <svg width={130} height={130} className="transform -rotate-90">
              <circle
                cx={65}
                cy={65}
                r={radius}
                stroke={theme === 'cyber' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}
                strokeWidth={8}
                fill="transparent"
              />
              <circle
                cx={65}
                cy={65}
                r={radius}
                stroke={t.primary}
                strokeWidth={8}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-300 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">{formatTime(timeLeft)}</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">
                {isActive ? 'Breathe & Recover' : 'Ready to Lift'}
              </span>
            </div>
          </div>
        </div>

        {/* Preset Selector Chips */}
        <div className="flex items-center justify-center gap-2 my-3">
          {[30, 60, 90, 120].map((secs) => (
            <button
              key={secs}
              onClick={() => setPreset(secs)}
              className={`px-3 py-1 rounded-xl text-xs font-black transition-all active:scale-95 cursor-pointer shadow-2xs ${
                totalTime === secs ? 'glass-chip-active' : 'glass-chip-inactive'
              }`}
            >
              {secs}s
            </button>
          ))}
        </div>

        {/* Play / Pause / +30s Actions */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200/60 dark:border-gray-800">
          <button
            onClick={() => {
              sound.triggerHaptic('light');
              setIsActive(!isActive);
            }}
            className="flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 text-white shadow-xs active:scale-95 cursor-pointer glass-btn-primary"
          >
            {isActive ? (
              <>
                <Pause size={14} /> Pause
              </>
            ) : (
              <>
                <Play size={14} /> Resume
              </>
            )}
          </button>

          <button
            onClick={() => addTime(30)}
            className="px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1 glass-btn-secondary text-slate-800 active:scale-95 cursor-pointer"
            title="Add 30 seconds"
          >
            <Plus size={14} /> +30s
          </button>

          <button
            onClick={() => {
              sound.triggerHaptic('light');
              setTimeLeft(totalTime);
              setIsActive(false);
            }}
            className="px-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center glass-btn-secondary text-slate-800 active:scale-95 cursor-pointer"
            title="Reset timer"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestTimer;
