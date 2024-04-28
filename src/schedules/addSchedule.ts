import { scheduleJob, RecurrenceRule, Job } from 'node-schedule';
import SchedulerState from './shcedulerState';
import { deleteSchedule } from './scheduleManage';

function parseDateTime(dateTimeString: string): number[] {
  const [date, time] = dateTimeString.split(' ');
  const [month, day] = date.split('-').map(num => parseInt(num, 10));
  const [hour, minute, second] = time.split(':').map(num => parseInt(num, 10));
  return [month - 1, day, hour, minute, second];
}

function addSchedule(job: Job){
  const schedulerState = SchedulerState.getInstance();
  schedulerState.addSchedule(job);
}

export function addYearSchedule (date: string, name: string, isRepeated: boolean = true) {
  const [month, day, hour, minute, second] = parseDateTime(date);
  const rule = new RecurrenceRule();
  rule.month = month;
  rule.date = day;
  rule.hour = hour;
  rule.minute = minute;
  rule.second = second;

  const job = scheduleJob(name, rule, function(){
    console.log(`${name} is called: ${new Date()}`);

    if (!isRepeated) {
      deleteSchedule(name);
    }
  });

  addSchedule(job);

  return 'add Schedule'
};