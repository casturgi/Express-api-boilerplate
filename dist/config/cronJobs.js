"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobs = void 0;
exports.jobs = [
    {
        name: 'hello-cron',
        schedule: '*/30 * * * * *', // Run every 10 seconds
        enabled: true,
        task: () => {
            console.log('Hello cron!', new Date().toISOString());
        },
    },
    {
        name: 'daily-cleanup',
        schedule: '0 0 0 * * *', // Every day at midnight
        enabled: true,
        task: () => {
            console.log('Running daily cleanup...', new Date().toISOString());
        },
    },
    {
        name: 'weekly-report',
        schedule: '0 0 12 * * 1', // Every Monday at 12:00
        enabled: false,
        task: () => {
            console.log('Generating weekly report...', new Date().toISOString());
        },
    },
];
//# sourceMappingURL=cronJobs.js.map