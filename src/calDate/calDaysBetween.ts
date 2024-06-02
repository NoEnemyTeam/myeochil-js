import { parseISO, differenceInCalendarDays } from 'date-fns';
import { isValidDate } from '../isValidDate';

export function calDaysBetween(dateStr1: string, dateStr2: string): number {
  if (!isValidDate(dateStr1) || !isValidDate(dateStr2)) {
    throw new Error("Invalid Date: enter a valid date that exists in the calendar");
  }
  const date1 = parseISO(dateStr1);
  const date2 = parseISO(dateStr2);

  const days = differenceInCalendarDays(date2, date1);

  return Math.abs(days);
}