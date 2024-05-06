export function isLeapYear(year: number): string | Boolean {

    if (isNaN(year) || !Number.isInteger(year)) {
        return "정수형으로 년도를 입력해주십시오";
      }
    
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
        return true;
    else
        return false;
}