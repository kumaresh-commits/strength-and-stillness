// Date utilities for 7-Day Indian Routine & Historical Tracking

export interface WeekDayItem {
  dateStr: string; // "YYYY-MM-DD"
  dateNum: number; // 16, 17, 18, etc.
  dayIndex: number; // 0=Sunday, 1=Monday ... 6=Saturday
  dayId: string; // 'monday', 'tuesday', etc.
  dayName: string; // 'Monday', 'Tuesday', etc.
  dayShort: string; // 'Mon', 'Tue', etc.
  formattedMonthDay: string; // "Nov 16"
  fullDateLabel: string; // "Monday, Nov 16"
  isToday: boolean;
  isPast: boolean;
  isFuture: boolean;
}

export const DAY_IDS = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const;

export const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export const DAY_SHORTS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

/**
 * Returns today's date formatted as YYYY-MM-DD in local system time
 */
export const getTodayDateStr = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Safely parse YYYY-MM-DD into a local Date object (midnight local time)
 */
export const parseDateStr = (dateStr: string): Date => {
  if (!dateStr || !dateStr.includes('-')) return new Date();
  const parts = dateStr.split('-').map(Number);
  if (parts.length < 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    return new Date();
  }
  return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0);
};

/**
 * Get day index (0=Sun, 1=Mon, ..., 6=Sat) from a YYYY-MM-DD date string
 */
export const getDayIndexFromDateStr = (dateStr: string): number => {
  return parseDateStr(dateStr).getDay();
};

/**
 * Get day ID ('monday', 'tuesday', etc.) from a YYYY-MM-DD date string
 */
export const getDayIdFromDateStr = (dateStr: string): string => {
  const idx = getDayIndexFromDateStr(dateStr);
  return DAY_IDS[idx];
};

/**
 * Formats a date string into readable "Monday, Nov 16"
 */
export const formatFullDate = (dateStr: string): string => {
  const d = parseDateStr(dateStr);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Formats a date string into short "Nov 16"
 */
export const formatMonthDay = (dateStr: string): string => {
  const d = parseDateStr(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Returns the 7 days of the week (Monday through Sunday) for any reference date.
 * weekOffset: 0 for current week, -1 for last week, +1 for next week.
 */
export const getWeekDates = (referenceDate: Date = new Date(), weekOffset: number = 0): WeekDayItem[] => {
  const d = new Date(referenceDate);
  d.setDate(d.getDate() + weekOffset * 7);

  // Find Monday of that week:
  // JS getDay(): Sunday=0, Monday=1, ..., Saturday=6
  const day = d.getDay();
  const diffToMonday = (day + 6) % 7; // Monday = 0, Sunday = 6

  const monday = new Date(d);
  monday.setDate(d.getDate() - diffToMonday);
  monday.setHours(12, 0, 0, 0);

  const todayStr = getTodayDateStr();
  const weekDays: WeekDayItem[] = [];

  const dayIdMap: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayNameMap: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayShortMap: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  for (let i = 0; i < 7; i++) {
    const cur = new Date(monday);
    cur.setDate(monday.getDate() + i);

    const year = cur.getFullYear();
    const month = String(cur.getMonth() + 1).padStart(2, '0');
    const dt = String(cur.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${dt}`;

    weekDays.push({
      dateStr,
      dateNum: cur.getDate(),
      dayIndex: cur.getDay(), // 0=Sunday..6=Saturday
      dayId: dayIdMap[i],
      dayName: dayNameMap[i],
      dayShort: dayShortMap[i],
      formattedMonthDay: cur.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDateLabel: cur.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
      isToday: dateStr === todayStr,
      isPast: dateStr < todayStr,
      isFuture: dateStr > todayStr,
    });
  }

  return weekDays;
};
