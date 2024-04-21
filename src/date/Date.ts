export interface TargetDate  {
    year: number,
    month: number,
    day: number
}

export function checkValidationSolarDate(date: TargetDate): boolean{
    //연도가 음수일 때
    if (date.year < 0) {
        return false;
    }

    //해당 월 1~12 사이가 아니였을 때
    if (date.month < 1 || date.month > 12) {
        return false;
    }

    const solMonthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    //윤년이 아니며, 입력 일수가 월 최대일 보다 많을 때
    if(date.year % 4 !== 0  && date.day >solMonthDay[date.month-1]   ){
        return false
    }
    // 윤년이며(2월이 29일), 입력 월이 2월 일 때 
    if(date.year % 4 === 0  && date.month === 2 ){
        if(date.day > 29){ return false; }
    }
    return true;
}
