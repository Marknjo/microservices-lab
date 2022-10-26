import { Stan } from 'node-nats-streaming';
import { Event } from '../types/base-event.interface';

export abstract class Publisher<T extends Event> {
  abstract readonly subject: string;

  constructor(private readonly client: Stan) {}

  publish(data: T['data']) {
    const serializedData = JSON.stringify(data);

    this.client.publish(this.subject, serializedData, () => {
      console.log(`Event "${this.subject}" published`);
    });
  }
}
