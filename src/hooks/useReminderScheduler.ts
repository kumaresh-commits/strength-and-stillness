import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { sound } from '../lib/sound';
import { toast } from 'sonner';

export function useReminderScheduler() {
  const { reminders, notificationSettings } = useStore();
  const firedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Check every 20 seconds
    const interval = setInterval(() => {
      if (notificationSettings.masterMute) return;

      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;
      const currentDayOfWeek = now.getDay(); // 0 = Sun .. 6 = Sat
      const todayDateStr = now.toISOString().split('T')[0];

      // Check quiet hours if enabled
      if (notificationSettings.quietHoursEnabled) {
        const start = notificationSettings.quietHoursStart; // e.g. "22:30"
        const end = notificationSettings.quietHoursEnd; // e.g. "06:30"
        if (start > end) {
          // Overnight quiet hours (e.g. 22:30 to 06:30)
          if (currentTimeStr >= start || currentTimeStr < end) {
            return;
          }
        } else {
          if (currentTimeStr >= start && currentTimeStr < end) {
            return;
          }
        }
      }

      reminders.forEach((reminder) => {
        if (!reminder.enabled) return;

        // Check if today is an active day for this reminder
        if (!reminder.daysOfWeek.includes(currentDayOfWeek)) return;

        const reminderKey = `${todayDateStr}_${reminder.id}_${reminder.time}`;

        if (reminder.time === currentTimeStr && !firedRef.current.has(reminderKey)) {
          firedRef.current.add(reminderKey);

          // Play sound
          if (reminder.sound === 'energy') {
            sound.playEnergy();
          } else if (reminder.sound === 'bell') {
            sound.playBell();
          } else {
            sound.playChime();
          }

          // Haptic
          sound.triggerHaptic('heavy');

          // In-App Toast Alert
          if (notificationSettings.toastsEnabled) {
            toast.info(`⏰ Reminder: ${reminder.label}`, {
              description: reminder.message,
              duration: 8000,
            });
          }

          // Device / System Notification
          if (
            typeof window !== 'undefined' &&
            'Notification' in window &&
            Notification.permission === 'granted' &&
            notificationSettings.pushEnabled
          ) {
            try {
              new Notification(`Strength & Stillness: ${reminder.label}`, {
                body: reminder.message,
                icon: '/icon-192.png',
                badge: '/icon-192.png',
              });
            } catch (e) {
              // Ignore push errors on some webviews
            }
          }
        }
      });
    }, 20000);

    return () => clearInterval(interval);
  }, [reminders, notificationSettings]);
}
