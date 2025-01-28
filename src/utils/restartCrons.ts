import cronService from '../services/cronService';

function restartCrons(): void {
  console.log('Restarting all cron jobs...');
  
  cronService.stop();
  cronService.start();
  
  const jobs = cronService.listJobs();
  
  console.log('\nActive Cron Jobs:');
  console.log('================\n');
  
  jobs.forEach(job => {
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

export default restartCrons; 