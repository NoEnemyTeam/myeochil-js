import { TargetDate, changeDateType } from "../date/Date";
import { HolidayInfo, countryHoliday, getSpecificDate } from "./config/hol";
import { toLunar, toSolar } from "../convertLunarSolar/convertDate";

export function isHoliday(
    country: string,
    date: TargetDate | string,
    description?: boolean
): boolean | string | undefined {

    const validCountries = ['korea', 'china', 'us', 'japan', 'us-califonia','us-newyork','us-massachusetts', 'us-kansas']
    if (!validCountries.includes(country)) {
        throw new Error('Invalid Country Error: check reademe');
    }

    let targetDate: TargetDate = typeof date === 'string' ? changeDateType(date) : date;
    let formattedDate = `${String(targetDate.month).padStart(2, '0')}${String(targetDate.day).padStart(2, '0')}`;

    // Check for both solar and lunar holidays
    const countriesToCheck = [country];
    if (country === 'korea') {
        countriesToCheck.push('korea-lunar');
    } 
    if (country === 'china') {
        countriesToCheck.push('china-lunar');
    }

    // Convert lunar date to solar date if necessary
    for (const countryToCheck of countriesToCheck) {
        if (countryToCheck.includes('lunar')) {
            const lunarDateString = `${targetDate.year}-${String(targetDate.month).padStart(2, '0')}-${String(targetDate.day).padStart(2, '0')}`;
            const solarDate = toLunar(lunarDateString);
            if (typeof solarDate === 'undefined') {
                throw new Error('Invalid Type Error.');
            }
            targetDate = changeDateType(solarDate);
            formattedDate = `${String(targetDate.month).padStart(2, '0')}${String(targetDate.day).padStart(2, '0')}`;
        }

        // Check for holidays
        if (countryHoliday[countryToCheck]) {
            for (const [holidayName, holidayDate] of Object.entries(countryHoliday[countryToCheck])) {
                if (holidayDate.length === 4) {
                    // Standard holiday date
                    if (formattedDate === holidayDate) {
                        return description ? holidayName : true;
                    }
                } else if (holidayDate.includes('W')) {
                    // Special weekday-based holiday (e.g., US days holiday)
                    const [month, weekDay] = holidayDate.split('W');
                    const [week, day] = weekDay.split('D');
                    const specificDate = getSpecificDate(targetDate.year, parseInt(month), parseInt(week), parseInt(day));
                    if (specificDate === `${targetDate.year}-${String(targetDate.month).padStart(2, '0')}-${String(targetDate.day).padStart(2, '0')}`) {
                        return description ? holidayName : true;
                    }
                }
            }
        }
    }

    return false;
}



export function getHolidays(
    country: string,
    year?: number,
    month?: number
): HolidayInfo[] | string[] | undefined {

    const validCountries = Object.keys(countryHoliday);

    if (!validCountries.includes(country)) {
        throw new Error('Invalid Country Error.');
    }

    if(year &&( year >2040 || year <1900)){
        throw Error('Invalid Year Error. please input year range of 1900~2040')
    }

    if(month &&( month >12 || month <1)){
        throw new Error('Invalid Month Error. please input month range of 1~12')
    }

    const holidays = countryHoliday[country];
    const lunarHolidays = countryHoliday[`${country}-lunar`];
    if (!holidays && !lunarHolidays) {
        throw new Error('NotFoundError: no holidays found for the specified country.');
    }

    const result: HolidayInfo[] = [];

    const processHolidays = (holidays: Record<string, string>, isLunar: boolean = false) => {
        for (const [holidayName, holidayDate] of Object.entries(holidays)) {
            let holidayYear = year || new Date().getFullYear();
            let holidayMonth: number;
            let holidayDay: number;
            let holidayWeekday: string;

            if (isLunar) {
                const solarDate = toSolar(`${holidayYear}-${holidayDate.slice(0, 2)}-${holidayDate.slice(2, 4)}`);
                if (!solarDate) {
                    continue;
                }
                holidayYear = solarDate.year;
                holidayMonth = solarDate.month;
                holidayDay = solarDate.day;
                holidayWeekday = new Date(holidayYear, holidayMonth - 1, holidayDay).toLocaleString('en-US', { weekday: 'long' });
            } else if (holidayDate.includes('W')) {
                const [month, weekDay] = holidayDate.split('W');
                const [week, day] = weekDay.split('D');
                const specificDate = getSpecificDate(holidayYear, parseInt(month), parseInt(week), parseInt(day));
                holidayMonth = parseInt(specificDate.split('-')[1]);
                holidayDay = parseInt(specificDate.split('-')[2]);
                holidayWeekday = new Date(specificDate).toLocaleString('en-US', { weekday: 'long' });
            } else {
                holidayMonth = parseInt(holidayDate.slice(0, 2), 10);
                holidayDay = parseInt(holidayDate.slice(2, 4), 10);
                holidayWeekday = new Date(holidayYear, holidayMonth - 1, holidayDay).toLocaleString('en-US', { weekday: 'long' });
            }

            const holidayInfo: HolidayInfo = {
                date: `${holidayYear}-${String(holidayMonth).padStart(2, '0')}-${String(holidayDay).padStart(2, '0')}`,
                weekday: holidayWeekday,
                name: holidayName
            };

            if (year && month) {
                if (holidayMonth === month) {
                    result.push(holidayInfo);
                }
            } else if (year) {
                result.push(holidayInfo);
            } else if (month) {
                if (holidayMonth === month) {
                    result.push({
                        date: `${String(holidayMonth).padStart(2, '0')}-${String(holidayDay).padStart(2, '0')}`,
                        weekday: holidayWeekday,
                        name: holidayName
                    });
                }
            } else {
                return Object.keys(holidays);
            }
        }
    };

    if (holidays) {
        processHolidays(holidays);
    }

    if (lunarHolidays) {
        processHolidays(lunarHolidays, true);
    }

    return result;
}