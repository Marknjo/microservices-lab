import { Message, Stan } from 'node-nats-streaming';
import { Listener } from '../core/base-listener';
import { ClientSubjects } from '../types/client-subjects';
import { TicketCreatedEvent } from '../types/ticker-created-event';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: ClientSubjects.TicketCreated =
    ClientSubjects.TicketCreated;
  queueGroupName = 'payment-service';

  constructor(client: Stan) {
    super(client);
    console.log(this.subject);
    // this.setAckWait = 10;
  }

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data! 😃😃😃');

    console.table(data);
    console.log({
      id: data.id,
      title: data.price,
      price: data.price,
    });

    msg.ack();
  }
}
