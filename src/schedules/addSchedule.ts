import { scheduleJob, RecurrenceRule, Job } from 'node-schedule';
import SchedulerState from './shcedulerState';
import { deleteSchedule } from './scheduleManage';

function parseDateTime(dateTimeString: string): number[] {
  const [date, time] = dateTimeString.split(' ');
  const [hour, minute, second] = time.split(':').map(num => parseInt(num, 10));
  if(hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) {
    throw new Error("Error: Invalid time Argument. please input correct time. ex) HH:mm:ss.");
  }
  
  if (date.length >= 3) {
    const [month, day] = date.split('-').map(num => parseInt(num, 10));

    if(month < 1 || month > 12 || day < 1 || day > 31) {
      throw new Error("Error: Invalid Date Argument. please input correct date. ex) MM-DD.");
    }

    return [month - 1, day, hour, minute, second];
  }
  else {
    const day = parseInt(date, 10);
    if(day < 1 || day > 31) {
      throw new Error("Error: Invalid Date Argument. please input correct date. ex) DD.");
    }

    return [day, hour, minute, second];
  }
}

function _addSchedule(job: Job){
  const schedulerState = SchedulerState.getInstance();
  try {
    schedulerState.addSchedule(job);
  }
  catch (error) {
    throw error
  }
}

export function addSchedule (date: string, name: string, isRepeated: boolean = true) {
  const rule = new RecurrenceRule();
  if (date.length >= 3) {
    const [month, day, hour, minute, second] = parseDateTime(date);
    rule.month = month;
    rule.date = day;
    rule.hour = hour;
    rule.minute = minute;
    rule.second = second || 0;
  }
  else {
    const [day, hour, minute, second] = parseDateTime(date);
    rule.date = day;
    rule.hour = hour;
    rule.minute = minute;
    rule.second = second || 0;
  }

  const job = scheduleJob(name, rule, function(){
    console.log(`${name} is called: ${new Date()}`);

    if (!isRepeated) {
      deleteSchedule(name);
    }
  });

  try {
    _addSchedule(job);
    return 'add Annual Schedule'
  }
  catch (error) {
    throw error;
  }
};


export function addWeekSchedule(dayOfWeek: string, time: string, name: string, isRepeated: boolean = true) {
  const weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
  const weekdayIndex = weekdays.indexOf(dayOfWeek);
  if (weekdayIndex === -1) {
      throw new Error("Error: Invalid weekday");
  }
  const [hour, minute, second] = time.split(':').map(num => parseInt(num, 10));

  if(hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) {
    throw new Error("Error: Invalid time Argument. please input correct time. ex) HH:mm:ss.");
  }

  const rule = new RecurrenceRule();
  rule.dayOfWeek = weekdayIndex;
  rule.hour = hour;
  rule.minute = minute;
  rule.second = second || 0;

  const job = scheduleJob(name, rule, function() {
    console.log(`${name} is called: ${new Date()}`);

    if (!isRepeated) {
      deleteSchedule(name);
    }
  });

  try {
    _addSchedule(job);
    return 'add Weekly Schedule';
  }
  catch (error) {
    throw error;
  }

};

export function addIntervalSchedule(dayOfWeek: string, time: string, name: string, weekInterval: number, isRepeated: boolean = true) {
  const weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];    
  
  const weekdayIndex = weekdays.indexOf(dayOfWeek);
  if (weekdayIndex === -1) {
      throw new Error("Error: Invalid weekday");
  }
  const [hour, minute, second] = time.split(':').map(num => parseInt(num, 10));

  if(hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) {
    throw new Error("Error: Invalid time Argument. please input correct time. ex) HH:mm:ss.");
  }

  const rule = new RecurrenceRule();
    rule.dayOfWeek = weekdayIndex;
    rule.hour = hour;
    rule.minute = minute;
    rule.second = second || 0;
    
    const job = scheduleJob(name, rule, function() {
      console.log(`${name} is called: ${new Date()}`);

      if (!isRepeated) {
        deleteSchedule(name);
      }
      else {
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + weekInterval * 7);

        const rule = new RecurrenceRule();
        rule.year = nextDate.getFullYear();
        rule.month = nextDate.getMonth() + 1;
        rule.month = nextDate.getMonth();
        rule.date = nextDate.getDate();
        rule.dayOfWeek = weekdayIndex;
        rule.hour = hour;
        rule.minute = minute;
        rule.second = second || 0;

        const schedulerState = SchedulerState.getInstance();
        schedulerState.resetSchedule(rule, name);
      }
    });

    try {
      _addSchedule(job);
      return 'add Weekly Schedule';
    } catch (error) {
      throw error;
    }

};