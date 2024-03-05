import { createQueue } from 'kue';

const queue = createQueue();
const job = queue.create('push_notification_code', {
  phoneNumber: 'string',
  message: 'string',
});

job.save((err) => {
  if (!err) console.log('Notification job created:', job.id);
});
