import { Message, Stan } from 'node-nats-streaming';
import { Listener } from '../nats/baseListener';

export class TicketCreatedListener extends Listener {
  subject = 'ticket:created';
  queueGroupName = 'payment-service';

  // constructor(client: Stan) {
  //   super(client);
  //   this.setAckWait = 10;
  // }

  onMessage(data: any, msg: Message) {
    console.log('Event data!', data);

    msg.ack();
  }
}
