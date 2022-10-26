import { randomBytes } from 'crypto';
import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './clients/ticket-created-publisher';

console.clear();

const id = randomBytes(4).toString('hex');

// console.table({ id });

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS server');

  const data = {
    id: '123',
    title: 'concert',
    price: 20,
  };

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish(data);
  } catch (error) {
    console.log(error);
  }
});
