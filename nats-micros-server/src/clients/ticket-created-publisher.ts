import { Publisher } from '../core/base-publisher';
import { ClientSubjects } from '../types/client-subjects';
import { TicketCreatedEvent } from '../types/ticker-created-event';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: ClientSubjects.TicketCreated =
    ClientSubjects.TicketCreated;
}
