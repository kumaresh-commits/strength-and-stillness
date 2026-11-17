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

  const selectedLog = getDayLog(currentDate);
  const isSelectedDayCompleted =
    selectedLog.workoutDone || (selectedLog.completedMeals && selectedLog.completedMeals.length >= 5);

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Date Header & Quick Jump Controls */}
      {showStatusSummary && (
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1.5">
            <Calendar
              size={14}
              className={isSelectedDayCompleted ? 'text-pink-600' : 'text-[#1B4332]'}
            />
            <span
              className={`text-xs font-black tracking-tight ${
                isSelectedDayCompleted ? 'text-pink-700' : 'text-slate-900'
              }`}
            >
              {selectedDay.fullDateLabel}
            </span>
            {isViewingToday ? (
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#1B4332] text-white">
                Today
              </span>
            ) : isSelectedDayCompleted ? (
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-300 flex items-center gap-1 shadow-2xs">
                <Check size={10} strokeWidth={3.5} className="text-pink-600" />
                <span>Day Completed ✓</span>
              </span>
            ) : selectedDay.isPast ? (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                Past History
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
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
              className="flex items-center gap-1 text-[11px] font-bold text-[#1B4332] hover:underline cursor-pointer active:scale-95 transition-all"
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
          const isWorkoutDone =
            log.workoutDone || Object.values(log.completedSets || {}).some((s) => s.length > 0);
          const isCompleted = log.workoutDone || (log.completedMeals && log.completedMeals.length >= 5);
          const hasAnyActivity = hasCompletedMeals || isWorkoutDone;

          // Determine styling: Pink for completed days (like day 16)
          let pillClasses = 'flex-1 min-w-[54px] py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative active:scale-95 ';
          let pillStyle: React.CSSProperties = {};
          let dayShortClasses = 'text-[10px] font-black uppercase tracking-wider ';
          let dateNumClasses = 'text-sm font-black mt-0.5 leading-none ';

          if (isCompleted) {
            if (isSelected) {
              pillClasses += 'text-white shadow-md border border-pink-300';
              pillStyle = {
                background: 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)',
                boxShadow: '0 4px 14px rgba(236, 72, 153, 0.45)',
              };
              dayShortClasses += 'text-pink-100';
              dateNumClasses += 'text-white';
            } else {
              pillClasses += 'border border-pink-300/90 shadow-2xs bg-pink-50/95';
              pillStyle = {
                boxShadow: '0 2px 8px rgba(236, 72, 153, 0.2)',
              };
              dayShortClasses += 'text-pink-500';
              dateNumClasses += 'text-pink-600';
            }
          } else {
            if (isSelected) {
              pillClasses += 'glass-chip-active';
              dayShortClasses += 'text-emerald-100';
              dateNumClasses += 'text-white';
            } else {
              pillClasses += 'glass-chip-inactive';
              dayShortClasses += 'text-slate-500';
              dateNumClasses += 'text-slate-800';
            }
          }

          return (
            <button
              key={day.dateStr}
              onClick={() => {
                sound.triggerHaptic('light');
                setCurrentDate(day.dateStr);
              }}
              className={pillClasses}
              style={pillStyle}
            >
              {/* Today Gold Dot Indicator */}
              {day.isToday && !isSelected && (
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] absolute top-1.5 right-1.5 shadow-xs"
                  title="Today"
                />
              )}

              {/* Day Abbreviation: Mon, Tue, Wed, etc. */}
              <span className={dayShortClasses}>{day.dayShort}</span>

              {/* Day Date Number: 16, 17, 18, etc. */}
              <span className={dateNumClasses}>{day.dateNum}</span>

              {/* History Completion Indicator Badge */}
              <div className="h-2.5 mt-1 flex items-center justify-center">
                {isCompleted ? (
                  <span
                    className={`inline-flex items-center justify-center w-3 h-3 rounded-full shadow-2xs ${
                      isSelected ? 'bg-white text-pink-600' : 'bg-pink-500 text-white'
                    }`}
                    title="Day completed (marked in pink)"
                  >
                    <Check size={8} strokeWidth={3.5} />
                  </span>
                ) : hasAnyActivity ? (
                  <span
                    className={`inline-flex items-center justify-center w-3 h-3 rounded-full ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#1B4332]'
                        : 'bg-[#1B4332] text-white shadow-2xs'
                    }`}
                    title="Activity in progress"
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
