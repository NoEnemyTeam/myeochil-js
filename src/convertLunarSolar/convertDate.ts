import { TargetDate, checkValidationSolarDate } from "../date/Date";
import { lunarMonthTable } from "./lunarTable";

export function toLunar(date: TargetDate | string): TargetDate | undefined {
    
    let convertDate:TargetDate;
    
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
    if(!checkValidationSolarDate(convertDate)){ throw new RangeError('RangeError: please input range Argument')}
    /* 양력/음력 변환 */
    let convertedLunarDate = calculateLunarSolar(convertDate, 1);
    return convertedLunarDate;
    
}

export function toSolar(date: TargetDate | string): TargetDate | undefined{
    
    let convertDate:TargetDate;
    
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

    if(!checkValidationSolarDate(convertDate)){ throw new RangeError('RangeError: please input correct Range of solar date')}
    /* 양력/음력 변환 */
    let convertedSolarDate = calculateLunarSolar(convertDate, 2);
    return convertedSolarDate;
    
}


function calculateLunarSolar(date: TargetDate, type:number): TargetDate | undefined {
    let inputLeapMonth;
    let solYear, solMonth, solDay;
    let lunYear, lunMonth, lunDay;
    let lunLeapMonth, lunMonthDay;
    let  lunIndex;

    const solMonthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    /* range check */
    if (date.year < 1900 || date.year > 2040){ throw new RangeError('RangeError: date is valuable year with 1990 ~ 2040 '); }

    if (date.year >= 2000)
    {
        /* 기준일자 양력 2000년 1월 1일 (음력 1999년 11월 25일) */
        solYear = 2000;
        solMonth = 1;
        solDay = 1;
        lunYear = 1999;
        lunMonth = 11;
        lunDay = 25;
        lunLeapMonth = 0;

        solMonthDay[1] = 29;    /* 2000 년 2월 28일 */
        lunMonthDay = 30;   /* 1999년 11월 */
    }
    else if (date.year >= 1970)
    {
        /* 기준일자 양력 1970년 1월 1일 (음력 1969년 11월 24일) */
        solYear = 1970;
        solMonth = 1;
        solDay = 1;
        lunYear = 1969;
        lunMonth = 11;
        lunDay = 24;
        lunLeapMonth = 0;

        solMonthDay[1] = 28;    /* 1970 년 2월 28일 */
        lunMonthDay = 30;   /* 1969년 11월 */
    }
    else if (date.year >= 1940)
    {
        /* 기준일자 양력 1940년 1월 1일 (음력 1939년 11월 22일) */
        solYear = 1940;
        solMonth = 1;
        solDay = 1;
        lunYear = 1939;
        lunMonth = 11;
        lunDay = 22;
        lunLeapMonth = 0;

        solMonthDay[1] = 29;    /* 1940 년 2월 28일 */
        lunMonthDay = 29;   /* 1939년 11월 */
    }
    else
    {
        /* 기준일자 양력 1900년 1월 1일 (음력 1899년 12월 1일) */
        solYear = 1900;
        solMonth = 1;
        solDay = 1;
        lunYear = 1899;
        lunMonth = 12;
        lunDay = 1;
        lunLeapMonth = 0;

        solMonthDay[1] = 28;    /* 1900 년 2월 28일 */
        lunMonthDay = 30;   /* 1899년 12월 */
    }

    lunIndex = lunYear - 1899;

    while (true)
    {
        if (type === 1 &&
            date.year === solYear &&
            date.month === solMonth &&
            date.day === solDay
        ){
            let convertedlunarDate : TargetDate ={
                year: lunYear,
                month: lunMonth,
                day: lunDay
            } 
            return convertedlunarDate;
        }
        else if (type === 2 &&
            date.year === lunYear &&
            date.month === lunMonth &&
            date.day === lunDay //&&
                // inputLeapMonth === lunLeapMonth
            ){
            let convertedSolarDate : TargetDate ={
                year: solYear,
                month: solMonth,
                day: solDay
            } 
            return convertedSolarDate;
        }

        /* 양력의 마지막 날일 경우 연도를 증가시키고 나머지 초기화 */
        if (solMonth === 12 && solDay === 31)
        {
            solYear++;
            solMonth = 1;
            solDay = 1;

            /* 윤년이면 2월의 총 일수에 하루 증가 */
            if (solYear % 400 == 0) { solMonthDay[1] = 29; }
            else if (solYear % 100 == 0){ solMonthDay[1] = 28; }
            else if (solYear % 4 == 0){ solMonthDay[1] = 29; }
            else{ solMonthDay[1] = 28; }
        }
        // 현재 날짜가 달의 마지막 날짜를 가리키고 있을 시 달을 증가시키고 날짜 1로 초기화
        else if (solMonthDay[solMonth - 1] === solDay)
        {
            solMonth++;
            solDay = 1;
        }
        else 
        solDay++;

        /* 음력의 마지막 날이면 연도를 증가시키고 달과 일수를 초기화 */
        if (lunMonth === 12 &&
            ((lunarMonthTable[lunIndex][lunMonth - 1] === 1 && lunDay === 29) ||
            (lunarMonthTable[lunIndex][lunMonth - 1] === 2 && lunDay === 30)))
        {
            lunYear++;
            lunMonth = 1;
            lunDay = 1;

            if (lunYear > 2043) { throw RangeError("RangeError: Invalid Lunar Year."); }

            // 연도가 바꼈기에 index값 수정
            lunIndex = lunYear - 1899;

            // 음력의 1월에는 1 or 2만 있어서 1과 2만 비교하면 된다.
            if (lunarMonthTable[lunIndex][lunMonth - 1] === 1){ lunMonthDay = 29; }
            else if (lunarMonthTable[lunIndex][lunMonth - 1] === 2){ lunMonthDay = 30; }
        }
        //현재날짜가 이번달의 마지막 날짜와 일치할 경우
        else if (lunDay === lunMonthDay)
        {
            //윤달인데 윤달 계산을 안 했으면 달의 숫자를 증가 하면 안 됨
            if (lunarMonthTable[lunIndex][lunMonth - 1] >= 3 && lunLeapMonth === 0)
            { lunDay = 1; lunLeapMonth = 1; }
            //음월이거나 윤달을 계산 안 했으면 달을 증가시키고 lunLeapMonth 초기화
            else{ lunMonth++; lunDay = 1; lunLeapMonth = 0; }
            //음력의 달에 맞는 마지막날짜 초기화
            if (lunarMonthTable[lunIndex][lunMonth - 1] === 1){ lunMonthDay = 29; }    
            else if (lunarMonthTable[lunIndex][lunMonth - 1] === 2){ lunMonthDay = 30; }                
            else if (lunarMonthTable[lunIndex][lunMonth - 1] === 3){ lunMonthDay = 29; }                
            else if (lunarMonthTable[lunIndex][lunMonth - 1] === 4 && lunLeapMonth === 0){ lunMonthDay = 29; }               
            else if (lunarMonthTable[lunIndex][lunMonth - 1] === 4 && lunLeapMonth === 1){ lunMonthDay = 30; }                
            else if (lunarMonthTable[lunIndex][lunMonth - 1] === 5 && lunLeapMonth === 0){ lunMonthDay = 30; }                
            else if (lunarMonthTable[lunIndex][lunMonth - 1] === 5 && lunLeapMonth === 1){ lunMonthDay = 29; }                    
            else if (lunarMonthTable[lunIndex][lunMonth - 1] === 6){ lunMonthDay = 30; } 
        }
        else
            lunDay++;
    }
}

