import { scheduleJob, RecurrenceRule, Job, rescheduleJob } from 'node-schedule';
import SchedulerState from './shcedulerState';
import { deleteSchedule } from './scheduleManage';

function parseDateTime(dateTimeString: string): number[] {
  const [date, time] = dateTimeString.split(' ');
  const [hour, minute, second] = time.split(':').map(num => parseInt(num, 10));
  if (date.length >= 3) {
    const [month, day] = date.split('-').map(num => parseInt(num, 10));
    return [month - 1, day, hour, minute, second];
  }
  else {
    const day = parseInt(date, 10);
    return [day, hour, minute, second];
  }
}

function addSchedule(job: Job){
  const schedulerState = SchedulerState.getInstance();
  try {
    schedulerState.addSchedule(job);
  }
  catch (error) {
    throw error
  }
}

export function addYearSchedule (date: string, name: string, isRepeated: boolean = true) {
  const [month, day, hour, minute, second] = parseDateTime(date);
  const rule = new RecurrenceRule();
  rule.month = month;
  rule.date = day;
  rule.hour = hour;
  rule.minute = minute;
  rule.second = second || 0;

  const job = scheduleJob(name, rule, function(){
    console.log(`${name} is called: ${new Date()}`);

    if (!isRepeated) {
      deleteSchedule(name);
    }
  });

  try {
    addSchedule(job);
    return 'add Annual Schedule'
  }
  catch (error) {
    throw error;
  }
};


export function addMonthSchedule (date: string, name: string, isRepeated: boolean = true) {
  const [day, hour, minute, second] = parseDateTime(date);
  const rule = new RecurrenceRule();
  rule.date = day;
  rule.hour = hour;
  rule.minute = minute;
  rule.second = second || 0;

  const job = scheduleJob(name, rule, function(){
    console.log(`${name} is called: ${new Date()}`);

    if (!isRepeated) {
      deleteSchedule(name);
    }
  });

  try {
    addSchedule(job);
    return 'add Monthly Schedule'
  }
  catch (error) {
    throw error;
  }

};


export function addWeekSchedule(dayOfWeek: string, time: string, name: string, isRepeated: boolean = true) {
  const weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
  const weekdayIndex = weekdays.indexOf(dayOfWeek);
  if (weekdayIndex === -1) {
      throw new Error("Invalid weekday");
  }
  const [hour, minute, second] = time.split(':').map(num => parseInt(num, 10));
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
    addSchedule(job);
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
      throw new Error("Invalid weekday");
  }
  const [hour, minute, second] = time.split(':').map(num => parseInt(num, 10));
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
      addSchedule(job);
      return 'add Weekly Schedule';
    } catch (error) {
      throw error;
    }

};