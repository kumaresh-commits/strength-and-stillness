import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { workoutDays, trainingNotes } from '../data/workoutPlan';
import { WeekCalendarBar } from './WeekCalendarBar';
import { getDayIndexFromDateStr, formatFullDate, getTodayDateStr } from '../lib/dateUtils';
import { sound } from '../lib/sound';
import RestTimer from './RestTimer';
import { toast } from 'sonner';
import {
  CheckCircle2,
  Timer,
  AlertTriangle,
  Trophy,
} from 'lucide-react';

export const WorkoutTab: React.FC = () => {
  const { currentDate, getDayLog, toggleSet, toggleWorkoutDone } = useStore();

  const dayLog = getDayLog(currentDate);

  // Format the selected date label (e.g. "Monday, Nov 16" or "Wednesday, Nov 18")
  const selectedDateFormatted = formatFullDate(currentDate);
  const isViewingToday = currentDate === getTodayDateStr();

  // Derive workout dynamically based on selected date
  const selectedDayIndex = getDayIndexFromDateStr(currentDate);
  const currentWorkout = workoutDays.find((d) => d.dayIndex === selectedDayIndex) || workoutDays[0];
  const selectedDayId = currentWorkout.id;

  // Rest Timer State
  const [timerOpen, setTimerOpen] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60);

  const isWorkoutCompleted = dayLog.workoutDone;
  const completedSetsForDay = dayLog.completedSets[selectedDayId] || [];

  // Calculate total sets for this workout
  const totalTargetSets = currentWorkout.exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const totalCompletedSets = isWorkoutCompleted
    ? Math.max(totalTargetSets, completedSetsForDay.length)
    : completedSetsForDay.length;

  const handleSetToggle = (exerciseIndex: number, setIndex: number, exerciseName: string) => {
    sound.triggerHaptic('medium');
    const isAlreadyDone = completedSetsForDay.some(
      (cs) => cs.exerciseIndex === exerciseIndex && cs.setIndex === setIndex
    );

    toggleSet(currentDate, selectedDayId, exerciseIndex, setIndex);

    if (!isAlreadyDone) {
      sound.playChime();
      toast.success(`${exerciseName} — Set ${setIndex + 1} logged!`, {
        description: 'Take a quick rest and get ready for the next set.',
      });
      // Offer / start rest timer
      setTimerSeconds(60);
      setTimerOpen(true);
    }
  };

  const handleToggleFinishWorkout = () => {
    sound.triggerHaptic('heavy');
    const nextState = !dayLog.workoutDone;
    toggleWorkoutDone(currentDate, selectedDayId);

    if (nextState) {
      sound.playSuccess();
      toast.success(`Workout Completed on ${currentWorkout.day}! 🏆🔥`, {
        description: isViewingToday
          ? 'Great discipline! Tomorrow, a fresh workout form will open automatically.'
          : 'Historical workout record updated.',
      });
    } else {
      toast.info('Workout marked in-progress');
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Dark Green Labels & Dynamic Today Date */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className="text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white shadow-xs"
              style={{ backgroundColor: '#1B4332' }}
            >
              5-Day Plan
            </span>
            <div className={`flex items-center gap-1 text-[11px] font-bold ${isWorkoutCompleted ? 'text-pink-600' : 'text-[#1B4332]'}`}>
              <span>{selectedDateFormatted}</span>
              {isWorkoutCompleted && (
                <span className="text-[9px] font-black px-1.5 py-0.2 rounded-md bg-pink-100 text-pink-700 border border-pink-200">
                  Completed ✓
                </span>
              )}
            </div>
          </div>
          <h2 className="text-lg font-black tracking-tight text-slate-900">Gym & Progressive Overload</h2>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">
            Daily log automatically refreshes for each new day.
          </p>
        </div>

        {/* Manual Timer Toggle Button with Glossy Styling */}
        <button
          onClick={() => {
            sound.triggerHaptic('light');
            setTimerSeconds(60);
            setTimerOpen(!timerOpen);
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer text-white glass-btn-primary"
        >
          <Timer size={14} className="text-[#D4AF37]" />
          <span>Rest Timer</span>
        </button>
      </div>

      {/* Dynamic 7-Day Week Calendar Switcher with exact dates & completion history */}
      <WeekCalendarBar className="my-1" />

      {/* Selected Day Workout Focus Card */}
      <div id="gym-workout-section" className="glass-panel rounded-3xl p-4.5 relative overflow-hidden shadow-xs scroll-mt-20">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white glass-btn-primary mb-1">
              <span>{currentWorkout.day} Routine</span>
            </div>
            <h3 className="text-base font-black tracking-tight flex items-center gap-2 text-slate-900">
              <span>{currentWorkout.muscleGroup}</span>
              {currentWorkout.isRestDay && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                  Active Rest
                </span>
              )}
            </h3>
          </div>

          {!currentWorkout.isRestDay && (
            <div className="text-right">
              <span className="text-xs font-black text-[#1B4332]">
                {totalCompletedSets}/{totalTargetSets} sets
              </span>
              <div className="text-[10px] text-slate-500 font-medium">Logged</div>
            </div>
          )}
        </div>

        {/* If it's a rest day */}
        {currentWorkout.isRestDay ? (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-950 text-xs space-y-2 border border-emerald-200/60">
            <p className="font-bold flex items-center gap-1.5 text-xs text-[#1B4332]">
              <span>🧘</span> Scheduled Active Rest & Stillness
            </p>
            <p className="text-slate-800 leading-relaxed text-[11px] font-medium">
              Muscle growth and central nervous system repair happen while you rest. Take a 30-minute light walk, perform gentle stretches in the Recovery tab, and prioritize food and 8+ hours of sleep.
            </p>
          </div>
        ) : (
          /* Exercise List */
          <div className="space-y-3 mt-3">
            {currentWorkout.exercises.map((exercise, exIdx) => {
              const setsCompleted = isWorkoutCompleted
                ? exercise.sets
                : completedSetsForDay.filter((cs) => cs.exerciseIndex === exIdx).length;
              const isExDone = isWorkoutCompleted || setsCompleted >= exercise.sets;

              return (
                <div
                  key={exIdx}
                  className="rounded-2xl p-3 border transition-all glass-panel-subtle"
                  style={{
                    borderColor: isExDone ? '#2D6A4F' : 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] bg-[#1B4332] text-white">
                        {exIdx + 1}
                      </span>
                      <h4 className="text-xs font-black text-slate-900">{exercise.name}</h4>
                    </div>
                    <div className="text-[11px] font-bold text-[#1B4332]">
                      {exercise.sets} sets × {exercise.reps} reps
                    </div>
                  </div>

                  {/* Set Tracker Pills with Glossy Styling */}
                  <div className="flex items-center gap-2 mt-2">
                    {Array.from({ length: exercise.sets }).map((_, setIdx) => {
                      const isSetDone =
                        isWorkoutCompleted ||
                        completedSetsForDay.some(
                          (cs) => cs.exerciseIndex === exIdx && cs.setIndex === setIdx
                        );

                      return (
                        <button
                          key={setIdx}
                          onClick={() => handleSetToggle(exIdx, setIdx, exercise.name)}
                          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs ${
                            isSetDone ? 'glass-chip-active' : 'glass-chip-inactive'
                          }`}
                        >
                          {isSetDone ? (
                            <CheckCircle2 size={13} className="text-[#D4AF37]" />
                          ) : (
                            <span className="opacity-60 text-[10px]">Set</span>
                          )}
                          <span>{setIdx + 1}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Daily Workout Complete Button */}
            <div className="pt-2">
              <button
                onClick={handleToggleFinishWorkout}
                className={`w-full py-3.5 rounded-2xl font-black text-xs text-white shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer transition-all ${
                  dayLog.workoutDone
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 border border-pink-300 shadow-md'
                    : 'glass-btn-primary'
                }`}
              >
                {dayLog.workoutDone ? (
                  <>
                    <CheckCircle2 size={18} className="text-white" />
                    <span>Workout Completed on {currentWorkout.day}! ✓ (Tap to Undo)</span>
                  </>
                ) : (
                  <>
                    <Trophy size={18} />
                    <span>Mark {currentWorkout.day} Workout Completed</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-slate-500 font-medium mt-1.5">
                {isViewingToday
                  ? "Tomorrow's workout will automatically open with a fresh clean form!"
                  : `Viewing saved workout history for ${selectedDateFormatted}`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Training Notes Card from PDF */}
      <div className="glass-panel rounded-3xl p-4.5 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={16} className="text-[#B8860B]" />
          <h3 className="text-xs font-black uppercase tracking-wider text-[#1B4332]">
            Coach's Training Notes
          </h3>
        </div>
        <ul className="space-y-2 mt-2">
          {trainingNotes.map((note, idx) => (
            <li key={idx} className="text-xs flex items-start gap-2 leading-relaxed font-semibold text-slate-900">
              <span className="text-[#1B4332] font-black mt-0.5">•</span>
              <span className="text-slate-900">{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Rest Timer Modal */}
      <RestTimer
        isOpen={timerOpen}
        initialSeconds={timerSeconds}
        onClose={() => setTimerOpen(false)}
      />
    </div>
  );
};

export default WorkoutTab;
