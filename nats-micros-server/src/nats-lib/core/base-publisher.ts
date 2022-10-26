import { Stan } from 'node-nats-streaming';
import { promisify } from 'util';
import { Event } from '../types/base-event.interface';

export abstract class Publisher<T extends Event> {
  abstract readonly subject: string;

  constructor(private readonly client: Stan) {}

  async publish(data: T['data']) {
    return new Promise<void>((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), err => {
        if (err) {
          reject(err);
        }

        console.log(`Event "${this.subject}" published`);
        resolve();
      });
    });
  }
}
