import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './nats-lib';
import { natsClient } from './nats-lib/core/nats-connection';

console.clear();

const id: string = randomBytes(4).toString('hex');

async function natsConnection() {
  try {
    const stan = await natsClient.connect({
      clusterId: 'ticketing',
      clientId: id,
      url: 'http://localhost:4222',
    });

    // Listen to ticket creation
    new TicketCreatedListener(stan).listen();

    // If error close client
    natsClient.close(stan);
  } catch (error) {
    console.error(`💥💥💥 ${error}`);
  }
}

natsConnection();
