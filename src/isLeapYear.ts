export function isLeapYear(year: number): string | Boolean {

    if (isNaN(year) || !Number.isInteger(year)) {
        throw Error("Type Error: enter the year as an integer.");
    }
    
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
        return true;
    else
        return false;
}
