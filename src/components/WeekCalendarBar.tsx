import React from 'react';
import { useStore } from '../store/useStore';
import { sound } from '../lib/sound';
import { getWeekDates, getTodayDateStr } from '../lib/dateUtils';
import { Check, Calendar, RotateCcw } from 'lucide-react';

interface WeekCalendarBarProps {
  className?: string;
  showStatusSummary?: boolean;
}

export const WeekCalendarBar: React.FC<WeekCalendarBarProps> = ({
  className = '',
  showStatusSummary = true,
}) => {
  const { currentDate, setCurrentDate, syncTodayDate, getDayLog } = useStore();
  const todayStr = getTodayDateStr();

  // Get current week's 7 days: Monday through Sunday
  const weekDays = getWeekDates(new Date(), 0);

  // Selected day object
  const selectedDay = weekDays.find((d) => d.dateStr === currentDate) || {
    dateStr: currentDate,
    dateNum: parseInt(currentDate.split('-')[2] || '1', 10),
    dayName: 'Selected Day',
    dayShort: 'Day',
    fullDateLabel: currentDate,
    isToday: currentDate === todayStr,
    isPast: currentDate < todayStr,
    isFuture: currentDate > todayStr,
  };

  const isViewingToday = currentDate === todayStr;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Date Header & Quick Jump Controls */}
      {showStatusSummary && (
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-[#1B4332] dark:text-[#74C69D]" />
            <span className="text-xs font-black tracking-tight">
              {selectedDay.fullDateLabel}
            </span>
            {isViewingToday ? (
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#1B4332] text-white">
                Today
              </span>
            ) : selectedDay.isPast ? (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                Past History
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
                Upcoming Plan
              </span>
            )}
          </div>

          {!isViewingToday && (
            <button
              onClick={() => {
                sound.triggerHaptic('light');
                syncTodayDate();
              }}
              className="flex items-center gap-1 text-[11px] font-bold text-[#1B4332] dark:text-[#74C69D] hover:underline cursor-pointer active:scale-95 transition-all"
              title="Return to today's date"
            >
              <RotateCcw size={11} />
              <span>Back to Today</span>
            </button>
          )}
        </div>
      )}

      {/* Horizontal 7-Day Pills (Mon 16, Tue 17, Wed 18, Thu 19, Fri 20, Sat 21, Sun 22) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {weekDays.map((day) => {
          const isSelected = day.dateStr === currentDate;
          const log = getDayLog(day.dateStr);

          // Completion checks for visual indicator
          const hasCompletedMeals = (log.completedMeals || []).length > 0;
          const isWorkoutDone = log.workoutDone || Object.values(log.completedSets || {}).some(s => s.length > 0);
          const hasAnyActivity = hasCompletedMeals || isWorkoutDone;

          return (
            <button
              key={day.dateStr}
              onClick={() => {
                sound.triggerHaptic('light');
                setCurrentDate(day.dateStr);
              }}
              className={`flex-1 min-w-[54px] py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative active:scale-95 ${
                isSelected ? 'glass-chip-active' : 'glass-chip-inactive'
              }`}
            >
              {/* Today Gold Dot Indicator */}
              {day.isToday && !isSelected && (
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] absolute top-1.5 right-1.5 shadow-xs"
                  title="Today"
                />
              )}

              {/* Day Abbreviation: Mon, Tue, Wed, etc. */}
              <span
                className={`text-[10px] font-black uppercase tracking-wider ${
                  isSelected ? 'text-emerald-100' : 'text-slate-500'
                }`}
              >
                {day.dayShort}
              </span>

              {/* Day Date Number: 16, 17, 18, etc. */}
              <span
                className={`text-sm font-black mt-0.5 leading-none ${
                  isSelected ? 'text-white' : 'text-slate-800'
                }`}
              >
                {day.dateNum}
              </span>

              {/* History Completion Indicator Badge */}
              <div className="h-2.5 mt-1 flex items-center justify-center">
                {hasAnyActivity ? (
                  <span
                    className={`inline-flex items-center justify-center w-3 h-3 rounded-full ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#1B4332]'
                        : 'bg-[#1B4332] text-white shadow-2xs'
                    }`}
                    title="Activity logged on this day"
                  >
                    <Check size={8} strokeWidth={3.5} />
                  </span>
                ) : (
                  <span
                    className={`text-[8px] font-semibold ${
                      isSelected ? 'text-white/70' : 'text-slate-400'
                    }`}
                  >
                    {day.isToday ? 'Today' : '—'}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WeekCalendarBar;
