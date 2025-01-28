import { ActiveJob } from '../types';
interface JobStatus {
    name: string;
    schedule: string;
    enabled: boolean;
}
declare class CronService {
    private jobs;
    constructor();
    private initializeJobs;
    private validateCronSchedule;
    private executeJob;
    start(): void;
    stop(): void;
    getJob(name: string): ActiveJob | undefined;
    stopJob(name: string): boolean;
    startJob(name: string): boolean;
    listJobs(): JobStatus[];
    getJobStatus(name: string): 'scheduled' | 'stopped' | 'not_found';
    getActiveJobsCount(): number;
}
declare const _default: CronService;
export default _default;
