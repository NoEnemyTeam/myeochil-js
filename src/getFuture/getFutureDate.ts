export function getFutureDate(year: number, month: number, week: number, weekday: string): string {
    const weekdays = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
    
    const weekdayIndex = weekdays.indexOf(weekday);
    if (weekdayIndex === -1) {
        throw new Error("Invalid weekday: please check weekday");
    }

    const firstDayOfMonth = new Date(year, month - 1, 1);
    const firstWeekdayIndex = firstDayOfMonth.getDay() - 1;
    
    let targetDay;

    if (firstWeekdayIndex >= 0 && firstWeekdayIndex <= 3) {
        if ( week == 1 ) {
            targetDay = weekdayIndex - firstWeekdayIndex + 1 + 1
        } else {
            targetDay = (7 - firstWeekdayIndex) + (week - 2) * 7 + (weekdayIndex + 1) + 1
        }        
    }
    else {
        if ( week == 1) {
            targetDay = (7 - firstWeekdayIndex) + ( weekdayIndex + 1) + 1
        } else {
            targetDay = (7 - firstWeekdayIndex) + (week - 1) * 7 + (weekdayIndex + 1) + 1
        }
    
    }
    const targetDate = new Date(year, month - 1, targetDay);

    const formattedDate = targetDate.toISOString().split('T')[0];
    return formattedDate;
}