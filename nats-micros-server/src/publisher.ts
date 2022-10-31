import { natsWrapper, TicketCreatedPublisher } from './nats-lib';

console.clear();

async function loadNatsConnection() {
  await natsWrapper.connect({
    clientId: 'klkajdljadlfj',
    clusterId: 'ticketing',
    url: 'http://localhost:4222',
  });
}

export async function publishData() {
  await loadNatsConnection();

  const data = {
    id: '123',
    title: 'concert',
    price: 20,
  };

  /// handle ticket creation
  const publisher = new TicketCreatedPublisher(natsWrapper.client);
  try {
    await publisher.publish(data);
  } catch (error) {
    console.error(`💥💥💥 ${error}`);
  }
}

publishData();
