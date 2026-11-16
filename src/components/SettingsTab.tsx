import React, { useState } from 'react';
import { useStore, type Reminder } from '../store/useStore';
import { themes } from '../lib/themes';
import { sound } from '../lib/sound';
import { toast } from 'sonner';
import {
  Bell,
  Clock,
  Target,
  Palette,
  Volume2,
  Sparkles,
  Check,
  Play,
  Flame,
  Trash2,
} from 'lucide-react';

export const SettingsTab: React.FC = () => {
  const {
    theme,
    setTheme,
    reminders,
    updateReminder,
    addReminder,
    removeReminder,
    dailyGoals,
    setDailyGoals,
    notificationSettings,
    setNotificationSettings,
  } = useStore();

  const t = themes[theme];
  const [activeSection, setActiveSection] = useState<'reminders' | 'goals' | 'notifications' | 'theme'>('reminders');
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newTime, setNewTime] = useState('08:00');
  const [newMessage, setNewMessage] = useState('');

  // Push notification permission state
  const [pushStatus, setPushStatus] = useState<NotificationPermission>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });

  const requestPushPermission = async () => {
    sound.triggerHaptic('medium');
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const result = await Notification.requestPermission();
        setPushStatus(result);
        if (result === 'granted') {
          sound.playSuccess();
          toast.success('Push Notifications Enabled! 🔔', {
            description: 'You will receive reminders on your iPhone.',
          });
          new Notification('Strength & Stillness', {
            body: 'Reminders and motivation are now active on your device! 🌅',
            icon: '/icon-192.png',
          });
        } else {
          toast.error('Permission not granted', {
            description: 'You can enable it later from iOS Safari Settings.',
          });
        }
      } catch (err) {
        toast.info('Notification request handled');
      }
    } else {
      toast.info('Notifications active in-app', {
        description: 'Web Push is ready when added to iPhone Home Screen.',
      });
    }
  };

  const testReminder = (r: Reminder) => {
    sound.triggerHaptic('medium');
    sound.playChime();
    toast.info(`⏰ Reminder: ${r.label} (${r.time})`, {
      description: r.message,
    });
    if (pushStatus === 'granted') {
      try {
        new Notification(`Strength & Stillness: ${r.label}`, {
          body: `${r.time} — ${r.message}`,
          icon: '/icon-192.png',
        });
      } catch (e) {
        // Fallback to in-app toast
      }
    }
  };

  const formatDisplayTime = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return timeStr;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 || 12;
    return `${displayH}:${String(m).padStart(2, '0')} ${period}`;
  };

  const applyGoalPreset = (preset: 'bulk' | 'maintenance' | 'recovery') => {
    sound.triggerHaptic('medium');
    if (preset === 'bulk') {
      setDailyGoals({ calories: 2800, protein: 140, meals: 5, waterGlasses: 9, sleepHours: 8, steps: 6000 });
      toast.success('Applied "Lean Bulk" Preset! 🥩', { description: '2,800 kcal, 140g protein, 5 meals' });
    } else if (preset === 'maintenance') {
      setDailyGoals({ calories: 2400, protein: 120, meals: 4, waterGlasses: 8, sleepHours: 8, steps: 8000 });
      toast.success('Applied "Maintenance" Preset! ⚖️', { description: '2,400 kcal, 120g protein, 4 meals' });
    } else {
      setDailyGoals({ calories: 2500, protein: 110, meals: 5, waterGlasses: 8, sleepHours: 9, steps: 5000 });
      toast.success('Applied "Recovery Day" Preset! 🧘', { description: '2,500 kcal, 9h sleep, light steps' });
    }
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div>
        <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
          <span>Settings & Reminders</span>
          <span
            className="text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white shadow-xs"
            style={{ backgroundColor: '#1B4332' }}
          >
            Custom
          </span>
        </h2>
        <p className="text-xs opacity-80 mt-0.5 font-medium">
          Configure activity timings, daily calorie/protein targets, and theme colors.
        </p>
      </div>

      {/* Segmented Section Switcher with Glass Active Pill */}
      <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl glass-panel-subtle">
        <button
          onClick={() => {
            sound.triggerHaptic('light');
            setActiveSection('reminders');
          }}
          className={`py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
            activeSection === 'reminders'
              ? 'glass-btn-primary text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 opacity-80'
          }`}
        >
          <Clock size={15} />
          <span className="text-[10px]">Reminders</span>
        </button>

        <button
          onClick={() => {
            sound.triggerHaptic('light');
            setActiveSection('goals');
          }}
          className={`py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
            activeSection === 'goals'
              ? 'glass-btn-primary text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 opacity-80'
          }`}
        >
          <Target size={15} />
          <span className="text-[10px]">Goals</span>
        </button>

        <button
          onClick={() => {
            sound.triggerHaptic('light');
            setActiveSection('notifications');
          }}
          className={`py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
            activeSection === 'notifications'
              ? 'glass-btn-primary text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 opacity-80'
          }`}
        >
          <Bell size={15} />
          <span className="text-[10px]">Alerts</span>
        </button>

        <button
          onClick={() => {
            sound.triggerHaptic('light');
            setActiveSection('theme');
          }}
          className={`py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
            activeSection === 'theme'
              ? 'glass-btn-primary text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 opacity-80'
          }`}
        >
          <Palette size={15} />
          <span className="text-[10px]">Themes</span>
        </button>
      </div>

      {/* SECTION 1: REMINDER SETUP */}
      {activeSection === 'reminders' && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#1B4332] dark:text-[#74C69D]">
              Routine Reminders ({reminders.filter((r) => r.enabled).length}/{reminders.length})
            </span>
            <button
              onClick={() => {
                sound.triggerHaptic('light');
                setShowAddReminderModal(true);
              }}
              className="text-xs font-black px-3 py-1 rounded-xl text-white shadow-xs flex items-center gap-1 active:scale-95 cursor-pointer"
              style={{ backgroundColor: '#1B4332' }}
            >
              + Add Reminder
            </button>
          </div>

          <div className="space-y-2.5">
            {reminders.map((r) => (
              <div
                key={r.id}
                className={`glass-panel rounded-3xl p-3.5 transition-all shadow-xs ${
                  r.enabled ? 'ring-1 ring-[#1B4332]/40' : 'opacity-70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Time Input Badge - Solid Dark Green Glass with High Contrast White Numbers */}
                    <div className="relative">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-btn-primary text-white font-black text-xs shadow-xs min-w-[90px] justify-center">
                        <Clock size={12} className="text-[#D4AF37]" />
                        <span>{formatDisplayTime(r.time)}</span>
                      </div>
                      {/* Hidden native time input layered cleanly on top for tap to change */}
                      <input
                        type="time"
                        value={r.time}
                        onChange={(e) => updateReminder(r.id, { time: e.target.value })}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                        title="Tap to change timing"
                      />
                    </div>

                    <div>
                      <h4 className="text-xs font-black tracking-tight text-slate-800 dark:text-white">{r.label}</h4>
                      <p className="text-[11px] text-slate-500 font-medium truncate max-w-[150px]">
                        {r.message}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => testReminder(r)}
                      className="p-1.5 rounded-xl glass-btn-secondary text-[10px] font-bold cursor-pointer text-[#1B4332] dark:text-[#74C69D]"
                      title="Test this reminder alert"
                    >
                      <Play size={12} />
                    </button>

                    {r.id.startsWith('custom_') && (
                      <button
                        onClick={() => {
                          sound.triggerHaptic('medium');
                          removeReminder(r.id);
                          toast.info(`Removed "${r.label}"`);
                        }}
                        className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 cursor-pointer"
                        title="Delete custom reminder"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}

                    <button
                      onClick={() => {
                        sound.triggerHaptic('light');
                        updateReminder(r.id, { enabled: !r.enabled });
                      }}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        r.enabled ? 'glass-btn-primary' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform shadow-xs ${
                          r.enabled ? 'left-6' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Custom Reminder Modal */}
          {showAddReminderModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
              <div
                className="w-full max-w-sm rounded-3xl p-5 shadow-2xl border"
                style={{ backgroundColor: t.card, borderColor: '#1B4332' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-black flex items-center gap-1.5">
                    <Clock size={16} className="text-[#1B4332]" /> Add Custom Reminder
                  </h3>
                  <button
                    onClick={() => setShowAddReminderModal(false)}
                    className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold opacity-80 block mb-1">Reminder Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Creatine / Evening Walk"
                      value={newLabel}
                      onChange={(e) => setNewLabel(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold outline-none border border-transparent focus:border-[#1B4332]"
                      style={{ color: t.text }}
                    />
                  </div>

                  <div>
                    <label className="font-bold opacity-80 block mb-1">Time (24h or AM/PM)</label>
                    <input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#1B4332] text-white font-black text-sm outline-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="font-bold opacity-80 block mb-1">Alert Message</label>
                    <input
                      type="text"
                      placeholder="e.g. Take creatine with water & electrolytes"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 font-medium outline-none"
                      style={{ color: t.text }}
                    />
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => setShowAddReminderModal(false)}
                      className="flex-1 py-2.5 rounded-xl font-bold bg-gray-100 dark:bg-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (!newLabel.trim()) {
                          toast.error('Please enter a reminder name');
                          return;
                        }
                        sound.triggerHaptic('medium');
                        addReminder({
                          id: `custom_${Date.now()}`,
                          label: newLabel.trim(),
                          time: newTime,
                          enabled: true,
                          daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                          sound: 'chime',
                          message: newMessage.trim() || `Time for ${newLabel.trim()}!`,
                        });
                        toast.success(`Reminder "${newLabel}" saved! ⏰`);
                        setNewLabel('');
                        setNewMessage('');
                        setShowAddReminderModal(false);
                      }}
                      className="flex-1 py-2.5 rounded-xl font-black text-xs text-white shadow-xs"
                      style={{ backgroundColor: '#1B4332' }}
                    >
                      Save Reminder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* iOS Tip Card */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 text-xs border border-emerald-200/50">
            💡 <strong>Custom Timings Tip:</strong> Tap on any dark-green time pill (e.g. <code>07:15 AM</code>) to change the timing to your exact schedule.
          </div>
        </div>
      )}

      {/* SECTION 2: DAILY GOALS SETUP */}
      {activeSection === 'goals' && (
        <div className="space-y-4 animate-fade-in">
          {/* Quick Presets */}
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#1B4332] dark:text-[#74C69D] block mb-2">
              Goal Presets
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => applyGoalPreset('bulk')}
                className="p-3 rounded-2xl border text-center active:scale-95 cursor-pointer transition-all shadow-xs"
                style={{ backgroundColor: t.card, borderColor: '#1B4332' }}
              >
                <span className="text-lg">🥩</span>
                <div className="text-xs font-black mt-1">Lean Bulk</div>
                <span className="text-[10px] font-semibold opacity-70">2,800 kcal</span>
              </button>

              <button
                onClick={() => applyGoalPreset('maintenance')}
                className="p-3 rounded-2xl border text-center active:scale-95 cursor-pointer transition-all shadow-xs"
                style={{ backgroundColor: t.card, borderColor: t.border }}
              >
                <span className="text-lg">⚖️</span>
                <div className="text-xs font-black mt-1">Maintain</div>
                <span className="text-[10px] font-semibold opacity-70">2,400 kcal</span>
              </button>

              <button
                onClick={() => applyGoalPreset('recovery')}
                className="p-3 rounded-2xl border text-center active:scale-95 cursor-pointer transition-all shadow-xs"
                style={{ backgroundColor: t.card, borderColor: t.border }}
              >
                <span className="text-lg">🧘</span>
                <div className="text-xs font-black mt-1">Recovery</div>
                <span className="text-[10px] font-semibold opacity-70">Deep Rest</span>
              </button>
            </div>
          </div>

          {/* Sliders for Goals */}
          <div
            className="rounded-3xl p-4 border space-y-4 shadow-xs"
            style={{
              backgroundColor: t.card,
              borderColor: t.border,
            }}
          >
            {/* Calorie Target */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="flex items-center gap-1.5 font-black">
                  <Flame size={14} className="text-[#1B4332]" /> Daily Calories
                </span>
                <span className="font-extrabold text-[#1B4332] dark:text-[#74C69D]">{dailyGoals.calories} kcal</span>
              </div>
              <input
                type="range"
                min="1800"
                max="3600"
                step="50"
                value={dailyGoals.calories}
                onChange={(e) => setDailyGoals({ calories: Number(e.target.value) })}
                className="w-full accent-[#1B4332] cursor-pointer"
              />
            </div>

            {/* Protein Target */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="flex items-center gap-1.5 font-black">
                  <Sparkles size={14} className="text-[#B8860B]" /> Protein Target
                </span>
                <span className="font-extrabold text-[#B8860B] dark:text-[#D4AF37]">{dailyGoals.protein}g</span>
              </div>
              <input
                type="range"
                min="70"
                max="220"
                step="5"
                value={dailyGoals.protein}
                onChange={(e) => setDailyGoals({ protein: Number(e.target.value) })}
                className="w-full accent-[#B8860B] cursor-pointer"
              />
            </div>

            {/* Water Target */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="font-black">💧 Water Intake</span>
                <span className="font-extrabold text-[#2D6A4F]">{dailyGoals.waterGlasses} glasses</span>
              </div>
              <input
                type="range"
                min="4"
                max="14"
                step="1"
                value={dailyGoals.waterGlasses}
                onChange={(e) => setDailyGoals({ waterGlasses: Number(e.target.value) })}
                className="w-full accent-[#2D6A4F] cursor-pointer"
              />
            </div>

            {/* Sleep Target */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="font-black">😴 Sleep Duration</span>
                <span className="font-extrabold text-[#1B4332]">{dailyGoals.sleepHours} hours</span>
              </div>
              <input
                type="range"
                min="6"
                max="10"
                step="0.5"
                value={dailyGoals.sleepHours}
                onChange={(e) => setDailyGoals({ sleepHours: Number(e.target.value) })}
                className="w-full accent-[#1B4332] cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: NOTIFICATION SETUP */}
      {activeSection === 'notifications' && (
        <div className="space-y-3 animate-fade-in">
          {/* Push Permission Card */}
          <div
            className="rounded-2xl p-4 border shadow-xs"
            style={{
              backgroundColor: t.card,
              borderColor: t.border,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-[#1B4332]" />
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider">Device Push Alerts</h3>
                  <span className="text-[10px] opacity-75 font-semibold">
                    Status: {pushStatus === 'granted' ? '✅ Enabled' : pushStatus === 'denied' ? '🚫 Blocked' : '⏳ Action Needed'}
                  </span>
                </div>
              </div>

              {pushStatus !== 'granted' && (
                <button
                  onClick={requestPushPermission}
                  className="px-3 py-1.5 rounded-xl font-black text-xs text-white shadow-xs active:scale-95 cursor-pointer"
                  style={{ backgroundColor: '#1B4332' }}
                >
                  Enable Push
                </button>
              )}
            </div>
          </div>

          {/* Toggles */}
          <div
            className="rounded-3xl p-4 border space-y-3.5 shadow-xs"
            style={{
              backgroundColor: t.card,
              borderColor: t.border,
            }}
          >
            {/* In-app toasts */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold">In-App Motivational Toasts</h4>
                <p className="text-[10px] opacity-70">Celebration popups for completed meals and sets</p>
              </div>
              <button
                onClick={() => {
                  sound.triggerHaptic('light');
                  setNotificationSettings({ toastsEnabled: !notificationSettings.toastsEnabled });
                }}
                className="w-10 h-6 rounded-full transition-colors relative cursor-pointer"
                style={{
                  backgroundColor: notificationSettings.toastsEnabled ? '#1B4332' : '#D1D5DB',
                }}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    notificationSettings.toastsEnabled ? 'left-5' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Streak Risk Warnings */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold">Streak Safeguard Alerts</h4>
                <p className="text-[10px] opacity-70">Alert at 2 PM if zero meals are logged</p>
              </div>
              <button
                onClick={() => {
                  sound.triggerHaptic('light');
                  setNotificationSettings({ streakWarnings: !notificationSettings.streakWarnings });
                }}
                className="w-10 h-6 rounded-full transition-colors relative cursor-pointer"
                style={{
                  backgroundColor: notificationSettings.streakWarnings ? '#1B4332' : '#D1D5DB',
                }}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    notificationSettings.streakWarnings ? 'left-5' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Quiet Hours */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold">Quiet Hours (Sleep Wind-Down)</h4>
                <p className="text-[10px] opacity-70">Silence non-urgent alerts from 10:30 PM</p>
              </div>
              <button
                onClick={() => {
                  sound.triggerHaptic('light');
                  setNotificationSettings({ quietHoursEnabled: !notificationSettings.quietHoursEnabled });
                }}
                className="w-10 h-6 rounded-full transition-colors relative cursor-pointer"
                style={{
                  backgroundColor: notificationSettings.quietHoursEnabled ? '#1B4332' : '#D1D5DB',
                }}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    notificationSettings.quietHoursEnabled ? 'left-5' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Sound Volume */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="flex items-center gap-1.5 font-bold">
                  <Volume2 size={14} /> Chime & Timer Volume
                </span>
                <span>{notificationSettings.soundVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={notificationSettings.soundVolume}
                onChange={(e) => setNotificationSettings({ soundVolume: Number(e.target.value) })}
                className="w-full accent-[#1B4332] cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: THEME SELECTOR */}
      {activeSection === 'theme' && (
        <div className="space-y-3 animate-fade-in">
          <span className="text-xs font-black uppercase tracking-wider text-[#1B4332] dark:text-[#74C69D] block">
            Choose Your Color Palette
          </span>

          <div className="space-y-3">
            {/* Theme 1: Forest & Sage (Dark Green Elegance) */}
            <div
              onClick={() => {
                sound.triggerHaptic('medium');
                sound.playChime();
                setTheme('dawn');
              }}
              className={`p-4 rounded-3xl border transition-all cursor-pointer relative shadow-xs ${
                theme === 'dawn' ? 'ring-2' : ''
              }`}
              style={{
                backgroundColor: '#F6F8F6',
                color: '#14281D',
                borderColor: theme === 'dawn' ? '#1B4332' : '#E2E8E4',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌲</span>
                  <div>
                    <h4 className="text-xs font-black">Forest & Sage (Default Elegance)</h4>
                    <span className="text-[10px] opacity-75">Dark green, sage, warm antique gold, oyster cream</span>
                  </div>
                </div>
                {theme === 'dawn' && <Check size={18} style={{ color: '#1B4332' }} />}
              </div>
              <div className="flex gap-2 mt-2">
                <span className="w-6 h-6 rounded-full bg-[#1B4332]" title="Dark Forest Green" />
                <span className="w-6 h-6 rounded-full bg-[#40916C]" title="Sage Leaf" />
                <span className="w-6 h-6 rounded-full bg-[#B8860B]" title="Antique Gold" />
                <span className="w-6 h-6 rounded-full bg-[#F6F8F6] border" title="Soft Oyster" />
              </div>
            </div>

            {/* Theme 2: Midnight Pine (Refined Dark) */}
            <div
              onClick={() => {
                sound.triggerHaptic('medium');
                sound.playEnergy();
                setTheme('cyber');
              }}
              className={`p-4 rounded-3xl border transition-all cursor-pointer relative shadow-xs ${
                theme === 'cyber' ? 'ring-2' : ''
              }`}
              style={{
                backgroundColor: '#0D1E16',
                color: '#F0FDF4',
                borderColor: theme === 'cyber' ? '#40916C' : '#234435',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌙</span>
                  <div>
                    <h4 className="text-xs font-black">Midnight Pine (Refined Dark)</h4>
                    <span className="text-[10px] opacity-75">Deep midnight evergreen, muted sage, champagne gold</span>
                  </div>
                </div>
                {theme === 'cyber' && <Check size={18} style={{ color: '#40916C' }} />}
              </div>
              <div className="flex gap-2 mt-2">
                <span className="w-6 h-6 rounded-full bg-[#0D1E16] border border-emerald-900" title="Midnight Pine" />
                <span className="w-6 h-6 rounded-full bg-[#1B4332]" title="Forest Base" />
                <span className="w-6 h-6 rounded-full bg-[#52B788]" title="Luminous Sage" />
                <span className="w-6 h-6 rounded-full bg-[#D4AF37]" title="Muted Gold" />
              </div>
            </div>

            {/* Theme 3: Ayurvedic Sandalwood */}
            <div
              onClick={() => {
                sound.triggerHaptic('medium');
                sound.playBell();
                setTheme('ayurvedic');
              }}
              className={`p-4 rounded-3xl border transition-all cursor-pointer relative shadow-xs ${
                theme === 'ayurvedic' ? 'ring-2' : ''
              }`}
              style={{
                backgroundColor: '#FAF8F3',
                color: '#1C1F1D',
                borderColor: theme === 'ayurvedic' ? '#244233' : '#ECE6DC',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🪷</span>
                  <div>
                    <h4 className="text-xs font-black">Ayurvedic Sandalwood</h4>
                    <span className="text-[10px] opacity-75">Herbal deep pine, warm sandalwood, turmeric gold</span>
                  </div>
                </div>
                {theme === 'ayurvedic' && <Check size={18} style={{ color: '#244233' }} />}
              </div>
              <div className="flex gap-2 mt-2">
                <span className="w-6 h-6 rounded-full bg-[#244233]" title="Herbal Pine" />
                <span className="w-6 h-6 rounded-full bg-[#8C6239]" title="Sandalwood" />
                <span className="w-6 h-6 rounded-full bg-[#C59B27]" title="Turmeric Ochre" />
                <span className="w-6 h-6 rounded-full bg-[#FAF8F3] border" title="Warm Linen" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsTab;
