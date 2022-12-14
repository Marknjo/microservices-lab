import { randomBytes } from 'crypto';
import nats, { Message } from 'node-nats-streaming';

console.clear();

const id = randomBytes(4).toString('hex');

const stan = nats.connect('ticketing', id, {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log(`Listener connected to NATS on id: ${id}`);

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  const options = stan.subscriptionOptions().setManualAckMode(true);

  const subscription = stan.subscribe(
    'ticket:created',
    'orders-service-queue-group',
    options
  );

  subscription.on('message', (msg: Message) => {
    console.log('\nMessage received');

    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data:`);

      console.table(JSON.parse(data));
    }

    msg.ack();
  });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
