import { Job } from 'node-schedule';
import SchedulerState from './shcedulerState';

export function getSchedules(date?:string) {
  const schedulerState = SchedulerState.getInstance();

  if(date){
    return schedulerState.getSchedules(date);
  }
  return schedulerState.getSchedules();
}

export function deleteSchedule(name: string) {
  const schedulerState = SchedulerState.getInstance();
  return schedulerState.deleteScheduleByName(name);
}

export function printSchedules() {
  const schedulerState = SchedulerState.getInstance();
  schedulerState.printSchedules();
}