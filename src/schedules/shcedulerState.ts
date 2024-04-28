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
    console.log(`[${jobNames.join(', ')}]`)
  }

  public getSchedules(): Job[] {
    return this.schedules;
  }

  public addSchedule(job: Job) {
    this.schedules.push(job);
  }

  public deleteScheduleByName(name: string) {
    const index = this.schedules.findIndex(job => job.name === name);
    if (index !== -1) {
      this.schedules.splice(index, 1);
    }
  }

}

export default SchedulerState;
