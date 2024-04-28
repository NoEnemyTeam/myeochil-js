import { Job } from 'node-schedule';
import SchedulerState from './shcedulerState';

export function getSchedules(): Job[] {
  const schedulerState = SchedulerState.getInstance();
  return schedulerState.getSchedules();
}

export function deleteSchedule(name: string) {
  const schedulerState = SchedulerState.getInstance();
  schedulerState.deleteScheduleByName(name);
}

export function printSchedules() {
  const schedulerState = SchedulerState.getInstance();
  schedulerState.printSchedules();
}