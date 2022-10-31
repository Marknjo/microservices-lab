// import { randomBytes } from 'crypto';
// import { TicketCreatedListener } from './nats-lib';
// import { natsClient } from './nats-lib/core/nats-connection';

// console.clear();

// const id: string = randomBytes(4).toString('hex');

// async function natsConnection() {
//   try {
//     const stan = await natsClient.connect({
//       clusterId: 'ticketing',
//       url: 'http://localhost:4222',
//     });

//     // Listen to ticket creation
//     const stan = natsConnection.client;
//     new TicketCreatedListener(stan).listen();
//   } catch (error) {
//     console.error(`💥💥💥 ${error}`);
//   }
// }

// natsConnection();

import { randomBytes } from 'crypto';

import { TicketCreatedListener } from './nats-lib';
import { natsWrapper } from './nats-lib';

console.clear();

const id: string = randomBytes(4).toString('hex');

async function loadNatsConnection() {
  try {
    await natsWrapper.connect({
      clientId: id,
      clusterId: 'ticketing',
      url: 'http://localhost:4222',
    });

    // Listen to ticket creation
    new TicketCreatedListener(natsWrapper.client).listen();
  } catch (error) {
    console.error(`💥💥💥 ${error}`);
  }
}

loadNatsConnection();
