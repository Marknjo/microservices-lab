import { randomBytes } from 'crypto';
import nats from 'node-nats-streaming';

console.clear();

const id = randomBytes(4).toString('hex');

// console.table({ id });

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS server');

  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20,
  });

  stan.publish('ticket:created', data, () => {
    console.log('Event published');
  });
});
