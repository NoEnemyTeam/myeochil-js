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

    if(date.year % 4 === 0  && date.month === 2 ){
        if(date.day > 29){ return false; }
    } 
    else if(date.day >solMonthDay[date.month-1]){
        return false;
    }
    return true;
}

export function findValidationDay(year: number, month: number): number{
    if(year <=0){
        throw Error('Invalid Year: please input number range at least zero');
    }
    if(month > 12){
        throw Error('Invalid Month. please input number range of 1~12');
    }
    const solMonthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(year % 4 === 0  && month === 2 ){
        return 29;
    }
    return solMonthDay[month-1];   
}





export function changeDateType(date: string | TargetDate): TargetDate{
    let convertDate: TargetDate;

    if(typeof date === 'string'){
        const [yearStr, monthStr, dayStr] = date.split('-');
        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10);
        const day = parseInt(dayStr, 10);
        convertDate = {
            year: year,
            month: month,
            day: day
        }
    }
    else{
        convertDate = date;
    }
    checkValidationSolarDate(convertDate);
    return convertDate;
}
