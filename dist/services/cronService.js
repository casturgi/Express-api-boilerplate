"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const cronJobs_1 = require("../config/cronJobs");
class CronService {
    constructor() {
        this.jobs = new Map();
        this.initializeJobs();
    }
    initializeJobs() {
        cronJobs_1.jobs.forEach((jobConfig) => {
            if (!jobConfig.enabled) {
                console.log(`Skipping disabled job: ${jobConfig.name}`);
                return;
            }
            if (!this.validateCronSchedule(jobConfig.schedule)) {
                console.error(`Invalid cron schedule for job: ${jobConfig.name}`);
                return;
            }
            try {
                const job = node_cron_1.default.schedule(jobConfig.schedule, () => {
                    console.log(`Running job: ${jobConfig.name} at ${new Date().toISOString()}`);
                    this.executeJob(jobConfig);
                });
                this.jobs.set(jobConfig.name, {
                    config: jobConfig,
                    instance: job
                });
                console.log(`Job scheduled: ${jobConfig.name}`);
            }
            catch (error) {
                const err = error instanceof Error ? error : new Error('Unknown error');
                console.error(`Error scheduling job ${jobConfig.name}:`, err.message);
            }
        });
    }
    validateCronSchedule(schedule) {
        return node_cron_1.default.validate(schedule);
    }
    executeJob(jobConfig) {
        try {
            jobConfig.task();
        }
        catch (error) {
            const err = error instanceof Error ? error : new Error('Unknown error');
            console.error(`Error executing job ${jobConfig.name}:`, err.message);
        }
    }
    start() {
        for (const [name, job] of this.jobs) {
            job.instance.start();
            console.log(`Started job: ${name}`);
        }
        console.log(`Started ${this.jobs.size} cron jobs`);
    }
    stop() {
        for (const [name, job] of this.jobs) {
            job.instance.stop();
            console.log(`Stopped job: ${name}`);
        }
        console.log(`Stopped ${this.jobs.size} cron jobs`);
    }
    getJob(name) {
        return this.jobs.get(name);
    }
    stopJob(name) {
        const job = this.jobs.get(name);
        if (job) {
            job.instance.stop();
            console.log(`Stopped job: ${name}`);
            return true;
        }
        return false;
    }
    startJob(name) {
        const job = this.jobs.get(name);
        if (job) {
            job.instance.start();
            console.log(`Started job: ${name}`);
            return true;
        }
        return false;
    }
    listJobs() {
        const jobsList = [];
        for (const [name, job] of this.jobs) {
            jobsList.push({
                name,
                schedule: job.config.schedule,
                enabled: job.config.enabled
            });
        }
        return jobsList;
    }
    getJobStatus(name) {
        const job = this.jobs.get(name);
        if (!job) {
            return 'not_found';
        }
        return job.instance.getStatus();
    }
    getActiveJobsCount() {
        return Array.from(this.jobs.values()).filter(job => job.instance.getStatus() === 'scheduled').length;
    }
}
exports.default = new CronService();
//# sourceMappingURL=cronService.js.map