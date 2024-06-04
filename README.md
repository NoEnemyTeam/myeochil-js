# myeochil-js

> `myeochil-js` is a versatile npm library designed to facilitate handling of holidays, dates, times and schedules.

There are date and time-related functions such as national holiday information, date/time conversion and calculation, positive/sound conversion, leap year confirmation, and schedule management

Whether you're developing a web application that requires accurate public holiday data, or a project management tool that needs comprehensive date handling capabilities, `myeochil-js` has you covered.



</br>

## Features

**`myeochil-js`** offers a wide range of functionalities including:

[**Country-specific public holiday information**](#country-specific-public-holiday-information): Provide fixed public holiday information for various countries.

[**Solar - lunar calendar conversion**](#solar---lunar-calendar-conversion): Easily convert dates between solar and lunar calendars.

[**Time zone conversion and calculation**](#time-zone-conversion-and-calculation): Convert and calculates time differences between time zones.

[**Date format conversion**](#date-format-conversion): Convert dates between different formats.

[**Leap year verification**](#leap-year-verification): Check whether a given year is a leap year.

[**Date calculation**](#date-calculation): Calculate the number of days between dates or arranges dates.

[**Age calculation**](#age-calculation): Determine a person's age based on their date of birth.

[**Date validity verification**](#date-validity-verification): Check that a given date is valid.

[**Future date calculation**](#future-date-calculation): Calculate the day of the week for future dates or the date for future days of the week.

[**Project schedule management**](#project-schedule-management): Manage the schedules of project.

<br>
<br> 
<br>

## Installation

Install `myeochil-js` using npm:

```bash
npm install myeochil-js
```

<br>
<br>

## Usage
It supports both CommonJS and ES Modules, making it easily integrateable into a wide range of JavaScript projects.

```js
//CommonJS
const { name } = require("myeochil-js");

//ES Module
import { name } from "myeochil-js";
```

<br>
<br>
<br>




## Docs

---

## Country-specific public holiday information
**supported country code**
```
Countries: 4
├── korea
├── china
├── us
│   ├── us-califonia
│   ├── us-massachusetts
│   ├── us-kansas
│   └── us-newyork
└── japan
```

<br>

### **getHolidays**
Returns public holiday information by country.
If only the `country` is entered, a list of public holidays for that country is returned. If `country`,`year` is provided, the dates and names of public holidays for that specific year are returned. Furthermore, if both `country`,`year` and `month` are inserted, public holiday information for that particular year and month is returned.

**Type**
```js
function getHolidays(
    country: string,
    year?: number,
    month?: number
): HolidayInfo[] | string[]
```

**HolidayInfo**
| Name     | Type   | Description       |
|----------|--------|-------------------|
| date     | string | The holiday date  |
| weekday  | string | The day of the week as a string |
| name     | string | The name of the holiday |


**Arguments**
| Name      | Type        | Description                                |
|-----------| ----------- | ------------------------------------------ |
| country   | string      | Country code to search                     |
| year?     | number      | Year to search                             |
| month?    | number      | Month to search                            |



**Returns**
| Type        | Description                                                     |
| ----------- | --------------------------------------------------------------- |
| Array&lt;HolidayInfo&gt; | An array containing all the public holidays' info. |


**Examples**
```js
console.log(getHolidays('korea', 2024));
// =>
 [
  { date: '2024-01-01', weekday: 'Monday', name: '신정' },
  { date: '2024-03-01', weekday: 'Friday', name: '삼일절' },
  { date: '2024-05-05', weekday: 'Sunday', name: '어린이날' },
  { date: '2024-06-06', weekday: 'Thursday', name: '현충일' },
  { date: '2024-08-15', weekday: 'Thursday', name: '광복절' },
  ...
]

```

<br>

### **isHoliday**
Determines if a specific date is a public holiday. It takes the `country (or state)`, `date`, and an optional `description` parameter that specifies whether to include information about the holiday. If the `description` option is set to `true`, it returns the name of the holiday as a string.

**type**
```js
function isHoliday(
    country: string,
    date: TargetDate | string,
    description?: boolean
): boolean | string
```


**TargetDate**
| Name     | Type   | Description       |
|----------|--------|-------------------|
| year     | number | Year like YYYY    |
| month    | number | Month like MM     |
| day      | number | Day like DD       |



**Arguments**
| Name      | Type        | Description                                |
|-----------| ----------- | ------------------------------------------ |
| country   | string      | Country code to search                     |
| date      | TargetDate &vert; string      | Holiday's date           |
| description? | boolean  | Description inclusion                      |


**Returns**
| Type        | Description                                |
| ----------- | ------------------------------------------ |
| boolean     | The date is holiday                        |
| string      | Description of the holiday                 |


**Examples**
```js
console.log(isHoliday('korea', '2024-08-15', true));
// => 광복절

console.log(isHoliday('korea', '2024-08-15'));
// => true

console.log(isHoliday('korea', '2024-07-16'));
// => false
```


<br>

--- 
## Solar - lunar calendar conversion
### **toLunar**
converts a solar date to a lunar date.

**type**
```js
function toLunar(
    date: TargetDate | string
): TargetDate | undefined
```

**TargetDate**
| Name     | Type   | Description       |
|----------|--------|-------------------|
| year     | number | Year like YYYY    |
| month    | number | Month like MM     |
| day      | number | Day like DD       |



**Arguments**
| Name      | Type                      | Description                                |
|-----------| ------------------------- | ------------------------------------------ |
| date      | TargetDate &vert; string  | Date to convert into lunar date            |



**Returns**
| Type                     | Description |
| ------------------------ | ----------- |
| TargetDate &vert; string | Lunar Date  |


**Examples**
```js
console.log(toLunar('2023-06-01'));
// => { year: 2024, month: 4, day: 25 }
```

<br>

### **toSolar**
converts a lunar date to a solar date.

**type**
```js
function toSolar(
    date: TargetDate | string
): TargetDate | undefined
```

**TargetDate**
| Name     | Type   | Description    |
|----------|--------|----------------|
| year     | number | Year like YYYY |
| month    | number | Month like MM  |
| day      | number | Day like DD    |



**Arguments**
| Name  | Type                     | Description                     |
|------ | ------------------------ | ------------------------------- |
| date  | TargetDate &vert; string | Date to convert into solar date |



**Returns**
| Type                     | Description  |
| ------------------------ | ------------ |
| TargetDate &vert; string | Solar Date   |


**Examples**
```js
console.log(toSolar('2024-04-25'));
// => { year: 2024, month: 6, day: 1 }
```

<br>

--- 
## Time zone conversion and calculation
**supported country code**
```
├── Coordinated Universal Time
├── Korea
├── Argentina
|   └── Buenos Aires
├── Australia
|   ├── Australia(East)
|   └── Midway Island
├── American Samoa
├── Austria
├── Bangladesh
├── Bahrain
├── Belgium
├── Bhutan
├── Brazil
|   ├── Fernando de Noronha
|   └── São Paulo
├── Bulgaria
├── Canada
|   ├── Alberta
|   ├── Canada Atlantic
|   ├── Manitoba
|   ├── Montreal
|   ├── Quebec
|   └── Vancouver
├── Cambodia
├── Cape Verde
├── Chile
├── China
├── Hong Kong
├── Colombia
├── Cuba
├── Czech Republic
├── Denmark
|   ├── Denmark
|   └── Greenland
├── East Timor
├── Ecuador
├── Egypt
├── Fiji
├── Finland
├── France
├── Tahiti
├── Germany
├── Georgia
├── Greece
├── Guam
├── Iceland
├── Indonesia
|   ├── Indonesia(Central)
|   └── Indonesia(West)
├── Iraq
├── Italy
├── Japan
├── Kazakhstan
├── Kiribati
├── Kuwait
├── Kyrgyzstan
├── Laos
├── Libya
├── Malaysia
├── Maldives
├── Marshall Islands
├── Mexico
|   └── Mexico City
├── Micronesia
├── Mongolia
├── Nauru
├── New Caledonia
├── New Zealand
├── Oman
├── Palau
├── Papua New Guinea
├── Paraguay
├── Peru
├── Philippines
├── Poland
├── Portugal
|   ├── Azores
|   └── Lisbon
├── Puerto Rico
├── Qatar
├── Russia
├── Saipan
├── Saudi Arabia
├── Singapore
├── Solomon Island
├── South Georgia Island
├── Thailand
├── Turkey
├── UAE
├── United Kingdom
|   └── London
├── United States
|   ├── Arizona
|   ├── California
|   ├── Honolulu
|   ├── Illinois
|   ├── New York
|   ├── Utah
|   ├── USA Alaska
|   ├── USA Central
|   ├── USA Eastern
|   ├── USA Mountain
|   ├── USA Pacific
|   ├── Washington
|   └── Wisconsin
├── Uruguay
├── Uzbekistan
├── Vietnam
├── West African
└── Yemen
```








### **convertTimezone**
Converts the time from the `fromTimezone` to the time of the `toTimezone` country. It takes a `datetime` in the format 'YYYY-MM-DD' as an argument and returns the converted time by applying the UTC offset difference between the two countries.


**type**
```js
function convertTimezone(
    datetime: string,
    fromTimezone: string,
    toTimezone: string
): string
```

**Arguments**
| Name     | Type   | Description       |
|----------|--------|-------------------|
| datetime     | string | Date to convert like 'YYYY-MM-DD'  |
| fromTimezone    | string | Reference country |
| toTimezone      | string | Target country |



**Returns**
| Type        | Description                                    |
| ----------- | ------------------------------------------ |
| string      | Converted Datetime    |


**Examples**
```js
console.log(convertTimezone('2024-06-01 00:00:00', 'Korea', 'California'));
// => 2024-06-30 07:00:00
```

<br>

### **calTimezone**
Returns the time difference between two countries. It takes the names of the specified countries as arguments and provides the time difference by subtracting the UTC offsets of the given countries.

**type**
```js
function calTimezone(
    fromCity: string,
    toCity: string
): number
```

**Arguments**
| Name     | Type   | Description       |
|----------|--------|-------------------|
| fromCity    | string | Reference city |
| toCity      | string | Target City  |



**Returns**
| Type        | Description                                    |
| ----------- | ------------------------------------------ |
| number      | Time difference between fromCity and toCity  |


**Examples**
```js
console.log(calTimezone('Korea', 'California'));
// => 17
```

<br>

--- 
## Date format conversion
### **formatDate**
Converts the format of a given date string. It splits the `date` argument based on the '-' delimiter. If the user specifies a desired output `format`, it returns the date in that format (`MM-DD-YYYY`, `DD-MM-YYYY`). If no `format` is specified, it returns an object literal containing all three formats.

**type**
```js
function formatDate(
    date: string,
    format?: string
): string | { [key: string]: string }
```

**Arguments**
| Name   |  Type  | Description                                    |
|--------|--------|----------------------------------------------- |
| date   | string | Date to convert like 'YYYY-MM-DD'              |
| format?| string | Target Format 'MM-DD-YYYY' &vert; 'DD-MM-YYYY' |



**Returns**
| Type        | Description                                      |
| ----------- | ------------------------------------------------ |
| string      | Converted Datetime                               |
| Array&lt;object&gt;| An array containing Converted Datetime string. |


**Examples**
```js
console.log(formatDate(date1, 'MM-DD-YYYY'));
// => 06-01-2024

console.log(formatDate(date1, 'DD-MM-YYYY'));
// => 01-06-2024

console.log(formatDate(date1));
// =>
{
  'YYYY-MM-DD': '2024-06-01',
  'MM-DD-YYYY': '06-01-2024',
  'DD-MM-YYYY': '01-06-2024'
}
```


<br>

--- 
## Leap year verification
### **isLeapYear**
Check whether a given year is a leap year. If `year` is a leap yaer, then `true` will be returend.

**type**
```js
function isLeapYear(
    year: number
): string | Boolean
```

**Arguments**
| Name | Type   | Description                    |
|------|--------|------------------------------- |
| year | number | Year to check for a leap year  |



**Returns**
| Type    | Description                                    |
| ------- | ------------------------------------------ |
| boolean | The yaer is a leap year    |


**Examples**
```js
console.log(isLeapYear(2024));
// => true

console.log(isLeapYear(2023));
// => false
```


<br>

--- 
## Date calculation
### **calDaysBetween**
Calculates the number of days between two input dates. `dateStr1` and `dateStr2` should be strings in the `'YYYY-MM-DD'` format, and it returns the number of days between the two dates as a positive integer. Regardless of the order of `dateStr1` and `dateStr2`, it calculates and returns the absolute difference in days between the two dates. Only two arguments can be entered. If more than two are entered, it calculates the difference in days using only the first two dates.

**type**
```js
function calDaysBetween(
    dateStr1: string,
    dateStr2: string
): number
```

**Arguments**
| Name     | Type   | Description                   |
|----------|--------| ----------------------------- |
| dateStr1 | string | Date string like 'YYYY-MM-DD' |
| dateStr2 | string | Date string like 'YYYY-MM-DD' |



**Returns**
| Type   | Description                               |
| ------ | ----------------------------------------- |
| number | the number of days between the two dates  |


**Examples**
```js
console.log(calDaysBetween('2024-05-07', '2024-05-20'));
// => 13
```

### **sortDate**
Sorts a list of dates, which are strings in the `'YYYY-MM-DD'` format, according to the specified option and returns the sorted list. If dates is empty, it returns an empty list. The default value for option is `'asce'`. When option is `'asce'`, the dates are sorted in ascending (earliest to latest) order. When option is `'desc'`, the dates are sorted in descending (latest to earliest) order. If option contains any value other than these two, it defaults to `'asce'` and returns the list sorted in ascending order.

**type**
```js
function sortDates(
    dates: string[],
    option?: string
): string[]
```

<br>

**Arguments**
| Name    | Type                 | Description                       |
|---------|----------------------|---------------------------------- |
| dates   | Arrary&lt;string&lt; | An array containing dates to sort |
| option? | string               | sort criterion                    |



**Returns**
| Type    | Description                                  |
| ------- | -------------------------------------------- |
| Arrary&lt;string&lt; | A sorted array containing dates |


**Examples**
```js
const date1 = '2024-05-07'
const date2 = '2024-05-20'
const date3 = '2023-06-01'

console.log(sortDates([date1, date2, date3]));
// => [ '2023-06-01', '2024-05-07', '2024-05-20' ]

console.log(sortDates([date1, date2, date3], 'asce'));
// => [ '2024-05-07', '2024-05-20', '2023-06-01' ]

console.log(sortDates([date1, date2, date3], 'desc'));
// => [ '2024-05-20', '2024-05-07', '2023-06-01' ]
```


<br>

--- 
## Age calculation
### **calAge**
Calculates the age as a positive integer based on the difference from a `referenceDate`, using the `birthDate`. Both dates are in the `'YYYY-MM-DD'` format. Age is calculated by considering the time of birth as 0 years old and increasing by 1 year with each birthday, so the age returned can vary depending on the birthday. If the `referenceDate` is earlier than the `birthDate`, it's not possible to calculate the age, and an error message is returned.

**type**
```js
function calAge(
    birthDate: string,
    referenceDate: string
): number | string
```

**Arguments**
| Name          | Type   | Description                   |
|---------------|--------| ----------------------------- |
| birthDate     | string | Date string like 'YYYY-MM-DD' |
| referenceDate | string | Date string like 'YYYY-MM-DD' |



**Returns**
| Type   | Description                                |
| ------ | ------------------------------------------ |
| number | the age from birth date to reference date  |


**Examples**
```js
console.log(calAge('2000-04-11', '2024-04-13'));
//=> 24

console.log(calAge('2000-04-11', '2024-04-11'));
// => 24

console.log(calAge('2000-04-11', '2024-04-12'));
// => 23

console.log(calAge('2024-04-30', '2000-04-11'));
// => Error: ReferenceDate is earlier than birthDate.
```

<br>

--- 
## Date validity verification
### **isValidDate**
Determines whether the given date `sDate` is a valid calendar date and returns a Boolean value. The parameter `sDate` is a string in the `'YYYY-MM-DD'` format for which the validity needs to be checked. If `sDate` is a valid calendar date, it returns `true`, otherwise, it returns `false`.

**type**
```js
function isValidDate(
    sDate: string
): string | Boolean
```

**Arguments**
| Name      | Type   | Description                 |
|-----------|--------| --------------------------- |
| sDate     | string | Date to check if it's valid |



**Returns**
| Type    | Description        |
| ------- | ------------------ |
| boolean | The date is valid  |


**Examples**
```js
console.log(isValidDate("2024-03-31"));
// => true

console.log(isValidDate("2024-04-31"));
// => false

console.log(isValidDate(20240424));
// => Error: Invalid Date Argument. please input correct date. ex) YYYY-MM-DD
```


<br>

--- 
## Future date calculation
### **getFutureDate**
Finds the date corresponding to the given parameters and returns it in the `'YYYY-MM-DD'` format. The parameters are: `year`, `month`, `week` and `weekday`. If `weekday` is not one of `'Sunday'`, `'Monday'`, `'Tuesday'`, `'Wednesday'`, `'Thursday'`, `'Friday'`, or `'Saturday'`, it returns an error message `'Invalid weekday'`. If all parameters are input correctly, it calculates and returns the corresponding date as a string in the `'YYYY-MM-DD'` format.

**type**
```js
function getFutureDate(
    year: number,
    month: number,
    week: number,
    weekday: string
): string
```

**Arguments**
| Name      | Type   | Description                          |
|-----------|--------| ------------------------------------ |
| year      | number | Year of Date                         |
| month     | number | Month of Date                        |
| week      | number | Week of Date                         |
| weekday   | string | Weekday of Date : Sunday to Saturday |



**Returns**
| Type    | Description             |
| ------- | ----------------------- |
| string  | Date like 'YYYY-MM-DD'  |


**Examples**
```js
console.log(getFutureDate(2024, 6, 1, "Wednesday"));
// => 2024-06-05

console.log(getFutureDate(2024, 6, 1, "Wen"));
// => Error: Invalid weekday
```

<br>

### **getFutureWeekday**
Determines the day of the week for a given `date` and returns the day as a string. The parameter `date` is a string in the `'YYYY-MM-DD'` format, and description is a boolean indicating whether to include additional information about the date. If date is a valid calendar date and description is true, it returns the day of the week in the format `'{year} year {month} month {n}th week's {weekday}'`. Additionally, if date is a valid calendar date and description is false, it returns the day of the week as `'Sunday'`, `'Monday'`, `'Tuesday'`, `'Wednesday'`, `'Thursday'`, `'Friday'`, or '`Saturday'`, corresponding to the given date.

**type**
```js
function getFutureWeekday(
    date: string,
    description?: string
): boolean
```

**Arguments**
| Name         | Type    | Description                 |
|--------------|---------| --------------------------- |
| date         | string  | Date for getting weekday    |
| description? | boolean | Detail inclusion |



**Returns**
| Type   | Description          |
| -------| -------------------- |
| string | The weekday of date  |


**Examples**
```js
console.log(getFutureWeekday("2024-06-01", true));
// => 2024 year 6 month 1th week's Saturday

console.log(getFutureWeekday("2024-06-01", false));
// => Saturday

console.log(getFutureWeekday("2024-06-01"));
// => Saturday
```

<br>

--- 
## Project schedule management
### **getSchedules**
Provides a functionality to query the schedules registered in the project. `date` is a string in `'YYYY-MM-DD'` format. If the `date` is not provided, it returns all the schedules registered in the project. If the `date` is provided, it returns the schedules registered for that specific date. It returns a list of objects containing the name (name) and the next invocation date (nextInvocation) of each registered schedule. The next invocation date information includes time, zone, and locale. If there are no schedules registered, an empty list is returned.

**type**
```js
function getSchedules(
  date?:string
): NamedJob[]
```

**NamedJob**
`NamedJob` extends `Job` from node-schedule.
| Name   | Type   | Description     |
|--------|--------| --------------- |
| name   | string | Name of a Job   |


**Arguments**
| Name   | Type   | Description              |
|--------|--------| ------------------------ |
| date?  | string | Date to search shedules  |


**Returns**
| Type                   | Description                          |
| ---------------------- | ------------------------------------ |
| Array&lt;NamedJob&gt;  | An array containing jobs of project  |


**Examples**
```js
console.log(getSchedules());
// => 
[
  {
    name: 'test1',
    nextInvocation: CronDate {
      _date: DateTime { ts: 2024-05-29T16:47:00.000+09:00, zone: Asia/Seoul, locale: ko-KR }
    }
  },
  {
    name: 'test2',
    nextInvocation: CronDate {
      _date: DateTime { ts: 2024-06-24T17:47:10.000+09:00, zone: Asia/Seoul, locale: ko-KR }
    }
  }
]

console.log(getSchedules('2024-05-29'));
// => 
[
  {
    name: 'test1',
    nextInvocation: CronDate {
      _date: DateTime { ts: 2024-05-29T16:47:00.000+09:00, zone: Asia/Seoul, locale: ko-KR }
    }
  }
]

```

<br>

### **printSchedules**
Prints all schedules registered in the project. Unlike getSchedules(), it only retrieves the entire list of schedules and outputs a list containing only the names of each schedule. If there are no registered schedules, an empty list is output.

**type**
```js
function printSchedules()
```


**Examples**
```js
printSchedules();
// => [test1, test2, test3, test4]
```

<br>


### **addSchedule**
Add annual or monthly schedules to the project. `date` parameter is a string in the format `'MM-DD HH:mm:ss'` or `'DD HH:mm:ss'`, and `name` parameter is the name of the schedule to be registered. `isRepeated` parameter is a boolean that indicates whether the schedule is recurring, with a default value set to true. If the `date` is in the `'MM-DD HH:mm:ss'` format, an annual schedule is registered for the specified date and time. If the `date` is in the `'DD HH:mm:ss'` format, a monthly schedule is registered for the specified date and time. When the schedule is triggered, it outputs the schedule name and execution time to the console as an alert. If the alarm is successfully registered, the string `'add Schedule'` is returned. If a schedule with the same name already exists in the project, a warning message indicating that the schedule already exists is returned.


**An example where the name of the schedule is 'test1' and it is called.**
```
test1 is called: Sat Jun 01 2024 00:30:00 GMT+0900 (대한민국 표준시)
```


**type**
```js
function addSchedule (
    date: string,
    name: string,
    isRepeated?: boolean = true
): string
```


**Arguments**
| Name        | Type    | Description                                             |
|-------------|---------| --------------------------------------------------------|
| date        | string  | Date of schedule like 'MM-DD HH:mm:ss' or 'DD HH:mm:ss' |
| name        | string  | Name of schedule                                        |
| isRepeated? | boolean | Repeating                                               |


**Returns**
| Type    | Description                                               |
| ------- | --------------------------------------------------------- |
| string  | `add Schedule`: A new schedule is registered successfully |


**Examples**
```js
console.log(addSchedule('05-29 16:47:00', 'test1', false));
// => add Schedule

addSchedule('24 17:00:10', 'test2', true);
addSchedule('24 20:00:10', 'test2', true);
//=> Error: Job test1 already exists.
```


<br>

### **addWeekSchedule**
Add a weekly schedule to the project, differing from `addSchedule()` by accepting a day of the week. `dayOfWeek` parameter specifies the day of the week on which the schedule will be executed each week and is input as a string. `time` parameter specifies the time at which the schedule will be triggered on the given day, formatted as `'HH:mm:ss'`. `name` parameter is the name of the schedule to be registered and must not duplicate any existing schedule names. `isRepeated` parameter is a boolean indicating whether the schedule is recurring, with a default value set to true. If the schedule is successfully registered, the string `'add Weekly Schedule'` is returned. The schedule will be logged with its name and execution time at the specified time on the specified day of the week.

**An example where the name of the schedule is 'test1' and it is called.**
```
test1 is called: Sat Jun 01 2024 00:30:00 GMT+0900 (대한민국 표준시)
```

**type**
```js
function addWeekSchedule(
    dayOfWeek: string,
    time: string,
    name: string,
    isRepeated?: boolean = true
): string
```


**Arguments**
| Name        | Type    | Description                                |
|-------------|---------| ------------------------------------------ |
| dayOfWeek   | string  | dayOfWeek of schedule : Sunday to Saturday |
| time        | string  | Time of schedule like 'HH:mm:ss'           |
| name        | string  | Name of schedule                           |
| isRepeated? | boolean | Repeating                                  |


**Returns**
| Type    | Description                                               |
| ------- | --------------------------------------------------------- |
| string  | `add Weekly Schedule`: A new schedule is registered successfully |


**Examples**
```js
console.log(addWeekSchedule('Saturday', '17:00:00', 'test1'));
// => add Weekly Schedule

addSchedule('24 17:00:10', 'test2', true);
addWeeklySchedule('24 20:00:10', 'test2', true);
//=> Error: Job test1 already exists.
```

<br>

### **addIntervalSchedule**
Add a schedule to be called at specified intervals of weeks. Unlike `addWeekSchedule()`, which calls a schedule every week, `addIntervalSchedule()` allows setting the interval of weeks for the recurring schedule. The parameters `dayOfWeek`, `time`, `name`, and `isRepeated` are the same as those for `addWeekSchedule()`. The `weekInterval` parameter is a positive integer that represents the interval of weeks for the schedule to repeat. For example, if the `weekInterval` is 2, the schedule will be called every 2 weeks. Like `addWeekSchedule()`, if the schedule is successfully registered, the string `'add Weekly Schedule'` is returned. The schedule will be logged with its name and execution time at the specified time on the specified day of the week

**An example where the name of the schedule is 'test1' and it is called.**
```
test1 is called: Sat Jun 01 2024 00:30:00 GMT+0900 (대한민국 표준시)
```

**type**
```js
function addIntervalSchedule(
    dayOfWeek: string,
    time: string,
    name: string, 
    weekInterval: number,
    isRepeated?: boolean = true
): string
```


**Arguments**
| Name         | Type    | Description                                |
|--------------|---------| ------------------------------------------ |
| dayOfWeek    | string  | dayOfWeek of schedule : Sunday to Saturday |
| time         | string  | Time of schedule like 'HH:mm:ss'           |
| name         | string  | Name of schedule                           |
| weekInterval | number  | Week Interval number                       |
| isRepeated?  | boolean | Repeating                                  |



**Returns**
| Type    | Description                                               |
| ------- | --------------------------------------------------------- |
| string  | `add Weekly Schedule`: A new schedule is registered successfully |


**Examples**
```js
console.log(addIntervalSchedule('Saturday', '17:00:30', 'test4', 5));
// => add Weekly Schedule
```


<br>

### **deleteSchedule**
Deletes a schedule from the project by its registered name. If the `name` of an unregistered schedule is provided, an error message is returned. If the schedule is successfully deleted, nothing is returned.


**type**
```js
function deleteSchedule(
    name: string
): None | string
```


**Arguments**
| Name         | Type    | Description                |
|--------------|---------| -------------------------- |
| name         | string  | Name of schedule to delete |


**Examples**
```js
deleteSchedule('test3');

deleteSchedule('test3');
// => Schedule test3 is not found.
```

<br><br><br><br><br>



## Dependencies
[date-fns](https://www.npmjs.com/package/date-fns)
[node-shcedule](https://www.npmjs.com/package/node-schedule)
[@types/node-schedule](https://www.npmjs.com/package/@types/node-schedule)

<br>

## License
MIT © NoEnemyTeam