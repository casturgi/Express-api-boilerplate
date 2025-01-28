"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cronService_1 = __importDefault(require("../services/cronService"));
function restartCrons() {
    console.log('Restarting all cron jobs...');
    cronService_1.default.stop();
    cronService_1.default.start();
    const jobs = cronService_1.default.listJobs();
    console.log('\nActive Cron Jobs:');
    console.log('================\n');
    jobs.forEach((job) => {
        console.log(`Name: ${job.name}`);
        console.log(`Schedule: ${job.schedule}`);
        console.log(`Status: ${job.enabled ? 'Enabled' : 'Disabled'}`);
        console.log('-------------------');
    });
    console.log(`\nTotal jobs: ${jobs.length}`);
}
if (require.main === module) {
    restartCrons();
}
exports.default = restartCrons;
//# sourceMappingURL=restartCrons.js.map