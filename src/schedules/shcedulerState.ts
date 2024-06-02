import { Job, RecurrenceRule, } from 'node-schedule';

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
    const isJobExist = this.schedules.some(existingJob => existingJob.name === job.name);
    if (!isJobExist)
    {
      this.schedules.push(job);
    }
    else
    {
      throw new Error(`Conflict. Job ${job.name} already exists.`)
    }
  }

  public resetSchedule(rule: RecurrenceRule, name: string) {
    const index = this.schedules.findIndex(job => job && job.name === name);
    if (index !== -1) {
      this.schedules[index].reschedule(rule);
    } else {
      throw new Error(`NotFoundExecption. Schedule ${name} can not find.`);
    }
  }

  public deleteScheduleByName(name: string) {
    const index = this.schedules.findIndex(job => job.name === name);
    if (index !== -1) {
      this.schedules[index].cancel()
      this.schedules.splice(index, 1);
    }
    else {
      throw new Error(`NotFoundExecption. Schedule ${name} can not find.`);
    }
  }

}

export default SchedulerState;
