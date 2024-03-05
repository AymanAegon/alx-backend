import { createQueue } from 'kue';

const queue = createQueue();
const job = queue.create('push_notification_code', {
  phoneNumber: '0612345678',
  message: 'string',
});

job.on('complete', () => console.log('Notification job completed'));
job.on('failed', () => console.log('Notification job failed'));

job.save((err) => {
  if (!err) console.log('Notification job created:', job.id);
});
