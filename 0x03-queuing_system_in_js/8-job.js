function createPushNotificationsJobs(jobs, queue) {
  if (!(jobs instanceof Array)) {
    throw Error('Jobs is not an array');
  }
  jobs.forEach((obj) => {
    const job = queue.create('push_notification_code_3', obj);

    job.on('complete', () => console.log(`Notification job ${job.id} completed`));
    job.on('failed', (err) => console.log(`Notification job ${job.id} failed: ${err.message}`));
    job.on('progress', (progress) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });

    job.save((err) => {
      if (!err) console.log('Notification job created:', job.id);
    });
  });
}

module.exports = createPushNotificationsJobs;
