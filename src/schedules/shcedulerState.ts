import { Job, scheduleJob } from 'node-schedule';

interface NamedJob extends Job {
  name: string;
}

class SchedulerState {
  private static instance: SchedulerState;
  private schedules: NamedJob[] = [];

  public static getInstance(): SchedulerState {
    if (!SchedulerState.instance) {
      SchedulerState.instance = new SchedulerState();
    }
    return SchedulerState.instance;
  }
  
  public printSchedules() {
    const jobNames = this.schedules.map(job => job.name);
    console.log(`[${jobNames.join(', ')}]`);
  }

  public getSchedules(date?: string) {
    if(!date) {
      return this.schedules.map(job => ({ name: job.name, nextInvocation: job.nextInvocation() }));
    }

    const target = new Date(date);
    target.setHours(0, 0, 0, 0);

    return this.schedules.filter(job => {
      const nextTime = job.nextInvocation();
      if (nextTime) {
        const nextDate = new Date(nextTime);
        nextDate.setHours(0, 0, 0, 0);
        return nextDate.getTime() === target.getTime();
      }
      return false;
    }).map(job => ({ name: job.name, nextInvocation: job.nextInvocation() }));

  }

  public addSchedule(job: Job) {
    this.schedules.push(job);
  }

  public deleteScheduleByName(name: string) {
    const index = this.schedules.findIndex(job => job.name === name);
    if (index !== -1) {
      this.schedules[index].cancel()
      this.schedules.splice(index, 1);
    }
    else {
      console.log(`Schedule ${name} is not found.`)
    }
  }

}

export default SchedulerState;