import { parseISO, differenceInCalendarDays } from 'date-fns';

export function calDaysBetween(dateStr1: string, dateStr2: string): number {
  const date1 = parseISO(dateStr1);
  const date2 = parseISO(dateStr2);
  
  const days = differenceInCalendarDays(date2, date1);

  return Math.abs(days);
}