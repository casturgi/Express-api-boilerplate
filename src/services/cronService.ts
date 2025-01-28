import { ScheduledTask } from 'node-cron';
import cron from 'node-cron';
import { jobs } from '../config/cronJobs';
import { CronJobConfig, ActiveJob } from '../types';

interface JobStatus {
  name: string;
  schedule: string;
  enabled: boolean;
}

class CronService {
  private jobs: Map<string, ActiveJob>;

  constructor() {
    this.jobs = new Map<string, ActiveJob>();
    this.initializeJobs();
  }

  private initializeJobs(): void {
    jobs.forEach((jobConfig: CronJobConfig) => {
      if (!jobConfig.enabled) {
        console.log(`Skipping disabled job: ${jobConfig.name}`);
        return;
      }

      if (!this.validateCronSchedule(jobConfig.schedule)) {
        console.error(`Invalid cron schedule for job: ${jobConfig.name}`);
        return;
      }

      try {
        const job: ScheduledTask = cron.schedule(jobConfig.schedule, () => {
          console.log(`Running job: ${jobConfig.name} at ${new Date().toISOString()}`);
          this.executeJob(jobConfig);
        });

        this.jobs.set(jobConfig.name, {
          config: jobConfig,
          instance: job
        });

        console.log(`Job scheduled: ${jobConfig.name}`);
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error');
        console.error(`Error scheduling job ${jobConfig.name}:`, err.message);
      }
    });
  }

  private validateCronSchedule(schedule: string): boolean {
    return cron.validate(schedule);
  }

  private executeJob(jobConfig: CronJobConfig): void {
    try {
      jobConfig.task();
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      console.error(`Error executing job ${jobConfig.name}:`, err.message);
    }
  }

  public start(): void {
    for (const [name, job] of this.jobs) {
      job.instance.start();
      console.log(`Started job: ${name}`);
    }
    console.log(`Started ${this.jobs.size} cron jobs`);
  }

  public stop(): void {
    for (const [name, job] of this.jobs) {
      job.instance.stop();
      console.log(`Stopped job: ${name}`);
    }
    console.log(`Stopped ${this.jobs.size} cron jobs`);
  }

  public getJob(name: string): ActiveJob | undefined {
    return this.jobs.get(name);
  }

  public stopJob(name: string): boolean {
    const job = this.jobs.get(name);
    if (job) {
      job.instance.stop();
      console.log(`Stopped job: ${name}`);
      return true;
    }
    return false;
  }

  public startJob(name: string): boolean {
    const job = this.jobs.get(name);
    if (job) {
      job.instance.start();
      console.log(`Started job: ${name}`);
      return true;
    }
    return false;
  }

  public listJobs(): JobStatus[] {
    const jobsList: JobStatus[] = [];
    for (const [name, job] of this.jobs) {
      jobsList.push({
        name,
        schedule: job.config.schedule,
        enabled: job.config.enabled
      });
    }
    return jobsList;
  }

  public getJobStatus(name: string): 'scheduled' | 'stopped' | 'not_found' {
    const job = this.jobs.get(name);
    if (!job) {
      return 'not_found';
    }
    return job.instance.getStatus();
  }

  public getActiveJobsCount(): number {
    return Array.from(this.jobs.values()).filter(
      job => job.instance.getStatus() === 'scheduled'
    ).length;
  }
}

export default new CronService(); 