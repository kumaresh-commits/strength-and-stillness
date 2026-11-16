import React from 'react';
import { useStore } from '../store/useStore';
import { themes } from '../lib/themes';
import { sound } from '../lib/sound';
import { toast } from 'sonner';
import {
  Flame,
  Award,
  Calendar,
  Download,
} from 'lucide-react';

export const ProgressTab: React.FC = () => {
  const { theme, dayLogs, dailyGoals } = useStore();
  const t = themes[theme];

  // Calculate stats across all logged days
  const loggedDates = Object.keys(dayLogs);
  const totalDaysLogged = loggedDates.length;

  // Last 7 days overview
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  const past7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const log = dayLogs[dateStr];
    return {
      dateStr,
      dayShort: daysOfWeek[d.getDay()],
      dayNum: d.getDate(),
      isToday: i === 6,
      mealsDone: (log?.completedMeals?.length || 0) >= (dailyGoals.meals || 5),
      workoutDone: log?.workoutDone || false,
      waterDone: (log?.waterGlasses || 0) >= (dailyGoals.waterGlasses || 8),
    };
  });

  const exportData = () => {
    sound.triggerHaptic('medium');
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dayLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `strength_stillness_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('Backup downloaded successfully!', {
      description: 'Your local diet & workout logs are safely exported.',
    });
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
          <span>Consistency & Analytics</span>
          <span
            className="text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white shadow-xs"
            style={{ backgroundColor: '#1B4332' }}
          >
            Insights
          </span>
        </h2>
        <p className="text-xs opacity-75 mt-0.5">
          Track your progressive journey day by day.
        </p>
      </div>

      {/* Streak Showcase Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div
          className="rounded-3xl p-4 border relative overflow-hidden"
          style={{
            backgroundColor: t.card,
            borderColor: theme === 'cyber' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Flame size={18} className="text-orange-500 animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-70">
              Diet Streak
            </span>
          </div>
          <div className="text-2xl font-black mt-1">
            {Math.max(1, totalDaysLogged)} <span className="text-xs font-semibold opacity-60">Days</span>
          </div>
          <span className="text-[10px] opacity-60 block mt-1">5-meal daily discipline</span>
        </div>

        <div
          className="rounded-3xl p-4 border relative overflow-hidden"
          style={{
            backgroundColor: t.card,
            borderColor: theme === 'cyber' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Award size={18} className="text-emerald-500" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-70">
              Gym Streak
            </span>
          </div>
          <div className="text-2xl font-black mt-1">
            {Math.max(1, loggedDates.filter((d) => dayLogs[d]?.workoutDone).length)}{' '}
            <span className="text-xs font-semibold opacity-60">Sessions</span>
          </div>
          <span className="text-[10px] opacity-60 block mt-1">Progressive overload</span>
        </div>
      </div>

      {/* 7-Day Consistency Matrix */}
      <div
        className="rounded-3xl p-4 border"
        style={{
          backgroundColor: t.card,
          borderColor: theme === 'cyber' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar size={16} style={{ color: t.primary }} />
            <h3 className="text-xs font-black uppercase tracking-wider">Weekly Consistency</h3>
          </div>
          <span className="text-[10px] font-bold opacity-60">Past 7 Days</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center">
          {past7Days.map((d, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-2xl flex flex-col items-center border transition-all ${
                d.isToday ? 'ring-2' : ''
              }`}
              style={{
                borderColor: d.isToday ? t.primary : theme === 'cyber' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                backgroundColor: d.isToday
                  ? theme === 'cyber'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.03)'
                  : 'transparent',
              }}
            >
              <span className="text-[10px] font-extrabold opacity-60">{d.dayShort}</span>
              <span className="text-xs font-black my-1">{d.dayNum}</span>

              {/* Status indicators */}
              <div className="space-y-1 w-full flex flex-col items-center">
                <span
                  className={`w-2 h-2 rounded-full ${
                    d.mealsDone ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  title="Diet"
                />
                <span
                  className={`w-2 h-2 rounded-full ${
                    d.workoutDone ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  title="Workout"
                />
                <span
                  className={`w-2 h-2 rounded-full ${
                    d.waterDone ? 'bg-cyan-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  title="Hydration"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-[10px] opacity-70">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>Meals</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Gym</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <span>Water</span>
          </div>
        </div>
      </div>

      {/* Local Storage & Export Options */}
      <div
        className="rounded-3xl p-4 border"
        style={{
          backgroundColor: t.card,
          borderColor: theme === 'cyber' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider">Local Data & Privacy</h3>
            <p className="text-[11px] opacity-70 mt-0.5">
              100% of your data stays privately on your iPhone.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={exportData}
            className="w-full py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border bg-gray-50 dark:bg-gray-800 active:scale-95 cursor-pointer transition-all"
            style={{ borderColor: theme === 'cyber' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
          >
            <Download size={14} /> Download Backup (JSON)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressTab;
