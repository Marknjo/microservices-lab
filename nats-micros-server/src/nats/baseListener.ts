import { Message, Stan } from 'node-nats-streaming';
import { ClientSubjects } from '../clients/types/client-subjects';

interface Event {
  subject: ClientSubjects;
  data: any;
}

export abstract class Listener<T extends Event> {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg: Message): void;

  private ackWait = 5 * 1000;

  constructor(private client: Stan) {}

  set setAckWait(ackWait: number) {
    this.ackWait = ackWait * 1000 || this.ackWait;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(
        `Message received: ${this.subject} / ${this.queueGroupName}`
      );

      /// Handle messaging
      const parsedData = this.parseMessage(msg);

      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();

    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}
