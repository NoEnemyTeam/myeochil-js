import timezones from "../country/timezones";
import { checkValidationSolarDate, findValidationDay } from "../date/Date";

export function calTimezone(fromCity: string, toCity: string): number {
    const fromUtc = timezones[fromCity];
    const toUtc = timezones[toCity];

    if (fromUtc !== undefined && toUtc !== undefined) {
        const timezoneDifference = fromUtc - toUtc;
        return timezoneDifference;
    } else {
        throw new Error('Invalid City Name: please check readme');
    }
}


export function convertTimezone(datetime: string, fromTimezone: string, toTimezone: string): string {
    const [rawDate, rawTime] = datetime.split(" ");
    const [year, month, day] = rawDate.split("-");
    
    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");

    if(!checkValidationSolarDate({ year: parseInt(year), month: parseInt(month), day: parseInt(day) })){
        throw Error('Invalid Date: please input valid date');
    }
    
    // 시간대 변환
    const timeOffset = calTimezone(fromTimezone, toTimezone);
    const [hour, minute, second] = rawTime.split(":").map(Number);
    let convertedHour = hour - timeOffset;
    
    if( convertedHour >= 0 && convertedHour <24){
        return `${year}-${formattedMonth}-${formattedDay} ${convertedHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
    }

    //적용된 시차의 시간이 0 미만인 경우,
    if(convertedHour < 0 && parseInt(formattedDay) > 1){
        convertedHour += 24;
        return `${year}-${month}-${parseInt(day) - 1} ${convertedHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
    }
    if(convertedHour < 0 && parseInt(formattedDay) === 1 && parseInt(formattedMonth) > 1){
        convertedHour += 24;
        return `${year}-${month}-${findValidationDay(parseInt(year), parseInt(month))} ${convertedHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
    }

    if(convertedHour < 0 && parseInt(formattedDay) === 1 && parseInt(formattedMonth) ===1){
        convertedHour += 24;
        return `${parseInt(year) - 1}-${12}-${findValidationDay(parseInt(year) - 1, 12)} ${convertedHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
    }

    //적용된 시차의 시간이 24시 초과인 경우
    if(convertedHour > 24 && parseInt(formattedDay) < findValidationDay(parseInt(year), parseInt(month))){
        convertedHour -= 24;
        return `${year}-${month}-${parseInt(day) + 1} ${convertedHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
    }

    if(convertedHour > 24 && parseInt(formattedDay) === findValidationDay(parseInt(year), parseInt(month)) && parseInt(month) < 12){
        convertedHour -= 24;
        return `${year}-${(parseInt(month) + 1).toString().padStart(2,"0")}-${'01'} ${convertedHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
    }

    if(convertedHour > 24 && parseInt(formattedDay) === findValidationDay(parseInt(year), parseInt(month)) && parseInt(month) === 12){
        convertedHour -= 24;
        return `${parseInt(year) + 1}-${'01'}-${'01'} ${convertedHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
    }

    throw Error('invaild Error: contact admin');

}
