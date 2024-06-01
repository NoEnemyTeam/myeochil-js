import { isValidDate } from "../isValidDate";

export function getFutureWeekday(date: string, description?: string): string {
    const dateObj = new Date(date);

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdayStr = weekdays[dateObj.getDay()];

    // 유효하지 않은 날짜 예외처리
    if (!isValidDate(date)) {
        throw new Error("Enter a valid date that exists in the calendar");
    }

    if (description) {
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        
        const firstDayOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).getDay();
        const weekNumber = Math.ceil((dateObj.getDate() + firstDayOfMonth) / 7);
        
        return `${year} year ${month} month ${weekNumber}th week's ${weekdayStr}`;
    }

    return weekdayStr;
}