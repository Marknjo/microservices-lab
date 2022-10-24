import { Message, Stan } from 'node-nats-streaming';
import { Listener } from '../nats/baseListener';
import { ClientSubjects } from './types/client-subjects';

export class TicketCreatedListener extends Listener {
  subject: ClientSubjects.TicketCreated =
    ClientSubjects.TicketCreated;
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
