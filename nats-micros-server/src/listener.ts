import { randomBytes } from 'crypto';
import nats, { Message } from 'node-nats-streaming';
import { TicketCreatedListener } from './nats-lib';

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

  new TicketCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
