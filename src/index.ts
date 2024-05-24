export const hello = (name: string): string => {
    return `hello ${name}`;
}
export { addYearSchedule } from './schedules/addSchedule'
export { addMonthSchedule } from './schedules/addSchedule'
export { addWeekSchedule } from './schedules/addSchedule'
export { getSchedules } from './schedules/scheduleManage'
export { deleteSchedule } from './schedules/scheduleManage'
export { printSchedules } from './schedules/scheduleManage'