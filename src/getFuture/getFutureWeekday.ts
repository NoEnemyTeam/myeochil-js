export function getFutureWeekday(date: string, description?: string): string {
    const dateObj = new Date(date);

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdayStr = weekdays[dateObj.getDay()];

    // 제대로 된 날짜 아닌 경우 예외처리 하기
    // isValidDate 사용

    if (description) {
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        
        const firstDayOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1).getDay();
        const weekNumber = Math.ceil((dateObj.getDate() + firstDayOfMonth) / 7);
        
        return `${year} year ${month} month ${weekNumber}th week's ${weekdayStr}`;
    }

    return weekdayStr;
}