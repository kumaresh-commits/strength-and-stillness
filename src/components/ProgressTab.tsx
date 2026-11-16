import React from 'react';
import { useStore } from '../store/useStore';
import { sound } from '../lib/sound';
import { toast } from 'sonner';
import {
  Flame,
  Award,
  Calendar,
  Download,
} from 'lucide-react';

export const ProgressTab: React.FC = () => {
  const { dayLogs, dailyGoals } = useStore();

  // Calculate stats across all logged days
  const loggedDates = Object.keys(dayLogs);
  const totalDaysLogged = loggedDates.length;

  // Last 7 days overview
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  const past7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const dayNumStr = String(d.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${dayNumStr}`;
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
        <h2 className="text-lg font-black tracking-tight flex items-center gap-2 text-slate-900">
          <span>Consistency & Analytics</span>
          <span
            className="text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white shadow-xs"
            style={{ backgroundColor: '#1B4332' }}
          >
            Insights
          </span>
        </h2>
        <p className="text-xs text-slate-600 mt-0.5 font-medium">
          Track your progressive journey day by day.
        </p>
      </div>

      {/* Streak Showcase Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass-panel rounded-3xl p-4.5 relative overflow-hidden shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <Flame size={18} className="text-orange-500 animate-pulse" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
              Diet Streak
            </span>
          </div>
          <div className="text-2xl font-black mt-1 text-slate-900">
            {Math.max(1, totalDaysLogged)} <span className="text-xs font-semibold text-slate-500">Days</span>
          </div>
          <span className="text-[10px] text-slate-500 font-semibold block mt-1">5-meal daily discipline</span>
        </div>

        <div className="glass-panel rounded-3xl p-4.5 relative overflow-hidden shadow-xs">
          <div className="flex items-center gap-2 mb-1">
            <Award size={18} className="text-emerald-700" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
              Gym Streak
            </span>
          </div>
          <div className="text-2xl font-black mt-1 text-slate-900">
            {Math.max(1, loggedDates.filter((d) => dayLogs[d]?.workoutDone).length)}{' '}
            <span className="text-xs font-semibold text-slate-500">Sessions</span>
          </div>
          <span className="text-[10px] text-slate-500 font-semibold block mt-1">Progressive overload</span>
        </div>
      </div>

      {/* 7-Day Consistency Matrix */}
      <div className="glass-panel rounded-3xl p-4.5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-[#1B4332]" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Weekly Consistency</h3>
          </div>
          <span className="text-[10px] font-bold text-slate-500">Past 7 Days</span>
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center">
          {past7Days.map((d, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-2xl flex flex-col items-center transition-all ${
                d.isToday ? 'glass-panel-subtle ring-2 ring-[#1B4332]' : 'glass-panel-subtle'
              }`}
            >
              <span className="text-[10px] font-extrabold text-slate-500">{d.dayShort}</span>
              <span className="text-xs font-black my-1 text-slate-900">{d.dayNum}</span>

              {/* Status indicators */}
              <div className="space-y-1 w-full flex flex-col items-center">
                <span
                  className={`w-2 h-2 rounded-full ${
                    d.mealsDone ? 'bg-orange-500' : 'bg-slate-300'
                  }`}
                  title="Diet"
                />
                <span
                  className={`w-2 h-2 rounded-full ${
                    d.workoutDone ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                  title="Workout"
                />
                <span
                  className={`w-2 h-2 rounded-full ${
                    d.waterDone ? 'bg-cyan-500' : 'bg-slate-300'
                  }`}
                  title="Hydration"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-gray-200/80 text-[10px] text-slate-600 font-semibold">
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
      <div className="glass-panel rounded-3xl p-4.5 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Local Data & Privacy</h3>
            <p className="text-[11px] text-slate-600 font-medium mt-0.5">
              100% of your data stays privately on your iPhone.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={exportData}
            className="w-full py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 glass-btn-secondary text-slate-900 active:scale-95 cursor-pointer transition-all shadow-xs"
          >
            <Download size={14} /> Download Backup (JSON)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressTab;
