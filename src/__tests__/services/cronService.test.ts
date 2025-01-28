import cronService from '../../services/cronService';

describe('CronService', () => {
  afterEach(() => {
    cronService.stop();
  });

  it('should initialize enabled jobs', () => {
    const jobs = cronService.listJobs();
    const enabledJobs = jobs.filter((job) => job.enabled);
    expect(jobs.length).toBeGreaterThan(0);
    expect(enabledJobs.length).toBe(2); // Based on our config
  });

  it('should be able to stop and start individual jobs', () => {
    expect(cronService.stopJob('hello-cron')).toBe(true);
    expect(cronService.startJob('hello-cron')).toBe(true);
  });

  it('should return false when trying to manage non-existent job', () => {
    expect(cronService.stopJob('non-existent-job')).toBe(false);
    expect(cronService.startJob('non-existent-job')).toBe(false);
  });

  it('should be able to get job details', () => {
    const job = cronService.getJob('hello-cron');
    expect(job).toBeDefined();
    expect(job?.config.name).toBe('hello-cron');
    expect(job?.config.schedule).toBe('*/30 * * * * *');
  });
});
