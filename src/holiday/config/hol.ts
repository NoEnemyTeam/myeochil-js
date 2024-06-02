const koreaHoliday : Record<string, string> = {
    '신정': '0101',
    '삼일절' : '0301',
    '어린이날': '0505 ',
    '현충일': '0606',
    '광복절': '0815',
    '개천절': '1003',
    '한글날': '1009',
    '성탄절': '1225'
}

const koreaLunarHoliday : Record<string, string> = {
    '구정': '0101',
    '부처님오신날': '0408',
    '추석': '0815',
}

const chinaHoliday : Record<string, string> = {
    '원단': '0101',
    '청명': '0404',
    '노동절': '0501',
    '궈칭제': '1001'
}

const chinaLunarHoliday : Record<string, string> = {
    '춘절': '0101',
    '단오절': '0505',
    '중추절': '0815',
}

const japanHoliday : Record<string, string> = {
    '설날': '0101',
    '건국기념의날': '0211',
    '천황탄생일': '0223',
    '춘분': '0320',
    '쇼와의날': '0429',
    '헌법기념일': '0503',
    '녹색의날': '0504',
    '어린이날': '0505',
    '산의날': '0811',
    '문화의날': '1103',
    '근로감사의날': '1123',
}

const usHoliday : Record<string, string> = {
    'newYearDay': '0101',
    'juneteenth': '0619',
    'independenceDay': '0704',
    'veteransDay': '1111',
    'christmas': '1225',
    'Martin Luther King Jr. Day': '01W3D1',
    'presidentDay' : ' 02W3D1',
    '노동절' : '09W1D1',
    'columbusDay' : '10W2D1',
    'thanksgivingDay' : '11W4D4' 
}

const usCalifoniaHoliday : Record<string, string> = {
    'CesarChavesDay': '0331',
    'newYearDay': '0101',
    'juneteenth': '0619',
    'independenceDay': '0704',
    'veteransDay': '1111',
    'christmas': '1225',
    'Martin Luther King Jr. Day': '01W3D1',
    'presidentDay' : ' 02W3D1',
    '노동절' : '09W1D1',
    'columbusDay' : '10W2D1',
    'thanksgivingDay' : '11W4D4' 
}

const usNewYorkHoliday : Record<string, string> = {
    'LincolnBirthday': '0212',
    'newYearDay': '0101',
    'juneteenth': '0619',
    'independenceDay': '0704',
    'veteransDay': '1111',
    'christmas': '1225',
    'Martin Luther King Jr. Day': '01W3D1',
    'presidentDay' : ' 02W3D1',
    '노동절' : '09W1D1',
    'columbusDay' : '10W2D1',
    'thanksgivingDay' : '11W4D4' 
}

const usMassachusettsHoliday : Record<string, string> = {
    'PatriotsDay': '0212',
    'newYearDay': '0101',
    'juneteenth': '0619',
    'independenceDay': '0704',
    'veteransDay': '1111',
    'christmas': '1225',
    'Martin Luther King Jr. Day': '01W3D1',
    'presidentDay' : ' 02W3D1',
    '노동절' : '09W1D1',
    'columbusDay' : '10W2D1',
    'thanksgivingDay' : '11W4D4' 
}

const usKansasHoliday : Record<string, string> = {
    'KansasDay': '0129',
    'newYearDay': '0101',
    'juneteenth': '0619',
    'independenceDay': '0704',
    'veteransDay': '1111',
    'christmas': '1225',
    'Martin Luther King Jr. Day': '01W3D1',
    'presidentDay' : ' 02W3D1',
    '노동절' : '09W1D1',
    'columbusDay' : '10W2D1',
    'thanksgivingDay' : '11W4D4' 
}

export const countryHoliday : Record<string, Record<string, string>> = {
    'korea': koreaHoliday,
    'korea-lunar': koreaLunarHoliday,
    'china': chinaHoliday,
    'china-lunar': chinaLunarHoliday,
    'japan': japanHoliday,
    'us': usHoliday,
    // 'us-days': usDaysHoliday,
    'us-califonia': usCalifoniaHoliday,
    'us-newyork': usNewYorkHoliday,
    'us-massachusetts': usMassachusettsHoliday,
    'us-kansas': usKansasHoliday
}
export type HolidayInfo = {
    date: string;
    weekday: string;
    name: string;
};


export function getSpecificDate(year: number, month: number, week: number, day: number): string {
    month -= 1; // JavaScript Date 객체의 month는 0부터 시작
    let firstDayOfMonth = new Date(year, month, 1);
    let firstDayOfWeek = firstDayOfMonth.getDay();
    
    // 주어진 day는 1: 월요일, ..., 7: 일요일 이므로, 이를 JavaScript 요일로 변환
    let targetWeekday = day + 1;

    // 첫번째 주의 첫 번째 targetWeekday 날짜를 찾습니다.
    let startDay = firstDayOfWeek <= targetWeekday ? 
                   targetWeekday - firstDayOfWeek + 1 : 
                   7 - firstDayOfWeek + targetWeekday + 1;

    let date = startDay + (week - 1) * 7;

    let resultDate = new Date(year, month, date);

    // 'yyyy-mm-dd' 문자열로 반환
    let formattedDate = resultDate.toISOString().split('T')[0];

    return formattedDate;
}
