import { TicketCreatedPublisher } from './nats-lib';
import { natsClient } from './nats-lib/core/nats-connection';

console.clear();

async function natsConnection() {
  try {
    const stan = await natsClient.connect({
      clusterId: 'ticketing',
      clientId: 'abc',
      url: 'http://localhost:4222',
    });

    const data = {
      id: '123',
      title: 'concert',
      price: 20,
    };

    /// handle ticket creation
    const publisher = new TicketCreatedPublisher(stan);
    try {
      await publisher.publish(data);
    } catch (error) {
      throw error;
    }

    // If error close client
    natsClient.close(stan);
  } catch (error) {
    console.error(`💥💥💥 ${error}`);
  }
}

natsConnection();
